// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUeu79u6K1Ru9A-nlussDbHqjgdtap73M",
  authDomain: "email-pass-auth-d75c5.firebaseapp.com",
  projectId: "email-pass-auth-d75c5",
  storageBucket: "email-pass-auth-d75c5.appspot.com",
  messagingSenderId: "372468451577",
  appId: "1:372468451577:web:70b0aa9f78e2657beb3a28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;