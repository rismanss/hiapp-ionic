import React from 'react';
import { IonLabel, IonItem, IonRadio } from '@ionic/react';

interface itemProps {
  label?: string;
  value?: string;
}

const ItemCheck: React.FC<itemProps> = (props) => {
  return (
    <IonItem>
      <IonLabel>{props.label}</IonLabel>
      <IonRadio slot="start" value={props.value} />
    </IonItem>
  );
};

export default ItemCheck;