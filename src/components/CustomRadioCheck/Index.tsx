import React from 'react';
import { IonList, IonRadioGroup, IonListHeader, IonLabel, IonItem, IonItemDivider } from '@ionic/react';
import ItemCheck from './ItemCheck';

interface itemProps {
  map(arg0: (el: any) => JSX.Element): React.ReactNode;
  [index: number] : {label: string | undefined; value: string | undefined;}; 
}

interface radioProps {
  header?: string;
  itemValue?: itemProps;
  selected?: string;
  onChange?: (((e?: any) => void) & ((event: React.FormEvent<HTMLIonRadioGroupElement>) => void)) | undefined;
  name?: string;
}

const CustomRadioCheck: React.FC<radioProps> = (props) => {
  // console.log(props.itemValue, 'this is radio check');
  return (
    <React.Fragment>
      <IonList>
        <IonRadioGroup value={props.selected} onIonChange={props.onChange} name={props.name}>
          <IonListHeader>
            <IonLabel>{props.header}</IonLabel>
          </IonListHeader>
          {props.itemValue && props.itemValue.map((el) => <ItemCheck key={el.value} label={el.label} value={el.value} />)}
        </IonRadioGroup>
        <IonItemDivider>Your Selection</IonItemDivider>
        <IonItem>{props.selected ?? '(none selected'}</IonItem>
      </IonList>
    </React.Fragment>
  );
};

export default CustomRadioCheck;