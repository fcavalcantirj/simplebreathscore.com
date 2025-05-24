'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAudioFeedback } from "@/hooks/use-audio-feedback";
import { BreathingAnimationProvider } from "@/contexts/breathing-animation-context";
import { BreathingAnimation } from "@/components/breathing-animation";
import { Volume2, VolumeX } from "lucide-react";

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

export function GuidedSession({ duration, inhaleDuration, pauseDuration, exhaleDuration, onComplete }: GuidedSessionProps) {
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<BreathingPhase>('inhale');
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [sessionProgress, setSessionProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [isComplete, setIsComplete] = useState(false);
  const [totalBreaths, setTotalBreaths] = useState(0);
  const [accuracySum, setAccuracySum] = useState(0);
  const { playInhaleSound, playExhaleSound, playStartSound, playEndSound, isAudioReady } = useAudioFeedback();

  const handleStartSession = async () => {
    setIsActive(true);
    setCurrentPhase('inhale');
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

    const handlePhaseTransition = async () => {
      if (currentPhase === 'inhale') {
        setCurrentPhase('pause');
        await playExhaleSound();
      } else if (currentPhase === 'pause') {
        setCurrentPhase('exhale');
      } else {
        setCurrentPhase('inhale');
        setTotalBreaths(prev => prev + 1);
        await playInhaleSound();
      }
    };

    const timer = setTimeout(handlePhaseTransition, phaseTimings[currentPhase] * 1000);
    return () => clearTimeout(timer);
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

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (isComplete) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Session Complete!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-lg">Great job completing your meditation session!</p>
            <p className="text-sm text-muted-foreground">
              Duration: {duration} minutes
            </p>
            <p className="text-sm text-muted-foreground">
              Pattern: {inhaleDuration}-{pauseDuration}-{exhaleDuration}
            </p>
          </div>
          <Button 
            className="w-full"
            onClick={() => window.location.href = '/'}
          >
            Return Home
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Guided Breathing Session</h2>
        <p className="text-muted-foreground">
          {isActive ? (
            <>
              Time Remaining: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
              <br />
              Phase: {currentPhase.charAt(0).toUpperCase() + currentPhase.slice(1)}
              <br />
              Total Breaths: {totalBreaths}
            </>
          ) : (
            "Click Start to begin your session"
          )}
        </p>
        {!isAudioReady && (
          <p className="text-yellow-500 flex items-center justify-center gap-2">
            <VolumeX className="h-4 w-4" />
            Click anywhere to enable sound
          </p>
        )}
        {isAudioReady && (
          <p className="text-green-500 flex items-center justify-center gap-2">
            <Volume2 className="h-4 w-4" />
            Sound is ready
          </p>
        )}
      </div>

      <BreathingAnimationProvider
        inhaleDuration={inhaleDuration}
        pauseDuration={pauseDuration}
        exhaleDuration={exhaleDuration}
        isActive={isActive}
        currentPhase={currentPhase}
      >
        <BreathingAnimation />
      </BreathingAnimationProvider>

      <div className="flex gap-4">
        {!isActive && !isComplete && (
          <Button onClick={handleStartSession} size="lg">
            Start Session
          </Button>
        )}
        {isActive && (
          <Button onClick={handleStopSession} variant="destructive" size="lg">
            End Session
          </Button>
        )}
      </div>
    </div>
  );
} 