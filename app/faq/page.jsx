'use client'

import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import { useState, useEffect } from 'react'

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

export default function FAQPage() {
  const router = useRouter()
  const { cartItemCount } = useCart()
  const [openFAQ, setOpenFAQ] = useState(null)

  // Add CSS for animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .faq-card {
        border: 2px solid transparent;
        transition: all 0.2s ease;
      }
      .faq-card:hover {
        border-color: #000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      }
      .faq-button {
        transition: background-color 0.2s ease;
      }
      .faq-button:hover {
        background-color: #f9fafb;
      }
      .faq-answer-enter {
        animation: slideDown 0.3s ease-out;
      }
      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .faq-icon {
        transition: transform 0.3s ease;
      }
      .faq-icon.open {
        transform: rotate(180deg);
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const faqCategories = [
    {
      category: "Products & Quality",
      questions: [
        {
          q: "What purity level do your products have?",
          a: "All truechem products are >99% pure, verified through third-party testing. Each batch includes a Certificate of Analysis (COA) showing exact purity levels from independent laboratories."
        },
        {
          q: "Are your products tested by third parties?",
          a: "Yes. Every single batch is tested by independent, accredited laboratories including Eurofins, SGS, and Charles River Laboratories. We provide full COAs with HPLC, mass spectrometry, and contamination testing results."
        },
        {
          q: "Where are your products manufactured?",
          a: "All truechem products are manufactured in ISO 9001:2015 certified facilities in the United States. We maintain strict pharmaceutical-grade quality control throughout the entire production process."
        },
        {
          q: "What makes truechem different from competitors?",
          a: "We're actually made in the USA (not relabeled Chinese imports), third-party tested every batch (not just claiming it), and transparent with real COAs. Most competitors can't honestly claim all three."
        },
        {
          q: "Do you provide Certificates of Analysis?",
          a: "Yes. Every product ships with a batch-specific COA showing HPLC purity analysis, mass spectrometry results, and contamination testing. You can also access COAs on our website before purchasing."
        }
      ]
    },
    {
      category: "Ordering & Shipping",
      questions: [
        {
          q: "How long does shipping take?",
          a: "Orders ship within 1-2 business days. Domestic shipping typically takes 2-5 business days depending on your location. We use discreet, temperature-controlled packaging."
        },
        {
          q: "Do you ship internationally?",
          a: "Currently we only ship within the United States. International shipping requires compliance with various regulations we're not yet equipped to handle."
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept major credit cards, debit cards, and cryptocurrency. All transactions are processed through secure, encrypted payment gateways."
        },
        {
          q: "Is my purchase discreet?",
          a: "Yes. All orders ship in plain packaging with no external branding. The return address and shipping label contain no reference to peptides or research chemicals."
        },
        {
          q: "Can I cancel or modify my order?",
          a: "Orders can be modified or cancelled within 2 hours of placement. Contact us immediately at support@truechem.io if you need to make changes."
        }
      ]
    },
    {
      category: "Storage & Handling",
      questions: [
        {
          q: "How should I store my products?",
          a: "Lyophilized (powder) products should be stored at 2-8°C (refrigerated) and are stable for up to 2 years. Once reconstituted, refrigerate and use within 30 days. Never freeze reconstituted peptides."
        },
        {
          q: "What if my product arrives warm?",
          a: "Lyophilized peptides are remarkably stable at room temperature for several days. If your package arrived warm but wasn't sitting in extreme heat for extended periods, your product is fine. Refrigerate immediately upon receipt."
        },
        {
          q: "What's the shelf life of your products?",
          a: "Unopened lyophilized peptides stored properly (2-8°C) remain stable for 24+ months. Once reconstituted, use within 30 days when refrigerated. We include manufacture and expiration dates on every vial."
        }
      ]
    },
    {
      category: "Legal & Compliance",
      questions: [
        {
          q: "Are research peptides legal?",
          a: "Research peptides are legal to purchase and possess for laboratory research purposes. They are NOT approved for human consumption and should only be used in research settings by qualified individuals."
        },
        {
          q: "Do I need a license to purchase?",
          a: "No license is required for research peptide purchases. However, you must be 21+ years old and agree that products are for research purposes only, not for human consumption."
        },
        {
          q: "Can I use these products for personal use?",
          a: "No. Our products are sold strictly for laboratory research purposes only. They are not intended for human consumption, therapeutic use, or any non-research applications. This is stated clearly in our Terms of Service."
        },
        {
          q: "Do your products come with usage instructions?",
          a: "We provide storage, handling, and reconstitution guidelines for laboratory use. We do NOT provide dosing protocols, administration methods, or any information related to human use as this violates federal regulations."
        }
      ]
    },
    {
      category: "Returns & Support",
      questions: [
        {
          q: "What's your return policy?",
          a: "We do not accept returns due to the nature of research chemicals. However, if you receive a damaged, incorrect, or defective product due to our error, contact us immediately and we'll send a replacement at no cost. We stand behind the quality of every product we ship."
        },
        {
          q: "What if I'm not satisfied with my purchase?",
          a: "We stand behind our products 100%. If you're not satisfied with the quality or purity of your purchase, contact us with your concerns and COA results. We'll make it right."
        },
        {
          q: "How do I contact customer support?",
          a: "Email us at support@truechem.io. We respond to all inquiries within 24 hours, typically much faster. For order-specific questions, please include your order number."
        },
        {
          q: "Do you offer wholesale or bulk pricing?",
          a: "Yes. For research institutions, universities, or businesses requiring larger quantities, contact us at wholesale@truechem.io for custom pricing and terms."
        }
      ]
    }
  ];

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
              ← Back to Home
            </button>
          </div>
        </div>
      </header>

      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 bg-black text-white text-[10px] font-mono tracking-[0.2em] uppercase mb-6">
              Frequently Asked Questions
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-black mb-4">Common Questions</h1>
            <p className="text-lg text-gray-600">
              Everything you need to know about truechem products, quality, and ordering.
            </p>
          </div>

          {faqCategories.map((category, catIndex) => (
            <div key={catIndex} className="mb-12">
              <h2 className="text-xl font-bold text-black mb-6 font-mono tracking-wide">{category.category}</h2>
              <div className="space-y-3">
                {category.questions.map((faq, faqIndex) => {
                  const faqId = `${catIndex}-${faqIndex}`;
                  const isOpen = openFAQ === faqId;
                  
                  return (
                    <div key={faqIndex} className="faq-card bg-white overflow-hidden rounded-sm">
                      <button
                        onClick={() => setOpenFAQ(isOpen ? null : faqId)}
                        className="faq-button w-full px-6 py-5 text-left flex items-start justify-between"
                      >
                        <span className="faq-question font-medium text-gray-800 pr-8">{faq.q}</span>
                        <span className={`faq-icon text-gray-400 text-xl flex-shrink-0 mt-[-2px] ${isOpen ? 'open' : ''}`}>
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="faq-answer-enter px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100">
                          <p className="pt-4">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Still Have Questions */}
          <div className="mt-16 bg-black text-white p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">Still Have Questions?</h3>
            <p className="text-gray-400 mb-6">
              Can't find what you're looking for? Our team is here to help.
            </p>
            <button 
              onClick={() => router.push('/contact')}
              className="inline-block px-8 py-3 bg-white text-black font-mono text-sm hover:bg-gray-200 transition-all"
            >
              Contact Support
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
