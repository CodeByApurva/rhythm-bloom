// Rule-based recommendation engine for Rhythm wellness app

export type MoodType = 'happy' | 'calm' | 'anxious' | 'tired' | 'stressed' | 'energetic' | 'sad';
export type EnergyLevel = 1 | 2 | 3 | 4 | 5;

export interface CheckInData {
  mood: MoodType;
  energyLevel: EnergyLevel;
  availableTime: number; // in minutes
  stressLevel?: number;
}

export interface Activity {
  id: string;
  name: string;
  type: 'workout' | 'calm' | 'stretch' | 'breathing';
  duration: number;
  description: string;
  intensity: 'low' | 'medium' | 'high';
  icon: string;
  benefits: string[];
}

export interface Recommendation {
  primary: Activity;
  alternatives: Activity[];
  message: string;
  affirmation: string;
}

const activities: Activity[] = [
  // High energy workouts
  {
    id: 'zumba',
    name: 'Zumba Dance',
    type: 'workout',
    duration: 30,
    description: 'Fun, energetic dance workout to uplifting music',
    intensity: 'high',
    icon: '💃',
    benefits: ['Cardio boost', 'Mood elevation', 'Full body workout'],
  },
  {
    id: 'pilates',
    name: 'Power Pilates',
    type: 'workout',
    duration: 45,
    description: 'Core-strengthening exercises for a toned body',
    intensity: 'medium',
    icon: '🧘‍♀️',
    benefits: ['Core strength', 'Flexibility', 'Posture improvement'],
  },
  {
    id: 'hiit-light',
    name: 'Feel-Good HIIT',
    type: 'workout',
    duration: 20,
    description: 'Short bursts of movement to energize your day',
    intensity: 'high',
    icon: '⚡',
    benefits: ['Energy boost', 'Metabolism', 'Quick results'],
  },
  // Low energy / calming
  {
    id: 'gentle-yoga',
    name: 'Gentle Yoga Flow',
    type: 'workout',
    duration: 30,
    description: 'Slow, nurturing movements to restore your energy',
    intensity: 'low',
    icon: '🌸',
    benefits: ['Relaxation', 'Flexibility', 'Mind-body connection'],
  },
  {
    id: 'restorative-yoga',
    name: 'Restorative Yoga',
    type: 'calm',
    duration: 45,
    description: 'Deep relaxation with supported poses',
    intensity: 'low',
    icon: '🌙',
    benefits: ['Deep rest', 'Stress relief', 'Nervous system reset'],
  },
  {
    id: 'morning-stretch',
    name: 'Morning Stretch',
    type: 'stretch',
    duration: 15,
    description: 'Wake up your body gently with easy stretches',
    intensity: 'low',
    icon: '🌅',
    benefits: ['Wake up gently', 'Reduce stiffness', 'Start fresh'],
  },
  {
    id: 'desk-stretch',
    name: 'Desk Relief Stretches',
    type: 'stretch',
    duration: 10,
    description: 'Quick stretches to release tension from sitting',
    intensity: 'low',
    icon: '💺',
    benefits: ['Tension release', 'Posture help', 'Quick break'],
  },
  // Calm tools
  {
    id: 'box-breathing',
    name: 'Box Breathing',
    type: 'breathing',
    duration: 5,
    description: 'Calming breath technique to center yourself',
    intensity: 'low',
    icon: '🌬️',
    benefits: ['Instant calm', 'Focus', 'Anxiety relief'],
  },
  {
    id: '478-breathing',
    name: '4-7-8 Sleep Breath',
    type: 'breathing',
    duration: 5,
    description: 'Relaxing technique perfect for winding down',
    intensity: 'low',
    icon: '😴',
    benefits: ['Better sleep', 'Deep relaxation', 'Stress release'],
  },
  {
    id: 'body-scan',
    name: 'Body Scan Meditation',
    type: 'calm',
    duration: 15,
    description: 'Mindful awareness journey through your body',
    intensity: 'low',
    icon: '✨',
    benefits: ['Body awareness', 'Tension release', 'Present moment'],
  },
  // Medium energy
  {
    id: 'barre',
    name: 'Barre Workout',
    type: 'workout',
    duration: 40,
    description: 'Ballet-inspired movements for grace and strength',
    intensity: 'medium',
    icon: '🩰',
    benefits: ['Lean muscles', 'Posture', 'Graceful movement'],
  },
  {
    id: 'walking-meditation',
    name: 'Mindful Walking',
    type: 'calm',
    duration: 20,
    description: 'Gentle movement combined with presence',
    intensity: 'low',
    icon: '🚶‍♀️',
    benefits: ['Gentle movement', 'Mindfulness', 'Fresh air'],
  },
];

