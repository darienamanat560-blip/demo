'use client'

// app/checkout/success/page.tsx
// Order confirmation page

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

export default function OrderSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderNumber = searchParams?.get('order');
  const testMode = searchParams?.get('test') === 'true';

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderNumber) {
      fetchOrder();
    }
  }, [orderNumber]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${orderNumber}`);
      const data = await response.json();
      
      if (data.order) {
        setOrder(data.order);
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-gray-400 font-mono">Loading order details...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Order not found</h2>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-teal-400 text-black font-mono font-bold hover:bg-teal-300 transition-colors"
          >
            Return Home →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-teal-400 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-black" />
          </div>
          <h1 className="text-4xl font-bold mb-2 font-mono">
            {testMode ? 'Order Created!' : 'Order Confirmed!'}
          </h1>
          <p className="text-gray-400">
            {testMode 
              ? 'Payment integration pending - order is in test mode'
              : 'Thank you for your order'}
          </p>
        </div>

        {/* Test Mode Notice */}
        {testMode && (
          <div className="mb-6 p-4 bg-yellow-900 bg-opacity-20 border border-yellow-800 text-yellow-400 text-sm">
            <strong>Test Mode:</strong> This order was created without payment processing. 
            Once Payrio is integrated, customers will complete payment before reaching this page.
          </div>
        )}

        {/* Order Details */}
        <div className="bg-gray-900 border border-gray-800 p-6 mb-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-gray-400 text-sm mb-1">Order Number</div>
              <div className="font-mono font-bold text-lg text-teal-400">
                {order.order_number}
              </div>
            </div>
            <div>
              <div className="text-gray-400 text-sm mb-1">Status</div>
              <div className="font-mono font-bold text-lg">
                {order.status === 'pending' ? 'Awaiting Payment' : order.status.toUpperCase()}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-4">
            <div className="text-gray-400 text-sm mb-1">Email Confirmation</div>
            <div className="text-white">{order.user_email}</div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-gray-900 border border-gray-800 p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 font-mono">Order Items</h2>
          <div className="space-y-4">
            {order.items.map((item: any, index: number) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <div className="text-white font-medium">{item.name}</div>
                  {item.size && (
                    <div className="text-gray-500 text-sm">{item.size}</div>
                  )}
                  <div className="text-gray-500 text-sm">Quantity: {item.quantity}</div>
                </div>
                <div className="font-mono text-white">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 mt-4 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Subtotal</span>
              <span className="font-mono">${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Shipping</span>
              <span className="font-mono">
                {order.shipping_cost === 0 ? 'FREE' : `$${order.shipping_cost.toFixed(2)}`}
              </span>
            </div>
            {order.discount_amount > 0 && (
              <div className="flex justify-between text-sm text-teal-400">
                <span>Discount ({order.discount_code})</span>
                <span className="font-mono">-${order.discount_amount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-800">
              <span>Total</span>
              <span className="font-mono">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-gray-900 border border-gray-800 p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 font-mono">Shipping Address</h2>
          <div className="text-gray-300">
            <div>{order.shipping_name}</div>
            <div>{order.shipping_line1}</div>
            {order.shipping_line2 && <div>{order.shipping_line2}</div>}
            <div>
              {order.shipping_city}, {order.shipping_state} {order.shipping_zip}
            </div>
            <div>{order.shipping_country}</div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gray-900 border border-teal-400 p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 font-mono text-teal-400">What's Next?</h2>
          <div className="space-y-3 text-gray-300">
            <div className="flex items-start gap-3">
              <div className="text-teal-400 font-bold">1.</div>
              <div>
                <strong>Order Confirmation:</strong> You'll receive an email confirmation at {order.user_email}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-teal-400 font-bold">2.</div>
              <div>
                <strong>Processing:</strong> Your order will be processed within 24 hours
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-teal-400 font-bold">3.</div>
              <div>
                <strong>Shipping:</strong> Once shipped, you'll receive tracking information via email
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-teal-400 font-bold">4.</div>
              <div>
                <strong>Delivery:</strong> Most orders arrive within 2-3 business days
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => router.push('/account/orders')}
            className="flex-1 py-4 bg-teal-400 text-black font-mono font-bold hover:bg-teal-300 transition-colors"
          >
            View Order History →
          </button>
          <button
            onClick={() => router.push('/')}
            className="flex-1 py-4 bg-gray-800 text-white font-mono font-bold hover:bg-gray-700 transition-colors"
          >
            Continue Shopping →
          </button>
        </div>

        {/* Support */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Questions about your order?{' '}
          <a href="mailto:support@truechem.io" className="text-teal-400 hover:underline">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
