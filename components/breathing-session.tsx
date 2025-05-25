"use client"

import { useState, useEffect, useContext } from "react"
import { Card, CardContent } from "@/components/ui/card"
import BreathingControls from "@/components/breathing-controls"
import BreathingVisualizer from "@/components/breathing-visualizer"
import { useBreathingSession } from "@/hooks/use-breathing-session"
import { useBreathingScore } from "@/hooks/use-breathing-score"
import { useAudioFeedback } from "@/hooks/use-audio-feedback"
import { formatTime } from "@/lib/utils"
import { useHistoryContext } from "@/contexts/history-context"
import { AnimatedCard } from "@/components/animated-card"
import { BreathingAnimationContext } from "@/contexts/breathing-animation-context"
import SessionResults from "@/components/session-results"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSoundContext } from "@/contexts/sound-context"

interface BreathingSessionProps {
  onSessionComplete?: () => void
}

export default function BreathingSession({ onSessionComplete }: BreathingSessionProps) {
  const { sessionState, startSession, stopSession, recordInhale, recordExhale } = useBreathingSession()
  const { calculateScore } = useBreathingScore()
  const { playInhaleSound, playExhaleSound, playStartSound, playEndSound } = useAudioFeedback()
  const { animationState, setAnimationState } = useContext(BreathingAnimationContext)!
  const { addSessionToHistory } = useHistoryContext()

  const [elapsedTime, setElapsedTime] = useState(0)
  const [breathCount, setBreathCount] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [sessionScore, setSessionScore] = useState(0)

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (sessionState.isActive) {
      interval = setInterval(() => {
        if (sessionState.startTime) {
          setElapsedTime(Date.now() - sessionState.startTime)
        }
      }, 100)
    } else if (interval) {
      clearInterval(interval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [sessionState.isActive, sessionState.startTime])

  // Update breath count
  useEffect(() => {
    setBreathCount(sessionState.inhaleTimestamps.length)
  }, [sessionState.inhaleTimestamps.length])

  const handleStartSession = async () => {
    startSession()
    setAnimationState("inhale")
    await playStartSound()
    setShowResults(false)
  }

  const handleStopSession = async () => {
    stopSession()
    await playEndSound()

    // Calculate score and save to history
    if (sessionState.startTime && sessionState.inhaleTimestamps.length > 0) {
      const score = calculateScore(
        sessionState.startTime,
        sessionState.inhaleTimestamps,
        sessionState.exhaleTimestamps,
        sessionState.stopTime || Date.now(),
      )

      setSessionScore(score)

      addSessionToHistory({
        id: Date.now().toString(),
        date: new Date().toISOString(),
        duration: elapsedTime,
        breathCount: breathCount,
        score: score,
        inhaleTimestamps: sessionState.inhaleTimestamps,
        exhaleTimestamps: sessionState.exhaleTimestamps,
      })

      // Show results after a short delay to allow the end sound to play
      setTimeout(() => {
        setShowResults(true)
        onSessionComplete?.()
      }, 1000)
    }
  }

  const handleInhale = async () => {
    recordInhale()
    setAnimationState("exhale")
    await playInhaleSound()
  }

  const handleExhale = async () => {
    recordExhale()
    setAnimationState("inhale")
    await playExhaleSound()
  }

  if (showResults) {
    return (
      <SessionResults
        score={sessionScore}
        duration={elapsedTime}
        breathCount={breathCount}
        onClose={() => setShowResults(false)}
      />
    )
  }

  return (
    <AnimatedCard>
      <CardContent className="p-6 pb-4">
        <div className="flex flex-col items-center gap-4">
          <div className="text-center mb-2 md:mb-8 relative w-full">
            <h2 className="text-2xl font-semibold mb-2">Breathing Session</h2>
            <p className="text-muted-foreground mb-4">
              Focus on slow, controlled breathing with the{" "}
              <a
                href="/pattern"
                className="text-primary hover:underline inline-flex items-center"
              >
                20-20-20 pattern
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </p>
            <p className="text-muted-foreground mb-4">
              Need help? <a href="/instructions" className="text-blue-400 underline hover:text-blue-300">Read the instructions</a>
            </p>
          </div>

          <div className="w-full max-w-[280px] md:max-w-md order-1">
            <BreathingVisualizer animationState={animationState} />
          </div>

          <div className="w-full order-2">
            <BreathingControls
              isActive={sessionState.isActive}
              animationState={animationState}
              onStartSession={handleStartSession}
              onStopSession={handleStopSession}
              onInhale={handleInhale}
              onExhale={handleExhale}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-2 md:mb-6 w-full order-3 md:order-1">
            <div className="bg-muted rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground">Time</p>
              <p className="text-2xl font-mono">{formatTime(elapsedTime)}</p>
            </div>
            <div className="bg-muted rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground">Breaths</p>
              <p className="text-2xl font-mono">{breathCount}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </AnimatedCard>
  )
}
