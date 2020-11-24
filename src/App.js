import React from "react";
import { Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Firebase from "./components/Firebase/Firebase";
import FirebaseContext from "./components/Firebase/context";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "./theme/variables.css";


const App = () => (
  <IonApp>
    <FirebaseContext.Provider value={new Firebase()}>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/" component={Home} exact={true} />
          <Route path="/forgotpassword" component={ForgotPassword} exact={true} />
        </IonRouterOutlet>
      </IonReactRouter>
    </FirebaseContext.Provider>
  </IonApp>
);

export default App;
