import React, { useState } from "react";
import { withFirebase } from "../Firebase/context";
import ServerResponseToast from "../ServerResponseToast";
import {
  IonGrid,
  IonRow,
  IonSelectOption,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
} from "@ionic/react";
import { DatePicker } from "react-rainbow-components";

const defaultCategories = ["Work", "Leisure Time", "Workout"];
const defaultActivityTypes = ["Timer", "Counter"];
const defaultProductivityTypes = [
  "Productive",
  "Neutral / Necessary",
  "Unproductive",
];

function ManualActivityModalForm(props) {
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
        setShowServerResponseToast(true);
      });
  };

  const isInvalid = activityName === "";

  return (
    <>
      {showModal ? (
        <>
          <IonGrid>
            <IonRow>
              <IonItem>
                <IonLabel position="floating">Name</IonLabel>
                <IonInput
                  value={activityName}
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
            {activityType === "Timer" ? (
              <IonRow>
                <IonItem>
                  <IonLabel position="floating">
                    Duration (minutes)<span style={{ color: "red" }}>*</span>
                  </IonLabel>

                  <IonInput
                    value={activityDuration}
                    placeholder={`How long did you do ${
                      activityName ? activityName : "(Name)"
                    } for (in minutes)?`}
                    onIonChange={(e) => setActivityDuration(e.detail.value)}
                    valid={validateNumbersOnly(activityDuration)}
                  />
                </IonItem>
              </IonRow>
            ) : (
              <>
                {/* ------------- COUNTER VARIANT ------------- */}
                <IonRow>
                  <IonItem>
                    <IonLabel position="floating">
                      How many times did you do{" "}
                      {activityName ? activityName : <i>(Activity Name)</i>}?
                    </IonLabel>

                    <IonInput
                      value={howOftenCount}
                      placeholder="Only numbers allowed"
                      onIonChange={(e) => setHowOftenCount(e.detail.value)}
                      valid={validateNumbersOnly(howOftenCount)}
                    />
                  </IonItem>
                </IonRow>
                <IonRow>
                  <IonItem>
                    <IonLabel position="floating">
                      How long each time (in minutes)?
                    </IonLabel>

                    <IonInput
                      value={howLongPerCount}
                      placeholder="Only numbers allowed"
                      onIonChange={(e) => setHowLongPerCount(e.detail.value)}
                      valid={validateNumbersOnly(howLongPerCount)}
                    />
                  </IonItem>
                </IonRow>
              </>
            )}
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
            <IonRow>
              <IonItem>
                <DatePicker value={date} onChange={(value) => setDate(value)} />
              </IonItem>
            </IonRow>
            <IonRow>
              <IonItem>
                <IonLabel position="floating">Notes</IonLabel>
                <IonInput
                  value={notes}
                  onIonChange={(e) => setNotes(e.detail.value)}
                />
              </IonItem>
            </IonRow>
            <IonRow className="ion-margin-top ion-justify-content-center">
              <IonButton
                className="ion-margin"
                size="medium"
                expand="block"
                color="success"
                onClick={sendActivity}
                disabled={isInvalid}
              >
                Save Activity
              </IonButton>
            </IonRow>
          </IonGrid>
        </>
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

export default withFirebase(ManualActivityModalForm);
