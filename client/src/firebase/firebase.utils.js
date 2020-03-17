import firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

import axios from "axios";
import { BASE_API_URL } from "../utils";

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

export const db = firebase.database();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const createUserProfileMongoDB = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const { username } = additionalData;
  await axios
    .post(`${BASE_API_URL}/register/new-user`, {
      "uid": userAuth.user.uid,
      "username": username
    })
    .then(res => {
      console.log("Successfully made a MDB user:", res);
    })
    .catch(error => {
      // if we get to this point, it means that someone finished inserting another UserProfile
      // with values that DID pass the input validation above but are now invalid because of timing
      if (error.response) {
        console.error("MONGODB ERROR:", error.response.data.message);
        console.error(error);
        userAuth.user.delete(); // deletes the user from firebase
      }
    });
};

export const signInWithGoogle = () =>
  auth.signInWithPopup(provider).then(async userCredential => {
    let isNewUser = userCredential.additionalUserInfo.isNewUser;
    // console.log("isNewUser:", isNewUser);
    if (isNewUser) {
      const uid = userCredential.user.uid;
      const shortenedUID =
        uid.slice(0, 7) + uid.slice(uid.length - 8, uid.length);
      createUserProfileMongoDB(userCredential, {
        username: shortenedUID // using a shortened version of the provided uid as a temp username
      });
    }
  });

export default firebase;
