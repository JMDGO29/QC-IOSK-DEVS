import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { themeChange } from "theme-change";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { credits } from "../../data/creditsData";
import Modal from "react-modal";
import ep from "../../assets/imgs/selectCampus/evacuationplan.jpg"
import dp from "../../assets/imgs/selectCampus/developmentalplan.jpg"
const About: React.FC = () => {
  const history = useHistory();
  const [epModal, setEpModal] = useState(false);
  const [dpModal, setDpModal] = useState(false);
  const { t } = useTranslation();

  const viewEpModal = () => {
    setEpModal(true);
    
  }

  const viewDpModal = () => {
    setDpModal(true);
  }

  const closeModal = () => {
    setEpModal(false);
    setDpModal(false);
  }
  useEffect(() => {
    themeChange(false);
  });

  return (
    <div className="h-full py-10 bg-base-100 text-base-content">
      <div className="sticky top-0 z-50 px-3 py-1 pb-5 transition-all duration-150 ease-in-out bg-base-100 ">
        <div className="flex items-baseline justify-between ">
          <h1 className="text-4xl font-bold text-left ">{t("About")}</h1>
        </div>
        <div className="text-sm">
          {t("few things about the qc-iosk and the team behind it.")}
        </div>
      </div>
      <div className="w-full px-4 space-y-3 h-max rounded-2xl">
        {/* Purpose of QC-iosk */}
        <div
          tabIndex={0}
          className="mt-1 collapse collapse-arrow bg-base-300 rounded-2xl"
        >
          <input type="checkbox" />
          <div className="flex text-lg font-medium collapse-title">
            <Icon icon="humbleicons:certificate" className=" w-7 h-7" />
            <p className="ml-3 text-base-content">{t("Purpose of QC-iosk")}</p>
          </div>
          <div className="collapse-content bg-base-200">
            <div className="py-4 mx-auto">
              <h1 className="text-2xl font-bold text-center">{t("QC-IOSK by pathfinders.")}</h1>
              <div className="grid grid-cols-1 mx-auto text-center text-base-content rounded-3xl hover:drop-shadow-xl backdrop-blur-lg ">
                <div className="flex items-center gap-x-4">
                  <div className="grow">
                    <p className="text-base text-justify uppercase text-base-content">
                      {t("We developed the QC-IOSK (Kiosk for Quezon City University) with the primary aim of enhancing navigation within the university campus. Despite not being extensive, the campus layout can be confusing, particularly for newcomers. Navigating through various buildings and seeking assistance from individuals who might inadvertently provide incorrect information or explanations that are difficult to comprehend can be challenging. Therefore, the creation of the QC-IOSK serves as a solution to this issue, providing accurate and accessible information to aid students and visitors in navigating the campus effectively and efficiently.")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-4 mx-auto">
              <h1 className="text-2xl font-bold text-center">{t("Primary Objective")}</h1>
              <div className="grid grid-cols-1 mx-auto text-center text-base-content rounded-3xl hover:drop-shadow-xl backdrop-blur-lg ">
                <div className="flex items-center gap-x-4">
                  <div className="grow">
                    <p className="text-base text-justify uppercase text-base-content">
                      {t("The primary goal of this project is to create the QC-IOSK, a user-friendly navigation tool tailored for Quezon City University campuses. This system aims to enhance the navigation experience for students, university staff, and visitors by providing precise location information and a visual representation of the university's grounds.")}
                    </p>
                  </div>

                </div>

              </div>
            </div>
            <div className="py-4 mx-auto">
              <h1 className="text-2xl font-bold text-center">{t("DISCLAIMER")}</h1>
              <div className="grid grid-cols-1 mx-auto text-center text-base-content rounded-3xl hover:drop-shadow-xl backdrop-blur-lg ">
                <div className="flex items-center gap-x-4">
                  <div className="grow">
                    <p className="text-base text-justify uppercase text-base-content">
                      {t("The QC-IOSK is accurate as 80%, Expect a minimal difference in objects.")}
                    </p>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

        {/* QC-iosk Features - Powered by Devs */}


        {/* Acknowledgements - Documentors */}
        <div
          tabIndex={0}
          className="mt-1 collapse collapse-arrow bg-base-300 rounded-2xl"
        >
          <input type="checkbox" />
          <div className="flex text-lg font-medium collapse-title">
            <Icon icon="humbleicons:certificate" className=" w-7 h-7" />
            <p className="ml-3 text-base-content">{t("Acknowledgements")}</p>
          </div>
          <div className="collapse-content bg-base-200">
            <div className="py-4 mx-auto">
              <h1 className="text-2xl font-bold text-center">{t("Project Managers")}</h1>
              {credits.projectManagers.map((person, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 mx-auto text-center text-base-content rounded-3xl hover:drop-shadow-xl backdrop-blur-lg "
                >
                  <div className="flex items-center gap-x-4 ">
                    <div className="grow">
                      <h3 className="font-medium text-base-content">
                        {person.name}
                      </h3>
                      <p className="text-xs uppercase text-base-content">
                        {person.position}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="py-4 mx-auto">
              <h1 className="text-2xl font-bold text-center">{t("Documentators")}</h1>
              {credits.documentors.map((person, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 mx-auto text-center text-base-content rounded-3xl hover:drop-shadow-xl backdrop-blur-lg "
                >
                  <div className="flex items-center gap-x-4 ">
                    <div className="grow">
                      <h3 className="font-medium text-base-content">
                        {person.name}
                      </h3>
                      <p className="text-xs uppercase text-base-content">
                        {person.position}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="py-4 mx-auto">
              <h1 className="text-2xl font-bold text-center">{t("UI Designers")}</h1>
              {credits.uidesigners.map((person, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 mx-auto text-center text-base-content rounded-3xl hover:drop-shadow-xl backdrop-blur-lg "
                >
                  <div className="flex items-center gap-x-4 ">
                    <div className="grow">
                      <h3 className="font-medium text-base-content">
                        {person.name}
                      </h3>
                      <p className="text-xs uppercase text-base-content">
                        {person.position}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="py-4 mx-auto">
              <h1 className="text-2xl font-bold text-center">{t("Researchers")}</h1>
              {credits.researchers.map((person, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 mx-auto text-center text-base-content rounded-3xl hover:drop-shadow-xl backdrop-blur-lg "
                >
                  <div className="flex items-center gap-x-4 ">
                    <div className="grow">
                      <h3 className="font-medium text-base-content">
                        {person.name}
                      </h3>
                      <p className="text-xs uppercase text-base-content">
                        {person.position}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="py-4 mx-auto">
              <h1 className="text-2xl font-bold text-center">{t("System Analyst")}</h1>
              {credits.systemAnalyst.map((person, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 mx-auto text-center text-base-content rounded-3xl hover:drop-shadow-xl backdrop-blur-lg "
                >
                  <div className="flex items-center gap-x-4 ">
                    <div className="grow">
                      <h3 className="font-medium text-base-content">
                        {person.name}
                      </h3>
                      <p className="text-xs uppercase text-base-content">
                        {person.position}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="py-4 mx-auto">
              <h1 className="text-2xl font-bold text-center">{t("3D Modelers")}</h1>
              {credits.modelers.map((person, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 mx-auto text-center text-base-content rounded-3xl hover:drop-shadow-xl backdrop-blur-lg "
                >
                  <div className="flex items-center gap-x-4 ">
                    <div className="grow">
                      <h3 className="font-medium text-base-content">
                        {person.name}
                      </h3>
                      <p className="text-xs uppercase text-base-content">
                        {person.position}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="py-4 mx-auto">
              <h1 className="text-2xl font-bold text-center">{t("The Programmers")}</h1>
              {credits.programmers.map((person, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 mx-auto text-center text-base-content rounded-3xl hover:drop-shadow-xl backdrop-blur-lg "
                >
                  <div className="flex items-center gap-x-4 ">
                    <div className="grow">
                      <h3 className="font-medium text-base-content">
                        {person.name}
                        {/* Conditionally render tooltip for Mike Gester's position */}

                      </h3>
                      <p className="text-xs uppercase text-base-content hover:group">
                        {person.position}
                        {person.name === "Mike Gester Sabuga" && (
                          <div className="z-50 tooltip group-hover:tooltip-top" data-tip="I just pull things off the Internet and put it into my code.
                            ">

                            <button className="px-2 py-1 ml-3 rounded-full bg-base-300 ">ℹ️</button>
                          </div>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="py-4 mx-auto">
              <h1 className="text-2xl font-bold text-center">{t("Special Thanks to:")}</h1>
              {credits.translator.map((person, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 mx-auto text-center text-base-content rounded-3xl hover:drop-shadow-xl backdrop-blur-lg "
                >
                  <div className="flex items-center gap-x-4 ">
                    <div className="grow">
                      <h3 className="font-medium text-base-content">
                        {person.name}
                        {/* Conditionally render tooltip for Mike Gester's position */}

                      </h3>
                      <p className="text-xs uppercase text-base-content hover:group">
                        {person.position}
                        {person.name === "Mike Gester Sabuga" && (
                          <div className="z-50 tooltip group-hover:tooltip-top" data-tip="I just pull things off the Internet and put it into my code.
                            ">

                            <button className="px-2 py-1 ml-3 rounded-full bg-base-300 ">ℹ️</button>
                          </div>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-3 w-full justify-center items-center">
          <button className=" btn btn-block rounded-2xl py-3 h-16 bg-base-300 text-lg text-left " onClick={viewEpModal}>
            Evacuation Plan
          </button>
          <button className=" btn btn-block rounded-2xl py-3 h-16 bg-base-300 text-lg text-left " onClick={viewDpModal}>
            Developmental Plan
          </button>
        </div>
        <Modal
          className="flex items-center justify-center w-screen h-screen transition-all duration-150 ease-in-out bg-black/60"
          isOpen={epModal}
          onRequestClose={() => setEpModal(false)}
          contentLabel="Alert"
        >
         <div className="flex space-x-3 justify-center">
         <div className="h-8/12 p-6 shadow-xl bg-base-100 rounded-2xl w-8/12">
            <div className="flex justify-center space-x-3">
              <img src={ep} className="w-full h-full rounded-2xl" />

            </div>
          </div>
          <button onClick={closeModal} className="btn bg-base-300">
            <Icon icon="line-md:close-small" className="w-10 h-10" />
          </button>
         </div>
        </Modal>
        <Modal
          className="flex items-center justify-center w-screen h-screen transition-all duration-150 ease-in-out bg-black/60"
          isOpen={dpModal}
          onRequestClose={() => setDpModal(false)}
          contentLabel="Alert"
        >
         <div className="flex space-x-3 justify-center">
         <div className="h-8/12 p-6 shadow-xl bg-base-100 rounded-2xl w-8/12">
            <div className="flex justify-center space-x-3">
              <img src={dp} className="w-full h-full rounded-2xl" />

            </div>
          </div>
          <button onClick={closeModal} className="btn bg-base-300">
            <Icon icon="line-md:close-small" className="w-10 h-10" />
          </button>
         </div>
        </Modal>
      </div>
    </div>
  );
};

export default About;
