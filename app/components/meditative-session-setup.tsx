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
    <div className="w-full bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl transition-all duration-300 hover:shadow-blue-100 dark:hover:shadow-blue-900/20">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">Configure Your Session</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Customize your meditation session parameters
          </p>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-800 dark:text-slate-200">Session Duration (minutes)</label>
            <Slider
              value={[parameters.sessionDuration]}
              onValueChange={([value]) => setParameters(prev => ({ ...prev, sessionDuration: value }))}
              min={1}
              max={60}
              step={1}
              className="mt-2"
            />
            <p className="text-sm text-slate-600 dark:text-slate-400">{parameters.sessionDuration} minutes</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-800 dark:text-slate-200">Inhale Duration (seconds)</label>
            <Slider
              value={[parameters.inhaleDuration]}
              onValueChange={([value]) => setParameters(prev => ({ ...prev, inhaleDuration: value }))}
              min={4}
              max={20}
              step={1}
              className="mt-2"
            />
            <p className="text-sm text-slate-600 dark:text-slate-400">{parameters.inhaleDuration} seconds</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-800 dark:text-slate-200">Pause Duration (seconds)</label>
            <Slider
              value={[parameters.pauseDuration]}
              onValueChange={([value]) => setParameters(prev => ({ ...prev, pauseDuration: value }))}
              min={4}
              max={20}
              step={1}
              className="mt-2"
            />
            <p className="text-sm text-slate-600 dark:text-slate-400">{parameters.pauseDuration} seconds</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-800 dark:text-slate-200">Exhale Duration (seconds)</label>
            <Slider
              value={[parameters.exhaleDuration]}
              onValueChange={([value]) => setParameters(prev => ({ ...prev, exhaleDuration: value }))}
              min={4}
              max={20}
              step={1}
              className="mt-2"
            />
            <p className="text-sm text-slate-600 dark:text-slate-400">{parameters.exhaleDuration} seconds</p>
          </div>

          <Button 
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 transition shadow-md shadow-blue-600/10 text-white font-semibold"
            onClick={handleStartSession}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            Start Session
          </Button>
        </div>
      </div>
    </div>
  );
} 