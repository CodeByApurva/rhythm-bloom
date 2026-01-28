import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { 
  Flame, 
  Heart, 
  Sparkles, 
  Music2, 
  Dumbbell, 
  Leaf,
  Baby,
  Clock,
  ChevronRight
} from 'lucide-react';

interface UserProfile {
  purpose: string[];
  workout_preference: string[];
}

const homeWorkouts = [
  { id: 'yoga', name: 'Yoga', icon: Leaf, duration: '20-45 min', level: 'All levels', color: 'bg-rhythm-sage-light' },
  { id: 'pilates', name: 'Pilates', icon: Sparkles, duration: '30-45 min', level: 'Beginner+', color: 'bg-rhythm-eucalyptus-light' },
  { id: 'calisthenics', name: 'Calisthenics', icon: Dumbbell, duration: '30-60 min', level: 'Intermediate', color: 'bg-rhythm-grey-green-light' },
  { id: 'zumba', name: 'Zumba', icon: Music2, duration: '30-45 min', level: 'All levels', color: 'bg-accent' },
  { id: 'stretching', name: 'Stretching', icon: Heart, duration: '10-20 min', level: 'All levels', color: 'bg-secondary' },
  { id: 'basic', name: 'Basic Workouts', icon: Flame, duration: '15-30 min', level: 'Beginner', color: 'bg-rhythm-beige' },
];

const specialCarePrograms = [
  { 
    id: 'pcod', 
    name: 'PCOD Exercises', 
    icon: Baby, 
    description: 'Gentle exercises designed for PCOD management',
    duration: '20-30 min',
    sessions: 12,
    color: 'bg-rhythm-sage-light'
  },
  { 
    id: 'pcos', 
    name: 'PCOS Exercises', 
    icon: Heart, 
    description: 'Targeted workouts for PCOS support',
    duration: '25-35 min',
    sessions: 12,
    color: 'bg-rhythm-eucalyptus-light'
  },
];

export default function Training() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('profiles')
      .select('purpose, workout_preference')
      .eq('user_id', user.id)
      .maybeSingle();
    
    if (data) {
      setProfile(data as UserProfile);
    }
  };

  const getRecommendedWorkouts = () => {
    if (!profile) return homeWorkouts;
    
    return homeWorkouts.filter(workout => {
      // If user has workout preferences, prioritize those
      if (profile.workout_preference && profile.workout_preference.length > 0) {
        const prefId = workout.id === 'basic' ? 'basic-exercises' : workout.id;
        if (profile.workout_preference.includes(prefId)) return true;
      }
      return true; // Show all by default
    }).sort((a, b) => {
      // Sort recommended ones first
      const aIsPreferred = profile.workout_preference?.includes(a.id === 'basic' ? 'basic-exercises' : a.id);
      const bIsPreferred = profile.workout_preference?.includes(b.id === 'basic' ? 'basic-exercises' : b.id);
      if (aIsPreferred && !bIsPreferred) return -1;
      if (!aIsPreferred && bIsPreferred) return 1;
      return 0;
    });
  };

  const showSpecialCare = profile?.purpose?.includes('pcod-pcos');

  return (
    <AppLayout>
      <div className="px-6 py-8 space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
            Your Training
          </h1>
          <p className="text-muted-foreground">
            Workouts tailored to your goals
          </p>
        </div>

        <Tabs defaultValue="home" className="animate-fade-in-delay-1">
          <TabsList className="w-full grid grid-cols-2 h-12 rounded-2xl bg-muted p-1">
            <TabsTrigger 
              value="home" 
              className="rounded-xl font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              Home-Based
            </TabsTrigger>
            <TabsTrigger 
              value="special" 
              className="rounded-xl font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              Special Care
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="mt-6 space-y-4">
            {profile?.workout_preference && profile.workout_preference.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-sm text-muted-foreground">Your preferences:</span>
                {profile.workout_preference.map((pref) => (
                  <Badge key={pref} variant="secondary" className="rounded-full">
                    {pref.replace('-', ' ')}
                  </Badge>
                ))}
              </div>
            )}

            <div className="grid gap-4">
              {getRecommendedWorkouts().map((workout, index) => {
                const isRecommended = profile?.workout_preference?.includes(
                  workout.id === 'basic' ? 'basic-exercises' : workout.id
                );
                
                return (
                  <Card 
                    key={workout.id} 
                    className={`rhythm-card cursor-pointer hover:shadow-elevated transition-all duration-300 ${
                      isRecommended ? 'ring-2 ring-primary/30' : ''
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl ${workout.color} flex items-center justify-center`}>
                          <workout.icon className="w-7 h-7 text-foreground/80" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground">{workout.name}</h3>
                            {isRecommended && (
                              <Badge className="bg-primary/20 text-primary text-xs">
                                For you
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {workout.duration}
                            </span>
                            <span>•</span>
                            <span>{workout.level}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="special" className="mt-6 space-y-4">
            {showSpecialCare && (
              <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 mb-4">
                <p className="text-sm text-foreground">
                  ✨ Based on your goals, we've highlighted programs that may help you.
                </p>
              </div>
            )}

            <div className="grid gap-4">
              {specialCarePrograms.map((program, index) => (
                <Card 
                  key={program.id} 
                  className={`rhythm-card cursor-pointer hover:shadow-elevated transition-all duration-300 ${
                    showSpecialCare ? 'ring-2 ring-primary/30' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-2xl ${program.color} flex items-center justify-center flex-shrink-0`}>
                        <program.icon className="w-7 h-7 text-foreground/80" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{program.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {program.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {program.duration}
                          </span>
                          <span>•</span>
                          <span>{program.sessions} sessions</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 p-5 rounded-2xl bg-muted/50 border border-border">
              <p className="text-sm text-muted-foreground text-center">
                These programs are designed with care. Always consult with your healthcare provider before starting any new exercise routine.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
