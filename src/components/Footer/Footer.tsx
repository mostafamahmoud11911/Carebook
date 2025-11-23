import React from 'react'

export default function Footer() {
    return (
        <div className='p-4 mt-10'>
            <div className='max-w-6xl mx-auto flex flex-col gap-3 justify-center'>
                <p className='text-sm'>© {new Date().getFullYear()} CareBook, Inc</p>
                <p className='text-sm'>created By Mostafa Mahmoud</p>
            </div>
        </div>
    )
}
