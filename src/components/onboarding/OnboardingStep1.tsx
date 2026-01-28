import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronRight, Leaf } from 'lucide-react';

interface OnboardingStep1Props {
  onNext: (data: { name: string; ageRange: string }) => void;
}

const ageRanges = [
  { value: '18-24', label: '18-24' },
  { value: '25-34', label: '25-34' },
  { value: '35-44', label: '35-44' },
  { value: '45-54', label: '45-54' },
  { value: '55+', label: '55+' },
];

export function OnboardingStep1({ onNext }: OnboardingStep1Props) {
  const [name, setName] = useState('');
  const [ageRange, setAgeRange] = useState('');

  const handleSubmit = () => {
    if (name.trim() && ageRange) {
      onNext({ name: name.trim(), ageRange });
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-12 bg-background">
      {/* Header */}
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Leaf className="w-4 h-4" />
            <span className="text-sm font-medium">Step 1 of 2</span>
          </div>
          <h1 className="text-3xl font-serif font-semibold text-foreground mb-3">
            Welcome to Rhythm
          </h1>
          <p className="text-muted-foreground text-lg">
            Let's personalize your wellness journey
          </p>
        </div>

        {/* Form */}
        <div className="space-y-8 animate-fade-in-delay-1">
          <div className="space-y-3">
            <Label htmlFor="name" className="text-base font-medium">
              What should we call you?
            </Label>
            <Input
              id="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-14 text-lg rounded-2xl border-2 border-border focus:border-primary transition-colors"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium">
              Your age range
            </Label>
            <div className="grid grid-cols-3 gap-3">
              {ageRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => setAgeRange(range.value)}
                  className={`py-4 px-4 rounded-2xl text-base font-medium transition-all duration-300 ${
                    ageRange === range.value
                      ? 'bg-primary text-primary-foreground shadow-soft scale-[1.02]'
                      : 'bg-card border-2 border-border hover:border-primary/50'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="pt-8 animate-fade-in-delay-2">
        <Button
          onClick={handleSubmit}
          disabled={!name.trim() || !ageRange}
          className="w-full h-14 text-lg rounded-2xl rhythm-gradient-primary border-0 text-primary-foreground font-semibold shadow-soft disabled:opacity-50"
        >
          Continue
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
