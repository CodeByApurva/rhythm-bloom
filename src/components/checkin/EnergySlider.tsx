import { cn } from '@/lib/utils';
import type { EnergyLevel } from '@/lib/recommendations';

interface EnergySelectorProps {
  value: EnergyLevel | null;
  onChange: (value: EnergyLevel) => void;
}

const energyLevels: { value: EnergyLevel; emoji: string; label: string }[] = [
  { value: 1, emoji: '🔋', label: 'Very Low' },
  { value: 2, emoji: '🪫', label: 'Low' },
  { value: 3, emoji: '⚡', label: 'Moderate' },
  { value: 4, emoji: '💪', label: 'Good' },
  { value: 5, emoji: '🚀', label: 'High' },
];

export function EnergySelector({ value, onChange }: EnergySelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center">Energy level today?</h3>
      <div className="flex justify-between gap-2">
        {energyLevels.map((level) => (
          <button
            key={level.value}
            onClick={() => onChange(level.value)}
            className={cn(
              "flex-1 flex flex-col items-center gap-2 py-4 px-2 rounded-2xl transition-all duration-300",
              value === level.value
                ? "rhythm-gradient-energy text-primary-foreground shadow-soft scale-105"
                : "bg-card border-2 border-border hover:border-primary/30"
            )}
          >
            <span className="text-2xl">{level.emoji}</span>
            <span className="text-[10px] font-medium">{level.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
