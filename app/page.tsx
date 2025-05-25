"use client"
import { Suspense } from "react"
import BreathingApp from "@/components/breathing-app"
import LoadingFallback from "@/components/loading-fallback"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { HomeOptions } from "@/components/home-options"

export function useHasSeenInstructions() {
  const [hasSeen, setHasSeen] = useState(true)
  useEffect(() => {
    const seen = localStorage.getItem("hasSeenInstructions")
    setHasSeen(seen === "true")
  }, [])
  const markSeen = () => {
    localStorage.setItem("hasSeenInstructions", "true")
    setHasSeen(true)
  }
  return { hasSeen, markSeen }
}

export default function Home() {
  const { hasSeen, markSeen } = useHasSeenInstructions()
  const [showModal, setShowModal] = useState(!hasSeen)
  const router = useRouter()

  return (
    <main className="min-h-screen">
      <HomeOptions />
    </main>
  )
}
