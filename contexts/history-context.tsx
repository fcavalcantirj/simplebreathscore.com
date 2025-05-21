"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useSessionStorage } from "@/hooks/use-session-storage"
import type { Session } from "@/types/session"

interface HistoryContextType {
  sessionHistory: Session[]
  addSessionToHistory: (session: Session) => void
  clearHistory: () => void
}

export const HistoryContext = createContext<HistoryContextType | null>(null)

export function HistoryProvider({ children }: { children: ReactNode }) {
  const [sessionHistory, setSessionHistory] = useSessionStorage<Session[]>("breathing-app-history", [])

  const addSessionToHistory = (session: Session) => {
    setSessionHistory((prev) => [session, ...prev])
  }

  const clearHistory = () => {
    setSessionHistory([])
  }

  return (
    <HistoryContext.Provider
      value={{
        sessionHistory,
        addSessionToHistory,
        clearHistory,
      }}
    >
      {children}
    </HistoryContext.Provider>
  )
}

export function useHistoryContext() {
  const context = useContext(HistoryContext)

  if (!context) {
    throw new Error("useHistoryContext must be used within a HistoryProvider")
  }

  return context
}
