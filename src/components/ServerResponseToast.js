import React, { useState } from "react";
import { IonToast } from "@ionic/react";

export default function ServerResponseToast(props) {
  const [toastIsShown, setToastIsShown] = useState(true);
  const { successMessage, errorMessage } = props;
  return (
    <>
      {/* ------------- SUCCESS MESSAGE VARIANT ------------- */}

      {errorMessage === "" ? (
        <IonToast
          isOpen={toastIsShown}
          onDidDismiss={() => setToastIsShown(false)}
          message={successMessage}
          duration={4000}
        />
      ) : (
        <>
          {/* ------------- ERROR MESSAGE VARIANT ------------- */}

          <IonToast
            isOpen={toastIsShown}
            onDidDismiss={() => setToastIsShown(false)}
            message={errorMessage}
            duration={4000}
          />
        </>
      )}
    </>
  );
}
