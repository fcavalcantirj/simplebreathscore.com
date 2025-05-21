"use client"

import { useCallback, useEffect, useRef } from "react"
import { useUserPreferencesContext } from "@/contexts/user-preferences-context"

export function useAudioFeedback() {
  const { soundEnabled } = useUserPreferencesContext()
  const audioCache = useRef<Record<string, AudioBuffer>>({})
  const audioContext = useRef<AudioContext | null>(null)

  // Initialize audio context on client side
  useEffect(() => {
    if (typeof window !== "undefined" && !audioContext.current) {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }

    return () => {
      if (audioContext.current && audioContext.current.state !== 'closed') {
        audioContext.current.close()
      }
    }
  }, [])

  // Load and cache audio
  const loadAudio = useCallback(async (url: string): Promise<AudioBuffer> => {
    if (!audioContext.current) return Promise.reject("Audio context not initialized")

    if (audioCache.current[url]) {
      return audioCache.current[url]
    }

    try {
      const response = await fetch(url)
      const arrayBuffer = await response.arrayBuffer()
      const audioBuffer = await audioContext.current.decodeAudioData(arrayBuffer)
      audioCache.current[url] = audioBuffer
      return audioBuffer
    } catch (error) {
      console.error("Error loading audio:", error)
      throw error
    }
  }, [])

  // Play audio from buffer
  const playAudio = useCallback(
    (buffer: AudioBuffer) => {
      if (!audioContext.current || !soundEnabled) return

      const source = audioContext.current.createBufferSource()
      source.buffer = buffer
      source.connect(audioContext.current.destination)
      source.start()
    },
    [soundEnabled],
  )

  // Play specific sounds
  const playInhaleSound = useCallback(() => {
    if (!soundEnabled) return

    // Simulate sound with oscillator
    if (audioContext.current) {
      const oscillator = audioContext.current.createOscillator()
      const gainNode = audioContext.current.createGain()

      oscillator.type = "sine"
      oscillator.frequency.setValueAtTime(440, audioContext.current.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.current.currentTime + 0.5)

      gainNode.gain.setValueAtTime(0, audioContext.current.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.current.currentTime + 0.1)
      gainNode.gain.linearRampToValueAtTime(0, audioContext.current.currentTime + 0.5)

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.current.destination)

      oscillator.start()
      oscillator.stop(audioContext.current.currentTime + 0.5)
    }
  }, [soundEnabled])

  const playExhaleSound = useCallback(() => {
    if (!soundEnabled) return

    // Simulate sound with oscillator
    if (audioContext.current) {
      const oscillator = audioContext.current.createOscillator()
      const gainNode = audioContext.current.createGain()

      oscillator.type = "sine"
      oscillator.frequency.setValueAtTime(880, audioContext.current.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(440, audioContext.current.currentTime + 0.5)

      gainNode.gain.setValueAtTime(0, audioContext.current.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.current.currentTime + 0.1)
      gainNode.gain.linearRampToValueAtTime(0, audioContext.current.currentTime + 0.5)

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.current.destination)

      oscillator.start()
      oscillator.stop(audioContext.current.currentTime + 0.5)
    }
  }, [soundEnabled])

  const playStartSound = useCallback(() => {
    if (!soundEnabled) return

    // Simulate sound with oscillator
    if (audioContext.current) {
      const oscillator = audioContext.current.createOscillator()
      const gainNode = audioContext.current.createGain()

      oscillator.type = "sine"
      oscillator.frequency.setValueAtTime(523.25, audioContext.current.currentTime) // C5

      gainNode.gain.setValueAtTime(0, audioContext.current.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.2, audioContext.current.currentTime + 0.1)
      gainNode.gain.linearRampToValueAtTime(0, audioContext.current.currentTime + 0.8)

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.current.destination)

      oscillator.start()
      oscillator.stop(audioContext.current.currentTime + 0.8)
    }
  }, [soundEnabled])

  const playEndSound = useCallback(() => {
    if (!soundEnabled) return

    // Simulate sound with oscillator
    if (audioContext.current) {
      const oscillator = audioContext.current.createOscillator()
      const gainNode = audioContext.current.createGain()

      oscillator.type = "sine"
      oscillator.frequency.setValueAtTime(783.99, audioContext.current.currentTime) // G5
      oscillator.frequency.setValueAtTime(659.25, audioContext.current.currentTime + 0.3) // E5
      oscillator.frequency.setValueAtTime(523.25, audioContext.current.currentTime + 0.6) // C5

      gainNode.gain.setValueAtTime(0, audioContext.current.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.2, audioContext.current.currentTime + 0.1)
      gainNode.gain.linearRampToValueAtTime(0.2, audioContext.current.currentTime + 0.8)
      gainNode.gain.linearRampToValueAtTime(0, audioContext.current.currentTime + 1.0)

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.current.destination)

      oscillator.start()
      oscillator.stop(audioContext.current.currentTime + 1.0)
    }
  }, [soundEnabled])

  return {
    loadAudio,
    playAudio,
    playInhaleSound,
    playExhaleSound,
    playStartSound,
    playEndSound,
  }
}
