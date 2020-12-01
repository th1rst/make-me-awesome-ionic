import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonButton,
  IonLoading,
  IonContent,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import Navbar from "../components/Navigation/Navbar";
import "./pages.css";
import { withFirebase } from "../components/Firebase/context";
import QuickActivity from "../components/Activities/QuickActivity";
import SmallDonutChart from "../components/Activities/SmallDonutChart";
import SmallBarChart from "../components/Activities/SmallBarChart";
import ManualActivityModal from "../components/Activities/ManualActivityModal";
import LiveActivityModal from "../components/Activities/LiveActivityModal";
import { Link } from "react-router-dom";

function Overview(props) {
  const authUser = JSON.parse(window.localStorage.getItem("authUser"));
  const [loading, setLoading] = useState(true);
  const [firestoreActivities, setFirestoreActivities] = useState(null);
  const [randomQuote, setRandomQuote] = useState("");
  const [username, setUsername] = useState(null);
  const [daysToDisplay, setDaysToDisplay] = useState(7);
  const [bannerURL, setBannerURL] = useState(null);
  const [quickActivities, setQuickActivities] = useState(null);
  const [showManualActivityModal, setShowManualActivityModal] = useState(false);
  const [showLiveActivityModal, setShowLiveActivityModal] = useState(false);

  const defaultBanner =
    "https://images.unsplash.com/photo-1500856056008-859079534e9e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80";

  useEffect(() => {
    getQuote();
    getActivityData();
    getUserData();
    getQuickActivities();
  }, []);

  const getActivityData = async () => {
    const response = await props.firebase.db
      .collection("users")
      .doc(`${authUser.uid}`)
      .collection("activities")
      .get()
      .then((querySnapshot) => {
        const activityData = [];

        querySnapshot.forEach(function (doc) {
          activityData.push({
            id: doc.id,
            name: doc.data().name,
            date: doc.data().date,
            duration: doc.data().duration,
            productiveness: doc.data().productiveness,
            category: doc.data().category,
            notes: doc.data().notes,
          });
        });
        return activityData;
      });
    setFirestoreActivities(response);
  };

  const getUserData = async () => {
    await props.firebase.db
      .collection("users")
      .doc(`${authUser.uid}`)
      .get()
      .then((response) => {
        setUsername(response.data().name);
        setBannerURL(response.data().bannerURL);
      });
  };

  const getQuickActivities = async () => {
    const response = await props.firebase.db
      .collection("users")
      .doc(`${authUser.uid}`)
      .collection("quickActivities")
      .get()
      .then(function (querySnapshot) {
        const quickActivityData = [];

        querySnapshot.forEach((doc) => {
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
    setLoading(false);
  };

  const getQuote = async () => {
    const random = Math.floor(Math.random() * 500);

    await fetch("https://type.fit/api/quotes")
      .then((response) => response.json())
      .then((data) => setRandomQuote(data[random].text));
  };

  return (
    <IonPage>
      {loading ? (
        <IonLoading />
      ) : (
        <>
          <Navbar />
          <IonContent fullscreen>
            <IonImg
              className="banner-image"
              src={bannerURL ? bannerURL : defaultBanner}
            />
            <IonGrid className="container">
              <IonRow className="row ion-justify-content-center">
                <IonText className="welcome-text">Welcome back,</IonText>
                <IonText className="username-text">{username}</IonText>
              </IonRow>
              <IonRow className="row button-container">
                <IonCol>
                  <IonRow className="ion-justify-content-center ion-margin">
                    <Link
                      to="/all-activities"
                      style={{ textDecoration: "none" }}
                    >
                      <IonButton>Show All</IonButton>
                    </Link>
                  </IonRow>
                  <IonRow className="ion-justify-content-center ion-margin">
                    <IonButton onClick={() => setShowLiveActivityModal(true)}>
                      Start Live Activity
                    </IonButton>
                  </IonRow>
                  <IonRow className="ion-justify-content-center ion-margin">
                    <IonButton onClick={() => setShowManualActivityModal(true)}>
                      Manual Entry
                    </IonButton>
                  </IonRow>
                </IonCol>
              </IonRow>
              <IonRow className="row ion-justify-content-center ion-padding">
                <IonText className="quote-text">
                  &quot;{randomQuote}&quot;
                </IonText>
              </IonRow>
            </IonGrid>
            <IonGrid>
              <IonRow className="row">
                {quickActivities.length > 0 ? (
                  <IonText className="heading">Quick Activities</IonText>
                ) : null}
              </IonRow>
              <IonRow className="row ion-margin-bottom">
                {quickActivities
                  ? quickActivities.map((activity) => (
                      <QuickActivity
                        name={activity.name}
                        id={activity.id}
                        category={activity.category}
                        picture={activity.activityPictureURL}
                        duration={activity.duration}
                        productiveness={activity.productiveness}
                        key={activity.id}
                      />
                    ))
                  : null}
              </IonRow>
              <IonRow className="row ion-margin-top">
                <IonText className="heading ion-margin-top">Overview</IonText>
              </IonRow>

              <IonItem>
                <IonLabel className="ion-text-center">Show Last</IonLabel>
                <IonSelect
                  className="ion-text-center"
                  value={daysToDisplay}
                  okText="Select"
                  cancelText="Cancel"
                  onIonChange={(e) => setDaysToDisplay(e.detail.value)}
                >
                  <IonSelectOption value={7}>7 days</IonSelectOption>
                  <IonSelectOption value={30}>30 days</IonSelectOption>
                  <IonSelectOption value={90}>90 days</IonSelectOption>
                  <IonSelectOption value={365}>365 days</IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonRow className="ion-margin row">
                <SmallDonutChart
                  daysToFilter={daysToDisplay}
                  categoryToDisplay={"Productive"}
                  firestoreActivities={firestoreActivities}
                />
              </IonRow>
              <IonRow className="ion-margin row">
                <SmallBarChart
                  daysToFilter={daysToDisplay}
                  categoryToDisplay={"Productive"}
                  firestoreActivities={firestoreActivities}
                />
              </IonRow>
              <IonRow className="ion-margin row">
                <SmallBarChart
                  daysToFilter={daysToDisplay}
                  categoryToDisplay={"Neutral / Necessary"}
                  firestoreActivities={firestoreActivities}
                />
              </IonRow>
              <IonRow className="ion-margin row">
                <SmallBarChart
                  daysToFilter={daysToDisplay}
                  categoryToDisplay={"Unproductive"}
                  firestoreActivities={firestoreActivities}
                />
              </IonRow>
            </IonGrid>

            {showManualActivityModal ? <ManualActivityModal /> : null}

            {showLiveActivityModal ? <LiveActivityModal /> : null}
          </IonContent>
        </>
      )}
    </IonPage>
  );
}

export default withFirebase(Overview);
