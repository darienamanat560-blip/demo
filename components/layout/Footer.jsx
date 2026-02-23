'use client'

import { useRouter } from 'next/navigation'

const VialIcon = ({ inverted = false, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 2h8M12 2v4" stroke={inverted ? "#FFFFFF" : "#000000"} strokeWidth="2" strokeLinecap="round"/>
    <rect x="9" y="6" width="6" height="14" rx="1" stroke={inverted ? "#FFFFFF" : "#000000"} strokeWidth="2"/>
    <path d="M9 12h6M9 15h6" stroke={inverted ? "#FFFFFF" : "#000000"} strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

export default function Footer() {
  const router = useRouter()

  return (
    <footer className="py-16 px-6 lg:px-12 bg-black text-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Company */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-black flex items-center justify-center">
                <VialIcon inverted={false} size={38} />
              </div>
              <div>
                <div className="text-2xl font-mono lowercase" style={{ letterSpacing: '0.08em' }}>
                  <span className="font-bold">true</span>
                  <span className="font-normal">chem</span>
                </div>
                <div className="text-[9px] font-mono tracking-[0.15em] text-gray-400 uppercase">
                  99%+ Certified
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Manufactured in ISO 9001:2015 certified facilities. Ultra-pure compounds exceeding 99% purity for scientific research.
            </p>
          </div>

          {/* Products */}
          <div>
            <div className="text-xs font-mono tracking-wider text-gray-400 uppercase mb-4">Products</div>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => router.push('/products?category=glp1')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  GLP-1 Agonists
                </button>
              </li>
              <li>
                <button 
                  onClick={() => router.push('/products?category=recovery')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Recovery
                </button>
              </li>
              <li>
                <button 
                  onClick={() => router.push('/products?category=growth')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Growth Hormone
                </button>
              </li>
              <li>
                <button 
                  onClick={() => router.push('/products?category=metabolic')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Metabolic
                </button>
              </li>
              <li>
                <button 
                  onClick={() => router.push('/products?category=bundles')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Bundles
                </button>
              </li>
              <li>
                <button 
                  onClick={() => router.push('/products?category=medical-supplies')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Medical Supplies
                </button>
              </li>
              <li>
                <button 
                  onClick={() => router.push('/membership')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Research Club
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <div className="text-xs font-mono tracking-wider text-gray-400 uppercase mb-4">Resources</div>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => router.push('/coa')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Certificates of Analysis
                </button>
              </li>
              <li>
                <button 
                  onClick={() => router.push('/testing')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Testing Methodology
                </button>
              </li>
              <li>
                <button 
                  onClick={() => router.push('/faq')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button 
                  onClick={() => router.push('/products')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  All Products
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className="text-xs font-mono tracking-wider text-gray-400 uppercase mb-4">Company</div>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => router.push('/about')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => router.push('/testing')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Quality Assurance
                </button>
              </li>
              <li>
                <button 
                  onClick={() => router.push('/contact')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
              <li>
                <button 
                  onClick={() => router.push('/privacy')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => router.push('/terms')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-xs font-mono text-gray-500">
              © 2026 truechem. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-xs font-mono text-gray-500">
              <span>ISO 9001:2015 FACILITIES</span>
              <span>•</span>
              <span>THIRD-PARTY TESTED</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
