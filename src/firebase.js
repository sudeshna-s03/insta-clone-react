import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyA34mfYu9U4qW69tT5wLf5rj7848xHrZ80",
    authDomain: "instagram-react-clone-5ff41.firebaseapp.com",
    projectId: "instagram-react-clone-5ff41",
    storageBucket: "instagram-react-clone-5ff41.appspot.com",
    messagingSenderId: "999287540169",
    appId: "1:999287540169:web:e179d4e409b0c8f955c018",
    measurementId: "G-6HB0G90VD0"
};
let app;

if(firebase.apps.length === 0){
  app= firebase.initializeApp(firebaseConfig);
}else{
  app= firebase.app();
}
  const db= app.firestore();
  const auth= firebase.auth();
  const storage= firebase.storage();
  export { db, auth, storage };
