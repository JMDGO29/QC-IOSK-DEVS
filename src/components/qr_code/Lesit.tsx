import React, { useState } from "react";
import yellow from "./vertical/yellow.png";
import { IonContent, IonPage } from "@ionic/react";

interface ContainerProps {
  name: string;
}
const Lesit: React.FC<ContainerProps> = ({ name }) => {
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
            <h2 className = "font-serif font-bold text-center text-black"> How to navigate to the LESIT Office inside QCU San Bartolome Campus</h2>
            <h4 className = "flex flex-col items-center justify-between h-auto p-3 shadow-md bg-base-300 rounded-2xl font-serif font-bold  text-black m-5 text-center"> 
              Building Name: Yellow
              <br/>
              Floor level: 2nd
              <br/>
              Room: LESIT
              <br/>
              Estimated Time Arrival: 
              <br/>
              3:30 minutes (Walking) 
            </h4>
          </>
        ) : (
          <>
            <h2 className = "font-serif font-bold text-center text-black">Paano pumunta sa silid ng LESIT, dito sa QCU San Bartolome Campus</h2>
            <h4 className = "flex flex-col items-center justify-between h-auto p-3 shadow-md bg-base-300 rounded-2xl font-serif font-bold  text-black m-5 text-center"> 
              Pangalan ng Gusali: Yellow
              <br/>
              Palapag: 2nd
              <br/>
              Silid: LESIT
              <br/>
              Tinatayang Oras ng Pagdating: 
              <br/>
              3:30 minuto (Paglalakad) 
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
              <li className="text-black">• Turn right and enter the Yellow Building.</li>
              <li className="text-black">• Head to the second floor and make a left, then continue straight ahead and make another left.</li>
              <li className="text-black">• The last room you'll reach is the LESIT Office.</li>
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
              <li className="text-black">• Kumanan at umakyat sa hagdan para mapuntahan ang Yellow building.</li>
              <li className="text-black">• Tumungo sa ikalawang palapag at kumaliwa, pagkatapos ay dumiretso at kumaliwa muli.</li>
              <li className="text-black">• Ang huling silid na mararating mo ay ang silid ng LESIT.</li>
            </ul> 
            <h1 className="text-black text-center">Sundin ang berdeng linya mula sa larawan sa ibaba, ito ang iyong gabay tungo sa gusali.</h1>
          </>
        )}
        <br />
        <img src={yellow}  alt="admin" className="rounded-md content-center" />
      </IonContent>
    </IonPage>
  );
};

export default Lesit;
