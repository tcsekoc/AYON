// js/firebaseConfig.js
// Firebase SDK'ları (CDN üzerinden ES module olarak)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Senin verdiğin config
const firebaseConfig = {
  apiKey: "AIzaSyASYgzfZfmOpl6w7gVgdPpkOVS3m0nKRtY",
  authDomain: "ayon-b6629.firebaseapp.com",
  projectId: "ayon-b6629",
  storageBucket: "ayon-b6629.firebasestorage.app",
  messagingSenderId: "12150062565",
  appId: "1:12150062565:web:0fc1f05f8669e57ab7430c",
  measurementId: "G-TWT34RNXX2"
};

// Firebase app'i başlat
export const app = initializeApp(firebaseConfig);

// Auth ve Firestore instance'ları
export const auth = getAuth(app);
export const db = getFirestore(app);
