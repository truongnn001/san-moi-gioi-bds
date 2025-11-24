'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useFullpage } from '@/components/FullpageContext'

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false)
  const { backgroundType } = useFullpage()

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Color palette now derives purely from explicit backgroundType via context

  const scrollToTop = () => {
    // Check if we're on a fullpage scroll page by looking for section elements
    const sections = document.querySelectorAll('[id^="section-"]')
    
    if (sections.length > 0) {
      // Fullpage scroll page - snap to first section
      const firstSection = document.getElementById('section-0')
      if (firstSection) {
        firstSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
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
          `}
          style={{ zIndex: 35 }}
          aria-label="Quay về đầu trang"
        >
          <ArrowUp className={`w-4 h-4 ${paletteIcon} transition-colors duration-300`} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
