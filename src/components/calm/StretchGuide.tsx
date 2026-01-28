import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

interface Stretch {
  name: string;
  duration: number;
  instructions: string;
  emoji: string;
  tip: string;
}

const stretches: Stretch[] = [
  {
    name: 'Neck Rolls',
    duration: 30,
    instructions: 'Gently roll your head in a circle, first clockwise, then counter-clockwise. Keep movements slow and controlled.',
    emoji: '🙆‍♀️',
    tip: 'If you feel any tension, pause and breathe into that spot.',
  },
  {
    name: 'Shoulder Shrugs',
    duration: 20,
    instructions: 'Raise your shoulders up to your ears, hold for 2 seconds, then release. Repeat 5 times.',
    emoji: '🤷‍♀️',
    tip: 'Let your arms hang loose by your sides.',
  },
  {
    name: 'Cat-Cow Stretch',
    duration: 45,
    instructions: 'On hands and knees, alternate between arching your back up (cat) and dropping your belly down (cow).',
    emoji: '🐱',
    tip: 'Move with your breath - inhale for cow, exhale for cat.',
  },
  {
    name: 'Seated Side Stretch',
    duration: 30,
    instructions: 'Sit cross-legged, reach one arm overhead and lean to the opposite side. Hold, then switch sides.',
    emoji: '🌿',
    tip: 'Keep both sit bones grounded.',
  },
  {
    name: 'Figure Four Stretch',
    duration: 45,
    instructions: 'Lie on your back, cross one ankle over the opposite knee, and gently pull the bottom leg toward you.',
    emoji: '🦵',
    tip: 'Keep your head and shoulders relaxed on the floor.',
  },
  {
    name: 'Child\'s Pose',
    duration: 60,
    instructions: 'Kneel and sit back on your heels, then fold forward with arms extended. Rest your forehead on the floor.',
    emoji: '🙏',
    tip: 'This is a resting pose - stay as long as you need.',
  },
];

export function StretchGuide() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const stretch = stretches[currentIndex];

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % stretches.length);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + stretches.length) % stretches.length);
  };

  return (
    <div className="p-6">
      {/* Progress Dots */}
      <div className="flex justify-center gap-2 mb-6">
        {stretches.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-primary w-6'
                : 'bg-border hover:bg-primary/50'
            }`}
          />
        ))}
      </div>

      {/* Stretch Card */}
      <div className="rhythm-card-elevated text-center">
        <span className="text-6xl block mb-4">{stretch.emoji}</span>
        
        <h3 className="text-2xl font-serif font-semibold mb-2">{stretch.name}</h3>
        
        <div className="inline-flex items-center gap-1 text-sm text-muted-foreground mb-4 bg-muted px-3 py-1 rounded-full">
          <Clock className="w-3 h-3" />
          <span>{stretch.duration} seconds</span>
        </div>

        <p className="text-foreground/80 mb-4 leading-relaxed">
          {stretch.instructions}
        </p>

        <div className="bg-secondary/50 rounded-xl p-4 text-sm text-secondary-foreground">
          <span className="font-medium">💡 Tip: </span>
          {stretch.tip}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-6">
        <Button
          onClick={goPrev}
          variant="outline"
          size="lg"
          className="rounded-full w-12 h-12"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <span className="text-sm text-muted-foreground">
          {currentIndex + 1} of {stretches.length}
        </span>

        <Button
          onClick={goNext}
          size="lg"
          className="rounded-full w-12 h-12 rhythm-gradient-primary text-primary-foreground"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
