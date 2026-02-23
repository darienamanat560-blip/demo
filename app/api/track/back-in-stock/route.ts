/**
 * Back-in-Stock Request Handler
 * 
 * When user requests to be notified when a product is back in stock.
 * Tracks "back_in_stock_requested" event for stock notification automation.
 * 
 * Usage from frontend:
 * 
 * await fetch('/api/track/back-in-stock', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({
 *     email: user.email,
 *     product_id: product.id,
 *     product_name: product.name,
 *     variant_id: selectedVariant.id
 *   })
 * })
 */

import { NextResponse } from 'next/server'
import { trackEvent, addTags, createOrUpdateContact } from '@/lib/omnisend'

export async function POST(req: Request) {
  try {
    const {
      email,
      product_id,
      product_name,
      variant_id,
      variant_name,
    } = await req.json()

    // Validate required fields
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Valid email is required' },
        { status: 400 }
      )
    }

    if (!product_id || !product_name) {
      return NextResponse.json(
        { success: false, error: 'Product ID and name are required' },
        { status: 400 }
      )
    }

    // Ensure contact exists (they might not be signed up yet)
    await createOrUpdateContact(
      email,
      {
        customProperties: {
          last_restock_request: new Date().toISOString(),
          requested_product: product_name,
        }
      },
      ['back_in_stock_subscriber']
    )

    // Track "back_in_stock_requested" event
    const eventResult = await trackEvent(
      email,
      'back_in_stock_requested',
      {
        product_id,
        product_name,
        variant_id: variant_id || null,
        variant_name: variant_name || null,
        requested_at: new Date().toISOString(),
        product_url: `https://truechem.io/products/${product_id}`,
      }
    )

    if (!eventResult.success) {
      console.error('Failed to track back_in_stock_requested:', eventResult.error)
      return NextResponse.json(
        { success: false, error: 'Failed to submit request' },
        { status: 500 }
      )
    }

    console.log(`✓ back_in_stock_requested tracked for ${email}: ${product_name}`)

    return NextResponse.json({
      success: true,
      message: "We'll notify you when this product is back in stock!"
    })

  } catch (error) {
    console.error('Back-in-stock request error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
