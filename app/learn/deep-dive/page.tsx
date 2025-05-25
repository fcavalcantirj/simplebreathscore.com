import Link from "next/link";

export default function DeepDivePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-2xl">
        <Link href="/" className="inline-block mb-6 text-blue-600 hover:underline font-semibold">
          ← Back to Home
        </Link>
        <div className="bg-card rounded-lg p-8 shadow-md flex flex-col items-center gap-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">
            🫁 The Complete Guide to 20-20-20 Breathing & Why SimpleBreathScore.com Changes Everything
          </h1>
          <div className="space-y-6 text-base leading-relaxed">
            <section>
              <div className="font-bold text-lg mb-2">The Ancient Wisdom Meets Modern Science</div>
              <div>
                The 20-20-20 breathing pattern (20s inhale, 20s hold, 20s exhale) is rooted in ancient yogic practices. Modern science now explains why it works so powerfully.
              </div>
            </section>
            <section>
              <div className="font-bold text-lg mb-2">The Physiological Magic</div>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <b>Nervous System Hack:</b> Activates the vagus nerve, shifts you into calm mode, and reduces cortisol by up to 23% in 10 minutes.
                </li>
                <li>
                  <b>Brain Wave Transformation:</b> Normal breathing keeps you alert/stressed. 20-20-20 gets you into theta waves—deep meditation and healing.
                </li>
                <li>
                  <b>Oxygen & CO₂ Optimization:</b> Longer inhales = 70% more oxygen. Extended holds = less anxiety, more CO₂ tolerance.
                </li>
                <li>
                  <b>Full Lung Utilization:</b> Most people use only 30% of their lungs. 20-second inhales engage all zones and build lung strength.
                </li>
              </ul>
            </section>
            <section>
              <div className="font-bold text-lg mb-2">The Cascade of Benefits</div>
              <ul className="list-disc pl-5 space-y-1">
                <li><b>Immediate:</b> Lower blood pressure, better HRV, less mental chatter, stable body temp.</li>
                <li><b>Short-term:</b> Better sleep, emotional regulation, focus, less inflammation.</li>
                <li><b>Long-term:</b> More grey matter, stronger immunity, better heart health, longer life.</li>
              </ul>
            </section>
            <section>
              <div className="font-bold text-lg mb-2">Why Most People Fail (and How We Fix It)</div>
              <ul className="list-disc pl-5 space-y-1">
                <li><b>No Measurement:</b> You can't improve what you don't track. <b>We give you real-time feedback.</b></li>
                <li><b>Too Ambitious:</b> Jumping to 20-20-20 is hard. <b>We start you at 7-5-7 and build up.</b></li>
                <li><b>Inconsistency:</b> Life gets busy. <b>We remind you and track your streaks.</b></li>
                <li><b>Lack of Feedback:</b> Unsure if you're doing it right? <b>We score your rhythm and smoothness.</b></li>
                <li><b>Boring:</b> Counting seconds is tedious. <b>We gamify the process.</b></li>
              </ul>
            </section>
            <section>
              <div className="font-bold text-lg mb-2">The Science Behind the Site</div>
              <ul className="list-disc pl-5 space-y-1">
                <li><b>Visual Guide:</b> Calming colors and expanding circles match your breath.</li>
                <li><b>Progressive Training:</b> Like sports training—gradual, safe, and motivating.</li>
                <li><b>Data Insights:</b> See your patterns, best times, and how breath links to mood.</li>
              </ul>
            </section>
            <section>
              <div className="font-bold text-lg mb-2">The Bigger Picture</div>
              <div>
                "Prana" means breath and life force. You can live weeks without food, days without water, but only minutes without breath. Most people never learn to breathe well—yet it's the most powerful health tool you have.
              </div>
            </section>
            <section>
              <div className="font-bold text-lg mb-2">Why 20-20-20?</div>
              <ul className="list-disc pl-5 space-y-1">
                <li>20 seconds is challenging but doable</li>
                <li>1-minute cycles are easy to track</li>
                <li>Balances effort and relaxation</li>
                <li>Matches your body's natural rhythms</li>
              </ul>
            </section>
            <section>
              <div className="font-bold text-lg mb-2">Who Benefits Most?</div>
              <ul className="list-disc pl-5 space-y-1">
                <li><b>Anxiety sufferers:</b> Breaks the shallow breathing cycle</li>
                <li><b>High performers:</b> Boosts focus and decision-making</li>
                <li><b>Chronic pain:</b> Activates natural painkillers</li>
                <li><b>Insomniacs:</b> Prepares you for deep sleep</li>
                <li><b>Meditators:</b> Fast-tracks to deep states</li>
                <li><b>Athletes:</b> Improves oxygen use and recovery</li>
              </ul>
            </section>
            <section>
              <div className="font-bold text-lg mb-2">The Ripple Effect</div>
              <ul className="list-disc pl-5 space-y-1">
                <li>Better relationships (you're calmer, more present)</li>
                <li>Improved work performance (focus, creativity)</li>
                <li>Healthier body (BP, inflammation, immunity)</li>
                <li>Greater life satisfaction (control, capability)</li>
              </ul>
            </section>
            <section>
              <div className="font-bold text-lg mb-2">Why SimpleBreathScore.com?</div>
              <ul className="list-disc pl-5 space-y-1">
                <li>Meets you where you are</li>
                <li>Grows with your capacity</li>
                <li>Gives you real feedback</li>
                <li>Makes the invisible (breath) visible</li>
                <li>Turns practice into play</li>
              </ul>
              <div className="mt-4 font-semibold">
                The ultimate goal isn't perfection—it's progress. Every conscious breath is a win. Every session builds resilience. Every day rewires you for calm, clarity, and vitality.
              </div>
              <div className="mt-2">
                Remember: You're not just changing how you breathe. You're changing how you live.
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
} 