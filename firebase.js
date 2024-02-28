import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, child } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {

    apiKey: "AIzaSyBi24ZE2r9_0YBHJN-S6_lIyvjZ8xU3DuM",

    authDomain: "events-website-ba6a4.firebaseapp.com",

    projectId: "events-website-ba6a4",

    storageBucket: "events-website-ba6a4.appspot.com",

    messagingSenderId: "334736523640",

    appId: "1:334736523640:web:d6aec02160f492c936c88d",

    measurementId: "G-SR54B63ND1",

    databaseURL: "https://events-website-ba6a4-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const database = getDatabase(firebaseApp);