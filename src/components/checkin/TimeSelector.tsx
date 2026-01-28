import { cn } from '@/lib/utils';

interface TimeSelectorProps {
  value: number | null;
  onChange: (minutes: number) => void;
}

const timeOptions = [
  { value: 5, label: '5 min' },
  { value: 15, label: '15 min' },
  { value: 30, label: '30 min' },
  { value: 45, label: '45 min' },
  { value: 60, label: '60+ min' },
];

export function TimeSelector({ value, onChange }: TimeSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center">How much time do you have?</h3>
      <div className="flex flex-wrap justify-center gap-3">
        {timeOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "px-6 py-3 rounded-full font-medium transition-all duration-300",
              value === option.value
                ? "rhythm-gradient-nature text-secondary-foreground shadow-soft scale-105"
                : "bg-card border-2 border-border hover:border-primary/30"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
