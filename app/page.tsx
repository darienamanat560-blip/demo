'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'
import TruchemWebsite from '@/components/TruchemWebsite'

export default function HomePage() {
  const { isLoaded } = useUser()

  if (!isLoaded) {
    return <div className="min-h-screen bg-white" />
  }

  return <TruchemWebsite />
}
