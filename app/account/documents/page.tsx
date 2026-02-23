'use client'
export const dynamic = 'force-dynamic'


import { FileText, Download, Search } from 'lucide-react'
import { useState } from 'react'

export default function DocumentsPage() {
  const [lotNumber, setLotNumber] = useState('')

  return (
    <div>
      {/* Header Section */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-[1400px] mx-auto px-8 py-12">
          <h1 className="text-3xl font-bold mb-2 tracking-tight">COA Library</h1>
          <p className="text-gray-600">Access certificates of analysis and test results</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        {/* Batch Lookup */}
        <div className="border border-gray-200 p-10 mb-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-6">Verify Any Batch</h2>
            <p className="text-sm text-gray-600 mb-6">
              Enter a lot number to view the Certificate of Analysis
            </p>
            
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="LOT-XXXXXXXX"
                value={lotNumber}
                onChange={(e) => setLotNumber(e.target.value.toUpperCase())}
                className="flex-1 px-4 py-3 border border-gray-300 font-mono text-sm focus:border-black focus:outline-none transition-colors"
              />
              <button 
                onClick={() => lotNumber && alert(`Viewing COA for ${lotNumber}`)}
                className="px-8 py-3 bg-black text-white font-mono text-sm hover:bg-gray-800 transition-colors flex items-center space-x-2"
              >
                <Search size={16} strokeWidth={1.5} />
                <span>View COA</span>
              </button>
            </div>
          </div>
        </div>

        {/* My Documents */}
        <div>
          <h2 className="text-xl font-bold mb-6">My Documents</h2>
          <div className="border border-gray-200 p-16 text-center">
            <FileText size={48} strokeWidth={1} className="mx-auto mb-6 text-gray-300" />
            <p className="text-gray-600 mb-4">No documents yet</p>
            <p className="text-sm text-gray-500">
              COAs will appear here after you place orders
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
