import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  Calendar,
  Clock,
  User,
  Star,
  Crown,
  Check,
  Heart
} from 'lucide-react';
import { format, addDays, isSameDay } from 'date-fns';

const classTypes = [
  { id: 'yoga', name: 'Yoga', icon: '🧘‍♀️' },
  { id: 'pilates', name: 'Pilates', icon: '💪' },
  { id: 'zumba', name: 'Zumba', icon: '💃' },
  { id: 'meditation', name: 'Meditation', icon: '🧘' },
  { id: 'strength', name: 'Strength', icon: '🏋️‍♀️' },
];

const upcomingClasses = [
  {
    id: 1,
    name: 'Morning Yoga Flow',
    type: 'yoga',
    instructor: 'Sarah Chen',
    time: '7:00 AM',
    duration: 60,
    spots: 5,
    date: new Date(),
  },
  {
    id: 2,
    name: 'Power Pilates',
    type: 'pilates',
    instructor: 'Emma Wilson',
    time: '10:00 AM',
    duration: 45,
    spots: 3,
    date: new Date(),
  },
  {
    id: 3,
    name: 'Zumba Party',
    type: 'zumba',
    instructor: 'Maria Garcia',
    time: '5:00 PM',
    duration: 60,
    spots: 8,
    date: addDays(new Date(), 1),
  },
  {
    id: 4,
    name: 'Evening Meditation',
    type: 'meditation',
    instructor: 'David Kim',
    time: '7:00 PM',
    duration: 30,
    spots: 12,
    date: addDays(new Date(), 1),
  },
];

const experts = [
  {
    id: 1,
    name: 'Dr. Sarah Chen',
    role: 'Yoga & Wellness Expert',
    specialty: 'Yoga, Mindfulness',
    rating: 4.9,
    sessions: 234,
    avatar: 'SC',
  },
  {
    id: 2,
    name: 'Emma Wilson',
    role: 'Certified Nutritionist',
    specialty: 'Diet Plans, Weight Management',
    rating: 4.8,
    sessions: 156,
    avatar: 'EW',
  },
  {
    id: 3,
    name: 'Maria Garcia',
    role: 'Fitness Trainer',
    specialty: 'Zumba, HIIT, Strength',
    rating: 4.9,
    sessions: 312,
    avatar: 'MG',
  },
];

const membershipPlans = [
  {
    id: 'basic',
    name: 'Basic Subscription',
    price: '₹799',
    period: '/month',
    features: ['Gym & Cardio', 'Access to basic sessions', 'Community support'],
    popular: false,
  },
  {
    id: 'yoga',
    name: 'Yoga',
    price: '₹1,299',
    period: '/month',
    features: ['Yoga', 'Expert consultations', 'Personalized plans', 'Priority booking'],
    popular: true,
  },
  {
    id: 'zumba',
    name: 'Zumba',
    price: '₹1,499',
    period: '/month',
    features: ['Zumba', 'Expert consultations', 'Personalized plans', 'Priority booking'],
    popular: true,
  },
  {
    id: 'calisthenics',
    name: 'Calisthenics',
    price: '₹2,999',
    period: '/month',
    features: ['Calisthenics', 'Expert consultations', 'Personalized plans', 'Priority booking'],
    popular: true,
  },
  {
    id: 'pilates',
    name: 'Pilates',
    price: '₹3,400',
    period: '/year',
    features: ['Pilates', 'Expert consultations', 'Personalized plans', 'Priority booking'],
    popular: false,
  },
];

