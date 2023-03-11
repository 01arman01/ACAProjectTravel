// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiEOmjydppc-KE9AVDbPSW-EP7Ah79EPc",
  authDomain: "acatravel-a98ac.firebaseapp.com",
  projectId: "acatravel-a98ac",
  storageBucket: "acatravel-a98ac.appspot.com",
  messagingSenderId: "631270502365",
  appId: "1:631270502365:web:7f1215dcf99bfd04315034",
  measurementId: "G-DX2FZNZQW8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const createUser = async (email, password) => {
    return createUserWithEmailAndPassword(getAuth(app), email, password);
  }
  
  export const signInUser = async (email, password) => {
    return signInWithEmailAndPassword(getAuth(app), email, password);
  }