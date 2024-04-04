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
import { useHistory } from "react-router";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface ContainerProps {
  name: string;
}

const CreateRoom: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();

  const [buildingNames, setBuildingNames] = useState<string[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<string>("");
  const [selectedFloor, setSelectedFloor] = useState<string>("Floor 1");
  const [roomCode, setRoomCode] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [squareMeter, setSquareMeter] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [textGuides, setTextGuides] = useState<string[]>([""]);

  const [roomType, setRoomType] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  const [eta, setEta] = useState<string>("");
  const [occupiedBy, setOccupiedBy] = useState<string>("");

  const [floorLevels, setFloorLevels] = useState<string[]>([]);

  useEffect(() => {
    fetchBuildingNames();
  }, []);

  const fetchBuildingNames = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "roomData"));
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
      const querySnapshot = await getDocs(
        query(
          collection(db, "roomData"),
          where("buildingName", "==", buildingName)
        )
      );
      const floors: string[] = [];
      if (!querySnapshot.empty) {
        const floorsData = querySnapshot.docs[0].data().floors;
        const floors = Object.keys(floorsData);
        setFloorLevels(floors);
        setSelectedFloor("Floor 1"); // Set default selected floor to "Floor 1"
      }
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

      const animationFileInput = document.querySelector<HTMLInputElement>(
        'input[type="file"][accept=".glb"]'
      );

      const voiceGuideFileInput = document.querySelector<HTMLInputElement>(
        'input[type="file"][accept=".mp3"]'
      );

      let roomAnimation = "";
      let voiceGuide = "";

      if (
        animationFileInput &&
        animationFileInput.files &&
        animationFileInput.files[0]
      ) {
        const animationFile = animationFileInput.files[0];
        const animationFileRef = ref(
          storage,
          `roomAnimations/${selectedBuilding}/${animationFile.name}`
        );

        try {
          await uploadBytes(animationFileRef, animationFile);
          roomAnimation = await getDownloadURL(animationFileRef);
        } catch (error) {
          console.error("Error uploading animation file:", error);
          toast.error(
            "Failed to upload animation file. Please try again later."
          );
          return;
        }
      }

      if (
        voiceGuideFileInput &&
        voiceGuideFileInput.files &&
        voiceGuideFileInput.files[0]
      ) {
        const voiceGuideFile = voiceGuideFileInput.files[0];
        const voiceGuideFileRef = ref(
          storage,
          `voiceGuide/${selectedBuilding}/${voiceGuideFile.name}`
        );

        try {
          await uploadBytes(voiceGuideFileRef, voiceGuideFile);
          voiceGuide = await getDownloadURL(voiceGuideFileRef);
        } catch (error) {
          console.error("Error uploading voice guide file:", error);
          toast.error(
            "Failed to upload voice guide file. Please try again later."
          );
          return;
        }
      }

      if (!selectedBuilding || !selectedFloor || !roomCode) {
        toast.error("Please fill all required fields");
        return;
      }

      const roomRef = doc(db, "roomData", selectedBuilding);

      const roomSnapshot = await getDoc(roomRef);
      const roomData = roomSnapshot.data();

      if (!roomData || !roomData.floors || !roomData.floors[selectedFloor]) {
        toast.error("Selected floor does not exist");
        return;
      }

      // Update the roomCode for the selected floor
      await updateDoc(roomRef, {
        [`floors.${selectedFloor}.${roomCode}`]: {
          roomCode,
          description,
          squareMeter,
          status,
          textGuides,
          roomType,
          distance,
          eta,
          occupiedBy,
          roomAnimation,
          voiceGuide,
          createdAt: now,
          updatedAt: now,
        },
      });

      // Show success message
      toast.success("Room created successfully");

      // Redirect to the Room page
      Room();
    } catch (error) {
      console.error("Error creating room:", error);
      toast.error("Failed to create room. Please try again later.");
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
                      <th>Voice Guide File:</th>
                      <td>
                        <input
                          type="file"
                          accept=".mp3"
                          className="w-full max-w-xs file-input input-bordered"
                        />
                      </td>
                    </tr>
                    <tr>
                      {/* <th>Current Animation File:</th>
                      <td>
                        <input
                          type="text"
                          placeholder="Animation"
                          className="w-full max-w-xs input input-bordered"
                        />
                      </td> */}
                      {/* <th>Current Voice Guide File:</th>
                      <td>
                        <input
                          type="text"
                          placeholder="Voice Guide"
                          className="w-full max-w-xs input input-bordered"
                        />
                      </td> */}
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
