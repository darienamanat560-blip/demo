'use client'

import { useRouter } from 'next/navigation'
import { ShoppingCart } from 'lucide-react'
import { useUser } from '@clerk/nextjs'

const VialIcon = ({ inverted = false, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 2h8M12 2v4" stroke={inverted ? "#FFFFFF" : "#000000"} strokeWidth="2" strokeLinecap="round"/>
    <rect x="9" y="6" width="6" height="14" rx="1" stroke={inverted ? "#FFFFFF" : "#000000"} strokeWidth="2"/>
    <path d="M9 12h6M9 15h6" stroke={inverted ? "#FFFFFF" : "#000000"} strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

export default function Header({ cartItemCount = 0 }) {
  const router = useRouter()
  const { isSignedIn } = useUser()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => router.push('/')} 
            className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-black flex items-center justify-center">
              <VialIcon inverted={false} size={38} />
            </div>
            <div>
              <div className="text-2xl font-mono text-black lowercase" style={{ letterSpacing: '0.08em' }}>
                <span className="font-bold">true</span>
                <span className="font-normal">chem</span>
              </div>
              <div className="text-[9px] font-mono tracking-[0.15em] text-gray-500 uppercase">
                99%+ Certified
              </div>
            </div>
          </button>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => router.push('/products')}
              className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
            >
              Products
            </button>
            <button 
              onClick={() => router.push('/about')}
              className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => router.push('/testing')}
              className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
            >
              Testing
            </button>
            <button 
              onClick={() => router.push('/membership')}
              className="text-sm font-medium text-teal-600 hover:text-teal-500 transition-colors"
            >
              Research Club
            </button>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {isSignedIn ? (
              <button
                onClick={() => router.push('/account')}
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
              >
                Account
              </button>
            ) : (
              <button
                onClick={() => router.push('/sign-in')}
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
              >
                Sign In
              </button>
            )}
            
            <button 
              onClick={() => router.push('/cart')}
              className="p-2 hover:bg-gray-100 rounded-lg relative transition-colors"
            >
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-black text-white text-[10px] font-mono font-bold rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
