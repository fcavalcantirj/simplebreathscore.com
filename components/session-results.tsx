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
    <Card className="w-full mx-auto bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-xl transition-all duration-300 hover:shadow-blue-100 dark:hover:shadow-blue-900/20">
      <CardContent className="p-6">
        <div className="text-center space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">Session Complete!</h2>
            <p className="text-slate-600 dark:text-slate-400">Your breathing score</p>
          </div>

          <div className="text-6xl font-bold text-blue-600 dark:text-blue-400">{score.toFixed(2)}</div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4">
              <p className="text-sm text-slate-600 dark:text-slate-400">Duration</p>
              <p className="text-xl font-mono text-slate-800 dark:text-slate-200">{Math.floor(duration / 1000 / 60)}m {Math.floor((duration / 1000) % 60)}s</p>
            </div>
            <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4">
              <p className="text-sm text-slate-600 dark:text-slate-400">Breaths</p>
              <p className="text-xl font-mono text-slate-800 dark:text-slate-200">{breathCount}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button onClick={onClose} className="w-full bg-blue-600 hover:bg-blue-700 transition shadow-md shadow-blue-600/10">
              Try Again
            </Button>
            <Button variant="outline" onClick={() => router.push('/history')} className="w-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 transition shadow-md shadow-slate-600/5 border-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M3 3v5h5"></path>
                <path d="M3 3l7 7"></path>
                <path d="M21 21v-5h-5"></path>
                <path d="M21 21l-7-7"></path>
              </svg>
              View History
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 