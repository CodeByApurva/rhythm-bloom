import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  Footprints, 
  Flame, 
  Moon, 
  Heart,
  Plus,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { format } from 'date-fns';

interface TrackerData {
  steps: number;
  calories: number;
  sleep: number;
  lastPeriod: string;
}

export default function Tracker() {
  const { user } = useAuth();
  const [data, setData] = useState<TrackerData>({
    steps: 0,
    calories: 0,
    sleep: 0,
    lastPeriod: '',
  });
  const [isLogging, setIsLogging] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (user) {
      fetchTodayData();
    }
  }, [user]);

  const fetchTodayData = async () => {
    if (!user) return;
    const today = format(new Date(), 'yyyy-MM-dd');

    // Fetch steps
    const { data: stepsData } = await supabase
      .from('step_logs')
      .select('steps')
      .eq('user_id', user.id)
      .eq('date', today)
      .maybeSingle();

    // Fetch calories
    const { data: caloriesData } = await supabase
      .from('calorie_logs')
      .select('calories_burned')
      .eq('user_id', user.id)
      .eq('date', today)
      .maybeSingle();

    // Fetch sleep
    const { data: sleepData } = await supabase
      .from('sleep_logs')
      .select('hours')
      .eq('user_id', user.id)
      .eq('date', today)
      .maybeSingle();

    // Fetch last period
    const { data: periodData } = await supabase
      .from('menstrual_logs')
      .select('date')
      .eq('user_id', user.id)
      .order('date', { ascending: false })
      .limit(1)
      .maybeSingle();

    setData({
      steps: stepsData?.steps || 0,
      calories: caloriesData?.calories_burned || 0,
      sleep: sleepData?.hours || 0,
      lastPeriod: periodData?.date || '',
    });
  };

  const handleLogSteps = async () => {
    if (!user || !inputValue) return;
    const today = format(new Date(), 'yyyy-MM-dd');
    
    const { error } = await supabase
      .from('step_logs')
      .upsert({
        user_id: user.id,
        date: today,
        steps: parseInt(inputValue),
        is_manual: true,
      });

    if (error) {
      toast.error('Failed to log steps');
    } else {
      toast.success('Steps logged!');
      setData(prev => ({ ...prev, steps: parseInt(inputValue) }));
    }
    setIsLogging(null);
    setInputValue('');
  };

  const handleLogCalories = async () => {
    if (!user || !inputValue) return;
    const today = format(new Date(), 'yyyy-MM-dd');
    
    const { error } = await supabase
      .from('calorie_logs')
      .upsert({
        user_id: user.id,
        date: today,
        calories_burned: parseInt(inputValue),
      });

    if (error) {
      toast.error('Failed to log calories');
    } else {
      toast.success('Calories logged!');
      setData(prev => ({ ...prev, calories: parseInt(inputValue) }));
    }
    setIsLogging(null);
    setInputValue('');
  };

  const handleLogSleep = async () => {
    if (!user || !inputValue) return;
    const today = format(new Date(), 'yyyy-MM-dd');
    
    const { error } = await supabase
      .from('sleep_logs')
      .upsert({
        user_id: user.id,
        date: today,
        hours: parseFloat(inputValue),
      });

    if (error) {
      toast.error('Failed to log sleep');
    } else {
      toast.success('Sleep logged!');
      setData(prev => ({ ...prev, sleep: parseFloat(inputValue) }));
    }
    setIsLogging(null);
    setInputValue('');
  };

  const handleLogPeriod = async () => {
    if (!user || !inputValue) return;
    
    const { error } = await supabase
      .from('menstrual_logs')
      .insert({
        user_id: user.id,
        date: inputValue,
      });

    if (error) {
      toast.error('Failed to log period');
    } else {
      toast.success('Period logged!');
      setData(prev => ({ ...prev, lastPeriod: inputValue }));
    }
    setIsLogging(null);
    setInputValue('');
  };

  const trackerCards = [
    {
      id: 'steps',
      title: 'Steps',
      value: data.steps.toLocaleString(),
      unit: 'steps',
      icon: Footprints,
      color: 'bg-rhythm-sage-light',
      iconColor: 'text-rhythm-sage-dark',
      goal: 10000,
    },
    {
      id: 'calories',
      title: 'Calories Burned',
      value: data.calories.toLocaleString(),
      unit: 'kcal',
      icon: Flame,
      color: 'bg-rhythm-eucalyptus-light',
      iconColor: 'text-rhythm-eucalyptus',
      goal: 500,
    },
    {
      id: 'sleep',
      title: 'Sleep',
      value: data.sleep.toFixed(1),
      unit: 'hours',
      icon: Moon,
      color: 'bg-accent',
      iconColor: 'text-accent-foreground',
      goal: 8,
    },
    {
      id: 'period',
      title: 'Cycle Tracker',
      value: data.lastPeriod ? format(new Date(data.lastPeriod), 'MMM d') : 'Not logged',
      unit: 'last period',
      icon: Heart,
      color: 'bg-secondary',
      iconColor: 'text-secondary-foreground',
    },
  ];

  return (
    <AppLayout>
      <div className="px-6 py-8 space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
            Tracker
          </h1>
          <p className="text-muted-foreground">
            Monitor your daily wellness metrics
          </p>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 text-muted-foreground animate-fade-in-delay-1">
          <Calendar className="w-4 h-4" />
          <span className="text-sm font-medium">{format(new Date(), 'EEEE, MMMM d')}</span>
        </div>

        {/* Tracker Cards */}
        <div className="grid grid-cols-2 gap-4 animate-fade-in-delay-2">
          {trackerCards.map((card) => (
            <Card 
              key={card.id} 
              className="rhythm-card cursor-pointer hover:shadow-elevated transition-all"
              onClick={() => setIsLogging(card.id)}
            >
              <CardContent className="p-4">
                <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center mb-3`}>
                  <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>
                <p className="text-sm text-muted-foreground mb-1">{card.title}</p>
                <p className="text-2xl font-bold text-foreground">{card.value}</p>
                <p className="text-xs text-muted-foreground">{card.unit}</p>
                {card.goal && (
                  <div className="mt-2">
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ 
                          width: `${Math.min((Number(card.value.replace(',', '')) / card.goal) * 100, 100)}%` 
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Goal: {card.goal.toLocaleString()}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Custom Records */}
        <Card className="rhythm-card animate-fade-in-delay-3">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-serif flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Custom Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Track anything that matters to you - water intake, mood notes, or custom metrics.
            </p>
            <Button 
              variant="outline" 
              className="w-full rounded-xl border-dashed"
              onClick={() => setIsLogging('custom')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Custom Record
            </Button>
          </CardContent>
        </Card>

        {/* Logging Modal */}
        {isLogging && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end justify-center">
            <div className="w-full max-w-md bg-card rounded-t-3xl p-6 animate-slide-up">
              <h3 className="text-xl font-serif font-semibold mb-4">
                {isLogging === 'steps' && 'Log Steps'}
                {isLogging === 'calories' && 'Log Calories Burned'}
                {isLogging === 'sleep' && 'Log Sleep Hours'}
                {isLogging === 'period' && 'Log Period Start'}
                {isLogging === 'custom' && 'Add Custom Record'}
              </h3>

              <div className="space-y-4">
                {isLogging === 'period' ? (
                  <div className="space-y-2">
                    <Label>Period Start Date</Label>
                    <Input
                      type="date"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="h-12 rounded-xl"
                    />
                  </div>
                ) : isLogging === 'custom' ? (
                  <>
                    <div className="space-y-2">
                      <Label>Record Type</Label>
                      <Input
                        placeholder="e.g., Water intake, Mood"
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Value</Label>
                      <Input
                        placeholder="Enter value"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="h-12 rounded-xl"
                      />
                    </div>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Label>
                      {isLogging === 'steps' && 'Number of steps'}
                      {isLogging === 'calories' && 'Calories burned'}
                      {isLogging === 'sleep' && 'Hours slept'}
                    </Label>
                    <Input
                      type="number"
                      placeholder={
                        isLogging === 'steps' ? 'e.g., 5000' :
                        isLogging === 'calories' ? 'e.g., 300' :
                        'e.g., 7.5'
                      }
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="h-12 rounded-xl"
                    />
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    className="flex-1 h-12 rounded-xl"
                    onClick={() => {
                      setIsLogging(null);
                      setInputValue('');
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 h-12 rounded-xl rhythm-gradient-primary border-0"
                    onClick={() => {
                      if (isLogging === 'steps') handleLogSteps();
                      else if (isLogging === 'calories') handleLogCalories();
                      else if (isLogging === 'sleep') handleLogSleep();
                      else if (isLogging === 'period') handleLogPeriod();
                      else {
                        toast.success('Record saved!');
                        setIsLogging(null);
                        setInputValue('');
                      }
                    }}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
