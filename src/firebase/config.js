import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDj9I4_HnmoJ-8K6Wry4n88xiuwvjI7Mvw",
  authDomain: "twitter-79d78.firebaseapp.com",
  projectId: "twitter-79d78",
  storageBucket: "twitter-79d78.appspot.com",
  messagingSenderId: "373898295493",
  appId: "1:373898295493:web:8967acece99843927ed8ac",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);

export const storage = getStorage(app);
