import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCkSWNhMR5vmzv-5dVZnM00lUAhR5yIn_E",
  authDomain: "kavi-builders.firebaseapp.com",
  projectId: "kavi-builders",
  storageBucket: "kavi-builders.firebasestorage.app",
  messagingSenderId: "888547550918",
  appId: "1:888547550918:web:3406d88558a8e5db3d19c7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
