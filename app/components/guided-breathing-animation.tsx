"use client"

import { useContext, useRef, useEffect } from "react"
import { BreathingAnimationContext } from "@/contexts/breathing-animation-context"

export function GuidedBreathingAnimation() {
  const context = useContext(BreathingAnimationContext)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  if (!context) {
    return null
  }

  const { currentPhase } = context

  // Sine wave animation (copied from BreathingVisualizer)
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

      const amplitude = currentPhase === "inhale" ? 20 : 10
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
  }, [currentPhase])

  return (
    <div className="flex justify-center relative">
      <canvas ref={canvasRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 pointer-events-none z-10" />
      <div 
        className="w-48 h-48 rounded-full bg-blue-500/20 flex items-center justify-center transition-all duration-1000 relative"
        style={{
          transform: `scale(${currentPhase === 'inhale' ? 1.5 : currentPhase === 'exhale' ? 0.8 : 1.2})`,
          opacity: currentPhase === 'pause' ? 0.8 : 1,
        }}
      >
        <div className="text-3xl font-semibold text-blue-500 capitalize">
          {currentPhase === 'inhale' ? 'Inhale' : currentPhase === 'exhale' ? 'Exhale' : 'Pause'}
        </div>
      </div>
    </div>
  )
} 