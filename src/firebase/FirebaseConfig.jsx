// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; 



// const firebaseConfig = {
//   apiKey: "AIzaSyDcWTBXit_K-h8cuh_NOLLG44oXPkllEjw",
//   authDomain: "zaphira-12860.firebaseapp.com",
//   projectId: "zaphira-12860",
//   storageBucket: "zaphira-12860.firebasestorage.app",
//   messagingSenderId: "627407717364",
//   appId: "1:627407717364:web:5f3f69c8f464946615efa1"
// };

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// yaha pe banane se hame baar baar har jagah nahi bnana pdega direct import kr ke use kar sakte hai
const firebaseDB = getFirestore(app);
const auth = getAuth(app);
const firebaseStorage = getStorage(app);

export {firebaseDB, auth, firebaseStorage}