import { IonContent, IonPage } from "@ionic/react";
import AdminSideBar from "../../constant/adminSidebar";
import AdminHeader from "../../constant/adminHeader";
import { useState, useEffect } from "react";
import {
  serverTimestamp,
  collection,
  getDocs,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import { db, storage } from "../../../utils/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from "@iconify/react";
import { useHistory } from "react-router";

interface ContainerProps {
  name: string;
}

const CreateRoom: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();

  const [selectedFloor, setSelectedFloor] = useState<string>("Floor 1");
  const [roomCode, setRoomCode] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  const [eta, setEta] = useState<string>("");
  const [squareMeter, setSquareMeter] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("available");

  const [roomAnimationPath, setRoomAnimationPath] = useState<File | null>(null);
  const [voiceGuide, setVoiceGuide] = useState<File | null>(null);
  const [textGuides, setTextGuides] = useState<string[]>([""]);

  const [buildingNames, setBuildingNames] = useState<string[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<string>("");

  const [floorLevels, setFloorLevels] = useState<string[]>([]);

  useEffect(() => {
    fetchBuildingNames();
  }, []);

  const fetchBuildingNames = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "buildingData"));
      const names: string[] = [];
      querySnapshot.forEach((doc) => {
        names.push(doc.data().buildingName);
      });
      setBuildingNames(names);
    } catch (error) {
      console.error("Error fetching building names: ", error);
    }
  };

  useEffect(() => {
    if (selectedBuilding) {
      fetchFloorLevels(selectedBuilding);
    }
  }, [selectedBuilding]);

  const fetchFloorLevels = async (buildingName: string) => {
    try {
      const buildingQuery = query(
        collection(db, "buildingData"),
        where("buildingName", "==", buildingName)
      );
      const buildingSnapshot = await getDocs(buildingQuery);

      let totalFloors = 0;
      buildingSnapshot.forEach((doc) => {
        const buildingData = doc.data();
        if (buildingData.totalFloor) {
          totalFloors = buildingData.totalFloor;
        }
      });

      const levels = Array.from(
        { length: totalFloors },
        (_, i) => `Floor ${i + 1}`
      );
      setFloorLevels(levels);
    } catch (error) {
      console.error("Error fetching floor levels: ", error);
    }
  };

  const handleBuildingChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selected = event.target.value;
    setSelectedBuilding(selected);
  };

  const handleFloorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedFloor(selected);
  };

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

  const Room = () => {
    history.push("/Rooms");
  };

  const createRoom = async () => {
    try {
      const now = serverTimestamp();

      let glbUrl = "";
      let voiceUrl = "";

      if (roomAnimationPath) {
        const glbRef = storage
          .ref()
          .child(`roomAnimations/${roomAnimationPath.name}`);
        await glbRef.put(roomAnimationPath);
        glbUrl = await glbRef.getDownloadURL();
      }

      if (voiceGuide) {
        const voiceRef = storage.ref().child(`voiceGuide/${voiceGuide.name}`);
        await voiceRef.put(voiceGuide);
        voiceUrl = await voiceRef.getDownloadURL();
      }
      await addDoc(collection(db, "roomData"), {
        buildingName: selectedBuilding,
        floorLevel: selectedFloor,
        roomCode: roomCode,
        roomName: roomName,
        distance: distance,
        eta: eta,
        squareMeter: squareMeter,
        status: selectedStatus,
        roomAnimation: glbUrl,
        voiceGuide: voiceUrl,
        textGuide: textGuides,
        createdAt: now,
        updatedAt: now,
      });

      console.log("Room added successfully!");
      toast.success("Room added successfully!");
      history.push("/Rooms");
    } catch (error) {
      console.error("Error adding room: ", error);
      alert("Error on adding room.");
    }
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
                <h1 className="text-4xl font-bold">Create Room</h1>
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
                        <select
                          className="w-full max-w-xs input input-bordered"
                          onChange={handleBuildingChange}
                        >
                          <option value="">Select Building Name</option>
                          {buildingNames.sort().map((name, index) => (
                            <option key={index} value={name}>
                              {name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <th>Floor Level:</th>
                      <td>
                        <select
                          className="w-full max-w-xs input input-bordered"
                          value={selectedFloor}
                          onChange={handleFloorChange}
                        >
                          <option value="">Select Floor Level</option>
                          {floorLevels.sort().map((floor, index) => (
                            <option key={index} value={floor}>
                              {floor}
                            </option>
                          ))}
                        </select>
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
                          value={selectedStatus}
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
                            setRoomAnimationPath(
                              e.target.files ? e.target.files[0] : null
                            )
                          }
                        />
                      </td>
                      <th>Voice Guide File:</th>
                      <td>
                        <input
                          type="file"
                          accept=".mp3"
                          className="w-full max-w-xs file-input input-bordered"
                          onChange={(e) =>
                            setVoiceGuide(
                              e.target.files ? e.target.files[0] : null
                            )
                          }
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
                  <button onClick={createRoom} className="float-right btn">
                    <Icon
                      icon="icon-park-outline:add-three"
                      className="w-10 h-10"
                    />
                    <span>Create</span>
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

export default CreateRoom;
