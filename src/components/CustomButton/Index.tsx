import React from 'react';
import { IonButton } from '@ionic/react';
import './style.css';

interface ButtonProps {
  expand?: "full" | "block";
  children?: React.ReactNode;
  fill?: "outline" | "solid" | "clear" | "default";
  shape?: "round" | undefined;
};

const CustomButton: React.FC<ButtonProps & React.HtmlHTMLAttributes<HTMLIonButtonElement>> = (props) => (
  <React.Fragment>
    <IonButton {...props}>
      {props.children}
    </IonButton>
  </React.Fragment>
);

CustomButton.defaultProps = {
  color: "secondary",
  shape: undefined
}

export default CustomButton;