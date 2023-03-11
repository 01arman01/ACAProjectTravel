// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDrtm9DyW7wPmgUw2BD6XYQ3Lna2DSInXc",
    authDomain: "acatravel-41a88.firebaseapp.com",
    projectId: "acatravel-41a88",
    storageBucket: "acatravel-41a88.appspot.com",
    messagingSenderId: "75355165960",
    appId: "1:75355165960:web:3c4d161a8cf9189f3748bd",
    measurementId: "G-BGXY6MNWDM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);