"use client"

import { createContext, useState, useCallback, type ReactNode } from "react"

type AnimationState = "idle" | "inhale" | "exhale" | "hold"

interface BreathingAnimationContextType {
  animationState: AnimationState
  setAnimationState: (state: AnimationState) => void
  startInhaleAnimation: () => void
  startExhaleAnimation: () => void
  startHoldAnimation: () => void
  resetAnimation: () => void
  inhaleDuration?: number
  pauseDuration?: number
  exhaleDuration?: number
  isActive?: boolean
  currentPhase?: "inhale" | "pause" | "exhale"
}

export const BreathingAnimationContext = createContext<BreathingAnimationContextType | null>(null)

interface BreathingAnimationProviderProps {
  children: ReactNode
  inhaleDuration?: number
  pauseDuration?: number
  exhaleDuration?: number
  isActive?: boolean
  currentPhase?: "inhale" | "pause" | "exhale"
}

export function BreathingAnimationProvider({ 
  children,
  inhaleDuration,
  pauseDuration,
  exhaleDuration,
  isActive,
  currentPhase
}: BreathingAnimationProviderProps) {
  const [animationState, setAnimationState] = useState<AnimationState>("idle")

  const startInhaleAnimation = useCallback(() => {
    setAnimationState("inhale")
  }, [])

  const startExhaleAnimation = useCallback(() => {
    setAnimationState("exhale")
  }, [])

  const startHoldAnimation = useCallback(() => {
    setAnimationState("hold")
  }, [])

  const resetAnimation = useCallback(() => {
    setAnimationState("idle")
  }, [])

  return (
    <BreathingAnimationContext.Provider
      value={{
        animationState,
        setAnimationState,
        startInhaleAnimation,
        startExhaleAnimation,
        startHoldAnimation,
        resetAnimation,
        inhaleDuration,
        pauseDuration,
        exhaleDuration,
        isActive,
        currentPhase
      }}
    >
      {children}
    </BreathingAnimationContext.Provider>
  )
} 