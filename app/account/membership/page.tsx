'use client'
export const dynamic = 'force-dynamic'

import { useState } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────
type Tier = 'free' | 'base' | 'full'
type Tab = 'plans' | 'credit' | 'access' | 'perks'

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function MembershipPage() {
  const currentTier: Tier = 'free' // TODO: read from Supabase via Clerk user
  const [activeTab, setActiveTab] = useState<Tab>('plans')
  const [upgradeTarget, setUpgradeTarget] = useState<Tier | null>(null)

  return (
    <div className="min-h-screen bg-white font-mono">

      {/* ── Top bar ── */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto px-8 py-10">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase mb-2">truechem / account</p>
              <h1 className="text-4xl font-bold tracking-tight text-black">Research Club</h1>
            </div>
            <div className="text-right">
              <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-1">Current Plan</p>
              <p className="text-sm font-bold text-black uppercase tracking-wider">Free</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Launch notice ── */}
      <div className="bg-black text-white px-8 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <p className="text-[11px] tracking-[0.15em] text-gray-400">
            MEMBERSHIP SUBSCRIPTIONS LAUNCHING SOON — PAYRIO INTEGRATION IN PROGRESS
          </p>
          <div className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF] animate-pulse shrink-0"></div>
        </div>
      </div>

      {/* ── Tab nav ── */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-8">
          <div className="flex gap-0">
            {([
              ['plans',  'Plans'],
              ['credit', 'Store Credit'],
              ['access', 'Early Access'],
              ['perks',  'Perks'],
            ] as [Tab, string][]).map(([id, label]) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`px-6 py-4 text-xs tracking-[0.15em] uppercase transition-all border-b-2 -mb-px ${
                  activeTab === id
                    ? 'border-black text-black font-bold'
                    : 'border-transparent text-gray-400 hover:text-gray-600 font-medium'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-5xl mx-auto px-8 py-12">

        {/* ══ PLANS ══════════════════════════════════════════════════════════════ */}
        {activeTab === 'plans' && (
          <div>
            <div className="mb-12">
              <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase mb-3">Membership Tiers</p>
              <h2 className="text-2xl font-bold text-black">Choose your level of access.</h2>
            </div>

            {/* Three-column grid */}
            <div className="grid grid-cols-3 gap-0 border border-gray-200">

              {/* FREE */}
              <div className="border-r border-gray-200 p-8 relative">
                <div className="mb-8">
                  <p className="text-[9px] tracking-[0.3em] text-gray-400 uppercase mb-3">Free</p>
                  <div className="text-5xl font-bold text-black mb-1">$0</div>
                  <p className="text-xs text-gray-400">forever</p>
                </div>

                <div className="space-y-3 mb-10">
                  {[
                    'All products',
                    'COA downloads',
                    'Order history',
                    'Restock alerts',
                    'Newsletter',
                    'Standard support',
                  ].map(f => (
                    <div key={f} className="flex items-start gap-3">
                      <div className="w-px h-3 bg-gray-300 mt-1.5 shrink-0"></div>
                      <span className="text-xs text-gray-500">{f}</span>
                    </div>
                  ))}
                </div>

                <div className="border border-gray-200 py-3 text-center text-xs tracking-[0.15em] text-gray-400 uppercase">
                  Current Plan
                </div>
              </div>

              {/* BASE PREMIUM */}
              <div className="border-r border-gray-200 p-8 relative bg-black text-white">
                {/* Teal top rule */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#2DD4BF]"></div>

                <div className="mb-8">
                  <p className="text-[9px] tracking-[0.3em] text-[#2DD4BF] uppercase mb-3">Base Premium</p>
                  <div className="text-5xl font-bold text-white mb-1">$199</div>
                  <p className="text-xs text-gray-500">per month</p>
                  {/* Credit callout */}
                  <div className="mt-4 border border-[#2DD4BF]/30 bg-[#2DD4BF]/5 px-3 py-2 inline-block">
                    <span className="text-[10px] tracking-[0.2em] text-[#2DD4BF] uppercase">$250 store credit / mo</span>
                  </div>
                </div>

                <div className="space-y-3 mb-10">
                  {[
                    'Everything in Free',
                    '$250 monthly store credit',
                    '10% off all products',
                    'Free priority shipping',
                    '24h early access',
                    'Weekly deep-dive newsletter',
                    'Priority support — 24h response',
                    'Members-only bundles',
                  ].map(f => (
                    <div key={f} className="flex items-start gap-3">
                      <div className="w-px h-3 bg-[#2DD4BF]/50 mt-1.5 shrink-0"></div>
                      <span className="text-xs text-gray-300">{f}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setUpgradeTarget('base')}
                  className="w-full border border-gray-700 py-3 text-xs tracking-[0.2em] text-gray-400 uppercase hover:border-[#2DD4BF] hover:text-[#2DD4BF] transition-all"
                >
                  Coming Soon
                </button>
              </div>

              {/* FULL PREMIUM */}
              <div className="p-8 relative bg-black text-white">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/20"></div>

                <div className="mb-8">
                  <p className="text-[9px] tracking-[0.3em] text-gray-400 uppercase mb-3">Full Premium</p>
                  <div className="text-5xl font-bold text-white mb-1">$499</div>
                  <p className="text-xs text-gray-500">per month</p>
                  {/* Credit callout */}
                  <div className="mt-4 border border-[#2DD4BF]/30 bg-[#2DD4BF]/5 px-3 py-2 inline-block">
                    <span className="text-[10px] tracking-[0.2em] text-[#2DD4BF] uppercase">$600 store credit / mo</span>
                  </div>
                </div>

                <div className="space-y-3 mb-10">
                  {[
                    'Everything in Base Premium',
                    '$600 monthly store credit',
                    '15% off all products',
                    'Free overnight shipping',
                    '48h early access',
                    'Dedicated account manager',
                    'Custom research protocols',
                    '1-on-1 consultations',
                    'Private research community',
                    'Custom compound sourcing',
                  ].map(f => (
                    <div key={f} className="flex items-start gap-3">
                      <div className="w-px h-3 bg-white/20 mt-1.5 shrink-0"></div>
                      <span className="text-xs text-gray-300">{f}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setUpgradeTarget('full')}
                  className="w-full border border-gray-700 py-3 text-xs tracking-[0.2em] text-gray-400 uppercase hover:border-white hover:text-white transition-all"
                >
                  Coming Soon
                </button>
              </div>
            </div>

            {/* Comparison footnote */}
            <div className="mt-8 grid grid-cols-2 gap-px bg-gray-200">
              <div className="bg-white p-6">
                <p className="text-[9px] tracking-[0.25em] text-gray-400 uppercase mb-3">Base Premium — First Month Value</p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between"><span className="text-gray-500">Store credit</span><span className="font-bold">$250</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">10% savings (on $2k spend)</span><span className="font-bold">$200</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Free shipping</span><span className="font-bold">~$40</span></div>
                  <div className="flex justify-between border-t border-gray-100 pt-2 mt-2"><span className="font-bold">Value delivered</span><span className="font-bold text-[#2DD4BF]">$490+</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Cost</span><span className="font-bold">$199</span></div>
                </div>
              </div>
              <div className="bg-white p-6">
                <p className="text-[9px] tracking-[0.25em] text-gray-400 uppercase mb-3">Full Premium — First Month Value</p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between"><span className="text-gray-500">Store credit</span><span className="font-bold">$600</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">15% savings (on $3k spend)</span><span className="font-bold">$450</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Overnight shipping</span><span className="font-bold">~$80</span></div>
                  <div className="flex justify-between border-t border-gray-100 pt-2 mt-2"><span className="font-bold">Value delivered</span><span className="font-bold text-[#2DD4BF]">$1,130+</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Cost</span><span className="font-bold">$499</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══ STORE CREDIT ══════════════════════════════════════════════════════ */}
        {activeTab === 'credit' && (
          <div className="max-w-2xl">
            <div className="mb-10">
              <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase mb-3">Store Credit</p>
              <h2 className="text-2xl font-bold text-black mb-2">Applied automatically at checkout.</h2>
              <p className="text-sm text-gray-500">No codes. No friction. Credit renews monthly with your membership.</p>
            </div>

            {/* Balance card */}
            <div className="border border-gray-200 mb-8">
              <div className="bg-black p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#2DD4BF]/40"></div>
                <p className="text-[9px] tracking-[0.3em] text-gray-500 uppercase mb-4">Available Balance</p>
                <div className="text-6xl font-bold text-white mb-2">$0.00</div>
                <p className="text-xs text-gray-600 tracking-wider">No active membership</p>
              </div>
              <div className="p-6 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="text-gray-400 uppercase tracking-wider mb-1" style={{fontSize:'9px'}}>Base Premium</p>
                    <p className="font-bold text-black">$250 / month</p>
                    <p className="text-gray-400">Renews monthly, expires yearly</p>
                  </div>
                  <div>
                    <p className="text-gray-400 uppercase tracking-wider mb-1" style={{fontSize:'9px'}}>Full Premium</p>
                    <p className="font-bold text-black">$600 / month</p>
                    <p className="text-gray-400">Renews monthly, expires yearly</p>
                  </div>
                </div>
              </div>
              <div className="px-6 pb-5">
                <div className="flex items-center gap-2 text-xs text-gray-400 border border-gray-200 px-3 py-2 w-fit">
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                  Requires PayRio integration to activate
                </div>
              </div>
            </div>

            {/* Transaction history placeholder */}
            <div className="border border-gray-100 p-6 mb-8">
              <p className="text-[9px] tracking-[0.3em] text-gray-400 uppercase mb-4">Transaction History</p>
              <div className="border border-dashed border-gray-200 py-8 text-center">
                <p className="text-xs text-gray-400">No transactions yet</p>
              </div>
            </div>

            {/* How it works */}
            <div>
              <p className="text-[9px] tracking-[0.3em] text-gray-400 uppercase mb-6">How It Works</p>
              <div className="space-y-6">
                {[
                  ['01', 'Credit posts on activation', 'Subscribe to Base or Full Premium. Credit appears in your account instantly when PayRio goes live.'],
                  ['02', 'Shop normally', 'Add products to cart. Available credit reduces your total automatically at checkout — no codes needed.'],
                  ['03', 'Renews every month', 'Credit refreshes on your billing date each month. Unused balance expires after 12 months per our Terms of Service.'],
                  ['04', 'Track in real time', 'Balance and full transaction history are visible here after every order.'],
                ].map(([step, title, desc]) => (
                  <div key={step} className="flex gap-6">
                    <div className="text-[10px] text-[#2DD4BF] font-bold shrink-0 w-6 mt-0.5">{step}</div>
                    <div>
                      <p className="text-sm font-bold text-black mb-1">{title}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══ EARLY ACCESS ══════════════════════════════════════════════════════ */}
        {activeTab === 'access' && (
          <div className="max-w-2xl">
            <div className="mb-10">
              <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase mb-3">Early Access</p>
              <h2 className="text-2xl font-bold text-black mb-2">First in line. Always.</h2>
              <p className="text-sm text-gray-500">Members get exclusive advance windows before new compounds go public.</p>
            </div>

            {/* Access windows */}
            <div className="grid grid-cols-2 gap-px bg-gray-200 mb-10">
              <div className="bg-black p-6 relative">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#2DD4BF]"></div>
                <p className="text-[9px] tracking-[0.3em] text-[#2DD4BF] uppercase mb-3">Base Premium</p>
                <div className="text-4xl font-bold text-white mb-2">24h</div>
                <p className="text-xs text-gray-500">advance access window before public launch</p>
              </div>
              <div className="bg-black p-6 relative">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/20"></div>
                <p className="text-[9px] tracking-[0.3em] text-gray-400 uppercase mb-3">Full Premium</p>
                <div className="text-4xl font-bold text-white mb-2">48h</div>
                <p className="text-xs text-gray-500">advance access window before public launch</p>
              </div>
            </div>

            {/* Upcoming releases */}
            <p className="text-[9px] tracking-[0.3em] text-gray-400 uppercase mb-4">Upcoming Releases</p>
            <div className="space-y-0 border border-gray-200 mb-10">
              {[
                ['BPC-157 Arginate Form', 'Enhanced stability variant. Q2 2025'],
                ['TB-500 Fragment', 'Isolated thymosin beta-4 fragment. Q3 2025'],
              ].map(([name, desc], i) => (
                <div key={name} className={`p-5 flex items-center justify-between ${i > 0 ? 'border-t border-gray-100' : ''}`}>
                  <div>
                    <p className="text-sm font-bold text-black mb-0.5">{name}</p>
                    <p className="text-xs text-gray-400">{desc}</p>
                  </div>
                  <div className="border border-gray-200 px-3 py-1.5 text-[9px] tracking-[0.2em] text-gray-400 uppercase">
                    Members Only
                  </div>
                </div>
              ))}
            </div>

            {/* Locked */}
            <div className="border border-gray-200 p-6 bg-gray-50 text-center">
              <p className="text-xs text-gray-500 mb-1">Reserve access opens with PayRio integration</p>
              <p className="text-[10px] text-gray-400">Members will be notified by email when windows open</p>
            </div>

            {/* How it works */}
            <div className="mt-10">
              <p className="text-[9px] tracking-[0.3em] text-gray-400 uppercase mb-6">How It Works</p>
              <div className="space-y-6">
                {[
                  ['01', 'New compound clears QC', 'Product passes testing and is staged for release. Members receive email notification.'],
                  ['02', 'Member window opens', 'Base Premium: 24h exclusive window. Full Premium: 48h. Log in to reserve your quantity.'],
                  ['03', 'Reserve your allocation', 'Lock in units during your window. Held for 48 hours pending checkout.'],
                  ['04', 'Public launch follows', 'Remaining inventory goes on sale publicly once all member windows close.'],
                ].map(([step, title, desc]) => (
                  <div key={step} className="flex gap-6">
                    <div className="text-[10px] text-[#2DD4BF] font-bold shrink-0 w-6 mt-0.5">{step}</div>
                    <div>
                      <p className="text-sm font-bold text-black mb-1">{title}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══ PERKS ══════════════════════════════════════════════════════════════ */}
        {activeTab === 'perks' && (
          <div>
            <div className="mb-10">
              <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase mb-3">Member Perks</p>
              <h2 className="text-2xl font-bold text-black">What membership actually gets you.</h2>
            </div>

            <div className="grid grid-cols-2 gap-px bg-gray-200">
              {[
                {
                  tag: 'Base + Full',
                  title: 'Monthly Store Credit',
                  body: '$250/mo on Base Premium. $600/mo on Full Premium. Posts on your billing date, applies automatically at checkout. Expires after 12 months — see Terms.',
                  live: false,
                },
                {
                  tag: 'Base + Full',
                  title: 'Early Access Windows',
                  body: 'New compounds available to members 24–48 hours before public launch. Reserve your allocation before general sale opens.',
                  live: false,
                },
                {
                  tag: 'Base + Full',
                  title: 'Automatic Discount',
                  body: '10% off every order on Base Premium. 15% off on Full Premium. Applied at checkout — no codes, no minimums, no limits.',
                  live: false,
                },
                {
                  tag: 'Base + Full',
                  title: 'Priority Restock Alerts',
                  body: 'Email and SMS notifications before public announcements when out-of-stock compounds are restocked.',
                  live: true,
                },
                {
                  tag: 'Full Premium',
                  title: 'Dedicated Account Manager',
                  body: 'A single point of contact for product guidance, sourcing requests, and research support. Direct line, not a ticket queue.',
                  live: false,
                },
                {
                  tag: 'Full Premium',
                  title: 'Custom Protocols',
                  body: 'Request tailored dosing and stacking guides built around your specific research goals. Reviewed and authored by our research team.',
                  live: false,
                },
              ].map((perk) => (
                <div key={perk.title} className="bg-white p-7">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-[9px] tracking-[0.2em] text-gray-400 uppercase border border-gray-200 px-2 py-1">
                      {perk.tag}
                    </div>
                    {!perk.live && (
                      <div className="text-[9px] tracking-[0.15em] text-amber-600 uppercase border border-amber-200 bg-amber-50 px-2 py-1">
                        Coming Soon
                      </div>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-black mb-2">{perk.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{perk.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Upgrade modal ── */}
      {upgradeTarget && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
          onClick={() => setUpgradeTarget(null)}
        >
          <div
            className="bg-white max-w-sm w-full relative"
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#2DD4BF]"></div>
            <div className="p-8">
              <p className="text-[9px] tracking-[0.3em] text-gray-400 uppercase mb-4">Status</p>
              <h3 className="text-xl font-bold text-black mb-3">
                {upgradeTarget === 'base' ? 'Base Premium — $199/mo' : 'Full Premium — $499/mo'}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Subscriptions launch as soon as PayRio payment processing is integrated. 
                All pricing, credits, and features are final.
              </p>
              <div className="border border-gray-100 divide-y divide-gray-100 mb-6">
                {(upgradeTarget === 'base'
                  ? ['$250 store credit each month', '10% off all products', '24h early access', 'Free priority shipping', 'Weekly deep-dive newsletter']
                  : ['$600 store credit each month', '15% off all products', '48h early access', 'Free overnight shipping', 'Dedicated account manager', 'Custom research protocols']
                ).map(item => (
                  <div key={item} className="px-4 py-2.5 text-xs text-gray-600 flex items-center gap-3">
                    <div className="w-px h-3 bg-[#2DD4BF] shrink-0"></div>
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setUpgradeTarget(null)}
                  className="flex-1 py-3 border border-gray-200 text-xs tracking-[0.15em] text-gray-500 uppercase hover:border-gray-400 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => setUpgradeTarget(null)}
                  className="flex-1 py-3 bg-black text-white text-xs tracking-[0.15em] uppercase hover:bg-gray-800 transition-colors"
                >
                  Notify Me
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
