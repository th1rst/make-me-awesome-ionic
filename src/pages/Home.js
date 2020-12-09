import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import BackgroundSlider from "../components/BackgroundSlider/BackgroundSlider";
import {
  IonContent,
  IonPage,
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
  IonItemDivider,
} from "@ionic/react";
import { withAuthentication } from "../components/Session";

const Home = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  let history = useHistory();

  const submitCredentials = (event) => {
    props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail(email);
        setPassword(password);
        setLoggedIn(true);
      })
      .then(history.push("/overview"))
      .catch((error) => {
        setError(error);
      });
    event.preventDefault();
  };

  const isInvalid = password === "" || email === "";

  return loggedIn ? (
    <></>
  ) : (
    <IonPage>
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
            <IonButton
              className="ion-margin-bottom"
              expand="block"
              color="primary"
              disabled={isInvalid}
              onClick={submitCredentials}
            >
              Login
            </IonButton>
            <Link to="/signup">
              <IonButton
                className="ion-margin-bottom"
                expand="block"
                color="secondary"
              >
                Create Account
              </IonButton>
            </Link>
            <IonItemDivider />
            <Link to="/forgotpassword">
              <IonButton
                className="ion-margin-bottom"
                size="small"
                expand="block"
                color="dark"
              >
                Forgot Password?
              </IonButton>
            </Link>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default withAuthentication(Home);
