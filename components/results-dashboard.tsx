"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useBreathingSession } from "@/hooks/use-breathing-session"
import { useBreathingScore } from "@/hooks/use-breathing-score"
import { formatTime } from "@/lib/utils"
import { motion } from "framer-motion"
import { Award, Clock, TreesIcon as Lungs, Gauge } from "lucide-react"
import { useHistoryContext } from "@/contexts/history-context"

export default function ResultsDashboard() {
  const { sessionState } = useBreathingSession()
  const { calculateScore } = useBreathingScore()
  const { sessionHistory } = useHistoryContext()

  const [score, setScore] = useState<number | null>(null)
  const [sessionDuration, setSessionDuration] = useState<number>(0)
  const [breathCount, setBreathCount] = useState<number>(0)
  const [breathsPerMinute, setBreathsPerMinute] = useState<number>(0)

  useEffect(() => {
    // Get the most recent session from history
    if (sessionHistory.length > 0) {
      const latestSession = sessionHistory[0]
      setScore(latestSession.score)
      setSessionDuration(latestSession.duration)
      setBreathCount(latestSession.breathCount)

      // Calculate breaths per minute
      const durationMinutes = latestSession.duration / (1000 * 60)
      setBreathsPerMinute(durationMinutes > 0 ? latestSession.breathCount / durationMinutes : 0)
    } else {
      setScore(null)
    }
  }, [sessionHistory])

  if (score === null) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Complete a breathing session to see your results</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader>
          <CardTitle>Session Results</CardTitle>
          <CardDescription>Your latest breathing performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Breathing Score</h3>
              <span className="text-2xl font-bold">{score.toFixed(2)}</span>
            </div>
            <Progress value={score * 10} className="h-3" />
            <p className="text-sm text-muted-foreground mt-2">
              {score >= 9.5
                ? "Perfect! You've mastered slow breathing."
                : score >= 7
                  ? "Excellent control of your breath."
                  : score >= 5
                    ? "Good progress, keep practicing."
                    : "Keep working on slowing your breath."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 flex items-center">
                <Clock className="h-5 w-5 mr-3 text-primary" />
                <div>
                  <p className="text-sm font-medium">Duration</p>
                  <p className="text-lg">{formatTime(sessionDuration)}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center">
                <Lungs className="h-5 w-5 mr-3 text-primary" />
                <div>
                  <p className="text-sm font-medium">Breaths</p>
                  <p className="text-lg">{breathCount}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center">
                <Gauge className="h-5 w-5 mr-3 text-primary" />
                <div>
                  <p className="text-sm font-medium">Breaths/Min</p>
                  <p className="text-lg">{breathsPerMinute.toFixed(1)}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center">
                <Award className="h-5 w-5 mr-3 text-primary" />
                <div>
                  <p className="text-sm font-medium">Goal</p>
                  <p className="text-lg">1 BPM</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
