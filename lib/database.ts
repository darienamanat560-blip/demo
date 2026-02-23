// lib/database.ts
// Supabase database utilities for orders

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;

// Server-side client with service key (full access)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Client-side client (RLS protected)
export const supabase = createClient(
  supabaseUrl,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// =====================================================
// ORDER FUNCTIONS
// =====================================================

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
}

export interface ShippingAddress {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone?: string;
}

export interface CreateOrderData {
  userId: string;
  userEmail: string;
  userName: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  shipping: number;
  tax: number;
  discount?: number;
  discountCode?: string;
  total: number;
  customerNotes?: string;
}

/**
 * Create a new order
 */
export async function createOrder(data: CreateOrderData) {
  const orderNumber = generateOrderNumber();

  const { data: order, error } = await supabaseAdmin
    .from('orders')
    .insert({
      order_number: orderNumber,
      user_id: data.userId,
      user_email: data.userEmail,
      user_name: data.userName,
      status: 'pending',
      subtotal: data.subtotal,
      tax: data.tax,
      shipping_cost: data.shipping,
      discount_amount: data.discount || 0,
      discount_code: data.discountCode,
      total: data.total,
      items: data.items,
      shipping_name: data.shippingAddress.name,
      shipping_line1: data.shippingAddress.line1,
      shipping_line2: data.shippingAddress.line2,
      shipping_city: data.shippingAddress.city,
      shipping_state: data.shippingAddress.state,
      shipping_zip: data.shippingAddress.zip,
      shipping_country: data.shippingAddress.country || 'US',
      shipping_phone: data.shippingAddress.phone,
      customer_notes: data.customerNotes,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating order:', error);
    throw new Error('Failed to create order');
  }

  return order;
}

/**
 * Get order by ID
 */
export async function getOrder(orderId: string) {
  const { data, error } = await supabaseAdmin
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single();

  if (error) {
    console.error('Error fetching order:', error);
    return null;
  }

  return data;
}

/**
 * Get order by order number
 */
export async function getOrderByNumber(orderNumber: string) {
  const { data, error } = await supabaseAdmin
    .from('orders')
    .select('*')
    .eq('order_number', orderNumber)
    .single();

  if (error) {
    console.error('Error fetching order:', error);
    return null;
  }

  return data;
}

/**
 * Get all orders for a user
 */
export async function getUserOrders(userId: string) {
  const { data, error } = await supabaseAdmin
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .is('deleted_at', null)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user orders:', error);
    return [];
  }

  return data;
}

/**
 * Update order status
 */
export async function updateOrderStatus(
  orderId: string,
  status: string,
  metadata?: Record<string, any>
) {
  const updates: any = { status };

  // Auto-set timestamps based on status
  if (status === 'paid') updates.paid_at = new Date().toISOString();
  if (status === 'processing') updates.sent_to_pearl_at = new Date().toISOString();
  if (status === 'shipped') updates.shipped_at = new Date().toISOString();
  if (status === 'delivered') updates.delivered_at = new Date().toISOString();
  if (status === 'cancelled') updates.cancelled_at = new Date().toISOString();

  if (metadata) {
    updates.metadata = metadata;
  }

  const { data, error } = await supabaseAdmin
    .from('orders')
    .update(updates)
    .eq('id', orderId)
    .select()
    .single();

  if (error) {
    console.error('Error updating order:', error);
    throw new Error('Failed to update order');
  }

  return data;
}

/**
 * Update order with payment info
 */
export async function updateOrderPayment(
  orderId: string,
  paymentId: string,
  paymentStatus: string,
  paymentMethod?: string
) {
  const { data, error } = await supabaseAdmin
    .from('orders')
    .update({
      payment_id: paymentId,
      payment_status: paymentStatus,
      payment_method: paymentMethod,
      status: paymentStatus === 'succeeded' ? 'paid' : 'pending',
      paid_at: paymentStatus === 'succeeded' ? new Date().toISOString() : null,
    })
    .eq('id', orderId)
    .select()
    .single();

  if (error) {
    console.error('Error updating payment:', error);
    throw new Error('Failed to update payment');
  }

  return data;
}

/**
 * Update order with tracking info
 */
export async function updateOrderTracking(
  orderId: string,
  trackingNumber: string,
  carrier: string,
  trackingUrl?: string
) {
  const { data, error } = await supabaseAdmin
    .from('orders')
    .update({
      tracking_number: trackingNumber,
      tracking_carrier: carrier,
      tracking_url: trackingUrl,
      status: 'shipped',
      shipped_at: new Date().toISOString(),
    })
    .eq('id', orderId)
    .select()
    .single();

  if (error) {
    console.error('Error updating tracking:', error);
    throw new Error('Failed to update tracking');
  }

  return data;
}

/**
 * Get all orders (admin)
 */
export async function getAllOrders(limit = 100, offset = 0) {
  const { data, error } = await supabaseAdmin
    .from('orders')
    .select('*')
    .is('deleted_at', null)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }

  return data;
}

