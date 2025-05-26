"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatTime, formatDate } from "@/lib/utils"
import { motion } from "framer-motion"
import { useHistoryContext } from "@/contexts/history-context"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"

export default function HistoryView() {
  const { sessionHistory, clearHistory } = useHistoryContext()

  if (sessionHistory.length === 0) {
    return (
      <div className="w-full bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl transition-all duration-300">
        <div className="p-6 text-center">
          <p className="text-slate-600 dark:text-slate-400">
            No session history yet. Complete a breathing session to see your progress.
          </p>
        </div>
      </div>
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
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">Session History</h1>
        <Button 
          variant="destructive" 
          onClick={clearHistory}
          className="bg-red-600 hover:bg-red-700 transition shadow-md shadow-red-600/10 text-white font-semibold"
        >
          Clear History
        </Button>
      </div>

      <div className="w-full bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl transition-all duration-300 hover:shadow-blue-100 dark:hover:shadow-blue-900/20 mb-6">
        <div className="p-6">
          <div className="mb-2">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Progress Chart</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">Your breathing performance over time</p>
          </div>
          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
                <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                    borderColor: '#e2e8f0',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Line yAxisId="left" type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} name="Score" />
                <Line yAxisId="right" type="monotone" dataKey="bpm" stroke="#10b981" strokeWidth={2} name="Breaths/Min" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="w-full bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl transition-all duration-300 hover:shadow-blue-100 dark:hover:shadow-blue-900/20">
        <div className="p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Session History</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">Your past breathing sessions</p>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-slate-700 dark:text-slate-300">Date</TableHead>
                  <TableHead className="text-slate-700 dark:text-slate-300">Duration</TableHead>
                  <TableHead className="text-slate-700 dark:text-slate-300">Breaths</TableHead>
                  <TableHead className="text-slate-700 dark:text-slate-300 text-right">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessionHistory.map((session) => (
                  <TableRow key={session.id} className="border-b border-slate-200 dark:border-slate-700">
                    <TableCell className="text-slate-700 dark:text-slate-300">{formatDate(session.date)}</TableCell>
                    <TableCell className="text-slate-700 dark:text-slate-300">{formatTime(session.duration)}</TableCell>
                    <TableCell className="text-slate-700 dark:text-slate-300">{session.breathCount}</TableCell>
                    <TableCell className="text-slate-700 dark:text-slate-300 text-right font-medium">{session.score.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
