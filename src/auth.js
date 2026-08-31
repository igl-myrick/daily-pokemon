import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export const doCreateUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
}

export const doSignIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
}

export const doSignOut = () => {
  return auth.signOut();
}