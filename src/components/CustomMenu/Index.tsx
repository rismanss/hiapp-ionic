import React from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem } from '@ionic/react';
import { menuController } from "@ionic/core";
import { auth } from '../../utils/fireBase';

const CustomMenu: React.FC = () => {
  const onLogOut = () => {
    auth.signOut().then(() => {
      console.log("logout");
      menuController.toggle();
      window.location.reload();
    }).catch((error) => {
      console.log(error, "error");
    });
  };

  return (
    <IonMenu side="end" contentId="main">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Start Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem onClick={onLogOut}>Logout</IonItem>
          <IonItem>Menu Item</IonItem>
          <IonItem>Menu Item</IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default CustomMenu;