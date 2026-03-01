'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import { useState, useEffect } from 'react'
import { products } from '@/data/products'
import { Beaker } from 'lucide-react'

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

export default function ProductsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { cartItemCount } = useCart()
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category'))

  useEffect(() => {
    setCategoryFilter(searchParams.get('category'))
  }, [searchParams])

  const filteredProducts = categoryFilter
    ? products.filter(p => p.category === categoryFilter)
    : products

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <button onClick={() => router.push('/')} className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-black flex items-center justify-center"><VialIcon inverted={false} size={38} /></div>
              <div>
                <div className="text-2xl font-mono text-black lowercase" style={{ letterSpacing: '0.08em' }}>
                  <span className="font-bold">true</span><span className="font-normal">chem</span>
                </div>
                <div className="text-[9px] font-mono tracking-[0.15em] text-gray-500 uppercase">99%+ Certified</div>
              </div>
            </button>
          </div>
        </div>
      </header>

      <section className="pt-32 pb-16 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-4">All Products</h1>
            <p className="text-xl text-gray-600">Research-grade peptides and professional medical supplies</p>
          </div>

          {/* Category Filters */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => router.push('/products')}
                className={`px-6 py-3 font-mono text-sm transition-all ${
                  !categoryFilter ? 'bg-black text-white' : 'bg-white border border-gray-300 hover:border-black'
                }`}
              >
                All Products
              </button>
              <button
                onClick={() => router.push('/products?category=glp1')}
                className={`px-6 py-3 font-mono text-sm transition-all ${
                  categoryFilter === 'glp1' ? 'bg-black text-white' : 'bg-white border border-gray-300 hover:border-black'
                }`}
              >
                GLP-1 Agonists
              </button>
              <button
                onClick={() => router.push('/products?category=recovery')}
                className={`px-6 py-3 font-mono text-sm transition-all ${
                  categoryFilter === 'recovery' ? 'bg-black text-white' : 'bg-white border border-gray-300 hover:border-black'
                }`}
              >
                Recovery
              </button>
              <button
                onClick={() => router.push('/products?category=growth')}
                className={`px-6 py-3 font-mono text-sm transition-all ${
                  categoryFilter === 'growth' ? 'bg-black text-white' : 'bg-white border border-gray-300 hover:border-black'
                }`}
              >
                Growth Hormone
              </button>
              <button
                onClick={() => router.push('/products?category=metabolic')}
                className={`px-6 py-3 font-mono text-sm transition-all ${
                  categoryFilter === 'metabolic' ? 'bg-black text-white' : 'bg-white border border-gray-300 hover:border-black'
                }`}
              >
                Metabolic
              </button>
              <button
                onClick={() => router.push('/products?category=bundles')}
                className={`px-6 py-3 font-mono text-sm transition-all ${
                  categoryFilter === 'bundles' ? 'bg-black text-white' : 'bg-white border border-gray-300 hover:border-black'
                }`}
              >
                Bundles
              </button>
              <button
                onClick={() => router.push('/products?category=medical-supplies')}
                className={`px-6 py-3 font-mono text-sm transition-all ${
                  categoryFilter === 'medical-supplies' ? 'bg-black text-white' : 'bg-white border border-gray-300 hover:border-black'
                }`}
              >
                Medical Supplies
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                onClick={() => router.push(`/products/${product.id}`)}
                className="bg-white border-2 border-gray-200 hover:border-black hover:shadow-2xl transition-all duration-200 group cursor-pointer flex flex-col"
              >
                <div className="aspect-square bg-gray-50 flex items-center justify-center p-8 border-b-2 border-gray-200 group-hover:border-black transition-colors duration-200">
                  <Beaker size={80} className="text-gray-300 group-hover:text-black transition-colors duration-200" />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-[10px] font-mono text-gray-400 mb-3">{product.id}</div>
                  
                  <div className="flex flex-wrap gap-2 mb-4 min-h-[28px]">
                    {product.badge && (
                      <div className="inline-block px-2 py-1 bg-black text-white text-[8px] font-mono uppercase">
                        {product.badge}
                      </div>
                    )}
                    {!product.inStock && (
                      <div className="inline-block px-2 py-1 bg-red-600 text-white text-[8px] font-mono uppercase">
                        OUT OF STOCK
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-bold mb-3">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  
                  {product.purity && (
                    <div className="mb-4">
                      <div className="text-xs font-mono text-gray-500 mb-1">PURITY</div>
                      <div className="text-sm font-bold">{product.purity}</div>
                    </div>
                  )}
                  
                  <div className="mt-auto pt-4 border-t border-gray-200">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs font-mono text-gray-500">FROM</span>
                      <span className="text-2xl font-bold font-mono">{product.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
