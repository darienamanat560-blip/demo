'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'

export default function FooterNewsletter() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState('')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setError('Please enter your email')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/omnisend/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'footer',
          tags: ['footer', 'insights']
        })
      })

      const data = await response.json()

      if (data.success) {
        setSubscribed(true)
        setEmail('')
      } else {
        setError(data.error || 'Failed to subscribe')
      }
    } catch (error) {
      setError('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  if (subscribed) {
    return (
      <div className="pb-12 mb-12 border-b border-gray-800 flex items-center space-x-2 text-teal-400">
        <Check size={16} strokeWidth={2} />
        <span className="text-sm font-mono">Subscribed to TrueChem Insights!</span>
      </div>
    )
  }

  return (
    <div className="pb-12 mb-12 border-b border-gray-800">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="text-xs font-mono tracking-wider text-gray-400 uppercase mb-2">Newsletter</div>
          <h3 className="text-lg font-bold text-white mb-2">
            TrueChem Insights
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Research updates, educational content, and early access to new compounds. Every Tuesday.
          </p>
        </div>
        <div>
          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 text-white text-sm placeholder-gray-500 focus:border-gray-400 focus:outline-none transition-colors"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-white text-black text-sm font-mono hover:bg-gray-200 transition-colors disabled:bg-gray-600 disabled:text-gray-400 whitespace-nowrap"
              >
                {loading ? '...' : 'Subscribe'}
              </button>
            </div>
            {error && (
              <div className="text-xs text-red-400">{error}</div>
            )}
            <p className="text-xs text-gray-600">
              New subscribers get 5% off first order. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
