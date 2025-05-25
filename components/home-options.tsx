'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export function HomeOptions() {
  const router = useRouter();

  return (
    <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>Quick Test</CardTitle>
          <CardDescription>
            Take a quick breathing test to measure your current breathing pattern
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            className="w-full"
            onClick={() => router.push('/test')}
          >
            Start Quick Test
          </Button>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>Meditative Session</CardTitle>
          <CardDescription>
            Begin a guided meditation session with customizable breathing patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            className="w-full"
            onClick={() => router.push('/meditate')}
          >
            Start Meditation
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 