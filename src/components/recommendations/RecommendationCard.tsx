import { Activity } from '@/lib/recommendations';
import { Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RecommendationCardProps {
  activity: Activity;
  isPrimary?: boolean;
  onStart: () => void;
}

export function RecommendationCard({ activity, isPrimary = false, onStart }: RecommendationCardProps) {
  return (
    <div
      className={`rounded-3xl p-6 transition-all duration-300 ${
        isPrimary
          ? 'rhythm-gradient-sunset text-foreground shadow-elevated'
          : 'bg-card border border-border shadow-card hover:shadow-elevated'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-4xl">{activity.icon}</span>
        <div className="flex items-center gap-1 text-sm bg-background/50 backdrop-blur-sm px-3 py-1 rounded-full">
          <Clock className="w-3 h-3" />
          <span>{activity.duration} min</span>
        </div>
      </div>

      <h3 className={`text-xl font-serif font-semibold mb-2 ${isPrimary ? 'text-foreground' : ''}`}>
        {activity.name}
      </h3>
      
      <p className={`text-sm mb-4 ${isPrimary ? 'text-foreground/80' : 'text-muted-foreground'}`}>
        {activity.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {activity.benefits.map((benefit) => (
          <span
            key={benefit}
            className={`text-xs px-3 py-1 rounded-full ${
              isPrimary
                ? 'bg-background/30 text-foreground'
                : 'bg-secondary text-secondary-foreground'
            }`}
          >
            {benefit}
          </span>
        ))}
      </div>

      <Button
        onClick={onStart}
        className={`w-full rounded-2xl h-12 font-semibold ${
          isPrimary
            ? 'bg-foreground text-background hover:bg-foreground/90'
            : 'rhythm-gradient-primary text-primary-foreground'
        }`}
      >
        {isPrimary && <Sparkles className="w-4 h-4 mr-2" />}
        Start {activity.type === 'breathing' ? 'Breathing' : 'Activity'}
      </Button>
    </div>
  );
}
