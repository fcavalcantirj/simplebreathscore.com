"use client"

import { useContext } from "react"
import { BreathingSessionContext } from "@/contexts/breathing-session-context"

export function useBreathingSession() {
  const context = useContext(BreathingSessionContext)

  if (!context) {
    throw new Error("useBreathingSession must be used within a BreathingSessionProvider")
  }

  return context
}
