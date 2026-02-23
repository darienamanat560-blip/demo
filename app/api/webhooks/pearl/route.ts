// app/api/webhooks/pearl/route.ts
// Pearl 3PL fulfillment webhook handler

import { NextRequest, NextResponse } from 'next/server';
import {
  getOrder,
  updateOrderStatus,
  updateOrderTracking,
} from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    // =====================================================
    // PEARL WEBHOOK INTEGRATION - PLACEHOLDER
    // =====================================================
    // TODO: When you get Pearl docs, implement webhook handling here
    //
    // CRITICAL SECURITY: Verify webhook signature
    // const signature = request.headers.get('pearl-signature');
    // const payload = await request.text();
    // const isValid = await verifyPearlSignature(payload, signature);
    // if (!isValid) {
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    // }
    //
    // Parse webhook event
    // const event = JSON.parse(payload);
    //
    // Handle different event types:
    //
    // 1. ORDER SHIPPED
    // if (event.type === 'order.shipped') {
    //   const pearlOrderId = event.data.order_id;
    //   const trackingNumber = event.data.tracking_number;
    //   const carrier = event.data.carrier;
    //   const trackingUrl = event.data.tracking_url;
    //
    //   // Find order by pearl_order_id
    //   const { data: orders } = await supabaseAdmin
    //     .from('orders')
    //     .select('*')
    //     .eq('pearl_order_id', pearlOrderId)
    //     .single();
    //
    //   if (!orders) {
    //     console.error('Order not found for Pearl ID:', pearlOrderId);
    //     return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    //   }
    //
    //   // Update order with tracking info
    //   await updateOrderTracking(
    //     orders.id,
    //     trackingNumber,
    //     carrier,
    //     trackingUrl
    //   );
    //
    //   // Send tracking email via Omnisend
    //   try {
    //     await trackEvent({
    //       email: orders.user_email,
    //       eventName: 'Order Shipped',
    //       properties: {
    //         orderNumber: orders.order_number,
    //         trackingNumber,
    //         carrier,
    //         trackingUrl,
    //       },
    //     });
    //   } catch (omnisendError) {
    //     console.error('Failed to send tracking email:', omnisendError);
    //   }
    //
    //   return NextResponse.json({ received: true });
    // }
    //
    // 2. ORDER DELIVERED
    // if (event.type === 'order.delivered') {
    //   const pearlOrderId = event.data.order_id;
    //
    //   const { data: orders } = await supabaseAdmin
    //     .from('orders')
    //     .select('*')
    //     .eq('pearl_order_id', pearlOrderId)
    //     .single();
    //
    //   if (orders) {
    //     await updateOrderStatus(orders.id, 'delivered');
    //
    //     // Trigger review request email (via Omnisend automation)
    //     await trackEvent({
    //       email: orders.user_email,
    //       eventName: 'Order Delivered',
    //       properties: {
    //         orderNumber: orders.order_number,
    //         deliveredAt: new Date().toISOString(),
    //       },
    //     });
    //   }
    //
    //   return NextResponse.json({ received: true });
    // }
    //
    // 3. OUT OF STOCK / ERROR
    // if (event.type === 'order.error') {
    //   const pearlOrderId = event.data.order_id;
    //   const errorMessage = event.data.message;
    //
    //   const { data: orders } = await supabaseAdmin
    //     .from('orders')
    //     .select('*')
    //     .eq('pearl_order_id', pearlOrderId)
    //     .single();
    //
    //   if (orders) {
    //     await addOrderNote(
    //       orders.id,
    //       `Pearl fulfillment error: ${errorMessage}`,
    //       'system'
    //     );
    //
    //     // Alert admin (implement admin notification)
    //     console.error('Pearl fulfillment error:', {
    //       orderNumber: orders.order_number,
    //       error: errorMessage,
    //     });
    //   }
    //
    //   return NextResponse.json({ received: true });
    // }
    // =====================================================

    // TEMPORARY: For testing, just log the webhook
    const body = await request.json();
    console.log('📦 Pearl webhook received (placeholder):', body);

    return NextResponse.json({
      received: true,
      message: 'Webhook handler ready - awaiting Pearl integration',
    });

  } catch (error) {
    console.error('Pearl webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// =====================================================
// PEARL INTEGRATION LIBRARY (lib/pearl.ts)
// =====================================================
// Create this file: lib/pearl.ts

/*
// lib/pearl.ts
// Pearl 3PL API integration

const PEARL_API_URL = process.env.PEARL_API_URL;
const PEARL_API_KEY = process.env.PEARL_API_KEY;

interface PearlOrderData {
  order_number: string;
  customer: {
    name: string;
    email: string;
    phone?: string;
  };
  shipping_address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  items: Array<{
    sku: string;
    name: string;
    quantity: number;
  }>;
  shipping_method?: string;
  notes?: string;
}

export async function sendOrderToPearl(order: any): Promise<string> {
  // Format order for Pearl's API
  const pearlOrder: PearlOrderData = {
    order_number: order.order_number,
    customer: {
      name: order.shipping_name,
      email: order.user_email,
      phone: order.shipping_phone,
    },
    shipping_address: {
      line1: order.shipping_line1,
      line2: order.shipping_line2,
      city: order.shipping_city,
      state: order.shipping_state,
      zip: order.shipping_zip,
      country: order.shipping_country || 'US',
    },
    items: order.items.map((item: any) => ({
      sku: item.id, // Map to Pearl SKU if different
      name: item.name,
      quantity: item.quantity,
    })),
    notes: order.customer_notes,
  };

  const response = await fetch(`${PEARL_API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PEARL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pearlOrder),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Pearl API error: ${response.status} - ${error}`);
  }

  const result = await response.json();
  const pearlOrderId = result.order_id || result.id;

  console.log('✅ Order sent to Pearl:', order.order_number, '→', pearlOrderId);

  // Update order with Pearl ID
  await updateOrderStatus(order.id, 'processing', {
    pearl_order_id: pearlOrderId,
  });

  return pearlOrderId;
}

export async function getPearlOrderStatus(pearlOrderId: string) {
  const response = await fetch(`${PEARL_API_URL}/orders/${pearlOrderId}`, {
    headers: {
      'Authorization': `Bearer ${PEARL_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Pearl API error: ${response.status}`);
  }

  return response.json();
}

export async function getPearlInventory() {
  const response = await fetch(`${PEARL_API_URL}/inventory`, {
    headers: {
      'Authorization': `Bearer ${PEARL_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Pearl API error: ${response.status}`);
  }

  return response.json();
}
*/
