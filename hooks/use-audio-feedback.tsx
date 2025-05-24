"use client"

import { useCallback, useEffect, useRef } from "react"
import { useUserPreferencesContext } from "@/contexts/user-preferences-context"

export function useAudioFeedback() {
  const { soundEnabled } = useUserPreferencesContext()
  const audioContext = useRef<AudioContext | null>(null)

  console.log('Audio feedback hook - sound enabled:', soundEnabled) // Debug log

  // Initialize audio context on client side
  useEffect(() => {
    if (typeof window !== "undefined" && !audioContext.current) {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      console.log('Audio context created:', audioContext.current.state) // Debug log
    }

    // Resume audio context on user interaction
    const handleUserInteraction = async () => {
      if (audioContext.current && audioContext.current.state === "suspended") {
        try {
          await audioContext.current.resume()
          console.log('Audio context resumed:', audioContext.current.state) // Debug log
        } catch (error) {
          console.error('Error resuming audio context:', error)
        }
      }
    }

    // Add event listeners for user interaction
    window.addEventListener("click", handleUserInteraction)
    window.addEventListener("keydown", handleUserInteraction)
    window.addEventListener("touchstart", handleUserInteraction)

    return () => {
      window.removeEventListener("click", handleUserInteraction)
      window.removeEventListener("keydown", handleUserInteraction)
      window.removeEventListener("touchstart", handleUserInteraction)
      if (audioContext.current && audioContext.current.state !== 'closed') {
        audioContext.current.close()
      }
    }
  }, [])

  // Ensure audio context is resumed before playing
  const ensureAudioContext = useCallback(async () => {
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      console.log('Audio context created in ensureAudioContext:', audioContext.current.state) // Debug log
    }
    
    if (audioContext.current.state === "suspended") {
      try {
        await audioContext.current.resume()
        console.log('Audio context resumed in ensureAudioContext:', audioContext.current.state) // Debug log
      } catch (error) {
        console.error('Error resuming audio context in ensureAudioContext:', error)
      }
    }
  }, [])

  // Play specific sounds
  const playInhaleSound = useCallback(async () => {
    console.log('Playing inhale sound, sound enabled:', soundEnabled, 'audio context state:', audioContext.current?.state) // Debug log
    if (!soundEnabled) return
    await ensureAudioContext()

    if (audioContext.current) {
      console.log('Creating inhale oscillator') // Debug log
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
      console.log('Inhale oscillator started') // Debug log
    }
  }, [soundEnabled, ensureAudioContext])

  const playExhaleSound = useCallback(async () => {
    console.log('Playing exhale sound, sound enabled:', soundEnabled, 'audio context state:', audioContext.current?.state) // Debug log
    if (!soundEnabled) return
    await ensureAudioContext()

    if (audioContext.current) {
      console.log('Creating exhale oscillator') // Debug log
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
      console.log('Exhale oscillator started') // Debug log
    }
  }, [soundEnabled, ensureAudioContext])

  const playStartSound = useCallback(async () => {
    console.log('Playing start sound, sound enabled:', soundEnabled, 'audio context state:', audioContext.current?.state) // Debug log
    if (!soundEnabled) return
    await ensureAudioContext()

    if (audioContext.current) {
      console.log('Creating start oscillator') // Debug log
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
      console.log('Start oscillator started') // Debug log
    }
  }, [soundEnabled, ensureAudioContext])

  const playEndSound = useCallback(async () => {
    console.log('Playing end sound, sound enabled:', soundEnabled, 'audio context state:', audioContext.current?.state) // Debug log
    if (!soundEnabled) return
    await ensureAudioContext()

    if (audioContext.current) {
      console.log('Creating end oscillator') // Debug log
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
      console.log('End oscillator started') // Debug log
    }
  }, [soundEnabled, ensureAudioContext])

  return {
    playInhaleSound,
    playExhaleSound,
    playStartSound,
    playEndSound,
  }
}
