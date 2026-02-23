'use client'
export const dynamic = 'force-dynamic'


import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import { Package, Download, Truck, ChevronRight } from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function OrdersPage() {
  const { user } = useUser()
  const router = useRouter()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchOrders()
    }
  }, [user])

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setOrders(data || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-[1400px] mx-auto px-8 py-12">
          <h1 className="text-3xl font-bold mb-2 tracking-tight">My Orders</h1>
          <p className="text-gray-600">View and manage your order history</p>
        </div>
        <div className="max-w-[1400px] mx-auto px-8 py-12">
          <div className="flex items-center justify-center h-64">
            <div className="text-sm font-mono text-gray-400">Loading orders...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header Section */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-[1400px] mx-auto px-8 py-12">
          <h1 className="text-3xl font-bold mb-2 tracking-tight">My Orders</h1>
          <p className="text-gray-600">View and manage your order history</p>
        </div>
      </div>

      {/* Orders Content */}
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        {orders.length === 0 ? (
          <div className="border border-gray-200 p-16 text-center">
            <Package size={48} strokeWidth={1} className="mx-auto mb-6 text-gray-300" />
            <h3 className="text-xl font-bold mb-2">No orders yet</h3>
            <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
            <button
              onClick={() => router.push('/')}
              className="px-8 py-3 bg-black text-white font-mono text-sm hover:bg-gray-800 transition-colors duration-150"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="border border-gray-200">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="px-8 py-4 text-left text-xs font-mono font-bold uppercase tracking-wider text-gray-600">Order #</th>
                  <th className="px-8 py-4 text-left text-xs font-mono font-bold uppercase tracking-wider text-gray-600">Products</th>
                  <th className="px-8 py-4 text-left text-xs font-mono font-bold uppercase tracking-wider text-gray-600">Date</th>
                  <th className="px-8 py-4 text-left text-xs font-mono font-bold uppercase tracking-wider text-gray-600">Status</th>
                  <th className="px-8 py-4 text-left text-xs font-mono font-bold uppercase tracking-wider text-gray-600">Total</th>
                  <th className="px-8 py-4 text-right text-xs font-mono font-bold uppercase tracking-wider text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr 
                    key={order.id} 
                    className={`transition-all duration-150 hover:bg-gray-50 cursor-pointer ${
                      idx !== orders.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                    onClick={() => router.push(`/account/orders/${order.id}`)}
                  >
                    <td className="px-8 py-5">
                      <div className="font-mono text-sm font-bold">{order.order_number}</div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="text-sm">
                        {JSON.parse(order.items || '[]').map((item, idx) => (
                          <div key={idx} className="text-gray-700">
                            {item.product?.name || item.name}
                            {idx < JSON.parse(order.items).length - 1 && ', '}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="text-sm text-gray-600">
                        {new Date(order.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-xs font-mono uppercase tracking-wider text-gray-600">
                        {order.status || 'Processing'}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="font-mono text-sm font-bold">
                        ${parseFloat(order.total || 0).toFixed(2)}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-end space-x-3">
                        {order.tracking_number && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              alert(`Track: ${order.tracking_number}`)
                            }}
                            className="p-2 hover:bg-gray-100 rounded transition-all duration-150"
                          >
                            <Truck size={16} strokeWidth={1.5} />
                          </button>
                        )}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation()
                            alert('Download invoice')
                          }}
                          className="p-2 hover:bg-gray-100 rounded transition-all duration-150"
                        >
                          <Download size={16} strokeWidth={1.5} />
                        </button>
                        <ChevronRight size={16} strokeWidth={1.5} className="text-gray-400" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
