
import React, { useState, useEffect } from 'react';
import { IonContent, IonPage } from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SideBar from "../components/sidebar/sidebarLayout";
import Backbtn from "../components/navigation/Backbtn";
import sb from "../assets/imgs/selectCampus/SanBartolome.webp";
import b from "../assets/imgs/selectCampus/Batasan.webp";
import sf from "../assets/imgs/selectCampus/SanFransisco.webp";
import dp from "../assets/imgs/selectCampus/developmentalplan.jpg";
import ep from "../assets/imgs/selectCampus/evacuationplan.jpg";
import sbloc from "../assets/imgs/sbLoc.png";
import baloc from "../assets/imgs/baLoc.png";
import sfloc from "../assets/imgs/sfLoc.png";
import Loading from './loading';

const SelectCampus: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [activeTab, setActiveTab] = useState(1);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust this delay as needed

    // Clean up timer on component unmount or if content is loaded before the delay
    return () => clearTimeout(timer);
  }, []);

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
          {loading ? (//render loading component if loading is true 
            <section className="px-4 py-10 mx-auto max-w-auto sm:px-6 lg:px-8 lg:py-32">

              <div className="relative p-6 md:p-16">
                <div className="relative z-10 lg:grid lg:grid-cols-12 lg:gap-0 lg:items-center">
                  <div className="mb-10 lg:mb-0 lg:col-span-6 lg:col-start-8 lg:order-2">
                    <h2 className="text-3xl font-bold text-gray-800 sm:text-6xl dark:text-gray-200">
                      <div className="flex flex-col w-full gap-4">
                        <div className="skeleton h-12 w-[620px]"></div>
                        <div className="skeleton h-12 w-[560px]"></div>
                      </div>
                    </h2>
                    <nav className="grid gap-4 mt-5 md:mt-10" aria-label="Tabs" role="tablist">
                      <button type="button" className={`hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start hover:bg-transparent hover:shadow-2xl hover:shadow-blue-500 duration-150  p-4 md:p-5 rounded-xl   ${activeTab === 1 ? 'hs-tab-active:bg-white' : ''}`} onClick={() => handleTabClick(1)} role="tab"                      >
                        <span className="flex">
                          <span className="grow ms-6">
                            <span className="block text-5xl font-semibold text-gray-800 hs-tab-active:text-blue-600 dark:hs-tab-active:text-blue-500 dark:text-gray-200">
                              <div className="flex flex-col w-full gap-4">
                                <div className="skeleton h-12 w-[510px]"></div>
                              </div>
                            </span>
                            <span className="block mt-3 text-gray-800 dark:hs-tab-active:text-gray-200 dark:text-gray-200">
                              <div className="flex flex-col w-full gap-4">
                                <div className="skeleton h-5 w-[430px]"></div>
                              </div>
                            </span>
                            <span>
                            </span>
                          </span>
                        </span>
                      </button>
                      <button type="button" className={`hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start hover:bg-transparent hover:shadow-2xl hover:shadow-blue-500 duration-150  p-4 md:p-5 rounded-xl   ${activeTab === 2 ? 'hs-tab-active:bg-white' : ''}`} onClick={() => handleTabClick(2)} role="tab"                      >
                        <span className="flex w-full h-auto">
                          <span className="grow ms-6">
                            <span className="block text-5xl font-semibold text-gray-800 hs-tab-active:text-blue-600 dark:hs-tab-active:text-blue-500 dark:text-gray-200">
                              <div className="flex flex-col w-full gap-4">
                                <div className="skeleton h-12 w-[380px]"></div>
                              </div>
                            </span>
                            <span className="block mt-3 text-gray-800 dark:hs-tab-active:text-gray-200 dark:text-gray-200">
                              <div className="flex flex-col w-full gap-4">
                                <div className="skeleton h-5 w-[280px]"></div>
                              </div>
                            </span>
                            <span>
                            </span>
                          </span>

                        </span>
                      </button>
                      <button type="button" className={`hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start hover:bg-transparent hover:shadow-2xl hover:shadow-blue-500 duration-150  p-4 md:p-5 rounded-xl   ${activeTab === 3 ? 'hs-tab-active:bg-white ' : ''}`} onClick={() => handleTabClick(3)} role="tab"                      >
                        <span className="flex">
                          <span className="grow ms-6">
                            <span className="block text-5xl font-semibold text-gray-800 hs-tab-active:text-blue-600 dark:hs-tab-active:text-blue-500 dark:text-gray-200">
                              <div className="flex flex-col w-full gap-4">
                                <div className="skeleton h-12 w-[490px]"></div>
                              </div>
                            </span>
                            <span className="block mt-3 text-gray-800 dark:hs-tab-active:text-gray-200 dark:text-gray-200">
                              <div className="flex flex-col w-full gap-4">
                                <div className="skeleton h-5 w-[290px]"></div>
                              </div>
                            </span>
                            <span>
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
                          <a href="/SanBartolome" className="w-full h-full hover:scale-150">
                            <div className="flex flex-col w-full gap-4">
                              <div className="skeleton aspect-video"></div>
                            </div>
                          </a>
                          <div className="flex w-auto mt-5 space-x-3 justify-evenly ">
                            <button type="button" className={`btn hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start hover:bg-gray-200 rounded-xl  dark:hover:bg-gray-700 ${activeTab === 1 ? 'hs-tab-active:bg-white bg-transparent' : ''}`} onClick={() => handleTabClick(4)} role="tab">
                              <span className="flex">
                                <span className="grow">
                                  <span className="block text-xl font-semibold text-gray-800 hs-tab-active:text-blue-600 dark:hs-tab-active:text-blue-500 dark:text-gray-200">
                                    <div className="flex flex-col w-full gap-4">
                                      <div className="w-40 h-5 skeleton"></div>
                                    </div>
                                  </span>

                                </span>
                              </span>
                            </button>
                            <button type="button" className={`btn hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start hover:bg-gray-200 rounded-xl  dark:hover:bg-gray-700 ${activeTab === 1 ? 'hs-tab-active:bg-white hs-tab-active:text-accent bg-transparent' : ''}`} onClick={() => handleTabClick(5)} role="tab">
                              <span className="flex">
                                <span className="grow">
                                  <span className="block text-xl font-semibold text-gray-800 hs-tab-active:text-blue-600 dark:hs-tab-active:text-blue-500 dark:text-gray-200">
                                    <div className="flex flex-col w-full gap-4">
                                      <div className="w-40 h-5 skeleton"></div>
                                    </div>
                                  </span>

                                </span>
                              </span>
                            </button>
                          </div>
                        </div>

                        <div id="tabs-with-card-4" className={`tab-content ${activeTab === 4 ? 'block' : 'hidden'}`} role="tabpanel" aria-labelledby="tabs-with-card-item-4">
                          <img className="shadow-xl  rounded-xl aspect-video hover:scale-110 hover:shadow-2xl hover:shadow-blue-500 duration-150  dark:shadow-gray-900/[.2]" src={dp} alt="SB Developmental Plan Image" />

                        </div>

                        <div id="tabs-with-card-5" className={`tab-content ${activeTab === 5 ? 'block ' : 'hidden'}`} role="tabpanel" aria-labelledby="tabs-with-card-item-5">
                          <img className="shadow-xl shadow-gray-200 rounded-xl aspect-video dark:shadow-gray-900/[.2]" src={ep} alt="SB Evacuation Plan Image" />

                        </div>

                        <div id="tabs-with-card-2" className={`tab-content ${activeTab === 2 ? 'block' : 'hidden'}`} role="tabpanel" aria-labelledby="tabs-with-card-item-2">
                          <a href="/Batasan" className="w-full h-full hover:scale-150">
                            <img className="shadow-xl  rounded-xl aspect-video hover:scale-110 hover:shadow-2xl hover:shadow-blue-500 duration-150  dark:shadow-gray-900/[.2]" src={b} alt="Batasan Image" />
                          </a>
                        </div>
                        <div id="tabs-with-card-3" className={`tab-content ${activeTab === 3 ? 'block' : 'hidden'}`} role="tabpanel" aria-labelledby="tabs-with-card-item-3">
                          <a href="/SanFrancisco" className="w-full h-full hover:scale-150">
                            <img className="shadow-xl  rounded-xl aspect-video hover:scale-110 hover:shadow-2xl hover:shadow-blue-500 duration-150  dark:shadow-gray-900/[.2]" src={sf} alt="San Francisco Image" />
                          </a>
                        </div>
                        <div id="tabs-with-card-6" className={`tab-content ${activeTab === 6 ? 'block' : 'hidden'}`} role="tabpanel" aria-labelledby="tabs-with-card-item-6">
                          <a href="/SanFrancisco" className="w-full h-full hover:scale-150">
                            <img className="shadow-xl  rounded-xl aspect-video hover:scale-110 hover:shadow-2xl hover:shadow-blue-500 duration-150  dark:shadow-gray-900/[.2]" src={sf} alt="San Francisco Image" />
                          </a>
                        </div>
                        <div id="tabs-with-card-7" className={`tab-content ${activeTab === 7 ? 'block' : 'hidden'}`} role="tabpanel" aria-labelledby="tabs-with-card-item-7">
                          <a href="/SanFrancisco" className="w-full h-full hover:scale-150">
                            <img className="shadow-xl  rounded-xl aspect-video hover:scale-110 hover:shadow-2xl hover:shadow-blue-500 duration-150  dark:shadow-gray-900/[.2]" src={sf} alt="San Francisco Image" />
                          </a>
                        </div>
                        <div id="tabs-with-card-8" className={`tab-content ${activeTab === 8 ? 'block' : 'hidden'}`} role="tabpanel" aria-labelledby="tabs-with-card-item-8">
                          <a href="/SanFrancisco" className="w-full h-full hover:scale-150">
                            <img className="shadow-xl  rounded-xl aspect-video hover:scale-110 hover:shadow-2xl hover:shadow-blue-500 duration-150  dark:shadow-gray-900/[.2]" src={sf} alt="San Francisco Image" />
                          </a>
                        </div>


                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <section className="px-4 py-10 mx-auto max-w-auto sm:px-6 lg:px-8 lg:py-32">

              <div className="relative p-6 md:p-16">
                <div className="relative z-10 lg:grid lg:grid-cols-12 lg:gap-0 lg:items-center">
                  <div className="mb-10 lg:mb-0 lg:col-span-6 lg:col-start-8 lg:order-2">
                    <h2 className="text-3xl font-bold text-gray-800 sm:text-6xl dark:text-gray-200">
                      {t("Quezon City University Campuses")}
                    </h2>
                    <nav className="grid gap-4 mt-5 md:mt-10" aria-label="Tabs" role="tablist">
                      <button type="button" className={`hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start hover:bg-transparent hover:shadow-2xl hover:shadow-blue-500 duration-150  p-4 md:p-5 rounded-xl   ${activeTab === 1 ? 'hs-tab-active:bg-white shadow-2xl shadow-blue-500 border-blue-500 border-2' : ''}`} onClick={() => handleTabClick(1)} role="tab"                      >
                        <span className="flex items-center">
                          <span className="grow ms-6">
                            <span className="block text-5xl font-semibold text-gray-800 hs-tab-active:text-blue-600 dark:hs-tab-active:text-blue-500 dark:text-gray-200">
                              {t("San Bartolome Campus")}
                            </span>
                            <span className="block mt-1 text-gray-800 dark:hs-tab-active:text-gray-200 dark:text-gray-200">
                              {t("673 Quirino Highway, San Bartolome, Novaliches, Quezon City")}
                            </span>
                            <span>
                            </span>
                          </span>

                        </span>

                      </button>
                      <button type="button" className={`hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent border-2 text-start hover:bg-transparent hover:shadow-2xl hover:shadow-blue-500 duration-150  p-4 md:p-5 rounded-xl   ${activeTab === 2 ? 'hs-tab-active:bg-white shadow-2xl shadow-blue-500 border-blue-500 border-2' : ''}`} onClick={() => handleTabClick(2)} role="tab">
                        <span className="flex">
                          <span className="grow ms-6">
                            <span className="block text-5xl font-semibold text-gray-800 hs-tab-active:text-blue-600 dark:hs-tab-active:text-blue-500 dark:text-gray-200">
                              {t("Batasan Campus")}
                            </span>
                            <span className="block mt-1 text-gray-800 dark:hs-tab-active:text-gray-200 dark:text-gray-200">
                              {t("Batasan Rd, Quezon City, Metro Manila")}
                            </span>
                          </span>
                        </span>
                      </button>
                      <button type="button" className={`hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start hover:bg-transparent hover:shadow-2xl hover:shadow-blue-500 duration-150  p-4 md:p-5 rounded-xl   ${activeTab === 3 ? 'hs-tab-active:bg-white shadow-2xl shadow-blue-500 border-blue-500 border-2' : ''}`} onClick={() => handleTabClick(3)} role="tab">
                        <span className="flex">
                          <span className="grow ms-6">
                            <span className="block text-5xl font-semibold text-gray-800 hs-tab-active:text-blue-600 dark:hs-tab-active:text-blue-500 dark:text-gray-200">
                              {t("San Francisco Campus")}
                            </span>
                            <span className="block mt-1 text-gray-800 dark:hs-tab-active:text-gray-200 dark:text-gray-200">
                              {t("Bago Bantay, Quezon City, Metro Manila")}
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
                          <a href="/SanBartolome" className="w-full h-full hover:scale-150">
                            <img className="shadow-xl  rounded-xl aspect-video hover:scale-110 hover:shadow-2xl hover:shadow-blue-500 duration-150  dark:shadow-gray-900/[.2]" src={sb} alt="San Bartolome Image" />
                          </a>
                          <div className="flex w-auto mt-5 space-x-3 justify-evenly ">
                            <button type="button" className={`btn hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active: hover:border-transparent text-start hover:bg-gray-200 rounded-xl  dark:hover:bg-gray-700 ${activeTab === 1 ? 'hs-tab-active:bg-white bg-transparent' : ''}`} onClick={() => handleTabClick(4)} role="tab">
                              <span className="flex">
                                <span className="grow">
                                  <span className="block text-xl font-semibold text-gray-800 hs-tab-active:text-blue-600 dark:hs-tab-active:text-blue-500 dark:text-gray-200">
                                    {t("Developmental Plan")}
                                  </span>

                                </span>
                              </span>
                            </button>
                            <button type="button" className={`btn hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-start hover:bg-gray-200 rounded-xl  dark:hover:bg-gray-700 ${activeTab === 1 ? 'hs-tab-active:bg-white hs-tab-active:text-accent bg-transparent' : ''}`} onClick={() => handleTabClick(5)} role="tab">
                              <span className="flex">
                                <span className="grow">
                                  <span className="block text-xl font-semibold text-gray-800 hs-tab-active:text-blue-600 dark:hs-tab-active:text-blue-500 dark:text-gray-200">
                                    {t("Evacuation Plan")}
                                  </span>

                                </span>
                              </span>
                            </button>
                            <button type="button" className={`btn hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active: hover:border-transparent text-start hover:bg-gray-200 rounded-xl  dark:hover:bg-gray-700 ${activeTab === 1 ? 'hs-tab-active:bg-white bg-transparent' : ''}`} onClick={() => handleTabClick(6)} role="tab">
                              <span className="flex">
                                <span className="grow">
                                  <span className="block text-xl font-semibold text-gray-800 hs-tab-active:text-blue-600 dark:hs-tab-active:text-blue-500 dark:text-gray-200">
                                    {t("Location")}
                                  </span>

                                </span>
                              </span>
                            </button>
                          </div>
                        </div>

                        

                        <div id="tabs-with-card-2" className={`tab-content ${activeTab === 2 ? 'block' : 'hidden'}`} role="tabpanel" aria-labelledby="tabs-with-card-item-2">
                          <a href="/Batasan" className="w-full h-full hover:scale-150">
                            <img className="shadow-xl  rounded-xl aspect-video hover:scale-110 hover:shadow-2xl hover:shadow-blue-500 duration-150  dark:shadow-gray-900/[.2]" src={b} alt="Batasan Image" />
                          </a>
                          <div className="flex w-auto mt-5 space-x-3 justify-evenly ">
                            <button type="button" className={`btn hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active: hover:border-transparent text-start hover:bg-gray-200 rounded-xl  dark:hover:bg-gray-700 ${activeTab === 2 ? 'hs-tab-active:bg-white bg-transparent' : ''}`} onClick={() => handleTabClick(7)} role="tab">
                              <span className="flex">
                                <span className="grow">
                                  <span className="block text-xl font-semibold text-gray-800 hs-tab-active:text-blue-600 dark:hs-tab-active:text-blue-500 dark:text-gray-200">
                                    {t("Location")}
                                  </span>

                                </span>
                              </span>
                            </button>
                      
                          </div>
                        </div>
                        <div id="tabs-with-card-3" className={`tab-content ${activeTab === 3 ? 'block' : 'hidden'}`} role="tabpanel" aria-labelledby="tabs-with-card-item-3">
                          <a href="/SanFrancisco" className="w-full h-full hover:scale-150">
                            <img className="shadow-xl  rounded-xl aspect-video hover:scale-110 hover:shadow-2xl hover:shadow-blue-500 duration-150  dark:shadow-gray-900/[.2]" src={sf} alt="San Francisco Image" />
                          </a>
                          <div className="flex w-auto mt-5 space-x-3 justify-evenly ">
                            <button type="button" className={`btn hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active: hover:border-transparent text-start hover:bg-gray-200 rounded-xl  dark:hover:bg-gray-700 ${activeTab === 3 ? 'hs-tab-active:bg-white bg-transparent' : ''}`} onClick={() => handleTabClick(8)} role="tab">
                              <span className="flex">
                                <span className="grow">
                                  <span className="block text-xl font-semibold text-gray-800 hs-tab-active:text-blue-600 dark:hs-tab-active:text-blue-500 dark:text-gray-200">
                                    {t("Location")}
                                  </span>

                                </span>
                              </span>
                            </button>
                           
                          </div>
                        </div>
                        
                        <div id="tabs-with-card-4" className={`tab-content ${activeTab === 4 ? 'block' : 'hidden'}`} role="tabpanel" aria-labelledby="tabs-with-card-item-4">
                          <img className="shadow-xl  rounded-xl aspect-video hover:scale-110 hover:shadow-2xl hover:shadow-blue-500 duration-150  dark:shadow-gray-900/[.2]" src={dp} alt="SB Developmental Plan Image" />
                          <div className="flex w-auto mt-5 space-x-3 justify-evenly ">
                            <button type="button" className={`btn hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active: hover:border-transparent text-start hover:bg-gray-200 rounded-xl  dark:hover:bg-gray-700 ${activeTab === 4 ? 'hs-tab-active:bg-white bg-transparent' : ''}`} onClick={() => handleTabClick(1)} role="tab">
                              <span className="flex">
                                <span className="grow">
                                  <span className="block text-xl font-semibold text-gray-800 hs-tab-active:text-blue-600 dark:hs-tab-active:text-blue-500 dark:text-gray-200">
                                    {t("QCU San Bartolome Campus")}
                                  </span>

                                </span>
                              </span>
                            </button>
                           
                          </div>
                        </div>

                        <div id="tabs-with-card-5" className={`tab-content ${activeTab === 5 ? 'block ' : 'hidden'}`} role="tabpanel" aria-labelledby="tabs-with-card-item-5">
                          <img className="shadow-xl shadow-gray-200 rounded-xl aspect-video dark:shadow-gray-900/[.2]" src={ep} alt="SB Evacuation Plan Image" />
                          <div className="flex w-auto mt-5 space-x-3 justify-evenly ">
                            <button type="button" className={`btn hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active: hover:border-transparent text-start hover:bg-gray-200 rounded-xl  dark:hover:bg-gray-700 ${activeTab === 5 ? 'hs-tab-active:bg-white bg-transparent' : ''}`} onClick={() => handleTabClick(1)} role="tab">
                              <span className="flex">
                                <span className="grow">
                                  <span className="block text-xl font-semibold text-gray-800 hs-tab-active:text-blue-600 dark:hs-tab-active:text-blue-500 dark:text-gray-200">
                                    {t("QCU San Bartolome Campus")}
                                  </span>

                                </span>
                              </span>
                            </button>
                           
                          </div>
                        </div>

                        <div id="tabs-with-card-6" className={`tab-content ${activeTab === 6 ? 'block' : 'hidden'}`} role="tabpanel" aria-labelledby="tabs-with-card-item-3">
                          <a href="/SanFrancisco" className="w-full h-full hover:scale-150">
                            <img className="shadow-xl  rounded-xl aspect-video hover:scale-110 hover:shadow-2xl hover:shadow-blue-500 duration-150  dark:shadow-gray-900/[.2]" src={sbloc} alt="San Bartolome Location Image" />
                          </a>
                          <div className="flex w-auto mt-5 space-x-3 justify-evenly ">
                            <button type="button" className={`btn hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active: hover:border-transparent text-start hover:bg-gray-200 rounded-xl  dark:hover:bg-gray-700 ${activeTab === 6 ? 'hs-tab-active:bg-white bg-transparent' : ''}`} onClick={() => handleTabClick(1)} role="tab">
                              <span className="flex">
                                <span className="grow">
                                  <span className="block text-xl font-semibold text-gray-800 hs-tab-active:text-blue-600 dark:hs-tab-active:text-blue-500 dark:text-gray-200">
                                    {t("Quezon City Hall - Quezon City University San Bartolome Campus")}
                                  </span>

                                </span>
                              </span>
                            </button>
                           
                          </div>
                        </div>

                        <div id="tabs-with-card-6" className={`tab-content ${activeTab === 7 ? 'block' : 'hidden'}`} role="tabpanel" aria-labelledby="tabs-with-card-item-3">
                          <a href="/Batasan" className="w-full h-full hover:scale-150">
                            <img className="shadow-xl  rounded-xl aspect-video hover:scale-110 hover:shadow-2xl hover:shadow-blue-500 duration-150  dark:shadow-gray-900/[.2]" src={baloc} alt="San Bartolome Location Image" />
                          </a>
                          <div className="flex w-auto mt-5 space-x-3 justify-evenly ">
                            <button type="button" className={`btn hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active: hover:border-transparent text-start hover:bg-gray-200 rounded-xl  dark:hover:bg-gray-700 ${activeTab === 7 ? 'hs-tab-active:bg-white bg-transparent' : ''}`} onClick={() => handleTabClick(2)} role="tab">
                              <span className="flex">
                                <span className="grow">
                                  <span className="block text-xl font-semibold text-gray-800 hs-tab-active:text-blue-600 dark:hs-tab-active:text-blue-500 dark:text-gray-200">
                                    {t("QCU San Bartolome Campus - QCU Batasan Campus")}
                                  </span>

                                </span>
                              </span>
                            </button>
                           
                          </div>
                        </div>

                        <div id="tabs-with-card-6" className={`tab-content ${activeTab === 8 ? 'block' : 'hidden'}`} role="tabpanel" aria-labelledby="tabs-with-card-item-3">
                          <a href="/SanFrancisco" className="w-full h-full hover:scale-150">
                            <img className="shadow-xl  rounded-xl aspect-video hover:scale-110 hover:shadow-2xl hover:shadow-blue-500 duration-150  dark:shadow-gray-900/[.2]" src={sfloc} alt="San Bartolome Location Image" />
                          </a>
                          <div className="flex w-auto mt-5 space-x-3 justify-evenly ">
                            <button type="button" className={`btn hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active: hover:border-transparent text-start hover:bg-gray-200 rounded-xl  dark:hover:bg-gray-700 ${activeTab === 8 ? 'hs-tab-active:bg-white bg-transparent' : ''}`} onClick={() => handleTabClick(3)} role="tab">
                              <span className="flex">
                                <span className="grow">
                                  <span className="block text-xl font-semibold text-gray-800 hs-tab-active:text-blue-600 dark:hs-tab-active:text-blue-500 dark:text-gray-200">
                                    {t("QCU San Bartolome Campus - QCU San Francisco Campus")}
                                  </span>

                                </span>
                              </span>
                            </button>
                           
                          </div>
                        </div>


                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          <Backbtn name={""} />
        </main>
      </IonContent>
    </IonPage>
  );
};

export default SelectCampus;

