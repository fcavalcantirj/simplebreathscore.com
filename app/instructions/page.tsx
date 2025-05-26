"use client"
import { useRouter } from "next/navigation";

export default function InstructionsPage() {
  const router = useRouter();

  const handleBackNavigation = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push('/');
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-950 -z-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400" />
      <div className="absolute w-96 h-96 rounded-full bg-blue-200 dark:bg-blue-900 opacity-20 blur-3xl -top-48 -left-48" />
      <div className="absolute w-96 h-96 rounded-full bg-purple-200 dark:bg-purple-900 opacity-10 blur-3xl -bottom-48 -right-48" />
      
      <div className="w-full max-w-2xl px-4 sm:px-6 py-4 sm:py-8 relative z-[60]">
        <button 
          onClick={handleBackNavigation}
          className="inline-flex items-center mb-4 sm:mb-6 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors p-3 min-h-[48px] min-w-[48px] touch-manipulation relative z-[70] cursor-pointer"
          style={{ 
            WebkitTapHighlightColor: 'rgba(59, 130, 246, 0.2)',
            WebkitUserSelect: 'none',
            userSelect: 'none'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M19 12H5"></path>
            <path d="m12 19-7-7 7-7"></path>
          </svg>
          <span className="text-base">Back to Home</span>
        </button>
        
        <div className="bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-xl transition-all duration-300 hover:shadow-blue-100 dark:hover:shadow-blue-900/20">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3 sm:mb-4">How to Use Breathing Meditation Score</h1>

          <div className="space-y-4 sm:space-y-6 text-sm sm:text-base text-slate-700 dark:text-slate-300">
            <section>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-6 mb-2">Getting Started</h2>
              <p className="mb-2 font-semibold">Begin Your Journey</p>
              <p className="mb-4">Tap the "Start Session" button when you're ready to begin your breathing meditation. Find a comfortable position where you can remain undisturbed.</p>
              <p className="mb-2 font-semibold">Record Your Breath</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Press the <b>Inhale</b> button at the exact moment you begin breathing in</li>
                <li>Press the <b>Exhale</b> button when you start breathing out</li>
                <li>Each press records a precise timestamp for analysis</li>
              </ul>
              <p className="mb-2 font-semibold">Follow Your Natural Rhythm</p>
              <p className="mb-4">There's no need to rush or force yourself into a rigid pattern. Allow your breathing to find its own natural, slow rhythm.</p>
              <p className="mb-2 font-semibold">Complete Your Session</p>
              <p className="mb-4">When you're ready to finish, press the "Stop" button. Your session will be analyzed immediately, showing your detailed results and score.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-6 mb-2">Understanding Your Results</h2>
              <p className="mb-2">Your session results include:</p>
              <ul className="list-disc pl-6 mb-4">
                <li><b>Overall Score</b> (0.00-10.00) – Higher scores reflect slower, more controlled breathing</li>
                <li><b>Breaths Per Minute</b> – The key metric that determines most of your score</li>
                <li><b>Session Duration</b> – Longer sessions demonstrate greater endurance</li>
                <li><b>Average Breath Cycle</b> – Shows the average length of your complete breath cycles</li>
                <li><b>Detailed Timeline</b> – A precise record of each inhale and exhale</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-6 mb-2">Tips for Mastery</h2>
              <p className="mb-2 font-semibold">The Breathing Goal</p>
              <ul className="list-disc pl-6 mb-4">
                <li>The main objective is to reduce your breathing rate below 6 inhales per minute</li>
                <li>Advanced practitioners aim for less than 4 inhales per minute</li>
                <li>Perfect scores come from reaching approximately 1 breath per minute</li>
              </ul>
              <p className="mb-2 font-semibold">What Makes a Good Score</p>
              <ul className="list-disc pl-6 mb-4">
                <li><b>5.00-6.99</b>: You're starting to master meditative breathing (4-6 BPM)</li>
                <li><b>7.00-9.49</b>: Excellent control of your breath (1-4 BPM)</li>
                <li><b>9.50-10.00</b>: Exceptional breathing mastery (around 1 BPM)</li>
              </ul>
              <p className="mb-2 font-semibold">Natural Not Robotic</p>
              <p className="mb-4">There's no need to follow a rigid 20-20-20 pattern. Your body has its own natural rhythm—the app simply measures how effectively you slow down your breathing rate. Quality and consistency matter more than perfectly timed intervals.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-6 mb-2">Save and Track Progress</h2>
              <p className="mb-4">Review your history to see improvements over time. Each session is saved automatically, allowing you to track your journey toward mastery of slow, controlled breathing.</p>
            </section>

            <div className="mt-6 italic text-slate-500 dark:text-slate-400">
              Remember: This is about finding your own pace and gradually extending the length of your breath cycles. There is no single "correct" pattern—only the goal of slowing your breath to enhance meditation benefits.
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>Created by <a href="https://github.com/fcavalcantirj" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">fcavalcantirj</a> | © {new Date().getFullYear()} SimpleBreathScore - Master your breathing, enhance your wellbeing</p>
        </div>
      </div>
    </main>
  )
}