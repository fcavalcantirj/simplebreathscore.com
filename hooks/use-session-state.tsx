"use client"

import { useState, useEffect } from "react"

// Global state to track if any session is active
let globalSessionActive = false
let listeners: Set<() => void> = new Set()

export function useSessionState() {
  const [isSessionActive, setIsSessionActive] = useState(globalSessionActive)

  useEffect(() => {
    const listener = () => setIsSessionActive(globalSessionActive)
    listeners.add(listener)
    
    return () => {
      listeners.delete(listener)
    }
  }, [])

  const setSessionActive = (active: boolean) => {
    globalSessionActive = active
    listeners.forEach(listener => listener())
  }

  return {
    isSessionActive,
    setSessionActive
  }
} 