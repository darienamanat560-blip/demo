// app/api/checkout/route.ts
// Checkout flow - creates order and initiates payment

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import {
  createOrder,
  calculateOrderTotals,
  calculateShippingCost,
  validateDiscountCode,
  incrementDiscountCodeUsage,
} from '@/lib/database';

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

    if (!shippingAddress || !shippingAddress.line1 || !shippingAddress.city) {
      return NextResponse.json(
        { error: 'Complete shipping address required' },
        { status: 400 }
      );
    }

    if (!userEmail) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    // Prepare order items
    const items = cart.map((item: any) => ({
      id: item.id,
      name: item.name,
      price: parseFloat(item.price.toString().replace('$', '')),
      quantity: item.quantity || 1,
      size: item.selectedSize,
    }));

    // Calculate totals
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const shippingCost = calculateShippingCost(subtotal);

    // Validate discount code
    let discountAmount = 0;
    let validatedCode = null;
    
    if (discountCode) {
      const discountResult = await validateDiscountCode(
        discountCode,
        subtotal + shippingCost
      );
      
      if (discountResult.valid) {
        discountAmount = discountResult.discountAmount;
        validatedCode = discountResult.code;
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
      discountCode: validatedCode,
      total: totals.total,
      customerNotes,
    });

    console.log('✅ Order created:', order.order_number);

    // Increment discount code usage
    if (validatedCode) {
      await incrementDiscountCodeUsage(validatedCode);
    }

    // =====================================================
    // PAYRIO INTEGRATION - PLACEHOLDER
    // =====================================================
    // TODO: When you get Payrio docs, add payment session creation here
    //
    // Example (replace with actual Payrio SDK calls):
    //
    // const payrioSession = await createPayrioPaymentSession({
    //   amount: totals.total,
    //   currency: 'USD',
    //   customer_email: userEmail,
    //   order_id: order.id,
    //   order_number: order.order_number,
    //   success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?order=${order.order_number}`,
    //   cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,
    // });
    //
    // Update order with payment ID:
    // await updateOrderPayment(order.id, payrioSession.id, 'pending');
    //
    // Return payment session for frontend:
    // return NextResponse.json({
    //   success: true,
    //   orderId: order.id,
    //   orderNumber: order.order_number,
    //   paymentSessionId: payrioSession.id,
    //   paymentUrl: payrioSession.url, // For hosted checkout
    //   // OR
    //   clientSecret: payrioSession.client_secret, // For embedded checkout
    // });
    // =====================================================

    // TEMPORARY: Return order info without payment
    // Remove this when Payrio is integrated
    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.order_number,
      total: totals.total,
      message: 'Order created - payment integration pending',
      
      // TEMPORARY: For testing, return test payment URL
      // Replace this with actual Payrio integration
      testMode: true,
      nextStep: 'payment',
    });

  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to process checkout' },
      { status: 500 }
    );
  }
}
