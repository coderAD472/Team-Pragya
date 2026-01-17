import { motion } from 'motion/react';
import { 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  Sparkles,
  Code2,
  Palette,
  Globe,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import type { DeploymentResult } from './BuildProcess';

interface DeploymentSummaryProps {
  result: DeploymentResult;
  onStartNew: () => void;
}

export function DeploymentSummary({ result, onStartNew }: DeploymentSummaryProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-5xl w-full">
        {/* Success Header */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-6 shadow-lg"
          >
            <CheckCircle2 className="w-12 h-12 text-white" />
          </motion.div>
          <h1 className="text-4xl mb-3 text-gray-900">
            🎉 Your App is Live!
          </h1>
          <p className="text-xl text-gray-600">
            {result.projectName} has been successfully deployed
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Live URL Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-white h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-indigo-600" />
                  Live Application
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">Your app is now accessible worldwide</p>
                <a
                  href={result.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 break-all"
                >
                  {result.liveUrl}
                  <ExternalLink className="w-4 h-4 flex-shrink-0" />
                </a>
                <Button
                  className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700"
                  onClick={() => window.open(result.liveUrl, '_blank')}
                >
                  Open Live Site
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* GitHub Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-2 border-gray-200 h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Github className="w-5 h-5" />
                  Source Code
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">View and clone your repository</p>
                <a
                  href={result.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 break-all"
                >
                  {result.githubUrl}
                  <ExternalLink className="w-4 h-4 flex-shrink-0" />
                </a>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => window.open(result.githubUrl, '_blank')}
                >
                  View on GitHub
                  <Github className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Tech Stack Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                AI Tech Decision & Explanation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-6">{result.explanation}</p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Code2 className="w-5 h-5 text-blue-600" />
                    <h4 className="text-sm text-gray-900">Frontend</h4>
                  </div>
                  <div className="space-y-1">
                    {result.techStack.frontend.map((tech, i) => (
                      <Badge key={i} variant="secondary" className="mr-1 mb-1">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Palette className="w-5 h-5 text-purple-600" />
                    <h4 className="text-sm text-gray-900">Styling</h4>
                  </div>
                  <Badge variant="secondary">{result.techStack.styling}</Badge>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-5 h-5 text-green-600" />
                    <h4 className="text-sm text-gray-900">Deployment</h4>
                  </div>
                  <Badge variant="secondary">{result.techStack.deployment}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Future Improvements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-indigo-600" />
                Suggested Improvements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Take your application to the next level with these AI-recommended enhancements:
              </p>
              <ul className="space-y-3">
                {result.improvements.map((improvement, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-xs text-indigo-600">{i + 1}</span>
                    </div>
                    <span className="text-gray-700">{improvement}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex gap-4 justify-center"
        >
          <Button
            size="lg"
            onClick={onStartNew}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          >
            <RefreshCw className="mr-2 w-5 h-5" />
            Build Another App
          </Button>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center text-sm text-gray-500"
        >
          <p>⚡ Built and deployed in seconds • 🤖 Powered by Agentic AI • 🚀 Production-ready</p>
        </motion.div>
      </div>
    </div>
  );
}
