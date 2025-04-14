import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmfcEdZryzUCdFEy8pl0x58SW5HWAhH-Y",
  authDomain: "proyecto-uno-e7802.firebaseapp.com",
  projectId: "proyecto-uno-e7802",
  storageBucket: "proyecto-uno-e7802.firebasestorage.app",
  messagingSenderId: "925294643277",
  appId: "1:925294643277:web:9f527fd1a3857527a7b404",
  measurementId: "G-TV2ZLFGWJY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);