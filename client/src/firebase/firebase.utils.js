import firebase from "firebase/app";

import "firebase/auth";

const config = {
  apiKey: "AIzaSyDkO3GEg2PDUNH0qP4pod639PUxkfctW24",
  authDomain: "broadkatsme-16450.firebaseapp.com",
  databaseURL: "https://broadkatsme-16450.firebaseio.com",
  projectId: "broadkatsme-16450",
  storageBucket: "broadkatsme-16450.appspot.com",
  messagingSenderId: "936540059031",
  appId: "1:936540059031:web:95e2439f6daff3af9380d2",
  measurementId: "G-7CZ26W50R0"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
