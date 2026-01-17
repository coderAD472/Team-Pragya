import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Layers, 
  Code2, 
  CheckCircle2, 
  Github, 
  Rocket, 
  FileCheck,
  Loader2
} from 'lucide-react';
import { Progress } from '@/app/components/ui/progress';

interface BuildProcessProps {
  idea: string;
  onComplete: (result: DeploymentResult) => void;
}

export interface DeploymentResult {
  projectName: string;
  techStack: {
    frontend: string[];
    styling: string;
    deployment: string;
  };
  explanation: string;
  liveUrl: string;
  githubUrl: string;
  improvements: string[];
}

interface Phase {
  id: number;
  title: string;
  description: string;
  icon: any;
  duration: number;
  details?: string[];
}

const phases: Phase[] = [
  {
    id: 1,
    title: "Analyzing Your Idea",
    description: "AI is understanding your requirements and planning the project structure",
    icon: Sparkles,
    duration: 2000,
    details: ["Parsing requirements", "Identifying core features", "Planning architecture"]
  },
  {
    id: 2,
    title: "Tech Stack Decision",
    description: "AI is selecting the best technologies for your project",
    icon: Layers,
    duration: 2500,
    details: ["Evaluating frameworks", "Selecting React + Tailwind", "Optimizing for performance"]
  },
  {
    id: 3,
    title: "Generating Code",
    description: "Creating production-ready components and styling",
    icon: Code2,
    duration: 3000,
    details: ["Building React components", "Applying Tailwind CSS", "Creating responsive layouts"]
  },
  {
    id: 4,
    title: "Deployment Readiness Check",
    description: "Validating project structure and Netlify compatibility",
    icon: FileCheck,
    duration: 1500,
    details: ["Checking required files", "Validating build config", "Ensuring compatibility"]
  },
  {
    id: 5,
    title: "Pushing to GitHub",
    description: "Committing code and creating repository",
    icon: Github,
    duration: 2000,
    details: ["Initializing Git", "Creating commits", "Pushing to remote"]
  },
  {
    id: 6,
    title: "Deploying to Netlify",
    description: "Building and deploying your application",
    icon: Rocket,
    duration: 2500,
    details: ["Running build process", "Optimizing assets", "Deploying to CDN"]
  },
  {
    id: 7,
    title: "Finalizing",
    description: "Generating deployment summary and recommendations",
    icon: CheckCircle2,
    duration: 1500,
    details: ["Creating summary", "Analyzing performance", "Preparing suggestions"]
  }
];

export function BuildProcess({ idea, onComplete }: BuildProcessProps) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentPhase < phases.length) {
      const phase = phases[currentPhase];
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              if (currentPhase < phases.length - 1) {
                setCurrentPhase(currentPhase + 1);
                setProgress(0);
              } else {
                // All phases complete
                const result: DeploymentResult = {
                  projectName: generateProjectName(idea),
                  techStack: {
                    frontend: ["React 18.3", "TypeScript", "Vite"],
                    styling: "Tailwind CSS",
                    deployment: "Netlify"
                  },
                  explanation: `Your ${generateProjectName(idea)} has been successfully deployed! The AI analyzed your requirements and built a modern, responsive web application using React for dynamic UI components, Tailwind CSS for beautiful styling, and deployed it to Netlify's global CDN for optimal performance.`,
                  liveUrl: `https://${generateProjectName(idea).toLowerCase().replace(/\s+/g, '-')}.netlify.app`,
                  githubUrl: `https://github.com/your-username/${generateProjectName(idea).toLowerCase().replace(/\s+/g, '-')}`,
                  improvements: [
                    "Add user authentication with OAuth providers",
                    "Implement backend API with database integration",
                    "Add real-time updates using WebSockets",
                    "Enhance with advanced analytics and monitoring",
                    "Implement Progressive Web App (PWA) features"
                  ]
                };
                setTimeout(() => onComplete(result), 1000);
              }
            }, 500);
            return 100;
          }
          return prev + (100 / (phase.duration / 100));
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [currentPhase, idea, onComplete]);

  const generateProjectName = (idea: string): string => {
    const words = idea.toLowerCase().split(' ');
    if (words.includes('recipe')) return 'RecipeShare';
    if (words.includes('timer') || words.includes('pomodoro')) return 'FocusTimer';
    if (words.includes('portfolio')) return 'PortfolioGen';
    if (words.includes('task')) return 'TaskMaster';
    return 'MyApp';
  };

  const totalProgress = ((currentPhase + (progress / 100)) / phases.length) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl mb-2 text-gray-900">Building Your Application</h2>
            <p className="text-gray-600">Your idea: <span className="text-indigo-600 font-medium">"{idea}"</span></p>
          </div>

          {/* Overall Progress */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Overall Progress</span>
              <span className="text-sm text-indigo-600">{Math.round(totalProgress)}%</span>
            </div>
            <Progress value={totalProgress} className="h-3" />
          </div>

          {/* Phases List */}
          <div className="space-y-4">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              const isActive = index === currentPhase;
              const isCompleted = index < currentPhase;

              return (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    isActive
                      ? 'bg-indigo-50 border-indigo-400 shadow-lg'
                      : isCompleted
                      ? 'bg-green-50 border-green-300'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                        isActive
                          ? 'bg-indigo-600'
                          : isCompleted
                          ? 'bg-green-600'
                          : 'bg-gray-400'
                      }`}
                    >
                      {isActive ? (
                        <Loader2 className="w-6 h-6 text-white animate-spin" />
                      ) : (
                        <Icon className="w-6 h-6 text-white" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg text-gray-900">{phase.title}</h3>
                        {isCompleted && (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{phase.description}</p>

                      {isActive && (
                        <AnimatePresence mode="wait">
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-1"
                          >
                            {phase.details?.map((detail, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.2 }}
                                className="flex items-center gap-2 text-sm text-indigo-700"
                              >
                                <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
                                {detail}
                              </motion.div>
                            ))}
                          </motion.div>
                        </AnimatePresence>
                      )}

                      {isActive && (
                        <div className="mt-3">
                          <Progress value={progress} className="h-2" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
