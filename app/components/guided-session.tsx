'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAudioFeedback } from "@/hooks/use-audio-feedback";
import { BreathingAnimationProvider } from "@/contexts/breathing-animation-context";
import { GuidedBreathingAnimation } from "../components/guided-breathing-animation";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useUserPreferencesContext } from "@/contexts/user-preferences-context";
import { AnimatedCard } from "@/components/animated-card";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

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
  const [isComplete, setIsComplete] = useState(false);
  const [totalBreaths, setTotalBreaths] = useState(0);
  const [accuracySum, setAccuracySum] = useState(0);
  const { playInhaleSound, playExhaleSound, playStartSound, playEndSound } = useAudioFeedback();
  const { soundEnabled, toggleSound } = useUserPreferencesContext();
  const router = useRouter();

  // Track elapsed session time for progress bar
  const [elapsedSessionTime, setElapsedSessionTime] = useState(0);

  const handleStartSession = async () => {
    setIsActive(true);
    setCurrentPhase('inhale');
    setTimeRemaining(duration * 60);
    await playStartSound();
  };

  const handleStopSession = async () => {
    setIsActive(false);
    setIsComplete(true);
    await playEndSound();
    onComplete({
      totalBreaths,
      averageAccuracy: totalBreaths > 0 ? accuracySum / totalBreaths : 0
    });
  };

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
          if (soundEnabled) playExhaleSound();
        } else if (currentPhase === 'pause') {
          setCurrentPhase('exhale');
        } else {
          setCurrentPhase('inhale');
          setTotalBreaths(prev => prev + 1);
          if (soundEnabled) playInhaleSound();
        }
      }
    };

    const interval = setInterval(updatePhase, 50);
    return () => clearInterval(interval);
  }, [isActive, currentPhase, inhaleDuration, pauseDuration, exhaleDuration, playInhaleSound, playExhaleSound, soundEnabled]);

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
    } else if (!isActive && !isComplete) {
      setElapsedSessionTime(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isComplete]);

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

  if (isComplete) {
    return (
      <AnimatedCard>
        <CardContent className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <p className="text-lg">Great job completing your meditation session!</p>
            <p className="text-sm text-muted-foreground">
              Duration: {duration} minutes
            </p>
            <p className="text-sm text-muted-foreground">
              Pattern: {inhaleDuration}-{pauseDuration}-{exhaleDuration}
            </p>
            <p className="text-sm text-muted-foreground">
              Total Breaths: {totalBreaths}
            </p>
            <p className="text-sm text-muted-foreground">
              Average Accuracy: {totalBreaths > 0 ? (accuracySum / totalBreaths).toFixed(1) : 0}%
            </p>
          </div>
        </CardContent>
      </AnimatedCard>
    );
  }

  return (
    <AnimatedCard>
      <CardContent className="p-6 pb-4">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => router.back()}
        >
          ← Back
        </Button>
        {/* Session progress bar at the top */}
        <div className="w-full mb-4">
          <div className="flex justify-between text-sm text-muted-foreground mb-1">
            <span>Session Progress</span>
            <span>{sessionProgress.toFixed(0)}%</span>
          </div>
          <Progress value={sessionProgress} className="h-2" />
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="text-center mb-2 md:mb-8 relative w-full">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-0 right-0"
              onClick={toggleSound}
            >
              {soundEnabled ? (
                <Volume2 className="h-4 w-4" />
              ) : (
                <VolumeX className="h-4 w-4" />
              )}
            </Button>
            <h2 className="text-2xl font-semibold mb-2">Guided Breathing Session</h2>
            <p className="text-muted-foreground mb-4">
              Follow the guided breathing pattern: {inhaleDuration}-{pauseDuration}-{exhaleDuration}
            </p>
            {isActive && (
              <div className="w-full space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Current Phase: {currentPhase}</span>
                  <span>{phaseProgress.toFixed(0)}%</span>
                </div>
                <Progress value={phaseProgress} className="h-2 border-2 border-red-500 bg-yellow-200" />
              </div>
            )}
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
                <Button size="lg" onClick={handleStartSession} className="px-8">
                  <Play className="mr-2 h-4 w-4" />
                  Start Session
                </Button>
              </div>
            ) : (
              <div className="flex justify-center">
                <Button variant="destructive" size="lg" onClick={handleStopSession} className="px-8">
                  <Pause className="mr-2 h-4 w-4" />
                  End Session
                </Button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-2 md:mb-6 w-full order-3 md:order-1">
            <div className="bg-muted rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground">Time</p>
              <p className="text-2xl font-mono">{formatTime(timeRemaining)}</p>
            </div>
            <div className="bg-muted rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground">Breaths</p>
              <p className="text-2xl font-mono">{totalBreaths}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </AnimatedCard>
  );
} 