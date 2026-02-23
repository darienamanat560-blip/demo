import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import Script from 'next/script'
import { CartProvider } from '@/contexts/CartContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'TrueChem - Research Peptides',
  description: 'Premium research peptides with verified purity',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <CartProvider>
            {children}
          </CartProvider>
          
          {/* Omnisend Tracking */}
          <Script id="omnisend-snippet" strategy="afterInteractive">
            {`
              window.omnisend = window.omnisend || [];
              omnisend.push(["brandID", "697aee045360f826924491db"]);
              omnisend.push(["track", "$pageViewed"]);
              !function(){var e=document.createElement("script");
              e.type="text/javascript",e.async=!0,
              e.src="https://omnisnippet1.com/inshop/launcher-v2.js";
              var t=document.getElementsByTagName("script")[0];
              t.parentNode.insertBefore(e,t)
              }();
            `}
          </Script>
        </body>
      </html>
    </ClerkProvider>
  )
}
