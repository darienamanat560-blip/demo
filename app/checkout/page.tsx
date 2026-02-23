'use client'

// app/checkout/page.tsx
// Checkout page with Payrio integration placeholder

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function CheckoutPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);
  
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
    phone: '',
  });

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    // Pre-fill name from Clerk user
    if (user) {
      setShippingAddress(prev => ({
        ...prev,
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
      }));
    }
  }, [user]);

  // Redirect if not signed in
  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in?redirect_url=/checkout');
    }
  }, [isLoaded, user, router]);

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return sum + price * (item.quantity || 1);
  }, 0);

  const shipping = subtotal >= 150 ? 0 : 10;
  const tax = 0; // Add tax calculation if needed
  const total = subtotal + shipping + tax - discount;

  // Handle discount code
  const applyDiscount = async () => {
    if (!discountCode) return;

    try {
      const response = await fetch('/api/validate-discount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: discountCode,
          orderTotal: subtotal + shipping,
        }),
      });

      const data = await response.json();

      if (data.valid) {
        setDiscount(data.discountAmount);
        setError('');
      } else {
        setError(data.error || 'Invalid discount code');
        setDiscount(0);
      }
    } catch (err) {
      setError('Failed to apply discount code');
    }
  };

  // Handle checkout
  const handleCheckout = async () => {
    // Validate shipping address
    if (!shippingAddress.line1 || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zip) {
      setError('Please fill in all required shipping fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create order
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cart,
          shippingAddress,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          userName: `${user?.firstName} ${user?.lastName}`,
          discountCode: discount > 0 ? discountCode : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Checkout failed');
      }

      console.log('✅ Order created:', data.orderNumber);

      // =====================================================
      // PAYRIO INTEGRATION - PLACEHOLDER
      // =====================================================
      // TODO: When you get Payrio docs, add payment flow here
      //
      // Option 1: Hosted Checkout (redirect to Payrio)
      // if (data.paymentUrl) {
      //   window.location.href = data.paymentUrl;
      // }
      //
      // Option 2: Embedded Checkout (show Payrio form on page)
      // if (data.clientSecret) {
      //   // Initialize Payrio SDK with client secret
      //   // Show payment form
      //   // Handle success/error
      // }
      // =====================================================

      // TEMPORARY: For now, just redirect to success page
      // Remove this when Payrio is integrated
      if (data.testMode) {
        // Clear cart
        localStorage.removeItem('cart');
        
        // Redirect to success page
        router.push(`/checkout/success?order=${data.orderNumber}&test=true`);
      }

    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'Failed to process checkout');
      setLoading(false);
    }
  };

  if (!isLoaded || !user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <button
            onClick={() => router.push('/products')}
            className="px-6 py-3 bg-teal-400 text-black font-mono font-bold hover:bg-teal-300 transition-colors"
          >
            Browse Products →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-mono text-sm">Back</span>
        </button>

        {/* Header */}
        <h1 className="text-4xl font-bold mb-8 font-mono">Checkout</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Shipping & Payment */}
          <div>
            {/* Shipping Address */}
            <div className="bg-gray-900 border border-gray-800 p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 font-mono">Shipping Address</h2>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={shippingAddress.name}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                  className="w-full px-4 py-3 bg-black border border-gray-700 text-white font-mono text-sm focus:border-teal-400 focus:outline-none"
                  required
                />

                <input
                  type="text"
                  placeholder="Address Line 1"
                  value={shippingAddress.line1}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, line1: e.target.value })}
                  className="w-full px-4 py-3 bg-black border border-gray-700 text-white font-mono text-sm focus:border-teal-400 focus:outline-none"
                  required
                />

                <input
                  type="text"
                  placeholder="Address Line 2 (optional)"
                  value={shippingAddress.line2}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, line2: e.target.value })}
                  className="w-full px-4 py-3 bg-black border border-gray-700 text-white font-mono text-sm focus:border-teal-400 focus:outline-none"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    className="px-4 py-3 bg-black border border-gray-700 text-white font-mono text-sm focus:border-teal-400 focus:outline-none"
                    required
                  />

                  <input
                    type="text"
                    placeholder="State"
                    value={shippingAddress.state}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                    className="px-4 py-3 bg-black border border-gray-700 text-white font-mono text-sm focus:border-teal-400 focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    value={shippingAddress.zip}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, zip: e.target.value })}
                    className="px-4 py-3 bg-black border border-gray-700 text-white font-mono text-sm focus:border-teal-400 focus:outline-none"
                    required
                  />

                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={shippingAddress.phone}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                    className="px-4 py-3 bg-black border border-gray-700 text-white font-mono text-sm focus:border-teal-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment Section - Placeholder */}
            <div className="bg-gray-900 border border-gray-800 p-6">
              <h2 className="text-xl font-bold mb-4 font-mono">Payment</h2>
              
              {/* PAYRIO INTEGRATION PLACEHOLDER */}
              <div className="border-2 border-dashed border-gray-700 rounded p-8 text-center">
                <p className="text-gray-400 mb-2">Payrio Payment Form</p>
                <p className="text-xs text-gray-600">
                  Integration pending - payment form will appear here
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <div className="bg-gray-900 border border-gray-800 p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-4 font-mono">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <div>
                      <div className="text-white">{item.name}</div>
                      {item.selectedSize && (
                        <div className="text-gray-500 text-xs">{item.selectedSize}</div>
                      )}
                      <div className="text-gray-500 text-xs">Qty: {item.quantity || 1}</div>
                    </div>
                    <div className="text-white font-mono">
                      ${(parseFloat(item.price.replace('$', '')) * (item.quantity || 1)).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Discount Code */}
              <div className="mb-6 pt-4 border-t border-gray-800">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Discount code"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                    className="flex-1 px-4 py-2 bg-black border border-gray-700 text-white font-mono text-sm focus:border-teal-400 focus:outline-none"
                  />
                  <button
                    onClick={applyDiscount}
                    className="px-4 py-2 bg-gray-800 text-white font-mono text-sm hover:bg-gray-700 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {discount > 0 && (
                  <div className="text-teal-400 text-xs mt-2 font-mono">
                    ✓ Discount applied: -${discount.toFixed(2)}
                  </div>
                )}
              </div>

              {/* Totals */}
              <div className="space-y-2 mb-6 pt-4 border-t border-gray-800">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="font-mono">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Shipping</span>
                  <span className="font-mono">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-teal-400">
                    <span>Discount</span>
                    <span className="font-mono">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-800">
                  <span>Total</span>
                  <span className="font-mono">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-900 bg-opacity-20 border border-red-800 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full py-4 bg-teal-400 text-black font-mono font-bold text-sm hover:bg-teal-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : `Complete Order • $${total.toFixed(2)}`}
              </button>

              {/* Free Shipping Notice */}
              {subtotal < 150 && (
                <p className="text-xs text-gray-500 mt-3 text-center">
                  Add ${(150 - subtotal).toFixed(2)} more for free shipping
                </p>
              )}

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-800 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-teal-400 text-sm font-mono font-bold">99%+</div>
                  <div className="text-gray-500 text-xs">Purity</div>
                </div>
                <div>
                  <div className="text-teal-400 text-sm font-mono font-bold">COA</div>
                  <div className="text-gray-500 text-xs">Included</div>
                </div>
                <div>
                  <div className="text-teal-400 text-sm font-mono font-bold">24h</div>
                  <div className="text-gray-500 text-xs">Shipping</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
