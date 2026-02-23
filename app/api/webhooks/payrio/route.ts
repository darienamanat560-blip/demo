/**
 * PayRio Webhook Handler
 * 
 * Handles payment confirmations from PayRio.
 * 
 * When payment succeeds:
 * 1. Verify webhook signature
 * 2. Insert order into Supabase
 * 3. Track "order_placed" event in Omnisend
 * 4. Tag contact as "customer"
 * 5. Remove "cart_active" tag
 * 
 * This triggers post-purchase automation flows.
 */

import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { trackEvent, addTags, removeTags } from '@/lib/omnisend'
import crypto from 'crypto'

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

/**
 * Verify PayRio webhook signature
 * 
 * PayRio signs webhooks with HMAC-SHA256
 * Signature is sent in X-PayRio-Signature header
 */
function verifyPayRioSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const hmac = crypto.createHmac('sha256', secret)
  const digest = hmac.update(payload).digest('hex')
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(digest)
  )
}

export async function POST(req: Request) {
  try {
    // Get webhook signature
    const signature = req.headers.get('X-PayRio-Signature')
    if (!signature) {
      console.error('Missing PayRio signature header')
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      )
    }

    // Get webhook secret
    const webhookSecret = process.env.PAYRIO_WEBHOOK_SECRET
    if (!webhookSecret) {
      console.error('PAYRIO_WEBHOOK_SECRET not configured')
      return NextResponse.json(
        { error: 'Webhook not configured' },
        { status: 500 }
      )
    }

    // Get request body
    const body = await req.text()

    // Verify signature
    const isValid = verifyPayRioSignature(body, signature, webhookSecret)
    if (!isValid) {
      console.error('Invalid PayRio webhook signature')
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 403 }
      )
    }

    // Parse webhook payload
    const event = JSON.parse(body)

    // Only handle successful payments
    if (event.type !== 'payment.succeeded') {
      console.log(`Ignoring PayRio event type: ${event.type}`)
      return NextResponse.json({ success: true })
    }

    // Extract order data
    const {
      id: paymentId,
      amount,
      currency,
      customer_email: email,
      metadata,
    } = event.data

    if (!email) {
      console.error('No email in PayRio payment data')
      return NextResponse.json(
        { error: 'No email in payment' },
        { status: 400 }
      )
    }

    // Extract order details from metadata
    // (You set this in the PayRio checkout session creation)
    const orderId = metadata?.order_id || paymentId
    const items = metadata?.items ? JSON.parse(metadata.items) : []
    const shippingAddress = metadata?.shipping_address 
      ? JSON.parse(metadata.shipping_address) 
      : null

    // 1. Insert order into Supabase
    const { data: order, error: dbError } = await supabase
      .from('orders')
      .insert({
        id: orderId,
        payment_id: paymentId,
        email,
        total: amount / 100, // Convert cents to dollars
        currency: currency.toUpperCase(),
        items,
        shipping_address: shippingAddress,
        status: 'paid',
        paid_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (dbError) {
      console.error('Failed to insert order into Supabase:', dbError)
      // Don't fail webhook - PayRio payment still succeeded
    } else {
      console.log(`✓ Order inserted into Supabase: ${orderId}`)
    }

    // 2. Track "order_placed" event in Omnisend
    const eventResult = await trackEvent(
      email,
      'order_placed',
      {
        order_id: orderId,
        total_value: amount / 100,
        currency: currency.toUpperCase(),
        product_ids: items.map((item: any) => item.id),
        product_names: items.map((item: any) => item.name),
        quantity: items.reduce((sum: number, item: any) => sum + item.quantity, 0),
        items: items.map((item: any) => ({
          productID: item.id,
          productTitle: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      }
    )

    if (!eventResult.success) {
      console.error('Failed to track order_placed event:', eventResult.error)
    } else {
      console.log(`✓ order_placed event tracked for ${email}`)
    }

    // 3. Tag contact as "customer"
    await addTags(email, ['customer'])
    console.log(`✓ Tagged ${email} as customer`)

    // 4. Remove "cart_active" tag (if they had one)
    await removeTags(email, ['cart_active'])
    console.log(`✓ Removed cart_active tag from ${email}`)

    return NextResponse.json({
      success: true,
      order_id: orderId,
      message: 'Order processed and synced to Omnisend'
    })

  } catch (error) {
    console.error('PayRio webhook error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
