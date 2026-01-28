-- Add new fields to profiles table for goals and preferences
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS purpose TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS workout_preference TEXT[] DEFAULT '{}';

-- Create tracker tables
CREATE TABLE public.step_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  steps INTEGER NOT NULL DEFAULT 0,
  is_manual BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.sleep_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  hours DECIMAL(4,2) NOT NULL,
  quality TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.menstrual_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  date DATE NOT NULL,
  flow_intensity TEXT,
  symptoms TEXT[],
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.calorie_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  calories_burned INTEGER NOT NULL DEFAULT 0,
  activity_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.custom_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  record_type TEXT NOT NULL,
  value TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.step_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sleep_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menstrual_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calorie_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_records ENABLE ROW LEVEL SECURITY;

-- RLS policies for step_logs
CREATE POLICY "Users can view their own step logs" ON public.step_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own step logs" ON public.step_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own step logs" ON public.step_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own step logs" ON public.step_logs FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for sleep_logs
CREATE POLICY "Users can view their own sleep logs" ON public.sleep_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own sleep logs" ON public.sleep_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own sleep logs" ON public.sleep_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own sleep logs" ON public.sleep_logs FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for menstrual_logs
CREATE POLICY "Users can view their own menstrual logs" ON public.menstrual_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own menstrual logs" ON public.menstrual_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own menstrual logs" ON public.menstrual_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own menstrual logs" ON public.menstrual_logs FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for calorie_logs
CREATE POLICY "Users can view their own calorie logs" ON public.calorie_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own calorie logs" ON public.calorie_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own calorie logs" ON public.calorie_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own calorie logs" ON public.calorie_logs FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for custom_records
CREATE POLICY "Users can view their own custom records" ON public.custom_records FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own custom records" ON public.custom_records FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own custom records" ON public.custom_records FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own custom records" ON public.custom_records FOR DELETE USING (auth.uid() = user_id);