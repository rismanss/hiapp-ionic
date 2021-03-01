import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonMenuButton, IonItem, IonSelect, IonSelectOption, IonLabel, IonList } from '@ionic/react';
import { useEffect, useState } from 'react';
import { CountryRegionData } from 'react-country-region-selector';
import { db } from '../utils/fireBase';

const Admin: React.FC = (props: any) => {
  const [region, SetRegion] = useState<any>("Indonesia");
  const [data, setData] = useState<any>();

  useEffect(() => {
    const getData = async (reg: any) => {
      const tmp: any = [];
      const userRef = db.collection("user");
      const snapshots = await userRef.get();
      snapshots.forEach(doc => {
        userRef.doc(doc.id).collection(reg).get().then(snapshot => {
          for (const item of snapshot.docs) {
            console.log(item.data(), "check")
            tmp.push(item.data());
          }
          setData(tmp)
        });
      });
    };

    getData(region);
  }, [region]);

  console.log(data, "this data");
  if (props.displayName !== "admin") {
    window.location.reload();
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonMenuButton slot="end" color="light"/>
          <IonTitle>{`${props.displayName} - ${props.phoneNumber} `}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <IonLabel>Select Region ?</IonLabel>
          <IonSelect value={region} onIonChange={(e?: any) => SetRegion(e.detail.value)}>
            {CountryRegionData.map((item) => {
              return (
                <IonSelectOption key={item[1]} value={item[0]}>{item[0]}</IonSelectOption>
              );
            })}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonList>
            <IonTitle>{data && data.length} Data</IonTitle>
            {data && data.map((item?: any, index?: number) => {
              return (
                <IonItem key={index} >
                  {item.name}
                </IonItem>
              );
            })}
          </IonList>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Admin;
