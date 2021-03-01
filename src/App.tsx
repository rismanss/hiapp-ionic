import { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { 
  IonApp, 
  IonRouterOutlet
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import User from './pages/User';
import Admin from './pages/Admin';
import PushNotif from './pages/PushNotif';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import 'react-phone-number-input/style.css';

/* Theme variables */
import './theme/variables.css';

import { CustomMenu } from './components';
import { auth } from './utils/fireBase';


const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [dataUser, setDataUser] = useState<any>();
  const [role, setRole] = useState<any>();
  const [test, setTest] = useState<any>();

  useEffect(() => {
    const onAuthenticated = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setTest(user.displayName);
          setDataUser(user);
          setIsAuthenticated(true)
        }
        else {
          setIsAuthenticated(false)
        }
      });  
    };

    onAuthenticated();
  }, [isAuthenticated]);
  console.log(isAuthenticated && typeof role !== "undefined");
  if (isAuthenticated) {
    return (
      <IonApp>
        <CustomMenu />
        <IonReactRouter>
          {
            test === "user" && (
              <IonRouterOutlet id="main">
                <Route exact path="/user"  render={() => {
                  return <User {...dataUser} />;
                }} />
                <Redirect push to="/user" />
              </IonRouterOutlet>
            ) 
          }
          {test === "admin" && (
              <IonRouterOutlet id="main">
                <Route exact path="/admin"  render={() => {
                  return <Admin {...dataUser} />;
                }} />
                <Redirect push to="/admin" />
              </IonRouterOutlet>
            )}
        </IonReactRouter>
      </IonApp>
    );
  } else if (!isAuthenticated) {
    return (
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet id="main">
            <Route exact path="/login" render={() => {
              return <Home setRole={setRole} />;
            }} />
            <Route exact path="/test" render={() => {
              return <PushNotif />;
            }} />
            <Redirect to="/login" />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    );
  }
  return <div>should refresh</div>;
}

export default App;
