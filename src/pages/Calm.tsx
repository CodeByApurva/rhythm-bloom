import { useState, useRef } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BreathingTimer } from '@/components/calm/BreathingTimer';
import { StretchGuide } from '@/components/calm/StretchGuide';
import { ComfortMessages } from '@/components/calm/ComfortMessages';
import { 
  Sparkles, 
  Music2, 
  BookOpen, 
  Palette, 
  Heart,
  Play,
  Pause,
  HelpCircle,
  Brush
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const meditationSessions = [
  { id: 1, name: 'Morning Calm', duration: '10 min', description: 'Start your day with peace' },
  { id: 2, name: 'Stress Relief', duration: '15 min', description: 'Release tension and worry' },
  { id: 3, name: 'Sleep Better', duration: '20 min', description: 'Prepare for restful sleep' },
  { id: 4, name: 'Focus & Clarity', duration: '10 min', description: 'Sharpen your mind' },
];

const musicTracks = [
  { id: 1, name: 'Forest Rain', duration: '30 min', category: 'Nature' },
  { id: 2, name: 'Ocean Waves', duration: '45 min', category: 'Nature' },
  { id: 3, name: 'Piano Dreams', duration: '25 min', category: 'Instrumental' },
  { id: 4, name: 'Tibetan Bowls', duration: '20 min', category: 'Meditation' },
];

export default function Calm() {
  const [activeTab, setActiveTab] = useState('meditation');
  const [playingTrack, setPlayingTrack] = useState<number | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  const handleDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.strokeStyle = 'hsl(145 25% 55%)';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  return (
    <AppLayout>
      <div className="px-6 py-8 space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
            Calm Space
          </h1>
          <p className="text-muted-foreground">
            Find your peace and quiet
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-fade-in-delay-1">
          <TabsList className="w-full grid grid-cols-3 h-12 rounded-2xl bg-muted p-1">
            <TabsTrigger 
              value="meditation" 
              className="rounded-xl font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm text-xs"
            >
              <Sparkles className="w-4 h-4 mr-1" />
              Meditate
            </TabsTrigger>
            <TabsTrigger 
              value="music" 
              className="rounded-xl font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm text-xs"
            >
              <Music2 className="w-4 h-4 mr-1" />
              Music
            </TabsTrigger>
            <TabsTrigger 
              value="journal" 
              className="rounded-xl font-medium data-[state=active]:bg-card data-[state=active]:shadow-sm text-xs"
            >
              <BookOpen className="w-4 h-4 mr-1" />
              Journal
            </TabsTrigger>
          </TabsList>

          {/* Meditation Tab */}
          <TabsContent value="meditation" className="mt-6 space-y-6">
            <BreathingTimer />
            
            <div className="space-y-3">
              <h3 className="text-lg font-serif font-semibold text-foreground">
                Guided Sessions
              </h3>
              {meditationSessions.map((session) => (
                <Card key={session.id} className="rhythm-card cursor-pointer hover:shadow-elevated transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">{session.name}</h4>
                        <p className="text-sm text-muted-foreground">{session.description}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground">{session.duration}</span>
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <Play className="w-4 h-4 text-primary ml-0.5" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Music Tab */}
          <TabsContent value="music" className="mt-6 space-y-4">
            <div className="p-4 rounded-2xl rhythm-gradient-calm text-center">
              <Music2 className="w-10 h-10 mx-auto mb-2 text-foreground/60" />
              <p className="text-sm text-foreground/70">Now Playing</p>
              <p className="font-semibold text-foreground">
                {playingTrack ? musicTracks.find(t => t.id === playingTrack)?.name : 'Select a track'}
              </p>
            </div>

            <div className="space-y-3">
              {musicTracks.map((track) => (
                <Card 
                  key={track.id} 
                  className={`rhythm-card cursor-pointer hover:shadow-elevated transition-all ${
                    playingTrack === track.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setPlayingTrack(playingTrack === track.id ? null : track.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">{track.name}</h4>
                        <p className="text-sm text-muted-foreground">{track.category} • {track.duration}</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        {playingTrack === track.id ? (
                          <Pause className="w-4 h-4 text-primary" />
                        ) : (
                          <Play className="w-4 h-4 text-primary ml-0.5" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Journal Tab */}
          <TabsContent value="journal" className="mt-6 space-y-4">
            <Button 
              className="w-full h-12 rounded-xl rhythm-gradient-primary border-0 text-primary-foreground font-medium"
              onClick={() => navigate('/journal')}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Open Full Journal
            </Button>

            <ComfortMessages />
          </TabsContent>
        </Tabs>

        {/* Other Tools Section */}
        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-serif font-semibold text-foreground">
            Other Tools
          </h3>

          {/* Doodling Canvas */}
          <Card className="rhythm-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                Doodle Pad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative rounded-xl overflow-hidden bg-muted/30 border border-border">
                <canvas
                  ref={canvasRef}
                  width={300}
                  height={200}
                  className="w-full cursor-crosshair touch-none"
                  onMouseDown={startDrawing}
                  onMouseMove={handleDraw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                />
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2 rounded-lg"
                onClick={clearCanvas}
              >
                <Brush className="w-4 h-4 mr-1" />
                Clear
              </Button>
            </CardContent>
          </Card>

          {/* Other Hobbies Placeholder */}
          <Card className="rhythm-card">
            <CardContent className="p-5 text-center">
              <Heart className="w-10 h-10 mx-auto mb-3 text-primary/50" />
              <h4 className="font-medium text-foreground mb-1">More Hobbies Coming Soon</h4>
              <p className="text-sm text-muted-foreground">
                Explore crafts, reading lists, and creative activities
              </p>
            </CardContent>
          </Card>

          <StretchGuide />
        </div>

        {/* Floating Help Button */}
        <button 
          className="fixed bottom-24 right-6 w-14 h-14 rounded-full rhythm-gradient-primary shadow-elevated flex items-center justify-center z-40 hover:scale-105 transition-transform"
          onClick={() => navigate('/chat')}
        >
          <HelpCircle className="w-6 h-6 text-primary-foreground" />
        </button>
      </div>
    </AppLayout>
  );
}
