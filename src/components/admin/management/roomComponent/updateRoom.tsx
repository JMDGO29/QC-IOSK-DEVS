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
  floors: {
    [floorName: string]: {
      [roomCodeMap: string]: {
        description: string;
        roomCode: string;
        squareMeter: number;
        textGuide: string;
        roomAnimation: string;
        voiceGuide: string;
        roomType: string;
        distance: string;
        eta: string;
        occupiedBy: string;
        status: string;
        updatedAt: firebase.default.firestore.Timestamp;
      };
    };
  };
}

const UpdateRoom: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();
  const [room, setRoom] = useState<Room | null>(null);
  const { roomId } = useParams<{ roomId: string }>();

  const [selectedBuilding, setSelectedBuilding] = useState<string>("");
  const [buildingNames, setBuildingNames] = useState<string[]>([]);
  const [textGuides, setTextGuides] = useState<string[]>([""]);

  useEffect(() => {
    fetchRoomAndBuildingNames();
  }, []);

  const fetchRoomAndBuildingNames = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "roomData"));
      const names: string[] = [];
      let selectedBuildingName = ""; // Initialize the selected building name variable
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Room;
        names.push(data.buildingName);
        // If the room ID matches, set the default selected building
        if (doc.id === roomId) {
          selectedBuildingName = data.buildingName;
        }
      });
      setBuildingNames(names);
      setSelectedBuilding(selectedBuildingName);
      console.log(selectedBuilding);
    } catch (error) {
      console.error("Error fetching building names: ", error);
    }
  };

  const handleBuildingChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selected = event.target.value;
    setSelectedBuilding(selected);
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
                        <select
                          className="w-full max-w-xs input input-bordered"
                          onChange={handleBuildingChange}
                          value={selectedBuilding} // Make sure this is set correctly
                        >
                          <option value="">Select Building Name</option>
                          {buildingNames.sort().map((name, index) => (
                            <option key={index} value={name}>
                              {name}
                            </option>
                          ))}
                        </select>
                      </td>
                      {/* <th>Floor Level:</th>
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
                      </td> */}
                    </tr>
                    {/* <tr>
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
                      <th>Description:</th>
                      <td>
                        <input
                          type="text"
                          placeholder="Description"
                          className="w-full max-w-xs input input-bordered"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Room Type:</th>
                      <td>
                        <input
                          type="text"
                          placeholder="Room Type"
                          className="w-full max-w-xs input input-bordered"
                          value={roomType}
                          onChange={(e) => setRoomType(e.target.value)}
                        />
                      </td>
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
                    </tr>
                    <tr>
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
                      <th>Occupied By:</th>
                      <td>
                        <input
                          type="text"
                          placeholder="Occupied By"
                          className="w-full max-w-xs input input-bordered"
                          value={occupiedBy}
                          onChange={(e) => setOccupiedBy(e.target.value)}
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
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
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
                        />
                      </td>
                      <th>Current Animation File:</th>
                      <td>
                        <input
                          type="text"
                          placeholder="Animation"
                          className="w-full max-w-xs input input-bordered"
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
                        />
                      </td>
                      <th>Current Voice Guide File:</th>
                      <td>
                        <input
                          type="text"
                          placeholder="Voice Guide"
                          className="w-full max-w-xs input input-bordered"
                        />
                      </td>
                    </tr> */}
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
                  <button className="float-right btn">
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
