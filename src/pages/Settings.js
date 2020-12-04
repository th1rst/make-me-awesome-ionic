import React, { useState } from "react";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import { FaRegUser, FaStar, FaKey } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { AiOutlinePicture } from "react-icons/ai";
import "./pages.css";
import Navbar from "../components/Navigation/Navbar";
import QuickActivitySettings from "../components/Settings/QuickActivitySettings";

export default function Settings() {
  const [quickActivitiesForm, showQuickActivitiesForm] = useState(false);
  const [changeProfilePicForm, showChangeProfilePicForm] = useState(false);
  const [changeBannerPictureForm, showChangeBannerPictureForm] = useState(false);
  const [changeEmailAddressForm, showChangeEmailAddressForm] = useState(false);
  const [changePasswordForm, showChangePasswordForm] = useState(false);

  return (
    <IonPage>
      <Navbar />
      <IonContent>
        <IonGrid>
          <IonRow className="row">
            <IonText className="heading" color="primary">
              Settings
            </IonText>
          </IonRow>
          <IonButton
            className="ion-margin"
            expand="full"
            onClick={() => showQuickActivitiesForm(!quickActivitiesForm)}
          >
            <FaStar size={20} className="ion-margin-horizontal" /> Edit
            QuickActivities
          </IonButton>
          {quickActivitiesForm ? <QuickActivitySettings /> : null}
          <IonButton
            className="ion-margin"
            expand="full"
            onClick={() => showChangeProfilePicForm(!changeProfilePicForm)}
          >
            <FaRegUser size={20} className="ion-margin-horizontal" /> Change
            Profile Picture
          </IonButton>
          <IonButton
            className="ion-margin"
            expand="full"
            onClick={() =>
              showChangeBannerPictureForm(!changeBannerPictureForm)
            }
          >
            <AiOutlinePicture size={20} className="ion-margin-horizontal" />{" "}
            Change Banner Picture
          </IonButton>
          <IonButton
            className="ion-margin"
            expand="full"
            onClick={() => showChangeEmailAddressForm(!changeEmailAddressForm)}
          >
            <GrMail size={20} className="ion-margin-horizontal" /> Change Email
            Address
          </IonButton>
          <IonButton
            className="ion-margin"
            expand="full"
            onClick={() => showChangePasswordForm(!changePasswordForm)}
          >
            <FaKey size={20} className="ion-margin-horizontal" /> Change
            Password
          </IonButton>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
