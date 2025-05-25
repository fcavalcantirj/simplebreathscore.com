'use client';

import { MeditativeSessionSetup } from "../components/meditative-session-setup";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { UserPreferencesProvider } from "@/contexts/user-preferences-context";
import Link from "next/link";

export default function MeditatePage() {
  const router = useRouter();

  return (
    <UserPreferencesProvider>
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.back()}
        >
          ← Back
        </Button>
        <MeditativeSessionSetup />
      </div>
    </UserPreferencesProvider>
  );
} 