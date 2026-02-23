'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useCart } from '@/contexts/CartContext'

export default function TermsPage() {
  const { cartItemCount } = useCart()

  return (
    <div className="min-h-screen bg-white">
      <Header cartItemCount={cartItemCount} />

      <main className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Terms of Service
          </h1>
          <div className="flex flex-col space-y-2 text-sm text-gray-500 font-mono">
            <div>Effective Date: February 21, 2026</div>
            <div>Last Updated: February 21, 2026</div>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            By accessing or using truechem.io (the "Site"), you agree to these Terms of Service. Please read them carefully.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">1. Research Use Only</h2>
          <p className="text-gray-700 leading-relaxed">
            All products sold on this Site are intended strictly for laboratory research purposes only. They are not intended for human consumption, therapeutic use, veterinary use, or any non-research applications.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">2. Age Requirement</h2>
          <p className="text-gray-700 leading-relaxed">
            You must be at least 21 years old to access or use this Site. By using the Site, you confirm that you meet this age requirement.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">3. Account Registration</h2>
          <p className="text-gray-700 leading-relaxed">
            To make a purchase, you must create an account. You are responsible for maintaining the security of your account credentials and for all activities that occur under your account.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">4. Orders and Payment</h2>
          <p className="text-gray-700 leading-relaxed">
            All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order. Payment is processed securely through our third-party payment processor.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">5. Shipping and Delivery</h2>
          <p className="text-gray-700 leading-relaxed">
            Shipping times are estimates and not guaranteed. We are not responsible for delays caused by shipping carriers or customs.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">6. Returns and Refunds</h2>
          <p className="text-gray-700 leading-relaxed">
            Due to the nature of our products, returns are only accepted for damaged or defective items. Please contact support@truechem.io within 7 days of receipt.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">7. Intellectual Property</h2>
          <p className="text-gray-700 leading-relaxed">
            All content on this Site, including text, graphics, logos, and software, is the property of TrueChem and protected by copyright and trademark laws.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">8. Limitation of Liability</h2>
          <p className="text-gray-700 leading-relaxed">
            TrueChem shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Site or products.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">9. Contact</h2>
          <p className="text-gray-700 leading-relaxed">
            For questions about these Terms, contact us at{' '}
            <a href="mailto:support@truechem.io" className="text-black underline hover:text-gray-600">
              support@truechem.io
            </a>
          </p>
        </div>

        <div className="h-24" />
      </main>

      <Footer />
    </div>
  )
}
