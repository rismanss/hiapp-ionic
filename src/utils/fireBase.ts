// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBA6_P58D5rFxBqBPEt9nMPOO_xXgkC9do",
  authDomain: "hi-app-17503.firebaseapp.com",
  projectId: "hi-app-17503",
  storageBucket: "hi-app-17503.appspot.com",
  messagingSenderId: "193517023555",
  appId: "1:193517023555:web:1b7dd3eb2451931bf6fff6",
  measurementId: "G-04N5Q3JGVF"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export {auth, db, firebase};
