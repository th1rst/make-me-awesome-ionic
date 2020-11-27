import React, { useState } from "react";
import { withFirebase } from "../Firebase/context";
import {
  IonCard,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonCardHeader,
  IonCardContent,
  IonButton,
  IonContent,
  IonModal,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonHeader,
  IonIcon,
} from "@ionic/react";
import "./QuickActivity.css";

function QuickActivity(props) {
  const authUser = JSON.parse(window.localStorage.getItem("authUser"));
  const [confirmModal, setConfirmModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showServerResponseModal, setShowServerResponseModal] = useState(false);
  const date = new Date();
  const notes = " ";
  const { name, category, picture, duration, productiveness } = props;

  const sendActivity = () => {
    // --- PREPARE AND FORMAT DATA ---
    const currentDate = date.toLocaleDateString("en-US");

    // --- SEND DATA TO FIRESTORE ---
    props.firebase.db
      .collection("users")
      .doc(`${authUser.uid}`)
      .collection("activities")
      .add({
        name: name,
        date: currentDate,
        duration: duration,
        category: category,
        productiveness: productiveness,
        notes: notes,
      })
      .then(() => {
        setSuccessMessage("Sucessfully saved activity!");
        setShowServerResponseModal(true);
      })
      .then(() => setTimeout(() => setShowServerResponseModal(false), 5000))
      .catch((error) => {
        setErrorMessage(error.message);
        setShowServerResponseModal(true);
      })
      .then(() => setTimeout(() => setShowServerResponseModal(false), 5000));
  };

  return (
    <>
      <IonCard className="quickactivity-container">
        <IonCardHeader className="subheading">{name}</IonCardHeader>
        <IonCardContent>
          <IonGrid>
            <IonRow>
              <img
                className="quickactivity-picture"
                src={picture}
                alt={`${name}`}
              />
            </IonRow>
            <IonRow>
              <IonCol>
                <IonRow className="row">
                  <IonText className="subheading">Duration:</IonText>
                </IonRow>
                <IonRow className="row">
                  <IonText className="subheading">{duration}</IonText>
                </IonRow>
              </IonCol>
              <IonCol>
                <IonRow className="row">
                  <IonText className="subheading">Category:</IonText>
                </IonRow>
                <IonRow className="row">
                  <IonText className="subheading">{category}</IonText>
                </IonRow>
              </IonCol>
            </IonRow>
            <IonRow className="row">
              <IonButton
                size="large"
                expand="full"
                color="tertiary"
                onClick={() => setConfirmModal(!confirmModal)}
              >
                +
              </IonButton>
            </IonRow>
          </IonGrid>
        </IonCardContent>
        {confirmModal ? (
          <IonContent>
            <IonModal isOpen={confirmModal}>
              <IonHeader>
                <IonToolbar className="ion-justify-content-center">
                  <IonTitle>Add Activity?</IonTitle>
                  <IonIcon name="close-circle-outline"></IonIcon>
                </IonToolbar>
              </IonHeader>

              <IonText color="primary">ASDASDASDASD</IonText>
              <IonGrid>
                <IonRow className="row">
                  <IonButton
                    className="ion-margin"
                    size="medium"
                    expand="block"
                    color="success"
                    onClick={() => setConfirmModal(!confirmModal)}
                  >
                    Yes, make me awesome!
                  </IonButton>
                  <IonButton
                    className="ion-margin"
                    size="medium"
                    expand="block"
                    color="danger"
                    onClick={() => setConfirmModal(!confirmModal)}
                  >
                    No, Close
                  </IonButton>
                </IonRow>
              </IonGrid>
            </IonModal>
          </IonContent>
        ) : null}
      </IonCard>
    </>
  );
}

export default withFirebase(QuickActivity);
