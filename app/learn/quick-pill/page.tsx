import Link from "next/link";

export default function QuickPillPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-950 -z-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400" />
      <div className="absolute w-96 h-96 rounded-full bg-blue-200 dark:bg-blue-900 opacity-20 blur-3xl -top-48 -left-48" />
      <div className="absolute w-96 h-96 rounded-full bg-purple-200 dark:bg-purple-900 opacity-10 blur-3xl -bottom-48 -right-48" />

      <div className="w-full max-w-2xl px-4">
        <Link href="/" className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M19 12H5"></path>
            <path d="m12 19-7-7 7-7"></path>
          </svg>
          Back to Home
        </Link>

        <div className="w-full bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl transition-all duration-300 hover:shadow-blue-100 dark:hover:shadow-blue-900/20 p-6">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 text-center">🫁 The Journey to 20-20-20 Breathing</h1>
          
          <div className="text-slate-700 dark:text-slate-300 mb-6">
            <p>While the ultimate goal is the powerful 20-20-20 breathing pattern, the key is <span className="font-semibold">gradual progression</span> and <span className="font-semibold">consistency</span>, as taught by breathing expert Gurubachan Singh.</p>
          </div>
          
          <div className="space-y-6">
            {/* Benefits section */}
            <div>
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">Why Deep Breathing Works</h2>
              <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-slate-300">
                <li>1 breath/min = instant calm, meditation brainwaves</li>
                <li>Full lungs = 70% more oxygen</li>
                <li>Long holds = less anxiety, better CO₂ tolerance</li>
                <li>Diaphragm = massages organs, better digestion</li>
              </ul>
            </div>
            
            {/* Progression method */}
            <div>
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">The Path to Mastery</h2>
              <div className="bg-slate-100/80 dark:bg-slate-700/30 rounded-lg p-4 space-y-3">
                <div className="border-l-4 border-blue-400 dark:border-blue-600 pl-3">
                  <h3 className="font-medium text-slate-800 dark:text-slate-200">Start Small: 5-5-5</h3>
                  <p className="text-slate-600 dark:text-slate-400">Begin with 5 seconds inhale, 5 seconds hold, 5 seconds exhale for 11 minutes daily for 2 weeks.</p>
                </div>
                
                <div className="border-l-4 border-blue-500 dark:border-blue-500 pl-3">
                  <h3 className="font-medium text-slate-800 dark:text-slate-200">Build Gradually: 7-7-7</h3>
                  <p className="text-slate-600 dark:text-slate-400">Progress to 7 seconds for each phase after consistent practice.</p>
                </div>
                
                <div className="border-l-4 border-blue-600 dark:border-blue-400 pl-3">
                  <h3 className="font-medium text-slate-800 dark:text-slate-200">Intermediate: 10-10-10</h3>
                  <p className="text-slate-600 dark:text-slate-400">Continue progressing until you can maintain 10-10-10 consistently.</p>
                </div>
                
                <div className="border-l-4 border-blue-700 dark:border-blue-300 pl-3">
                  <h3 className="font-medium text-slate-800 dark:text-slate-200">Advanced: 20-20-20</h3>
                  <p className="text-slate-600 dark:text-slate-400">The ultimate practice that delivers profound benefits.</p>
                </div>
              </div>
            </div>
            
            {/* Proper technique */}
            <div>
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">Proper Technique</h2>
              <div className="space-y-2 text-slate-700 dark:text-slate-300">
                <p><span className="font-medium">Inhale:</span> INFLATE the stomach, lift the diaphragm and EXPAND the lungs fully</p>
                <p><span className="font-medium">Hold:</span> Lock the breath in the chest cavity</p>
                <p><span className="font-medium">Exhale:</span> Reverse the process with control</p>
              </div>
            </div>
            
            {/* Quote */}
            <div className="mt-6">
              <blockquote className="italic text-slate-600 dark:text-slate-300 border-l-4 border-slate-300 dark:border-slate-600 pl-4">
                <p>"It is incremental expansion using the heart not the mind otherwise you cannot sustain. Do it by 5-5-5 seconds each stage and slowly increase the time."</p>
                <footer className="text-right font-medium text-slate-500 dark:text-slate-400 mt-2">— Gurubachan Singh</footer>
              </blockquote>
            </div>
            
            {/* Why use app */}
            <div className="bg-blue-50/70 dark:bg-blue-900/20 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">Why SimpleBreathScore?</h2>
              <p className="text-slate-700 dark:text-slate-300">
                Track your progress, receive real-time feedback, and build up safely through each level.
              </p>
              <div className="mt-3 p-2 bg-blue-100 dark:bg-blue-800/30 rounded-md border-l-4 border-blue-500 dark:border-blue-400">
                <p className="flex items-center font-bold text-blue-700 dark:text-blue-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                  Fully customize your breathing practice
                </p>
                <p className="ml-7 mt-1 text-blue-600 dark:text-blue-300">Set your own session duration and personalize the breathing pattern to perfectly match your experience level.</p>
              </div>
            </div>
            
            <div className="text-sm text-slate-500 dark:text-slate-400 mt-4">
              <p>Science: Fewer than 4 breaths/min triggers deep meditation states, lowers stress, and boosts clarity.</p>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} SimpleBreathScore</p>
        </div>
      </div>
    </main>
  );
} 