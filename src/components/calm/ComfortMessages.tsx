import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, RefreshCw } from 'lucide-react';

const messages = [
  {
    text: "You're doing better than you think. Every small step matters.",
    emoji: '🌸',
  },
  {
    text: "It's okay to rest. Your worth isn't measured by your productivity.",
    emoji: '🌙',
  },
  {
    text: "This feeling is temporary. You've gotten through difficult times before.",
    emoji: '🌈',
  },
  {
    text: "Be gentle with yourself today. You deserve the same kindness you give others.",
    emoji: '💝',
  },
  {
    text: "You don't have to have it all figured out. One moment at a time.",
    emoji: '🦋',
  },
  {
    text: "Your feelings are valid. It's okay to not be okay sometimes.",
    emoji: '🌷',
  },
  {
    text: "Remember to breathe. You are safe in this moment.",
    emoji: '🍃',
  },
  {
    text: "You are worthy of love and belonging, exactly as you are.",
    emoji: '✨',
  },
  {
    text: "Progress isn't always visible. Trust the journey you're on.",
    emoji: '🌻',
  },
  {
    text: "Take what you need today. Leave the rest for tomorrow.",
    emoji: '🕊️',
  },
  {
    text: "Your best is enough. It always has been.",
    emoji: '💫',
  },
  {
    text: "You're allowed to take up space. Your presence matters.",
    emoji: '🌺',
  },
];

export function ComfortMessages() {
  const [currentMessage, setCurrentMessage] = useState(() => 
    messages[Math.floor(Math.random() * messages.length)]
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const getNewMessage = () => {
    setIsAnimating(true);
    setTimeout(() => {
      let newMessage = messages[Math.floor(Math.random() * messages.length)];
      while (newMessage.text === currentMessage.text) {
        newMessage = messages[Math.floor(Math.random() * messages.length)];
      }
      setCurrentMessage(newMessage);
      setIsAnimating(false);
    }, 300);
  };

  const toggleFavorite = () => {
    if (favorites.includes(currentMessage.text)) {
      setFavorites(favorites.filter(f => f !== currentMessage.text));
    } else {
      setFavorites([...favorites, currentMessage.text]);
    }
  };

  const isFavorite = favorites.includes(currentMessage.text);

  return (
    <div className="p-6 flex flex-col items-center">
      {/* Message Card */}
      <div 
        className={`rhythm-card-elevated rhythm-gradient-calm w-full text-center py-12 px-6 mb-6 transition-all duration-300 ${
          isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        <span className="text-5xl block mb-6">{currentMessage.emoji}</span>
        <p className="text-xl font-medium text-foreground leading-relaxed">
          "{currentMessage.text}"
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Button
          onClick={toggleFavorite}
          variant="outline"
          size="lg"
          className={`rounded-full px-6 ${
            isFavorite ? 'bg-primary/10 border-primary text-primary' : ''
          }`}
        >
          <Heart className={`w-5 h-5 mr-2 ${isFavorite ? 'fill-primary' : ''}`} />
          {isFavorite ? 'Saved' : 'Save'}
        </Button>

        <Button
          onClick={getNewMessage}
          size="lg"
          className="rounded-full px-6 rhythm-gradient-primary text-primary-foreground"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          New Message
        </Button>
      </div>

      {/* Saved Messages */}
      {favorites.length > 0 && (
        <div className="mt-8 w-full">
          <h4 className="text-sm font-medium text-muted-foreground mb-3">
            Saved Messages ({favorites.length})
          </h4>
          <div className="space-y-2">
            {favorites.map((text, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-3 text-sm text-foreground/80 border border-border"
              >
                "{text}"
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
