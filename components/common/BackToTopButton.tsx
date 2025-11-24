'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useFullpage } from '@/components/FullpageContext'

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false)
  const { backgroundType, currentSection, totalSections, isInFooterZone } = useFullpage()

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200)
    }
    
    // Show button if we're on a fullpage scroll page and not on first section OR in footer zone
    if (totalSections > 0 && (currentSection > 0 || isInFooterZone)) {
      setIsVisible(true)
    } else if (totalSections === 0) {
      // Regular scroll page
      handleScroll()
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    } else {
      setIsVisible(false)
    }
  }, [currentSection, totalSections, isInFooterZone])

  // Color palette now derives purely from explicit backgroundType via context

  const scrollToTop = () => {
    // If on fullpage scroll page, trigger scroll to top which will handle section navigation
    if (totalSections > 0) {
      // Reset scroll position to trigger fullpage scroll to section 0
      window.scrollTo({ top: 0, behavior: 'smooth' })
      // Dispatch a custom event to notify FullpageScroll to go to section 0
      window.dispatchEvent(new CustomEvent('scrollToSection', { detail: { section: 0 } }))
    } else {
      // Normal scroll page - scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const isLight = backgroundType === 'light'
  const paletteBorder = isLight ? 'border-[#358b4e]/70 hover:border-[#2b6f3e]' : 'border-white/70 hover:border-white'
  const paletteIcon = isLight ? 'text-[#358b4e]/80 group-hover:text-[#358b4e]' : 'text-white/80 group-hover:text-white'

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className={`
            fixed bottom-8 right-8
            w-7 h-10
            flex items-center justify-center
            border-2 ${paletteBorder}
            bg-white/5 backdrop-blur-sm
            rounded-full
            transition-all duration-300
            group
            z-[90]
          `}
          aria-label="Quay về đầu trang"
        >
          <ArrowUp className={`w-4 h-4 ${paletteIcon} transition-colors duration-300`} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
