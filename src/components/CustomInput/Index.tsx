import React from 'react';
import { IonInput, IonLabel, IonItem } from '@ionic/react';
import './style.css';

interface InputPorps {
  label?: string;
  type?: "number" | "time" | "text" | "date" | "email" | "password" | "search" | "tel" | "url" | "week" | "month" | "datetime-local";
  value?: string;
  name?: string;
  onChange?: (((e?: any) => void) & ((event: React.FormEvent<HTMLIonInputElement>) => void)) | undefined;
}

const CustomInput: React.FC<InputPorps & React.HtmlHTMLAttributes<HTMLIonInputElement>> = (props) => {

  return (
    <React.Fragment>
      <IonItem className="custom-item-label">
        <IonLabel>{props.label}</IonLabel>
      </IonItem>
      <IonItem className="custom-item">
        <IonInput
          {...props} 
          onIonChange={props.onChange}
        />
      </IonItem>
    </React.Fragment>
  );
};

CustomInput.defaultProps = {
  type: "text"
}

export default CustomInput;