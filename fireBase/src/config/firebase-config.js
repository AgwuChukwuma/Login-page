// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKlbSCm0ljwLtoY5KugdU4xPN81MxjcmQ",
  authDomain: "first-project-d5543.firebaseapp.com",
  projectId: "first-project-d5543",
  storageBucket: "first-project-d5543.appspot.com",
  messagingSenderId: "808969914483",
  appId: "1:808969914483:web:b6634141c4c463ea110206",
  measurementId: "G-M8BP9C32S3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();