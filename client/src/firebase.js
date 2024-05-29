// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-new-fdeb1.firebaseapp.com",
  projectId: "mern-estate-new-fdeb1",
  storageBucket: "mern-estate-new-fdeb1.appspot.com",
  messagingSenderId: "550946546795",
  appId: "1:550946546795:web:7e260bcd488ba7339ffd2e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);