// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPXXdtyXPqXZAqgsYHYfRVE-ymrVVmGRs",
  authDomain: "sahayak-ai-a033d.firebaseapp.com",
  projectId: "sahayak-ai-a033d",
  storageBucket: "sahayak-ai-a033d.firebasestorage.app",
  messagingSenderId: "334204056006",
  appId: "1:334204056006:web:d15c9f410f1d332b57c2c7",
  measurementId: "G-CR0V2JZ0X1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Analytics (only in browser environment)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;