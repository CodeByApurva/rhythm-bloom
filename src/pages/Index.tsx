import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronRight, Sparkles, Heart, Activity } from 'lucide-react';
import logo from '@/assets/Logo1.png'; // ✅ YOUR NEW LOGO FILE

export default function Index() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/home');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 rounded-full rhythm-gradient-primary rhythm-breathing" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">

        {/* 🌿 LOGO SECTION */}
        <div className="relative mb-8 rhythm-float flex justify-center animate-fade-in">
          <div className="absolute w-44 h-44 bg-primary/20 rounded-full blur-2xl" />
          <img
            src={logo}
            alt="Rhythm Logo"
            className="relative w-40 md:w-48 object-contain drop-shadow-lg"
          />
        </div>

        {/* Tagline */}
        <p className="text-xl text-muted-foreground text-center mb-2 animate-fade-in-delay-1">
          Your health, our goal
        </p>
        <p className="text-sm text-muted-foreground text-center max-w-xs animate-fade-in-delay-2">
          A gentle wellness journey designed for you
        </p>

        {/* Feature Highlights */}
        <div className="flex flex-wrap justify-center gap-3 mt-8 mb-12 animate-fade-in-delay-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-rhythm-sage-light text-foreground">
            <Sparkles className="w-4 h-4 text-rhythm-sage-dark" />
            <span className="text-sm font-medium">Mindful Workouts</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-rhythm-eucalyptus-light text-foreground">
            <Heart className="w-4 h-4 text-rhythm-eucalyptus" />
            <span className="text-sm font-medium">Calm Tools</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground">
            <Activity className="w-4 h-4" />
            <span className="text-sm font-medium">Health Tracking</span>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 pb-12 space-y-4">
        <Button
          onClick={() => navigate('/welcome')}
          className="w-full h-14 text-lg rounded-2xl rhythm-gradient-primary border-0 text-primary-foreground font-semibold shadow-soft"
        >
          Get Started
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>

        <Button
          variant="ghost"
          onClick={() => navigate('/auth')}
          className="w-full h-12 text-base rounded-xl text-muted-foreground hover:text-foreground"
        >
          Already have an account? Sign in
        </Button>
      </div>

      {/* Background Glow Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none opacity-30">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-accent/30 blur-3xl" />
      </div>
    </div>
  );
}
