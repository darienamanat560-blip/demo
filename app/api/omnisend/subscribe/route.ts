/**
 * Newsletter Subscription
 * 
 * Handles newsletter signups from website forms.
 * Uses central Omnisend service for contact creation.
 * 
 * Supports multiple signup sources:
 * - landing_page (main newsletter form)
 * - footer (footer newsletter widget)
 * - popup (future: exit intent popups)
 */

import { NextResponse } from 'next/server'
import { createOrUpdateContact } from '@/lib/omnisend'

export async function POST(request: Request) {
  try {
    const { email, source, tags: customTags } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Determine tags based on source
    const baseTags = ['newsletter_subscriber', 'truechem_insights']
    const sourceTags = {
      landing_page: ['signup_landing'],
      footer: ['signup_footer'],
      popup: ['signup_popup'],
      pre_release: ['pre_release_list'],
      back_in_stock: ['back_in_stock_only'],
    }

    const tags = [
      ...baseTags,
      ...(sourceTags[source as keyof typeof sourceTags] || []),
      ...(customTags || [])
    ]

    // Create or update contact
    const result = await createOrUpdateContact(
      email,
      {
        customProperties: {
          newsletter_signup_date: new Date().toISOString(),
          newsletter_signup_source: source || 'website',
          opted_in_marketing: true,
        }
      },
      tags
    )

    if (!result.success) {
      console.error('Newsletter signup failed:', result.error)
      
      // If contact already exists, that's OK
      if (result.error?.includes('already exists')) {
        return NextResponse.json({
          success: true,
          message: "You're already subscribed to TrueChem Insights!"
        })
      }

      return NextResponse.json(
        { success: false, error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      )
    }

    console.log(`✓ Newsletter signup: ${email} (source: ${source})`)

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to TrueChem Insights!'
    })

  } catch (error) {
    console.error('Newsletter subscribe error:', error)
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
