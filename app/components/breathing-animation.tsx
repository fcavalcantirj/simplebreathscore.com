"use client"

import { useContext } from "react"
import { BreathingAnimationContext } from "@/contexts/breathing-animation-context"

export function BreathingAnimation() {
  const context = useContext(BreathingAnimationContext)
  
  if (!context) {
    return null
  }

  const { currentPhase } = context

  return (
    <div className="flex justify-center">
      <div 
        className="w-48 h-48 rounded-full bg-blue-500/20 flex items-center justify-center transition-all duration-1000"
        style={{
          transform: `scale(${currentPhase === 'inhale' ? 1.5 : currentPhase === 'exhale' ? 0.8 : 1.2})`,
          opacity: currentPhase === 'pause' ? 0.8 : 1,
        }}
      >
        <div className="text-4xl font-light text-blue-500">
          {currentPhase === 'inhale' ? '↑' : currentPhase === 'exhale' ? '↓' : '•'}
        </div>
      </div>
    </div>
  )
} 