import Navbar from '@/components/Navbar/Navbar'
import Sidebar from '@/components/Sidebar/Sidebar'
import React, { PropsWithChildren } from 'react'




export default async function DashboardLayout({ children }: PropsWithChildren) {
  return (
      <div className='overflow-auto h-screen flex bg-red-100'>

        <Sidebar />


        <div className='flex-1'>
          <Navbar />
          <div className='p-3'>
            {children}
          </div>
        </div>
      </div>
  )
}
