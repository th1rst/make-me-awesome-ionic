import React, { Component } from "react";
import { withFirebase } from "../Firebase/context";
import ServerResponseToast from "../ServerResponseToast";
import { FilePicker } from "react-file-picker-preview";
import { BsImage } from "react-icons/bs";
import { IonButton, IonGrid, IonRow, IonText } from "@ionic/react";

class ChangeBannerPictureForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: JSON.parse(localStorage.getItem("authUser")),
      showServerResponseToast: false,
      errorMessage: "",
      successMessage: "",
      file: "",
      reset: {},
    };
    this.updateBannerPicture = this.updateBannerPicture.bind(this);
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  updateBannerPicture = async () => {
    if (this.state.file !== "") {
      const storageRef = this.props.firebase.storageRef;
      const userID = this.state.authUser.uid;
      const file = this.state.file;
      const metadata = {
        contentType: "image/jpeg",
        size: this.state.file.size,
      };

      // --- SEND DATA TO CLOUD STORAGE ---
      await storageRef
        //set reference and upload
        .child(`users/${userID}/images/bannerPicture/${file.name}`)
        .put(file, metadata)
        //get download link + set profile picture url for authUser
        .then(() => {
          storageRef
            .child(`users/${userID}/images/bannerPicture/${file.name}`)
            .getDownloadURL()
            .then((downloadURL) => {
              this.props.firebase.db
                .collection("users")
                .doc(`${userID}`)
                .update({
                  bannerURL: downloadURL,
                });
            });
        })
        .then(() => {
          this.setState({
            successMessage:
              "Sucessfully updated Banner Picture. It may take a while for changes to be in effect.",
            showServerResponseToast: true,
          });
        })
        .catch((error) => {
          this.setState({
            errorMessage: error.message,
            showServerResponseToast: true,
          });
        });
    }
  };

  render() {
    const {
      errorMessage,
      successMessage,
      showServerResponseToast,
      file,
      error,
    } = this.state;

    return (
      <>
        <IonGrid className="ion-margin">
          <IonRow>
            <FilePicker
              className="filepicker"
              buttonText={
                <>
                  <BsImage className="ion-margin-horizontal" />
                  {file === "" ? "Upload your Banner Picture." : null}
                </>
              }
              extensions={["image/jpeg"]}
              onIonChange={(file) => this.setState({ file })}
              onError={(error) => this.setState({ error: error })}
              onClear={() => this.setState({ file: "" })}
              triggerReset={this.state.reset}
            />
          </IonRow>
          <IonRow>
            <IonText>{error ? <h4>Error: {error}</h4> : null}</IonText>
          </IonRow>

          <IonButton onClick={this.updateBannerPicture}>Apply</IonButton>

          {/* ------------- SERVER RESPONSE TOAST ------------- */}

          {showServerResponseToast ? (
            <ServerResponseToast
              errorMessage={errorMessage}
              successMessage={successMessage}
            />
          ) : null}
        </IonGrid>
      </>
    );
  }
}

export default withFirebase(ChangeBannerPictureForm);
