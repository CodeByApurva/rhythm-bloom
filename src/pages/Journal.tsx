import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Plus, BookOpen, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood: string;
  date: Date;
}

const prompts = [
  "What are you grateful for today?",
  "How are you really feeling right now?",
  "What's one small win from today?",
  "What do you need more of in your life?",
  "What would make today great?",
];

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [prompt] = useState(() => prompts[Math.floor(Math.random() * prompts.length)]);

  const handleSave = () => {
    if (!content.trim()) return;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      title: title || 'Untitled',
      content,
      mood: '🌸',
      date: new Date(),
    };

    setEntries([newEntry, ...entries]);
    setTitle('');
    setContent('');
    setIsWriting(false);
    toast.success('Entry saved! 📝');
  };

  if (isWriting) {
    return (
      <AppLayout>
        <div className="px-6 py-8">
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => setIsWriting(false)} className="text-muted-foreground">Cancel</button>
            <Button onClick={handleSave} className="rounded-xl rhythm-gradient-primary text-primary-foreground">Save</Button>
          </div>

          <div className="rhythm-card rhythm-gradient-calm mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Prompt</span>
            </div>
            <p className="text-foreground/80">{prompt}</p>
          </div>

          <Input
            placeholder="Title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-4 h-12 rounded-xl border-2"
          />

          <Textarea
            placeholder="Write your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[300px] rounded-xl border-2 resize-none"
            autoFocus
          />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-serif font-semibold">Journal</h1>
            <p className="text-muted-foreground">Your private space to reflect</p>
          </div>
          <Button onClick={() => setIsWriting(true)} className="rounded-full w-12 h-12 rhythm-gradient-primary text-primary-foreground">
            <Plus className="w-5 h-5" />
          </Button>
        </div>

{entries.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-accent-foreground" />
            </div>
            <h3 className="text-xl font-serif font-semibold mb-2">Start Journaling</h3>
            <p className="text-muted-foreground mb-6">Capture your thoughts, feelings, and moments</p>
            <Button onClick={() => setIsWriting(true)} className="rounded-xl rhythm-gradient-primary text-primary-foreground">
              Write First Entry
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => (
              <div key={entry.id} className="rhythm-card">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{entry.title}</h3>
                  <span className="text-xs text-muted-foreground">
                    {entry.date.toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">{entry.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
