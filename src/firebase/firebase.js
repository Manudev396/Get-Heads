import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA3OHzaY-DBRSKj52RZRReUVgbTDJMwvBQ",
    authDomain: "getheads.firebaseapp.com",
    projectId: "getheads",
    storageBucket: "getheads.appspot.com",
    messagingSenderId: "1005924960930",
    appId: "1:1005924960930:web:e8a3d6f0a7a263f12465fb",
    measurementId: "G-WJZPRWJSN4"
};

firebase.initializeApp(firebaseConfig);

export default firebase;