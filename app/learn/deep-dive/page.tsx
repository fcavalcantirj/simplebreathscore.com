import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DeepDivePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-background">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-950 -z-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400" />
      <div className="absolute w-96 h-96 rounded-full bg-blue-200 dark:bg-blue-900 opacity-20 blur-3xl -top-48 -left-48" />
      <div className="absolute w-96 h-96 rounded-full bg-purple-200 dark:bg-purple-900 opacity-10 blur-3xl -bottom-48 -right-48" />
      
      <div className="w-full max-w-2xl px-4 py-12">
        <Link href="/" className="inline-flex items-center mb-8 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M19 12H5"></path>
            <path d="m12 19-7-7 7-7"></path>
          </svg>
          Back to Home
        </Link>
        <div className="bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-700/50">
          <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center text-slate-800 dark:text-slate-200">
            🫁 The Complete Guide to 20-20-20 Breathing & Why SimpleBreathScore.com Changes Everything
          </h1>
          <div className="space-y-8 text-base leading-relaxed text-slate-700 dark:text-slate-300">
            <section>
              <div className="font-bold text-lg mb-3 text-slate-800 dark:text-slate-200">The Ancient Wisdom Meets Modern Science</div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                The 20-20-20 breathing pattern (20s inhale, 20s hold, 20s exhale) is rooted in ancient yogic practices. Modern science now explains why it works so powerfully.
              </div>
            </section>
            <section>
              <div className="font-bold text-lg mb-3 text-slate-800 dark:text-slate-200">The Physiological Magic</div>
              <ul className="list-none space-y-3">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-3 mt-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 flex-shrink-0 text-sm">1</span>
                  <div>
                    <b className="text-slate-800 dark:text-slate-200">Nervous System Hack:</b> Activates the vagus nerve, shifts you into calm mode, and reduces cortisol by up to 23% in 10 minutes.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-3 mt-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 flex-shrink-0 text-sm">2</span>
                  <div>
                    <b className="text-slate-800 dark:text-slate-200">Brain Wave Transformation:</b> Normal breathing keeps you alert/stressed. 20-20-20 gets you into theta waves—deep meditation and healing.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-3 mt-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 flex-shrink-0 text-sm">3</span>
                  <div>
                    <b className="text-slate-800 dark:text-slate-200">Oxygen & CO₂ Optimization:</b> Longer inhales = 70% more oxygen. Extended holds = less anxiety, more CO₂ tolerance.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 mr-3 mt-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 flex-shrink-0 text-sm">4</span>
                  <div>
                    <b className="text-slate-800 dark:text-slate-200">Full Lung Utilization:</b> Most people use only 30% of their lungs. 20-second inhales engage all zones and build lung strength.
                  </div>
                </li>
              </ul>
            </section>
            <section>
              <div className="font-bold text-lg mb-3 text-slate-800 dark:text-slate-200">The Cascade of Benefits</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800/70 p-4 rounded-lg">
                  <div className="font-medium mb-2 text-blue-600 dark:text-blue-400">Immediate</div>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Lower blood pressure</li>
                    <li>Better HRV</li>
                    <li>Less mental chatter</li>
                    <li>Stable body temp</li>
                  </ul>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/70 p-4 rounded-lg">
                  <div className="font-medium mb-2 text-purple-600 dark:text-purple-400">Short-term</div>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Better sleep</li>
                    <li>Emotional regulation</li>
                    <li>Improved focus</li>
                    <li>Less inflammation</li>
                  </ul>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/70 p-4 rounded-lg">
                  <div className="font-medium mb-2 text-emerald-600 dark:text-emerald-400">Long-term</div>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>More grey matter</li>
                    <li>Stronger immunity</li>
                    <li>Better heart health</li>
                    <li>Longer life</li>
                  </ul>
                </div>
              </div>
            </section>
            <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl">
              <div className="font-bold text-lg mb-3 text-slate-800 dark:text-slate-200">Why Most People Fail (and How We Fix It)</div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-5 h-5 mr-3 mt-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex-shrink-0 text-xs">✕</span>
                  <div>
                    <b className="text-slate-800 dark:text-slate-200">No Measurement:</b> You can't improve what you don't track. 
                    <span className="ml-2 text-blue-600 dark:text-blue-400 font-medium">We give you real-time feedback.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-5 h-5 mr-3 mt-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex-shrink-0 text-xs">✕</span>
                  <div>
                    <b className="text-slate-800 dark:text-slate-200">Too Ambitious:</b> Jumping to 20-20-20 is hard. 
                    <span className="ml-2 text-blue-600 dark:text-blue-400 font-medium">We start you at 7-5-7 and build up.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-5 h-5 mr-3 mt-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex-shrink-0 text-xs">✕</span>
                  <div>
                    <b className="text-slate-800 dark:text-slate-200">Inconsistency:</b> Life gets busy. 
                    <span className="ml-2 text-blue-600 dark:text-blue-400 font-medium">We remind you and track your streaks.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-5 h-5 mr-3 mt-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex-shrink-0 text-xs">✕</span>
                  <div>
                    <b className="text-slate-800 dark:text-slate-200">Lack of Feedback:</b> Unsure if you're doing it right? 
                    <span className="ml-2 text-blue-600 dark:text-blue-400 font-medium">We score your rhythm and smoothness.</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-5 h-5 mr-3 mt-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex-shrink-0 text-xs">✕</span>
                  <div>
                    <b className="text-slate-800 dark:text-slate-200">Boring:</b> Counting seconds is tedious. 
                    <span className="ml-2 text-blue-600 dark:text-blue-400 font-medium">We gamify the process.</span>
                  </div>
                </li>
              </ul>
            </section>
            
            {/* Additional sections condensed for space */}
            <section>
              <div className="font-bold text-lg mb-3 text-slate-800 dark:text-slate-200">The Science Behind the Site</div>
              <ul className="list-disc pl-5 space-y-1">
                <li><b>Visual Guide:</b> Calming colors and expanding circles match your breath.</li>
                <li><b>Progressive Training:</b> Like sports training—gradual, safe, and motivating.</li>
                <li><b>Data Insights:</b> See your patterns, best times, and how breath links to mood.</li>
              </ul>
            </section>
            
            <div className="bg-slate-50 dark:bg-slate-800/70 p-6 rounded-xl border border-slate-200/80 dark:border-slate-700/80 text-center">
              <p className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-3">Ready to transform your breathing?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="blue" size="lg" asChild>
                  <Link href="/quick-test">Take the Quick Test</Link>
                </Button>
                <Button variant="light" size="lg" asChild>
                  <Link href="/meditate">Start a Guided Session</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 