const affirmations = [
  "You're doing amazing, and showing up for yourself matters.",
  "Every small step counts. Be proud of yourself today.",
  "Your wellness journey is unique and beautiful.",
  "Take what you need, leave what you don't. This is your time.",
  "You deserve this moment of care and attention.",
  "Progress, not perfection. You're exactly where you need to be.",
  "Listen to your body—it knows what it needs.",
  "You are worthy of rest, movement, and joy.",
  "Today is a fresh start. Be gentle with yourself.",
  "Your energy is precious. Spend it wisely on what nurtures you.",
];

export function getRecommendation(checkIn: CheckInData): Recommendation {
  const { mood, energyLevel, availableTime, stressLevel } = checkIn;
  
  let recommended: Activity[] = [];
  let message = '';

  // Low energy states
  if (energyLevel <= 2) {
    recommended = activities.filter(a => 
      a.intensity === 'low' && a.duration <= availableTime
    );
    message = "Let's go gentle today. Your body is asking for rest and restoration.";
  }
  // High stress or anxiety
  else if (mood === 'stressed' || mood === 'anxious' || (stressLevel && stressLevel >= 4)) {
    recommended = activities.filter(a => 
      (a.type === 'breathing' || a.type === 'calm' || a.intensity === 'low') && 
      a.duration <= availableTime
    );
    message = "I sense you need some calm. Let's focus on releasing that tension.";
  }
  // High energy and positive mood
  else if (energyLevel >= 4 && (mood === 'happy' || mood === 'energetic')) {
    recommended = activities.filter(a => 
      (a.intensity === 'high' || a.intensity === 'medium') && 
      a.duration <= availableTime
    );
    message = "You're feeling great! Let's channel that wonderful energy.";
  }
  // Sad mood
  else if (mood === 'sad') {
    recommended = activities.filter(a => 
      (a.type === 'calm' || a.intensity === 'low') && 
      a.duration <= availableTime
    );
    message = "I'm here for you. Let's do something nurturing together.";
  }
  // Tired but okay
  else if (mood === 'tired') {
    recommended = activities.filter(a => 
      a.intensity === 'low' && a.duration <= availableTime
    );
    message = "Rest is productive too. Let's restore your energy gently.";
  }
  // Default - moderate activity
  else {
    recommended = activities.filter(a => 
      (a.intensity === 'medium' || a.intensity === 'low') && 
      a.duration <= availableTime
    );
    message = "Let's find the perfect balance for you today.";
  }

  // Fallback if no activities match time constraint
  if (recommended.length === 0) {
    recommended = activities.filter(a => a.duration <= 15); // Quick activities
    message = "Even a few minutes makes a difference. Here's something quick and effective.";
  }

  // Still no match, provide breathing as minimum
  if (recommended.length === 0) {
    recommended = activities.filter(a => a.type === 'breathing');
  }

  const primary = recommended[0];
  const alternatives = recommended.slice(1, 4);

  return {
    primary,
    alternatives,
    message,
    affirmation: affirmations[Math.floor(Math.random() * affirmations.length)],
  };
}

export function getAllActivities(): Activity[] {
  return activities;
}

export function getActivityById(id: string): Activity | undefined {
  return activities.find(a => a.id === id);
}

export function getActivitiesByType(type: Activity['type']): Activity[] {
  return activities.filter(a => a.type === type);
}
