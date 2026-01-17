// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "idea2deploy.firebaseapp.com",
    projectId: "idea2deploy",
    storageBucket: "idea2deploy.firebasestorage.app",
    messagingSenderId: "521897250248",
    appId: "1:521897250248:web:ae2cfe64d7c44a738244fd",
    measurementId: "G-TEC9S10WRQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
