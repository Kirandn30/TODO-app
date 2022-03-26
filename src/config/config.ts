import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCeB2EFp9QQBA3iyQEJaRfWxGPQT6IX4vg",
  authDomain: "todo-3d47b.firebaseapp.com",
  projectId: "todo-3d47b",
  storageBucket: "todo-3d47b.appspot.com",
  messagingSenderId: "710035555623",
  appId: "1:710035555623:web:ed7385785d7fe85e869502"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service

export const db = getFirestore(app);
