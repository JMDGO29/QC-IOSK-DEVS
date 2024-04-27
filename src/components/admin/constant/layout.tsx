import { IonContent, IonPage } from "@ionic/react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../utils/firebase";
import { Icon } from "@iconify/react";
import { useHistory } from "react-router";
import AdminSidebar from "./adminSidebar";
import AdminHeader from "./adminHeader";
import ThemeSelection from "../../sidebar/themes/themeSelection";
import ManageEvents from "../management/manageEvents";
import manageAnnouncements from "../management/manageAnnoucements";
import ManageAnnouncements from "../management/manageAnnoucements";
import { ToastContainer } from "react-toastify";

interface ContainerProps {
  name: string;
}

const AdminLayout: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();

  // const [inactiveTimer, setInactiveTimer] = useState<NodeJS.Timeout | null>(
  //   null
  // ); // State variable to track the inactive timer

  // // useEffect to handle user activity
  // useEffect(() => {
  //   const handleUserActivity = () => {
  //     if (inactiveTimer) {
  //       clearTimeout(inactiveTimer);
  //     }
  //     setInactiveTimer(
  //       setTimeout(() => {
  //         // Perform logout and redirect to login page
  //         signOut(auth)
  //           .then(() => {
  //             history.push("/Login");
  //           })
  //           .catch((error) => {
  //             console.error("Error signing out:", error);
  //           });
  //       }, 30000) // 60000 milliseconds = 1 minute
  //     );
  //   };

  //   window.addEventListener("mousemove", handleUserActivity);
  //   window.addEventListener("keypress", handleUserActivity);

  //   return () => {
  //     if (inactiveTimer) {
  //       clearTimeout(inactiveTimer);
  //     }
  //     window.removeEventListener("mousemove", handleUserActivity);
  //     window.removeEventListener("keypress", handleUserActivity);
  //   };
  // }, [inactiveTimer, history]);


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        console.log("uid", uid);
      } else {
        // User is signed out
        // ...
        console.log("user is logged out");
        history.push("/Login");
      }
    });
  }, []);

  // const handleLogout = () => {
  //   signOut(auth)
  //     .then(() => {
  //       // Sign-out successful.
  //       history.push("/SanBartolome");
  //       console.log("Signed out successfully");
  //     })
  //     .catch((error) => {
  //       // An error happened.
  //     });
  // };
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="w-full h-full bg-base-100">
          <AdminHeader name={"adminHeader"} />
          <AdminSidebar name={"adminSidebar"} />
          <ToastContainer />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AdminLayout;
