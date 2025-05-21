"use client"
import { useRouter } from "next/navigation"

export default function InstructionsPage() {
  const router = useRouter()
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <button
        onClick={() => router.back()}
        className="mb-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded transition"
      >
        ← Go Back
      </button>
      <h1 className="text-3xl font-bold mb-4">How to Use Breathing Meditation Score</h1>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Getting Started</h2>
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
      <p className="mb-8">When you're ready to finish, press the "Stop" button. Your session will be analyzed immediately, showing your detailed results and score.</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Understanding Your Results</h2>
      <p className="mb-2">Your session results include:</p>
      <ul className="list-disc pl-6 mb-4">
        <li><b>Overall Score</b> (0.00-10.00) – Higher scores reflect slower, more controlled breathing</li>
        <li><b>Breaths Per Minute</b> – The key metric that determines most of your score</li>
        <li><b>Session Duration</b> – Longer sessions demonstrate greater endurance</li>
        <li><b>Average Breath Cycle</b> – Shows the average length of your complete breath cycles</li>
        <li><b>Detailed Timeline</b> – A precise record of each inhale and exhale</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Tips for Mastery</h2>
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

      <h2 className="text-2xl font-semibold mt-6 mb-2">Save and Track Progress</h2>
      <p className="mb-4">Review your history to see improvements over time. Each session is saved automatically, allowing you to track your journey toward mastery of slow, controlled breathing.</p>

      <div className="mt-6 italic text-muted-foreground">
        Remember: This is about finding your own pace and gradually extending the length of your breath cycles. There is no single "correct" pattern—only the goal of slowing your breath to enhance meditation benefits.
      </div>
    </div>
  )
}