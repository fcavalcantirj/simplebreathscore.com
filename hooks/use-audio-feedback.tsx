"use client"

import { useCallback, useEffect, useRef } from "react"
import { useSoundContext } from "@/contexts/sound-context"

export function useAudioFeedback() {
  const { soundEnabled } = useSoundContext()
  const audioContext = useRef<AudioContext | null>(null)

  // Initialize audio context on client side
  useEffect(() => {
    if (typeof window !== "undefined" && !audioContext.current) {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }

    // Resume audio context on user interaction
    const handleUserInteraction = async () => {
      if (audioContext.current && audioContext.current.state === "suspended") {
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
      window.addEventListener(event, handleUserInteraction)
    })

    // Try to resume immediately
    handleUserInteraction()

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleUserInteraction)
      })
    }
  }, [])

  // Play specific sounds
  const playInhaleSound = useCallback(async () => {
    if (!soundEnabled) return

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

  const playExhaleSound = useCallback(async () => {
    if (!soundEnabled) return

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

  const playStartSound = useCallback(async () => {
    if (!soundEnabled) return

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

  const playEndSound = useCallback(async () => {
    if (!soundEnabled) return

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

  const playPauseSound = useCallback(async () => {
    if (!soundEnabled) return;
  
    if (audioContext.current) {
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
