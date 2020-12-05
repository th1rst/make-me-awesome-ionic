import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
} from "@ionic/react";
import React, { useState } from "react";
import { withFirebase } from "../Firebase/context";
import ServerResponseToast from "../ServerResponseToast";
import "../../pages/pages.css";

function ChangeEmailForm(props) {
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const [isEditing, setIsEditing] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showServerResponseToast, setShowServerResponseToast] = useState(false);

  const updateEmail = () => {
    const user = props.firebase.auth.currentUser;

    user
      .updateEmail(`${newEmail}`)
      .then(() => {
        setSuccessMessage("Sucessfully updated your email address.");
        setShowServerResponseToast(true);
        setCurrentEmail("");
        setNewEmail("");
        setIsEditing(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setShowServerResponseToast(true);
      });
  };

  const checkCurrentEmailInput = (userInput) => {
    if (userInput === authUser.email) {
      return true;
    }
    return false;
  };

  const validateEmailFormat = (email) => {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  };

  return (
    <>
      {/* ------------- HELPER TEXT ON ACTIVE ------------- */}

      {isEditing ? (
        <>
          <IonItem>
            <IonLabel>Current Email</IonLabel>
            <IonInput
              placeholder="Please enter your current email"
              value={currentEmail}
              onIonChange={(e) => setCurrentEmail(e.target.value)}
              valid={checkCurrentEmailInput(currentEmail)}
            />
          </IonItem>
          <IonRow className="row">
            {checkCurrentEmailInput(currentEmail) ? (
              <IonText color="success" valid={true}>
                Your current email address is correct
              </IonText>
            ) : (
              <IonText color="danger" valid={false}>
                This is not your current email address
              </IonText>
            )}
          </IonRow>

          <IonItem>
            <IonLabel>New Email</IonLabel>
            <IonInput
              className="mb-1 mt-1"
              placeholder="Please enter your new email"
              value={newEmail}
              onIonChange={(e) => setNewEmail(e.target.value)}
              valid={validateEmailFormat(newEmail)}
            />
          </IonItem>
          <IonRow className="row">
            {validateEmailFormat(newEmail) ? (
              <IonText color="success" valid={true}>
                Email format is correct
              </IonText>
            ) : (
              <IonText color="danger" valid={false}>
                Please provide an email in the following format: john@doe.com
              </IonText>
            )}
          </IonRow>
        </>
      ) : (
        <>
          <IonItem className="ion-margin">
            {/* ------------- NO HELPER TEXT (INACTIVE) ------------- */}

            <IonLabel>Current Email</IonLabel>
            <IonInput
              placeholder="Please enter current email"
              onClick={() => setIsEditing(true)}
            />
          </IonItem>

          <IonItem className="ion-margin">
            <IonLabel>New Email</IonLabel>
            <IonInput
              placeholder="Please enter your new email"
              onClick={() => setIsEditing(true)}
            />
          </IonItem>
          <IonButton className="ion-margin-horizontal" onClick={updateEmail}>
            Apply
          </IonButton>
        </>
      )}

      {showServerResponseToast ? (
        <ServerResponseToast
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
      ) : null}
    </>
  );
}

export default withFirebase(ChangeEmailForm);
