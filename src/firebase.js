// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBzzpztrQmBIKmAPCVTYWt1wk2sGWQpZkY",
  authDomain: "crypto-factory.firebaseapp.com",
  projectId: "crypto-factory",
  storageBucket: "crypto-factory.appspot.com",
  messagingSenderId: "75213602543",
  appId: "1:75213602543:web:ba5a8951a1b897387ea51a",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
