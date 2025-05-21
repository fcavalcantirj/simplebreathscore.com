"use client"

import { useCallback } from "react"

export function useBreathingScore() {
  // This implementation can be called at the end of a session to calculate score
  const calculateScore = useCallback(
    (startTime: number, inhaleTimestamps: number[], exhaleTimestamps: number[], stopTime: number) => {
      // Core measurements
      const sessionDurationMinutes = (stopTime - startTime) / (1000 * 60)
      const breathCount = inhaleTimestamps.length

      // Calculate breaths per minute (primary metric)
      const breathsPerMinute = breathCount / sessionDurationMinutes

      // Base score calculation (granular with decimals)
      let score

      if (breathsPerMinute <= 1) {
        // 1 BPM or less (perfect): Score range 9.50 - 10.00
        const deviation = Math.abs(1 - breathsPerMinute)
        score = 10 - deviation * 0.5 // Small penalty for going below 1
      } else if (breathsPerMinute <= 4) {
        // Between 1-4 BPM: Score range 7.00 - 9.49
        score = 9.5 - (breathsPerMinute - 1) * (2.5 / 3)
      } else if (breathsPerMinute <= 6) {
        // Between 4-6 BPM: Score range 5.00 - 6.99
        score = 7 - (breathsPerMinute - 4) * (2 / 2)
      } else if (breathsPerMinute <= 12) {
        // Between 6-12 BPM: Score range 0.01 - 4.99
        score = 5 - (breathsPerMinute - 6) * (5 / 6)
      } else {
        // More than 12 BPM: Score is 0
        score = 0
      }

      // Secondary adjustments for session length
      const durationBonus = Math.min(0.49, sessionDurationMinutes / 60)

      // For very good scores (7+), apply consistency adjustment
      let consistencyAdjustment = 0
      if (score >= 7 && breathCount > 3) {
        // Calculate intervals between inhales
        const intervals = []
        for (let i = 0; i < inhaleTimestamps.length - 1; i++) {
          intervals.push(inhaleTimestamps[i + 1] - inhaleTimestamps[i])
        }

        // Calculate stats
        const avgInterval = intervals.reduce((sum, val) => sum + val, 0) / intervals.length
        const stdDev = Math.sqrt(
          intervals.reduce((sum, val) => sum + Math.pow(val - avgInterval, 2), 0) / intervals.length,
        )
        const cv = stdDev / avgInterval

        // Apply adjustment (-0.25 to +0.25)
        consistencyAdjustment = 0.25 - cv * 0.5
        consistencyAdjustment = Math.max(-0.25, Math.min(0.25, consistencyAdjustment))
      }

      // Final score with all adjustments
      const finalScore = Math.max(0, Math.min(10, score + durationBonus + consistencyAdjustment))

      // Return score with 2 decimal places
      return Number.parseFloat(finalScore.toFixed(2))
    },
    [],
  )

  return { calculateScore }
}
