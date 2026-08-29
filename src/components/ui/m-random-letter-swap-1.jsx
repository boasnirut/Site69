import React from 'react'
import { RandomLetterSwap } from '@/components/ui/random-letter-swap'

const links = [
  { label: 'หน้าหลัก', href: '/' },
  { label: 'ห้องเรียนออนไลน์', href: '/classroom' },
  { label: 'งานประจำชั้น', href: '/homeroom' },
  { label: 'ผลงาน/รางวัล', href: '/achievements' },
  { label: 'ภาพกิจกรรม', href: '/activities' },
  { label: 'ข้อตกลงในการพัฒนางาน (PA)', href: '/pa' },
]

export default function RandomLetterSwapNav({ currentPath = '/', onNavigate }) {
  return (
    <nav className="flex items-center gap-6 md:gap-8 overflow-x-auto py-2">
      {links.map((link) => {
        const isActive = link.href === currentPath
        return (
          <RandomLetterSwap
            key={link.href}
            label={link.label}
            href={link.href}
            onClick={(e) => {
              if (onNavigate) onNavigate(link.href)
            }}
            className={`cursor-pointer font-semibold text-sm transition-colors ${
              isActive
                ? 'text-amber-500 border-b-2 border-amber-500 pb-1'
                : 'text-gray-300 hover:text-amber-400'
            }`}
          />
        )
      })}
    </nav>
  )
}
