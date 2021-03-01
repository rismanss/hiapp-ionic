import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonToast, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import { CustomButton, CustomRadioCheck } from '../components/index';
import './Home.css';
import { auth, firebase, db } from '../utils/fireBase';
import PhoneInput from 'react-phone-number-input';
import { CountryRegionData } from 'react-country-region-selector';

// import withAuth from '../helpers/withAuth'; // HOC with typescript confused me!

interface Props {
  setRole: any;
}

const Home: React.FC<Props> = ({setRole}) => {
  const itemValue = [
    {label: "User", value: "user"},
    {label: "Admin", value: "admin"}
  ];

  const [phone, setPhone] = useState<string>("");
  const [selected, setSelected] = useState<string>("user");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [message, setMassage] = useState<string>("");
  const [country, setCountry] = useState<any>("Indonesia");

  const onRadionChange = (e?: any) => {
    setSelected(e.detail.value);
  };

  const onLogin = () => {
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      return onLoginWithPhoneNumber();
    })
    .catch((error) => {
      console.log(error, "error")
    });
  }

  const onLoginWithPhoneNumber = () => {
    const applicationVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    phone !== "" && auth.signInWithPhoneNumber(phone, applicationVerifier).then((confirmationResult) => {
      let code = prompt('Enter Verification Code !') || "";
      return confirmationResult.confirm(code);
    }).then(result => {
      applicationVerifier.clear();
      result.user?.updateProfile({
        displayName: selected
      }).then(() => setRole(selected));
      return db.collection(selected).doc(result.user?.uid).set({
        phone: result.user?.phoneNumber,
        region: country
      });
    }).catch((error) => {
      setMassage("Error Logging !");
      setShowToast(true);
      applicationVerifier.clear();
      return error;
    });
  };

  let selectRegion: string | any = CountryRegionData.find(item => {
      if (country === item[1]) {
        return item;
      }
      return null;
    });
  console.log(country, phone, selectRegion);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonItem>
          <IonLabel>Country ?</IonLabel>
          <IonSelect value={country} onIonChange={(e?: any) => setCountry(e.detail.value)}>
            {CountryRegionData.map(item => {
              return (
                <IonSelectOption key={item[1]} value={item[1]}>{item[0]}</IonSelectOption>
              );
            })}
          </IonSelect>
        </IonItem>
        <IonItem>
          <PhoneInput
            className="phone-input"
            international
            defaultCountry={selectRegion ? selectRegion[1] : "ID"}
            value={phone}
            onChange={setPhone}
          />
        </IonItem>
        <CustomRadioCheck header="Login As ? *" itemValue={itemValue} selected={selected} onChange={onRadionChange} />
        <IonItem id="recaptcha-container"></IonItem>
        <CustomButton expand="block" onClick={onLogin} >
          Login
        </CustomButton>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          position="middle"
          message={message}
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

// export default withAuth()(Home);
export default Home;
