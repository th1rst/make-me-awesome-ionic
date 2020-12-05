import React, { useState } from "react";
import { withFirebase } from "../Firebase/context";
import ServerResponseToast from "../ServerResponseToast";
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
} from "@ionic/react";

function ChangePasswordForm(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showServerResponseToast, setShowServerResponseToast] = useState(false);

  const changePassword = async () => {
    await props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        setSuccessMessage("Sucessfully updated your password.");
        setShowServerResponseToast(true);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setShowServerResponseToast(true);
      });
  };

  const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

  return (
    <>
      {/* ------------- HELPER TEXT ON ACTIVE ------------- */}

      {isEditing ? (
        <>
          <IonItem>
            <IonLabel>Change your password</IonLabel>
            <IonInput
              type="password"
              placeholder="Please set a new password"
              value={passwordOne}
              onIonChange={(e) => setPasswordOne(e.target.value)}
              valid={!isInvalid}
            />
          </IonItem>

          <IonItem>
            <IonLabel>Change your password</IonLabel>
            <IonInput
              type="password"
              name="passwordTwo"
              placeholder="Repeat your new password"
              value={passwordTwo}
              onIonChange={(e) => setPasswordTwo(e.target.value)}
              valid={!isInvalid}
            />
          </IonItem>
          <IonRow className="row">
            {!isInvalid ? (
              <IonText color="success" valid={true}>
                Passwords match.
              </IonText>
            ) : (
              <IonText color="danger" valid={false}>
                Passwords do not match.
              </IonText>
            )}
          </IonRow>
        </>
      ) : (
        <>
          {/* ------------- NO HELPER TEXT (INACTIVE) ------------- */}
          <IonItem className="ion-margin">
            <IonLabel>Change your password</IonLabel>
            <IonInput
              placeholder="Please set a new password"
              onClick={() => setIsEditing(true)}
            />
          </IonItem>
          <IonItem className="ion-margin">
            <IonLabel>Repeat your password</IonLabel>
            <IonInput
              className="mb-1 mt-1"
              placeholder="Repeat your new password"
              onClick={() => setIsEditing(true)}
            />
          </IonItem>
        </>
      )}

      <IonButton onClick={changePassword} disabled={isInvalid}>
        Apply
      </IonButton>

      {/* ------------- SERVER RESPONSE MODAL ------------- */}

      {showServerResponseToast ? (
        <ServerResponseToast
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
      ) : null}
    </>
  );
}

export default withFirebase(ChangePasswordForm);
