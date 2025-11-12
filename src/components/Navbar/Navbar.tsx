"use client"
import { useAuthStore } from '@/store/useAuthStore'
import React from 'react'


export default function Navbar() {
    const { user } = useAuthStore();
    return (
        <nav className='flex items-center h-[60px]'>

            <p className='text-xl font-semibold text-gray-700 ms-5'>Carebook</p>

            <div className='flex justify-end items-center w-full'>
                <ul>
                    <li>
                        <div>
                            <h5 className='font-semibold mr-3 text-sm'>{user?.username}</h5>
                            <h6 className='mr-3 text-xs'>{user?.role}</h6>
                        </div>
                    </li>

                </ul>
            </div>
        </nav>
    )
}
