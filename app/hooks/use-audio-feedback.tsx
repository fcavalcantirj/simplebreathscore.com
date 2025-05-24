"use client"

import { useState, useEffect, useCallback } from "react"

export function useAudioFeedback() {
  const [isAudioReady, setIsAudioReady] = useState(false)
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)

  useEffect(() => {
    const initAudio = () => {
      const context = new (window.AudioContext || (window as any).webkitAudioContext)()
      setAudioContext(context)
      setIsAudioReady(true)
    }

    // Initialize audio on first user interaction
    const handleFirstInteraction = () => {
      initAudio()
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
    }

    document.addEventListener('click', handleFirstInteraction)
    document.addEventListener('touchstart', handleFirstInteraction)

    return () => {
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
      if (audioContext) {
        audioContext.close()
      }
    }
  }, [])

  const playSound = useCallback((frequency: number, duration: number) => {
    if (!audioContext || !isAudioReady) return

    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.type = 'sine'
    oscillator.frequency.value = frequency
    gainNode.gain.value = 0.1

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.start()
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration)
    oscillator.stop(audioContext.currentTime + duration)
  }, [audioContext, isAudioReady])

  const playInhaleSound = useCallback(async () => {
    playSound(440, 0.5) // A4 note
  }, [playSound])

  const playExhaleSound = useCallback(async () => {
    playSound(392, 0.5) // G4 note
  }, [playSound])

  const playStartSound = useCallback(async () => {
    playSound(523.25, 0.3) // C5 note
  }, [playSound])

  const playEndSound = useCallback(async () => {
    playSound(392, 0.3) // G4 note
  }, [playSound])

  return {
    isAudioReady,
    playInhaleSound,
    playExhaleSound,
    playStartSound,
    playEndSound
  }
} 