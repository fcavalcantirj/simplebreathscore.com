'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useState, useEffect } from "react";
import { GuidedSession } from "./guided-session";
import SessionResults from "@/components/session-results";
import { useSessionStorage } from "@/hooks/use-session-storage";

interface SessionParameters {
  sessionDuration: number;
  inhaleDuration: number;
  pauseDuration: number;
  exhaleDuration: number;
}

const defaultParameters: SessionParameters = {
  sessionDuration: 5,
  inhaleDuration: 4,
  pauseDuration: 4,
  exhaleDuration: 4,
};

export function MeditativeSessionSetup() {
  const [parameters, setParameters] = useSessionStorage<SessionParameters>(
    "breathing-app-settings",
    defaultParameters
  );
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [sessionResults, setSessionResults] = useState<{
    totalBreaths: number;
    averageAccuracy: number;
  } | null>(null);

  const handleStartSession = () => {
    setIsSessionStarted(true);
    setShowResults(false);
  };

  if (showResults && sessionResults) {
    return (
      <SessionResults
        score={sessionResults.averageAccuracy}
        duration={parameters.sessionDuration * 60}
        breathCount={sessionResults.totalBreaths}
        onClose={() => {
          setShowResults(false);
          setIsSessionStarted(false);
        }}
      />
    );
  }

  if (isSessionStarted) {
    return (
      <GuidedSession
        duration={parameters.sessionDuration}
        inhaleDuration={parameters.inhaleDuration}
        pauseDuration={parameters.pauseDuration}
        exhaleDuration={parameters.exhaleDuration}
        onComplete={(results) => {
          setSessionResults(results);
          setShowResults(true);
        }}
      />
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Configure Your Session</CardTitle>
        <CardDescription>
          Customize your meditation session parameters
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Session Duration (minutes)</label>
          <Slider
            value={[parameters.sessionDuration]}
            onValueChange={([value]) => setParameters(prev => ({ ...prev, sessionDuration: value }))}
            min={1}
            max={60}
            step={1}
          />
          <p className="text-sm text-muted-foreground">{parameters.sessionDuration} minutes</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Inhale Duration (seconds)</label>
          <Slider
            value={[parameters.inhaleDuration]}
            onValueChange={([value]) => setParameters(prev => ({ ...prev, inhaleDuration: value }))}
            min={4}
            max={20}
            step={1}
          />
          <p className="text-sm text-muted-foreground">{parameters.inhaleDuration} seconds</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Pause Duration (seconds)</label>
          <Slider
            value={[parameters.pauseDuration]}
            onValueChange={([value]) => setParameters(prev => ({ ...prev, pauseDuration: value }))}
            min={4}
            max={20}
            step={1}
          />
          <p className="text-sm text-muted-foreground">{parameters.pauseDuration} seconds</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Exhale Duration (seconds)</label>
          <Slider
            value={[parameters.exhaleDuration]}
            onValueChange={([value]) => setParameters(prev => ({ ...prev, exhaleDuration: value }))}
            min={4}
            max={20}
            step={1}
          />
          <p className="text-sm text-muted-foreground">{parameters.exhaleDuration} seconds</p>
        </div>

        <Button 
          className="w-full mt-6"
          onClick={handleStartSession}
        >
          Start Session
        </Button>
      </CardContent>
    </Card>
  );
} 