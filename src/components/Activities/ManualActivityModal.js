import React, { useState } from "react";
import { withFirebase } from "../Firebase/context";
import ServerResponseToast from "../ServerResponseToast";
import {
  IonButton,
  IonContent,
  IonGrid,
  IonRow,
  IonSelectOption,
  IonText,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
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

function ManualActivityModal(props) {
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const [showModal, setShowModal] = useState(true);
  const [activityName, setActivityName] = useState("");
  const [categoryName, setCategoryName] = useState("Work");
  const [activityType, setActivityType] = useState("Timer");
  const [productivityType, setProductivityType] = useState("Productive");
  const [activityDuration, setActivityDuration] = useState("");
  const [howOftenCount, setHowOftenCount] = useState("");
  const [howLongPerCount, setHowLongPerCount] = useState("");
  const [notes, setNotes] = useState(" ");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showServerResponseToast, setShowServerResponseToast] = useState(false);
  const [date, setDate] = useState(new Date());

  const checkProductivityType = (type) => {
    switch (type) {
      case "Productive":
        return "text-green-500";
      case "Neutral / Necessary":
        return "text-yellow-400";
      case "Unproductive":
        return "text-red-500";
      default:
        break;
    }
  };

  const validateNumbersOnly = (input) => {
    const regexp = /^[0-9\b]+$/;
    return regexp.test(input);
  };

  const calculateActivityTime = () => {
    //only return value if there is something to calculate, otherwise return/display 0
    if (howOftenCount * howLongPerCount) {
      return howOftenCount * howLongPerCount;
    }
    return 0;
  };

  const sendActivity = () => {
    // --- PREPARE AND FORMAT DATA ---
    const userID = authUser.uid;
    const userDate = date.toLocaleDateString("en-US");

    let duration;
    //if user inputs the duration in minutes, take this value
    if (activityType === "Timer") {
      duration = activityDuration;
    }
    //otherwise, calculate it from HowOften + HowLong
    else {
      duration = calculateActivityTime().toString();
    }

    // --- SEND DATA TO FIRESTORE ---
    props.firebase.db
      .collection("users")
      .doc(`${userID}`)
      .collection("activities")
      .add({
        name: activityName,
        date: userDate,
        duration: duration,
        category: categoryName,
        productiveness: productivityType,
        notes: notes,
      })
      .then(() => {
        setSuccessMessage("Sucessfully saved activity!");
        setShowModal(false);
        setShowServerResponseToast(true);
        setActivityName("");
        setCategoryName("Work");
        setActivityType("Timer");
        setProductivityType("Productive");
        setActivityDuration("");
        setNotes("");
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setShowModal(false);
        setShowServerResponseToast(true);
      });
  };

  const isInvalid = activityName === "";

  return (
    <>
      {showModal ? (
        <IonContent>
          <IonModal isOpen={showModal}>
            <IonHeader>
              <IonToolbar>
                <IonTitle className="modal-header">
                  <IonGrid>
                    <IonRow className="ion-justify-content-between">
                      <GiStrong size={32} fill={"green"} />
                      Manually Enter An Activity
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
                    onChange={(e) => setActivityName(e.target.value)}
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
                      <IonSelectOption value={entry}>{entry}</IonSelectOption>
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
                      <IonSelectOption value={type}>{type}</IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
              </IonRow>
              <IonRow>
                <IonText className="subheading ion-margin-top" color="primary">
                  TIMER / COUNTER
                </IonText>
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
                      <IonSelectOption value={type}>{type}</IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
              </IonRow>
              <IonRow>
                <IonText className="subheading ion-margin-top" color="primary">
                  DATE PICKER
                </IonText>
              </IonRow>
              <IonRow>
                <IonItem>
                  <IonLabel position="floating">Notes</IonLabel>
                  <IonInput
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </IonItem>
              </IonRow>
            </IonGrid>
          </IonModal>
        </IonContent>
      ) : null}

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

export default withFirebase(ManualActivityModal);
