'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import HistoryView from "@/components/history-view";
import Link from "next/link";

export default function HistoryPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-950 -z-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400" />
      <div className="absolute w-96 h-96 rounded-full bg-blue-200 dark:bg-blue-900 opacity-20 blur-3xl -top-48 -left-48" />
      <div className="absolute w-96 h-96 rounded-full bg-purple-200 dark:bg-purple-900 opacity-10 blur-3xl -bottom-48 -right-48" />
      
      <div className="w-full max-w-4xl px-4 mt-4">
        <Link href="/" className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M19 12H5"></path>
            <path d="m12 19-7-7 7-7"></path>
          </svg>
          Back to Home
        </Link>

        <HistoryView />
        
        {/* Footer */}
        <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} SimpleBreathScore</p>
        </div>
      </div>
    </main>
  );
} 