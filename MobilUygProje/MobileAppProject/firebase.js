// Import the functions you need from the SDKs you need
//import * as firebase from 'firebase';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAYXliuPxBkgw_rDgKPjg2vawd8Amg94Xw",
    authDomain: "mobilproje-d974f.firebaseapp.com",
    projectId: "mobilproje-d974f",
    storageBucket: "mobilproje-d974f.appspot.com",
    messagingSenderId: "161830016227",
    appId: "1:161830016227:web:e1075d47cc7847587fa1d6"
};



const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { db, auth };