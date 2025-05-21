"use client"
import { Suspense } from "react"
import BreathingApp from "@/components/breathing-app"
import LoadingFallback from "@/components/loading-fallback"
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

export default function Home() {
  const { hasSeen, markSeen } = useHasSeenInstructions()
  const [showModal, setShowModal] = useState(!hasSeen)
  const router = useRouter()

  return (
    <main className="min-h-screen flex flex-col">
      {/* Modal for first-time users */}
      {!hasSeen && showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 shadow-lg text-center max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
            <p className="mb-6">Learn how to use Momma's Little Helper for the best experience.</p>
            <Link href="/instructions">
              <button
                className="bg-blue-500 text-white px-6 py-3 rounded text-lg font-semibold hover:bg-blue-600 transition w-full"
                onClick={() => {
                  markSeen()
                  setShowModal(false)
                }}
              >
                How to Use
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Floating button for returning users */}
      {hasSeen && (
        <Link href="/instructions">
          <button className="fixed bottom-6 right-6 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition z-40">
            ?
          </button>
        </Link>
      )}

      <Suspense fallback={<LoadingFallback />}>
        <BreathingApp />
      </Suspense>
    </main>
  )
}
