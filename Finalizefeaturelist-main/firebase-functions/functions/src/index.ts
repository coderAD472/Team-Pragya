/**
 * Firebase Cloud Function for securely calling Gemini API
 * 
 * SETUP INSTRUCTIONS:
 * 1. Install Firebase CLI: npm install -g firebase-tools
 * 2. Login to Firebase: firebase login
 * 3. Initialize Functions: firebase init functions
 * 4. Install dependencies in functions folder:
 *    cd functions && npm install
 * 5. Set your Gemini API key as environment variable:
 *    firebase functions:config:set gemini.api_key="YOUR_GEMINI_API_KEY_HERE"
 * 6. Deploy: firebase deploy --only functions
 */

import * as functions from 'firebase-functions';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface GeminiRequest {
  prompt: string;
}

interface GeminiResponse {
  generatedCode: string;
  techStack: {
    frontend: string[];
    styling: string;
    deployment: string;
  };
  explanation: string;
}

export const generateCodeWithGemini = functions.https.onCall(
  async (data: GeminiRequest): Promise<GeminiResponse> => {
    try {
      // Get API key from Firebase environment config (stored securely)
      const apiKey = functions.config().gemini.api_key;
      
      if (!apiKey) {
        throw new functions.https.HttpsError(
          'failed-precondition',
          'Gemini API key is not configured. Run: firebase functions:config:set gemini.api_key="YOUR_KEY"'
        );
      }

      // Initialize Gemini AI
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      // Construct the prompt
      const prompt = `
You are an expert full-stack developer. Based on the following app idea, generate:
1. Complete HTML/CSS code for a beautiful, responsive frontend
2. Recommend the best tech stack
3. Explain why you chose this stack

App Idea: ${data.prompt}

Respond in JSON format:
{
  "generatedCode": "// Your HTML/CSS code here",
  "techStack": {
    "frontend": ["React 18.3", "TypeScript", "Vite"],
    "styling": "Tailwind CSS",
    "deployment": "Netlify"
  },
  "explanation": "Brief explanation of tech choices"
}
`;

      // Call Gemini API
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Parse the JSON response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Failed to parse Gemini response');
      }

      const parsedResponse: GeminiResponse = JSON.parse(jsonMatch[0]);
      return parsedResponse;

    } catch (error) {
      console.error('Error in generateCodeWithGemini:', error);
      throw new functions.https.HttpsError(
        'internal',
        'Failed to generate code with Gemini API',
        error
      );
    }
  }
);
