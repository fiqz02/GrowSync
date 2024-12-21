import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5CaRC6JOT1czTvz-mNtfpCgfIyKmg-nc",
  authDomain: "growsync-e8713.firebaseapp.com",
  databaseURL: "https://growsync-e8713-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "growsync-e8713",
  storageBucket: "growsync-e8713.firebasestorage.app",
  messagingSenderId: "329464030712",
  appId: "1:329464030712:web:1b414e8c50989f73de220d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };