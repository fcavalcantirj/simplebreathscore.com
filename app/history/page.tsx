'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import HistoryView from "@/components/history-view";

export default function HistoryPage() {
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
      <HistoryView />
    </div>
  );
} 