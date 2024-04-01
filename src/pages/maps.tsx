import { IonContent, IonPage } from "@ionic/react";
import React from 'react';
import { useHistory } from "react-router-dom";
import "../assets/css/Campuses.css";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import sample from "../assets/imgs/selectCampus/sample.png";
import devPlan from "../assets/imgs/selectCampus/developmentalPlan.png";
import sb from "../assets/imgs/selectCampus/SanBartolome.webp";
import b from "../assets/imgs/selectCampus/Batasan.webp";
import sf from "../assets/imgs/selectCampus/SanFransisco.webp";
import SideBar from "../components/sidebar/sidebarLayout";
interface ContainerProps {
  name: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ion-icon": any; // Add this declaration for ion-icon
    }
  }
}


const SelectCampus: React.FC<ContainerProps> = ({ name }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const handleClick = (location: string) => {
    // Navigate to the clicked location
    history.push(`/${location.toLowerCase()}`);
  };

  return (
    <IonPage>
      <IonContent fullscreen className="bg-sc">
        <main className="shadow-none">
          <section className="pb-40 m-4 md:m-8">
            <div className="container p-4 mx-auto my-6 space-y-2 text-center">
              <h2 className="text-5xl font-bold">Campus</h2>
              <p className="dark:text-gray-400">
                All Quezon City University Campus
              </p>
            </div>
            <div className="container grid justify-center gap-4 mx-auto sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center p-4" onClick={() => handleClick('SanBartolome')}>
                <img
                  src={sb}
                  className="h-64 duration-150 cursor-pointer w-96 rounded-2xl hover:scale-110"
                />
                <h3 className="my-3 text-3xl font-semibold">San Bartolome</h3>
                <div className="space-y-1 leadi"></div>
              </div>

              {/* BATASAN */}
             
                
                <div className="flex flex-col items-center p-4" onClick={() => handleClick('Batasan')}>
                  <img
                    src={b}
                    className="h-64 duration-150 cursor-pointer w-96 rounded-2xl hover:scale-110"
                  />
                  <h3 className="my-3 text-3xl font-semibold">Batasan</h3>

                  <div className="space-y-1 leadi"></div>
                </div>
              

              {/* SAN FRANCISCO */}
            
                
                <div className="flex flex-col items-center p-4" onClick={() => handleClick('SanFrancisco')}>
                  <img
                    src={sf}
                    className="h-64 duration-150 cursor-pointer w-96 rounded-2xl hover:scale-110"
                  />
                  <h3 className="my-3 text-3xl font-semibold">San Francisco</h3>
                  <div className="space-y-1 leadi"></div>
                </div>
              
            </div>

            <div className="container p-4 mx-auto my-6 space-y-2 text-center">
              <h2 className="text-5xl font-bold">Other Maps</h2>
              <p className="dark:text-gray-400">
                other maps of quezon city university
              </p>
            </div>
            <div className="container grid justify-center gap-4 mx-auto sm:grid-cols-2 lg:grid-cols-3">
              {/* San Bartolome Evacuation Plan */}
              <div className="indicator">
                <span className="indicator-item indicator-middle indicator-center badge badge-secondary">
                  Coming soon...
                </span>
                <div className="flex flex-col items-center p-4">
                  <img
                    src={sample}
                    className="h-64 duration-150 cursor-pointer w-96 rounded-2xl hover:scale-110"
                  />
                  <h3 className="my-3 text-3xl font-semibold text-center">
                    San Bartolome Evacuation Plan
                  </h3>
                  <div className="space-y-1 leadi"></div>
                </div>
              </div>
              {/* SB Development Plan */}
              <div className="indicator">
                <span className="indicator-item indicator-middle indicator-center badge badge-secondary">
                  Coming soon...
                </span>
                <div className="flex flex-col items-center p-4">
                  <img
                    src={devPlan}
                    className="h-64 duration-150 cursor-pointer w-96 rounded-2xl hover:scale-110"
                  />
                  <h3 className="my-3 text-3xl font-semibold text-center">
                    San Bartolome Developmental Plan
                  </h3>
                  <div className="space-y-1 leadi"></div>
                </div>
              </div>
            </div>
          </section>
          
          <SideBar/>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default SelectCampus;
