import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { MoodSelector } from '@/components/checkin/MoodSelector';
import { EnergySelector } from '@/components/checkin/EnergySlider';
import { TimeSelector } from '@/components/checkin/TimeSelector';
import { RecommendationCard } from '@/components/recommendations/RecommendationCard';
import { getRecommendation, type MoodType, type EnergyLevel } from '@/lib/recommendations';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function Home() {
  const [mood, setMood] = useState<MoodType | null>(null);
  const [energy, setEnergy] = useState<EnergyLevel | null>(null);
  const [time, setTime] = useState<number | null>(null);
  const [recommendation, setRecommendation] = useState<ReturnType<typeof getRecommendation> | null>(null);

  const handleGetRecommendation = () => {
    if (mood && energy && time) {
      const rec = getRecommendation({ mood, energyLevel: energy, availableTime: time });
      setRecommendation(rec);
    }
  };

  const isComplete = mood && energy && time;

  if (recommendation) {
    return (
      <AppLayout>
        <div className="px-6 py-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-serif font-semibold mb-2">Your Recommendation</h2>
            <p className="text-muted-foreground">{recommendation.message}</p>
          </div>

          {/* Affirmation */}
          <div className="rhythm-card rhythm-gradient-calm mb-6 text-center">
            <Sparkles className="w-5 h-5 mx-auto mb-2 text-primary" />
            <p className="text-sm font-medium text-foreground">"{recommendation.affirmation}"</p>
          </div>

          {/* Primary Recommendation */}
          <div className="mb-6">
            <RecommendationCard
              activity={recommendation.primary}
              isPrimary
              onStart={() => toast.success('Starting activity! 🌸')}
            />
          </div>

          {/* Alternatives */}
          {recommendation.alternatives.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Other Options</h3>
              <div className="space-y-4">
                {recommendation.alternatives.map((activity) => (
                  <RecommendationCard
                    key={activity.id}
                    activity={activity}
                    onStart={() => toast.success(`Starting ${activity.name}! 🌸`)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* New Check-in */}
          <Button
            onClick={() => {
              setRecommendation(null);
              setMood(null);
              setEnergy(null);
              setTime(null);
            }}
            variant="outline"
            className="w-full mt-6 h-12 rounded-2xl"
          >
            New Check-in
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-semibold mb-2">Daily Check-in</h1>
          <p className="text-muted-foreground">Let's find what's right for you today</p>
        </div>

        {/* Check-in Steps */}
        <div className="space-y-8">
          <MoodSelector selected={mood} onSelect={setMood} />
          <EnergySelector value={energy} onChange={setEnergy} />
          <TimeSelector value={time} onChange={setTime} />
        </div>

        {/* Get Recommendation */}
        <Button
          onClick={handleGetRecommendation}
          disabled={!isComplete}
          className="w-full mt-8 h-14 text-lg rounded-2xl rhythm-gradient-primary border-0 text-primary-foreground font-semibold shadow-soft disabled:opacity-50"
        >
          Get My Recommendation
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </AppLayout>
  );
}
