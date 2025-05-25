'use client';

import Link from "next/link";
import { Suspense } from "react";
import BreathingApp from "@/components/breathing-app";
import LoadingFallback from "@/components/loading-fallback";
import { BreathingAnimationProvider } from "@/contexts/breathing-animation-context";
import BreathingSession from "@/components/breathing-session";

export default function QuickTestPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-2xl">
        <Link href="/" className="inline-block mb-6 text-blue-600 hover:underline font-semibold">
          ← Back to Home
        </Link>
        <BreathingAnimationProvider>
          <BreathingSession />
        </BreathingAnimationProvider>
      </div>
    </div>
  );
} 