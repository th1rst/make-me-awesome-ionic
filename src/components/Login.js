import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  IonCard,
  IonContent,
  IonCardHeader,
  IonCardSubtitle,
  IonHeader,
  IonCardTitle,
  IonCardContent,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import BackgroundSlider from "./BackgroundSlider";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  return loggedIn ? (
    <Redirect to="/overview" />
  ) : (
    <IonCard>
      <IonCardTitle>Welcome Back!</IonCardTitle>
      <BackgroundSlider />
      <IonCardHeader>
        <IonCardSubtitle>Please log in to continue</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent></IonCardContent>
    </IonCard>
  );
}

export default Login;
