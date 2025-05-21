"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function PatternContent() {
  const router = useRouter()
  return (
    <motion.div
      className="container mx-auto px-4 py-8 max-w-4xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={() => router.back()}
        className="mb-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded transition"
      >
        ← Go Back
      </button>
      <Card>
        <CardHeader>
          <CardTitle>The One Minute Breath</CardTitle>
          <CardDescription>A Powerful Kundalini Yoga Breathing Technique for Expanded Consciousness</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">What is the One Minute Breath?</h2>
            <ul className="list-disc pl-6 mb-4">
              <li><b>Inhale</b> slowly for 20 seconds</li>
              <li><b>Hold</b> the breath for 20 seconds</li>
              <li><b>Exhale</b> gradually for 20 seconds</li>
            </ul>
            <p>This creates a rhythm of just one breath per minute—far below the average person's 12-16 breaths per minute.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Benefits According to Kundalini Tradition</h2>
            <ul className="list-disc pl-6 mb-4">
              <li><b>Calms the mind</b> and reduces anxiety</li>
              <li><b>Balances the nervous system</b> by activating the parasympathetic response</li>
              <li><b>Expands awareness</b> and enhances meditation experiences</li>
              <li><b>Strengthens the aura</b> and electromagnetic field</li>
              <li><b>Enhances glandular function</b> and hormonal balance</li>
              <li><b>Increases emotional resilience</b> to stress</li>
              <li><b>Improves mental clarity</b> and decision-making abilities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">The Science Behind Slow Breathing</h2>
            <ul className="list-disc pl-6 mb-4">
              <li><b>Autonomic regulation:</b> Shifts from sympathetic (fight-or-flight) to parasympathetic (rest-and-digest) dominance</li>
              <li><b>Increased heart rate variability:</b> A key indicator of stress resilience and cardiovascular health</li>
              <li><b>Enhanced respiratory efficiency:</b> More efficient oxygen exchange and CO₂ elimination</li>
              <li><b>Reduced inflammation:</b> Lower levels of inflammatory markers</li>
              <li><b>Improved brain wave patterns:</b> Increased alpha and theta waves associated with relaxation and creativity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Practicing the One Minute Breath</h2>
            <p className="mb-2"><b>For beginners:</b> Even attempting this practice for a few minutes brings benefits. Start with whatever ratio is comfortable (perhaps 5-5-5), gradually working toward the full 20-20-20 pattern.</p>
            <p className="mb-2"><b>Progression:</b> Focus first on reducing to fewer than 6 breaths per minute, then work toward 4 or fewer as you advance.</p>
            <p className="mb-2"><b>Experienced practitioners:</b> Aim for the complete 20-20-20 pattern, maintaining it for 11 minutes or more for maximum benefit.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Scientific Research</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>Zaccaro et al. (2018): Slow breathing techniques significantly improve heart rate variability and reduce blood pressure</li>
              <li>Ma et al. (2017): Slow breathing at 5.5 breaths per minute enhances cognitive performance and reduces cortisol levels</li>
              <li>Gerritsen & Band (2018): Slow breathing increases baroreflex sensitivity and parasympathetic activity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">References</h2>
            <ol className="list-decimal pl-6 mb-4">
              <li>Brown, R.P., & Gerbarg, P.L. (2009). Yoga breathing, meditation, and longevity. <i>Annals of the New York Academy of Sciences</i>, 1172, 54-62.</li>
              <li>Zaccaro, A., et al. (2018). How breath-control can change your life: A systematic review on psycho-physiological correlates of slow breathing. <i>Frontiers in Human Neuroscience</i>, 12, 353.</li>
              <li>Yogi Bhajan teachings on pranayama and the One Minute Breath (as documented in Kundalini Yoga training manuals)</li>
            </ol>
            <p className="italic text-muted-foreground">This ancient yogic technique has been practiced for centuries and is now gaining scientific validation for its profound effects on physical and mental wellbeing.</p>
          </section>
        </CardContent>
      </Card>
    </motion.div>
  )
} 