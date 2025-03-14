// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-kids-story-generator-d36e6.firebaseapp.com",
  projectId: "ai-kids-story-generator-d36e6",
  storageBucket: "ai-kids-story-generator-d36e6.firebasestorage.app",
  messagingSenderId: "1018692203785",
  appId: "1:1018692203785:web:9f3c17bf2a945428f78fd8",
  measurementId: "G-Y88HR7MEFP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage=getStorage(app)