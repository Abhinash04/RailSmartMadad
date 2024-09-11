// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_BgON9SBy42Cq47zSNXRRyKEUCiv7SJY",
  authDomain: "rail-madad-5a0ba.firebaseapp.com",
  projectId: "rail-madad-5a0ba",
  storageBucket: "rail-madad-5a0ba.appspot.com",
  messagingSenderId: "345076049770",
  appId: "1:345076049770:web:2217422a48b28f45992713"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();
export { app, db, storage };