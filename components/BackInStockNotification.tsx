'use client'

import { useState } from 'react'
import { Bell, Check, X } from 'lucide-react'
import { useUser } from '@clerk/nextjs'

interface BackInStockProps {
  productId: string
  productName: string
  size?: string
}

export default function BackInStockNotification({ productId, productName, size }: BackInStockProps) {
  const { user } = useUser()
  const [showModal, setShowModal] = useState(false)
  const [email, setEmail] = useState(user?.primaryEmailAddress?.emailAddress || '')
  const [loading, setLoading] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState('')

  const handleNotify = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setError('Please enter your email')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/omnisend/back-in-stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          user_id: user?.id,
          product_id: productId,
          product_name: productName,
          size: size || null
        })
      })

      const data = await response.json()

      if (data.success) {
        setSubscribed(true)
        setTimeout(() => {
          setShowModal(false)
          setSubscribed(false)
        }, 2000)
      } else {
        setError(data.error || 'Failed to subscribe')
      }
    } catch (error) {
      setError('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Notify Me Button */}
      <button
        onClick={() => setShowModal(true)}
        className="w-full py-4 border border-black bg-white text-black font-mono text-sm hover:bg-black hover:text-white transition-all duration-200 flex items-center justify-center space-x-2"
      >
        <Bell size={16} strokeWidth={1.5} />
        <span>Notify When Available</span>
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full p-8 relative">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded transition-colors"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            {/* Success State */}
            {subscribed ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-50 border border-teal-200 rounded-full mb-4">
                  <Check size={32} strokeWidth={2} className="text-teal-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">You're on the list!</h3>
                <p className="text-sm text-gray-600">
                  We'll email you as soon as this product is back in stock.
                </p>
              </div>
            ) : (
              <>
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 border border-gray-200 mb-4">
                  <Bell size={24} strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-2">Get Notified</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Enter your email to receive a notification when <strong>{productName}</strong>
                  {size && ` (${size})`} is back in stock.
                </p>

                {/* Form */}
                <form onSubmit={handleNotify} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="w-full px-4 py-3 border border-gray-300 text-sm focus:border-black focus:outline-none transition-colors"
                      disabled={loading}
                    />
                    {error && (
                      <div className="text-xs text-red-600 mt-2">{error}</div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-black text-white font-mono text-sm hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                  >
                    {loading ? 'Subscribing...' : 'Notify Me'}
                  </button>
                </form>

                {/* Info */}
                <p className="text-xs text-gray-500 mt-4 text-center">
                  We'll send you a one-time email when this product is restocked. No spam.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
