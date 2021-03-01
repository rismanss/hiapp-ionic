import React from 'react';
import { IonModal } from '@ionic/react';
import CustomButton from '../CustomButton/Index';

interface ModalProps {
  isOpen?: boolean;
  onOpen?: (((e?: any) => void) & ((event: React.MouseEvent<HTMLIonButtonElement, MouseEvent>) => void)) | undefined;
  onClose?: (((e?: any) => void) & ((event: React.MouseEvent<HTMLIonButtonElement, MouseEvent>) => void)) | undefined;
  textOpen?: string;
  textClose?: string;
  children?: React.ReactNode;
  colorButtonOpen?: string;
  shapeButtonOpen?: "round" | undefined;
}

const CustomModal: React.FC<ModalProps> = (props) => {
  return (
    <React.Fragment>
      <IonModal isOpen={props.isOpen || false} cssClass='my-custom-class'>
        {props.children}
        <CustomButton shape="round" color="warning" expand="block" fill="outline" onClick={props.onClose} >
          {props.textClose}
        </CustomButton>
      </IonModal>
      <CustomButton shape={props.shapeButtonOpen} color={props.colorButtonOpen} expand="block" onClick={props.onOpen} >
        {props.textOpen}
      </CustomButton>
    </React.Fragment>
  );
};

CustomModal.defaultProps = {
  colorButtonOpen: "success",
  shapeButtonOpen: undefined
}

export default CustomModal;