/**
 * Get orders by status
 */
export async function getOrdersByStatus(status: string) {
  const { data, error } = await supabaseAdmin
    .from('orders')
    .select('*')
    .eq('status', status)
    .is('deleted_at', null)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching orders by status:', error);
    return [];
  }

  return data;
}

/**
 * Get orders awaiting Pearl fulfillment
 */
export async function getOrdersAwaitingFulfillment() {
  const { data, error } = await supabaseAdmin
    .from('orders')
    .select('*')
    .eq('status', 'paid')
    .is('pearl_order_id', null)
    .is('deleted_at', null)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching orders awaiting fulfillment:', error);
    return [];
  }

  return data;
}

/**
 * Add internal note to order
 */
export async function addOrderNote(orderId: string, note: string, userId?: string) {
  // Get current order
  const order = await getOrder(orderId);
  if (!order) throw new Error('Order not found');

  // Append note
  const currentNotes = order.internal_notes || '';
  const timestamp = new Date().toISOString();
  const newNote = `[${timestamp}] ${userId || 'system'}: ${note}`;
  const updatedNotes = currentNotes ? `${currentNotes}\n${newNote}` : newNote;

  const { data, error } = await supabaseAdmin
    .from('orders')
    .update({ internal_notes: updatedNotes })
    .eq('id', orderId)
    .select()
    .single();

  if (error) {
    console.error('Error adding note:', error);
    throw new Error('Failed to add note');
  }

  return data;
}

// =====================================================
// PRODUCT FUNCTIONS
// =====================================================

/**
 * Get all active products
 */
export async function getProducts() {
  const { data, error } = await supabaseAdmin
    .from('products')
    .select('*')
    .eq('active', true)
    .order('name');

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data;
}

/**
 * Get product by ID
 */
export async function getProduct(productId: string) {
  const { data, error } = await supabaseAdmin
    .from('products')
    .select('*')
    .eq('id', productId)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  return data;
}

/**
 * Update product inventory
 */
export async function updateProductInventory(productId: string, count: number) {
  const { data, error } = await supabaseAdmin
    .from('products')
    .update({
      inventory_count: count,
      in_stock: count > 0,
    })
    .eq('id', productId)
    .select()
    .single();

  if (error) {
    console.error('Error updating inventory:', error);
    throw new Error('Failed to update inventory');
  }

  return data;
}

// =====================================================
// DISCOUNT CODE FUNCTIONS
// =====================================================

/**
 * Validate and apply discount code
 */
export async function validateDiscountCode(code: string, orderTotal: number) {
  const { data, error } = await supabaseAdmin
    .from('discount_codes')
    .select('*')
    .eq('code', code.toUpperCase())
    .eq('active', true)
    .single();

  if (error || !data) {
    return { valid: false, error: 'Invalid discount code' };
  }

  // Check if expired
  if (data.valid_until && new Date(data.valid_until) < new Date()) {
    return { valid: false, error: 'Discount code has expired' };
  }

  // Check minimum order amount
  if (data.min_order_amount && orderTotal < data.min_order_amount) {
    return {
      valid: false,
      error: `Minimum order of $${data.min_order_amount} required`,
    };
  }

  // Check max uses
  if (data.max_uses && data.uses_count >= data.max_uses) {
    return { valid: false, error: 'Discount code has reached maximum uses' };
  }

  // Calculate discount
  let discountAmount = 0;
  if (data.discount_type === 'percentage') {
    discountAmount = (orderTotal * data.discount_value) / 100;
  } else {
    discountAmount = data.discount_value;
  }

  return {
    valid: true,
    code: data.code,
    discountAmount,
    description: data.description,
  };
}

/**
 * Increment discount code usage
 */
export async function incrementDiscountCodeUsage(code: string) {
  const { error } = await supabaseAdmin
    .from('discount_codes')
    .update({ uses_count: supabaseAdmin.rpc('increment', { row_id: code }) })
    .eq('code', code);

  if (error) {
    console.error('Error incrementing discount usage:', error);
  }
}

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

/**
 * Generate unique order number
 */
function generateOrderNumber(): string {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `TC-${dateStr}-${random}`;
}

/**
 * Calculate order totals
 */
export function calculateOrderTotals(
  items: OrderItem[],
  shippingCost: number = 0,
  discountAmount: number = 0
) {
  const subtotal = items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const tax = 0; // Implement tax calculation if needed
  const total = subtotal + shippingCost + tax - discountAmount;

  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    shipping: parseFloat(shippingCost.toFixed(2)),
    tax: parseFloat(tax.toFixed(2)),
    discount: parseFloat(discountAmount.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
  };
}

/**
 * Format currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

/**
 * Get shipping cost based on subtotal
 */
export function calculateShippingCost(subtotal: number): number {
  // Free shipping over $150
  if (subtotal >= 150) return 0;
  
  // Standard shipping
  return 10.00;
}
