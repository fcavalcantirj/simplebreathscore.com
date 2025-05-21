"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatTime, formatDate } from "@/lib/utils"
import { motion } from "framer-motion"
import { useHistoryContext } from "@/contexts/history-context"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

export default function HistoryView() {
  const { sessionHistory, clearHistory } = useHistoryContext()

  if (sessionHistory.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">
            No session history yet. Complete a breathing session to see your progress.
          </p>
        </CardContent>
      </Card>
    )
  }

  // Prepare data for chart
  const chartData = sessionHistory
    .slice(0, 10) // Last 10 sessions
    .map((session, index) => ({
      name: `Session ${sessionHistory.length - index}`,
      score: session.score,
      bpm: session.breathCount / (session.duration / (1000 * 60)),
    }))
    .reverse()

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Progress Chart</CardTitle>
          <CardDescription>Your breathing performance over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Line yAxisId="left" type="monotone" dataKey="score" stroke="#8884d8" name="Score" />
                <Line yAxisId="right" type="monotone" dataKey="bpm" stroke="#82ca9d" name="Breaths/Min" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

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
