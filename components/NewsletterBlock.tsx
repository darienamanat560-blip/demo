'use client'

import { useState } from 'react'
import { Mail, Check, ArrowRight, Microscope, BookOpen, TrendingUp } from 'lucide-react'

export default function NewsletterBlock() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState('')
  const [showLearnMore, setShowLearnMore] = useState(false)

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
          source: 'landing_page',
          tags: ['landing', 'insights', '5_percent_offer']
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
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white border-y border-gray-200">
      <div className="max-w-[1400px] mx-auto px-8 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 border border-gray-200 mb-6">
              <Mail size={32} strokeWidth={1} className="text-black" />
            </div>
            
            <h2 className="text-4xl font-bold mb-4 tracking-tight">
              TrueChem Insights
            </h2>
            
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              Research-grade education, third-party testing updates, and exclusive access to new compounds.
            </p>

            {/* Value Props */}
            <div className="grid grid-cols-3 gap-8 mb-10">
              <div className="text-center">
                <Microscope size={24} strokeWidth={1.5} className="mx-auto mb-3 text-teal-500" />
                <div className="text-sm font-bold mb-1">Research Updates</div>
                <div className="text-xs text-gray-600">Latest studies & testing results</div>
              </div>
              <div className="text-center">
                <BookOpen size={24} strokeWidth={1.5} className="mx-auto mb-3 text-teal-500" />
                <div className="text-sm font-bold mb-1">Educational Content</div>
                <div className="text-xs text-gray-600">Mechanisms, protocols, safety</div>
              </div>
              <div className="text-center">
                <TrendingUp size={24} strokeWidth={1.5} className="mx-auto mb-3 text-teal-500" />
                <div className="text-sm font-bold mb-1">Early Access</div>
                <div className="text-xs text-gray-600">Be first to know about new releases</div>
              </div>
            </div>

            {/* Offer Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-black text-white mb-8">
              <span className="text-sm font-mono">New subscribers get 5% off first order</span>
            </div>
          </div>

          {/* Signup Form or Success */}
          {subscribed ? (
            <div className="text-center py-8 border border-teal-500 bg-teal-50">
              <Check size={32} strokeWidth={2} className="mx-auto mb-4 text-teal-600" />
              <h3 className="text-xl font-bold mb-2">You're subscribed!</h3>
              <p className="text-sm text-gray-700 mb-4">
                Check your email for your 5% discount code and our first research brief.
              </p>
              <p className="text-xs text-gray-600">
                TrueChem Insights delivers every Tuesday. Unsubscribe anytime.
              </p>
            </div>
          ) : (
            <div>
              <form onSubmit={handleSubscribe} className="max-w-xl mx-auto mb-6">
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-6 py-4 border border-gray-300 text-sm focus:border-black focus:outline-none transition-colors"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-4 bg-black text-white text-sm font-mono hover:bg-gray-800 transition-colors disabled:bg-gray-400 whitespace-nowrap"
                  >
                    {loading ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </div>
                {error && (
                  <div className="text-xs text-red-600 mt-2">{error}</div>
                )}
              </form>

              {/* Learn More Toggle */}
              <div className="text-center">
                <button
                  onClick={() => setShowLearnMore(!showLearnMore)}
                  className="text-sm text-gray-600 hover:text-black transition-colors inline-flex items-center space-x-2"
                >
                  <span>{showLearnMore ? 'Show less' : 'Learn more about TrueChem Insights'}</span>
                  <ArrowRight size={14} strokeWidth={1.5} className={`transition-transform ${showLearnMore ? 'rotate-90' : ''}`} />
                </button>
              </div>

              {/* Expanded Content */}
              {showLearnMore && (
                <div className="mt-8 pt-8 border-t border-gray-200 max-w-3xl mx-auto">
                  <div className="grid md:grid-cols-2 gap-8 text-left">
                    <div>
                      <h4 className="font-bold mb-3">What You'll Receive</h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start">
                          <span className="mr-2">—</span>
                          <span>Weekly research briefings on new compounds and studies</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">—</span>
                          <span>Third-party testing reports and transparency updates</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">—</span>
                          <span>Educational guides on mechanisms of action</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">—</span>
                          <span>Safety protocols and best practices</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">—</span>
                          <span>Early access announcements for new products</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold mb-3">Our Commitment</h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start">
                          <span className="mr-2">—</span>
                          <span>Science-backed, research-grade content only</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">—</span>
                          <span>No hype, no exaggerated claims</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">—</span>
                          <span>Direct access to COAs and testing data</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">—</span>
                          <span>Delivered every Tuesday, ~5 minute read</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">—</span>
                          <span>Unsubscribe with one click, anytime</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 p-6 bg-gray-50 border border-gray-200">
                    <p className="text-sm text-gray-700 italic">
                      "TrueChem Insights isn't marketing. It's the research briefing we wish existed when we started. 
                      Every Tuesday, we share what we're learning, what we're testing, and what the science actually says."
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      — TrueChem Research Team
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
