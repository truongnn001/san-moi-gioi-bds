'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import BurgerMenu from '@/components/layout/BurgerMenu'
import LanguageSwitcher from '@/components/layout/LanguageSwitcher'
import { useLayoutMeasurements } from '@/components/LayoutMeasurementsContext'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const { setHeaderHeight } = useLayoutMeasurements()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    handleScroll() // initialize immediately
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Measure header height
  useEffect(() => {
    const measureHeader = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight
        setHeaderHeight(height)
      }
    }

    measureHeader()
    window.addEventListener('resize', measureHeader)
    return () => window.removeEventListener('resize', measureHeader)
  }, [setHeaderHeight])

  // All navigation rendered inside BurgerMenu component (no inline desktop nav here)

  return (
    <motion.header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-[100] backdrop-blur-sm transition-colors duration-300 ${
        isScrolled ? 'bg-white/90 shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="px-4 md:px-8 h-20 flex items-center justify-between relative">
        {/* Left: Burger trigger */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          aria-label="Open navigation"
          className={`flex items-center justify-center w-12 h-12 transition-colors ${
            isScrolled ? 'text-[#358b4e]' : 'text-white'
          }`}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Center: Logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center">
          <img
            src="/logo.png"
            alt="INLANDV Logo"
            className="h-12 w-auto"
          />
        </Link>

        {/* Right: Language switcher */}
        <LanguageSwitcher scrolled={isScrolled} />
      </div>
      <BurgerMenu open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </motion.header>
  )
}
