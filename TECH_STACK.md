# Tech Stack Documentation

## Overview
This document outlines the technology stack chosen for the "AI Website Builder" application. The selection prioritizes modern development standards, ease of deployment, and seamless integration with AI and backend services.

## Core Technologies

### Frontend
- **Framework**: [React](https://react.dev/) (via [Vite](https://vitejs.dev/))
  - *Reasoning*: Industry standard, vast ecosystem, high performance, and excellent developer experience.
- **Language**: JavaScript (ES6+)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Recommended) or Vanilla CSS
  - *Note*: Will start with Vanilla/Index CSS as per agent defaults unless Tailwind is explicitly requested, but Tailwind is recommended for rapid "Figma-like" designs.

### Backend & Database
- **Platform**: [Firebase](https://firebase.google.com/)
- **Database**: Firestore (NoSQL)
  - *Reasoning*: Real-time updates, flexible schema, easy integration with React.
- **Authentication**: Firebase Auth
- **Hosting**: Firebase Hosting

### Artificial Intelligence
- **Model**: Google Gemini API (Gemini Pro / 1.5 Pro)
  - *Reasoning*: Powerful multimodal capabilities, generous free tier for development, and ease of integration via Google AI SDK.
- **Integration**: `@google/generative-ai` library.

## Features & Implementation Strategy

1.  **AI Website Generation**:
    - User input -> Prompt Engineering -> AI Model -> HTML/CSS Generation -> Preview.
2.  **Bug Fixer**:
    - Code Input -> AI Analysis -> Diff/Fix Generation -> Preview.
3.  **Cost Estimator**:
    - Logic-based estimation based on complexity features selected.

## Deployment
- **Deployment Target**: Firebase Hosting.
