'use client'

import { useEffect, useState } from 'react'
import { useFullpage } from '@/components/FullpageContext'

/**
 * Hook to force reveal section content when navigating directly via hash anchor.
 * Solves the blank screen issue when jumping to a section using submenu links.
 * 
 * @param sectionIndex - The index of this section in the fullpage sections array
 * @returns revealed - Boolean indicating if section should be visible
 */
export function useSectionReveal(sectionIndex: number) {
  const { currentSection } = useFullpage()
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (currentSection === sectionIndex && !revealed) {
      // Force reveal when navigated directly via hash (#anchor)
      setRevealed(true)
    }
  }, [currentSection, sectionIndex, revealed])

  return revealed
}
