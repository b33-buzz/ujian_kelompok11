// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCfnRyV0LyxWSputYT62OLlLbbEZvRMew",
  authDomain: "todolist-b1a9b.firebaseapp.com",
  projectId: "todolist-b1a9b",
  storageBucket: "todolist-b1a9b.appspot.com",
  messagingSenderId: "321636193559",
  appId: "1:321636193559:web:5f88d3e59717c8b135d352",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
