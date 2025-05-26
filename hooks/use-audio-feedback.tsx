"use client"

import { useCallback, useEffect, useRef } from "react"
import { useSoundContext } from "@/contexts/sound-context"

export function useAudioFeedback() {
  const { soundEnabled } = useSoundContext()
  const audioContext = useRef<AudioContext | null>(null)
  const isInitialized = useRef(false)

  // Initialize audio context only after user interaction
  const initializeAudioContext = useCallback(async () => {
    if (typeof window === "undefined" || isInitialized.current) return

    try {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      
      // Only resume if it's suspended
      if (audioContext.current.state === "suspended") {
        await audioContext.current.resume()
      }
      
      isInitialized.current = true
    } catch (error) {
      console.error('Error initializing audio context:', error)
    }
  }, [])

  useEffect(() => {
    // Handle user interaction to initialize audio context
    const handleUserInteraction = async () => {
      if (!isInitialized.current) {
        await initializeAudioContext()
      } else if (audioContext.current && audioContext.current.state === "suspended") {
        try {
          await audioContext.current.resume()
        } catch (error) {
          console.error('Error resuming audio context:', error)
        }
      }
    }

    // Add event listeners for user interaction
    const events = ["click", "keydown", "touchstart", "mousedown", "focus"]
    events.forEach(event => {
      window.addEventListener(event, handleUserInteraction, { once: false, passive: true })
    })

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleUserInteraction)
      })
    }
  }, [initializeAudioContext])

  // Play specific sounds
  const playInhaleSound = useCallback(async () => {
    if (!soundEnabled || !audioContext.current || audioContext.current.state !== "running") return

    try {
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
    } catch (error) {
      console.error('Error playing inhale sound:', error)
    }
  }, [soundEnabled])

  const playExhaleSound = useCallback(async () => {
    if (!soundEnabled || !audioContext.current || audioContext.current.state !== "running") return

    try {
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
    } catch (error) {
      console.error('Error playing exhale sound:', error)
    }
  }, [soundEnabled])

  const playStartSound = useCallback(async () => {
    if (!soundEnabled || !audioContext.current || audioContext.current.state !== "running") return

    try {
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
    } catch (error) {
      console.error('Error playing start sound:', error)
    }
  }, [soundEnabled])

  const playEndSound = useCallback(async () => {
    if (!soundEnabled || !audioContext.current || audioContext.current.state !== "running") return

    try {
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
    } catch (error) {
      console.error('Error playing end sound:', error)
    }
  }, [soundEnabled])

  const playPauseSound = useCallback(async () => {
    if (!soundEnabled || !audioContext.current || audioContext.current.state !== "running") return
  
    try {
      const oscillator = audioContext.current.createOscillator();
      const gainNode = audioContext.current.createGain();
  
      oscillator.type = "triangle"; // som mais "click"
      oscillator.frequency.setValueAtTime(600, audioContext.current.currentTime); // Frequência um pouco mais alta
  
      gainNode.gain.setValueAtTime(0, audioContext.current.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.15, audioContext.current.currentTime + 0.05); // ataque rápido
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.current.currentTime + 0.2); // Decaimento rápido e não linear
  
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.current.destination);
  
      oscillator.start();
      oscillator.stop(audioContext.current.currentTime + 0.2); // Som bem curto
    } catch (error) {
      console.error('Error playing pause sound:', error)
    }
  }, [soundEnabled]);
  

  return {
    playInhaleSound,
    playExhaleSound,
    playStartSound,
    playEndSound,
    playPauseSound,
  }
}
