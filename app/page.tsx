"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

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

export default function HomePage() {
  const { hasSeen, markSeen } = useHasSeenInstructions()
  const [showModal, setShowModal] = useState(!hasSeen)
  const router = useRouter()

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Meditate Section */}
        <section className="bg-card rounded-lg p-6 flex flex-col gap-4 shadow-md">
          <h2 className="text-2xl font-bold mb-2">Meditate</h2>
          <Link href="/quick-test" className="btn btn-primary w-full text-center py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Quick Test</Link>
          <Link href="/meditate" className="btn btn-secondary w-full text-center py-3 rounded-md bg-blue-100 text-blue-900 font-semibold hover:bg-blue-200 transition">Guided Session</Link>
        </section>
        {/* Learn Section */}
        <section className="bg-card rounded-lg p-6 flex flex-col gap-4 shadow-md">
          <h2 className="text-2xl font-bold mb-2">Learn</h2>
          <Link href="/learn/quick-pill" className="btn btn-primary w-full text-center py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Quick Pill</Link>
          <Link href="/learn/deep-dive" className="btn btn-secondary w-full text-center py-3 rounded-md bg-blue-100 text-blue-900 font-semibold hover:bg-blue-200 transition">Deep Dive</Link>
        </section>
      </div>
    </main>
  )
}
