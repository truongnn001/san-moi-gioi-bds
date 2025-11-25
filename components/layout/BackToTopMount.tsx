'use client'

import { useEffect, useState } from 'react'
import { useFullpage } from '@/components/FullpageContext'
import NormalScrollBackToTop from '@/components/common/NormalScrollBackToTop'
import BackToTopButton from '@/components/common/BackToTopButton'

export default function BackToTopMount() {
  const { totalSections } = useFullpage()
  const [isReady, setIsReady] = useState(false)

  // Wait for context to stabilize before rendering to avoid mount/unmount flickering
  useEffect(() => {
    // Reduced delay - FullpageScroll init is fast, just need single frame
    const timer = setTimeout(() => {
      setIsReady(true)
    }, 50)
    return () => clearTimeout(timer)
  }, [totalSections])

  if (!isReady) {
    return null
  }

  // If using full-screen-scroll, render the existing fullpage-aware button
  if (totalSections > 0) {
    return <BackToTopButton />
  }

  // Otherwise, mount the dedicated normal-scroll movetop module
  return <NormalScrollBackToTop />
}
