"use client"

import { Button } from "@/components/ui/button"
import { Pause, Play, ArrowUp, ArrowDown } from "lucide-react"
import { motion } from "framer-motion"

interface BreathingControlsProps {
  isActive: boolean
  animationState?: "inhale" | "exhale" | "hold" | "idle"
  onStartSession: () => void
  onStopSession: () => void
  onInhale: () => void
  onExhale: () => void
}

const pulse = {
  animate: {
    scale: [1, 1.1, 1],
    boxShadow: [
      "0 0 0px #60a5fa",
      "0 0 24px #60a5fa",
      "0 0 0px #60a5fa"
    ],
    transition: { duration: 1, repeat: Infinity }
  }
}

export default function BreathingControls({
  isActive,
  animationState,
  onStartSession,
  onStopSession,
  onInhale,
  onExhale,
}: BreathingControlsProps) {
  return (
    <div className="w-full">
      {!isActive ? (
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Button 
            size="lg" 
            onClick={onStartSession} 
            className="px-8 bg-blue-600 hover:bg-blue-700 transition shadow-md shadow-blue-600/10 text-white font-semibold"
          >
            <Play className="mr-2 h-4 w-4" />
            Start Session
          </Button>
        </motion.div>
      ) : (
        <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="grid grid-cols-2 gap-4">
            {animationState === "inhale" ? (
              <motion.button
                type="button"
                className="h-24 text-lg rounded-lg w-full flex items-center justify-center transition-all bg-blue-600 text-white shadow-lg ring-4 ring-blue-300 dark:ring-blue-700 font-semibold"
                onClick={onInhale}
                animate="animate"
                variants={pulse}
              >
                <ArrowUp className="mr-2 h-6 w-6" />
                Inhale
              </motion.button>
            ) : (
              <button
                type="button"
                className="h-24 text-lg rounded-lg w-full flex items-center justify-center transition-all bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold"
                onClick={onInhale}
              >
                <ArrowUp className="mr-2 h-6 w-6" />
                Inhale
              </button>
            )}
            {animationState === "exhale" ? (
              <motion.button
                type="button"
                className="h-24 text-lg rounded-lg w-full flex items-center justify-center transition-all bg-blue-600 text-white shadow-lg ring-4 ring-blue-300 dark:ring-blue-700 font-semibold"
                onClick={onExhale}
                animate="animate"
                variants={pulse}
              >
                <ArrowDown className="mr-2 h-6 w-6" />
                Exhale
              </motion.button>
            ) : (
              <button
                type="button"
                className="h-24 text-lg rounded-lg w-full flex items-center justify-center transition-all bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold"
                onClick={onExhale}
              >
                <ArrowDown className="mr-2 h-6 w-6" />
                Exhale
              </button>
            )}
          </div>

          <div className="flex justify-center">
            <Button 
              variant="destructive" 
              size="lg" 
              onClick={onStopSession} 
              className="px-8 bg-red-600 hover:bg-red-700 transition shadow-md shadow-red-600/10 text-white font-semibold"
            >
              <Pause className="mr-2 h-4 w-4" />
              End Session
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
