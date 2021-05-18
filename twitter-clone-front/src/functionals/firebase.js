import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";

// Initialize the default app
export var admin = require('firebase-admin');
export var app = admin.initializeApp();

const firebaseConfig = {
  apiKey: "AIzaSyA-e6JmdJY9JxEtaZae-6UNvaQAm6qB77s",
  authDomain: "twitter-clone-sstp.firebaseapp.com",
  projectId: "twitter-clone-sstp",
  storageBucket: "twitter-clone-sstp.appspot.com",
  messagingSenderId: "487422395058",
  appId: "1:487422395058:web:71cacd9b8406df459c3fab`",
  measurementId: "G-LPC71XQKTB"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default {db, app, admin};
