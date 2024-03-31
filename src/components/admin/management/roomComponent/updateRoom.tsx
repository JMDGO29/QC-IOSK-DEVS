import { IonContent, IonPage } from "@ionic/react";
import AdminSideBar from "../../constant/adminSidebar";
import AdminHeader from "../../constant/adminHeader";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Icon } from "@iconify/react";
import { doc, getDoc, updateDoc } from "firebase/firestore"; // Import updateDoc
import { db } from "../../../utils/firebase";

interface ContainerProps {
  name: string;
}

interface Room {
  id: string;
  buildingName: string;
  floors?: {
    [floorName: string]: {
      [roomCode: string]: {
        description: string;
        roomCode: string;
        squareMeter: string;
        textGuide: string;
        roomAnimation: string;
        voiceGuide: string;
        status: string;
      };
    };
  };
}

const CreateRoom: React.FC<ContainerProps> = ({ name }) => {
  const history = useHistory();

  const [building, setBuilding] = useState<Room | null>(null);
  const [buildingName, setBuildingName] = useState<string>("");
  const { roomId } = useParams<{ roomId: string }>();

  const [roomCode, setRoomCode] = useState<string[]>([]);
  const [floorLevel, setFloorLevel] = useState<string[]>([]);
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [squareMeter, setSquareMeter] = useState<string[]>([]);
  const [floors, setFloors] = useState<string[]>([]);

  useEffect(() => {
    const fetchBuilding = async () => {
      try {
        const buildingRef = doc(db, "roomData", roomId);
        const buildingDoc = await getDoc(buildingRef);

        if (buildingDoc.exists()) {
          const buildingData = buildingDoc.data() as Room;
          setBuilding(buildingData);
          setBuildingName(buildingData.buildingName);

          if (buildingData.floors) {
            const fetchedFloors = Object.keys(buildingData.floors);
            setFloors(fetchedFloors);

            let roomCodes: string[] = [];
            let floorLevels: string[] = [];
            let descriptions: string[] = [];
            let statuses: string[] = [];
            let squareMeter: string[] = [];

            fetchedFloors.forEach((floor) => {
              const rooms = buildingData.floors?.[floor];
              if (rooms) {
                const roomCodesFloor = Object.keys(rooms);
                roomCodes = [...roomCodes, ...roomCodesFloor];
                floorLevels = [
                  ...floorLevels,
                  ...roomCodesFloor.map(() => floor),
                ];
                roomCodesFloor.forEach((code) => {
                  const room = rooms[code];
                  descriptions.push(room.description);
                  statuses.push(room.status);
                  squareMeter.push(room.squareMeter);
                });
              }
            });

            setRoomCode(roomCodes);
            setFloorLevel(floorLevels);
            setDescriptions(descriptions);
            setStatuses(statuses);
            setSquareMeter(squareMeter);
          }
        } else {
          console.error("Building not found");
          history.push("/Building");
        }
      } catch (error) {
        console.error("Error fetching building: ", error);
      }
    };

    fetchBuilding();
  }, [roomId, history]);

  const handleAddRoom = () => {
    setRoomCode([...roomCode, ""]);
    setFloorLevel([...floorLevel, "Floor 1"]);
    setDescriptions([...descriptions, ""]);
    setStatuses([...statuses, "available"]);
    setSquareMeter([...squareMeter, ""]);
  };

  // Inside your component
  const handleRemoveRoom = async (index: number) => {
    const updatedRoomCode = [...roomCode];
    const updatedFloorLevel = [...floorLevel];
    const updatedDescriptions = [...descriptions];
    const updatedStatuses = [...statuses];
    const updatedSquareMeter = [...squareMeter];

    const fetchBuilding = async () => {
      try {
        const buildingRef = doc(db, "roomData", roomId);
        const buildingDoc = await getDoc(buildingRef);

        if (buildingDoc.exists()) {
          const buildingData = buildingDoc.data() as Room;
          setBuilding(buildingData);
          setBuildingName(buildingData.buildingName);

          if (buildingData.floors) {
            const fetchedFloors = Object.keys(buildingData.floors);
            setFloors(fetchedFloors);

            // Fetch all room codes and floor levels
            const allRoomCodes: string[] = [];
            const allFloorLevels: string[] = [];

            fetchedFloors.forEach((floor) => {
              const rooms = buildingData.floors?.[floor]; // Safe navigation operator
              if (rooms) {
                const roomCodes = Object.keys(rooms);
                allRoomCodes.push(...roomCodes);
                allFloorLevels.push(...roomCodes.map(() => floor));
              }
            });

            setRoomCode(allRoomCodes);
            setFloorLevel(allFloorLevels);
          }
        } else {
          console.error("Building not found");
          history.push("/Building");
        }
      } catch (error) {
        console.error("Error fetching building: ", error);
      }
    };

    const codeToDelete = updatedRoomCode[index];
    const floorToDelete = updatedFloorLevel[index];
    const squareMeterToDelete = updatedSquareMeter[index];

    try {
      const buildingRef = doc(db, "roomData", roomId);
      const buildingDoc = await getDoc(buildingRef);

      if (buildingDoc.exists()) {
        const buildingData = buildingDoc.data() as Room;

        if (
          buildingData.floors &&
          buildingData.floors[floorToDelete] &&
          buildingData.floors[floorToDelete][codeToDelete]
        ) {
          const shouldDelete = window.confirm(
            "Are you sure you want to delete this room?"
          );

          if (shouldDelete) {
            delete buildingData.floors[floorToDelete][codeToDelete];
            const updatedData = { floors: buildingData.floors };
            await updateDoc(buildingRef, updatedData);
            console.log("Room deleted successfully");

            // Trigger fetch of data again after successful deletion
            fetchBuilding(); // Assuming fetchBuilding is your fetch function
          } else {
            console.log("Deletion canceled");
          }
        } else {
          updatedRoomCode.splice(index, 1);
          updatedFloorLevel.splice(index, 1);
          updatedDescriptions.splice(index, 1);
          updatedStatuses.splice(index, 1);
          updatedSquareMeter.splice(index, 1);

          setRoomCode(updatedRoomCode);
          setFloorLevel(updatedFloorLevel);
          setDescriptions(updatedDescriptions);
          setStatuses(updatedStatuses);
          setSquareMeter(updatedSquareMeter);

          console.log("Room not found in database. Removed from local state.");
        }
      }
    } catch (error) {
      console.error("Error removing room: ", error);
    }
  };

  const handleUpdateAllRooms = async () => {
    try {
      const buildingRef = doc(db, "roomData", roomId);
      const buildingDoc = await getDoc(buildingRef);

      if (buildingDoc.exists()) {
        const buildingData = buildingDoc.data() as Room;

        roomCode.forEach(async (code, index) => {
          if (buildingData.floors && buildingData.floors[floorLevel[index]]) {
            buildingData.floors[floorLevel[index]][code] = {
              description: descriptions[index] || "",
              roomCode: code,
              squareMeter: squareMeter[index] || "",
              textGuide: "",
              roomAnimation: "",
              voiceGuide: "",
              status: statuses[index] || "",
            };
          }
        });

        const updatedData = { floors: buildingData.floors }; // Create the updated data object

        await updateDoc(buildingRef, updatedData);
        console.log("All rooms updated successfully");
        history.push("/Rooms");
      }
    } catch (error) {
      console.error("Error updating rooms: ", error);
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
                <h1 className="text-4xl font-bold">Update Room</h1>
              </div>

              <div className="overflow-x-auto">
                {roomCode.map((code, index) => (
                  <div key={index}>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>
                            <label>Room Code:</label>
                          </th>
                          <th>
                            <label>Description:</label>
                          </th>

                          <th>
                            <label>Square Meter:</label>
                          </th>
                          <th>
                            <label>Floor Level:</label>
                          </th>
                          <th>
                            <label>Status:</label>
                          </th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <input
                              type="text"
                              placeholder="Room Code"
                              className="w-full max-w-xs input input-bordered"
                              value={code}
                              onChange={(e) => {
                                const updatedRoomCode = [...roomCode];
                                updatedRoomCode[index] = e.target.value;
                                setRoomCode(updatedRoomCode);
                              }}
                            />
                          </td>

                          <td>
                            <input
                              type="text"
                              placeholder="Description:"
                              className="w-full max-w-xs input input-bordered"
                              value={descriptions[index]}
                              onChange={(e) => {
                                const updatedDescriptions = [...descriptions];
                                updatedDescriptions[index] = e.target.value;
                                setDescriptions(updatedDescriptions);
                              }}
                            />
                          </td>

                          <td>
                            <input
                              type="text"
                              placeholder="Square Meter:"
                              className="w-full max-w-xs input input-bordered"
                              value={squareMeter[index]}
                              onChange={(e) => {
                                const updatedSquareMeter = [...squareMeter];
                                updatedSquareMeter[index] = e.target.value;
                                setSquareMeter(updatedSquareMeter);
                              }}
                            />
                          </td>

                          <td>
                            <select
                              value={floorLevel[index] || ""}
                              onChange={(e) => {
                                const updatedFloorLevel = [...floorLevel];
                                updatedFloorLevel[index] = e.target.value;
                                setFloorLevel(updatedFloorLevel);
                              }}
                              className="w-full max-w-xs input input-bordered"
                            >
                              {floors.map((floorOption) => (
                                <option key={floorOption} value={floorOption}>
                                  {floorOption}
                                </option>
                              ))}
                            </select>
                          </td>

                          <td>
                            <select
                              className="w-full max-w-xs input input-bordered"
                              value={statuses[index]}
                              onChange={(e) => {
                                const updatedStatuses = [...statuses];
                                updatedStatuses[index] = e.target.value;
                                setStatuses(updatedStatuses);
                              }}
                            >
                              <option value="available">Available</option>
                              <option value="not available">
                                Not Available
                              </option>
                            </select>
                          </td>

                          <td>
                            <button
                              onClick={() => handleRemoveRoom(index)}
                              className="btn btn-square hover:bg-base-300"
                            >
                              <Icon
                                icon="icon-park-outline:close"
                                className="w-10 h-10"
                              />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ))}
                <div className="flex items-center justify-between mx-5 mt-5">
                  <button
                    onClick={handleAddRoom}
                    className="btn btn-square hover:bg-base-300"
                  >
                    <Icon icon="icon-park-outline:add" className="w-10 h-10" />
                  </button>
                  <button
                    onClick={handleUpdateAllRooms}
                    className="btn btn-square hover:bg-base-300"
                  >
                    Update
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
