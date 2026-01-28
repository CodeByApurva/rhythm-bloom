import { Link, useLocation } from 'react-router-dom';
import { Home, Dumbbell, Heart, Calendar, Activity, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', path: '/home' },
  { icon: Dumbbell, label: 'Training', path: '/training' },
  { icon: Heart, label: 'Calm', path: '/calm' },
  { icon: Calendar, label: 'Studio', path: '/studio' },
  { icon: Activity, label: 'Tracker', path: '/tracker' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export function MobileNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border/50 safe-area-pb">
      <div className="flex items-center justify-around py-2 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-all duration-300",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className={cn(
                "p-2 rounded-xl transition-all duration-300",
                isActive && "bg-primary/10"
              )}>
                <item.icon className={cn(
                  "w-5 h-5 transition-all",
                  isActive && "fill-primary/20"
                )} />
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
