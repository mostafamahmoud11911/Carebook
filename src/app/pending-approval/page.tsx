import Link from 'next/link'
import React from 'react'

export default function PendingApproval() {
    return (
        <div className='h-screen flex justify-center items-center flex-col gap-5'>
            <h3 className='text-3xl underline'>Application submitted! Our team is reviewing your request to become a provider</h3>
            <Link className='mt-4 border border-gray-600 px-4 py-2 rounded-xl' href={'/'}>Go to home</Link>
        </div>
    )
}
