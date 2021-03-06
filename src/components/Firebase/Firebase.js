import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { Plugins } from "@capacitor/core"

const { Storage } = Plugins;

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.fieldValue = app.firestore.FieldValue;

    //Firebase API's
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
    this.storageRef = app.storage().ref();
    this.authUser = JSON.parse(localStorage.getItem("authUser"));
  }

  // Auth API

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        this.db
          .collection("users")
          .doc(`${authUser.uid}`)
          .get()
          .then(() => {
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              photoUrl: authUser.photoURL,
            };
            next(authUser);
          });
      } else {
        fallback();
      }
    });
}

export default Firebase;
