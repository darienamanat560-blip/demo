'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function WelcomePage() {
  const { user, isLoaded, isSignedIn } = useUser()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true) // Default checked
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in')
    }
  }, [isLoaded, isSignedIn, router])

  const handleContinue = async () => {
    setIsSubmitting(true)

    // If user wants newsletter, subscribe them
    if (subscribeNewsletter && user?.primaryEmailAddress?.emailAddress) {
      try {
        await fetch('/api/omnisend/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: user.primaryEmailAddress.emailAddress,
            source: 'clerk_welcome',
            tags: ['newsletter_subscriber', 'truechem_insights', 'signup_welcome_page']
          })
        })
      } catch (error) {
        console.error('Newsletter subscription failed:', error)
        // Don't block the flow if newsletter fails
      }
    }

    // Continue to dashboard
    router.push('/account/dashboard')
  }

  if (!mounted || !isLoaded || !isSignedIn) {
    return <div className="min-h-screen bg-white" />
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full mx-auto">
        {/* Welcome Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold font-mono mb-4 text-black">
            Welcome to TrueChem
          </h1>
          <p className="text-xl text-gray-600">
            Welcome, {user?.firstName || 'Member'}! Your account has been created successfully.
          </p>
        </div>

        {/* Newsletter Opt-in Card */}
        <div className="bg-white border-2 border-black p-8 mb-8">
          <div className="flex items-start space-x-4">
            <input
              type="checkbox"
              id="newsletter"
              checked={subscribeNewsletter}
              onChange={(e) => setSubscribeNewsletter(e.target.checked)}
              className="mt-1 w-5 h-5 border-2 border-black focus:ring-0 focus:ring-offset-0 checked:bg-black"
            />
            <label htmlFor="newsletter" className="flex-1 cursor-pointer">
              <div className="font-mono font-bold text-black mb-2">
                Join TrueChem Insights Newsletter
              </div>
              <div className="text-sm text-gray-600 leading-relaxed">
                Get weekly research updates, compound deep-dives, and early access to new products. 
                Delivered every Tuesday. Unsubscribe anytime.
              </div>
            </label>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={isSubmitting}
          className="w-full bg-black text-white px-12 py-4 font-mono text-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Setting up...' : 'Continue to Dashboard'}
        </button>

        {/* Small disclaimer */}
        <p className="text-xs text-gray-400 text-center mt-6 font-mono">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
