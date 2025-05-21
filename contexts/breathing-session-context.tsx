"use client"

import { createContext, useState, useCallback, type ReactNode } from "react"

interface BreathingSessionState {
  isActive: boolean
  startTime: number | null
  inhaleTimestamps: number[]
  exhaleTimestamps: number[]
  stopTime: number | null
}

interface BreathingSessionContextType {
  sessionState: BreathingSessionState
  startSession: () => void
  recordInhale: () => void
  recordExhale: () => void
  stopSession: () => void
  resetSession: () => void
}

export const BreathingSessionContext = createContext<BreathingSessionContextType | null>(null)

export function BreathingSessionProvider({ children }: { children: ReactNode }) {
  const [sessionState, setSessionState] = useState<BreathingSessionState>({
    isActive: false,
    startTime: null,
    inhaleTimestamps: [],
    exhaleTimestamps: [],
    stopTime: null,
  })

  const startSession = useCallback(() => {
    setSessionState({
      isActive: true,
      startTime: Date.now(),
      inhaleTimestamps: [],
      exhaleTimestamps: [],
      stopTime: null,
    })
  }, [])

  const recordInhale = useCallback(() => {
    if (!sessionState.isActive) return

    setSessionState((prev) => ({
      ...prev,
      inhaleTimestamps: [...prev.inhaleTimestamps, Date.now()],
    }))
  }, [sessionState.isActive])

  const recordExhale = useCallback(() => {
    if (!sessionState.isActive) return

    setSessionState((prev) => ({
      ...prev,
      exhaleTimestamps: [...prev.exhaleTimestamps, Date.now()],
    }))
  }, [sessionState.isActive])

  const stopSession = useCallback(() => {
    if (!sessionState.isActive) return

    setSessionState((prev) => ({
      ...prev,
      isActive: false,
      stopTime: Date.now(),
    }))
  }, [sessionState.isActive])

  const resetSession = useCallback(() => {
    setSessionState({
      isActive: false,
      startTime: null,
      inhaleTimestamps: [],
      exhaleTimestamps: [],
      stopTime: null,
    })
  }, [])

  return (
    <BreathingSessionContext.Provider
      value={{
        sessionState,
        startSession,
        recordInhale,
        recordExhale,
        stopSession,
        resetSession,
      }}
    >
      {children}
    </BreathingSessionContext.Provider>
  )
}
