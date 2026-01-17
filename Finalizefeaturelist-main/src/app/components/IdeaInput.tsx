import { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Textarea } from '@/app/components/ui/textarea';

interface IdeaInputProps {
  onSubmit: (idea: string) => void;
}

export function IdeaInput({ onSubmit }: IdeaInputProps) {
  const [idea, setIdea] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim()) {
      onSubmit(idea);
    }
  };

  const exampleIdeas = [
    "A recipe sharing platform where users can upload, search, and rate recipes",
    "A productivity timer app with Pomodoro technique and task tracking",
    "A portfolio website generator for freelancers and creatives"
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-6">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Agentic AI Product Builder
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your idea into a live web application in minutes. Our AI handles everything from code generation to deployment.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <label htmlFor="idea-input" className="block text-lg mb-3 text-gray-900">
            Describe your app idea
          </label>
          <Textarea
            id="idea-input"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Example: A task management app with calendar integration and team collaboration features..."
            className="min-h-[160px] text-base resize-none"
          />
          
          <div className="mt-6">
            <p className="text-sm text-gray-600 mb-3">Try one of these examples:</p>
            <div className="grid gap-2">
              {exampleIdeas.map((example, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setIdea(example)}
                  className="text-left text-sm px-4 py-3 bg-gray-50 hover:bg-indigo-50 rounded-lg transition-colors border border-gray-200 hover:border-indigo-300"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            disabled={!idea.trim()}
            className="w-full mt-8 h-14 text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          >
            Build My App
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>✨ Powered by AI • 🚀 Auto-deployed to Netlify • ⚡ Production-ready in minutes</p>
        </div>
      </div>
    </div>
  );
}
