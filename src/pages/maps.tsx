import React, { useState } from 'react';
import { IonContent, IonPage } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SideBar from "../components/sidebar/sidebarLayout";
import Backbtn from "../components/navigation/Backbtn";
import sb from "../assets/imgs/selectCampus/SanBartolome.webp";
import b from "../assets/imgs/selectCampus/Batasan.webp";
import sf from "../assets/imgs/selectCampus/SanFransisco.webp";

const SelectCampus: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };

  const handleClick = (location: string) => {
    history.push(location);
  };

  return (
    <IonPage>
      <IonContent fullscreen className="bg-sc">
        <main className="shadow-none">
          <section className="max-w-auto px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <div className="relative p-6 md:p-16">
              <div className="relative z-10 lg:grid lg:grid-cols-12 lg:gap-0 lg:items-center">
                <div className="mb-10 lg:mb-0 lg:col-span-6 lg:col-start-8 lg:order-2">
                  <h2 className="text-3xl text-gray-800 font-bold sm:text-6xl dark:text-gray-200">
                    {t("Quezon City University Campuses and Maps")}
                  </h2>

                  <nav className="grid gap-4 mt-5 md:mt-10" aria-label="Tabs" role="tablist">
                    <button
                      type="button"
                      className={`hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start hover:bg-gray-200 p-4 md:p-5 rounded-xl dark:hs-tab-active:bg-slate-900 dark:hover:bg-gray-700 ${
                        activeTab === 1 ? 'hs-tab-active:bg-white' : ''
                      }`}
                      onClick={() => handleTabClick(1)}
                      role="tab"
                    >
                      <span className="flex">
                      <span className="grow ms-6">
                          <span className="block text-5xl font-semibold hs-tab-active:text-blue-600 text-gray-800 dark:hs-tab-active:text-blue-500 dark:text-gray-200">
                            {t("San Bartolome Campus")}
                          </span>
                          <span className="block mt-1 text-gray-800 dark:hs-tab-active:text-gray-200 dark:text-gray-200">
                            {t("Use Preline thoroughly thought and automated libraries to manage your businesses.")}
                          </span>
                        </span>
                      </span>
                    </button>

                    <button
                      type="button"
                      className={`hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start hover:bg-gray-200 p-4 md:p-5 rounded-xl dark:hs-tab-active:bg-slate-900 dark:hover:bg-gray-700 ${
                        activeTab === 2 ? 'hs-tab-active:bg-white' : ''
                      }`}
                      onClick={() => handleTabClick(2)}
                      role="tab"
                    >
                      <span className="flex">
                       <span className="grow ms-6">
                          <span className="block text-5xl font-semibold hs-tab-active:text-blue-600 text-gray-800 dark:hs-tab-active:text-blue-500 dark:text-gray-200">
                            {t("Batasan Campus")}
                          </span>
                          <span className="block mt-1 text-gray-800 dark:hs-tab-active:text-gray-200 dark:text-gray-200">
                            {t("Quickly Preline sample components, copy-paste codes, and start right off.")}
                          </span>
                        </span>
                      </span>
                    </button>

                    <button
                      type="button"
                      className={`hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start hover:bg-gray-200 p-4 md:p-5 rounded-xl dark:hs-tab-active:bg-slate-900 dark:hover:bg-gray-700 ${
                        activeTab === 3 ? 'hs-tab-active:bg-white' : ''
                      }`}
                      onClick={() => handleTabClick(3)}
                      role="tab"
                    >
                      <span className="flex">
                       <span className="grow ms-6">
                          <span className="block text-5xl font-semibold hs-tab-active:text-blue-600 text-gray-800 dark:hs-tab-active:text-blue-500 dark:text-gray-200">
                            {t("San Francisco Campus")}
                          </span>
                          <span className="block mt-1 text-gray-800 dark:hs-tab-active:text-gray-200 dark:text-gray-200">
                            {t("Reduce time and effort on building modern look design with Preline only.")}
                          </span>
                        </span>
                      </span>
                    </button>
                    
                  </nav>
                </div>

                <div className="lg:col-span-6">
                  <div className="relative">
                    <div>
                      <div id="tabs-with-card-1" className={`tab-content ${activeTab === 1 ? 'block' : 'hidden'}`} role="tabpanel" aria-labelledby="tabs-with-card-item-1">
                        <img className="shadow-xl shadow-gray-200 rounded-xl aspect-video  dark:shadow-gray-900/[.2]" src={sb} alt="San Bartolome Image" />
                      </div>

                      <div id="tabs-with-card-2" className={`tab-content ${activeTab === 2 ? 'block' : 'hidden'}`} role="tabpanel" aria-labelledby="tabs-with-card-item-2">
                        <img className="shadow-xl shadow-gray-200 rounded-xl aspect-video  dark:shadow-gray-900/[.2]" src={b} alt="Batasan Image" />
                      </div>

                      <div id="tabs-with-card-3" className={`tab-content ${activeTab === 3 ? 'block' : 'hidden'}`} role="tabpanel" aria-labelledby="tabs-with-card-item-3">
                        <img className="shadow-xl shadow-gray-200 rounded-xl aspect-video  dark:shadow-gray-900/[.2]" src={sf} alt="San Francisco Image" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Backbtn name={""}/>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default SelectCampus;
