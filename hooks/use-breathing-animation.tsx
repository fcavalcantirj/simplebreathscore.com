"use client"

import { useState, useCallback } from "react"

type AnimationState = "idle" | "inhale" | "exhale" | "hold"

export function useBreathingAnimation() {
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

  return {
    animationState,
    setAnimationState,
    startInhaleAnimation,
    startExhaleAnimation,
    startHoldAnimation,
    resetAnimation,
  }
}
