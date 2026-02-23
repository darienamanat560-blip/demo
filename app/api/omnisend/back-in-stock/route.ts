import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

export async function POST(request: Request) {
  try {
    const { email, user_id, product_id, product_name, size } = await request.json()

    if (!email || !product_id || !product_name) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Subscribe to Omnisend
    const omnisendResponse = await fetch('https://api.omnisend.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': process.env.OMNISEND_API_KEY!,
      },
      body: JSON.stringify({
        email,
        tags: [`back_in_stock_${product_id}`],
        customProperties: {
          bis_product_id: product_id,
          bis_product_name: product_name,
          bis_size: size || '',
          bis_requested_at: new Date().toISOString()
        }
      })
    })

    if (!omnisendResponse.ok) {
      console.error('Omnisend error:', await omnisendResponse.text())
      return NextResponse.json(
        { success: false, error: 'Failed to create notification' },
        { status: 500 }
      )
    }

    const omnisendData = await omnisendResponse.json()

    // Save to Supabase
    await supabase
      .from('back_in_stock_notifications')
      .insert({
        user_id: user_id || null,
        email,
        product_id,
        product_name,
        size: size || null,
        omnisend_automation_id: omnisendData.contactID,
        notified: false
      })

    return NextResponse.json({
      success: true,
      message: 'You\'ll be notified when this product is back in stock!'
    })

  } catch (error) {
    console.error('Back-in-stock error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
