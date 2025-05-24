'use client';

import { BreathingAnimationProvider } from "@/contexts/breathing-animation-context";
import BreathingSession from "@/components/breathing-session";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function TestPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => router.back()}
      >
        ← Back
      </Button>
      <BreathingAnimationProvider>
        <BreathingSession />
      </BreathingAnimationProvider>
    </div>
  );
} 