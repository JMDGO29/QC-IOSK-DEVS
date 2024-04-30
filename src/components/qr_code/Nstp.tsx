import React, { useState } from "react";
import techvoc from "./vertical/techvoc.png";
import { IonContent, IonPage } from "@ionic/react";

interface ContainerProps {
  name: string;
}
const Nstp: React.FC<ContainerProps> = ({ name }) => {
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
            <h2 className = "font-serif font-bold text-center text-black">How to navigate to the NSTP Room inside QCU San Bartolome Campus</h2>
            <h4 className = "flex flex-col items-center justify-between h-auto p-3 shadow-md bg-base-300 rounded-2xl font-serif font-bold  text-black m-5 text-center"> 
              Building Name: Techvoc
              <br/>
              Floor level: 2nd
              <br/>
              Room: NSTP
              <br/>
              Estimated Time Arrival: 
              <br/>
              1 minute (Walking) 
            </h4>
          </>
        ) : (
          <>
            <h2 className = "font-serif font-bold text-center text-black">Paano pumunta sa silid NSTP, dito sa QCU San Bartolome Campus</h2>
            <h4 className = "flex flex-col items-center justify-between h-auto p-3 shadow-md bg-base-300 rounded-2xl font-serif font-bold  text-black m-5 text-center"> 
              Pangalan ng Gusali: Techvoc
              <br/>
              Palapag: 2nd
              <br/>
              Silid: NSTP
              <br/>
              Tinatayang Oras ng Pagdating: 
              <br/>
              1 minuto (Paglalakad) 
            </h4>
          </>
        )}
      
        <button onClick={toggleLanguage} className="text-black btn-block">
          {language === "english" ? "Click here to switch language to Filipino" : "Mag-click dito upang ilipat ang wika sa English"}
        </button>

        {language === "english" ? (
          <>
            <ul className="ml-5 mt-10 mb-10">
              <li className="text-black"> <h5 className="text-black">Directions:</h5></li>
              <li className="text-black">• After entering the campus gate, you will see the Quezon City University Triangle located in the middle.</li>
              <li className="text-black">• Take a walk towards the back of the Triangle, where you will find the TechVoc building.</li>
              <li className="text-black">• Once inside the building, use the right stairs to reach the 2nd floor.</li>
              <li className="text-black">• Then, walk at the right hallway, at the end you will reach the NSTP Faculty Office.</li>            
            </ul>
            <h1 className="text-black text-center">Follow the green line from the image below, this is your guide to the building.</h1>
          </>
        ) : (
          <>
            <ul className="ml-5 mt-10 mb-10">
              <li className="text-black"> <h5 className="text-black">Direksyon:</h5></li>
              <li className="text-black">• Pag pasok ng unibersidad, matatanaw ang Quezon City University Triangle sa gitnang bahagi.</li>
              <li className="text-black">• Lumakad papunta rito at sa bandang likod ay makikita ang TechVoc building.</li>
              <li className="text-black">• Pumasok sa loob at gamitin ang hagdan sa kanan upang makaakyat sa pangalawang palapag.</li>
              <li className="text-black">• Pumasok sa kanang hallway at sa dulo ay makikita ang NSTP Faculty Office.</li>
            </ul> 
            <h1 className="text-black text-center">Sundin ang berdeng linya mula sa larawan sa ibaba, ito ang iyong gabay tungo sa gusali.</h1>
          </>
        )}
        <br />
        <img src={techvoc}  alt="admin" className="rounded-md content-center" />
      </IonContent>
    </IonPage>
  );
};

export default Nstp;
