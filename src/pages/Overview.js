import React, { useEffect, useState } from "react";
import withAuthorization from "../components/Session/withAuthorization";
import { IonPage, IonText, IonLoading, IonContent } from "@ionic/react";
import Navbar from "../components/Navigation/Navbar";
import { withFirebase } from "../components/Firebase/context";

function Overview(props) {
  const authUser = JSON.parse(window.localStorage.getItem("authUser"));
  const [loading, setLoading] = useState(true);
  const [firestoreActivities, setFirestoreActivities] = useState(null);
  const [randomQuote, setRandomQuote] = useState("");
  const [username, setUsername] = useState(null);
  const [daysToDisplay, setDaysToDisplay] = useState(7);
  const [bannerURL, setBannerURL] = useState(null);
  const [quickActivities, setQuickActivities] = useState(null);

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
            <IonText color="primary">ASDASDASDASD</IonText>
          </IonContent>
        </>
      )}
    </IonPage>
  );
}

export default withFirebase(Overview);
