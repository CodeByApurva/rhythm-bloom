import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronRight, Leaf, Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const purposes = [
  { id: 'stay-fit', label: 'Stay fit' },
  { id: 'weight-loss', label: 'Weight loss' },
  { id: 'weight-gain', label: 'Weight gain' },
  { id: 'pcod-pcos', label: 'PCOD/PCOS support' },
];

const workoutPreferences = [
  { id: 'basic-exercises', label: 'Basic exercises' },
  { id: 'yoga', label: 'Yoga' },
  { id: 'pilates', label: 'Pilates' },
  { id: 'calisthenics', label: 'Calisthenics' },
  { id: 'zumba', label: 'Zumba' },
];

export default function Welcome() {
  const [step, setStep] = useState<'details' | 'purpose' | 'workout' | 'success'>('details');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    phone: '',
    email: '',
    password: '',
    purposes: [] as string[],
    workoutPreferences: [] as string[],
  });
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleDetailsNext = () => {
    if (!formData.fullName || !formData.age || !formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return;
    }
    setStep('purpose');
  };

  const handlePurposeNext = () => {
    if (formData.purposes.length === 0) {
      toast.error('Please select at least one purpose');
      return;
    }
    setStep('workout');
  };

  const togglePurpose = (id: string) => {
    setFormData(prev => ({
      ...prev,
      purposes: prev.purposes.includes(id)
        ? prev.purposes.filter(p => p !== id)
        : [...prev.purposes, id],
    }));
  };

  const toggleWorkout = (id: string) => {
    setFormData(prev => ({
      ...prev,
      workoutPreferences: prev.workoutPreferences.includes(id)
        ? prev.workoutPreferences.filter(w => w !== id)
        : [...prev.workoutPreferences, id],
    }));
  };

  const handleSubmit = async () => {
    if (formData.workoutPreferences.length === 0) {
      toast.error('Please select at least one workout preference');
      return;
    }

    setIsLoading(true);
    try {
      const { error: signUpError } = await signUp(formData.email, formData.password, formData.fullName);
      if (signUpError) throw signUpError;

      // Wait for session to be established
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await supabase.from('profiles').upsert({
          user_id: session.user.id,
          name: formData.fullName,
          age_range: formData.age,
          phone: formData.phone,
          purpose: formData.purposes,
          workout_preference: formData.workoutPreferences,
          onboarding_completed: true,
        });
      }

      setStep('success');
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-background">
        <div className="text-center animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-serif font-semibold text-foreground mb-3">
            Login Successful
          </h1>
          <p className="text-muted-foreground">
            Welcome to Rhythm! Let's begin your wellness journey.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col px-6 py-8 bg-background">
      {/* Header */}
      <div className="text-center mb-8 animate-fade-in">
        <div className="w-16 h-16 rounded-full rhythm-gradient-primary flex items-center justify-center mx-auto mb-4 shadow-soft">
          <Leaf className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-4xl font-serif font-bold text-foreground mb-2">
          Rhythm
        </h1>
        <p className="text-muted-foreground text-lg">
          Your health, our goal
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {['details', 'purpose', 'workout'].map((s, i) => (
          <div
            key={s}
            className={`h-2 rounded-full transition-all duration-300 ${s === step ? 'w-8 bg-primary' :
                ['details', 'purpose', 'workout'].indexOf(step) > i ? 'w-2 bg-primary/60' : 'w-2 bg-muted'
              }`}
          />
        ))}
      </div>

      {/* Step Content */}
      <div className="flex-1 max-w-md mx-auto w-full">
        {step === 'details' && (
          <div className="space-y-5 animate-fade-in">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-base font-medium">
                Full Name *
              </Label>
              <Input
                id="fullName"
                placeholder="Enter your name"
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                className="h-12 rounded-xl border-2 border-border focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="text-base font-medium">
                Age *
              </Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter your age"
                value={formData.age}
                onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                className="h-12 rounded-xl border-2 border-border focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-base font-medium">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="h-12 rounded-xl border-2 border-border focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-medium">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="h-12 rounded-xl border-2 border-border focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-base font-medium">
                Password *
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="h-12 rounded-xl border-2 border-border focus:border-primary transition-colors"
              />
            </div>
          </div>
        )}

        {step === 'purpose' && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-serif font-semibold text-foreground mb-2">
                What is your purpose?
              </h2>
              <p className="text-muted-foreground">Select all that apply</p>
            </div>

            <div className="space-y-3">
              {purposes.map((purpose) => (
                <button
                  key={purpose.id}
                  onClick={() => togglePurpose(purpose.id)}
                  className={`w-full p-4 rounded-2xl text-left font-medium transition-all duration-300 flex items-center gap-3 ${formData.purposes.includes(purpose.id)
                      ? 'bg-primary text-primary-foreground shadow-soft'
                      : 'bg-card border-2 border-border hover:border-primary/50'
                    }`}
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${formData.purposes.includes(purpose.id)
                      ? 'bg-primary-foreground/20'
                      : 'bg-muted'
                    }`}>
                    {formData.purposes.includes(purpose.id) && (
                      <Check className="w-4 h-4" />
                    )}
                  </div>
                  {purpose.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'workout' && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-serif font-semibold text-foreground mb-2">
                What do you prefer?
              </h2>
              <p className="text-muted-foreground">Select your workout preferences</p>
            </div>

            <div className="space-y-3">
              {workoutPreferences.map((workout) => (
                <button
                  key={workout.id}
                  onClick={() => toggleWorkout(workout.id)}
                  className={`w-full p-4 rounded-2xl text-left font-medium transition-all duration-300 flex items-center gap-3 ${formData.workoutPreferences.includes(workout.id)
                      ? 'bg-primary text-primary-foreground shadow-soft'
                      : 'bg-card border-2 border-border hover:border-primary/50'
                    }`}
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${formData.workoutPreferences.includes(workout.id)
                      ? 'bg-primary-foreground/20'
                      : 'bg-muted'
                    }`}>
                    {formData.workoutPreferences.includes(workout.id) && (
                      <Check className="w-4 h-4" />
                    )}
                  </div>
                  {workout.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Button */}
      <div className="pt-6 max-w-md mx-auto w-full">
        {step === 'details' && (
          <Button
            onClick={handleDetailsNext}
            className="w-full h-14 text-lg rounded-2xl rhythm-gradient-primary border-0 text-primary-foreground font-semibold shadow-soft"
          >
            Continue
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        )}

        {step === 'purpose' && (
          <Button
            onClick={handlePurposeNext}
            className="w-full h-14 text-lg rounded-2xl rhythm-gradient-primary border-0 text-primary-foreground font-semibold shadow-soft"
          >
            Continue
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        )}

        {step === 'workout' && (
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full h-14 text-lg rounded-2xl rhythm-gradient-primary border-0 text-primary-foreground font-semibold shadow-soft disabled:opacity-50"
          >
            {isLoading ? 'Creating account...' : 'Get Started'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        )}

        {step !== 'details' && (
          <Button
            variant="ghost"
            onClick={() => setStep(step === 'workout' ? 'purpose' : 'details')}
            className="w-full mt-3 text-muted-foreground"
          >
            Go back
          </Button>
        )}
      </div>
    </div>
  );
}
