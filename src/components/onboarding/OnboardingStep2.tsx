import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Sparkles } from 'lucide-react';

interface OnboardingStep2Props {
  name: string;
  onComplete: (data: {
    wellnessGoals: string[];
    activityLevel: string;
    preferredActivities: string[];
  }) => void;
}

const wellnessGoals = [
  { value: 'reduce-stress', label: 'Reduce stress', emoji: '🧘' },
  { value: 'improve-sleep', label: 'Sleep better', emoji: '😴' },
  { value: 'boost-energy', label: 'Boost energy', emoji: '⚡' },
  { value: 'build-strength', label: 'Build strength', emoji: '💪' },
  { value: 'find-calm', label: 'Find inner calm', emoji: '🌸' },
  { value: 'stay-active', label: 'Stay active', emoji: '🏃‍♀️' },
];

const activityLevels = [
  { value: 'beginner', label: 'Just starting out', description: 'New to fitness or returning after a break' },
  { value: 'moderate', label: 'Somewhat active', description: 'Exercise a few times a week' },
  { value: 'active', label: 'Very active', description: 'Exercise most days' },
];

const preferredActivitiesOptions = [
  { value: 'yoga', label: 'Yoga', emoji: '🧘‍♀️' },
  { value: 'pilates', label: 'Pilates', emoji: '🩰' },
  { value: 'dance', label: 'Dance', emoji: '💃' },
  { value: 'meditation', label: 'Meditation', emoji: '🧠' },
  { value: 'stretching', label: 'Stretching', emoji: '🌅' },
  { value: 'breathing', label: 'Breathing', emoji: '🌬️' },
];

export function OnboardingStep2({ name, onComplete }: OnboardingStep2Props) {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [activityLevel, setActivityLevel] = useState('');
  const [preferredActivities, setPreferredActivities] = useState<string[]>([]);

  const toggleGoal = (goal: string) => {
    setSelectedGoals(prev =>
      prev.includes(goal)
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const toggleActivity = (activity: string) => {
    setPreferredActivities(prev =>
      prev.includes(activity)
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  const handleComplete = () => {
    if (selectedGoals.length > 0 && activityLevel && preferredActivities.length > 0) {
      onComplete({
        wellnessGoals: selectedGoals,
        activityLevel,
        preferredActivities,
      });
    }
  };

  const isValid = selectedGoals.length > 0 && activityLevel && preferredActivities.length > 0;

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 bg-background">
      {/* Header */}
      <div className="text-center mb-8 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Step 2 of 2</span>
        </div>
        <h1 className="text-2xl font-serif font-semibold text-foreground mb-2">
          Almost there, {name}!
        </h1>
        <p className="text-muted-foreground">
          Tell us about your wellness preferences
        </p>
      </div>

      <div className="flex-1 space-y-8 overflow-y-auto">
        {/* Wellness Goals */}
        <div className="animate-fade-in-delay-1">
          <h3 className="text-lg font-semibold mb-3">What are your goals?</h3>
          <p className="text-sm text-muted-foreground mb-4">Select all that apply</p>
          <div className="grid grid-cols-2 gap-3">
            {wellnessGoals.map((goal) => (
              <button
                key={goal.value}
                onClick={() => toggleGoal(goal.value)}
                className={`p-4 rounded-2xl text-left transition-all duration-300 ${
                  selectedGoals.includes(goal.value)
                    ? 'bg-primary text-primary-foreground shadow-soft scale-[1.02]'
                    : 'bg-card border-2 border-border hover:border-primary/50'
                }`}
              >
                <span className="text-2xl mb-2 block">{goal.emoji}</span>
                <span className="font-medium text-sm">{goal.label}</span>
                {selectedGoals.includes(goal.value) && (
                  <Check className="w-4 h-4 absolute top-2 right-2" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Activity Level */}
        <div className="animate-fade-in-delay-2">
          <h3 className="text-lg font-semibold mb-3">Current activity level</h3>
          <div className="space-y-3">
            {activityLevels.map((level) => (
              <button
                key={level.value}
                onClick={() => setActivityLevel(level.value)}
                className={`w-full p-4 rounded-2xl text-left transition-all duration-300 ${
                  activityLevel === level.value
                    ? 'bg-secondary border-2 border-secondary-foreground/20 shadow-soft'
                    : 'bg-card border-2 border-border hover:border-primary/50'
                }`}
              >
                <div className="font-medium">{level.label}</div>
                <div className="text-sm text-muted-foreground mt-1">{level.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Preferred Activities */}
        <div className="animate-fade-in-delay-3">
          <h3 className="text-lg font-semibold mb-3">What do you enjoy?</h3>
          <p className="text-sm text-muted-foreground mb-4">Select activities you'd like to explore</p>
          <div className="grid grid-cols-3 gap-3">
            {preferredActivitiesOptions.map((activity) => (
              <button
                key={activity.value}
                onClick={() => toggleActivity(activity.value)}
                className={`p-3 rounded-2xl text-center transition-all duration-300 ${
                  preferredActivities.includes(activity.value)
                    ? 'bg-accent text-accent-foreground shadow-soft scale-[1.02]'
                    : 'bg-card border-2 border-border hover:border-primary/50'
                }`}
              >
                <span className="text-xl block mb-1">{activity.emoji}</span>
                <span className="text-xs font-medium">{activity.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Complete Button */}
      <div className="pt-6">
        <Button
          onClick={handleComplete}
          disabled={!isValid}
          className="w-full h-14 text-lg rounded-2xl rhythm-gradient-primary border-0 text-primary-foreground font-semibold shadow-soft disabled:opacity-50"
        >
          Start My Journey ✨
        </Button>
      </div>
    </div>
  );
}
