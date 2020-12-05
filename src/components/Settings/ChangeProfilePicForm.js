import React, { Component } from "react";
import ServerResponseToast from "../ServerResponseToast";
import { FilePicker } from "react-file-picker-preview";
import { BsImage } from "react-icons/bs";
import { withFirebase } from "../Firebase/context";
import { IonButton, IonGrid, IonRow, IonText } from "@ionic/react";
import "../../pages/pages.css";

class ChangeProfilePicForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: JSON.parse(window.localStorage.getItem("authUser")),
      showServerResponseToast: false,
      errorMessage: "",
      successMessage: "",
      file: "",
      reset: {},
    };
    this.updatePhoto = this.updatePhoto.bind(this);
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleFileChange = (event) => {
    let file = event.target.files[0];
    this.setState({
      [event.target.name]: file,
    });
  };

  updatePhoto = async () => {
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
        .child(`users/${userID}/images/profilePicture/${file.name}`)
        .put(file, metadata)
        //get download link + set profile picture url for authUser
        .then(() => {
          storageRef
            .child(`users/${userID}/images/profilePicture/${file.name}`)
            .getDownloadURL()
            .then((downloadURL) => {
              this.props.firebase.auth.currentUser.updateProfile({
                photoURL: downloadURL,
              });
            });
        })
        .then(() => {
          this.setState({
            successMessage:
              "Sucessfully updated profile picture. It may take a while for changes to be in effect.",
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
      showServerResponseToast,
      errorMessage,
      successMessage,
      error,
      file,
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
                  {file === "" ? "Upload your Profile Picture." : null}
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

          <IonButton onClick={this.updatePhoto}>Apply</IonButton>

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

export default withFirebase(ChangeProfilePicForm);
