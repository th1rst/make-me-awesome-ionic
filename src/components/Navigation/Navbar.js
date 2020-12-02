import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonAvatar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonListHeader,
  IonLabel,
  IonList,
  IonGrid,
  IonRow,
  IonText,
  IonItem,
  IonIcon,
} from "@ionic/react";
import "./navbar.css";
import { FaHome, FaClipboardList } from "react-icons/fa";
import { FiSettings, FiLogOut } from "react-icons/fi";
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

          <IonTitle>
            <IonGrid>
              <IonRow className="ion-justify-content-center">
                <Link to="/overview" className="nav-link">
                  <IonText>Make Me Awesome</IonText>
                </Link>
              </IonRow>
            </IonGrid>
          </IonTitle>
        </IonToolbar>

        {sidebarOpen ? (
          <IonItem>
            <IonGrid>
              <Link to="/overview" className="nav-link">
                <IonRow className="nav-row ion-margin-vertical">
                  <FaHome size={32} color="gray" />
                  <p className="ion-margin-horizontal">Home</p>
                </IonRow>
              </Link>
              <Link to="/all-activities" className="nav-link">
                <IonRow className="nav-row ion-margin-vertical">
                  <FaClipboardList size={32} color="gray" />
                  <p className="ion-margin-horizontal">All Activities</p>
                </IonRow>
              </Link>
              <Link to="/settings" className="nav-link">
                <IonRow className="nav-row ion-margin-vertical">
                  <FiSettings size={32} color="gray" />
                  <p className="ion-margin-horizontal">Settings</p>
                </IonRow>
              </Link>
              <Link
                to="/"
                onClick={props.firebase.doSignOut}
                className="nav-link"
              >
                <IonRow className="nav-row ion-margin-vertical">
                  <FiLogOut size={32} color="gray" />
                  <p className="ion-margin-horizontal">Logout</p>
                </IonRow>
              </Link>
            </IonGrid>
          </IonItem>
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
