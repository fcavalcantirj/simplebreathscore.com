'use client';

import { Suspense } from "react";
import BreathingApp from "@/components/breathing-app";
import LoadingFallback from "@/components/loading-fallback";

export default function QuickTestPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Suspense fallback={<LoadingFallback />}>
        <BreathingApp />
      </Suspense>
    </main>
  );
} 