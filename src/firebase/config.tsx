import firebase from 'firebase/compat/app';
import "firebase/firestore"
import "firebase/compat/storage"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";




const firebaseConfig = {
  apiKey: "AIzaSyD01FddS2G0hzFJJrIiQdDEYq0QGqjDw1U",
  authDomain: "olx-clone-491db.firebaseapp.com",
  projectId: "olx-clone-491db",
  storageBucket: "olx-clone-491db.appspot.com",
  messagingSenderId: "763817561457",
  appId: "1:763817561457:web:8403a8a36fcdca78067ad0"
};

  export const Firebase = firebase.initializeApp(firebaseConfig);
  export const firestore = getFirestore(Firebase);
  export const auth = getAuth(Firebase)
  export const Storage = firebase.storage()