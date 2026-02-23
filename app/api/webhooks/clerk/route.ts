/**
 * Clerk Webhook Handler
 * 
 * Syncs new user signups to Omnisend automatically.
 * 
 * Triggered by: Clerk user.created event
 * Creates Omnisend contact with:
 * - Email, name from Clerk
 * - Tags: signed_up, website_user
 * - Custom properties: clerk_user_id, signup_date, signup_source
 * 
 * Setup in Clerk Dashboard:
 * 1. Go to Webhooks → Add Endpoint
 * 2. URL: https://truechem.io/api/webhooks/clerk
 * 3. Subscribe to: user.created
 * 4. Copy signing secret to CLERK_WEBHOOK_SECRET env var
 */

import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { createOrUpdateContact } from '@/lib/omnisend'

export async function POST(req: Request) {
  try {
    // Get webhook headers
    const headerPayload = headers()
    const svixId = headerPayload.get('svix-id')
    const svixTimestamp = headerPayload.get('svix-timestamp')
    const svixSignature = headerPayload.get('svix-signature')

    if (!svixId || !svixTimestamp || !svixSignature) {
      console.error('Missing Svix headers')
      return NextResponse.json(
        { error: 'Missing webhook headers' },
        { status: 400 }
      )
    }

    // Get webhook secret
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET
    if (!webhookSecret) {
      console.error('CLERK_WEBHOOK_SECRET not configured')
      return NextResponse.json(
        { error: 'Webhook not configured' },
        { status: 500 }
      )
    }

    // Get request body
    const body = await req.text()

    // Verify webhook signature
    const wh = new Webhook(webhookSecret)
    let evt: any

    try {
      evt = wh.verify(body, {
        'svix-id': svixId,
        'svix-timestamp': svixTimestamp,
        'svix-signature': svixSignature,
      })
    } catch (err) {
      console.error('Webhook verification failed:', err)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    // Handle user.created event
    if (evt.type === 'user.created') {
      const user = evt.data

      const email = user.email_addresses?.[0]?.email_address
      const firstName = user.first_name || ''
      const lastName = user.last_name || ''
      const clerkUserId = user.id
      const signupDate = new Date(user.created_at).toISOString()

      if (!email) {
        console.error('No email found in Clerk user data')
        return NextResponse.json(
          { error: 'No email in user data' },
          { status: 400 }
        )
      }

      // Create Omnisend contact
      const result = await createOrUpdateContact(
        email,
        {
          firstName,
          lastName,
          customProperties: {
            clerk_user_id: clerkUserId,
            signup_date: signupDate,
            signup_source: 'clerk_signup',
            account_created: true,
          }
        },
        ['signed_up', 'website_user']
      )

      if (!result.success) {
        console.error('Failed to sync user to Omnisend:', result.error)
        // Don't fail the webhook - Clerk signup still succeeds
        // Just log the error
      } else {
        console.log(`✓ User synced to Omnisend: ${email}`)
      }

      return NextResponse.json({ 
        success: true, 
        message: 'User created and synced to Omnisend' 
      })
    }

    // Handle user.updated event (optional - for profile changes)
    if (evt.type === 'user.updated') {
      const user = evt.data
      const email = user.email_addresses?.[0]?.email_address
      const firstName = user.first_name || ''
      const lastName = user.last_name || ''

      if (email) {
        await createOrUpdateContact(email, { firstName, lastName })
        console.log(`✓ User updated in Omnisend: ${email}`)
      }

      return NextResponse.json({ 
        success: true, 
        message: 'User updated in Omnisend' 
      })
    }

    // Unknown event type - log and return 200
    console.log(`Unhandled Clerk webhook event: ${evt.type}`)
    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Clerk webhook error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
