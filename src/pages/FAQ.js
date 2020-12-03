import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import React, { useState } from "react";
import Navbar from "../components/Navigation/Navbar";
import "./pages.css";

export default function FAQ(props) {
  const [whatIsThis, showWhatIsThis] = useState(false);
  const [howToUse, showHowToUse] = useState(false);
  const [whyUseIt, showWhyUseIt] = useState(false);
  const [whyActivities, showWhyActivities] = useState(false);
  const [whatAreQuickActivities, showWhatAreQuickActivities] = useState(false);
  const [moreFeatures, showMoreFeatures] = useState(false);

  return (
    <IonPage>
      <Navbar />
      <IonContent>
        <IonGrid>
          <IonRow className="row">
            <IonText className="heading" color="primary">
              Frequently Asked Questions
            </IonText>
          </IonRow>
          <IonRow>
            <p className="subheading ion-margin">
              The most common questions about how to operate this WebApp
            </p>
          </IonRow>

          <IonButton
            className="ion-margin"
            expand="full"
            onClick={() => showWhatIsThis(!whatIsThis)}
          >
            What is this?
          </IonButton>
          {whatIsThis ? (
            <IonRow className="ion-margin">
              <b>Make Me Awesome</b> is a personal activity and productivity
              tracker.
            </IonRow>
          ) : null}

          <IonButton
            className="ion-margin"
            expand="block"
            onClick={() => showHowToUse(!howToUse)}
          >
            How can i use it?
          </IonButton>
          {howToUse ? (
            <IonRow className="ion-margin">
              <IonRow className="row">
                There are two ways to input your daily activities:
              </IonRow>
              <IonRow className="ion-margin-vertical row subheading">
                Live Activity:
              </IonRow>
              <IonRow className="row ion-text-justify">
                First, you have to label your activity into a category: <br />
                Productive / Neutral / Unproductive There's a Stopwatch for you
                to track your current activity. When you're done, just press
                save and send the activity data to our Server. Alternatively,
                you can youse a Counter. Just specify how long your Activity
                took and how often you've done it. The total duration gets
                calculated for you. When you're done, just send the activity
                data to our Server.
              </IonRow>
              <IonRow className="ion-margin-vertical row subheading">
                Manual Activity:
              </IonRow>
              <IonRow className="row ion-text-justify">
                Here you can add activities that have already taken place and
                you have full control over what data is being used (e.g. date /
                total duration)
              </IonRow>
            </IonRow>
          ) : null}

          <IonButton
            className="ion-margin"
            expand="block"
            onClick={() => showWhyUseIt(!whyUseIt)}
          >
            Why should I use it?
          </IonButton>

          {whyUseIt ? (
            <IonRow className="ion-margin">
              <IonRow className="row ion-text-justify">
                At first, it might not seem very useful, but think of it like a
                fine wine: the more it matures, the more awesome it gets. In
                other words: the more activitíes you enter, the better the
                overview about your productiveness will get.
              </IonRow>
              <IonRow className="row ion-text-justify ion-margin-vertical">
                Over time, you'll have an amazing overview about your productive
                strengths and weaknesses. To get a good idea about how an
                account filled with activity data can look like, login with the
                following credentials:
              </IonRow>
              <IonRow>
                <IonCol>
                  <b>Username:</b>
                </IonCol>
                <IonCol>
                  <i>john@doe.com</i>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <b>Password: </b>
                </IonCol>
                <IonCol>
                  <i>testuser123</i>
                </IonCol>
              </IonRow>
            </IonRow>
          ) : null}
          <IonButton
            className="ion-margin"
            expand="block"
            onClick={() => showWhyActivities(!whyActivities)}
          >
            Why did my activities not count as one?
          </IonButton>
          {whyActivities ? (
            <IonRow className="ion-margin">
              <IonRow className="row ion-text-justify">
                While case doesn't matter (e.g. "Watching TV") and "WaTcHiNG tV"
                get counted as one activity, "Browsing the web" and "Browsing"
                will get counted as seperate activities.
                <br />
                It's best practice to keep the names the same.
              </IonRow>
            </IonRow>
          ) : null}

          <IonButton
            className="ion-margin"
            expand="block"
            onClick={() => showWhatAreQuickActivities(!whatAreQuickActivities)}
          >
            What are QuickActivities?
          </IonButton>
          {whatAreQuickActivities ? (
            <IonRow className="ion-margin">
              <IonRow className="ion-margin-vertical row subheading">
                They are pre-defined activities.
              </IonRow>
              <IonRow className="row ion-text-justify">
                Everyone has certain activities that are being done everyday
                (for example "Cooking Dinner for 30 minutes" or "Workout for 60
                minutes").
              </IonRow>
              <IonRow className="row ion-text-justify">
                You can define them once and they get added to your personal
                Overview. Once set up, you just have to click on the plus-icon
                and they automatically get tracked.
              </IonRow>
            </IonRow>
          ) : null}

          <IonButton
            className="ion-margin"
            expand="block"
            onClick={() => showMoreFeatures(!moreFeatures)}
          >
            Will there be more features in the future?
          </IonButton>
          {moreFeatures ? (
            <IonRow className="ion-margin">
              <IonRow className="ion-margin-vertical row subheading">
                Absolutely!
              </IonRow>
              <IonRow className="row ion-text-justify">
                We are always looking to improve this site.
                <br />
                If you have any criticism or suggestions, just send us an email.
                Don't be shy! We have cookies.
              </IonRow>
            </IonRow>
          ) : null}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
