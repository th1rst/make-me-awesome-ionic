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
  IonHeader,
  IonIcon,
} from "@ionic/react";
import "./QuickActivity.css";
import { GiStrong } from "react-icons/gi";
import { AiFillCloseCircle } from "react-icons/ai";
import ServerResponseToast from "../ServerResponseToast";

function QuickActivity(props) {
  const authUser = JSON.parse(window.localStorage.getItem("authUser"));
  const [confirmModal, setConfirmModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showServerResponseToast, setShowServerResponseToast] = useState(false);
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
        setConfirmModal(false);
        setSuccessMessage("Sucessfully saved activity!");
        setShowServerResponseToast(true);
      })
      .catch((error) => {
        setConfirmModal(false);
        setErrorMessage(error.message);
        setShowServerResponseToast(true);
      });
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
                <IonToolbar>
                  <IonTitle className="modal-header">
                    <IonGrid>
                      <IonRow className="ion-justify-content-between">
                        <GiStrong size={32} fill={"green"} />
                        Quick Activity
                        <AiFillCloseCircle
                          size={32}
                          fill={"red"}
                          onClick={() => setConfirmModal(!confirmModal)}
                        />
                      </IonRow>
                    </IonGrid>
                  </IonTitle>
                  <IonIcon name="close-circle-outline"></IonIcon>
                </IonToolbar>
              </IonHeader>

              <IonText className="subheading ion-margin-top" color="primary">
                Are you sure you want to add the following activity:
              </IonText>
              <IonGrid>
                <IonRow>
                  <IonCol className="ion-margin">
                    <IonRow className="ion-margin">
                      <IonText className="subheading">Name: </IonText>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                      {name}
                    </IonRow>
                    <IonRow className="ion-margin">
                      <IonText className="subheading">Productivity: </IonText>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                      {productiveness}
                    </IonRow>
                  </IonCol>
                  <IonCol className="ion-margin">
                    <IonRow className="ion-margin">
                      <IonText className="subheading">Duration: </IonText>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                      {duration}
                    </IonRow>
                    <IonRow className="ion-margin">
                      <IonText className="subheading">Category: </IonText>
                    </IonRow>
                    <IonRow className="ion-justify-content-center">
                      {category}
                    </IonRow>
                  </IonCol>
                </IonRow>
                <IonRow className="ion-margin-top ion-justify-content-center">
                  <IonButton
                    className="ion-margin"
                    size="medium"
                    expand="block"
                    color="success"
                    onClick={sendActivity}
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
        {showServerResponseToast ? (
          <ServerResponseToast
            errorMessage={errorMessage}
            successMessage={successMessage}
          />
        ) : null}
      </IonCard>
    </>
  );
}

export default withFirebase(QuickActivity);
