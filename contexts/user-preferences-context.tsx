"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useSessionStorage } from "@/hooks/use-session-storage"

interface UserPreferences {
  soundEnabled: boolean
  vibrationEnabled: boolean
  darkMode: boolean
  guidedBreathingEnabled: boolean
}

interface UserPreferencesContextType {
  soundEnabled: boolean
  vibrationEnabled: boolean
  darkMode: boolean
  guidedBreathingEnabled: boolean
  toggleSound: () => void
  toggleVibration: () => void
  toggleDarkMode: () => void
  toggleGuidedBreathing: () => void
}

const defaultPreferences: UserPreferences = {
  soundEnabled: true,
  vibrationEnabled: true,
  darkMode: false,
  guidedBreathingEnabled: true,
}

export const UserPreferencesContext = createContext<UserPreferencesContextType | null>(null)

export function UserPreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useSessionStorage<UserPreferences>(
    "breathing-app-preferences",
    defaultPreferences,
  )

  console.log('User preferences:', preferences)

  const toggleSound = () => {
    setPreferences((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }))
  }

  const toggleVibration = () => {
    setPreferences((prev) => ({ ...prev, vibrationEnabled: !prev.vibrationEnabled }))
  }

  const toggleDarkMode = () => {
    setPreferences((prev) => ({ ...prev, darkMode: !prev.darkMode }))
  }

  const toggleGuidedBreathing = () => {
    setPreferences((prev) => ({ ...prev, guidedBreathingEnabled: !prev.guidedBreathingEnabled }))
  }

  return (
    <UserPreferencesContext.Provider
      value={{
        ...preferences,
        toggleSound,
        toggleVibration,
        toggleDarkMode,
        toggleGuidedBreathing,
      }}
    >
      {children}
    </UserPreferencesContext.Provider>
  )
}

export function useUserPreferencesContext() {
  const context = useContext(UserPreferencesContext)

  if (!context) {
    throw new Error("useUserPreferencesContext must be used within a UserPreferencesProvider")
  }

  return context
}
