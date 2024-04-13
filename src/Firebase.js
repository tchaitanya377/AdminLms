import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDrQVx0lmrTJGLP-O8aSEoSzJThCobrkas",
  authDomain: "lmsr-ffb4b.firebaseapp.com",
  databaseURL: "https://lmsr-ffb4b-default-rtdb.firebaseio.com",
  projectId: "lmsr-ffb4b",
  storageBucket: "lmsr-ffb4b.appspot.com",
  messagingSenderId: "665393971141",
  appId: "1:665393971141:web:3f5e416bdce5dc73f595ac",
  measurementId: "G-DS4SM5B736"
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]; // if already initialized, use that one
}

const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
