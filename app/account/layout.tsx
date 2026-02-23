'use client'

export const dynamic = 'force-dynamic'

import { useUser, useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { User } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function AccountLayout({ children }) {
  const { user, isSignedIn, isLoaded } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in')
    }
  }, [isLoaded, isSignedIn, router])

  if (!mounted || !isLoaded || !isSignedIn) {
    return null
  }

  // Vial Icon from screenshot
  const VialIcon = ({ size = 20 }) => (
    <svg width={size} height={size * 1.4} viewBox="0 0 24 34" fill="none">
      <rect x="6" y="1" width="12" height="5" rx="1" fill="currentColor"/>
      <path d="M7 6V9H17V6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M7 9V28C7 30.7614 9.23858 33 12 33C14.7614 33 17 30.7614 17 28V9" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M8.5 20V28C8.5 29.933 10.067 31.5 12 31.5C13.933 31.5 15.5 29.933 15.5 28V20H8.5Z" fill="currentColor"/>
    </svg>
  )

  return (
    <div className="min-h-screen bg-white">
      {/* White Header with Border */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Same as Landing Page */}
            <button 
              onClick={() => router.push('/')}
              className="flex items-center space-x-2.5 hover:opacity-70 transition-opacity"
            >
              <VialIcon size={16} />
              <div className="flex flex-col">
                <div className="text-sm font-mono lowercase tracking-wide leading-none text-black">
                  <span className="font-bold">true</span>
                  <span className="font-normal">chem</span>
                </div>
                <div className="text-[8px] font-mono tracking-[0.15em] text-gray-400 uppercase leading-none mt-0.5">
                  Member
                </div>
              </div>
            </button>

            {/* Center Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => router.push('/#products')}
                className="text-sm font-mono text-gray-600 hover:text-black transition-colors duration-150"
              >
                Products
              </button>
              <button
                onClick={() => router.push('/account/documents')}
                className="text-sm font-mono text-gray-600 hover:text-black transition-colors duration-150"
              >
                COA Library
              </button>
              <button
                onClick={() => router.push('/account/dashboard')}
                className="text-sm font-mono text-gray-600 hover:text-black transition-colors duration-150"
              >
                Account
              </button>
              <button
                onClick={() => router.push('/account/membership')}
                className="text-sm font-mono text-gray-600 hover:text-black transition-colors duration-150"
              >
                Membership
              </button>
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-6">
              {/* Cart */}
              <button
                onClick={() => router.push('/')}
                className="text-sm font-mono text-gray-600 hover:text-black transition-colors duration-150"
              >
                Cart (0)
              </button>

              {/* Account Icon */}
              <div className="relative">
                <button
                  onClick={() => setShowAccountMenu(!showAccountMenu)}
                  onBlur={() => setTimeout(() => setShowAccountMenu(false), 200)}
                  className="p-2 hover:bg-gray-100 rounded transition-colors duration-150"
                >
                  <User size={18} strokeWidth={1.5} className="text-gray-600" />
                </button>

                {showAccountMenu && (
                  <div className="absolute right-0 top-12 w-56 bg-white border border-gray-200 shadow-sm z-50">
                    <div className="p-4 border-b border-gray-100">
                      <div className="text-sm font-mono truncate text-black">{user?.primaryEmailAddress?.emailAddress}</div>
                      <div className="text-xs text-gray-500 mt-1">{user?.firstName || 'Account'}</div>
                    </div>
                    <div className="py-2">
                      <button
                        onClick={() => {
                          setShowAccountMenu(false)
                          router.push('/account/dashboard')
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={() => {
                          setShowAccountMenu(false)
                          signOut(() => router.push('/'))
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-500 hover:bg-gray-50 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="bg-white">
        {children}
      </main>
    </div>
  )
}
