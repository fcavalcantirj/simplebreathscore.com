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
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-950 -z-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400" />
      <div className="absolute w-96 h-96 rounded-full bg-blue-200 dark:bg-blue-900 opacity-20 blur-3xl -top-48 -left-48" />
      <div className="absolute w-96 h-96 rounded-full bg-purple-200 dark:bg-purple-900 opacity-10 blur-3xl -bottom-48 -right-48" />
      
      {/* Logo/Title area */}
      <div className="w-full text-center mb-10 mt-4">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-200 mb-2">SimpleBreathScore</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">Master your breathing, enhance your wellbeing</p>
      </div>
      
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        {/* Meditate Section */}
        <section className="bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 flex flex-col gap-5 shadow-xl border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 hover:shadow-blue-100 dark:hover:shadow-blue-900/20">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center">
            <span className="inline-flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8a6 6 0 0 0-9.33-5"></path>
                <path d="m6 15 4-4"></path>
                <circle cx="5" cy="19" r="2"></circle>
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M22 12c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2s10 4.5 10 10z"></path>
              </svg>
            </span>
            Meditate
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-2">Start your breathing journey with guided sessions or take a quick test.</p>
          <Link href="/quick-test" className="w-full px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md shadow-blue-600/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
            Quick Test
          </Link>
          <Link href="/meditate" className="w-full px-6 py-3 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition shadow-md shadow-slate-600/5 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
              <path d="M2 12h20"></path>
            </svg>
            Guided Session
          </Link>
        </section>
        
        {/* Learn Section */}
        <section className="bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 flex flex-col gap-5 shadow-xl border border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 hover:shadow-purple-100 dark:hover:shadow-purple-900/20">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 flex items-center">
            <span className="inline-flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20V4"></path>
                <path d="M18 12H4"></path>
              </svg>
            </span>
            Learn
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-2">Discover the science behind breathing techniques and how they improve your well-being.</p>
          <Link href="/learn/quick-pill" className="w-full px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition shadow-md shadow-purple-600/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
            </svg>
            Quick Pill
          </Link>
          <Link href="/learn/deep-dive" className="w-full px-6 py-3 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition shadow-md shadow-slate-600/5 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            Deep Dive
          </Link>
        </section>
      </div>
      
      {/* Footer */}
      <div className="mt-16 text-center text-sm text-slate-500 dark:text-slate-400">
        <p>© {new Date().getFullYear()} SimpleBreathScore</p>
      </div>
    </main>
  )
}
