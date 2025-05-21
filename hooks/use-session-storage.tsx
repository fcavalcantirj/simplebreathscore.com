"use client"

import { useState, useEffect, useRef } from "react"

export function useSessionStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Initialize state with a function to avoid unnecessary localStorage access on every render
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue
    }

    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  // Keep track of if this is the first render
  const isFirstRender = useRef(true)

  // Effect for syncing with localStorage
  useEffect(() => {
    if (typeof window === "undefined") return

    // Skip the first render since we already initialized from localStorage
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    // Save to local storage
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error(error)
    }
  }, [key, storedValue])

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      // Save state
      setStoredValue(valueToStore)
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue]
}
