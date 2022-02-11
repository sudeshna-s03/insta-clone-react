import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA34mfYu9U4qW69tT5wLf5rj7848xHrZ80",
  authDomain: "instagram-react-clone-5ff41.firebaseapp.com",
  projectId: "instagram-react-clone-5ff41",
  storageBucket: "instagram-react-clone-5ff41.appspot.com",
  messagingSenderId: "999287540169",
  appId: "1:999287540169:web:e179d4e409b0c8f955c018",
  measurementId: "G-6HB0G90VD0"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { auth, db, storage };
