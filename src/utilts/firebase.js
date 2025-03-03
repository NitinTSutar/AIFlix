// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJ-x-o3PcbSA-Hdw-xXYjgjN1Zq2kMMBo",
  authDomain: "nefflix-76f46.firebaseapp.com",
  projectId: "nefflix-76f46",
  storageBucket: "nefflix-76f46.firebasestorage.app",
  messagingSenderId: "964024548959",
  appId: "1:964024548959:web:c25d680dc4a0ce7faae5ea",
  measurementId: "G-ZC91HZL0D5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 getAnalytics(app);

export const auth = getAuth();