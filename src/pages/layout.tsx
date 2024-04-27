import React, { useState, useEffect, Suspense } from "react";
import { IonContent, IonPage } from "@ionic/react";
import { Switch, Route } from "react-router-dom";
import { themeChange } from "theme-change";
import { Icon } from "@iconify/react";
import WidgetPanel from "../components/widgets/widgetPanel";
import Sidebar from "../components/sidebar/sidebarLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./loading";
import { Analytics } from "@vercel/analytics/react";
import SanBartolome from "../components/campus/sanBartolome/SanBartolome";
import Batasan from "../components/campus/batasan/Batasan";
import SanFrancisco from "../components/campus/sanFrancisco/SanFrancisco";
import qcuLogo from "../assets/imgs/logo/qculogo.png";
import bg from "../assets/imgs/sc-bg.png";
import "../assets/css/marquee.css";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../components/utils/firebase";

// Import your other components here

interface ContainerProps {
  name: string;
  buildingName: string;
}

interface Announcement {
  id: string;
  name: string;
  announcementSource: string;
  announcementDesc: string;
  startDate: string;
  endDate: string;
  status: string;
}

const Layout: React.FC<ContainerProps> = ({ name }) => {
  // State to manage inactivity for showing the ScreenSaver
  const [isActive, setIsActive] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcement | null>(null);

  useEffect(() => {
    // Set a timeout to change isActive to true after 1 minute (30000 milliseconds)
    const timeoutId = setTimeout(() => {
      setIsActive(true);
    }, 10000); // 1 minute timeout

    return () => clearTimeout(timeoutId);
  }, []);

  // Function to handle click event to exit the ScreenSaver
  const handleClick = () => {
    setIsActive(false);
  };

  useEffect(() => {
    let unsubscribeAnnouncements: () => void;

    const fetchAnnouncements = async () => {
      try {
        const announcementsCollection = collection(db, "announcements");
        const queryAnnouncement = query(announcementsCollection);

        unsubscribeAnnouncements = onSnapshot(
          queryAnnouncement,
          (querySnapshot) => {
            const announcementData = querySnapshot.docs
              .map((doc) => {
                const data = doc.data();
                const announcement: Announcement = {
                  id: doc.id,
                  name: data.name,
                  announcementSource: data.announcementSource,
                  announcementDesc: data.announcementDesc,
                  startDate: data.startDate,
                  endDate: data.endDate,
                  status: data.status,
                };
                return announcement;
              })
              .filter(
                (announcement) => announcement.status !== "not available"
              );
            setAnnouncements(announcementData);
          }
        );
      } catch (error) {
        console.error("Error fetching announcements: ", error);
      }
    };

    fetchAnnouncements();

    return () => {
      if (unsubscribeAnnouncements) {
        unsubscribeAnnouncements();
      }
    };
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <Analytics />

        <div className="marquee-container">
          <div className="marquee absolute z-50 top-8 left-28">
            <span>
              {announcements
                .filter((announcement) => {
                  // Filter announcements whose end date is near (e.g., within 7 days)
                  const endDate = new Date(announcement.endDate);
                  const currentDate = new Date();
                  const differenceInDays = Math.ceil(
                    (endDate.getTime() - currentDate.getTime()) /
                      (1000 * 3600 * 24)
                  );
                  return differenceInDays <= 1; // You can adjust the threshold as needed
                })
                .map(
                  (announcement, index) =>
                    `${announcement.announcementSource} - ${announcement.announcementDesc}`
                )
                .join(" ----------------------- ")}
            </span>
          </div>
        </div>

        <div className="absolute z-50 bottom-40 right-80 ">
          <div className="">
            <ToastContainer className="mb-1" newestOnTop />
          </div>
        </div>
        <div className="absolute top-0 left-0 z-50 ">
          <Sidebar />
        </div>
        <div className="absolute top-0 right-0 z-50 ">
          <WidgetPanel name={""} />
        </div>

        {/* Conditionally render ScreenSaver based on isActive state */}
        {isActive && (
          <div className="absolute z-50">
            <section
              onClick={handleClick}
              className="w-screen h-full min-h-screen overflow-hidden text-center cursor-pointer bg-sc place-items-stretch"
            >
              {/* Your ScreenSaver content here */}
              <div className="z-50 flex items-center justify-center w-screen h-screen skeleton bg-base-100">
                <div className="grid items-center grid-cols-3 grid-rows-3">
                  <div className="flex content-center justify-center w-screen h-screen col-span-3 row-span-3">
                    <div className="content-center">
                      <div id="scsaver" className="scsaver">
                        <div className="scsaver-inner text-base-content">
                          <div className="max-w-[100rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                            <div className="grid gap-40 md:grid-cols-5">
                              <div className="md:col-span-2">
                                <div className="max-w-lg">
                                  <img src={qcuLogo} className="w-40 h-40" />
                                  <h2 className="text-4xl font-bold text-left md:text-4xl md:leading-tight">
                                    QUEZON CITY UNIVERSITY
                                    <br />
                                  </h2>
                                  <p className="hidden mt-1 text-3xl text-left text-base-content md:block">
                                    Offered Courses
                                  </p>
                                </div>
                                <div className="absolute inset-x-0 flex items-center justify-center py-3 text-xl animate-bounce bottom-1 drop-shadow-md">
                                  Touch anywhere to return
                                </div>
                              </div>

                              <div className="md:col-span-3">
                                <div className="space-y-3">
                                  <div
                                    className=" hs-accordion active"
                                    id="hs-basic-with-title-and-arrow-stretched-heading-one"
                                  >
                                    <button
                                      className="inline-flex items-center justify-between w-full font-semibold transition border-2 rounded-xl text-base-content hs-accordion-toggle group gap-x-3 md:text-2xl text-start btn border-base-content"
                                      aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
                                    >
                                      Bachelor of Science and Accountancy
                                    </button>
                                    <div
                                      id="hs-basic-with-title-and-arrow-stretched-collapse-one"
                                      className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                                      aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one"
                                    ></div>
                                  </div>
                                  <div
                                    className=" hs-accordion active"
                                    id="hs-basic-with-title-and-arrow-stretched-heading-one"
                                  >
                                    <button
                                      className="inline-flex items-center justify-between w-full font-semibold transition border-2 rounded-xl text-base-content hs-accordion-toggle group gap-x-3 md:text-2xl text-start btn border-base-content"
                                      aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
                                    >
                                      Bachelor of Science in Entrepreneurship
                                    </button>
                                    <div
                                      id="hs-basic-with-title-and-arrow-stretched-collapse-one"
                                      className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                                      aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one"
                                    ></div>
                                  </div>
                                  <div
                                    className=" hs-accordion active"
                                    id="hs-basic-with-title-and-arrow-stretched-heading-one"
                                  >
                                    <button
                                      className="inline-flex items-center justify-between w-full font-semibold transition border-2 rounded-xl text-base-content hs-accordion-toggle group gap-x-3 md:text-2xl text-start btn border-base-content"
                                      aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
                                    >
                                      Bachelor of Science in Electronics
                                      Engineering
                                    </button>
                                    <div
                                      id="hs-basic-with-title-and-arrow-stretched-collapse-one"
                                      className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                                      aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one"
                                    ></div>
                                  </div>
                                  <div
                                    className=" hs-accordion active"
                                    id="hs-basic-with-title-and-arrow-stretched-heading-one"
                                  >
                                    <button
                                      className="inline-flex items-center justify-between w-full font-semibold transition border-2 rounded-xl text-base-content hs-accordion-toggle group gap-x-3 md:text-2xl text-start btn border-base-content"
                                      aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
                                    >
                                      Bachelor of Science in Industrial
                                      Engineering
                                    </button>
                                    <div
                                      id="hs-basic-with-title-and-arrow-stretched-collapse-one"
                                      className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                                      aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one"
                                    ></div>
                                  </div>
                                  <div
                                    className=" hs-accordion active"
                                    id="hs-basic-with-title-and-arrow-stretched-heading-one"
                                  >
                                    <button
                                      className="inline-flex items-center justify-between w-full font-semibold transition border-2 rounded-xl text-base-content hs-accordion-toggle group gap-x-3 md:text-2xl text-start btn border-base-content"
                                      aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
                                    >
                                      Bachelor of Science in Information
                                      Technology
                                    </button>
                                    <div
                                      id="hs-basic-with-title-and-arrow-stretched-collapse-one"
                                      className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                                      aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one"
                                    ></div>
                                  </div>
                                  <div
                                    className=" hs-accordion active"
                                    id="hs-basic-with-title-and-arrow-stretched-heading-one"
                                  >
                                    <button
                                      className="inline-flex items-center justify-between w-full font-semibold transition border-2 rounded-xl text-base-content hs-accordion-toggle group gap-x-3 md:text-2xl text-start btn border-base-content"
                                      aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
                                    >
                                      Bachelor of Science in Management
                                      Accounting
                                    </button>
                                    <div
                                      id="hs-basic-with-title-and-arrow-stretched-collapse-one"
                                      className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                                      aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one"
                                    ></div>
                                  </div>
                                  <div
                                    className=" hs-accordion active"
                                    id="hs-basic-with-title-and-arrow-stretched-heading-one"
                                  >
                                    <button
                                      className="inline-flex items-center justify-between w-full font-semibold transition border-2 rounded-xl text-base-content hs-accordion-toggle group gap-x-3 md:text-2xl text-start btn border-base-content"
                                      aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
                                    >
                                      Bachelor of Science in Early Childhood
                                      Education
                                    </button>
                                    <div
                                      id="hs-basic-with-title-and-arrow-stretched-collapse-one"
                                      className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                                      aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one"
                                    ></div>
                                  </div>
                                  <div
                                    className=" hs-accordion active"
                                    id="hs-basic-with-title-and-arrow-stretched-heading-one"
                                  >
                                    <button
                                      className="inline-flex items-center justify-between w-full font-semibold transition border-2 rounded-xl text-base-content hs-accordion-toggle group gap-x-3 md:text-2xl text-start btn border-base-content"
                                      aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
                                    >
                                      Bachelor of Science in Information Systems
                                    </button>
                                    <div
                                      id="hs-basic-with-title-and-arrow-stretched-collapse-one"
                                      className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                                      aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one"
                                    ></div>
                                  </div>
                                  <div
                                    className=" hs-accordion active"
                                    id="hs-basic-with-title-and-arrow-stretched-heading-one"
                                  >
                                    <button
                                      className="inline-flex items-center justify-between w-full font-semibold transition border-2 rounded-xl text-base-content hs-accordion-toggle group gap-x-3 md:text-2xl text-start btn border-base-content"
                                      aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
                                    >
                                      Bachelor of Science in Computer Science
                                    </button>
                                    <div
                                      id="hs-basic-with-title-and-arrow-stretched-collapse-one"
                                      className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                                      aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one"
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Rendering selected option */}
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path="/SanBartolome" component={SanBartolome} />
            {/* <Route path="/Batasan" component={Batasan} />
          <Route path="/SanFrancisco" component={SanFrancisco} /> */}
          </Switch>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default Layout;
