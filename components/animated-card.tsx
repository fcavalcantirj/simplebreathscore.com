"use client"

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

interface AnimatedCardProps {
  children: React.ReactNode
}

export function AnimatedCard({ children }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>{children}</Card>
    </motion.div>
  )
} 