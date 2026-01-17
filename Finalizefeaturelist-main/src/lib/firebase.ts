import { initializeApp } from 'firebase/app';
import { getFunctions } from 'firebase/functions';

// TODO: Replace with your Firebase project configuration
// Get this from your Firebase Console > Project Settings > General > Your apps
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuiodMbyYaC3PZNQ3x1BJGbBV9WqZdNlU",
  authDomain: "idea2deploy.firebaseapp.com",
  projectId: "idea2deploy",
  storageBucket: "idea2deploy.firebasestorage.app",
  messagingSenderId: "521897250248",
  appId: "1:521897250248:web:ae2cfe64d7c44a738244fd",
  measurementId: "G-TEC9S10WRQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Functions
export const functions = getFunctions(app);
