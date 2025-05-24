"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface SessionResultsProps {
  score: number
  duration: number
  breathCount: number
  onClose: () => void
}

export default function SessionResults({ score, duration, breathCount, onClose }: SessionResultsProps) {
  const router = useRouter()

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="text-center space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Session Complete!</h2>
            <p className="text-muted-foreground">Your breathing score</p>
          </div>

          <div className="text-6xl font-bold text-primary">{score.toFixed(2)}</div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="text-xl font-mono">{Math.floor(duration / 1000 / 60)}m {Math.floor((duration / 1000) % 60)}s</p>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Breaths</p>
              <p className="text-xl font-mono">{breathCount}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button onClick={onClose} className="w-full">
              Close
            </Button>
            <Button variant="outline" onClick={() => router.push('/history')} className="w-full">
              View History
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 