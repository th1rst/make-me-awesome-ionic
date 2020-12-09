import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { withFirebase } from "../components/Firebase/context";
import {
  IonPage,
  IonContent,
  IonButton,
  IonCard,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonText,
} from "@ionic/react";

function SignUpPage(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstPassword, setFirstPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const submitSignup = (event) => {
    let tempUserID = null;

    //create FireBASE user
    props.firebase
      .doCreateUserWithEmailAndPassword(email, firstPassword)
      //await UserID from Firebase auth
      .then(async () => {
        tempUserID = await props.firebase.auth.currentUser.uid;
      })

      //create corresponding FireSTORE (database) entry with UserID
      .then(() => {
        props.firebase.db
          .collection("users")
          .doc(`${tempUserID}`)
          .set({
            userID: tempUserID,
            name: username,
            email: email,
          })
          .catch((error) => {
            setError(error);
          });
      })
      .catch((error) => {
        setError(error);
      })
      //if resolved -> Redirect to overview via setState isLoggedIn
      .then(() => setLoggedIn(true));

    event.preventDefault();
  };

  const isInvalid =
    firstPassword !== secondPassword ||
    firstPassword === "" ||
    email === "" ||
    username === "";

  return loggedIn ? (
    <Redirect to="/overview" />
  ) : (
    <IonPage>
      <IonContent fullscreen>
        <IonCard>
          <IonCardTitle className="ion-padding ion-text-center ion-text-uppercase">
            Sign Up
          </IonCardTitle>
          <IonCardContent>
            <IonItem>
              <IonLabel>Name:</IonLabel>
              <IonInput
                type="text"
                value={username}
                placeholder="Your Name"
                onIonChange={(e) => setUsername(e.target.value)}
              />
            </IonItem>
            <IonItem>
              <IonLabel>Email:</IonLabel>
              <IonInput
                type="email"
                value={email}
                placeholder="Your Email Address"
                onIonChange={(e) => setEmail(e.target.value)}
              />
            </IonItem>
            <IonItem>
              <IonLabel>Password:</IonLabel>
              <IonInput
                type="password"
                value={firstPassword}
                placeholder="Password"
                onIonChange={(e) => setFirstPassword(e.target.value)}
              />
            </IonItem>
            <IonItem>
              <IonLabel>Confirm Password:</IonLabel>
              <IonInput
                type="password"
                value={secondPassword}
                placeholder="Password"
                onIonChange={(e) => setSecondPassword(e.target.value)}
              />
            </IonItem>
            {error ? (
              <IonText className="ion-text-center" color="danger">
                {error.message}
              </IonText>
            ) : null}
            <IonButton
              className="ion-margin"
              size="small"
              expand="block"
              color="primary"
              disabled={isInvalid}
              onClick={submitSignup}
            >
              Sign Up
            </IonButton>
            <IonText className="ion-text-center">
              By signing up, you agree to the {"  "}{" "}
              <Link to="/termsofservice">Terms of Service</Link> and{" "}
              <Link to="/privacypolicy">Privacy Policy</Link>.
            </IonText>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardTitle className="ion-padding ion-text-center">
            Already Have An Account?
          </IonCardTitle>
          <IonButton
            className="ion-margin"
            expand="block"
            color="secondary"
            routerLink="/"
          >
            Sign In
          </IonButton>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}

export default withFirebase(SignUpPage);
