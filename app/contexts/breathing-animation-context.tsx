"use client"

import { createContext, ReactNode } from "react"

export type BreathingPhase = 'inhale' | 'pause' | 'exhale'

export interface BreathingAnimationContextType {
  currentPhase: BreathingPhase
  isActive: boolean
  inhaleDuration: number
  pauseDuration: number
  exhaleDuration: number
}

export const BreathingAnimationContext = createContext<BreathingAnimationContextType | null>(null)

interface BreathingAnimationProviderProps {
  children: ReactNode
  currentPhase: BreathingPhase
  isActive: boolean
  inhaleDuration: number
  pauseDuration: number
  exhaleDuration: number
}

export function BreathingAnimationProvider({
  children,
  currentPhase,
  isActive,
  inhaleDuration,
  pauseDuration,
  exhaleDuration,
}: BreathingAnimationProviderProps) {
  return (
    <BreathingAnimationContext.Provider
      value={{
        currentPhase,
        isActive,
        inhaleDuration,
        pauseDuration,
        exhaleDuration,
      }}
    >
      {children}
    </BreathingAnimationContext.Provider>
  )
} 