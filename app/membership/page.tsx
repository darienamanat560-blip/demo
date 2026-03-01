'use client'

import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import { ShoppingCart } from 'lucide-react'
import FooterNewsletter from '@/components/FooterNewsletter'

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

export default function MembershipPage() {
  const router = useRouter()
  const { cartItemCount } = useCart()

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <button onClick={() => router.push('/')} className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white flex items-center justify-center"><VialIcon inverted={true} size={38} /></div>
              <div>
                <div className="text-2xl font-mono text-white lowercase" style={{ letterSpacing: '0.08em' }}>
                  <span className="font-bold">true</span>
                  <span className="font-normal">chem</span>
                </div>
                <div className="text-[9px] font-mono tracking-[0.15em] text-gray-400 uppercase">99%+ Certified</div>
              </div>
            </button>
            <button 
              onClick={() => router.push('/cart')}
              className="p-2 hover:bg-gray-900 rounded-lg relative"
            >
              <ShoppingCart size={20} className="text-white" />
              {cartItemCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-teal-400 text-black text-[10px] font-mono font-bold rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-40 pb-24 px-6 lg:px-12">
        <div className="max-w-[1100px] mx-auto">
          <p className="text-[10px] font-mono tracking-[0.35em] text-gray-500 uppercase mb-6">truechem / research club</p>
          <h1 className="text-6xl md:text-7xl font-bold text-white leading-[1.05] mb-8 tracking-tight">
            Not for everyone.<br />
            <span className="text-gray-500">Built for those</span><br />
            who demand more.
          </h1>
          <div className="w-12 h-px bg-[#2DD4BF] mb-8"></div>
          <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
            Monthly store credit. Early access to every new compound. 
            Pricing that rewards serious researchers.
          </p>
        </div>
      </section>

      {/* Tier cards */}
      <section className="pb-4 px-6 lg:px-12">
        <div className="max-w-[1100px] mx-auto grid lg:grid-cols-3 gap-0 border border-gray-800">

          {/* Free */}
          <div className="border-r border-gray-800 p-10">
            <p className="text-[9px] font-mono tracking-[0.3em] text-gray-600 uppercase mb-6">Standard</p>
            <div className="text-5xl font-bold text-gray-600 mb-1 font-mono">$0</div>
            <p className="text-xs text-gray-700 font-mono mb-8">forever</p>
            <div className="space-y-3 mb-10">
              {['All products', 'COA downloads', 'Order history', 'Restock alerts', 'Newsletter'].map(f => (
                <div key={f} className="flex items-center gap-3">
                  <div className="w-3 h-px bg-gray-700"></div>
                  <span className="text-xs text-gray-600">{f}</span>
                </div>
              ))}
            </div>
            <div className="border border-gray-800 py-3 text-center text-[10px] font-mono tracking-[0.2em] text-gray-600 uppercase">
              Free Forever
            </div>
          </div>

          {/* Base Premium */}
          <div className="border-r border-gray-800 p-10 relative">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#2DD4BF]"></div>
            <p className="text-[9px] font-mono tracking-[0.3em] text-[#2DD4BF] uppercase mb-6">Base Premium</p>
            <div className="text-5xl font-bold text-white mb-1 font-mono">$199</div>
            <p className="text-xs text-gray-500 font-mono mb-2">per month</p>
            <div className="inline-flex items-center gap-2 border border-[#2DD4BF]/25 px-3 py-1.5 mb-8">
              <div className="w-1.5 h-1.5 bg-[#2DD4BF]"></div>
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#2DD4BF] uppercase">$250 store credit / mo</span>
            </div>
            <div className="space-y-3 mb-10">
              {[
                'Everything in Free',
                '$250 monthly store credit',
                '10% off all products',
                'Free priority shipping',
                '24h early product access',
                'Weekly research deep-dive',
                'Priority support',
                'Members-only bundles',
              ].map(f => (
                <div key={f} className="flex items-center gap-3">
                  <div className="w-3 h-px bg-gray-500"></div>
                  <span className="text-xs text-gray-300">{f}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => alert('Base Premium membership coming soon. Join the newsletter to be notified when it launches.')}
              className="w-full border border-gray-700 py-3.5 text-[10px] font-mono tracking-[0.25em] text-gray-400 uppercase hover:border-white hover:text-white transition-all duration-200"
            >
              Coming Soon
            </button>
          </div>

          {/* Full Premium */}
          <div className="p-10 relative bg-[#080808]">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gray-700"></div>
            <p className="text-[9px] font-mono tracking-[0.3em] text-gray-400 uppercase mb-6">Full Premium</p>
            <div className="text-5xl font-bold text-white mb-1 font-mono">$499</div>
            <p className="text-xs text-gray-500 font-mono mb-2">per month</p>
            <div className="inline-flex items-center gap-2 border border-[#2DD4BF]/25 px-3 py-1.5 mb-8">
              <div className="w-1.5 h-1.5 bg-[#2DD4BF]"></div>
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#2DD4BF] uppercase">$600 store credit / mo</span>
            </div>
            <div className="space-y-3 mb-10">
              {[
                'Everything in Base Premium',
                '$600 monthly store credit',
                '15% off all products',
                'Free overnight shipping',
                '48h early product access',
                'Dedicated account manager',
                'Custom research protocols',
                '1-on-1 consultations',
                'Private research community',
                'Custom compound sourcing',
              ].map(f => (
                <div key={f} className="flex items-center gap-3">
                  <div className="w-3 h-px bg-gray-600"></div>
                  <span className="text-xs text-gray-300">{f}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => alert('Full Premium membership coming soon. Join the newsletter to be notified when it launches.')}
              className="w-full border border-gray-700 py-3.5 text-[10px] font-mono tracking-[0.25em] text-gray-400 uppercase hover:border-white hover:text-white transition-all duration-200"
            >
              Coming Soon
            </button>
          </div>

        </div>
      </section>

      {/* Value breakdown */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid md:grid-cols-2 gap-0 border border-gray-800">

            <div className="border-r border-gray-800 p-10">
              <p className="text-[9px] font-mono tracking-[0.3em] text-gray-600 uppercase mb-8">Base Premium — Month 1 Value</p>
              <div className="space-y-4 font-mono text-sm">
                {[
                  ['Store credit', '$250'],
                  ['10% savings on $2,000 spend', '$200'],
                  ['Free priority shipping', '~$40'],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-gray-600">{label}</span>
                    <span className="text-white font-bold">{val}</span>
                  </div>
                ))}
                <div className="border-t border-gray-800 pt-4 flex justify-between">
                  <span className="text-white font-bold">Value delivered</span>
                  <span className="text-[#2DD4BF] font-bold">$490+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cost</span>
                  <span className="text-white">$199</span>
                </div>
              </div>
            </div>

            <div className="p-10">
              <p className="text-[9px] font-mono tracking-[0.3em] text-gray-600 uppercase mb-8">Full Premium — Month 1 Value</p>
              <div className="space-y-4 font-mono text-sm">
                {[
                  ['Store credit', '$600'],
                  ['15% savings on $3,000 spend', '$450'],
                  ['Free overnight shipping', '~$80'],
                  ['Dedicated manager access', '~$200'],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-gray-600">{label}</span>
                    <span className="text-white font-bold">{val}</span>
                  </div>
                ))}
                <div className="border-t border-gray-800 pt-4 flex justify-between">
                  <span className="text-white font-bold">Value delivered</span>
                  <span className="text-[#2DD4BF] font-bold">$1,330+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cost</span>
                  <span className="text-white">$499</span>
                </div>
              </div>
            </div>

          </div>
          <p className="text-[10px] font-mono text-gray-700 mt-6 tracking-wider text-center uppercase">
            Store credit alone exceeds the membership cost. Subscriptions launching soon.
          </p>
        </div>
      </section>

      {/* Feature grid */}
      <section className="pb-20 px-6 lg:px-12">
        <div className="max-w-[1100px] mx-auto">
          <p className="text-[9px] font-mono tracking-[0.35em] text-gray-600 uppercase mb-12">What membership includes</p>
          <div className="grid md:grid-cols-3 gap-0 border border-gray-800">
            {[
              { num: '01', title: 'Monthly Store Credit', body: 'Renews every billing cycle. Applies automatically at checkout — no codes. $250 on Base, $600 on Full.' },
              { num: '02', title: 'Early Access', body: '24h window on Base Premium. 48h on Full Premium. First in line before every public launch.' },
              { num: '03', title: 'Automatic Discount', body: '10% off every order on Base. 15% on Full. No minimums, no limits, no coupon codes.' },
              { num: '04', title: 'Free Shipping', body: 'Priority shipping on Base Premium. Overnight on Full Premium. Every order, every time.' },
              { num: '05', title: 'Research Support', body: 'Priority support on Base. Full Premium members get a dedicated account manager and 1-on-1 consultations.' },
              { num: '06', title: 'Expert Newsletter', body: 'Weekly deep-dives on compounds, mechanisms, and protocols. Personalized for Full Premium members.' },
            ].map((item, i) => (
              <div
                key={item.num}
                className={`p-8 ${i % 3 !== 2 ? 'border-r border-gray-800' : ''} ${i < 3 ? 'border-b border-gray-800' : ''}`}
              >
                <p className="text-[9px] font-mono text-[#2DD4BF] tracking-[0.25em] mb-4">{item.num}</p>
                <h3 className="text-sm font-bold text-white mb-3">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 lg:px-12 border-t border-gray-900">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
          <div>
            <p className="text-[9px] font-mono tracking-[0.35em] text-gray-600 uppercase mb-4">Launching Soon</p>
            <h2 className="text-4xl font-bold text-white leading-tight">
              Memberships open<br />
              soon.
            </h2>
            <p className="text-gray-500 text-sm mt-4 max-w-md leading-relaxed">
              Subscribe to the newsletter and you'll be first to know — 
              early subscribers may receive a launch discount.
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
            <div className="flex gap-3">
              <button
                onClick={() => alert('Coming soon — join the newsletter to be notified.')}
                className="px-8 py-4 border border-gray-700 text-[10px] font-mono tracking-[0.25em] text-gray-400 uppercase hover:border-white hover:text-white transition-all"
              >
                Base Premium — $199/mo
              </button>
              <button
                onClick={() => alert('Coming soon — join the newsletter to be notified.')}
                className="px-8 py-4 bg-white text-black text-[10px] font-mono tracking-[0.25em] uppercase hover:bg-gray-100 transition-all"
              >
                Full Premium — $499/mo
              </button>
            </div>
            <p className="text-[10px] font-mono text-gray-700 tracking-wider">Cancel anytime. No commitment.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 lg:px-12 bg-black text-white border-t border-gray-900">
        <div className="max-w-[1400px] mx-auto">
          <FooterNewsletter />
          
          <div className="mt-12 text-center text-xs text-gray-500 font-mono">
            © 2026 truechem. All rights reserved. • ISO 9001:2015 FACILITIES • THIRD-PARTY TESTED
          </div>
        </div>
      </footer>
    </div>
  )
}