export default function Studio() {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  interface Booking {
    class_name: string;
    scheduled_at: string;
  }
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState('classes');

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('studio_bookings')
      .select('*')
      .eq('user_id', user.id)
      .order('scheduled_at', { ascending: true });

    if (data) {
      setBookings(data);
    }
  };

  const handleBookClass = async (classItem: typeof upcomingClasses[0]) => {
    if (!user) {
      toast.error('Please sign in to book a class');
      return;
    }

    const scheduledAt = new Date(classItem.date);
    const [hours, minutes] = classItem.time.split(':');
    const isPM = classItem.time.includes('PM');
    scheduledAt.setHours(
      parseInt(hours) + (isPM && hours !== '12' ? 12 : 0),
      parseInt(minutes) || 0
    );

    const { error } = await supabase.from('studio_bookings').insert({
      user_id: user.id,
      class_name: classItem.name,
      class_type: classItem.type,
      instructor: classItem.instructor,
      scheduled_at: scheduledAt.toISOString(),
      duration: classItem.duration,
    });

    if (error) {
      toast.error('Failed to book class');
    } else {
      toast.success(`Booked ${classItem.name}!`);
      fetchBookings();
    }
  };

  const filteredClasses = upcomingClasses.filter(c =>
    isSameDay(c.date, selectedDate)
  );

  const dates = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

  return (
    <AppLayout>
      <div className="px-6 py-8 space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
            Studio
          </h1>
          <p className="text-muted-foreground">
            Book classes and connect with experts
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-fade-in-delay-1">
          <TabsList className="w-full grid grid-cols-3 h-12 rounded-2xl bg-muted p-1">
            <TabsTrigger
              value="classes"
              className="rounded-xl font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm text-xs"
            >
              <Calendar className="w-4 h-4 mr-1" />
              Classes
            </TabsTrigger>
            <TabsTrigger
              value="membership"
              className="rounded-xl font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm text-xs"
            >
              <Crown className="w-4 h-4 mr-1" />
              Plans
            </TabsTrigger>
            <TabsTrigger
              value="experts"
              className="rounded-xl font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm text-xs"
            >
              <User className="w-4 h-4 mr-1" />
              Experts
            </TabsTrigger>
          </TabsList>

          {/* Classes Tab */}
          <TabsContent value="classes" className="mt-6 space-y-6">
            {/* Date Selector */}
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
              {dates.map((date) => (
                <button
                  key={date.toISOString()}
                  onClick={() => setSelectedDate(date)}
                  className={`flex-shrink-0 flex flex-col items-center p-3 rounded-2xl transition-all ${isSameDay(date, selectedDate)
                      ? 'bg-primary text-primary-foreground shadow-soft'
                      : 'bg-card border border-border hover:border-primary/50'
                    }`}
                >
                  <span className="text-xs font-medium uppercase">
                    {format(date, 'EEE')}
                  </span>
                  <span className="text-lg font-bold">{format(date, 'd')}</span>
                </button>
              ))}
            </div>

            {/* Class Types Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {classTypes.map((type) => (
                <Badge
                  key={type.id}
                  variant="secondary"
                  className="rounded-full px-3 py-1.5 cursor-pointer hover:bg-primary/20"
                >
                  {type.icon} {type.name}
                </Badge>
              ))}
            </div>

            {/* Classes List */}
            <div className="space-y-4">
              {filteredClasses.length > 0 ? (
                filteredClasses.map((classItem) => {
                  const isBooked = bookings.some(
                    b => b.class_name === classItem.name &&
                      isSameDay(new Date(b.scheduled_at), classItem.date)
                  );

                  return (
                    <Card key={classItem.id} className="rhythm-card">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="secondary" className="rounded-full text-xs">
                                {classTypes.find(t => t.id === classItem.type)?.icon}
                              </Badge>
                              <h4 className="font-semibold text-foreground">{classItem.name}</h4>
                            </div>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <User className="w-3.5 h-3.5" />
                                {classItem.instructor}
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5" />
                                  {classItem.time}
                                </span>
                                <span>{classItem.duration} min</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground mb-2">
                              {classItem.spots} spots left
                            </p>
                            <Button
                              size="sm"
                              className={`rounded-xl ${isBooked
                                  ? 'bg-secondary text-secondary-foreground'
                                  : 'rhythm-gradient-primary border-0 text-primary-foreground'
                                }`}
                              disabled={isBooked}
                              onClick={() => handleBookClass(classItem)}
                            >
                              {isBooked ? (
                                <>
                                  <Check className="w-4 h-4 mr-1" />
                                  Booked
                                </>
                              ) : (
                                'Book'
                              )}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
                  <p className="text-muted-foreground">No classes on this day</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Membership Tab */}
          <TabsContent value="membership" className="mt-6 space-y-4">
            {membershipPlans.map((plan) => (
              <Card
                key={plan.id}
                className={`rhythm-card ${plan.popular ? 'ring-2 ring-primary' : ''}`}
              >
                <CardContent className="p-5">
                  {plan.popular && (
                    <Badge className="mb-3 bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  )}
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{plan.name}</h3>
                  <ul className="space-y-2 mb-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full rounded-xl ${plan.popular
                        ? 'rhythm-gradient-primary border-0 text-primary-foreground'
                        : ''
                      }`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    Choose Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Experts Tab */}
          <TabsContent value="experts" className="mt-6 space-y-4">
            {experts.map((expert) => (
              <Card key={expert.id} className="rhythm-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-lg">
                      {expert.avatar}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{expert.name}</h4>
                      <p className="text-sm text-muted-foreground">{expert.role}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-xs">
                          <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                          {expert.rating}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {expert.sessions} sessions
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-xl">
                      Book
                    </Button>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">Specialty:</span> {expert.specialty}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="rhythm-card">
              <CardContent className="p-5 text-center">
                <Heart className="w-10 h-10 mx-auto mb-3 text-primary/50" />
                <h4 className="font-medium text-foreground mb-1">Need Personalized Help?</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Get matched with the perfect expert for your wellness goals
                </p>
                <Button className="rounded-xl rhythm-gradient-primary border-0 text-primary-foreground">
                  Get Matched
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
