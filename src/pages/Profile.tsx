import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  User, 
  Mail, 
  Phone, 
  Globe, 
  TrendingUp,
  Calendar,
  Users,
  Info,
  FileText,
  Shield,
  MessageCircle,
  Bell,
  Moon,
  ChevronRight,
  LogOut
} from 'lucide-react';

interface ProfileData {
  name: string;
  age_range: string;
  phone: string;
}

export default function Profile() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [gentleMode, setGentleMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('profiles')
      .select('name, age_range, phone')
      .eq('user_id', user.id)
      .maybeSingle();
    
    if (data) {
      setProfile(data);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const accountItems = [
    { icon: Mail, label: 'Email', value: user?.email || 'Not set' },
    { icon: Phone, label: 'Phone', value: profile?.phone || 'Not set' },
    { icon: Globe, label: 'Language', value: 'English' },
  ];

  const wellnessItems = [
    { icon: TrendingUp, label: 'Progress Report', description: 'View workout & mood trends' },
    { icon: Calendar, label: 'Studio Membership', description: 'Manage your subscription' },
    { icon: Users, label: 'Your Experts', description: 'Trainers & nutritionists' },
  ];

  const appInfoItems = [
    { icon: Info, label: 'Features', description: 'Explore app capabilities' },
    { icon: FileText, label: 'Terms of Service', description: 'Read our terms' },
    { icon: Shield, label: 'Privacy Policy', description: 'Your data protection' },
    { icon: MessageCircle, label: 'Contact Us', description: 'Get in touch' },
  ];

  return (
    <AppLayout>
      <div className="px-6 py-8 space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
            My Profile
          </h1>
        </div>

        {/* User Card */}
        <Card className="rhythm-card animate-fade-in-delay-1">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 bg-primary/20">
                <AvatarFallback className="text-primary text-xl font-semibold">
                  {profile?.name?.charAt(0) || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  {profile?.name || 'User'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {profile?.age_range ? `Age: ${profile.age_range}` : 'Welcome to Rhythm'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Section */}
        <div className="space-y-3 animate-fade-in-delay-2">
          <h3 className="text-lg font-serif font-semibold text-foreground flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Account
          </h3>
          <Card className="rhythm-card">
            <CardContent className="p-0 divide-y divide-border">
              {accountItems.map((item) => (
                <div key={item.label} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium text-foreground">{item.label}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Wellness Section */}
        <div className="space-y-3 animate-fade-in-delay-3">
          <h3 className="text-lg font-serif font-semibold text-foreground flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Wellness
          </h3>
          <Card className="rhythm-card">
            <CardContent className="p-0 divide-y divide-border">
              {wellnessItems.map((item) => (
                <div 
                  key={item.label} 
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <span className="font-medium text-foreground block">{item.label}</span>
                      <span className="text-xs text-muted-foreground">{item.description}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* App Info Section */}
        <div className="space-y-3">
          <h3 className="text-lg font-serif font-semibold text-foreground flex items-center gap-2">
            <Info className="w-5 h-5 text-primary" />
            App Info
          </h3>
          <Card className="rhythm-card">
            <CardContent className="p-0 divide-y divide-border">
              {appInfoItems.map((item) => (
                <div 
                  key={item.label} 
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <span className="font-medium text-foreground block">{item.label}</span>
                      <span className="text-xs text-muted-foreground">{item.description}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Settings Section */}
        <div className="space-y-3">
          <h3 className="text-lg font-serif font-semibold text-foreground flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Settings
          </h3>
          <Card className="rhythm-card">
            <CardContent className="p-0 divide-y divide-border">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium text-foreground">Notifications</span>
                </div>
                <Switch 
                  checked={notifications} 
                  onCheckedChange={setNotifications}
                />
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <Moon className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <span className="font-medium text-foreground block">Gentle Mode</span>
                    <span className="text-xs text-muted-foreground">Softer animations & sounds</span>
                  </div>
                </div>
                <Switch 
                  checked={gentleMode} 
                  onCheckedChange={setGentleMode}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sign Out */}
        <Button
          variant="outline"
          className="w-full h-12 rounded-xl border-destructive/30 text-destructive hover:bg-destructive/10"
          onClick={handleSignOut}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>

        <p className="text-center text-xs text-muted-foreground pb-4">
          Rhythm v1.0.0
        </p>
      </div>
    </AppLayout>
  );
}
