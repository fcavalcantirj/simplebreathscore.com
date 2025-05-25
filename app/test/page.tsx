'use client';

import { BreathingAnimationProvider } from "@/contexts/breathing-animation-context";
import { UserPreferencesProvider } from "@/contexts/user-preferences-context";
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
      <UserPreferencesProvider>
        <BreathingAnimationProvider>
          <BreathingSession />
        </BreathingAnimationProvider>
      </UserPreferencesProvider>
    </div>
  );
} 