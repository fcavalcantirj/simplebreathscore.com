"use client"

import { createContext, useContext, useMemo, type ReactNode } from "react"
import { useSessionStorage } from "@/hooks/use-session-storage"

interface SoundContextType {
  soundEnabled: boolean
  toggleSound: () => void
}

const SoundContext = createContext<SoundContextType | null>(null)

export function SoundProvider({ children }: { children: ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useSessionStorage<boolean>(
    "breathing-app-sound-enabled",
    true
  )

  const toggleSound = () => setSoundEnabled((prev) => !prev)

  const value = useMemo(() => ({ soundEnabled, toggleSound }), [soundEnabled])

  return (
    <SoundContext.Provider value={value}>
      {children}
    </SoundContext.Provider>
  )
}

export function useSoundContext() {
  const context = useContext(SoundContext)
  if (!context) {
    throw new Error("useSoundContext must be used within a SoundProvider")
  }
  return context
} 