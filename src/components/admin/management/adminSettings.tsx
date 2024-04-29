import { Icon } from "@iconify/react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AdminSideBar from "../constant/adminSidebar";
import AdminHeader from "../constant/adminHeader";
import { useState, useEffect, useMemo } from "react";
import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../../utils/firebase"; // Import firestore
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  collection,
  query,
  onSnapshot,
  deleteDoc,
  getDocs,
  where,
} from "firebase/firestore"; // Import getFirestore, doc, setDoc
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { deleteUser } from "firebase/auth";
import { IonContent, IonPage } from "@ionic/react";
import Modal from "react-modal";
import "../../../assets/css/blurred.css";

interface ContainerProps {
  name: string;
}

interface Admin {
  id: string;
  email: string;
  displayName: string;
  role: string;
  status: string;
}

const AdminSettings: React.FC<ContainerProps> = ({ name }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false); // State variable to toggle showing or hiding the PIN
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [showAlert, setShowAlert] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        console.log("uid", uid);
        history.push("/Settings");
      } else {
        // User is signed out
        // ...
        history.push("/Login");
      }
    });
  }, []);

  useEffect(() => {
    // Fetch PIN value from Firestore when the component mounts
    const fetchPin = async () => {
      try {
        const user = auth.currentUser; // Get the currently authenticated user
        if (user) {
          const uid = user.uid; // Get the UID of the current user
          const docRef = doc(db, "users", uid); // Reference to the document using the UID
          const docSnap = await getDoc(docRef); // Fetch the document
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data && data.pin) {
              setPin(data.pin); // Set the PIN from the document data
            }
          }
        }
      } catch (error) {
        console.error("Error fetching PIN from Firestore:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchPin();
  }, []);

  const updatePinInFirestore = async (newPin: string) => {
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
      }
      const user = auth.currentUser; // Get the currently authenticated user
      if (user) {
        // Validate PIN length
        if (pin.length < 6 || pin.length > 8) {
          // If PIN length is invalid, show an alert or perform any other validation handling
          alert("PIN must be between 6 and 8 characters.");
          document.body.classList.remove("blurred-background");
          return; // Exit the function early if validation fails
        }

        const uid = user.uid; // Get the UID of the current user
        const docRef = doc(db, "users", uid); // Reference to the document using the UID
        await setDoc(docRef, { pin: newPin }, { merge: true }); // Update the PIN in Firestore
        console.log("PIN saved successfully in Firestore.");
        document.body.classList.remove("blurred-background");
        alert("PIN saved successfully in Firestore.");
      }
    } catch (error) {
      console.error("Error saving PIN in Firestore:", error);
    }
  };

  const handleResetPassword = async () => {
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

        await sendPasswordResetEmail(auth, email);
        setShowAlert(true);
      } else {
        alert("User does not have permission to reset password.");
        document.body.classList.remove("blurred-background");
      }
    } catch (error) {
      console.error("Error sending reset email:", error);
      document.body.classList.remove("blurred-background");
    }
  };

  const createAdminUser = async () => {
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

        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          "password"
        ); // Replace "password" with the desired default password
        if (user) {
          const now = serverTimestamp();
          // Update user profile with role as superAdmin
          await updateProfile(user, { displayName: "Admin Personnel" });

          // Add user to Firestore with role "admin"
          await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            role: "admin",
            displayName: "Admin Personnel",
            createdAt: now,
            status: "active",
          });
          console.log("Admin user created successfully.");
          alert("Admin user created successfully.");
        }
      } else {
        alert("User does not have permission to create user.");
        document.body.classList.remove("blurred-background");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      document.body.classList.remove("blurred-background");
    }
  };

  const deleteUser = async () => {
    if (selectedUserId) {
      try {
        // const announcementToDelete = admins.find(
        //   (admin) => admin.id === selectedUserId
        // );

        // if (announcementToDelete) {
        //   await archiveAnnouncement(announcementToDelete);
        // }

        await deleteDoc(doc(db, "users", selectedUserId));

        const announcementsCollection = collection(db, "users");
        const announcementsSnapshot = await getDocs(announcementsCollection);
        const announcementsData = announcementsSnapshot.docs.map((doc) => {
          const announcementData = doc.data() as Admin;
          return { ...announcementData, id: doc.id } as Admin;
        });
        setAdmins(announcementsData);

        closeDeleteConfirmation();
        console.log("User deleted successfully!");
        alert("User deleted successfully!");
      } catch (error) {
        console.error("Error deleting user: ", error);
        alert("Error on deleting user.");
      }
    }
  };

  const openDeleteConfirmation = (userId: string) => {
    setSelectedUserId(userId);
  };

  const closeDeleteConfirmation = () => {
    setSelectedUserId(null);
  };

  const updateUser = (userId: string) => {
    history.replace(`/Settings/${userId}`);
  };

  useEffect(() => {
    let unsubscribeUsers: () => void;

    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const queryUser = query(usersCollection);
        unsubscribeUsers = onSnapshot(queryUser, (querySnapshot) => {
          const userData = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            const user: Admin = {
              id: doc.id,
              email: data.email,
              displayName: data.displayName,
              role: data.role,
              status: data.status,
            };

            return user;
          });

          setAdmins(userData);
          setLoading(false);
        });
      } catch (error) {
        console.error("Error fetching users: ", error);
        setLoading(false);
      }
    };

    fetchUsers();
    return () => {
      if (unsubscribeUsers) {
        unsubscribeUsers();
      }
    };
  }, [admins]);

  const columns = useMemo<MRT_ColumnDef<Admin>[]>(
    () => [
      {
        accessorKey: "actions",
        header: "Actions",
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              onClick={() => handleEdit(row.original.id)}
              className="btn btn-primary"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(row.original.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        ),
      },
      { accessorKey: "id", header: "User UID", size: 150 },
      { accessorKey: "email", header: "Email", size: 150 },
      {
        accessorKey: "displayName",
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "role",
        header: "Role",
        size: 150,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: admins,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    muiTableBodyRowProps: { hover: false },
  });

  const handleEdit = async (userId: string) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        // User not authenticated
        alert("User not authenticated.");
        return;
      }

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

      // Fetch user data of the user being edited
      const userDocRef = doc(db, "users", userId);
      const userDocSnapshot = await getDoc(userDocRef);
      if (!userDocSnapshot.exists()) {
        // User being edited not found
        alert("User being edited not found.");
        return;
      }
      const userData = userDocSnapshot.data();
      const userRole = userData.role;
      const userPin = userData.pin;

      // Check if current user is admin and user being edited is superAdmin
      if (currentUserRole === "admin" && userRole === "superAdmin") {
        // Prompt admin for superAdmin PIN
        const superAdminPinInput = prompt("Enter superAdmin PIN:");
        if (superAdminPinInput === null) return; // User canceled the prompt

        // Verify superAdmin PIN
        if (superAdminPinInput !== userPin) {
          alert("Incorrect superAdmin PIN. Edit action canceled.");
          return;
        }
      }

      // Prompt user for their own PIN
      const userPinInput = prompt("Enter your PIN:");
      if (userPinInput === null) return; // User canceled the prompt

      // Verify user PIN
      if (userPinInput !== currentUserPin) {
        alert("Incorrect PIN. Edit action canceled.");
        return;
      }

      // Proceed with edit action
      updateUser(userId);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        // User not authenticated
        alert("User not authenticated.");
        return;
      }

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

      // Fetch user data of the user being edited
      const userDocRef = doc(db, "users", userId);
      const userDocSnapshot = await getDoc(userDocRef);
      if (!userDocSnapshot.exists()) {
        // User being edited not found
        alert("User being edited not found.");
        return;
      }
      const userData = userDocSnapshot.data();
      const userRole = userData.role;
      const userPin = userData.pin;

      // Check if current user is admin and user being edited is superAdmin
      if (currentUserRole === "admin" && userRole === "superAdmin") {
        // Prompt admin for superAdmin PIN
        const superAdminPinInput = prompt("Enter superAdmin PIN:");
        if (superAdminPinInput === null) return; // User canceled the prompt

        // Verify superAdmin PIN
        if (superAdminPinInput !== userPin) {
          alert("Incorrect superAdmin PIN. Edit action canceled.");
          return;
        }
      }

      // Prompt user for their own PIN
      const userPinInput = prompt("Enter your PIN:");
      if (userPinInput === null) return; // User canceled the prompt

      // Verify user PIN
      if (userPinInput !== currentUserPin) {
        alert("Incorrect PIN. Edit action canceled.");
        return;
      }

      // Proceed with edit action
      openDeleteConfirmation(userId);
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <IonPage>
        <IonContent fullscreen>
          <AdminSideBar name={""} />
          <AdminHeader name={""} />
          <div className="items-center justify-center text-base-content bg-base-300 lg:ps-64 ">
            <div className="w-full min-h-screen p-10 bg-base-100 rounded-tl-3xl">
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-4xl">Admin Settings</h1>
              </div>
              <div>
                <label htmlFor="email">Email: </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <br />
              <button onClick={handleResetPassword} className="btn btn-danger">
                Reset Password
              </button>{" "}
              <button onClick={createAdminUser} className="btn btn-danger">
                Create Admin User
              </button>
              {showAlert && (
                <div>
                  <br />
                  <p>Password Reset Email Sent</p>
                  <p>
                    A password reset email has been sent to {email}. Please
                    check your inbox.
                  </p>
                </div>
              )}
              <br />
              <br />
              <div>
                <label htmlFor="pin">PIN: </label>
                <input
                  type={showPin ? "text" : "password"} // Show PIN as text or password based on showPin state
                  id="pin"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <br />
              {/* Call handleSavePin on button click */}
              <button
                onClick={() => setShowPin(!showPin)}
                className="btn btn-danger"
              >
                {showPin ? "Hide PIN" : "Show PIN"}
                {/* Toggle button to show or hide PIN */}
              </button>{" "}
              <button
                onClick={() => updatePinInFirestore(pin)}
                className="btn btn-danger"
              >
                Update PIN
              </button>
              <br />
              <br />
              {/* <div>
                <div>
                  <label htmlFor="deleteUid">User UID to delete: </label>{" "}
                  <input
                    type="text"
                    id="deleteUid"
                    value={deleteUid}
                    onChange={(e) => setDeleteUid(e.target.value)}
                    placeholder="Enter User UID"
                    className="input input-bordered w-full max-w-xs"
                  />
                  <span>
                    {" "}
                    <i>This is for deleting admin user.</i>
                  </span>
                </div>
                <br />
                <button className="btn btn-danger">Delete User</button>
              </div> */}
              <br />
              <br />
              {loading ? (
                <>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 justify-evenly">
                      <div className="w-20 h-5 skeleton"></div>
                      <div className="w-20 h-5 skeleton"></div>
                      <div className="w-20 h-5 skeleton"></div>
                      <div className="w-20 h-5 skeleton"></div>
                      <div className="w-20 h-5 skeleton"></div>
                      <div className="w-20 h-5 skeleton"></div>
                    </div>
                    <hr className="w-full h-2 rounded-full bg-base-300 " />
                    <div className="flex flex-col w-full gap-4">
                      <div className="w-full h-20 skeleton"></div>
                      <div className="w-full h-20 skeleton"></div>
                      <div className="w-full h-20 skeleton"></div>
                      <div className="w-full h-20 skeleton"></div>
                      <div className="w-full h-20 skeleton"></div>

                      <div className="w-full h-20 skeleton"></div>

                      <div className="w-full h-20 skeleton"></div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h1>Admin Account</h1>
                  <MaterialReactTable table={table} />
                </>
              )}
            </div>
          </div>
          {/* Delete Confirmation Modal */}
          <Modal
            className="flex items-center justify-center w-screen h-screen bg-black/60"
            isOpen={selectedUserId !== null}
            onRequestClose={closeDeleteConfirmation}
            ariaHideApp={false}
          >
            <div className="h-56 p-6 shadow-xl bg-base-100 rounded-2xl w-96">
              <p className="text-3xl text-center">
                Are you sure you want to delete this user?
              </p>
              <div className="flex justify-center mt-6 space-x-3">
                <button
                  onClick={deleteUser}
                  className="text-white btn btn-primary hover:bg-red-500"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={closeDeleteConfirmation}
                  className="btn bg-base-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal>
        </IonContent>
      </IonPage>
    </>
  );
};

export default AdminSettings;
