// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxY2APQwsFgvJf7FAbpLTr8PbdhgcxLGc",
  authDomain: "nft-project-b317c.firebaseapp.com",
  projectId: "nft-project-b317c",
  storageBucket: "nft-project-b317c.firebasestorage.app",
  messagingSenderId: "99144367808",
  appId: "1:99144367808:web:a3afbaac260d23cd5f7725",
  measurementId: "G-W2XTHK3EVS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);