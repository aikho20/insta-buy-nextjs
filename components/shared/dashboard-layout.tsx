'use client'
import { DASHBOARD_MENU } from '@/utils/data'
import { useParams, usePathname, useRouter, useSelectedLayoutSegment } from 'next/navigation'
import React from 'react'

interface ProviderProps {
  children: React.ReactNode
  toggle: boolean
}
export default function DashboardLayout({ children, toggle }: ProviderProps) {
  const pathname = usePathname()
  const router = useRouter()
  return (
    <div className={`relative grid grid-cols-4 gap-0 min-h-screen p-0 flex-1`}>
      <div className={` flex-1 col-span-1 p-3 flex flex-col gap-2`}>
        {DASHBOARD_MENU.map((items, index) => (
          <div
            key={index}
            onClick={() => {
              router.push(items.route)
            }}
            className={`p-2 text-sm ${pathname === items.route ? 'bg-slate-200 rounded' : ''} `}
          >
            {items.title}
          </div>
        ))}
      </div>
      <div className='flex col-span-3 bg-slate-100 p-3'>{children}</div>
    </div>
  )
}
