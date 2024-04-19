import { IonContent, IonPage } from "@ionic/react";
import AdminSideBar from "../../constant/adminSidebar";
import AdminHeader from "../../constant/adminHeader";
import { useState, useEffect } from "react";
import {
  doc,
  serverTimestamp,
  setDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db, storage } from "../../../utils/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from "@iconify/react";
import { useHistory, useParams } from "react-router";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface ContainerProps {
  name: string;
  roomId?: string;
}

interface Room {
  id: string;
  buildingName: string;
  floorLevel: string;
  roomCode: string;
  roomName: string;
  distance: string;
  eta: string;
  squareMeter: string;
  status: string;
  roomAnimation: string;
  voiceGuide: string;
  textGuide: string[];
  updatedAt: firebase.default.firestore.Timestamp;
}

const UpdateRoom: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();
  const [room, setRoom] = useState<Room | null>(null);
  const { roomId } = useParams<{ roomId: string }>();

  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const [buildingName, setBuildingName] = useState<string>("");
  const [floorLevel, setFloorLevel] = useState<string>("");
  const [roomCode, setRoomCode] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  const [eta, setEta] = useState<string>("");
  const [squareMeter, setSquareMeter] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [roomAnimation, setRoomAnimation] = useState<string>("");
  const [roomPathFile, setRoomPathFile] = useState<File | null>(null);
  const [voiceGuide, setVoiceGuide] = useState<string>("");
  const [voiceGuideFile, setVoiceGuideFile] = useState<File | null>(null);
  const [textGuides, setTextGuides] = useState<string[]>([""]);

  const handleStatutsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedStatus(selected);
  };

  const addTextGuide = () => {
    setTextGuides([...textGuides, ""]);
  };

  const removeTextGuide = (index: number) => {
    const updatedTextGuides = [...textGuides];
    updatedTextGuides.splice(index, 1);
    setTextGuides(updatedTextGuides);
  };

  const handleTextGuideChange = (index: number, value: string) => {
    const updatedTextGuides = [...textGuides];
    updatedTextGuides[index] = value;
    setTextGuides(updatedTextGuides);
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const roomRef = doc(db, "roomData", roomId);
        const roomDoc = await getDoc(roomRef);

        if (roomDoc.exists()) {
          const roomData = roomDoc.data() as Room;
          setRoom(roomData);

          setBuildingName(roomData.buildingName);
          setFloorLevel(roomData.floorLevel);
          setRoomCode(roomData.roomCode);
          setRoomName(roomData.roomName);
          setDistance(roomData.distance);
          setEta(roomData.eta);
          setSquareMeter(roomData.squareMeter);
          setStatus(roomData.status);
          setRoomAnimation(roomData.roomAnimation);
          setVoiceGuide(roomData.voiceGuide);
          setTextGuides(roomData.textGuide);
        } else {
          console.error("Building not found");
          history.push("/Building");
        }
      } catch (error) {
        console.error("Error fetching building: ", error);
      }
    };

    fetchRoom();
  }, [roomId, history]);

  const handleUpdateRoom = async () => {
    try {
      const now = serverTimestamp();
      let glbUrl = "";
      let voiceUrl = "";

      if (roomPathFile) {
        const storageRef = ref(storage, `roomAnimations/${roomId}`);
        const snapshot = await uploadBytes(storageRef, roomPathFile);
        glbUrl = await getDownloadURL(snapshot.ref);
      }

      if (voiceGuideFile) {
        const storageRef = ref(storage, `voiceGuide/${roomId}`);
        const snapshot = await uploadBytes(storageRef, voiceGuideFile);
        voiceUrl = await getDownloadURL(snapshot.ref);
      }

      const docRef = doc(db, "roomData", roomId);

      await setDoc(docRef, {
        buildingName: buildingName,
        floorLevel: floorLevel,
        roomCode: roomCode,
        roomName: roomName,
        distance: distance,
        eta: eta,
        squareMeter: squareMeter,
        status: selectedStatus,
        roomAnimation: glbUrl || roomAnimation,
        voiceGuide: voiceUrl || voiceGuide,
        textGuide: textGuides,
        updatedAt: now,
      });

      console.log("Room Information updated successfully!");
      toast.success("Room Information updated successfully!");
      history.push("/Rooms");
    } catch (error) {
      console.error("Error updating room information.", error);
      alert("Error on adding updating room information.");
    }
  };

  const Room = () => {
    history.push("/Rooms");
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <AdminSideBar name={""} />
          <AdminHeader name={""} />

          <div className="items-center justify-center text-base-content bg-base-300 lg:ps-64 ">
            <div className="w-full h-screen p-10 bg-base-100 rounded-tl-3xl">
              <div className="flex items-center space-x-2">
                <h1 className="text-4xl font-bold">Update Room</h1>
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
                      <th>Building Name:</th>
                      <td>
                        <input
                          type="text"
                          placeholder="Buiding Name"
                          className="w-full max-w-xs input input-bordered"
                          value={buildingName}
                          onChange={(e) => setBuildingName(e.target.value)}
                          readOnly
                        />
                      </td>
                      <th>Floor Level:</th>
                      <td>
                        <input
                          type="text"
                          placeholder="Floor Level"
                          className="w-full max-w-xs input input-bordered"
                          value={floorLevel}
                          onChange={(e) => setFloorLevel(e.target.value)}
                          // readOnly
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Room Code:</th>
                      <td>
                        <input
                          type="text"
                          placeholder="Room Code"
                          className="w-full max-w-xs input input-bordered"
                          value={roomCode}
                          onChange={(e) => setRoomCode(e.target.value)}
                        />
                      </td>
                      <th>Room Name:</th>
                      <td>
                        <input
                          type="text"
                          placeholder="Description"
                          className="w-full max-w-xs input input-bordered"
                          value={roomName}
                          onChange={(e) => setRoomName(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Distance:</th>
                      <td>
                        <input
                          type="text"
                          placeholder="Distance"
                          className="w-full max-w-xs input input-bordered"
                          value={distance}
                          onChange={(e) => setDistance(e.target.value)}
                        />
                      </td>
                      <th>ETA:</th>
                      <td>
                        <input
                          type="text"
                          placeholder="Estimated Time of Arrival"
                          className="w-full max-w-xs input input-bordered"
                          value={eta}
                          onChange={(e) => setEta(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Square Meter:</th>
                      <td>
                        <input
                          type="text"
                          placeholder="Square Meter"
                          className="w-full max-w-xs input input-bordered"
                          value={squareMeter}
                          onChange={(e) => setSquareMeter(e.target.value)}
                        />
                      </td>
                      <th>Status:</th>
                      <td>
                        <select
                          className="w-full max-w-xs input input-bordered"
                          value={selectedStatus || status}
                          onChange={handleStatutsChange}
                        >
                          <option value="available">Available</option>
                          <option value="not available">Not Available</option>
                        </select>
                      </td>
                    </tr>

                    <tr>
                      <th>Animation File:</th>
                      <td>
                        <input
                          type="file"
                          accept=".glb"
                          className="w-full max-w-xs file-input input-bordered"
                          onChange={(e) =>
                            setRoomPathFile(
                              e.target.files ? e.target.files[0] : null
                            )
                          }
                        />
                      </td>
                      <th>Current Animation File:</th>
                      <td>
                        <input
                          type="text"
                          placeholder="Animation"
                          className="w-full max-w-xs input input-bordered"
                          value={
                            roomAnimation
                              ? roomAnimation
                                  .substring(roomAnimation.lastIndexOf("/") + 1)
                                  .split("?")[0]
                              : ""
                          }
                          readOnly
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Voice Guide File:</th>
                      <td>
                        <input
                          type="file"
                          accept=".mp3"
                          className="w-full max-w-xs file-input input-bordered"
                          onChange={(e) =>
                            setVoiceGuideFile(
                              e.target.files ? e.target.files[0] : null
                            )
                          }
                        />
                      </td>
                      <th>Current Voice Guide File:</th>
                      <td>
                        <input
                          type="text"
                          placeholder="Voice Guide"
                          className="w-full max-w-xs input input-bordered"
                          value={
                            voiceGuide
                              ? voiceGuide
                                  .substring(voiceGuide.lastIndexOf("/") + 1)
                                  .split("?")[0]
                              : ""
                          }
                          readOnly
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Text Guide:</th>
                      <td colSpan={2}>
                        {textGuides.map((textGuide, index) => (
                          <div key={index} className="flex items-center mb-2">
                            <input
                              type="text"
                              value={textGuide}
                              onChange={(e) =>
                                handleTextGuideChange(index, e.target.value)
                              }
                              placeholder="Text Guide"
                              className="w-full max-w-xs input input-bordered"
                            />
                            <button
                              onClick={() => removeTextGuide(index)}
                              className="ml-2 btn btn-sm btn-error"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={addTextGuide}
                          className="btn btn-sm btn-secondary"
                        >
                          Add Text Guide
                        </button>
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>

                <div className="flex items-center justify-between mx-5 mt-5">
                  <button
                    onClick={Room}
                    className="btn btn-square hover:bg-base-300"
                  >
                    <Icon icon="icon-park-outline:back" className="w-10 h-10" />
                  </button>
                  <button
                    onClick={handleUpdateRoom}
                    className="float-right btn"
                  >
                    <Icon
                      icon="icon-park-outline:add-three"
                      className="w-10 h-10"
                    />
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

export default UpdateRoom;
