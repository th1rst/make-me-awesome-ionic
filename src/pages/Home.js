import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import BackgroundSlider from "../components/BackgroundSlider/BackgroundSlider";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonCardHeader,
  IonCardContent,
  IonButton,
  IonInput,
  IonLabel,
  IonItemGroup,
  IonItem,
  IonText,
} from "@ionic/react";

const Home = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const submitCredentials = (event) => {
    props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail(email);
        setPassword(password);
        setLoggedIn(true);
      })
      .catch((error) => {
        setError(error);
      });
    event.preventDefault();
  };

  const isInvalid = password === "" || email === "";

  return loggedIn ? (
    <Redirect to="/overview" />
  ) : (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonCardTitle className="ion-padding ion-text-center ion-text-uppercase">
            Welcome Back!
          </IonCardTitle>
          <BackgroundSlider />
          <IonCardHeader>
            <IonCardSubtitle className="ion-text-center">
              Please log in to continue
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItemGroup>
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
                  value={password}
                  placeholder="Your Password"
                  onIonChange={(e) => setPassword(e.target.value)}
                />
              </IonItem>

              {error ? (
                <IonText className="ion-text-center" color="danger">
                  {error.message}
                </IonText>
              ) : null}
            </IonItemGroup>
            <Link to="/forgot">
              <p className="ion-text-end ion-padding">Forgot Password?</p>
            </Link>

            <IonButton
              className="ion-margin-bottom"
              type="submit"
              expand="block"
              color="primary"
              disabled={isInvalid}
              onClick={submitCredentials}
            >
              Login
            </IonButton>
            <IonButton
              className="ion-margin-bottom"
              type="submit"
              expand="block"
              color="secondary"
              routerLink="/signup"
            >
              Create Account
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
