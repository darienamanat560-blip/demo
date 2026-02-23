'use client'

import { Crown, Check } from 'lucide-react'

export default function MembershipPage() {
  const tiers = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      current: true,
      features: [
        'Access to all products',
        'COA downloads',
        'Order history',
        'Basic support',
        'Batch verification'
      ]
    },
    {
      name: 'Premium',
      price: '$49',
      period: 'per month',
      features: [
        'Everything in Free',
        '10% discount on all orders',
        'Priority support (24h response)',
        'Early access to new products',
        'Extended documentation',
        'Exclusive research reports'
      ],
      badge: 'Coming Soon'
    },
    {
      name: 'Institutional',
      price: 'Custom',
      period: 'contact us',
      features: [
        'Everything in Premium',
        'Volume discounts',
        'Dedicated account manager',
        'Custom formulations',
        'Bulk ordering',
        'Net-30 payment terms'
      ],
      badge: 'Coming Soon'
    }
  ]

  return (
    <div>
      {/* Header Section */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-[1400px] mx-auto px-8 py-12">
          <h1 className="text-3xl font-bold mb-2 tracking-tight">Membership</h1>
          <p className="text-gray-600">Upgrade your access for premium benefits</p>
        </div>
      </div>

      {/* Tiers */}
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        <div className="grid grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`border p-8 relative ${
                tier.current ? 'border-black' : 'border-gray-200'
              }`}
            >
              {tier.badge && (
                <div className="absolute top-4 right-4 px-2 py-1 bg-gray-900 text-white text-xs font-mono">
                  {tier.badge}
                </div>
              )}

              <div className="flex items-center space-x-2 mb-6">
                <Crown size={20} strokeWidth={1.5} />
                <h3 className="text-xl font-bold">{tier.name}</h3>
              </div>
              
              <div className="mb-8">
                <div className="flex items-baseline space-x-1">
                  <span className="text-4xl font-bold font-mono">{tier.price}</span>
                  <span className="text-sm text-gray-500">/ {tier.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <Check size={16} strokeWidth={1.5} className="flex-shrink-0 mt-0.5 text-gray-400" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                disabled={tier.current || tier.badge === 'Coming Soon'}
                className={`w-full py-3 font-mono text-sm transition-colors ${
                  tier.current
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    : tier.badge === 'Coming Soon'
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {tier.current ? 'Current Plan' : tier.badge === 'Coming Soon' ? 'Coming Soon' : 'Upgrade'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
