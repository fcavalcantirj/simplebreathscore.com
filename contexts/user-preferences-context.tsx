"use client"

import { createContext, useContext, type ReactNode, useMemo } from "react"
import { useSessionStorage } from "@/hooks/use-session-storage"

interface UserPreferences {
  vibrationEnabled: boolean
  darkMode: boolean
  guidedBreathingEnabled: boolean
}

interface UserPreferencesContextType {
  vibrationEnabled: boolean
  darkMode: boolean
  guidedBreathingEnabled: boolean
  toggleVibration: () => void
  toggleDarkMode: () => void
  toggleGuidedBreathing: () => void
}

const defaultPreferences: UserPreferences = {
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

  const toggleVibration = () => {
    setPreferences((prev) => ({ ...prev, vibrationEnabled: !prev.vibrationEnabled }))
  }

  const toggleDarkMode = () => {
    setPreferences((prev) => ({ ...prev, darkMode: !prev.darkMode }))
  }

  const toggleGuidedBreathing = () => {
    setPreferences((prev) => ({ ...prev, guidedBreathingEnabled: !prev.guidedBreathingEnabled }))
  }

  const value = useMemo(() => ({
    vibrationEnabled: preferences.vibrationEnabled,
    darkMode: preferences.darkMode,
    guidedBreathingEnabled: preferences.guidedBreathingEnabled,
    toggleVibration,
    toggleDarkMode,
    toggleGuidedBreathing,
  }), [preferences, toggleVibration, toggleDarkMode, toggleGuidedBreathing])

  return (
    <UserPreferencesContext.Provider value={value}>
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
