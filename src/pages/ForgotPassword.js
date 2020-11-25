import React, { useState } from "react";
import { withFirebase } from "../components/Firebase/context";
import {
  IonPage,
  IonContent,
  IonButton,
  IonCard,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonCardSubtitle,
  IonItemDivider,
  IonItem,
  IonLabel,
  IonInput,
  IonText,
} from "@ionic/react";
import Navbar from "../components/Navigation/Navbar";

function ForgotPassword(props) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const submitEmail = (event) => {
    props.firebase
      .doPasswordReset(email)
      .then(() => {
        setEmail("");
        setError(null);
      })
      .catch((error) => setError(error));
    event.preventDefault();
  };

  const isInvalid = email === "";

  return (
    <IonPage>
      <Navbar />
      <IonContent fullscreen>
        <IonCard>
          <IonCardTitle className="ion-padding ion-text-center ion-text-uppercase">
            Recover Your Password
          </IonCardTitle>
          <IonCardHeader>
            <IonCardSubtitle className="ion-text-center">
              Just one more step
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonLabel>Email:</IonLabel>
              <IonInput
                type="email"
                value={email}
                placeholder="Your Email Address"
                onIonChange={(e) => setEmail(e.target.value)}
              />
            </IonItem>
            <IonItemDivider />
            <IonButton
              className="ion-margin-bottom"
              size="small"
              expand="block"
              color="primary"
              disabled={isInvalid}
              onClick={submitEmail}
            >
              Submit
            </IonButton>
            {error ? (
              <IonText className="ion-text-center" color="danger">
                {error.message}
              </IonText>
            ) : null}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}

export default withFirebase(ForgotPassword);
