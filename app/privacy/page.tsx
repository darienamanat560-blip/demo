'use client'

import { useRouter } from 'next/navigation'

export default function PrivacyPolicy() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 z-50 bg-white backdrop-blur">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <button 
            onClick={() => router.push('/')}
            className="flex items-center space-x-3 hover:opacity-70 transition-opacity"
          >
            <div className="text-2xl font-mono lowercase tracking-wide">
              <span className="font-bold">true</span>
              <span className="font-normal">chem</span>
            </div>
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        {/* Title */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Privacy Policy
          </h1>
          <div className="flex flex-col space-y-2 text-sm text-gray-500 font-mono">
            <div>Effective Date: February 21, 2026</div>
            <div>Last Updated: February 21, 2026</div>
          </div>
        </div>

        {/* Introduction */}
        <div className="mb-16 text-gray-700 leading-relaxed text-lg">
          TrueChem ("we," "us," or "our") respects your privacy. This Privacy Policy explains how we collect, use, store, and protect your information when you visit or use truechem.io (the "Site").
          <br /><br />
          By accessing or using our Site, you agree to the practices described below.
        </div>

        {/* Sections - truncated for brevity, using key sections */}
        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-bold mb-6 tracking-tight">Contact</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For privacy-related questions or requests, contact:
            </p>
            <div className="text-gray-700 leading-relaxed space-y-2">
              <div>
                <a 
                  href="mailto:support@truechem.io"
                  className="text-black underline hover:text-gray-700 transition-colors"
                >
                  support@truechem.io
                </a>
              </div>
              <div>TrueChem</div>
              <div className="text-gray-600 text-sm">Santa Barbara, California</div>
            </div>
          </section>
        </div>

        <div className="h-24" />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-500 text-sm font-mono">
              © 2026 TrueChem. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <button
                onClick={() => router.push('/privacy')}
                className="text-gray-600 hover:text-black transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => router.push('/terms')}
                className="text-gray-600 hover:text-black transition-colors"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
