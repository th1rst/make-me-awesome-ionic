import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Firebase from "./components/Firebase/Firebase";
import FirebaseContext from "./components/Firebase/context";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import SignUpPage from "./pages/SignUpPage";
import Overview from "./pages/Overview";
import LiveActivity from "./pages/LiveActivity";
import AllActivities from "./pages/AllActivities";
import FAQ from "./pages/FAQ";
import Settings from "./pages/Settings";

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
          <BrowserRouter>
            <Route path="/" component={Home} exact={true} />
            <Route path="/forgotpassword" component={ForgotPassword} exact={true} />
            <Route path="/activity" component={LiveActivity} exact={true} />
            <Route path="/signup" component={SignUpPage} exact={true} />
            <Route path="/overview" component={Overview} exact={true} />
            <Route path="/all-activities" component={AllActivities} exact={true} />
            <Route path="/faq" component={FAQ} exact={true} />
            <Route path="/settings" component={Settings} exact={true} />
          </BrowserRouter>
        </IonRouterOutlet>
      </IonReactRouter>
    </FirebaseContext.Provider>
  </IonApp>
);

export default App;
