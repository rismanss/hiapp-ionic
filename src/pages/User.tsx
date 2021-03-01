import { useState, useEffect } from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonMenuButton,
  IonItem, 
  IonCard, 
  IonCardHeader,
  IonCardContent, 
  IonLabel} from '@ionic/react';
import { CustomButton, CustomInput, CustomModal, CustomRadioCheck } from '../components';
import { db } from '../utils/fireBase';

const User: React.FC = (props: any) => {
  const { uid, displayName, phoneNumber } = props;

  const initial = {
    name: "",
    age: "",
    address: "",
    photo: "",
    gender: "male",
    location: ""
  };

  const itemValue = [
    {value: "male", label: "Male"},
    {value: "female", label: "Female"}
  ];

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [selected, setSelected] = useState("male");
  const [dataInput, setDataInput] = useState<any>(initial);
  const [data, setData] = useState<any>();
  const [userRegion, setUserRegion] = useState<string>("");

  useEffect(() => {
    const getDataUser = (uid?: any) => {
      const tmp: Array<any> = [];
      db.collection('user').doc(uid).get().then(user => {
        const { region }: any = user.data();
        setUserRegion(region);
        db.collection('user').doc(uid).collection(region).get().then((querySnapshot) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(querySnapshot, " => ");
          for (const item of querySnapshot.docs) {
            let dataWithId = Object.assign(item.data(), {id: item.id});
            tmp.push(dataWithId);
          }
    
          setData(tmp);
        });
      });
    };
    getDataUser(uid);
  }, [uid]);

  const handleChange = (e?: any) => {
    setDataInput({
      ...dataInput,
      [e.target.name]: e.target.name !== "gender" && e.target.value
    });
  };

  const handleSelect = (e?: any) => {
    setSelected(e.detail.value);
    setDataInput({
      ...dataInput,
      gender: e.detail.value
    });
  };

  const handleSubmit = () => {

    console.log(dataInput, "...input")

    db.collection(displayName).doc(uid).collection(userRegion).doc().set(dataInput);

    setShowModal(false);
    window.location.reload();
  };

  const onDelete = (id?: string) => {
    db.collection("user").doc(uid).collection(userRegion).doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      window.location.reload();
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  };

  const onOpenModalUpdate = (item?: any) => {
    console.log(item, 'item edit modal');
    setDataInput(item);
    setShowModal2(true);
  };

  const onCloseModalUpdate = () => {
    setDataInput(initial);
    setShowModal2(false);
  }

  const onUpdateData = () => {
    // console.log(dataInput, "check data input should update");
    const updateData = db.collection(displayName).doc(uid).collection(userRegion).doc(dataInput.id);

    updateData.update({
      name: dataInput.name,
      age: dataInput.age,
      address: dataInput.address,
      photo: dataInput.photo,
      gender: dataInput.gender,
      location: dataInput.location
    });

    setShowModal2(false);
    window.location.reload();
  };
  if (props.displayName !== "user") {
    // history.push("/login");
    window.location.reload();
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonMenuButton slot="end" color="light"/>
          <IonTitle>{`${displayName} - ${phoneNumber} `}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem lines="none" className="ion-text-center">
          <CustomModal 
            isOpen={showModal} 
            onOpen={() => setShowModal(true)}
            onClose={() => setShowModal(false)} 
            textClose="Close"
            textOpen="Add New Data"
            shapeButtonOpen="round"
          >
            <IonContent>
              <CustomInput
                placeholder="name"
                label="Name"
                name="name"
                value={dataInput.name}
                onChange={handleChange}
              />
              <CustomInput
                placeholder="age"
                label="Age"
                name="age"
                value={dataInput.age}
                onChange={handleChange}
              />
              <CustomInput
                placeholder="address"
                label="Address"
                name="address"
                value={dataInput.address}
                onChange={handleChange}
              />
              {/* <input type="file"></input> */}
              <CustomInput
                placeholder="photo"
                label="Photo"
                name="photo"
                value={dataInput.photo}
                onChange={handleChange}
              />
              <CustomRadioCheck 
                header="Gender ?" 
                itemValue={itemValue} 
                selected={selected} 
                name="gender"
                onChange={handleSelect} 
              />
              <CustomInput
                placeholder="location"
                label="Location"
                name="location"
                value={dataInput.location}
                onChange={handleChange}
              />
            </IonContent>
            <CustomButton expand="block" shape="round" fill="outline" onClick={handleSubmit} >
              Submit
            </CustomButton>
          </CustomModal>
        </IonItem>
        {data && data.map((item?: any, index?: number) => {
          return (
            <IonCard key={index}>
              <IonCardHeader>
                <IonToolbar>
                  <IonTitle>{item.name.toUpperCase()}</IonTitle>
                </IonToolbar>
              </IonCardHeader>
              <IonCardContent>
                <IonItem>
                  <IonLabel>Age : </IonLabel>
                  <IonLabel slot="end">{item.age}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>Address : </IonLabel>
                  <IonLabel slot="end">{item.address}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>gender : </IonLabel>
                  <IonLabel slot="end">{item.gender}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>photo : </IonLabel>
                  <IonLabel slot="end">{item.photo}</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel>location : </IonLabel>
                  <IonLabel slot="end">{item.location}</IonLabel>
                </IonItem>
                <IonItem>
                  <CustomModal
                    isOpen={showModal2}
                    onOpen={() => onOpenModalUpdate(item)}
                    onClose={onCloseModalUpdate}
                    textOpen="Edit"
                    textClose="Close"
                    colorButtonOpen="secondary"
                  >
                    <IonContent>
                      <CustomInput
                        placeholder="name"
                        label="Name"
                        name="name"
                        value={dataInput.name}
                        onChange={handleChange}
                      />
                      <CustomInput
                        placeholder="age"
                        label="Age"
                        name="age"
                        value={dataInput.age}
                        onChange={handleChange}
                      />
                      <CustomInput
                        placeholder="address"
                        label="Address"
                        name="address"
                        value={dataInput.address}
                        onChange={handleChange}
                      />
                      {/* <input type="file"></input> */}
                      <CustomInput
                        placeholder="photo"
                        label="Photo"
                        name="photo"
                        value={dataInput.photo}
                        onChange={handleChange}
                      />
                      <CustomRadioCheck 
                        header="Gender ?" 
                        itemValue={itemValue} 
                        selected={selected} 
                        name="gender"
                        onChange={handleSelect} 
                      />
                      <CustomInput
                        placeholder="location"
                        label="Location"
                        name="location"
                        value={dataInput.location}
                        onChange={handleChange}
                      />
                    </IonContent>
                    <CustomButton expand="block" shape="round" fill="outline" onClick={() => onUpdateData()} >
                      Update
                    </CustomButton>
                  </CustomModal>
                  <CustomButton color="danger" onClick={() => onDelete(item.id)}>Delete</CustomButton>
                </IonItem>
              </IonCardContent>
            </IonCard>
          );
        })}
      </IonContent>
    </IonPage>
  );
};

export default User;
