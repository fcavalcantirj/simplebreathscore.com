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
}

export const BreathingAnimationContext = createContext<BreathingAnimationContextType | null>(null)

export function BreathingAnimationProvider({ children }: { children: ReactNode }) {
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
      }}
    >
      {children}
    </BreathingAnimationContext.Provider>
  )
} 