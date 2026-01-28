import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingStep1 } from '@/components/onboarding/OnboardingStep1';
import { OnboardingStep2 } from '@/components/onboarding/OnboardingStep2';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState<{ name: string; ageRange: string } | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleStep1Complete = (data: { name: string; ageRange: string }) => {
    setStep1Data(data);
    setStep(2);
  };

  const handleStep2Complete = async (data: {
    wellnessGoals: string[];
    activityLevel: string;
    preferredActivities: string[];
  }) => {
    if (!user || !step1Data) {
      navigate('/home');
      return;
    }

    try {
      const { error } = await supabase.from('profiles').upsert({
        user_id: user.id,
        name: step1Data.name,
        age_range: step1Data.ageRange,
        wellness_goals: data.wellnessGoals,
        activity_level: data.activityLevel,
        preferred_activities: data.preferredActivities,
        onboarding_completed: true,
      });

      if (error) throw error;
      toast.success('Profile saved! Let\'s get started 🌸');
      navigate('/home');
    } catch (error) {
      console.error('Error saving profile:', error);
      navigate('/home');
    }
  };

  return step === 1 ? (
    <OnboardingStep1 onNext={handleStep1Complete} />
  ) : (
    <OnboardingStep2 name={step1Data?.name || ''} onComplete={handleStep2Complete} />
  );
}
