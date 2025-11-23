"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React, { PropsWithChildren } from 'react'

export default function GoogleLayout({children}: PropsWithChildren) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      {children}
    </GoogleOAuthProvider>
  )
}
