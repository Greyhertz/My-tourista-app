// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import db from "firesbase"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6lDLC6QrF4WN7kz6VP3YjHUP50lm48sg",
  authDomain: "my--tourist-app.firebaseapp.com",
  projectId: "my--tourist-app",
  storageBucket: "my--tourist-app.firebasestorage.app",
  messagingSenderId: "1028760519193",
  appId: "1:1028760519193:web:6f08f064804fc72f2f2088",
  measurementId: "G-2W56YCFF8K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirebase(app);