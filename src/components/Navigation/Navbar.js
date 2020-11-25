import React, { useState, useEffect } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonAvatar,
  IonItem,
} from "@ionic/react";
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
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton
            auto-hide="false"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          ></IonMenuButton>
        </IonButtons>
        <IonButtons slot="end">
          <IonItem>
            <IonAvatar onClick={() => setUserMenuOpen(!userMenuOpen)}>
              <img
                src={photoURL ? `${photoURL}` : `${defaultImage}`}
                alt="avatar"
              />
            </IonAvatar>
          </IonItem>
        </IonButtons>

        <IonTitle center>Blank</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
}

export default withFirebase(Navbar);
