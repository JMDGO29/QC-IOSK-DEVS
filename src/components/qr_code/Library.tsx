import React, { useState } from "react";
import academic from "./vertical/academic.png";
import { IonContent, IonPage } from "@ionic/react";

interface ContainerProps {
  name: string;
}
const Library: React.FC<ContainerProps> = ({ name }) => {
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
            <h2 className = "font-serif font-bold text-center text-black">How to navigate to the Library inside QCU San Bartolome Campus</h2>
            <h4 className = "flex flex-col items-center justify-between h-auto p-3 shadow-md bg-base-300 rounded-2xl font-serif font-bold  text-black m-5 text-center"> 
              Building Name: Academic
              <br/>
              Floor level: 2nd
              <br/>
              Room: Library
              <br/>
              Estimated Time Arrival: 
              <br/>
              6 minutes (Walking) 
            </h4>
          </>
        ) : (
          <>
            <h2 className = "font-serif font-bold text-center text-black">Paano pumunta sa Library, dito sa QCU San Bartolome Campus</h2>
            <h4 className = "flex flex-col items-center justify-between h-auto p-3 shadow-md bg-base-300 rounded-2xl font-serif font-bold  text-black m-5 text-center"> 
              Pangalan ng Gusali: Academic
              <br/>
              Palapag: 2nd
              <br/>
              Silid: Library
              <br/>
              Tinatayang Oras ng Pagdating: 
              <br/>
              6 minuto (Paglalakad) 
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
              <li className="text-black">• Walk straight as you pass the TechVoc building and University Park.</li>
              <li className="text-black">• After that, turn right beside the administrative building.</li>
              <li className="text-black">• Walk straight and pass across the Open Grounds.</li>
              <li className="text-black">• When you reach and enter the Academic building, turn left to find the stairs at the end of the hallway.</li>
              <li className="text-black">• Go up to the 2nd floor where the University Library is located.</li>
            </ul>
            <h1 className="text-black text-center">Follow the green line from the image below, this is your guide to the building.</h1>
          </>
        ) : (
          <>
            <ul className="ml-5 mt-10 mb-10">
             <li className="text-black"> <h5 className="text-black">Direksyon:</h5></li>
              <li className="text-black">• Kumaliwa ka sa TechVoc building.</li>
              <li className="text-black">• Dumiretso ka hanggang sa madaan mo ang Ballroom, CHED QC Office, at University Park.</li>
              <li className="text-black">• Pagtapos noon, kumanan ka sa daanan sa pagitan ng University Park at Administrative building.</li>
              <li className="text-black">• Dumiretso ka at dumaan sa Open Grounds.</li>
              <li className="text-black">• Pagkarating sa academic building pumasok at kumaliwa ka.</li>
              <li className="text-black">• Dumiretso ka hanggang sa marating mo ang hagdan.</li>
              <li className="text-black">• Umakyat hanggang ikalawang palapag kung saan matatagpuan ang silid aklatan ng unibersidad.</li>
            </ul> 
            <h1 className="text-black text-center">Sundin ang berdeng linya mula sa larawan sa ibaba, ito ang iyong gabay tungo sa gusali.</h1>
          </>
        )}
        <br />
        <img src={academic}  alt="admin" className="rounded-md content-center" />
      </IonContent>
    </IonPage>
  );
};

export default Library;
