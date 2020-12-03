import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonAvatar,
  IonGrid,
  IonRow,
  IonText,
  IonItem,
} from "@ionic/react";
import "./navbar.css";
import {
  FaHome,
  FaClipboardList,
  FaQuestion,
  FaPowerOff,
} from "react-icons/fa";
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
                  <FaHome size={32} color="blue" />
                  <p className="ion-margin-horizontal">Home</p>
                </IonRow>
              </Link>
              <Link to="/all-activities" className="nav-link">
                <IonRow className="nav-row ion-margin-vertical">
                  <FaClipboardList size={32} color="blue" />
                  <p className="ion-margin-horizontal">All Activities</p>
                </IonRow>
              </Link>
              <Link to="/settings" className="nav-link">
                <IonRow className="nav-row ion-margin-vertical">
                  <FiSettings size={32} color="blue" />
                  <p className="ion-margin-horizontal">Settings</p>
                </IonRow>
              </Link>
              <Link
                to="/"
                onClick={props.firebase.doSignOut}
                className="nav-link"
              >
                <IonRow className="nav-row ion-margin-vertical">
                  <FiLogOut size={32} color="blue" />
                  <p className="ion-margin-horizontal">Logout</p>
                </IonRow>
              </Link>
            </IonGrid>
          </IonItem>
        ) : null}

        {userMenuOpen ? (
          <>
            <IonItem className="ion-margin-bottom">
              <IonGrid>
                <IonRow>
                  <IonAvatar className="avatar-big">
                    <img
                      src={photoURL ? `${photoURL}` : `${defaultImage}`}
                      alt="avatar"
                    />
                  </IonAvatar>
                </IonRow>
                <IonRow className="row">
                  <p className="subheading">
                    {loading ? "Username" : username}
                  </p>
                </IonRow>
                <IonRow className="row">
                  <p>{email}</p>
                </IonRow>
              </IonGrid>
            </IonItem>
            <IonItem>
              <IonGrid>
                <Link to="/settings" className="nav-link">
                  <IonRow className="nav-row ion-margin-vertical">
                    <FiSettings size={32} color="blue" />
                    <p className="ion-margin-horizontal">Settings</p>
                  </IonRow>
                </Link>
                <Link to="/faq" className="nav-link">
                  <IonRow className="nav-row ion-margin-vertical">
                    <FaQuestion size={32} color="blue" />
                    <p className="ion-margin-horizontal">FAQ</p>
                  </IonRow>
                </Link>
                <Link
                  to="/"
                  onClick={props.firebase.doSignOut}
                  className="nav-link"
                >
                  <IonRow className="nav-row ion-margin-vertical">
                    <FaPowerOff size={32} color="blue" />
                    <p className="ion-margin-horizontal">Logout</p>
                  </IonRow>
                </Link>
              </IonGrid>
            </IonItem>
          </>
        ) : null}
      </IonHeader>
    </>
  );
}

export default withFirebase(Navbar);
