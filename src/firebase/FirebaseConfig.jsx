// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";;



const firebaseConfig = {
  apiKey: "AIzaSyDcWTBXit_K-h8cuh_NOLLG44oXPkllEjw",
  authDomain: "zaphira-12860.firebaseapp.com",
  projectId: "zaphira-12860",
  storageBucket: "zaphira-12860.firebasestorage.app",
  messagingSenderId: "627407717364",
  appId: "1:627407717364:web:5f3f69c8f464946615efa1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// yaha pe banane se hame baar baar har jagah nahi bnana pdega direct import kr ke use kar sakte hai
const firebaseDB = getFirestore(app);
const auth = getAuth(app);

export {firebaseDB, auth}
