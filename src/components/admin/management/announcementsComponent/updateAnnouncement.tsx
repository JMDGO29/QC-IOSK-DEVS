import { IonContent, IonPage } from "@ionic/react";
import AdminSideBar from "../../constant/adminSidebar";
import AdminHeader from "../../constant/adminHeader";
import { useHistory, useParams } from "react-router";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";

interface ContainerProps {
  name: string;
  announcementId?: string;
}

interface Announcement {
  id: string;
  name: string;
  announcementSource: string;
  announcementDesc: string;
  startDate: string;
  endDate: string;
  status: string;
  roomName: string;
  eventName: string;
}

const UpdateAnnouncement: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();
  const { announcementId } = useParams<{ announcementId: string }>();
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [announcementName, setAnnouncementName] = useState<string>("");
  const [announcementSource, setAnnouncementSource] = useState<string>("");
  const [announcementDesc, setAnnouncementDesc] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");
  const [eventName, setEventName] = useState<string>("");

  const AnnouncementManagement = () => {
    history.push("/Announcements");
  };

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const announcementRef = doc(db, "announcements", announcementId);
        const announcementDoc = await getDoc(announcementRef);

        if (announcementDoc.exists()) {
          const announcementData = announcementDoc.data() as Announcement;
          setAnnouncement(announcementData);

          setAnnouncementName(announcementData.name);
          setAnnouncementSource(announcementData.announcementSource);
          setAnnouncementDesc(announcementData.announcementDesc);
          setStartDate(announcementData.startDate);
          setEndDate(announcementData.endDate);
          setStatus(announcementData.status);
          setRoomName(announcementData.roomName);
          setEventName(announcementData.eventName);
        } else {
          console.error("Announcement not found");
          history.push("/Announcements");
        }
      } catch (error) {
        console.error("Error fetching announcement: ", error);
      }
    };

    fetchAnnouncement();
  }, [announcementId, history]);

  const handleUpdateAnnouncement = async () => {
    try {
      const now = serverTimestamp();

      const announcementRef = doc(db, "announcements", announcementId);
      await updateDoc(announcementRef, {
        name: announcementName,
        announcementSource,
        announcementDesc,
        startDate,
        endDate,
        status: selectedStatus || status,
        updatedAt: now,
        roomName,
        eventName,
      });

      console.log("Announcement updated successfully!");
      toast.success("Announcement updated successfully!");

      // If the selected status is "ONGOING EVENT", update roomData
      if ((selectedStatus || status) === "Ongoing event") {
        const roomDataQuery = query(
          collection(db, "roomData"),
          where("roomCode", "==", roomName)
        );
        const roomDataSnapshot = await getDocs(roomDataQuery);
        roomDataSnapshot.forEach(async (doc) => {
          try {
            await updateDoc(doc.ref, {
              status: "Ongoing event",
              // You can add more fields to update here if needed
            });
            console.log(
              `Room data for room '${roomName}' updated successfully.`
            );
          } catch (error) {
            console.error(
              `Error updating room data for room '${roomName}': `,
              error
            );
          }
        });
      } else if ((selectedStatus || status) === "available") {
        const roomDataQuery = query(
          collection(db, "roomData"),
          where("roomCode", "==", roomName)
        );
        const roomDataSnapshot = await getDocs(roomDataQuery);
        roomDataSnapshot.forEach(async (doc) => {
          try {
            await updateDoc(doc.ref, {
              status: "available",
              // You can add more fields to update here if needed
            });
            console.log(
              `Room data for room '${roomName}' updated to 'Available' successfully.`
            );
          } catch (error) {
            console.error(
              `Error updating room data for room '${roomName}': `,
              error
            );
          }
        });
      } else {
        // If the status is not "Ongoing event" or "Available", update the status to "Not available"
        const roomDataQuery = query(
          collection(db, "roomData"),
          where("roomCode", "==", roomName)
        );
        const roomDataSnapshot = await getDocs(roomDataQuery);
        roomDataSnapshot.forEach(async (doc) => {
          try {
            await updateDoc(doc.ref, {
              status: "not available",
              // You can add more fields to update here if needed
            });
            console.log(
              `Room data for room '${roomName}' updated to 'Not available' successfully.`
            );
          } catch (error) {
            console.error(
              `Error updating room data for room '${roomName}': `,
              error
            );
          }
        });
      }

      history.push("/Announcements");
    } catch (error) {
      console.error("Error updating announcement: ", error);
      alert("Error on updating announcement.");
    }
  };
  

  const handleStatutsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
                <h1 className="text-4xl font-bold">Update Announcement</h1>
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
                      <th>Announcement Name:</th>
                      <td>
                        <input
                          type="text"
                          placeholder="Announcement Name"
                          value={announcementName}
                          onChange={(e) => setAnnouncementName(e.target.value)}
                          className="w-full max-w-xs input input-bordered"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Announcement Source:</th>
                      <td>
                        <input
                          type="text"
                          placeholder="Announcement Source"
                          value={announcementSource}
                          onChange={(e) =>
                            setAnnouncementSource(e.target.value)
                          }
                          className="w-full max-w-xs input input-bordered"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Announcement Description:</th>
                      <td>
                        <textarea
                          value={announcementDesc}
                          placeholder="Announcement Description..."
                          onChange={(e) => setAnnouncementDesc(e.target.value)}
                          className="w-full max-w-xs textarea textarea-bordered textarea-xs"
                        ></textarea>
                      </td>
                    </tr>
                    <tr>
                      <th>Start Date:</th>
                      <td>
                        <input
                          type="datetime-local"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="w-full max-w-xs input input-bordered"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>End Date:</th>
                      <td>
                        <input
                          type="datetime-local"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="w-full max-w-xs input input-bordered"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Status:</th>
                      <td>
                        <select
                          className="w-full max-w-xs input input-bordered"
                          value={selectedStatus || status}
                          onChange={handleStatutsChange}
                        >
                          <option value="available">Available</option>
                          <option value="Ongoing event">Ongoing Event</option>
                          <option value="not available">Not Available</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <th>Room Name:</th>
                      <td>
                        <input
                          type="text"
                          placeholder="Room Name"
                          value={roomName}
                          onChange={(e) => setRoomName(e.target.value)}
                          className="w-full max-w-xs input input-bordered"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Event Name:</th>
                      <td>
                        <input
                          type="text"
                          placeholder="Room Name"
                          value={eventName}
                          onChange={(e) => setEventName(e.target.value)}
                          className="w-full max-w-xs input input-bordered"
                        />
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

export default UpdateAnnouncement;
