import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDmgyNcvtaADPOLRoVsyfLvdyDk8gaGIQI",
  authDomain: "react-firebase-auth-29be8.firebaseapp.com",
  projectId: "react-firebase-auth-29be8",
  storageBucket: "react-firebase-auth-29be8.appspot.com",
  messagingSenderId: "210094270110",
  appId: "1:210094270110:web:315a0d47be4023bd287d8f",
  measurementId: "G-0XR1FKKSN9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)