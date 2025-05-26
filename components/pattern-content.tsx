"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function PatternContent() {
  const router = useRouter();

  const handleBackNavigation = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push('/');
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-950 -z-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400" />
      <div className="absolute w-96 h-96 rounded-full bg-blue-200 dark:bg-blue-900 opacity-20 blur-3xl -top-48 -left-48" />
      <div className="absolute w-96 h-96 rounded-full bg-purple-200 dark:bg-purple-900 opacity-10 blur-3xl -bottom-48 -right-48" />
      
      <div className="w-full max-w-4xl px-4 sm:px-6 py-4 sm:py-8 relative z-[60]">
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
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2 text-center">The One Minute Breath</h1>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-4 sm:mb-6 text-sm sm:text-base">A Powerful Kundalini Yoga Breathing Technique for Expanded Consciousness</p>
          
          <div className="space-y-4 sm:space-y-6 text-sm sm:text-base text-slate-700 dark:text-slate-300">
            <section>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">What is the One Minute Breath?</h2>
              <ul className="list-disc pl-6 mb-4">
                <li><b>Inhale</b> slowly for 20 seconds</li>
                <li><b>Hold</b> the breath for 20 seconds</li>
                <li><b>Exhale</b> gradually for 20 seconds</li>
              </ul>
              <p>This creates a rhythm of just one breath per minute—far below the average person's 12-16 breaths per minute.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">Benefits According to Kundalini Tradition</h2>
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
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">The Science Behind Slow Breathing</h2>
              <ul className="list-disc pl-6 mb-4">
                <li><b>Autonomic regulation:</b> Shifts from sympathetic (fight-or-flight) to parasympathetic (rest-and-digest) dominance</li>
                <li><b>Increased heart rate variability:</b> A key indicator of stress resilience and cardiovascular health</li>
                <li><b>Enhanced respiratory efficiency:</b> More efficient oxygen exchange and CO₂ elimination</li>
                <li><b>Reduced inflammation:</b> Lower levels of inflammatory markers</li>
                <li><b>Improved brain wave patterns:</b> Increased alpha and theta waves associated with relaxation and creativity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">Practicing the One Minute Breath</h2>
              <p className="mb-2"><b>For beginners:</b> Even attempting this practice for a few minutes brings benefits. Start with whatever ratio is comfortable (perhaps 5-5-5), gradually working toward the full 20-20-20 pattern.</p>
              <p className="mb-2"><b>Progression:</b> Focus first on reducing to fewer than 6 breaths per minute, then work toward 4 or fewer as you advance.</p>
              <p className="mb-2"><b>Experienced practitioners:</b> Aim for the complete 20-20-20 pattern, maintaining it for 11 minutes or more for maximum benefit.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">Scientific Research</h2>
              <ul className="list-disc pl-6 mb-4">
                <li>Zaccaro et al. (2018): Slow breathing techniques significantly improve heart rate variability and reduce blood pressure</li>
                <li>Ma et al. (2017): Slow breathing at 5.5 breaths per minute enhances cognitive performance and reduces cortisol levels</li>
                <li>Gerritsen & Band (2018): Slow breathing increases baroreflex sensitivity and parasympathetic activity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">References</h2>
              <ol className="list-decimal pl-6 mb-4">
                <li>Brown, R.P., & Gerbarg, P.L. (2009). Yoga breathing, meditation, and longevity. <i>Annals of the New York Academy of Sciences</i>, 1172, 54-62.</li>
                <li>Zaccaro, A., et al. (2018). How breath-control can change your life: A systematic review on psycho-physiological correlates of slow breathing. <i>Frontiers in Human Neuroscience</i>, 12, 353.</li>
                <li>Yogi Bhajan teachings on pranayama and the One Minute Breath (as documented in Kundalini Yoga training manuals)</li>
              </ol>
              <p className="italic text-slate-500 dark:text-slate-400">This ancient yogic technique has been practiced for centuries and is now gaining scientific validation for its profound effects on physical and mental wellbeing.</p>
            </section>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} SimpleBreathScore</p>
        </div>
      </div>
    </motion.div>
  )
} 