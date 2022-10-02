import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAi8x4OnwPttwJUvbyRomoD-aelRUKpXRE",
    authDomain: "shopifywebapplication.firebaseapp.com",
    projectId: "shopifywebapplication",
    storageBucket: "shopifywebapplication.appspot.com",
    messagingSenderId: "942808040059",
    appId: "1:942808040059:web:0b2ea4be3e0a7292e4d8de",
    measurementId: "G-BCRTQTYB4N"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);