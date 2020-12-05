import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import ServerResponseToast from "../ServerResponseToast";
import {
  IonButton,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
} from "@ionic/react";
import { withFirebase } from "../Firebase/context";

const defaultCategories = ["Work", "Leisure Time", "Workout"];
const defaultProductivityTypes = [
  "Productive",
  "Neutral / Necessary",
  "Unproductive",
];

function QuickActivitySettings(props) {
  const authUser = JSON.parse(window.localStorage.getItem("authUser"));
  const [quickActivities, setQuickActivities] = useState([]);
  const [activityName, setActivityName] = useState("");
  const [activityDuration, setActivityDuration] = useState("");
  const [productivityType, setProductivityType] = useState("Productive");
  const [categoryName, setCategoryName] = useState("Work");
  const [activityPictureURL, setActivityPictureURL] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showServerResponseToast, setShowServerResponseToast] = useState(false);
  const date = new Date();

  useEffect(() => {
    getQuickActivities();
  }, []);

  const getQuickActivities = async () => {
    const response = await props.firebase.db
      .collection("users")
      .doc(`${authUser.uid}`)
      .collection("quickActivities")
      .get()
      .then(function (querySnapshot) {
        const quickActivityData = [];

        querySnapshot.forEach(function (doc) {
          quickActivityData.push({
            id: doc.id,
            name: doc.data().name,
            date: doc.data().date,
            duration: doc.data().duration,
            productiveness: doc.data().productiveness,
            category: doc.data().category,
            activityPictureURL: doc.data().activityPictureURL,
          });
        });
        return quickActivityData;
      });
    setQuickActivities(response);
  };

  const applyQuickActivity = () => {
    // --- PREPARE AND FORMAT DATA ---
    const defaultPictureUrl =
      "https://images.unsplash.com/photo-1535981767287-35259dbf7d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80";

    const userDefinedPictureURL =
      activityPictureURL !== "" ? activityPictureURL : defaultPictureUrl;

    // --- SEND DATA TO FIRESTORE ---
    props.firebase.db
      .collection("users")
      .doc(`${authUser.uid}`)
      .collection("quickActivities")
      .add({
        name: activityName,
        date: date.toLocaleDateString("en-US"),
        duration: activityDuration,
        category: categoryName,
        productiveness: productivityType,
        notes: " ",
        activityPictureURL: userDefinedPictureURL,
      })
      .then(() => {
        setSuccessMessage("Sucessfully saved QuickActivity!");
        setShowServerResponseToast(true);
        setActivityName("");
        setCategoryName("Work");
        setActivityPictureURL("");
        setActivityDuration("");
      })
      .then(() => getQuickActivities())
      .catch((error) => {
        setErrorMessage(error.message);
        setShowServerResponseToast(true);
      });
  };

  const deleteQuickActivity = async (id) => {
    await props.firebase.db
      .collection("users")
      .doc(`${authUser.uid}`)
      .collection("quickActivities")
      .doc(`${id}`)
      .delete()
      .then(() => {
        setSuccessMessage("Activity successfully deleted.");
        setShowServerResponseToast(true);
      })
      .then(() => getQuickActivities())
      .catch((error) => {
        setErrorMessage(error.message);
        setShowServerResponseToast(true);
      });
  };

  const validateNumbersOnly = (input) => {
    const regexp = /^[0-9\b]+$/;
    return regexp.test(input);
  };

  const isInvalid = activityName === "" || activityDuration === "";

  return (
    <>
      {!quickActivities ? (
        <IonLoading />
      ) : (
        <>
          <IonGrid className="ion-margin">
            {quickActivities.length === 0 ? (
              <IonRow className="row">
                <IonText className="subheading">
                  You have not set up QuickActivities yet.
                </IonText>
              </IonRow>
            ) : (
              <>
                <IonRow className="row">
                  <IonText className="heading">
                    Current QuickActivities:
                  </IonText>
                </IonRow>

                {quickActivities.map((quickActivity) => (
                  <IonItem className="ion-margin">
                    <IonRow className="row">
                      <IonRow className="row ion-margin">
                        <IonText className="subheading">
                          {quickActivity.name}
                        </IonText>
                      </IonRow>
                      <IonRow className="row ion-margin">
                        {quickActivity.productiveness}
                      </IonRow>
                      <img
                        className="ion-margin"
                        src={`${quickActivity.activityPictureURL}`}
                        alt="user specified activity"
                      />

                      <IonButton
                        color="danger"
                        className="ion-margin"
                        expand="block"
                        onClick={() => deleteQuickActivity(quickActivity.id)}
                      >
                        <FaTrash size={20} className="ion-margin-horizontal" />
                        delete
                      </IonButton>
                    </IonRow>
                  </IonItem>
                ))}
              </>
            )}
            <IonRow className="row">
              <IonText className="heading">Add QuickActivity</IonText>
            </IonRow>
            <IonItem>
              <IonLabel>
                Name<IonText color="danger">*</IonText>
              </IonLabel>
              <IonInput
                placeholder="Please name your Activity"
                value={activityName}
                onIonChange={(e) => setActivityName(e.target.value)}
              />
            </IonItem>

            <IonItem>
              <IonLabel>Category</IonLabel>
              <IonSelect
                value={categoryName}
                placeholder="Category"
                onIonChange={(e) => setCategoryName(e.target.value)}
              >
                {defaultCategories.map((type) => (
                  <IonSelectOption value={type} key={type}>
                    {type}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel>
                Duration (minutes)<IonText color="danger">*</IonText>
              </IonLabel>
              <IonInput
                placeholder={`How long do you usually do ${
                  activityName ? activityName : "(Name)"
                } for (in minutes)?`}
                value={activityDuration}
                onIonChange={(e) => setActivityDuration(e.target.value)}
                valid={validateNumbersOnly(activityDuration)}
              />
            </IonItem>

            <IonItem>
              <IonLabel>Productivity</IonLabel>
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

            <IonItem>
              <IonLabel>Activity Picture URL</IonLabel>
              <IonInput
                placeholder="Please paste a URL of your desired Activity Picture"
                value={activityPictureURL}
                onIonChange={(e) => setActivityPictureURL(e.target.value)}
              />
            </IonItem>
            <IonButton onClick={applyQuickActivity} disabled={isInvalid}>
              Apply
            </IonButton>

            {/* ------------- SERVER RESPONSE MODAL ------------- */}

            {showServerResponseToast ? (
              <ServerResponseToast
                errorMessage={errorMessage}
                successMessage={successMessage}
              />
            ) : null}
          </IonGrid>
        </>
      )}
    </>
  );
}

export default withFirebase(QuickActivitySettings);
