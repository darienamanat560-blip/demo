import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    // Verify internal secret
    const secret = req.headers.get('x-internal-secret');
    if (secret !== process.env.INTERNAL_TEST_SECRET) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    // Initialize Supabase client
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Generate fake order data
    const orderNumber = `TC-TEST-${Date.now()}`;
    const orderData = {
      order_number: orderNumber,
      user_id: '00000000-0000-0000-0000-000000000000',
      user_email: 'test@example.com',
      user_name: 'Test User',
      status: 'paid',
      subtotal: 99.99,
      tax: 8.5,
      shipping_cost: 12.0,
      discount_amount: 0.0,
      total: 120.49,
      payment_status: 'paid',
      payment_processor: 'payrio',
      shipping_name: 'Test User',
      shipping_line1: '123 Test Street',
      shipping_line2: 'Apt 4B',
      shipping_city: 'Santa Barbara',
      shipping_state: 'CA',
      shipping_zip: '93101',
      shipping_country: 'US',
      shipping_phone: '555-0123',
      items: [
        {
          product_id: 'test-product-1',
          name: 'Test Product',
          quantity: 1,
          price: 99.99,
        },
      ],
    };

    // Insert order into Supabase
    const { error: insertError } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single();

    if (insertError) {
      return NextResponse.json(
        { ok: false, where: 'supabase_insert', error: insertError.message },
        { status: 500 }
      );
    }

    // Create ShipStation order
    const shipstationPayload = {
      orderNumber,
      orderDate: new Date().toISOString(),
      orderStatus: 'awaiting_shipment',
      customerEmail: orderData.user_email,
      customerUsername: orderData.user_name,
      billTo: {
        name: orderData.shipping_name,
        street1: orderData.shipping_line1,
        street2: orderData.shipping_line2,
        city: orderData.shipping_city,
        state: orderData.shipping_state,
        postalCode: orderData.shipping_zip,
        country: orderData.shipping_country,
        phone: orderData.shipping_phone,
      },
      shipTo: {
        name: orderData.shipping_name,
        street1: orderData.shipping_line1,
        street2: orderData.shipping_line2,
        city: orderData.shipping_city,
        state: orderData.shipping_state,
        postalCode: orderData.shipping_zip,
        country: orderData.shipping_country,
        phone: orderData.shipping_phone,
      },
      items: (orderData.items as any[]).map((item) => ({
        lineItemKey: item.product_id,
        sku: item.product_id,
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.price,
      })),
      amountPaid: orderData.total,
      shippingAmount: orderData.shipping_cost,
      taxAmount: orderData.tax,
    };

    const shipstationResponse = await fetch(
      'https://ssapi.shipstation.com/orders/createorder',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.SHIPSTATION_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(shipstationPayload),
      }
    );

    if (!shipstationResponse.ok) {
      const errorText = await shipstationResponse.text();
      return NextResponse.json(
        { ok: false, where: 'shipstation_create', error: errorText },
        { status: 500 }
      );
    }

    const shipstationOrder = await shipstationResponse.json();

    // Update order with ShipStation ID
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        shipstation_order_id: String(shipstationOrder.orderId ?? ''),
        shipstation_status: 'created',
      })
      .eq('order_number', orderNumber);

    if (updateError) {
      return NextResponse.json(
        { ok: false, where: 'supabase_update', error: updateError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, orderNumber });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, where: 'catch', error: error?.message || String(error) },
      { status: 500 }
    );
  }
}
