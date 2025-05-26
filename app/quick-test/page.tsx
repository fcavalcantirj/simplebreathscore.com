'use client';

import { useRouter } from "next/navigation";
import { BreathingAnimationProvider } from "@/contexts/breathing-animation-context";
import BreathingSession from "@/components/breathing-session";

export default function QuickTestPage() {
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
      
      <div className="w-full max-w-2xl px-4 sm:px-6 py-4 sm:py-6 relative z-[60]">
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
        
        <div className="bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-xl transition-all duration-300 hover:shadow-blue-100 dark:hover:shadow-blue-900/20">
          <BreathingAnimationProvider>
            <BreathingSession />
          </BreathingAnimationProvider>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400">
        <p>© {new Date().getFullYear()} SimpleBreathScore</p>
      </div>
    </main>
  );
} 