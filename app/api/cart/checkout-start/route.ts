/**
 * Checkout Started Tracking
 * 
 * Called when user begins checkout process.
 * Tracks "checkout_started" event for checkout abandonment automation.
 * 
 * Usage from frontend:
 * 
 * await fetch('/api/cart/checkout-start', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({
 *     email: user.email,
 *     cart_id: cartId,
 *     total_value: cartTotal,
 *     items: cartItems
 *   })
 * })
 */

import { NextResponse } from 'next/server'
import { trackEvent } from '@/lib/omnisend'

export async function POST(req: Request) {
  try {
    const {
      email,
      cart_id,
      total_value,
      items,
      currency = 'USD'
    } = await req.json()

    // Validate required fields
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Valid email is required' },
        { status: 400 }
      )
    }

    if (!total_value || !items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Total value and items are required' },
        { status: 400 }
      )
    }

    // Track "checkout_started" event
    const eventResult = await trackEvent(
      email,
      'checkout_started',
      {
        cart_id: cart_id || `cart_${Date.now()}`,
        total_value,
        currency,
        items: items.map((item: any) => ({
          productID: item.id,
          productTitle: item.name,
          quantity: item.quantity,
          price: item.price,
          variantID: item.variant_id,
          variantTitle: item.variant_name,
          imageUrl: item.image_url,
        })),
        // Cart recovery URL
        cartRecoveryUrl: `https://truechem.io/checkout`,
      }
    )

    if (!eventResult.success) {
      console.error('Failed to track checkout_started:', eventResult.error)
      return NextResponse.json(
        { success: false, error: 'Failed to track event' },
        { status: 500 }
      )
    }

    console.log(`✓ checkout_started tracked for ${email}`)

    return NextResponse.json({
      success: true,
      message: 'Checkout start tracked'
    })

  } catch (error) {
    console.error('Checkout start tracking error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
