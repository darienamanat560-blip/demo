/**
 * Product View Tracking
 * 
 * Called when user views a product page.
 * Tracks "product_viewed" event for browse abandonment automation.
 * 
 * Usage from frontend (add to product page):
 * 
 * useEffect(() => {
 *   if (user?.emailAddress) {
 *     fetch('/api/track/product-view', {
 *       method: 'POST',
 *       headers: { 'Content-Type': 'application/json' },
 *       body: JSON.stringify({
 *         email: user.emailAddress,
 *         product_id: product.id,
 *         product_name: product.name,
 *         price: product.price,
 *         category: product.category,
 *         image_url: product.image
 *       })
 *     })
 *   }
 * }, [product.id, user])
 */

import { NextResponse } from 'next/server'
import { trackEvent } from '@/lib/omnisend'

export async function POST(req: Request) {
  try {
    const {
      email,
      product_id,
      product_name,
      price,
      category,
      image_url,
      currency = 'USD'
    } = await req.json()

    // Email is optional for product views
    // (anonymous users can browse)
    if (!product_id) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      )
    }

    // Only track if user is logged in (has email)
    if (!email || !email.includes('@')) {
      // Silent success - don't track anonymous views
      return NextResponse.json({
        success: true,
        message: 'Anonymous view - not tracked'
      })
    }

    // Track "product_viewed" event
    const eventResult = await trackEvent(
      email,
      'product_viewed',
      {
        product_id,
        product_name: product_name || 'Unknown Product',
        price: price || 0,
        currency,
        category: category || 'General',
        image_url: image_url || '',
        product_url: `https://truechem.io/products/${product_id}`,
        viewed_at: new Date().toISOString(),
      }
    )

    if (!eventResult.success) {
      console.error('Failed to track product_viewed:', eventResult.error)
      // Don't return error - tracking failure shouldn't break UX
      return NextResponse.json({
        success: true,
        message: 'View logged (tracking failed silently)'
      })
    }

    console.log(`✓ product_viewed tracked for ${email}: ${product_name}`)

    return NextResponse.json({
      success: true,
      message: 'Product view tracked'
    })

  } catch (error) {
    console.error('Product view tracking error:', error)
    // Don't fail - tracking is non-critical
    return NextResponse.json({
      success: true,
      message: 'View logged (error occurred)'
    })
  }
}
