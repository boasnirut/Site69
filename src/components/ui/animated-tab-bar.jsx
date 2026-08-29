import React, { useState } from 'react'
import {
  Home,
  Laptop,
  Users,
  Trophy,
  Images,
  FileCheck,
} from 'lucide-react'

const navTabs = [
  { label: 'หน้าหลัก', href: '/', icon: Home },
  { label: 'ห้องเรียนออนไลน์', href: '/classroom', icon: Laptop },
  { label: 'งานประจำชั้น', href: '/homeroom', icon: Users },
  { label: 'ผลงาน/รางวัล', href: '/achievements', icon: Trophy },
  { label: 'ภาพกิจกรรม', href: '/activities', icon: Images },
  { label: 'ข้อตกลงในการพัฒนางาน (PA)', href: '/pa', icon: FileCheck },
]

export default function AnimatedTabBar({ currentPath = '/', onNavigate }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const activeIndex = Math.max(
    0,
    navTabs.findIndex((tab) => tab.href === currentPath)
  )

  return (
    <nav className="relative flex items-center bg-gray-900/80 backdrop-blur-md border border-amber-900/30 p-1.5 rounded-2xl shadow-xl overflow-x-auto max-w-full">
      <div className="flex items-center gap-1 min-w-max">
        {navTabs.map((tab, index) => {
          const Icon = tab.icon
          const isActive = index === activeIndex
          const isHovered = index === hoveredIndex

          return (
            <a
              key={tab.href}
              href={tab.href}
              onClick={(e) => {
                if (onNavigate) onNavigate(tab.href)
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 select-none no-underline ${
                isActive
                  ? 'text-amber-950 font-bold'
                  : 'text-gray-300 hover:text-amber-200'
              }`}
              style={{ textDecoration: 'none' }}
            >
              {/* Active Tab Sliding Pill Highlight */}
              {isActive && (
                <div
                  className="absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 rounded-xl shadow-lg shadow-amber-500/25 z-0"
                  style={{
                    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
              )}

              {/* Hover Pill Highlight */}
              {!isActive && isHovered && (
                <div className="absolute inset-0 bg-amber-500/10 border border-amber-500/30 rounded-xl z-0 transition-all duration-200" />
              )}

              {/* Tab Icon and Label */}
              <span className="relative z-10 flex items-center gap-2">
                <Icon
                  size={17}
                  className={`transition-transform duration-300 ${
                    isActive ? 'text-amber-950 scale-110' : 'text-amber-400/90'
                  }`}
                />
                <span className="whitespace-nowrap">{tab.label}</span>
              </span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}
