import React, { useState } from "react";
import bautista from "./vertical/bautista.png";
import { IonContent, IonPage } from "@ionic/react";

interface ContainerProps {
  name: string;
}
const ItFaculty: React.FC<ContainerProps> = ({ name }) => {
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
            <h2 className = "font-serif font-bold text-center text-black"> How to navigate to the College of Computer Studies Faculty inside QCU San Bartolome Campus</h2>
            <h4 className = "flex flex-col items-center justify-between h-auto p-3 shadow-md bg-base-300 rounded-2xl font-serif font-bold  text-black m-5 text-center"> 
              Building Name: Bautista
              <br/>
              Floor level: 6th
              <br/>
              Room: College of Computer Studies
              <br/>
              Estimated Time Arrival: 
              <br/>
              5 minutes (Walking) 
            </h4>
          </>
        ) : (
          <>
            <h2 className = "font-serif font-bold text-center text-black">Paano pumunta sa silid ng College of Computer Studies, dito sa QCU San Bartolome Campus</h2>
            <h4 className = "flex flex-col items-center justify-between h-auto p-3 shadow-md bg-base-300 rounded-2xl font-serif font-bold  text-black m-5 text-center"> 
              Pangalan ng Gusali: Bautista
              <br/>
              Palapag: 6th
              <br/>
              Silid: College of Computer Studies
              <br/>
              Tinatayang Oras ng Pagdating: 
              <br/>
              5 minuto (Paglalakad) 
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
              <li className="text-black">• Turn left when you reach TechVoc building.</li>
              <li className="text-black">• Then, head straight as you pass the Ballroom, CHED QC Office, and the University Park.</li>
              <li className="text-black">• After that, turn right at the passageway in the middle of the University Park and Administrative building.</li>
              <li className="text-black">• Head straight and turn left as you pass at the Open Grounds.</li>
              <li className="text-black">• Then turn left again to reach the Bautista building.</li>
              <li className="text-black">• When you reach and enter the Bautista building, head straight to reach the stairs.</li>   
              <li className="text-black">• Go up to the 6th floor. Turn left to reach the College of Computer Studies Department.</li> 
            </ul>
            <h1 className="text-black text-center">Follow the green line from the image below, this is your guide to the building.</h1>
          </>
        ) : (
          <>
            <ul className="ml-5 mt-10 mb-10">
            <li className="text-black"> <h5 className="text-black">Direksyon:</h5></li>
              <li className="text-black">• Kumaliwa ka sa TechVoc building.</li>
              <li className="text-black">• Dumiretso ka hanggang sa madaanan mo ang Ballroom, CHED QC Office, at University Park.</li>
              <li className="text-black">• Pagkatapos, kumanan ka sa daanan sa pagitan ng University Park at Administrative building.</li>
              <li className="text-black">• Dumiretso ka at dumaan ka sa Open Grounds.</li>
              <li className="text-black">• Pagkatapos, kumaliwa ulit upang marating ang gusali ng Bautista building.</li>
              <li className="text-black">• Pumasok at dumiretso papuntang hagdan.</li>
              <li className="text-black">• Umakyat ka patungo sa ika-anim na palapag. Kumaliwa ka at maglakad papunta sa College of Computer Studies Department.</li>
            </ul> 
            <h1 className="text-black text-center">Sundin ang berdeng linya mula sa larawan sa ibaba, ito ang iyong gabay tungo sa gusali.</h1>
          </>
        )}
        <br />
        <img src={bautista}  alt="admin" className="rounded-md content-center" />
      </IonContent>
    </IonPage>
  );
};

export default ItFaculty;
