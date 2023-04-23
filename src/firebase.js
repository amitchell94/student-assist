// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCx-9pZRcvugWXkLEdAngEW-eRd1glrcvA",
  authDomain: "studentassist-40933.firebaseapp.com",
  projectId: "studentassist-40933",
  storageBucket: "studentassist-40933.appspot.com",
  messagingSenderId: "6981218056",
  appId: "1:6981218056:web:445671cecc3b30417ec6bd",
  measurementId: "G-3GS765BR8B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
