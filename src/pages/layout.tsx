import React, { useState, useEffect } from "react";
import { IonContent, IonPage } from "@ionic/react";
import { Switch, Route } from "react-router-dom";
import { themeChange } from "theme-change";
import { Icon } from "@iconify/react";
import WidgetPanel from "../components/widgets/widgetPanel";
import Sidebar from "../components/sidebar/sidebarLayout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from './loading';
import { Analytics } from "@vercel/analytics/react";
import SanBartolome from "../components/campus/sanBartolome/SanBartolome";
import Batasan from "../components/campus/batasan/Batasan";
import SanFrancisco from "../components/campus/sanFrancisco/SanFrancisco";

// Import your other components here

interface ContainerProps {
  name: string;
  buildingName: string;
}

const Layout: React.FC<ContainerProps> = ({ name }) => {
  // State to manage inactivity for showing the ScreenSaver
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Set a timeout to change isActive to true after 1 minute (30000 milliseconds)
    const timeoutId = setTimeout(() => {
      setIsActive(true);
    }, 30000); // 1 minute timeout

    return () => clearTimeout(timeoutId);
  }, []);

  // Function to handle click event to exit the ScreenSaver
  const handleClick = () => {
    setIsActive(false);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <Analytics />

        {/* Your other components */}
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
          <section onClick={handleClick} className="w-screen h-full min-h-screen overflow-hidden text-center bg-black cursor-pointer place-items-stretch">
            {/* Your ScreenSaver content here */}
            <div className="z-50 flex items-center justify-center w-screen h-screen skeleton bg-base-100">
            <div className="grid items-center grid-cols-3 grid-rows-3">
                <div className="flex content-center justify-center w-screen h-screen col-span-3 row-span-3">
                    <div className="content-center">
                        <div id="scsaver" className="scsaver">
                            <div className="scsaver-inner text-base-content">
                                <p>Hello, Scsaver.</p>
                                {/* <!-- Customize: Place images and videos and customize them to your liking. --> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
          </section>
        )}

        {/* Rendering selected option */}
        <Switch>
          <Route path="/SanBartolome" component={SanBartolome} />
          {/* <Route path="/Batasan" component={Batasan} />
          <Route path="/SanFrancisco" component={SanFrancisco} /> */}
        </Switch>
      </IonContent>
    </IonPage>
  );
};

export default Layout;
