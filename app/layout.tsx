import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'truechem - 99%+ Certified Research Compounds',
  description: 'Ultra-pure research compounds exceeding 99% purity. ISO 9001:2015 certified facilities.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
