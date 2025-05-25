'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useHistoryContext } from "@/contexts/history-context"
import { motion } from "framer-motion"
import { formatDate } from "@/lib/utils"

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

export default function HistoryView() {
  const { sessionHistory, clearHistory } = useHistoryContext()

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Session History</h1>
        <Button variant="destructive" onClick={clearHistory}>
          Clear History
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Session History</CardTitle>
          <CardDescription>Your past breathing sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Breaths</TableHead>
                <TableHead className="text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessionHistory.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>{formatDate(session.date)}</TableCell>
                  <TableCell>{formatTime(session.duration)}</TableCell>
                  <TableCell>{session.breathCount}</TableCell>
                  <TableCell className="text-right font-medium">{session.score.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  )
} 