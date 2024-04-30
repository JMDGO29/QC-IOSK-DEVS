import React, { useState } from "react";
import adminPic from "./vertical/admin.png";
import { IonContent, IonPage } from "@ionic/react";

interface ContainerProps {
  name: string;
}
const RegistrarOffice: React.FC<ContainerProps> = ({ name }) => {
  const [language, setLanguage] = useState("english");


  const toggleLanguage = () => {
    setLanguage((prevLanguage) =>
      prevLanguage === "english" ? "filipino" : "english"
    );
  };
  return (
    <IonPage>
      <IonContent fullscreen>
        
        {language === "english" ? (
          <>
            <h2 className = "font-serif font-bold text-center text-black">How to navigate to the Registrar's Office inside QCU San Bartolome Campus</h2>
            <h4 className = "flex flex-col items-center justify-between h-auto p-3 shadow-md bg-base-300 rounded-2xl font-serif font-bold  text-black m-5 text-center"> 
              Building Name: Admin
              <br/>
              Floor level: 2nd
              <br/>
              Room: Registrar Office
              <br/>
              Estimated Time Arrival: 
              <br/>
              4 minutes (Walking) 
            </h4>
          </>
        ) : (
          <>
            <h2 className = "font-serif font-bold text-center text-black">Paano pumunta sa Registrar's Offfice, dito sa QCU San Bartolome Campus</h2>
            <h4 className = "flex flex-col items-center justify-between h-auto p-3 shadow-md bg-base-300 rounded-2xl font-serif font-bold  text-black m-5 text-center"> 
              Pangalan ng Gusali: Admin
              <br/>
              Palapag: 2nd
              <br/>
              Silid: Registrar Office
              <br/>
              Tinatayang Oras ng Pagdating: 
              <br/>
              4 minuto (Paglalakad) 
            </h4>
          </>
        )}
      
        <button onClick={toggleLanguage} className="text-black btn-block">
          <u>{language === "english" ? "Click here to switch language to Filipino" : "Mag-click dito upang ilipat ang wika sa English"}</u>
        </button>

        {language === "english" ? (
          <>
           
            <ul className="ml-5 mt-10 mb-10">
              <li className="text-black"> <h5 className="text-black">Directions:</h5></li>
              <li className="text-black">• Turn left when you reach TechVoc building.</li>
              <li className="text-black">• Then, head straight as you pass the Ballroom, CHED QC Office, and the University Park.</li>
              <li className="text-black">• After that, turn right and you will see the Administrative Building right after the U park.</li>
              <li className="text-black">• Now, walk at the stairs to reach the first floor.</li>
              <li className="text-black">• Then, use the left stairs to reach the 2nd floor and you will see the Registrar Office.</li>
            </ul>
            <h1 className="text-black text-center">Follow the green line from the image below, this is your guide to the building.</h1>
          </>
        ) : (
          <>     
            <ul className="ml-5 mt-10 mb-10">
              <li className="text-black"> <h5 className="text-black">Direksyon:</h5></li>
              <li className="text-black">• Kumaliwa ka sa TechVoc building.</li>
              <li className="text-black">• Dumiretso ka hanggang sa madaan mo ang Ballroom, CHED QC Office, at University Park.</li>
              <li className="text-black">• Pagtapos noon, kumanan ka at makakikita mo ang Administrative Building  na sumunod sa UPark.</li>
              <li className="text-black">• Ngayon, lumakad ka sa hagdan upang makarating sa unang palapag.</li>
              <li className="text-black">• Pagkatapos, gamitin ang kaliwang hagdan para makarating sa pangalawang palapag at makikita mo ang Registrar office.</li>
            </ul> 
            <h1 className="text-black text-center">Sundin ang berdeng linya mula sa larawan sa ibaba, ito ang iyong gabay tungo sa gusali.</h1>
          </>
        )}
        <br />
        <img src={adminPic}  alt="admin" className="rounded-md content-center" />
      </IonContent>
    </IonPage>
  );
};

export default RegistrarOffice;
