'use client'
export const dynamic = 'force-dynamic'


import { useUser, useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { User, Mail, Key, CreditCard, MapPin, Shield, LogOut, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export default function SettingsPage() {
  const { user } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const memberSince = user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }) : 'January 1, 2025'

  return (
    <div>
      {/* Header Section */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-[1400px] mx-auto px-8 py-12">
          <h1 className="text-3xl font-bold mb-2 tracking-tight">Account Settings</h1>
          <p className="text-gray-600">Manage your profile, security, and preferences</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - Profile & Membership */}
          <div className="col-span-2 space-y-8">
            {/* Profile Information */}
            <div className="border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <User size={20} strokeWidth={1.5} />
                  <h2 className="text-xl font-bold">Profile Information</h2>
                </div>
                <button className="text-sm font-mono hover:underline">Edit</button>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">
                      First Name
                    </label>
                    <div className="font-mono text-sm">{user?.firstName || 'Not set'}</div>
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">
                      Last Name
                    </label>
                    <div className="font-mono text-sm">{user?.lastName || 'Not set'}</div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">
                    Email Address
                  </label>
                  <div className="flex items-center justify-between">
                    <div className="font-mono text-sm">{user?.primaryEmailAddress?.emailAddress}</div>
                    {user?.primaryEmailAddress?.verification?.status === 'verified' && (
                      <span className="text-xs font-mono text-green-600">Verified</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Membership Status */}
            <div className="border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Shield size={20} strokeWidth={1.5} />
                  <h2 className="text-xl font-bold">Membership Status</h2>
                </div>
                <button 
                  onClick={() => router.push('/account/membership')}
                  className="text-sm font-mono hover:underline flex items-center space-x-1"
                >
                  <span>Manage</span>
                  <ChevronRight size={14} strokeWidth={1.5} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200">
                  <div>
                    <div className="font-bold mb-1">Free Tier</div>
                    <div className="text-sm text-gray-600">Member since {memberSince}</div>
                  </div>
                  <div className="text-xs font-mono uppercase tracking-wider text-gray-500">Active</div>
                </div>
                
                <button
                  onClick={() => router.push('/account/membership')}
                  className="w-full py-3 border border-gray-300 font-mono text-sm hover:bg-gray-50 transition-colors duration-150"
                >
                  Upgrade to Premium
                </button>
              </div>
            </div>

            {/* Security */}
            <div className="border border-gray-200 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Key size={20} strokeWidth={1.5} />
                <h2 className="text-xl font-bold">Security</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200">
                  <div>
                    <div className="font-bold mb-1">Password</div>
                    <div className="text-sm text-gray-600">Last changed 30 days ago</div>
                  </div>
                  <button className="px-4 py-2 border border-gray-300 text-sm font-mono hover:bg-gray-50 transition-colors">
                    Change
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200">
                  <div>
                    <div className="font-bold mb-1">Two-Factor Authentication</div>
                    <div className="text-sm text-gray-600">Add an extra layer of security</div>
                  </div>
                  <button className="px-4 py-2 bg-black text-white text-sm font-mono hover:bg-gray-800 transition-colors">
                    Enable
                  </button>
                </div>
              </div>
            </div>

            {/* Billing */}
            <div className="border border-gray-200 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <CreditCard size={20} strokeWidth={1.5} />
                <h2 className="text-xl font-bold">Billing Information</h2>
              </div>

              <div className="space-y-4">
                <div className="p-8 border border-gray-200 text-center">
                  <CreditCard size={32} strokeWidth={1} className="mx-auto mb-4 text-gray-300" />
                  <p className="text-sm text-gray-600 mb-4">No payment methods saved</p>
                  <button className="px-6 py-2 bg-black text-white text-sm font-mono hover:bg-gray-800 transition-colors">
                    Add Payment Method
                  </button>
                </div>
              </div>
            </div>

            {/* Saved Addresses */}
            <div className="border border-gray-200 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <MapPin size={20} strokeWidth={1.5} />
                <h2 className="text-xl font-bold">Saved Addresses</h2>
              </div>

              <div className="space-y-4">
                <div className="p-8 border border-gray-200 text-center">
                  <MapPin size={32} strokeWidth={1} className="mx-auto mb-4 text-gray-300" />
                  <p className="text-sm text-gray-600 mb-4">No addresses saved</p>
                  <button className="px-6 py-2 bg-black text-white text-sm font-mono hover:bg-gray-800 transition-colors">
                    Add Address
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="border border-gray-200 p-6">
              <h3 className="text-sm font-mono uppercase tracking-wider text-gray-500 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => router.push('/account/dashboard')}
                  className="w-full py-3 border border-gray-200 text-sm font-mono hover:bg-gray-50 transition-colors text-left px-4"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => router.push('/account/orders')}
                  className="w-full py-3 border border-gray-200 text-sm font-mono hover:bg-gray-50 transition-colors text-left px-4"
                >
                  My Orders
                </button>
                <button
                  onClick={() => router.push('/account/documents')}
                  className="w-full py-3 border border-gray-200 text-sm font-mono hover:bg-gray-50 transition-colors text-left px-4"
                >
                  COA Library
                </button>
                <button
                  onClick={() => router.push('/account/membership')}
                  className="w-full py-3 border border-gray-200 text-sm font-mono hover:bg-gray-50 transition-colors text-left px-4"
                >
                  Membership
                </button>
              </div>
            </div>

            {/* Account Info */}
            <div className="border border-gray-200 p-6">
              <h3 className="text-sm font-mono uppercase tracking-wider text-gray-500 mb-4">
                Account Details
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-1">
                    User ID
                  </div>
                  <div className="font-mono text-xs text-gray-700 break-all">{user?.id}</div>
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-1">
                    Member Since
                  </div>
                  <div className="font-mono text-sm">{memberSince}</div>
                </div>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-gray-500 mb-1">
                    Account Status
                  </div>
                  <div className="font-mono text-sm text-green-600">Active</div>
                </div>
              </div>
            </div>

            {/* Sign Out */}
            <button
              onClick={() => signOut(() => router.push('/'))}
              className="w-full py-4 border border-gray-300 font-mono text-sm hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
            >
              <LogOut size={16} strokeWidth={1.5} />
              <span>Sign Out</span>
            </button>

            {/* Danger Zone */}
            <div className="border border-red-200 bg-red-50 p-6">
              <h3 className="text-sm font-mono uppercase tracking-wider text-red-600 mb-4">
                Danger Zone
              </h3>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="w-full py-3 border border-red-300 text-sm font-mono text-red-600 hover:bg-red-100 transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full p-8 border border-gray-200">
            <h3 className="text-xl font-bold mb-4">Delete Account?</h3>
            <p className="text-sm text-gray-600 mb-6">
              This action cannot be undone. All your orders, data, and account information will be permanently deleted.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 font-mono text-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  // Delete account logic here
                  alert('Account deletion would happen here')
                }}
                className="flex-1 px-4 py-3 bg-red-600 text-white font-mono text-sm hover:bg-red-700 transition-colors"
              >
                Delete Forever
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
