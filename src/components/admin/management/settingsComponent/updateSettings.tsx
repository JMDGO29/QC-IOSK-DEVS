import { IonContent, IonPage } from "@ionic/react";
import AdminSideBar from "../../constant/adminSidebar";
import AdminHeader from "../../constant/adminHeader";
import { useHistory, useParams } from "react-router";
import { useEffect, useState } from "react";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../utils/firebase";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";

interface ContainerProps {
  name: string;
  userId?: string;
}

interface Admin {
  id: string;
  email: string;
  displayName: string;
  role: string;
  status: string;
}

const UpdateSettings: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();
  const { userId } = useParams<{ userId: string }>();
  const [admins, setAdmins] = useState<Admin | null>(null);
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");

  const [role, setRole] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");

  const [status, setStatus] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const AnnouncementManagement = () => {
    history.push("/Settings");
  };

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const announcementRef = doc(db, "users", userId);
        const announcementDoc = await getDoc(announcementRef);

        if (announcementDoc.exists()) {
          const announcementData = announcementDoc.data() as Admin;
          setAdmins(announcementData);

          setEmail(announcementData.email);
          setDisplayName(announcementData.displayName);
          setRole(announcementData.role);
          setStatus(announcementData.status);
        } else {
          console.error("User not found");
          history.push("/Settinigs");
        }
      } catch (error) {
        console.error("Error fetching user: ", error);
      }
    };

    fetchAnnouncement();
  }, [userId, history]);

  const handleUpdateAnnouncement = async () => {
    try {
      const now = serverTimestamp();

      const announcementRef = doc(db, "users", userId);
      await updateDoc(announcementRef, {
        email,
        displayName,
        role: selectedRole || role,
        updatedAt: now,
        status: selectedStatus || status,
      });

      // Fetch the user document from Firestore using the userId
      const userDoc = await getDoc(doc(db, "users", userId));
      const userData = userDoc.data();

      console.log("User updated successfully!");
      toast.success("User updated successfully!");
      history.push("/Settings");
    } catch (error) {
      console.error("Error updating user: ", error);
      alert("Error on updating user.");
    }
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedRole(selected);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedStatus(selected);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <AdminSideBar name={""} />
          <AdminHeader name={""} />

          <div className="items-center justify-center text-base-content bg-base-300 lg:ps-64 ">
            <div className="w-full h-full grid-cols-4 grid-rows-5 gap-5 p-10 bg-base-100 rounded-tl-3xl">
              <div className="flex items-center space-x-2">
                <h1 className="text-4xl font-bold">Update User</h1>
              </div>

              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Display Name:</th>
                      <td>
                        <input
                          type="text"
                          placeholder="Display Name"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          className="w-full max-w-xs input input-bordered"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Email:</th>
                      <td>
                        <input
                          type="text"
                          placeholder="Display Name"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full max-w-xs input input-bordered"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Role:</th>
                      <td>
                        <select
                          className="w-full max-w-xs input input-bordered"
                          value={selectedRole || role}
                          onChange={handleRoleChange}
                        >
                          <option value="superAdmin">Super Admin</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <th>Status:</th>
                      <td>
                        <select
                          className="w-full max-w-xs input input-bordered"
                          value={selectedStatus || status}
                          onChange={handleStatusChange}
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}></td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex items-center justify-between mx-5 mt-5 space-x-2">
                  <button
                    onClick={AnnouncementManagement}
                    className="btn btn-square hover:bg-base-300 "
                  >
                    <Icon icon="icon-park-outline:back" className="w-10 h-10" />
                  </button>
                  <button
                    onClick={handleUpdateAnnouncement}
                    className="btn bg-base-300"
                  >
                    {" "}
                    <Icon icon="humbleicons:save" className="w-10 h-10" />
                    <span>Save</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UpdateSettings;
