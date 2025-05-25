import Link from "next/link";

export default function QuickPillPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-lg">
        <Link href="/" className="inline-block mb-6 text-blue-600 hover:underline font-semibold">
          ← Back to Home
        </Link>
        <div className="bg-card rounded-lg p-8 shadow-md flex flex-col items-center gap-6">
          <h1 className="text-2xl font-bold mb-4">🫁 20-20-20 Breathing Magic</h1>
          <ul className="list-disc pl-5 space-y-2 text-base">
            <li>1 breath/min = instant calm, meditation brainwaves</li>
            <li>Full lungs = 70% more oxygen</li>
            <li>Long holds = less anxiety, better CO₂ tolerance</li>
            <li>Diaphragm = massages organs, better digestion</li>
          </ul>
          <div className="mt-4 text-base">
            <b>Why use SimpleBreathScore?</b> See your progress, get real feedback, and build up safely from 7-5-7 to 20-20-20. Consistency = results!
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            Science: Fewer than 4 breaths/min triggers deep meditation states, lowers stress, and boosts clarity.
          </div>
        </div>
      </div>
    </main>
  );
} 