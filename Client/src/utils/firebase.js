// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrwAkV8erKGQ3LCvcrga4EwK7cGtGMBbM",
  authDomain: "bobgarage-9926b.firebaseapp.com",
  projectId: "bobgarage-9926b",
  storageBucket: "bobgarage-9926b.appspot.com",
  messagingSenderId: "376600458740",
  appId: "1:376600458740:web:90818411e74e55867575a1",
  measurementId: "G-C0XWDNPE72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const analytics = getAnalytics(app);