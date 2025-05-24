'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAudioFeedback } from "@/hooks/use-audio-feedback";

interface SessionParameters {
  sessionDuration: number;
  inhaleDuration: number;
  pauseDuration: number;
  exhaleDuration: number;
}

type BreathingPhase = 'inhale' | 'pause' | 'exhale';

export function GuidedSession({ parameters }: { parameters: SessionParameters }) {
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<BreathingPhase>('inhale');
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [sessionProgress, setSessionProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(parameters.sessionDuration * 60);
  const [isComplete, setIsComplete] = useState(false);
  const { playInhaleSound, playExhaleSound, playStartSound, playEndSound } = useAudioFeedback();

  // Play initial inhale sound when component mounts
  useEffect(() => {
    playInhaleSound().catch(error => {
      console.error('Error playing initial inhale sound:', error);
    });
  }, [playInhaleSound]);

  const handleStartSession = async () => {
    try {
      await playStartSound();
      setIsActive(true);
    } catch (error) {
      console.error('Error starting session:', error);
      // Still set active even if sound fails
      setIsActive(true);
    }
  };

  const handleStopSession = async () => {
    try {
      await playEndSound();
    } catch (error) {
      console.error('Error playing end sound:', error);
    }
    setIsActive(false);
    setIsComplete(true);
  };

  useEffect(() => {
    let phaseTimer: NodeJS.Timeout;
    let sessionTimer: NodeJS.Timeout;

    if (isActive) {
      // Phase timer
      phaseTimer = setInterval(() => {
        setPhaseProgress(prev => {
          const newProgress = prev + 1;
          const phaseDuration = getPhaseDuration(currentPhase);
          
          if (newProgress >= phaseDuration) {
            // Move to next phase
            const nextPhase = getNextPhase(currentPhase);
            setCurrentPhase(nextPhase);
            
            // Play appropriate sound for the phase
            if (nextPhase === 'inhale') {
              playInhaleSound().catch(error => {
                console.error('Error playing inhale sound:', error);
              });
            } else if (nextPhase === 'exhale') {
              playExhaleSound().catch(error => {
                console.error('Error playing exhale sound:', error);
              });
            }
            
            return 0;
          }
          return newProgress;
        });
      }, 1000);

      // Session timer
      sessionTimer = setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1;
          setSessionProgress(((parameters.sessionDuration * 60 - newTime) / (parameters.sessionDuration * 60)) * 100);
          
          if (newTime <= 0) {
            handleStopSession();
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      clearInterval(phaseTimer);
      clearInterval(sessionTimer);
    };
  }, [isActive, currentPhase, parameters.sessionDuration, playInhaleSound, playExhaleSound, playStartSound, playEndSound]);

  const getPhaseDuration = (phase: BreathingPhase): number => {
    switch (phase) {
      case 'inhale': return parameters.inhaleDuration;
      case 'pause': return parameters.pauseDuration;
      case 'exhale': return parameters.exhaleDuration;
    }
  };

  const getNextPhase = (current: BreathingPhase): BreathingPhase => {
    switch (current) {
      case 'inhale': return 'pause';
      case 'pause': return 'exhale';
      case 'exhale': return 'inhale';
    }
  };

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
              Duration: {parameters.sessionDuration} minutes
            </p>
            <p className="text-sm text-muted-foreground">
              Pattern: {parameters.inhaleDuration}-{parameters.pauseDuration}-{parameters.exhaleDuration}
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
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          {currentPhase.charAt(0).toUpperCase() + currentPhase.slice(1)}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <div 
            className="w-48 h-48 rounded-full bg-blue-500/20 flex items-center justify-center transition-all duration-1000"
            style={{
              transform: `scale(${currentPhase === 'inhale' ? 1.5 : currentPhase === 'exhale' ? 0.8 : 1.2})`,
              opacity: currentPhase === 'pause' ? 0.8 : 1,
            }}
          >
            <div className="text-4xl font-light text-blue-500">
              {currentPhase === 'inhale' ? '↑' : currentPhase === 'exhale' ? '↓' : '•'}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Progress value={phaseProgress} max={getPhaseDuration(currentPhase)} />
          <p className="text-center text-sm text-muted-foreground">
            {phaseProgress} / {getPhaseDuration(currentPhase)} seconds
          </p>
        </div>

        <div className="space-y-2">
          <Progress value={sessionProgress} />
          <p className="text-center text-sm text-muted-foreground">
            Time Remaining: {formatTime(timeRemaining)}
          </p>
        </div>

        <Button 
          className="w-full"
          onClick={isActive ? handleStopSession : handleStartSession}
        >
          {isActive ? 'Stop Session' : 'Start Session'}
        </Button>
      </CardContent>
    </Card>
  );
} 