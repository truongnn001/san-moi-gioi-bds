'use client'

import React, { createContext, useContext, useState } from 'react'

export type BackgroundType = 'light' | 'image' | 'dark'

type Ctx = {
  backgroundType: BackgroundType
  setBackgroundType: (t: BackgroundType) => void
}

const FullpageContext = createContext<Ctx | undefined>(undefined)

export function FullpageProvider({ children }: { children: React.ReactNode }) {
  const [backgroundType, setBackgroundType] = useState<BackgroundType>('light')
  return (
    <FullpageContext.Provider value={{ backgroundType, setBackgroundType }}>
      {children}
    </FullpageContext.Provider>
  )
}

export function useFullpage() {
  const ctx = useContext(FullpageContext)
  if (!ctx) throw new Error('useFullpage must be used within FullpageProvider')
  return ctx
}
