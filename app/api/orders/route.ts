// app/api/orders/route.ts
// Orders CRUD API

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import {
  createOrder,
  getUserOrders,
  getAllOrders,
  calculateOrderTotals,
  calculateShippingCost,
  validateDiscountCode,
} from '@/lib/database';

// GET /api/orders - Get user's orders or all orders (admin)
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if admin (you can implement admin check based on Clerk metadata)
    const isAdmin = false; // TODO: Implement admin check
    
    if (isAdmin) {
      // Return all orders for admin
      const orders = await getAllOrders();
      return NextResponse.json({ orders });
    } else {
      // Return user's orders only
      const orders = await getUserOrders(userId);
      return NextResponse.json({ orders });
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

// POST /api/orders - Create new order
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      cart,
      shippingAddress,
      userEmail,
      userName,
      discountCode,
      customerNotes,
    } = body;

    // Validate required fields
    if (!cart || cart.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    if (!shippingAddress || !userEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate totals
    const items = cart.map((item: any) => ({
      id: item.id,
      name: item.name,
      price: parseFloat(item.price.toString().replace('$', '')),
      quantity: item.quantity || 1,
      size: item.selectedSize,
    }));

    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const shippingCost = calculateShippingCost(subtotal);

    // Validate and apply discount code if provided
    let discountAmount = 0;
    if (discountCode) {
      const discountResult = await validateDiscountCode(discountCode, subtotal);
      if (discountResult.valid) {
        discountAmount = discountResult.discountAmount;
      } else {
        return NextResponse.json(
          { error: discountResult.error },
          { status: 400 }
        );
      }
    }

    const totals = calculateOrderTotals(items, shippingCost, discountAmount);

    // Create order in database
    const order = await createOrder({
      userId,
      userEmail,
      userName,
      items,
      shippingAddress: {
        name: shippingAddress.name || userName,
        line1: shippingAddress.line1,
        line2: shippingAddress.line2,
        city: shippingAddress.city,
        state: shippingAddress.state,
        zip: shippingAddress.zip,
        country: shippingAddress.country || 'US',
        phone: shippingAddress.phone,
      },
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      tax: totals.tax,
      discount: totals.discount,
      discountCode: discountCode,
      total: totals.total,
      customerNotes,
    });

    console.log('✅ Order created:', order.order_number);

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.order_number,
        total: order.total,
        status: order.status,
      },
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
