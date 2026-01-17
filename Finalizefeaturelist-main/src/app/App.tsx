import { useState } from 'react';
import { IdeaInput } from '@/app/components/IdeaInput';
import { BuildProcess, DeploymentResult } from '@/app/components/BuildProcess';
import { DeploymentSummary } from '@/app/components/DeploymentSummary';

type AppState = 'input' | 'building' | 'complete';

export default function App() {
  const [state, setState] = useState<AppState>('input');
  const [currentIdea, setCurrentIdea] = useState('');
  const [deploymentResult, setDeploymentResult] = useState<DeploymentResult | null>(null);

  const handleIdeaSubmit = (idea: string) => {
    setCurrentIdea(idea);
    setState('building');
  };

  const handleBuildComplete = (result: DeploymentResult) => {
    setDeploymentResult(result);
    setState('complete');
  };

  const handleStartNew = () => {
    setState('input');
    setCurrentIdea('');
    setDeploymentResult(null);
  };

  return (
    <div className="size-full">
      {state === 'input' && <IdeaInput onSubmit={handleIdeaSubmit} />}
      {state === 'building' && (
        <BuildProcess idea={currentIdea} onComplete={handleBuildComplete} />
      )}
      {state === 'complete' && deploymentResult && (
        <DeploymentSummary result={deploymentResult} onStartNew={handleStartNew} />
      )}
    </div>
  );
}
