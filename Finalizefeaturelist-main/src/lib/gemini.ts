import { httpsCallable } from 'firebase/functions';
import { functions } from './firebase';

export interface GeminiRequest {
  prompt: string;
}

export interface GeminiResponse {
  generatedCode: string;
  techStack: {
    frontend: string[];
    styling: string;
    deployment: string;
  };
  explanation: string;
}

/**
 * Calls the Firebase Cloud Function to generate code using Gemini API
 * The actual API key is stored securely in Firebase Functions environment
 */
export async function generateCodeWithGemini(idea: string): Promise<GeminiResponse> {
  try {
    // Call the Firebase Cloud Function
    const generateCode = httpsCallable<GeminiRequest, GeminiResponse>(
      functions,
      'generateCodeWithGemini'
    );
    
    const result = await generateCode({ prompt: idea });
    return result.data;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to generate code. Please try again.');
  }
}
