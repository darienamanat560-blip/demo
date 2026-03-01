'use client'

import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import { Trash2, ShoppingBag } from 'lucide-react'

const VialIcon = ({ inverted = false, size = 40 }) => {
  return (
    <img 
      src="/vial-logo.png" 
      alt="truechem" 
      width={size} 
      height={size} 
      style={{ 
        display: 'block',
        filter: inverted ? 'invert(1)' : 'none'
      }}
    />
  );
};

export default function CartPage() {
  const router = useRouter()
  const { cart, cartItemCount, cartTotal, removeFromCart, updateQuantity } = useCart()

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6">
            <div className="flex items-center justify-between">
              <button onClick={() => router.push('/')} className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-black flex items-center justify-center"><VialIcon inverted={false} size={38} /></div>
                <div>
                  <div className="text-2xl font-mono text-black lowercase" style={{ letterSpacing: '0.08em' }}>
                    <span className="font-bold">true</span><span className="font-normal">chem</span>
                  </div>
                  <div className="text-[9px] font-mono tracking-[0.15em] text-gray-500 uppercase">99%+ Certified</div>
                </div>
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-6 py-32 text-center">
          <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-gray-300" />
          <h1 className="text-4xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Start shopping to add items to your cart</p>
          <button
            onClick={() => router.push('/products')}
            className="px-8 py-4 bg-black text-white font-mono text-sm hover:bg-gray-800 transition-all"
          >
            Browse Products
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            <button onClick={() => router.push('/')} className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-black flex items-center justify-center"><VialIcon inverted={false} size={38} /></div>
              <div>
                <div className="text-2xl font-mono text-black lowercase" style={{ letterSpacing: '0.08em' }}>
                  <span className="font-bold">true</span><span className="font-normal">chem</span>
                </div>
                <div className="text-[9px] font-mono tracking-[0.15em] text-gray-500 uppercase">99%+ Certified</div>
              </div>
            </button>
            <button onClick={() => router.push('/products')} className="text-sm font-medium text-gray-600 hover:text-black">
              ← Continue Shopping
            </button>
          </div>
        </div>
      </header>

      <section className="pt-16 pb-32 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-12">Shopping Cart ({cartItemCount} {cartItemCount === 1 ? 'item' : 'items'})</h1>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="border-2 border-gray-200 p-6 hover:border-black transition-all">
                  <div className="flex gap-6">
                    <div className="w-24 h-24 bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <ShoppingBag className="text-gray-400" size={32} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{item.size}</p>
                      
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 border border-gray-300 hover:border-black flex items-center justify-center text-lg"
                          >
                            −
                          </button>
                          <span className="w-12 text-center font-mono">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 border border-gray-300 hover:border-black flex items-center justify-center text-lg"
                          >
                            +
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-800 flex items-center gap-2 text-sm"
                        >
                          <Trash2 size={16} />
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold font-mono">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-500">${item.price.toFixed(2)} each</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border-2 border-black p-8 sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-mono">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-mono">Calculated at checkout</span>
                  </div>
                </div>

                <div className="border-t-2 border-gray-200 pt-4 mb-8">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="font-mono">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => router.push('/checkout')}
                  className="w-full py-4 bg-black text-white font-mono text-sm hover:bg-gray-800 transition-all mb-4"
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={() => router.push('/products')}
                  className="w-full py-4 border-2 border-gray-300 font-mono text-sm hover:border-black transition-all"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 bg-black text-white">
        <div className="max-w-[1400px] mx-auto text-center">
          <div className="text-xs font-mono text-gray-500">
            © 2026 truechem. All rights reserved. • ISO 9001:2015 FACILITIES • THIRD-PARTY TESTED
          </div>
        </div>
      </footer>
    </div>
  );
}
