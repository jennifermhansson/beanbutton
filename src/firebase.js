import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Replace with your own Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCR7SJSoBaGhgktw7bBQ9qqalPztI-J108",
  authDomain: "coffeebutton-249dd.firebaseapp.com",
  databaseURL:
    "https://coffeebutton-249dd-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "coffeebutton-249dd",
  storageBucket: "coffeebutton-249dd.firebasestorage.app",
  messagingSenderId: "277126949131",
  appId: "1:277126949131:web:17aebfe2c6fd74934e5a0e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

export { database };
