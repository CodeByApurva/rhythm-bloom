import { cn } from '@/lib/utils';
import type { MoodType } from '@/lib/recommendations';

interface MoodSelectorProps {
  selected: MoodType | null;
  onSelect: (mood: MoodType) => void;
}

const moods: { value: MoodType; emoji: string; label: string; color: string }[] = [
  { value: 'happy', emoji: '😊', label: 'Happy', color: 'bg-rhythm-peach/30' },
  { value: 'calm', emoji: '😌', label: 'Calm', color: 'bg-rhythm-sage-light' },
  { value: 'energetic', emoji: '🤩', label: 'Energetic', color: 'bg-rhythm-coral/30' },
  { value: 'tired', emoji: '😴', label: 'Tired', color: 'bg-rhythm-lavender-light' },
  { value: 'stressed', emoji: '😰', label: 'Stressed', color: 'bg-rhythm-rose-light' },
  { value: 'anxious', emoji: '😟', label: 'Anxious', color: 'bg-accent' },
  { value: 'sad', emoji: '😢', label: 'Sad', color: 'bg-muted' },
];

export function MoodSelector({ selected, onSelect }: MoodSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center">How are you feeling?</h3>
      <div className="grid grid-cols-4 gap-3">
        {moods.map((mood) => (
          <button
            key={mood.value}
            onClick={() => onSelect(mood.value)}
            className={cn(
              "flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300",
              selected === mood.value
                ? `${mood.color} scale-105 shadow-soft ring-2 ring-primary/30`
                : "bg-card border-2 border-border hover:border-primary/30 hover:scale-102"
            )}
          >
            <span className="text-3xl">{mood.emoji}</span>
            <span className="text-xs font-medium text-foreground/80">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
