# Firebase + Gemini API Setup Guide

This guide will help you securely integrate the Gemini API into your application using Firebase Cloud Functions.

## Why Use Firebase Cloud Functions?

**❌ NEVER put API keys directly in your frontend code!**

Your Gemini API key should be kept secret. If you put it in your React code, anyone can:
- View it in the browser's developer tools
- Steal it from your GitHub repository
- Use it to make unauthorized API calls

**✅ Firebase Cloud Functions = Secure Backend**

Firebase Cloud Functions act as a secure backend that:
- Stores your API key safely as an environment variable
- Only your frontend can call these functions
- The API key never reaches the browser
- You can add authentication and rate limiting

---

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name (e.g., "ai-product-builder")
4. Follow the setup wizard
5. Choose the free Spark plan (or upgrade to Blaze for production)

---

## Step 2: Get Your Firebase Config

1. In Firebase Console, click the gear icon > "Project settings"
2. Scroll down to "Your apps" section
3. Click the web icon (`</>`) to add a web app
4. Register your app with a nickname
5. Copy the `firebaseConfig` object
6. Replace the config in `/src/lib/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

---

## Step 3: Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Get API key"
3. Create a new API key or use an existing one
4. **Copy the API key** (you'll need it in Step 6)
5. **DO NOT commit this key to GitHub!**

---

## Step 4: Install Firebase CLI

```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Login to Firebase
firebase login

# This will open a browser for authentication
```

---

## Step 5: Initialize Firebase Functions

```bash
# In your project root directory
firebase init functions

# Answer the prompts:
# ? Select default Firebase project: Choose your project
# ? What language: TypeScript
# ? Use ESLint: No (optional)
# ? Install dependencies: Yes
```

---

## Step 6: Set Your Gemini API Key (SECURE!)

```bash
# Set the Gemini API key as a secure environment variable
firebase functions:config:set gemini.api_key="YOUR_GEMINI_API_KEY_HERE"

# Verify it was set
firebase functions:config:get
```

**Important:** This stores your API key securely in Firebase. It will NEVER appear in your code or GitHub!

---

## Step 7: Install Cloud Function Dependencies

```bash
cd firebase-functions/functions
npm install firebase-functions firebase-admin @google/generative-ai
cd ../..
```

---

## Step 8: Deploy Cloud Functions

```bash
# Deploy only the functions
firebase deploy --only functions

# After deployment, you'll see:
# ✔ functions[generateCodeWithGemini(us-central1)] Successful create operation.
# Function URL: https://us-central1-YOUR_PROJECT.cloudfunctions.net/generateCodeWithGemini
```

---

## Step 9: Test Your Setup

1. Start your React app:
```bash
npm run dev
```

2. Open the app in your browser
3. Enter an app idea and click "Build My App"
4. The app will securely call Firebase → Gemini API → Return results

---

## Architecture Flow

```
┌─────────────────┐
│   React App     │  1. User enters idea
│   (Frontend)    │────────┐
└─────────────────┘        │
                           ▼
                    ┌──────────────────┐
                    │ Firebase Cloud   │  2. Calls Gemini API
                    │    Function      │     (API key stored securely)
                    │                  │
                    │ Environment Var: │
                    │ gemini.api_key   │
                    └──────────────────┘
                           │
                           ▼
                    ┌──────────────────┐
                    │   Gemini API     │  3. Generates code
                    │  (Google AI)     │
                    └──────────────────┘
                           │
                           ▼
                    ┌──────────────────┐
                    │  Returns Result  │  4. Code sent back to frontend
                    │                  │
                    └──────────────────┘
```

---

## Security Best Practices

### ✅ DO:
- Store API keys in Firebase Functions environment config
- Use `.gitignore` to exclude sensitive files
- Enable Firebase Authentication for production
- Add rate limiting to prevent abuse
- Monitor Cloud Function usage in Firebase Console

### ❌ DON'T:
- Put API keys in your React code
- Commit API keys to GitHub
- Share your Firebase config publicly
- Use the same key for dev and production

---

## Cost Information

### Firebase Pricing (Blaze Plan - Pay As You Go)
- **First 2 million function invocations/month**: FREE
- **After that**: $0.40 per million invocations
- **First 400,000 GB-seconds**: FREE
- **After that**: $0.0000025 per GB-second

### Gemini API Pricing
- Check current pricing at: https://ai.google.dev/pricing
- Free tier available for testing

---

## Troubleshooting

### Error: "Gemini API key is not configured"
```bash
# Set the API key again
firebase functions:config:set gemini.api_key="YOUR_KEY"
firebase deploy --only functions
```

### Error: "CORS error"
The Cloud Function is configured to allow CORS. If you still get errors:
1. Check Firebase Console > Functions > Logs
2. Make sure you're calling from the correct domain
3. Verify your Firebase config in `/src/lib/firebase.ts`

### Error: "Failed to generate code"
1. Check that your Gemini API key is valid
2. Verify you have billing enabled (required for Gemini API)
3. Check Cloud Function logs in Firebase Console

---

## Local Development (Optional)

You can test Cloud Functions locally:

```bash
# Start Firebase emulators
firebase emulators:start

# Update firebase.ts to use local emulator
# import { connectFunctionsEmulator } from 'firebase/functions';
# connectFunctionsEmulator(functions, 'localhost', 5001);
```

---

## Next Steps

1. ✅ Configure Firebase (`/src/lib/firebase.ts`)
2. ✅ Deploy Cloud Functions
3. ✅ Test the integration
4. Consider adding:
   - User authentication
   - Usage limits
   - Error tracking (Sentry, etc.)
   - Analytics

---

## Support

- [Firebase Documentation](https://firebase.google.com/docs)
- [Gemini API Documentation](https://ai.google.dev/docs)
- [Firebase Functions Guide](https://firebase.google.com/docs/functions)

**Remember:** Keep your API keys secret! 🔐
