'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { useCart } from '@/contexts/CartContext'
import { Mail, Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ContactPage() {
  const { cartItemCount } = useCart()
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white">
      <Header cartItemCount={cartItemCount} />

      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <div className="text-[10px] font-mono tracking-[0.25em] text-gray-500 uppercase mb-6">Support</div>
            <h1 className="text-5xl font-bold text-black mb-6 tracking-tight">Contact Us</h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
              Questions about products, orders, or research applications? Our team responds within 24 hours.
            </p>
          </div>

          {/* Contact Methods Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Email */}
            <div className="border-2 border-black p-8 hover:bg-black hover:text-white transition-all duration-200 group">
              <div className="mb-6">
                <Mail size={32} strokeWidth={1.5} className="text-black group-hover:text-white transition-colors" />
              </div>
              <div className="text-[10px] font-mono tracking-[0.25em] uppercase mb-3 text-gray-500 group-hover:text-gray-300">
                Email Support
              </div>
              <a 
                href="mailto:support@truechem.io"
                className="text-2xl font-bold mb-2 block hover:opacity-70 transition-opacity"
              >
                support@truechem.io
              </a>
              <p className="text-sm text-gray-600 group-hover:text-gray-300 leading-relaxed">
                General inquiries, product questions, order support
              </p>
            </div>

            {/* Response Time */}
            <div className="border-2 border-gray-200 p-8">
              <div className="mb-6">
                <Clock size={32} strokeWidth={1.5} className="text-gray-400" />
              </div>
              <div className="text-[10px] font-mono tracking-[0.25em] uppercase mb-3 text-gray-500">
                Response Time
              </div>
              <div className="text-2xl font-bold mb-2">
                24 Hours
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Monday–Friday, 9 AM – 6 PM PST<br />
                Priority support for Research Club members
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="border border-gray-200 p-12 mb-16">
            <h2 className="text-2xl font-bold mb-8">Send a Message</h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono tracking-[0.15em] text-gray-500 uppercase mb-3">
                    Your Name
                  </label>
                  <input 
                    type="text" 
                    placeholder="Full name"
                    className="w-full px-4 py-3 border-2 border-gray-200 focus:border-black focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono tracking-[0.15em] text-gray-500 uppercase mb-3">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 focus:border-black focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono tracking-[0.15em] text-gray-500 uppercase mb-3">
                  Subject
                </label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 focus:border-black focus:outline-none bg-white transition-colors">
                  <option>General Inquiry</option>
                  <option>Order Status</option>
                  <option>Product Question</option>
                  <option>COA Request</option>
                  <option>Wholesale/Bulk Orders</option>
                  <option>Custom Synthesis</option>
                  <option>Research Club</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono tracking-[0.15em] text-gray-500 uppercase mb-3">
                  Message
                </label>
                <textarea 
                  rows={6}
                  placeholder="How can we help with your research?"
                  className="w-full px-4 py-3 border-2 border-gray-200 focus:border-black focus:outline-none resize-none transition-colors"
                />
              </div>

              <button className="w-full py-4 bg-black text-white font-mono text-sm tracking-[0.15em] uppercase hover:bg-gray-800 transition-all">
                Send Message
              </button>

              <p className="text-xs text-gray-500 text-center font-mono">
                We typically respond within 24 hours during business days
              </p>
            </div>
          </div>

          {/* FAQ Quick Links */}
          <div className="border-t border-gray-200 pt-12">
            <h3 className="text-sm font-mono tracking-[0.2em] uppercase text-gray-500 mb-6">
              Common Questions
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <button 
                onClick={() => router.push('/faq')}
                className="text-left p-4 border border-gray-200 hover:border-black transition-colors group"
              >
                <div className="font-bold mb-1 group-hover:underline">Order Status & Tracking</div>
                <div className="text-sm text-gray-600">Track shipments and delivery estimates</div>
              </button>
              <button 
                onClick={() => router.push('/coa')}
                className="text-left p-4 border border-gray-200 hover:border-black transition-colors group"
              >
                <div className="font-bold mb-1 group-hover:underline">Certificates of Analysis</div>
                <div className="text-sm text-gray-600">View third-party testing results</div>
              </button>
              <button 
                onClick={() => router.push('/testing')}
                className="text-left p-4 border border-gray-200 hover:border-black transition-colors group"
              >
                <div className="font-bold mb-1 group-hover:underline">Testing & Quality</div>
                <div className="text-sm text-gray-600">Our verification methodology</div>
              </button>
              <button 
                onClick={() => router.push('/membership')}
                className="text-left p-4 border border-gray-200 hover:border-black transition-colors group"
              >
                <div className="font-bold mb-1 group-hover:underline">Research Club</div>
                <div className="text-sm text-gray-600">Membership benefits and pricing</div>
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
