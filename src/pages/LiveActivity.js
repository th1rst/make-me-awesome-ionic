import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withFirebase } from "../components/Firebase/context";
import Navbar from "../components/Navigation/Navbar";
import Timer from "react-compound-timer";
import {
  FiPlayCircle,
  FiPauseCircle,
  FiTrash2,
  FiSave,
  FiMinusSquare,
  FiPlusSquare,
} from "react-icons/fi";
import { FaExclamationTriangle } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaRegClock } from "react-icons/fa";
import "./pages.css";
import ServerResponseToast from "../components/ServerResponseToast";
import {
  IonContent,
  IonGrid,
  IonText,
  IonPage,
  IonRow,
  IonBadge,
  IonCard,
  IonTextarea,
  IonButton,
} from "@ionic/react";

function LiveActivity(props) {
  const authUser = JSON.parse(window.localStorage.getItem("authUser"));
  const [activityDuration, setActivityDuration] = useState(0);
  const [activityCount, setActivityCount] = useState(0);
  const [timePerCount, setTimePerCount] = useState(5);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showServerResponseToast, setShowServerResponseToast] = useState(false);
  const [notes, setNotes] = useState(" ");
  const date = new Date();

  const {
    activityName,
    activityType,
    productivityType,
    categoryName,
  } = props.history.location.state;

  const checkProductivity = (type) => {
    switch (type) {
      case "Productive":
        return <IonBadge color="success">{type}</IonBadge>;
      case "Neutral / Necessary":
        return <IonBadge color="warning">{type}</IonBadge>;
      case "Unproductive":
        return <IonBadge color="danger">{type}</IonBadge>;
      default:
        break;
    }
  };

  const saveActivityTime = (time) => {
    //compound Timer's "getTime()" function returns in milliseconds, that's too detailed
    const stringOfTime = time.toString();
    const formattedTimeInMinutes = Math.floor(
      stringOfTime.substring(0, stringOfTime.length - 3) / 60
    );

    setActivityDuration(formattedTimeInMinutes);
  };

  const calculateActivityTime = () => activityCount * timePerCount;

  const sendActivity = () => {
    // --- PREPARE AND FORMAT DATA ---
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
      .doc(`${authUser.uid}`)
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
        setTimeout(() => {
          props.history.push("/overview");
        }, 3000);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setShowServerResponseToast(true);
        setTimeout(() => {
          props.history.push("/overview");
        }, 3000);
      });
  };

  return (
    <IonPage>
      <>
        {console.log(props)}
        {activityName ? (
          <>
            <Navbar />
            <IonContent fullscreen>
              <IonCard>
                <IonGrid>
                  <IonRow>
                    <IonText color="primary" className="heading">
                      {activityName}
                    </IonText>
                  </IonRow>
                  <IonRow>
                    {activityType === "Timer" ? (
                      <>
                        <FaRegClock className="w-20 h-20 self-center" />
                        <IonText className="subheading">{activityType}</IonText>
                      </>
                    ) : (
                      <>
                        <FiPlusSquare className="w-20 h-20 self-center" />
                        <IonText className="subheading">{activityType}</IonText>
                      </>
                    )}
                  </IonRow>
                  <IonRow>{checkProductivity(productivityType)}</IonRow>
                  <IonRow>
                    {activityType === "Timer" ? (
                      <Timer
                        initialTime={0}
                        startImmediately={false}
                        formatValue={(value) =>
                          `${value < 10 ? `0${value}` : value}`
                        }
                      >
                        {({ start, stop, reset, getTime }) => (
                          <>
                            <Timer.Hours />:
                            <Timer.Minutes />:
                            <Timer.Seconds />
                            <IonButton onClick={start}>
                              <FiPlayCircle />
                              Start
                            </IonButton>
                            <IonButton onClick={stop}>
                              <FiPauseCircle />
                              Pause
                            </IonButton>
                            <IonButton
                              onClick={() => {
                                stop();
                                reset();
                              }}
                            >
                              <FiTrash2 />
                              Reset
                            </IonButton>
                            <IonButton
                              onClick={() => {
                                stop();
                                saveActivityTime(getTime());
                              }}
                            >
                              <FiSave />
                              Save
                            </IonButton>
                          </>
                        )}
                      </Timer>
                    ) : (
                      <>
                        {/* ------------- COUNTER VARIANT ------------- */}
                        <IonButton
                          onClick={() => {
                            calculateActivityTime();
                            setActivityCount(activityCount - 1);
                          }}
                        >
                          <FiMinusSquare />
                        </IonButton>
                        Count: {activityCount}
                        <IonButton
                          onClick={() => {
                            calculateActivityTime();
                            setActivityCount(activityCount + 1);
                          }}
                        >
                          <FiPlusSquare />
                        </IonButton>
                        <IonButton
                          onClick={() => {
                            calculateActivityTime();
                            setTimePerCount(timePerCount - 1);
                          }}
                        >
                          <FiMinusSquare />
                        </IonButton>
                        Time per count: <br />
                        {timePerCount} Minutes
                        <IonButton
                          onClick={() => {
                            calculateActivityTime();
                            setTimePerCount(timePerCount + 1);
                          }}
                        >
                          <FiPlusSquare />
                        </IonButton>
                        <p>
                          Total time spent on {activityName}:{" "}
                          {calculateActivityTime()} Minutes
                        </p>
                      </>
                    )}
                  </IonRow>
                </IonGrid>
              </IonCard>
              <IonCard>
                <IonText className="subheading">Add a Note:</IonText>
                <IonTextarea
                  value={notes}
                  onIonChange={(e) => setNotes(e.detail.value)}
                />
              </IonCard>
              <IonGrid>
                <IonRow className="ion-margin-top ion-justify-content-center">
                  <IonButton
                    className="ion-margin"
                    size="medium"
                    expand="block"
                    color="success"
                    onClick={() => sendActivity()}
                  >
                    Save Activity
                  </IonButton>
                </IonRow>
              </IonGrid>
            </IonContent>
          </>
        ) : (
          <IonText className="heading" color="primary">
            Please start your activity correctly.
          </IonText>
        )}

        {/* ------------- SERVER RESPONSE TOAST ------------- */}

        {showServerResponseToast ? (
          <ServerResponseToast
            errorMessage={errorMessage}
            successMessage={successMessage}
          />
        ) : null}
      </>
    </IonPage>
  );
}

export default withFirebase(LiveActivity);
