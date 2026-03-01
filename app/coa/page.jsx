'use client'

import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import { FileText, Download, Shield } from 'lucide-react'

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

export default function COAPage() {
  const router = useRouter()
  const { cartItemCount } = useCart()

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            <button onClick={() => router.push('/')} className="flex items-center space-x-3 cursor-pointer">
              <div className="w-10 h-10 bg-black flex items-center justify-center"><VialIcon inverted={false} size={38} /></div>
              <div>
                <div className="text-2xl font-mono text-black lowercase" style={{ letterSpacing: '0.08em' }}>
                  <span className="font-bold">true</span><span className="font-normal">chem</span>
                </div>
                <div className="text-[9px] font-mono tracking-[0.15em] text-gray-500 uppercase">99%+ Certified</div>
              </div>
            </button>
            <button onClick={() => router.push('/')} className="text-sm font-medium text-gray-600 hover:text-black">
              ← Back
            </button>
          </div>
        </div>
      </header>

      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="inline-block px-3 py-1 bg-black text-white text-[10px] font-mono tracking-[0.2em] uppercase mb-6">
              Quality Assurance
            </div>
            <h1 className="text-5xl font-bold text-black mb-6">Certificates of Analysis</h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Every batch is independently tested by accredited third-party laboratories. 
              Full transparency, real results, no exceptions.
            </p>
          </div>

          {/* Value Props */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white border-2 border-gray-200 p-8 hover:border-black transition-all">
              <Shield className="w-10 h-10 mb-4 text-black" />
              <h3 className="text-lg font-bold mb-2">Third-Party Verified</h3>
              <p className="text-sm text-gray-600">
                Tested by Eurofins, SGS, and Charles River Laboratories
              </p>
            </div>
            <div className="bg-white border-2 border-gray-200 p-8 hover:border-black transition-all">
              <FileText className="w-10 h-10 mb-4 text-black" />
              <h3 className="text-lg font-bold mb-2">Batch-Specific COAs</h3>
              <p className="text-sm text-gray-600">
                Every vial ships with its own Certificate of Analysis
              </p>
            </div>
            <div className="bg-white border-2 border-gray-200 p-8 hover:border-black transition-all">
              <Download className="w-10 h-10 mb-4 text-black" />
              <h3 className="text-lg font-bold mb-2">Download Anytime</h3>
              <p className="text-sm text-gray-600">
                Access COAs before purchase, available on every product page
              </p>
            </div>
          </div>

          {/* What's Tested */}
          <div className="bg-white border-2 border-gray-200 p-12 mb-16">
            <h2 className="text-3xl font-bold mb-8">What We Test</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-3">Purity Analysis (HPLC)</h3>
                <p className="text-gray-600 mb-4">
                  High-Performance Liquid Chromatography confirms &gt;99% purity for every batch.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-3">Mass Spectrometry</h3>
                <p className="text-gray-600 mb-4">
                  Molecular weight verification ensures correct compound identity.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-3">Contamination Testing</h3>
                <p className="text-gray-600 mb-4">
                  Screens for heavy metals, bacteria, and other contaminants.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-3">Sterility Testing</h3>
                <p className="text-gray-600 mb-4">
                  Confirms products meet pharmaceutical-grade sterility standards.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-black text-white p-12">
            <h2 className="text-3xl font-bold mb-4">View Product COAs</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              COAs are available on every product page. Browse our catalog to see 
              the third-party testing results for each batch.
            </p>
            <button
              onClick={() => router.push('/products')}
              className="px-8 py-4 bg-white text-black font-mono text-sm hover:bg-gray-200 transition-all"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 bg-black text-white">
        <div className="max-w-[1400px] mx-auto text-center">
          <div className="text-xs font-mono text-gray-500">
            © 2026 truechem. All rights reserved. • ISO 9001:2015 FACILITIES • THIRD-PARTY TESTED
          </div>
        </div>
      </footer>
    </div>
  );
}
