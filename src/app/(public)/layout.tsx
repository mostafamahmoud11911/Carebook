"use client"
import Footer from '@/components/Footer/Footer'
import GoogleLayout from '@/components/GoogleLayout/GoogleLayout'
import PublicNavbar from '@/components/PublicNavbar/PublicNavbar'
import { usePathname } from 'next/navigation'
import React, { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
    const pathname = usePathname();

    const hideFooter = pathname === "/login" || pathname === "/register";
    return (
        <GoogleLayout>
            <div className="pt-20 min-h-screen flex flex-col">
                <PublicNavbar />

                <div className="flex-1">
                    {children}
                </div>

                {!hideFooter && <Footer />}
            </div>
        </GoogleLayout>
    )
}