import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

type BreathingPattern = 'box' | '478' | 'relaxing';

interface PatternConfig {
  name: string;
  description: string;
  inhale: number;
  hold1: number;
  exhale: number;
  hold2: number;
}

const patterns: Record<BreathingPattern, PatternConfig> = {
  box: {
    name: 'Box Breathing',
    description: 'Equal parts inhale, hold, exhale, hold',
    inhale: 4,
    hold1: 4,
    exhale: 4,
    hold2: 4,
  },
  '478': {
    name: '4-7-8 Breathing',
    description: 'Calming technique for sleep and relaxation',
    inhale: 4,
    hold1: 7,
    exhale: 8,
    hold2: 0,
  },
  relaxing: {
    name: 'Relaxing Breath',
    description: 'Gentle, slow breathing for calm',
    inhale: 5,
    hold1: 2,
    exhale: 7,
    hold2: 2,
  },
};

export function BreathingTimer() {
  const [pattern, setPattern] = useState<BreathingPattern>('box');
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold1' | 'exhale' | 'hold2'>('inhale');
  const [countdown, setCountdown] = useState(patterns[pattern].inhale);
  const [cycles, setCycles] = useState(0);

  const config = patterns[pattern];

  const getPhaseLabel = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In';
      case 'hold1': return 'Hold';
      case 'exhale': return 'Breathe Out';
      case 'hold2': return 'Hold';
    }
  };

  const getNextPhase = useCallback(() => {
    switch (phase) {
      case 'inhale': return 'hold1';
      case 'hold1': return 'exhale';
      case 'exhale': return config.hold2 > 0 ? 'hold2' : 'inhale';
      case 'hold2': return 'inhale';
    }
  }, [phase, config.hold2]);

  const getPhaseTime = useCallback((p: typeof phase) => {
    switch (p) {
      case 'inhale': return config.inhale;
      case 'hold1': return config.hold1;
      case 'exhale': return config.exhale;
      case 'hold2': return config.hold2;
    }
  }, [config]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            const nextPhase = getNextPhase();
            setPhase(nextPhase);
            if (nextPhase === 'inhale') {
              setCycles((c) => c + 1);
            }
            return getPhaseTime(nextPhase);
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, getNextPhase, getPhaseTime]);

  const handleReset = () => {
    setIsActive(false);
    setPhase('inhale');
    setCountdown(config.inhale);
    setCycles(0);
  };

  const handlePatternChange = (newPattern: BreathingPattern) => {
    setPattern(newPattern);
    setPhase('inhale');
    setCountdown(patterns[newPattern].inhale);
    setCycles(0);
    setIsActive(false);
  };

  const circleScale = phase === 'inhale' ? 1.2 : phase === 'exhale' ? 0.8 : 1;

  return (
    <div className="flex flex-col items-center p-6">
      {/* Pattern Selection */}
      <div className="flex gap-2 mb-8 flex-wrap justify-center">
        {(Object.keys(patterns) as BreathingPattern[]).map((p) => (
          <button
            key={p}
            onClick={() => handlePatternChange(p)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              pattern === p
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border border-border hover:border-primary/50'
            }`}
          >
            {patterns[p].name}
          </button>
        ))}
      </div>

      {/* Breathing Circle */}
      <div className="relative w-64 h-64 flex items-center justify-center mb-8">
        <div
          className="absolute inset-0 rounded-full rhythm-gradient-calm transition-transform duration-1000 ease-in-out"
          style={{ transform: `scale(${circleScale})` }}
        />
        <div className="absolute inset-4 rounded-full bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center">
          <span className="text-5xl font-bold text-primary">{countdown}</span>
          <span className="text-lg font-medium text-muted-foreground mt-2">
            {getPhaseLabel()}
          </span>
        </div>
      </div>

      {/* Info */}
      <p className="text-sm text-muted-foreground text-center mb-6 max-w-xs">
        {config.description}
      </p>

      {/* Cycles Counter */}
      <div className="text-center mb-6">
        <span className="text-sm text-muted-foreground">Cycles completed: </span>
        <span className="text-lg font-semibold text-primary">{cycles}</span>
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <Button
          onClick={() => setIsActive(!isActive)}
          size="lg"
          className="rounded-full w-14 h-14 rhythm-gradient-primary text-primary-foreground"
        >
          {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          size="lg"
          className="rounded-full w-14 h-14"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
