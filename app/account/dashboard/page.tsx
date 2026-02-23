'use client'

export const dynamic = 'force-dynamic'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Package, FileText, Mail, Settings, ChevronRight, Microscope } from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function DashboardPage() {
  const { user } = useUser()
  const router = useRouter()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [welcomeVisible, setWelcomeVisible] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)
  const [lotNumber, setLotNumber] = useState('')
  const [isFirstVisit, setIsFirstVisit] = useState(false)

  useEffect(() => {
    const hasVisited = localStorage.getItem('truechem_visited')
    if (!hasVisited) {
      setIsFirstVisit(true)
      localStorage.setItem('truechem_visited', 'true')
    }

    setTimeout(() => setWelcomeVisible(true), 100)
    setTimeout(() => setContentVisible(true), 350)

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

  const memberSince = user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  }) : 'Jan 2025'

  return (
    <div className="bg-white">
      {/* Welcome Section - White Background with Gray Border Box */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-8 py-12">
          <div className="border border-gray-200 p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 
                  className={`text-4xl font-bold mb-3 tracking-tight transition-all duration-200 ease-in-out ${
                    welcomeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}
                >
                  {isFirstVisit ? 'Welcome to TrueChem' : 'Welcome back'}, {user?.firstName || user?.primaryEmailAddress?.emailAddress?.split('@')[0]}.
                </h1>
                <p 
                  className={`text-gray-600 transition-all duration-200 ease-in-out delay-75 ${
                    welcomeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}
                >
                  Your membership is active. Browse our catalog below.
                </p>
              </div>
              <div 
                className={`flex items-center space-x-6 transition-all duration-200 ease-in-out delay-100 ${
                  welcomeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
              >
                {/* Member Since */}
                <div className="text-center">
                  <div className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">Member Since</div>
                  <div className="font-mono text-black">{memberSince}</div>
                </div>
                
                {/* Divider */}
                <div className="h-12 w-px bg-gray-300"></div>
                
                {/* Plan */}
                <div className="text-center">
                  <div className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">Plan</div>
                  <div className="font-mono text-black">Monthly</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Module Cards - White Background */}
      <div className="bg-white">
        <div className="max-w-[1400px] mx-auto px-8 py-12">
          <div 
            className={`grid grid-cols-4 gap-6 mb-16 transition-all duration-250 ease-in-out ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            {/* My Orders */}
            <button
              onClick={() => router.push('/account/orders')}
              className="border border-gray-200 p-8 text-left hover:border-gray-400 hover:-translate-y-1 hover:shadow-sm transition-all duration-150 group"
            >
              <div className="flex items-start justify-between mb-6">
                <Package size={24} strokeWidth={1.5} className="text-teal-500 group-hover:text-teal-600 transition-colors" />
                <ChevronRight size={20} strokeWidth={1.5} className="text-gray-300 group-hover:text-gray-600 transition-colors" />
              </div>
              <div className="text-xl font-bold mb-2">My Orders</div>
              <div className="text-sm text-gray-600 mb-4">View order history and track shipments</div>
              <div className="text-2xl font-mono font-bold">{orders.length}</div>
              <div className="text-xs font-mono uppercase tracking-wider text-gray-500">Total Orders</div>
            </button>

            {/* COA Library */}
            <button
              onClick={() => router.push('/account/documents')}
              className="border border-gray-200 p-8 text-left hover:border-gray-400 hover:-translate-y-1 hover:shadow-sm transition-all duration-150 group"
            >
              <div className="flex items-start justify-between mb-6">
                <FileText size={24} strokeWidth={1.5} className="text-teal-500 group-hover:text-teal-600 transition-colors" />
                <ChevronRight size={20} strokeWidth={1.5} className="text-gray-300 group-hover:text-gray-600 transition-colors" />
              </div>
              <div className="text-xl font-bold mb-2">COA Library</div>
              <div className="text-sm text-gray-600 mb-4">Access certificates and test results</div>
              <div className="text-2xl font-mono font-bold">0</div>
              <div className="text-xs font-mono uppercase tracking-wider text-gray-500">Documents</div>
            </button>

            {/* Newsletters */}
            <button
              onClick={() => router.push('/account/newsletters')}
              className="border border-gray-200 p-8 text-left hover:border-gray-400 hover:-translate-y-1 hover:shadow-sm transition-all duration-150 group"
            >
              <div className="flex items-start justify-between mb-6">
                <Mail size={24} strokeWidth={1.5} className="text-teal-500 group-hover:text-teal-600 transition-colors" />
                <ChevronRight size={20} strokeWidth={1.5} className="text-gray-300 group-hover:text-gray-600 transition-colors" />
              </div>
              <div className="text-xl font-bold mb-2">Newsletters</div>
              <div className="text-sm text-gray-600 mb-4">Research updates and announcements</div>
              <div className="text-2xl font-mono font-bold">—</div>
              <div className="text-xs font-mono uppercase tracking-wider text-gray-500">Subscribed</div>
            </button>

            {/* Account Settings */}
            <button
              onClick={() => router.push('/account/settings')}
              className="border border-gray-200 p-8 text-left hover:border-gray-400 hover:-translate-y-1 hover:shadow-sm transition-all duration-150 group"
            >
              <div className="flex items-start justify-between mb-6">
                <Settings size={24} strokeWidth={1.5} className="text-teal-500 group-hover:text-teal-600 transition-colors" />
                <ChevronRight size={20} strokeWidth={1.5} className="text-gray-300 group-hover:text-gray-600 transition-colors" />
              </div>
              <div className="text-xl font-bold mb-2">Account</div>
              <div className="text-sm text-gray-600 mb-4">Manage settings and preferences</div>
              <div className="text-2xl font-mono font-bold">—</div>
              <div className="text-xs font-mono uppercase tracking-wider text-gray-500">Settings</div>
            </button>
          </div>

          {/* Batch Verification Center */}
          <div className="border border-gray-200 p-12">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 border border-gray-200 mb-6">
                  <Microscope size={32} strokeWidth={1.5} className="text-teal-500" />
                </div>
                <h2 className="text-2xl font-bold mb-3">Batch Verification Center</h2>
                <p className="text-gray-600">
                  Verify any lot number to view third-party testing results and certificates of analysis
                </p>
              </div>

              <div className="mb-12">
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={lotNumber}
                    onChange={(e) => setLotNumber(e.target.value.toUpperCase())}
                    placeholder="Enter Lot Number (e.g. LOT-2025-001)"
                    className="flex-1 px-6 py-4 border border-gray-200 font-mono text-sm focus:border-black focus:outline-none transition-colors"
                  />
                  <button 
                    onClick={() => {
                      if (lotNumber) {
                        alert(`Verifying lot: ${lotNumber}`)
                      }
                    }}
                    disabled={!lotNumber}
                    className="px-12 py-4 bg-black text-white font-mono text-sm hover:bg-gray-800 transition-colors disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                  >
                    View COA
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-3 font-mono">
                  All batches are tested by independent third-party laboratories
                </p>
              </div>

              <div className="mb-12">
                <h3 className="text-sm font-mono uppercase tracking-wider text-gray-500 mb-4">
                  Recently Verified
                </h3>
                <div className="border border-gray-200">
                  <div className="p-8 text-center text-sm text-gray-500">
                    No batches verified yet
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-mono uppercase tracking-wider text-gray-500 mb-4">
                  Latest Transparency Updates
                </h3>
                <div className="space-y-3">
                  <div className="border border-gray-200 p-6 hover:border-gray-400 transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-mono text-sm mb-2">January 2025 Testing Report</div>
                        <div className="text-xs text-gray-600">All batches passed purity verification (99.2% average)</div>
                      </div>
                      <div className="text-xs font-mono text-gray-400">Jan 15</div>
                    </div>
                  </div>
                  <div className="border border-gray-200 p-6 hover:border-gray-400 transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-mono text-sm mb-2">New Testing Partner: Eurofins</div>
                        <div className="text-xs text-gray-600">Expanded third-party verification capabilities</div>
                      </div>
                      <div className="text-xs font-mono text-gray-400">Jan 8</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
