import React, { useState, useEffect } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonAvatar,
  IonItem,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonListHeader,
  IonLabel,
  IonList,
} from "@ionic/react";
import "./navbar.css";
import { withFirebase } from "../Firebase/context";

export function Navbar(props) {
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const { photoURL, email } = authUser;
  const [username, setUsername] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserData();
  });

  const defaultImage =
    "https://images.unsplash.com/photo-1592439120548-78ea7b42398e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80";

  const getUserData = async () => {
    await props.firebase.db
      .collection("users")
      .doc(`${authUser.uid}`)
      .get()
      .then((response) => {
        setUsername(response.data().name);
        setLoading(false);
      });
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton
              auto-hide="false"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            />
          </IonButtons>
          <IonButtons slot="end">
            <IonAvatar
              className="avatar"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <img
                src={photoURL ? `${photoURL}` : `${defaultImage}`}
                alt="avatar"
              />
            </IonAvatar>
          </IonButtons>

          <IonTitle center>Blank</IonTitle>
        </IonToolbar>

        {sidebarOpen ? (
          <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>Home, All Activities etc</IonCardSubtitle>
              <IonCardTitle>SIDEBAR</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              Keep close to Nature's heart... and break clear away, once in
              awhile, and climb a mountain or spend a week in the woods. Wash
              your spirit clean.
            </IonCardContent>
          </IonCard>
        ) : null}

        {userMenuOpen ? (
          <IonList>
            <IonListHeader>
              <IonLabel>List Header</IonLabel>
            </IonListHeader>

            <IonCardContent>
              Keep close to Nature's heart... and break clear away, once in
              awhile, and climb a mountain or spend a week in the woods. Wash
              your spirit clean.
            </IonCardContent>
          </IonList>
        ) : null}
      </IonHeader>
    </>
  );
}

export default withFirebase(Navbar);
