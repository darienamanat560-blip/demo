// app/api/orders/[id]/route.ts
// Individual order operations

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import {
  getOrder,
  getOrderByNumber,
  updateOrderStatus,
  addOrderNote,
} from '@/lib/database';

// GET /api/orders/[id] - Get specific order
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const orderId = params.id;

    // Try to get by UUID first, then by order number
    let order = await getOrder(orderId);
    
    if (!order) {
      order = await getOrderByNumber(orderId);
    }

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Check if user owns this order (or is admin)
    const isAdmin = false; // TODO: Implement admin check
    
    if (!isAdmin && order.user_id !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}

// PATCH /api/orders/[id] - Update order
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const orderId = params.id;
    const body = await request.json();
    const { status, note } = body;

    // Get order
    const order = await getOrder(orderId);
    
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Check permissions (admin only for now)
    const isAdmin = false; // TODO: Implement admin check
    
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Only admins can update orders' },
        { status: 403 }
      );
    }

    // Update status if provided
    if (status) {
      await updateOrderStatus(orderId, status);
    }

    // Add note if provided
    if (note) {
      await addOrderNote(orderId, note, userId);
    }

    // Fetch updated order
    const updatedOrder = await getOrder(orderId);

    return NextResponse.json({
      success: true,
      order: updatedOrder,
    });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}
