'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { ArrowLeft, Download, Truck, Package, MapPin, CreditCard } from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function OrderDetailPage() {
  const { user } = useUser()
  const router = useRouter()
  const params = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user && params.id) {
      fetchOrder()
    }
  }, [user, params.id])

  const fetchOrder = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', params.id)
        .eq('user_id', user?.id)
        .single()

      if (error) throw error
      setOrder(data)
    } catch (error) {
      console.error('Error fetching order:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-12 font-mono text-sm">Loading...</div>
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="font-mono text-sm mb-4">Order not found</p>
        <button
          onClick={() => router.push('/account/orders')}
          className="px-6 py-2 bg-black text-white font-mono text-sm hover:bg-gray-800"
        >
          Back to Orders
        </button>
      </div>
    )
  }

  const items = JSON.parse(order.items || '[]')
  const shippingAddress = JSON.parse(order.shipping_address || '{}')

  return (
    <div>
      {/* Header */}
      <button
        onClick={() => router.push('/account/orders')}
        className="flex items-center space-x-2 mb-6 text-sm font-mono hover:underline"
      >
        <ArrowLeft size={16} />
        <span>Back to Orders</span>
      </button>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-mono mb-2">{order.order_number}</h1>
          <p className="text-sm text-gray-600">
            Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 transition-all">
          <Download size={16} />
          <span className="font-mono text-sm">Download Invoice</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="col-span-2 space-y-6">
          <div className="border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="font-mono font-bold uppercase text-xs tracking-wide">Order Items</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {items.map((item, idx) => (
                <div key={idx} className="px-6 py-4 flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-bold mb-1">{item.product?.name || item.name}</div>
                    <div className="text-sm text-gray-600">{item.size}</div>
                    <div className="text-xs text-gray-500 font-mono mt-1">
                      Lot: {item.lot_number || 'TBD'}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold">${parseFloat(item.price || 0).toFixed(2)}</div>
                    <div className="text-sm text-gray-500">Qty: {item.quantity || 1}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-between mb-2">
                <span className="text-sm">Subtotal</span>
                <span className="font-mono">${parseFloat(order.subtotal || order.total).toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Shipping</span>
                <span className="font-mono">${parseFloat(order.shipping || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="font-bold">Total</span>
                <span className="font-mono font-bold text-lg">${parseFloat(order.total).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Tracking */}
          {order.tracking_number && (
            <div className="border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Truck size={20} />
                <h2 className="font-mono font-bold uppercase text-xs tracking-wide">Tracking</h2>
              </div>
              <div className="bg-gray-50 border border-gray-200 p-4">
                <div className="font-mono text-sm mb-2">{order.tracking_number}</div>
                <button className="text-sm text-blue-600 hover:underline">
                  Track Shipment →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <div className="border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Package size={20} />
              <h2 className="font-mono font-bold uppercase text-xs tracking-wide">Status</h2>
            </div>
            <div className="inline-flex items-center px-3 py-2 bg-gray-100 border border-gray-300 font-mono text-sm">
              {order.status || 'Processing'}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <MapPin size={20} />
              <h2 className="font-mono font-bold uppercase text-xs tracking-wide">Shipping To</h2>
            </div>
            <div className="text-sm space-y-1">
              <div className="font-bold">{shippingAddress.name || order.shipping_name}</div>
              <div>{shippingAddress.address1 || order.shipping_address1}</div>
              {shippingAddress.address2 && <div>{shippingAddress.address2}</div>}
              <div>
                {shippingAddress.city || order.shipping_city}, {shippingAddress.state || order.shipping_state} {shippingAddress.zip || order.shipping_zip}
              </div>
              <div>{shippingAddress.country || order.shipping_country || 'USA'}</div>
            </div>
          </div>

          {/* Payment */}
          <div className="border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <CreditCard size={20} />
              <h2 className="font-mono font-bold uppercase text-xs tracking-wide">Payment</h2>
            </div>
            <div className="text-sm">
              <div className="font-mono mb-2">•••• •••• •••• {order.card_last4 || '****'}</div>
              <div className="text-gray-600">Paid on {new Date(order.created_at).toLocaleDateString()}</div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button className="w-full py-3 border border-gray-300 font-mono text-sm hover:bg-gray-50 transition-all">
              Reorder
            </button>
            <button className="w-full py-3 border border-gray-300 font-mono text-sm hover:bg-gray-50 transition-all">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
