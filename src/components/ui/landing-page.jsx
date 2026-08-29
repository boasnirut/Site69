import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import Globe from '@/components/ui/globe'
import { cn } from '@/lib/utils'

const defaultGlobeConfig = {
  positions: [
    { top: '50%', left: '75%', scale: 1.4 },
    { top: '25%', left: '50%', scale: 0.9 },
    { top: '15%', left: '85%', scale: 1.6 },
    { top: '50%', left: '50%', scale: 1.5 },
  ],
}

const parsePercent = (str) => parseFloat(str.replace('%', ''))

export function ScrollGlobe({ sections, globeConfig = defaultGlobeConfig, className }) {
  const [activeSection, setActiveSection] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [globeTransform, setGlobeTransform] = useState('')
  const containerRef = useRef(null)
  const sectionRefs = useRef([])
  const animationFrameId = useRef()

  const calculatedPositions = useMemo(() => {
    return globeConfig.positions.map((pos) => ({
      top: parsePercent(pos.top),
      left: parsePercent(pos.left),
      scale: pos.scale,
    }))
  }, [globeConfig.positions])

  const updateScrollPosition = useCallback(() => {
    const scrollTop = window.pageYOffset
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = Math.min(Math.max(scrollTop / (docHeight || 1), 0), 1)

    setScrollProgress(progress)

    const viewportCenter = window.innerHeight / 2
    let newActiveSection = 0
    let minDistance = Infinity

    sectionRefs.current.forEach((ref, index) => {
      if (ref) {
        const rect = ref.getBoundingClientRect()
        const sectionCenter = rect.top + rect.height / 2
        const distance = Math.abs(sectionCenter - viewportCenter)

        if (distance < minDistance) {
          minDistance = distance
          newActiveSection = index
        }
      }
    })

    const currentPos = calculatedPositions[newActiveSection] || calculatedPositions[0]
    const transform = `translate3d(${currentPos.left}vw, ${currentPos.top}vh, 0) translate3d(-50%, -50%, 0) scale3d(${currentPos.scale}, ${currentPos.scale}, 1)`

    setGlobeTransform(transform)
    setActiveSection(newActiveSection)
  }, [calculatedPositions])

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        animationFrameId.current = requestAnimationFrame(() => {
          updateScrollPosition()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateScrollPosition()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [updateScrollPosition])

  useEffect(() => {
    const initialPos = calculatedPositions[0]
    const initialTransform = `translate3d(${initialPos.left}vw, ${initialPos.top}vh, 0) translate3d(-50%, -50%, 0) scale3d(${initialPos.scale}, ${initialPos.scale}, 1)`
    setGlobeTransform(initialTransform)
  }, [calculatedPositions])

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full max-w-screen overflow-x-hidden min-h-screen bg-background text-foreground',
        className
      )}
    >
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500/20 via-amber-500/40 to-amber-500/20 z-50">
        <div
          className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 will-change-transform shadow-sm"
          style={{
            transform: `scaleX(${scrollProgress})`,
            transformOrigin: 'left center',
            transition: 'transform 0.15s ease-out',
            filter: 'drop-shadow(0 0 4px rgba(245, 158, 11, 0.4))',
          }}
        />
      </div>

      <div className="hidden sm:flex fixed right-4 lg:right-8 top-1/2 -translate-y-1/2 z-40">
        <div className="space-y-4">
          {sections.map((section, index) => (
            <div key={index} className="relative group">
              <div
                className={cn(
                  'nav-label absolute right-6 top-1/2 -translate-y-1/2',
                  'px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap',
                  'bg-background/95 backdrop-blur-md border border-border/60 shadow-xl z-50',
                  activeSection === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
                )}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span>{section.badge || `Section ${index + 1}`}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  sectionRefs.current[index]?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                  })
                }}
                className={cn(
                  'relative w-3 h-3 rounded-full border-2 transition-all duration-300 hover:scale-125',
                  activeSection === index
                    ? 'bg-amber-500 border-amber-500 shadow-lg'
                    : 'bg-transparent border-gray-400 hover:border-amber-400'
                )}
                aria-label={`Go to ${section.badge || `section ${index + 1}`}`}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        className="fixed z-10 pointer-events-none will-change-transform transition-all duration-[1400ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{
          transform: globeTransform,
          filter: `opacity(${activeSection === 3 ? 0.45 : 0.95})`,
        }}
      >
        <div className="scale-75 sm:scale-90 lg:scale-100">
          <Globe />
        </div>
      </div>

      {sections.map((section, index) => (
        <section
          key={section.id}
          ref={(el) => (sectionRefs.current[index] = el)}
          className={cn(
            'relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-16 z-20 py-16 lg:py-24',
            'w-full max-w-full overflow-hidden',
            section.align === 'center' && 'items-center text-center',
            section.align === 'right' && 'items-end text-right',
            section.align !== 'center' && section.align !== 'right' && 'items-start text-left'
          )}
        >
          <div className="w-full max-w-xl lg:max-w-3xl xl:max-w-4xl transition-all duration-700">
            <h1 className="font-bold mb-6 leading-tight tracking-tight text-3xl sm:text-5xl lg:text-6xl">
              {section.subtitle ? (
                <div className="space-y-2">
                  <div className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
                    {section.title}
                  </div>
                  <div className="text-amber-200/80 text-[0.6em] font-medium tracking-wider">
                    {section.subtitle}
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
                  {section.title}
                </div>
              )}
            </h1>

            <div className="text-gray-300 leading-relaxed mb-8 text-base sm:text-lg lg:text-xl font-light">
              <p className="mb-4">{section.description}</p>
            </div>

            {section.features && (
              <div className="grid gap-4 mb-8">
                {section.features.map((feature) => (
                  <div
                    key={feature.title}
                    className="p-5 rounded-xl border border-amber-900/40 bg-gray-900/60 backdrop-blur-md hover:border-amber-500/40 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-amber-200 text-lg">{feature.title}</h3>
                        <p className="text-gray-400 text-sm sm:text-base">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {section.actions && (
              <div className="flex flex-wrap gap-4">
                {section.actions.map((action) => (
                  <button
                    key={action.label}
                    onClick={action.onClick}
                    className={cn(
                      'px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 text-base',
                      action.variant === 'primary'
                        ? 'bg-amber-500 text-gray-950 hover:bg-amber-400 shadow-lg shadow-amber-500/20'
                        : 'border border-amber-500/40 text-amber-200 hover:bg-amber-500/10'
                    )}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}

export default function LandingPage({ onNavigate }) {
  const demoSections = [
    {
      id: 'hero',
      badge: 'นิรุทธิ์ เสวะนา',
      title: 'นิรุทธิ์ เสวะนา (Nirut Sewana)',
      subtitle: 'Personal Digital Hub & Educator Portfolio',
      description: 'ต้อนรับสู่เว็บไซต์ส่วนตัวและคลังข้อมูลสารสนเทศการจัดการเรียนรู้ สื่อดิจิทัล งานประจำชั้น และรายงานผลการพัฒนางานตามข้อตกลง (PA)',
      align: 'left',
      actions: [
        { label: '💻 ห้องเรียนออนไลน์', variant: 'primary', onClick: () => window.location.href = '/classroom' },
        { label: '📋 ข้อตกลง PA', variant: 'secondary', onClick: () => window.location.href = '/pa' },
      ],
    },
    {
      id: 'homeroom',
      badge: 'งานประจำชั้น',
      title: 'งานประจำชั้น & ดูแลช่วยเหลือนักเรียน',
      description: 'ระบบคัดกรองนักเรียนรายบุคคล การประเมินพฤติกรรม SDQ พิกัดบันทึกการเยี่ยมบ้าน และการติดตามเวลาเรียนอย่างเป็นระบบ',
      align: 'center',
      actions: [
        { label: '🔍 เข้าสู่ระบบงานประจำชั้น', variant: 'primary', onClick: () => window.location.href = '/homeroom' },
      ],
    },
    {
      id: 'achievements',
      badge: 'ผลงาน/รางวัล',
      title: 'ความภาคภูมิใจ & รางวัลเกียรติยศ',
      subtitle: 'Achievements & Honors',
      description: 'รวบรวมผลงานการจัดการเรียนรู้เชิงรุก (Active Learning) รางวัลการแข่งขันของนักเรียน และการพัฒนาตนเองทางวิชาชีพ',
      align: 'left',
      features: [
        { title: 'สื่อดิจิทัลและวิทยาการคำนวณ', description: 'นวัตกรรมสื่อการสอนออนไลน์และแบบทดสอบย่อย 24 ชม.' },
        { title: 'ระบบดูแลช่วยเหลือนักเรียน 100%', description: 'เยี่ยมบ้าน คัดกรอง SDQ และส่งเสริมศักยภาพผู้เรียนรายบุคคล' },
        { title: 'รายงาน PA & วิจัยในชั้นเรียน', description: 'เอกสารร่องรอยการพัฒนางานและแผนการจัดประสบการณ์เรียนรู้' },
      ],
    },
    {
      id: 'activities',
      badge: 'ภาพกิจกรรม',
      title: 'คลังภาพกิจกรรม & ผลงานนักเรียน',
      subtitle: 'Gallery & Educational Moments',
      description: 'รับชมภาพบรรยากาศการเรียนรู้ กิจกรรมพัฒนาผู้เรียน และการประสานความร่วมมือกับชุมชน',
      align: 'center',
      actions: [
        { label: '📸 ชมภาพกิจกรรมทั้งหมด', variant: 'primary', onClick: () => window.location.href = '/activities' },
      ],
    },
  ]

  return (
    <ScrollGlobe
      sections={demoSections}
      className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100"
    />
  )
}
