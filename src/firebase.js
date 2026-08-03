import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyB0XHCLvOyBB5dYPGZkgN_CVUhb1Zt8gk4",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "deepintellact-form.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "deepintellact-form",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "deepintellact-form.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "188809723191",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:188809723191:web:842907a717b6bed59f2eb2",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-CPWRLPP5TS"
};

const app = initializeApp(firebaseConfig);

let analytics = null;
if (typeof window !== "undefined") {
  try {
    analytics = getAnalytics(app);
  } catch (e) {
    console.warn("Analytics initialization failed:", e);
  }
}

export { analytics };
export const db = getFirestore(app);
export default app;
