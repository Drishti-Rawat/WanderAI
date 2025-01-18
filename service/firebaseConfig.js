// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAobUhjgygggbCTik22JOU7h81Gf7JuHoQ",
  authDomain: "inspaire-1de3e.firebaseapp.com",
  projectId: "inspaire-1de3e",
  storageBucket: "inspaire-1de3e.firebasestorage.app",
  messagingSenderId: "797453107659",
  appId: "1:797453107659:web:0b4e7a07b3f970120f364e",
  measurementId: "G-23V3RJ0YWH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);