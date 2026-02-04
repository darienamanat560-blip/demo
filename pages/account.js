import { useUser, SignOutButton } from '@clerk/nextjs'
import { useRouter } from 'next/router'

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

export default function AccountPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-mono text-sm">Loading your account...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold mb-4">Please Sign In</h1>
          <p className="text-gray-600 mb-6">You need to be signed in to view your account</p>
          <button 
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-black text-white font-mono text-sm hover:bg-gray-800"
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <button onClick={() => router.push('/')} className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-black flex items-center justify-center">
                <VialIcon inverted={false} size={38} />
              </div>
              <div>
                <div className="text-2xl font-mono text-black lowercase" style={{ letterSpacing: '0.08em' }}>
                  <span className="font-bold">true</span>
                  <span className="font-normal">chem</span>
                </div>
                <div className="text-[9px] font-mono tracking-[0.15em] text-gray-500 uppercase">99%+ Certified</div>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          
          {/* Welcome Section */}
          <div className="mb-12 text-center">
            <div className="w-20 h-20 bg-black text-white flex items-center justify-center rounded-full font-mono text-3xl font-bold mx-auto mb-4">
              {user.firstName?.[0] || user.emailAddresses[0]?.emailAddress[0].toUpperCase()}
            </div>
            <h1 className="text-4xl font-bold mb-2">
              Welcome, {user.firstName || 'Researcher'}!
            </h1>
            <p className="text-gray-600 font-mono text-sm">
              {user.emailAddresses[0]?.emailAddress}
            </p>
          </div>

          {/* Account Info Card */}
          <div className="bg-gray-50 border-2 border-gray-200 p-8 mb-6">
            <h2 className="text-xl font-bold mb-6">Account Information</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-600 font-mono text-sm">Full Name</span>
                <span className="font-medium">
                  {user.firstName} {user.lastName}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-600 font-mono text-sm">Email</span>
                <span className="font-medium">{user.emailAddresses[0]?.emailAddress}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-600 font-mono text-sm">Member Since</span>
                <span className="font-medium">
                  {new Date(user.createdAt).toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600 font-mono text-sm">Account Status</span>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-mono uppercase tracking-wider font-bold">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button 
              onClick={() => router.push('/')}
              className="border border-gray-200 p-6 hover:border-black transition-all text-center"
            >
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="font-bold mb-1">Browse Products</h3>
              <p className="text-xs text-gray-600">View research compounds</p>
            </button>
            
            <button className="border border-gray-200 p-6 hover:border-black transition-all text-center">
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold mb-1">Order History</h3>
              <p className="text-xs text-gray-600">Track your orders</p>
            </button>
          </div>

          {/* Email Preferences */}
          <div className="bg-black text-white p-8 mb-6">
            <h2 className="text-xl font-bold mb-4">Email Notifications</h2>
            <p className="text-sm text-gray-400 mb-6">
              Stay updated on new products, restock alerts, and exclusive offers
            </p>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" defaultChecked />
                <span className="text-sm">Restock notifications</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" defaultChecked />
                <span className="text-sm">New product launches</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" defaultChecked />
                <span className="text-sm">Order updates</span>
              </label>
            </div>
          </div>

          {/* Sign Out */}
          <div className="text-center">
            <SignOutButton>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 font-mono text-sm hover:border-black transition-all">
                Sign Out
              </button>
            </SignOutButton>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-6">
            <button 
              onClick={() => router.push('/')}
              className="text-sm text-gray-600 hover:text-black font-mono"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
