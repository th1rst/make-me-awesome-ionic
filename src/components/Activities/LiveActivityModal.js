import React, { useState } from "react";
import { withFirebase } from "../Firebase/context";
import { Link } from "react-router-dom";
import {
  IonGrid,
  IonRow,
  IonSelectOption,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonContent,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon,
} from "@ionic/react";
import { GiStrong } from "react-icons/gi";
import { AiFillCloseCircle } from "react-icons/ai";

const defaultCategories = ["Work", "Leisure Time", "Workout"];
const defaultActivityTypes = ["Timer", "Counter"];
const defaultProductivityTypes = [
  "Productive",
  "Neutral / Necessary",
  "Unproductive",
];

function LiveActivityModal() {
  const [showModal, setShowModal] = useState(true);
  const [activityName, setActivityName] = useState("");
  const [categoryName, setCategoryName] = useState("Work");
  const [activityType, setActivityType] = useState("Timer");
  const [productivityType, setProductivityType] = useState("Productive");

  const isInvalid = activityName === "";

  return (
    <IonContent>
      <IonModal isOpen={showModal}>
        <IonHeader>
          <IonToolbar>
            <IonTitle className="modal-header">
              <IonGrid>
                <IonRow className="ion-justify-content-between">
                  <GiStrong size={32} fill={"green"} />
                  Start Live Activity
                  <AiFillCloseCircle
                    size={32}
                    fill={"red"}
                    onClick={() => setShowModal(!showModal)}
                  />
                </IonRow>
              </IonGrid>
            </IonTitle>
            <IonIcon name="close-circle-outline"></IonIcon>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            <IonItem>
              <IonLabel position="floating">Name</IonLabel>
              <IonInput
                value={activityName}
                placeholder={
                  isInvalid ? "Please name your Activity" : `${activityName}`
                }
                onIonChange={(e) => setActivityName(e.detail.value)}
              />
            </IonItem>
          </IonRow>
          <IonRow>
            <IonItem>
              <IonLabel position="floating">Category</IonLabel>
              <IonSelect
                value={categoryName}
                placeholder="Select Category"
                onIonChange={(e) => setCategoryName(e.detail.value)}
              >
                {defaultCategories.map((entry) => (
                  <IonSelectOption value={entry} key={entry}>
                    {entry}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </IonRow>
          <IonRow>
            <IonItem>
              <IonLabel position="floating">Type</IonLabel>
              <IonSelect
                value={activityType}
                placeholder="Select Type"
                onIonChange={(e) => setActivityType(e.detail.value)}
              >
                {defaultActivityTypes.map((type) => (
                  <IonSelectOption value={type} key={type}>
                    {type}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </IonRow>
          <IonRow>
            <IonItem>
              <IonLabel position="floating">Productivity</IonLabel>
              <IonSelect
                value={productivityType}
                placeholder="Select Type"
                onIonChange={(e) => setProductivityType(e.detail.value)}
              >
                {defaultProductivityTypes.map((type) => (
                  <IonSelectOption value={type} key={type}>
                    {type}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </IonRow>
          <IonRow className="ion-margin-top ion-justify-content-center">
            <Link
              to={{
                pathname: "/activity",
                state: {
                  showModal,
                  activityName,
                  categoryName,
                  activityType,
                  productivityType,
                },
              }}
              style={{ textDecoration: "none" }}
            >
              <IonButton
                className="ion-margin"
                size="medium"
                expand="block"
                color="success"
                disabled={isInvalid}
                onClick={() => setShowModal}
              >
                Start Live Activity
              </IonButton>
            </Link>
          </IonRow>
        </IonGrid>
      </IonModal>
    </IonContent>
  );
}

export default withFirebase(LiveActivityModal);
