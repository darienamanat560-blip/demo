/**
 * Add to Cart Tracking
 * 
 * Called from frontend when user adds item to cart.
 * Tracks "add_to_cart" event for cart abandonment automation.
 * 
 * Usage from frontend:
 * 
 * await fetch('/api/cart/add', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({
 *     email: user.email, // from Clerk
 *     product_id: product.id,
 *     product_name: product.name,
 *     price: product.price,
 *     quantity: 1
 *   })
 * })
 */

import { NextResponse } from 'next/server'
import { trackEvent, addTags } from '@/lib/omnisend'

export async function POST(req: Request) {
  try {
    const {
      email,
      product_id,
      product_name,
      price,
      quantity = 1,
      variant_id,
      variant_name,
      image_url
    } = await req.json()

    // Validate required fields
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Valid email is required' },
        { status: 400 }
      )
    }

    if (!product_id || !product_name || !price) {
      return NextResponse.json(
        { success: false, error: 'Product ID, name, and price are required' },
        { status: 400 }
      )
    }

    // Track "add_to_cart" event
    const eventResult = await trackEvent(
      email,
      'add_to_cart',
      {
        product_id,
        product_name,
        price,
        quantity,
        variant_id,
        variant_name,
        image_url,
        currency: 'USD',
        // Omnisend expects this format for cart abandonment
        cartID: `cart_${email.split('@')[0]}_${Date.now()}`,
        cartRecoveryUrl: `https://truechem.io/cart`,
      }
    )

    if (!eventResult.success) {
      console.error('Failed to track add_to_cart:', eventResult.error)
      return NextResponse.json(
        { success: false, error: 'Failed to track event' },
        { status: 500 }
      )
    }

    // Tag user as having active cart
    await addTags(email, ['cart_active'])

    console.log(`✓ add_to_cart tracked for ${email}: ${product_name}`)

    return NextResponse.json({
      success: true,
      message: 'Cart add tracked'
    })

  } catch (error) {
    console.error('Cart add tracking error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
