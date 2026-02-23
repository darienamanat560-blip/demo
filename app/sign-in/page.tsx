'use client'

import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <SignIn 
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-white shadow-sm border border-gray-200"
          }
        }}
        afterSignInUrl="/account/dashboard"
        signUpUrl="/sign-up"
      />
    </div>
  )
}
