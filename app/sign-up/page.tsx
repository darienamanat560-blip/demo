'use client'

import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <SignUp 
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-white shadow-sm border border-gray-200"
          }
        }}
        afterSignUpUrl="/welcome"
        signInUrl="/sign-in"
      />
    </div>
  )
}
