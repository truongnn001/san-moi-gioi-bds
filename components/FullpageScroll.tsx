
'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MouseScrollIcon from './MouseScrollIcon'
import TimelineNav from '@/components/TimelineNav'
import { useFullpage, useFullpageInternal, BackgroundType } from '@/components/FullpageContext'

export interface SectionData {
  id: string
  index: number
  title: string
  backgroundType?: BackgroundType
}

interface FullpageScrollProps {
  children: React.ReactNode[]
  sections: SectionData[]
  showIndicators?: boolean
  debug?: boolean
}

/**
 * TRANSFORM-BASED FULLPAGE SCROLL ENGINE
 * 
 * Architecture:
 * - Uses transform: translateY(-index * 100vh) for precise positioning
 * - Blocks all scroll events during animation
 * - Enforces integer section indexes (no partial states)
 * - Prevents bleeding via strict wrapper containment
 */
export default function FullpageScroll({ 
  children, 
  sections,
  showIndicators = true,
  debug = false
}: FullpageScrollProps) {
  const [currentSection, setCurrentSection] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isInFooterZone, setIsInFooterZone] = useState(false)
  const [activeBackgroundType, setActiveBackgroundType] = useState<BackgroundType>('light')
  const { setBackgroundType } = useFullpage()
  const { setCurrentSection: setContextSection, setTotalSections: setContextTotal, setIsInFooterZone: setContextFooterZone } = useFullpageInternal()
  const touchStartY = useRef<number>(0)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const animationTimeoutRef = useRef<NodeJS.Timeout>()
  
  const totalSections = children.length
  const isAtLastSection = currentSection === totalSections - 1

  // Sync with context
  useEffect(() => {
    setContextSection(currentSection)
  }, [currentSection, setContextSection])

  useEffect(() => {
    setContextTotal(totalSections)
  }, [totalSections, setContextTotal])

  useEffect(() => {
    setContextFooterZone(isInFooterZone)
  }, [isInFooterZone, setContextFooterZone])

  // Debug logging
  const log = useCallback((...args: any[]) => {
    if (debug) {
      console.log('[FullpageScroll]', ...args)
    }
  }, [debug])

  // Update background type
  useEffect(() => {
    const fromSections = sections[currentSection]?.backgroundType
    if (fromSections) {
      setActiveBackgroundType(fromSections)
      setBackgroundType(fromSections)
    } else {
      setActiveBackgroundType('light')
      setBackgroundType('light')
    }
  }, [currentSection, sections, setBackgroundType])

  // Scroll to section with EXACT transform
  const scrollToSection = useCallback((index: number) => {
    // Validate bounds
    if (index < 0 || index >= totalSections) {
      log('Scroll blocked: out of bounds', { index, totalSections })
      return
    }

    // Block if animating
    if (isAnimating) {
      log('Scroll blocked: animation in progress')
      return
    }

    log('Scrolling to section:', index)
    
    // Set animating state
    setIsAnimating(true)
    setCurrentSection(index)

    // Clear previous timeout
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current)
    }

    // Unlock after animation completes (800ms)
    animationTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false)
      log('Animation complete, unlocked')
    }, 800)
  }, [totalSections, isAnimating, log])

  // Handle wheel events
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      // Block if animating
      if (isAnimating) {
        log('Wheel blocked: animating')
        return
      }

      // Footer zone handling
      if (isAtLastSection && e.deltaY > 0 && !isInFooterZone) {
        log('Entering footer zone')
        setIsInFooterZone(true)
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
        return
      }

      if (isInFooterZone && e.deltaY < 0) {
        log('Exiting footer zone')
        setIsInFooterZone(false)
        scrollToSection(totalSections - 1)
        return
      }

      // Normal scroll
      if (!isInFooterZone) {
        if (Math.abs(e.deltaY) < 5) return

        if (e.deltaY > 0) {
          scrollToSection(currentSection + 1)
        } else {
          scrollToSection(currentSection - 1)
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [currentSection, isAnimating, isAtLastSection, isInFooterZone, scrollToSection, totalSections, log])

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating || isInFooterZone) return

      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault()
          if (isAtLastSection) {
            setIsInFooterZone(true)
            window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
          } else {
            scrollToSection(currentSection + 1)
          }
          break
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault()
          scrollToSection(currentSection - 1)
          break
        case 'Home':
          e.preventDefault()
          scrollToSection(0)
          break
        case 'End':
          e.preventDefault()
          scrollToSection(totalSections - 1)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSection, isAnimating, isAtLastSection, isInFooterZone, scrollToSection, totalSections])

  // Handle touch events
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimating) return

      const touchEndY = e.changedTouches[0].clientY
      const deltaY = touchStartY.current - touchEndY

      if (Math.abs(deltaY) > 50) {
        if (isAtLastSection && deltaY > 0 && !isInFooterZone) {
          setIsInFooterZone(true)
          window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
          return
        }

        if (isInFooterZone && deltaY < 0) {
          setIsInFooterZone(false)
          scrollToSection(totalSections - 1)
          return
        }

        if (!isInFooterZone) {
          if (deltaY > 0) {
            scrollToSection(currentSection + 1)
          } else {
            scrollToSection(currentSection - 1)
          }
        }
      }
    }

    const wrapper = wrapperRef.current
    if (wrapper) {
      wrapper.addEventListener('touchstart', handleTouchStart, { passive: true })
      wrapper.addEventListener('touchend', handleTouchEnd, { passive: true })
      return () => {
        wrapper.removeEventListener('touchstart', handleTouchStart)
        wrapper.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [currentSection, isAnimating, isAtLastSection, isInFooterZone, scrollToSection, totalSections])

  // Calculate exact transform
  const transformY = `translateY(-${currentSection * 100}vh)`

  return (
    <div 
      className="fullpage-scroll-container"
      style={{
        position: 'relative',
        overflow: 'hidden',
        touchAction: 'none',
        height: '100vh',
        width: '100%'
      }}
    >
      {/* Timeline Navigation */}
      {showIndicators && !isInFooterZone && (
        <TimelineNav
          sections={sections}
          activeSection={currentSection}
          onSectionClick={scrollToSection}
          backgroundType={activeBackgroundType}
        />
      )}

      {/* Sections Wrapper - TRANSFORM-BASED */}
      <div
        ref={wrapperRef}
        className="fullpage-sections-wrapper"
        style={{
          transform: transformY,
          transition: isAnimating ? 'transform 800ms cubic-bezier(0.65, 0, 0.35, 1)' : 'none',
          willChange: 'transform',
          position: 'relative',
          height: `${totalSections * 100}vh`,
          width: '100%'
        }}
      >
        {children.map((child, index) => {
          const anchorId = sections[index]?.id || `section-${index}`
          return (
            <div
              key={index}
              id={anchorId}
              data-index={index}
              className="fullpage-section-container"
              style={{
                height: '100vh',
                width: '100%',
                position: 'absolute',
                top: `${index * 100}vh`,
                left: 0,
                overflow: 'hidden',
                margin: 0,
                padding: 0
              }}
              role="region"
              aria-label={sections[index]?.title || `Section ${index + 1}`}
            >
              {child}
            </div>
          )
        })}
      </div>

      {/* Mouse Scroll Icon */}
      <MouseScrollIcon 
        onClick={() => scrollToSection(currentSection + 1)}
        isVisible={!isInFooterZone && !isAtLastSection}
        backgroundType={activeBackgroundType}
      />

      {/* Scroll hint (first section only) */}
      {currentSection === 0 && !isAnimating && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 1.5, 
            duration: 1, 
            repeat: Infinity, 
            repeatType: 'reverse' 
          }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-30 hidden md:block pointer-events-none"
        >
          <div className="flex flex-col items-center gap-2 text-white/80">
            <span className="text-sm font-medium">Scroll</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </motion.div>
      )}
    </div>
  )
}
