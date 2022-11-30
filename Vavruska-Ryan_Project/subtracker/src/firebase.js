import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBccle3bql_zpzur5Y1bTWevxkrZZcODDQ",
  authDomain: "subtracker-5c712.firebaseapp.com",
  projectId: "subtracker-5c712",
  storageBucket: "subtracker-5c712.appspot.com",
  messagingSenderId: "506285098300",
  appId: "1:506285098300:web:4dd5cdd395107ac6168a39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

const registerWithEmailAndPassword = async (name, email, password) => {
try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
    uid: user.uid,
    name,
    authProvider: "local",
    email,
    });
} catch (err) {
    console.error(err);
    alert(err.message);
}
};

const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      // We don't want the user to know if an account under that email exists or not,
      // just tell them email sent and swallow the error.
    }
};

const logout = () => {
    signOut(auth);
};

export {
    auth,
    db,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
};