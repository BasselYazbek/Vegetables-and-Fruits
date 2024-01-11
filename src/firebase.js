import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBe7kyBTAUqCOiIReO4gPI7LoBkFsaHqSk",
  authDomain: "vegetablesandfruits-e7f40.firebaseapp.com",
  projectId: "vegetablesandfruits-e7f40",
  storageBucket: "vegetablesandfruits-e7f40.appspot.com",
  messagingSenderId: "636035660020",
  appId: "1:636035660020:web:05424e85502d74f693c6a1"
};

const app = firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore(app);

export { firestore };