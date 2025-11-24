'use client'

import { ReactNode } from 'react'
import { useLayoutMeasurements } from './LayoutMeasurementsContext'

interface SectionProps {
  id: string
  index: number
  title: string
  children: ReactNode
  className?: string
  isActive?: boolean
  background?: string
  backgroundType?: 'light' | 'image' | 'dark'
}

/**
 * Strict Section Component - ANTI-BLEED ARCHITECTURE
 * 
 * Rules enforced:
 * 1. Exact 100vh height (no min-height, no auto)
 * 2. overflow: hidden (prevents content spillage)
 * 3. NO margins (only internal padding allowed)
 * 4. position: relative (creates stacking context)
 * 5. Internal content wrapper with overflow-y-auto if needed
 * 6. NO Framer Motion translateY animations (opacity/scale only)
 */
export default function Section({ 
  id, 
  index, 
  title, 
  children, 
  className = '',
  isActive = false,
  background = 'bg-white',
  backgroundType = 'light'
}: SectionProps) {
  const { headerHeight, timelineWidth } = useLayoutMeasurements()
  
  // Calculate safe padding with responsive adjustments
  const paddingTop = headerHeight + 24 // Header height + 24px spacing
  // On mobile (timelineWidth = 0 when hidden), only use base padding
  const paddingRight = timelineWidth > 0 ? timelineWidth + 32 : 24 // Timeline safe area or base padding

  return (
    <section
      id={id}
      data-section-index={index}
      data-section-id={id}
      data-background-type={backgroundType}
      className={`
        fullpage-section-strict
        ${background}
        ${className}
      `.trim()}
      style={{
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        margin: 0,
        padding: 0,
        isolation: 'isolate'
      }}
      role="region"
      aria-label={title}
    >
      {/* Internal content wrapper - scrollable if content overflows */}
      <div 
        className="section-content-wrapper w-full h-full"
        style={{
          overflowY: 'auto',
          overflowX: 'hidden',
          position: 'relative'
        }}
      >
        {/* Section inner container with safe padding */}
        <div 
          className="section-inner max-w-[1400px] mx-auto px-6"
          style={{
            paddingTop: `${paddingTop}px`,
            paddingRight: `${paddingRight}px`,
            minHeight: '100%'
          }}
        >
          {children}
        </div>
      </div>

      {/* Section title for accessibility */}
      <span className="sr-only">{title}</span>
    </section>
  )
}

// Specialized Hero Section (NO PARALLAX translateY - causes bleed)
export function HeroSection({ 
  id, 
  index, 
  title, 
  children, 
  backgroundImage,
  isActive = false
}: SectionProps & { backgroundImage?: string }) {
  const { headerHeight, timelineWidth } = useLayoutMeasurements()
  
  // Calculate safe padding with responsive adjustments
  const paddingTop = headerHeight + 24 // Header height + 24px spacing
  // On mobile (timelineWidth = 0 when hidden), only use base padding
  const paddingRight = timelineWidth > 0 ? timelineWidth + 32 : 24 // Timeline safe area or base padding

  return (
    <section
      id={id}
      data-section-index={index}
      data-section-id={id}
      data-background-type="image"
      className="fullpage-section-strict"
      style={{
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        margin: 0,
        padding: 0,
        isolation: 'isolate'
      }}
      role="region"
      aria-label={title}
    >
      {/* Background Image - NO SCALE ANIMATION */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        </div>
      )}

      {/* Content - scrollable if needed */}
      <div 
        className="relative z-10 w-full h-full"
        style={{
          overflowY: 'auto',
          overflowX: 'hidden'
        }}
      >
        {/* Section inner container with safe padding */}
        <div 
          className="section-inner max-w-[1400px] mx-auto px-6"
          style={{
            paddingTop: `${paddingTop}px`,
            paddingRight: `${paddingRight}px`,
            minHeight: '100%'
          }}
        >
          {children}
        </div>
      </div>

      <span className="sr-only">{title}</span>
    </section>
  )
}
