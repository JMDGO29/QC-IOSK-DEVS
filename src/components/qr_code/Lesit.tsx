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
        <h2 className = "font-serif font-bold text-center text-black"> How to navigate to the LESIT Room inside QCU San Bartolome Campus</h2>
        <h4 className = "flex flex-col items-center justify-between h-20 p-3 shadow-md bg-base-300 rounded-2xl font-serif font-bold  text-black m-5"> Estimated Time Arrival: <span> 3 minutes (Walking) </span></h4>
    
      
        <button onClick={toggleLanguage} className="text-black btn-block">
          {language === "english" ? "Click here to switch language to Filipino" : "Mag-click dito upang ilipat ang wika sa English"}
        </button>
        {language === "english" ? (
          <>
            <h1 className="text-black text-center">TEXT GUIDE 1</h1>
            <h1 className="text-black text-center">TEXT GUIDE 2</h1>
          </>
        ) : (
          <>
            <h1 className="text-black text-center">patnubay 1</h1>
            <h1 className="text-black text-center">patnubay 2</h1>
          </>
        )}
        <br />
        <img src={yellow}  alt="admin" className="rounded-md content-center" />
      </IonContent>
    </IonPage>
  );
};

export default Lesit;
