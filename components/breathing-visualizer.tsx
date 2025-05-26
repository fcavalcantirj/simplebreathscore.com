"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface BreathingVisualizerProps {
  animationState: "idle" | "inhale" | "exhale" | "hold"
}

export default function BreathingVisualizer({ animationState }: BreathingVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Animation variants for the circle
  const circleVariants = {
    idle: {
      scale: 0.8,
      opacity: 0.7,
    },
    inhale: {
      scale: 1.5,
      opacity: 1,
      transition: { duration: 4, ease: "easeInOut" },
    },
    exhale: {
      scale: 0.8,
      opacity: 0.7,
      transition: { duration: 4, ease: "easeInOut" },
    },
    hold: {
      scale: 1.5,
      opacity: 1,
      transition: { duration: 0.1 },
    },
  }

  // Draw wave animation on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    const hue = 220 // Blue hue

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const drawWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const amplitude = animationState === "inhale" ? 20 : 10
      const frequency = 0.02
      const phase = Date.now() * 0.002

      ctx.beginPath()

      for (let x = 0; x < canvas.width; x++) {
        const y = amplitude * Math.sin(frequency * x + phase) + canvas.height / 2

        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
      gradient.addColorStop(0, `hsla(${hue}, 80%, 60%, 0.5)`)
      gradient.addColorStop(0.5, `hsla(${hue + 40}, 80%, 60%, 0.5)`)
      gradient.addColorStop(1, `hsla(${hue}, 80%, 60%, 0.5)`)

      ctx.strokeStyle = gradient
      ctx.lineWidth = 4
      ctx.stroke()

      animationFrameId = requestAnimationFrame(drawWave)
    }

    drawWave()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [animationState])

  return (
    <div className="relative w-full aspect-square max-w-xs mx-auto">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        variants={circleVariants}
        animate={animationState}
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-blue-500/20 dark:bg-blue-500/30 blur-xl" />
          <div className="relative rounded-full bg-blue-600/30 dark:bg-blue-500/40 w-32 h-32 flex items-center justify-center">
            <div className="text-center text-white">
              <p className="text-sm uppercase tracking-wider font-semibold">
                {animationState === "idle" && "Ready"}
                {animationState === "inhale" && "Inhale"}
                {animationState === "exhale" && "Exhale"}
                {animationState === "hold" && "Hold"}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
