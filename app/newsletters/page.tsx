'use client'

import { Mail } from 'lucide-react'

export default function NewslettersPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 tracking-tight">Newsletters</h1>
        <p className="text-gray-600">Research updates and product announcements</p>
      </div>

      <div className="border border-gray-200 p-16 text-center">
        <Mail size={48} strokeWidth={1} className="mx-auto mb-6 text-gray-300" />
        <p className="text-gray-600 mb-4">No newsletters yet</p>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          You're subscribed to receive research updates. Check back soon for the latest developments.
        </p>
      </div>
    </div>
  )
}
