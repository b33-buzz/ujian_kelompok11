// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvz0R7e6-ldnYjBBuB-28NVNQvS1jIo7g",
  authDomain: "todo-app-1c4c1.firebaseapp.com",
  projectId: "todo-app-1c4c1",
  storageBucket: "todo-app-1c4c1.appspot.com",
  messagingSenderId: "907779390100",
  appId: "1:907779390100:web:f45acee78602c16bfa1281",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
