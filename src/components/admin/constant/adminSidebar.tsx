import { Icon } from "@iconify/react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
// import { useEffect } from "react";
import { auth, db } from "../../utils/firebase";
import logo from "../../../assets/imgs/logo/qculogo.png";
import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "../../../assets/css/blurred.css";

interface ContainerProps {
  name: string;
}

const AdminSideBar: React.FC<ContainerProps> = ({ name }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [displayName, setDisplayName] = useState("");
  // Define state for superAdmin role
  const [hasSuperAdminRole, setHasSuperAdminRole] = useState(false);

  const handleLogout = async () => {
    const auth = getAuth();
    // Sign out the user
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        window.location.replace("/Login");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
        console.error("Sign-out error:", error);
      });
  };

  const Buildings = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        // User not authenticated
        alert("User not authenticated.");
        return;
      }

      // Add blurred background class to body
      document.body.classList.add("blurred-background");

      // Fetch current user's role and PIN
      const currentUserDocRef = doc(db, "users", currentUser.uid);
      const currentUserDocSnapshot = await getDoc(currentUserDocRef);
      if (!currentUserDocSnapshot.exists()) {
        // Current user data not found
        alert("User data not found.");
        return;
      }
      const currentUserData = currentUserDocSnapshot.data();
      const currentUserRole = currentUserData.role;
      const currentUserPin = currentUserData.pin;

      // Check if current user is admin or superAdmin
      if (currentUserRole === "admin" || currentUserRole === "superAdmin") {
          // Check if the current route is already the dashboard
          if (window.location.pathname === "/Building") {
          document.body.classList.remove("blurred-background");
          return;
        }

        // Prompt user for PIN
        const pinInput = prompt("Enter your PIN:");
        if (pinInput === null) {
          document.body.classList.remove("blurred-background");
          return;
        }

        // Verify PIN
        if (pinInput !== currentUserPin) {
          alert("Incorrect PIN. Export action canceled.");
          document.body.classList.remove("blurred-background");
          return;
        }

        if (pinInput === currentUserPin) {
          history.replace("/Building");
          document.body.classList.remove("blurred-background");
        }
      } else {
        alert("User does not have permission.");
        document.body.classList.remove("blurred-background");
      }
    } catch (error) {
      console.error("Error on permission:", error);
      document.body.classList.remove("blurred-background");
    }
  };

  const Rooms = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        // User not authenticated
        alert("User not authenticated.");
        return;
      }

      // Add blurred background class to body
      document.body.classList.add("blurred-background");

      // Fetch current user's role and PIN
      const currentUserDocRef = doc(db, "users", currentUser.uid);
      const currentUserDocSnapshot = await getDoc(currentUserDocRef);
      if (!currentUserDocSnapshot.exists()) {
        // Current user data not found
        alert("User data not found.");
        return;
      }
      const currentUserData = currentUserDocSnapshot.data();
      const currentUserRole = currentUserData.role;
      const currentUserPin = currentUserData.pin;

      // Check if current user is admin or superAdmin
      if (currentUserRole === "admin" || currentUserRole === "superAdmin") {
          // Check if the current route is already the dashboard
          if (window.location.pathname === "/Rooms") {
          document.body.classList.remove("blurred-background");
          return;
        }
        // Prompt user for PIN
        const pinInput = prompt("Enter your PIN:");
        if (pinInput === null) {
          document.body.classList.remove("blurred-background");
          return;
        }

        // Verify PIN
        if (pinInput !== currentUserPin) {
          alert("Incorrect PIN. Export action canceled.");
          document.body.classList.remove("blurred-background");
          return;
        }

        if (pinInput === currentUserPin) {
          history.replace("/Rooms");
          document.body.classList.remove("blurred-background");
        }
      } else {
        alert("User does not have permission.");
        document.body.classList.remove("blurred-background");
      }
    } catch (error) {
      console.error("Error on permission:", error);
      document.body.classList.remove("blurred-background");
    }
  };

  const Dashboard = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        // User not authenticated
        alert("User not authenticated.");
        return;
      }

      // Add blurred background class to body
      document.body.classList.add("blurred-background");

      // Fetch current user's role and PIN
      const currentUserDocRef = doc(db, "users", currentUser.uid);
      const currentUserDocSnapshot = await getDoc(currentUserDocRef);
      if (!currentUserDocSnapshot.exists()) {
        // Current user data not found
        alert("User data not found.");
        return;
      }
      const currentUserData = currentUserDocSnapshot.data();
      const currentUserRole = currentUserData.role;
      const currentUserPin = currentUserData.pin;

      // Check if current user is admin or superAdmin
      if (currentUserRole === "admin" || currentUserRole === "superAdmin") {
         // Check if the current route is already the dashboard
        if (window.location.pathname === "/Dashboard") {
          document.body.classList.remove("blurred-background");
          return;
        }

        // Prompt user for PIN
        const pinInput = prompt("Enter your PIN:");
        if (pinInput === null) {
          document.body.classList.remove("blurred-background");
          return;
        }

        // Verify PIN
        if (pinInput !== currentUserPin) {
          alert("Incorrect PIN. Export action canceled.");
          document.body.classList.remove("blurred-background");
          return;
        }

        if (pinInput === currentUserPin) {
          history.replace("/Dashboard");
          document.body.classList.remove("blurred-background");
        }
      } else {
        alert("User does not have permission.");
        document.body.classList.remove("blurred-background");
      }
    } catch (error) {
      console.error("Error on permission:", error);
      document.body.classList.remove("blurred-background");
    }
  };

  const Announcement = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        // User not authenticated
        alert("User not authenticated.");
        return;
      }

      // Add blurred background class to body
      document.body.classList.add("blurred-background");

      // Fetch current user's role and PIN
      const currentUserDocRef = doc(db, "users", currentUser.uid);
      const currentUserDocSnapshot = await getDoc(currentUserDocRef);
      if (!currentUserDocSnapshot.exists()) {
        // Current user data not found
        alert("User data not found.");
        return;
      }
      const currentUserData = currentUserDocSnapshot.data();
      const currentUserRole = currentUserData.role;
      const currentUserPin = currentUserData.pin;

      // Check if current user is admin or superAdmin
      if (currentUserRole === "admin" || currentUserRole === "superAdmin") {
          // Check if the current route is already the dashboard
          if (window.location.pathname === "/Announcements") {
          document.body.classList.remove("blurred-background");
          return;
        }
        // Prompt user for PIN
        const pinInput = prompt("Enter your PIN:");
        if (pinInput === null) {
          document.body.classList.remove("blurred-background");
          return;
        }

        // Verify PIN
        if (pinInput !== currentUserPin) {
          alert("Incorrect PIN. Export action canceled.");
          document.body.classList.remove("blurred-background");
          return;
        }

        if (pinInput === currentUserPin) {
          history.replace("/Announcements");
          document.body.classList.remove("blurred-background");
        }
      } else {
        alert("User does not have permission.");
        document.body.classList.remove("blurred-background");
      }
    } catch (error) {
      console.error("Error on permission:", error);
      document.body.classList.remove("blurred-background");
    }
  };

  const Archive = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        // User not authenticated
        alert("User not authenticated.");
        return;
      }

      // Add blurred background class to body
      document.body.classList.add("blurred-background");

      // Fetch current user's role and PIN
      const currentUserDocRef = doc(db, "users", currentUser.uid);
      const currentUserDocSnapshot = await getDoc(currentUserDocRef);
      if (!currentUserDocSnapshot.exists()) {
        // Current user data not found
        alert("User data not found.");
        return;
      }
      const currentUserData = currentUserDocSnapshot.data();
      const currentUserRole = currentUserData.role;
      const currentUserPin = currentUserData.pin;

      // Check if current user is admin or superAdmin
      if (currentUserRole === "admin" || currentUserRole === "superAdmin") {
          // Check if the current route is already the dashboard
          if (window.location.pathname === "/Archive") {
          document.body.classList.remove("blurred-background");
          return;
        }
        // Prompt user for PIN
        const pinInput = prompt("Enter your PIN:");
        if (pinInput === null) {
          document.body.classList.remove("blurred-background");
          return;
        }

        // Verify PIN
        if (pinInput !== currentUserPin) {
          alert("Incorrect PIN. Export action canceled.");
          document.body.classList.remove("blurred-background");
          return;
        }

        if (pinInput === currentUserPin) {
          history.replace("/Archive");
          document.body.classList.remove("blurred-background");
        }
      } else {
        alert("User does not have permission.");
        document.body.classList.remove("blurred-background");
      }
    } catch (error) {
      console.error("Error on permission:", error);
      document.body.classList.remove("blurred-background");
    }
  };

  const User = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        // User not authenticated
        alert("User not authenticated.");
        return;
      }

      // Add blurred background class to body
      document.body.classList.add("blurred-background");

      // Fetch current user's role and PIN
      const currentUserDocRef = doc(db, "users", currentUser.uid);
      const currentUserDocSnapshot = await getDoc(currentUserDocRef);
      if (!currentUserDocSnapshot.exists()) {
        // Current user data not found
        alert("User data not found.");
        return;
      }
      const currentUserData = currentUserDocSnapshot.data();
      const currentUserRole = currentUserData.role;
      const currentUserPin = currentUserData.pin;

      // Check if current user is admin or superAdmin
      if (currentUserRole === "admin" || currentUserRole === "superAdmin") {
          // Check if the current route is already the dashboard
          if (window.location.pathname === "/Settings") {
          document.body.classList.remove("blurred-background");
          return;
        }
        // Prompt user for PIN
        const pinInput = prompt("Enter your PIN:");
        if (pinInput === null) {
          document.body.classList.remove("blurred-background");
          return;
        }

        // Verify PIN
        if (pinInput !== currentUserPin) {
          alert("Incorrect PIN. Export action canceled.");
          document.body.classList.remove("blurred-background");
          return;
        }

        if (pinInput === currentUserPin) {
          history.replace("/Settings");
          document.body.classList.remove("blurred-background");
        }
      } else {
        alert("User does not have permission.");
        document.body.classList.remove("blurred-background");
      }
    } catch (error) {
      console.error("Error on permission:", error);
      document.body.classList.remove("blurred-background");
    }
  };

  const Manual = async () => {
    history.replace("/Mike");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const uid = user.uid;

        // Fetch user document from Firestore
        const userDocRef = doc(db, "users", uid);
        getDoc(userDocRef)
          .then((docSnapshot) => {
            if (docSnapshot.exists()) {
              const userData = docSnapshot.data();
              if (userData) {
                // Set the displayName in state
                setDisplayName(userData.displayName);

                // Check if user has superAdmin role
                if (userData.role === "superAdmin") {
                  // Display the settings link
                  setHasSuperAdminRole(true);
                }
              }
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.error("Error getting user document:", error);
          });
      } else {
        // User is signed out
        history.push("/Login");
      }
    });
  }, []);

  return (
    <div
      id="application-sidebar"
      className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 h-auto font-semibold border-e  py-7 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 bg-base-300 text-base-content border-base-300"
    >
      <div className="px-6">
        <a
          className="flex items-center flex-none text-2xl font-semibold text-base-content dark:focus:outline-none"
          href="#"
          aria-label="Brand"
        >
          <img src={logo} className="w-12 h-12 mr-3" />
          QC-IOSK
        </a>
      </div>

      <nav
        className="flex flex-col flex-wrap justify-start flex-grow w-full h-full p-6"
        data-hs-accordion-always-open
      >
        <ul className="space-y-1.5 flex flex-col flex-grow">
          {hasSuperAdminRole && (
            <li>
              <button
                className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg text-base-content hover:bg-base-100 dark:focus:outline-none"
                onClick={Dashboard}
              >
                <Icon icon="lucide:layout-dashboard" className="h-7 w-7" />
                Dashboard
              </button>
            </li>
          )}
          {/* <li>
            <NavLink
              className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm  rounded-lg hover:bg-base-100 text-base-content dark:focus:outline-none"
              to="/SBMapScene"
            >
              <Icon
                icon="material-symbols:room-preferences-outline-rounded"
                className="w-7 h-7"
              />
              3D Map
            </NavLink>
          </li> */}

          {/* <li>
            <NavLink
              className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm  rounded-lg hover:bg-base-100 text-base-content dark:focus:outline-none"
              to="/SBMap"
            >
              <Icon
                icon="material-symbols:file-map-outline-rounded"
                className="w-7 h-7"
              />
              SB Map
            </NavLink>
          </li> */}

          <li>
            <button
              onClick={Buildings}
              className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm  rounded-lg hover:bg-base-100 text-base-content dark:focus:outline-none"
            >
              <Icon icon="bi:building-gear" className="w-7 h-7" />
              Buildings
            </button>
          </li>

          <li>
            <button
              className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm  rounded-lg hover:bg-base-100 text-base-content dark:focus:outline-none"
              onClick={Rooms}
            >
              <Icon
                icon="material-symbols:room-preferences-outline-rounded"
                className="w-7 h-7"
              />
              Rooms
            </button>
          </li>

          {/* <li>
            <NavLink
              className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm  rounded-lg hover:bg-base-100 text-base-content dark:focus:outline-none"
              to="/Events"
              onClick={Events}
            >
              <Icon icon="mdi:events" className="w-7 h-7" />
              Events
            </NavLink>
          </li> */}

          <li>
            <button
              className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm  rounded-lg hover:bg-base-100 text-base-content dark:focus:outline-none"
              onClick={Announcement}
            >
              <Icon icon="mingcute:announcement-line" className="w-7 h-7" />
              Announcements
            </button>
          </li>
          <li>
            <button
              className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm  rounded-lg hover:bg-base-100 text-base-content dark:focus:outline-none"
              onClick={Manual}
            >
              <Icon icon="tabler:hexagon-letter-m" className="w-7 h-7" />
              M.I.K.E
            </button>
          </li>

          {hasSuperAdminRole && (
            <li>
              <button
                className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm  rounded-lg hover:bg-base-100 text-base-content dark:focus:outline-none"
                onClick={Archive}
              >
                <Icon
                  icon="material-symbols:archive-outline"
                  className="w-7 h-7"
                />
                Archives
              </button>
            </li>
          )}

          {hasSuperAdminRole && (
            <li>
              <button
                className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg hover:bg-base-100 text-base-content dark:focus:outline-none"
                onClick={User}
              >
                <Icon icon="ci:settings" className="w-7 h-7" />
                User Settings
              </button>
            </li>
          )}
        </ul>
        <div className="flex flex-col">
          <li className="flex flex-col pb-5">Hello, {displayName}</li>
          <li className="flex flex-col pb-5">
            <a
              className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm bg-base-200 text-base-content rounded-lg hover:bg-error hover:text-base-content dark:focus:outline-none"
              onClick={handleLogout}
            >
              <Icon icon="solar:logout-3-broken" className="w-7 h-7" />
              Logout
            </a>
          </li>
        </div>
      </nav>
    </div>
  );
};

export default AdminSideBar;
