'use client';

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAudioFeedback } from "@/hooks/use-audio-feedback";
import { BreathingAnimationProvider } from "@/contexts/breathing-animation-context";
import { GuidedBreathingAnimation } from "../components/guided-breathing-animation";
import { Play, Pause } from "lucide-react";
import { AnimatedCard } from "@/components/animated-card";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

import { useBreathingScore } from "@/hooks/use-breathing-score"
import { useHistoryContext } from "@/contexts/history-context"
import SessionResults from "@/components/session-results"
import Link from "next/link";
import { useSessionState } from "@/hooks/use-session-state";

interface SessionParameters {
  sessionDuration: number;
  inhaleDuration: number;
  pauseDuration: number;
  exhaleDuration: number;
}

type BreathingPhase = 'inhale' | 'pause' | 'exhale';

interface GuidedSessionProps {
  duration: number;
  inhaleDuration: number;
  pauseDuration: number;
  exhaleDuration: number;
  onComplete: (results: { totalBreaths: number; averageAccuracy: number }) => void;
}

export function GuidedSession({ duration = 5, inhaleDuration, pauseDuration, exhaleDuration, onComplete }: GuidedSessionProps) {
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<BreathingPhase>('inhale');
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [sessionProgress, setSessionProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(duration * 60);
  const [totalBreaths, setTotalBreaths] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [sessionScore, setSessionScore] = useState(0);
  const { calculateScore } = useBreathingScore();
  const { addSessionToHistory, clearHistory } = useHistoryContext();
  const { playInhaleSound, playExhaleSound, playStartSound, playEndSound, playPauseSound } = useAudioFeedback();
  const router = useRouter();
  const { setSessionActive } = useSessionState();

  // Track elapsed session time for progress bar
  const [elapsedSessionTime, setElapsedSessionTime] = useState(0);

  const handleStartSession = async () => {
    setIsActive(true);
    setSessionActive(true); // Disable sound toggle
    setCurrentPhase('inhale');
    setTimeRemaining(duration * 60);
    setTotalBreaths(1);
    await playStartSound();
  };

  const handleStopSession = async () => {
    setIsActive(false);
    setSessionActive(false); // Re-enable sound toggle
    await playEndSound();

    // For guided sessions, we use a fixed score since we're following a pattern
    const score = 10.0; // Perfect score since we're following the guided pattern exactly

    setSessionScore(score);

    // Add to history
    addSessionToHistory({
      id: Date.now().toString(),
      date: new Date().toISOString(),
      duration: Math.floor(elapsedSessionTime), // Convert to seconds
      breathCount: totalBreaths,
      score: score,
      inhaleTimestamps: [], // Not needed for guided sessions
      exhaleTimestamps: [], // Not needed for guided sessions
    });

    // Show results after a short delay to allow the end sound to play
    setTimeout(() => {
      setShowResults(true);
      onComplete({
        totalBreaths,
        averageAccuracy: score
      });
    }, 1000);
  };

  useEffect(() => {
    if (!isActive) return;
    console.log('Current phase:', currentPhase);
    if (currentPhase === 'inhale') playInhaleSound();
    if (currentPhase === 'pause') playPauseSound();
    if (currentPhase === 'exhale') playExhaleSound();
  }, [currentPhase, isActive, playInhaleSound, playPauseSound, playExhaleSound]);

  useEffect(() => {
    if (!isActive) return;

    const cycleDuration = inhaleDuration + pauseDuration + exhaleDuration;
    const phaseTimings = {
      inhale: inhaleDuration,
      pause: pauseDuration,
      exhale: exhaleDuration
    };

    let startTime = Date.now();
    let phaseStartTime = startTime;

    const updatePhase = () => {
      const now = Date.now();
      const elapsed = now - phaseStartTime;
      const phaseDuration = phaseTimings[currentPhase] * 1000;
      
      // Update phase progress
      setPhaseProgress(Math.min(100, (elapsed / phaseDuration) * 100));

      if (elapsed >= phaseDuration) {
        phaseStartTime = now;
        if (currentPhase === 'inhale') {
          setCurrentPhase('pause');
        } else if (currentPhase === 'pause') {
          setCurrentPhase('exhale');
        } else {
          setCurrentPhase('inhale');
          setTotalBreaths(prev => prev + 1);
        }
      }
    };

    const interval = setInterval(updatePhase, 50);
    return () => clearInterval(interval);
  }, [isActive, currentPhase, inhaleDuration, pauseDuration, exhaleDuration, playInhaleSound, playExhaleSound]);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleStopSession();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setElapsedSessionTime(prev => prev + 1);
      }, 1000);
    } else {
      setElapsedSessionTime(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  // Update session progress bar value
  useEffect(() => {
    setSessionProgress(Math.min(100, (elapsedSessionTime / (duration * 60)) * 100));
  }, [elapsedSessionTime, duration]);

  const formatTime = (seconds: number): string => {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (showResults) {
    return (
      <SessionResults
        score={sessionScore}
        duration={elapsedSessionTime}
        breathCount={totalBreaths}
        onClose={() => {
          setShowResults(false);
          onComplete({
            totalBreaths,
            averageAccuracy: sessionScore
          });
        }}
      />
    );
  }

  return (
    <div className="w-full bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl transition-all duration-300 hover:shadow-blue-100 dark:hover:shadow-blue-900/20">
      <div className="p-6">
        <div className="w-full mb-4">
          <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-1">
            <span>Session Progress</span>
            <span>{sessionProgress.toFixed(0)}%</span>
          </div>
          <Progress value={sessionProgress} className="h-2" />
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="text-center mb-8 relative w-full">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">Guided Breathing Session</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Follow the guided breathing pattern: {inhaleDuration}-{pauseDuration}-{exhaleDuration}
            </p>
            <div className="w-full space-y-2 mb-4">
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                <span>Current Phase: <span className="capitalize">{currentPhase}</span></span>
                <span>{phaseProgress.toFixed(0)}%</span>
              </div>
              <Progress value={phaseProgress} className="h-2" />
            </div>
          </div>

          <div className="w-full max-w-[280px] md:max-w-md order-1 mb-12">
            <BreathingAnimationProvider
              inhaleDuration={inhaleDuration}
              pauseDuration={pauseDuration}
              exhaleDuration={exhaleDuration}
              isActive={isActive}
              currentPhase={currentPhase}
            >
              <GuidedBreathingAnimation />
            </BreathingAnimationProvider>
          </div>

          <div className="w-full order-2">
            {!isActive ? (
              <div className="flex justify-center">
                <Button 
                  size="lg" 
                  onClick={handleStartSession} 
                  className="px-8 bg-blue-600 hover:bg-blue-700 transition shadow-md shadow-blue-600/10 text-white font-semibold"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Start Session
                </Button>
              </div>
            ) : (
              <div className="flex justify-center">
                <Button 
                  variant="destructive" 
                  size="lg" 
                  onClick={handleStopSession} 
                  className="px-8 bg-red-600 hover:bg-red-700 transition shadow-md shadow-red-600/10 text-white font-semibold"
                >
                  <Pause className="mr-2 h-4 w-4" />
                  End Session
                </Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-2 md:mb-6 w-full order-3 md:order-1">
            <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4 text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400">Time</p>
              <p className="text-2xl font-mono text-slate-800 dark:text-slate-200">{formatTime(timeRemaining)}</p>
            </div>
            <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4 text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400">Breaths</p>
              <p className="text-2xl font-mono text-slate-800 dark:text-slate-200">{totalBreaths}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 