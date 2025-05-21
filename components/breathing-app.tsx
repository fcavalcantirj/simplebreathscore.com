"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BreathingSession from "@/components/breathing-session"
import ResultsDashboard from "@/components/results-dashboard"
import HistoryView from "@/components/history-view"
import { useBreathingSession } from "@/hooks/use-breathing-session"
import { motion } from "framer-motion"
import { Marcellus, Outfit } from "next/font/google"

const marcellus = Marcellus({ subsets: ["latin"], weight: "400" })
const outfit = Outfit({ subsets: ["latin"], weight: ["300", "500"] })

export default function BreathingApp() {
  const [activeTab, setActiveTab] = useState("session")
  const { sessionState } = useBreathingSession()

  // Prevent tab switching during active session
  const handleTabChange = (value: string) => {
    if (sessionState.isActive) return
    setActiveTab(value)
  }

  const handleSessionComplete = () => {
    setActiveTab("results")
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-8 max-w-4xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="mb-8 text-center">
        <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${marcellus.className}`}>Simple Breath Score</h1>
        <p className="text-muted-foreground">Master the art of slow, controlled breathing</p>
      </header>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="session" disabled={sessionState.isActive}>
            Session
          </TabsTrigger>
          <TabsTrigger value="results" disabled={sessionState.isActive}>
            Results
          </TabsTrigger>
          <TabsTrigger value="history" disabled={sessionState.isActive}>
            History
          </TabsTrigger>
        </TabsList>
        <TabsContent value="session" className="mt-6">
          <BreathingSession onSessionComplete={handleSessionComplete} />
        </TabsContent>
        <TabsContent value="results" className="mt-6">
          <ResultsDashboard />
        </TabsContent>
        <TabsContent value="history" className="mt-6">
          <HistoryView />
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
