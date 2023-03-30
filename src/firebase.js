// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional



const firebaseConfig = {
  apiKey: "AIzaSyAyIahi0nrfvgC75uPEbYTftlKe7B5QGc4",
  authDomain: "acatravel-2.firebaseapp.com",
  projectId: "acatravel-2",
  storageBucket: "acatravel-2.appspot.com",
  messagingSenderId: "799918154861",
  appId: "1:799918154861:web:8191e1d599adba776f0b64",
  measurementId: "G-GFBF2HS4CK"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyBiEOmjydppc-KE9AVDbPSW-EP7Ah79EPc",
//   authDomain: "acatravel-a98ac.firebaseapp.com",
//   databaseURL: "https://acatravel-a98ac-default-rtdb.firebaseio.com",
//   projectId: "acatravel-a98ac",
//   storageBucket: "acatravel-a98ac.appspot.com",
//   messagingSenderId: "631270502365",
//   appId: "1:631270502365:web:7f1215dcf99bfd04315034",
//   measurementId: "G-DX2FZNZQW8",
// };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
const analytics = getAnalytics(app);

const database = getDatabase(app);

export { database };

export const db = getFirestore(app);

export const createUser = async (email, password) => {
  return createUserWithEmailAndPassword(
    getAuth(app),
    email,
    password,
  );
};

export const signInUser = async (email, password) => {
  return signInWithEmailAndPassword(getAuth(app), email, password);
};


