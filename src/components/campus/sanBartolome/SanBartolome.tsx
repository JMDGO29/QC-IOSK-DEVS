import React, { Suspense, useCallback, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import ModelViewer from "./ModelViewer";
import { OrbitControls, Stage, Stars } from "@react-three/drei";
import Modal from "react-modal";
import { Icon } from "@iconify/react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import firebaseConfig, { db } from "../../utils/firebase";
import { initializeApp } from "firebase/app";
import Animation from "./animation/Animation";
import Clouds from "./Clouds";

interface ContainerProps {
  name: string;
}

interface Building {
  id: string;
  buildingName: string;
  buildingPath: string;
  buildingPosition: [number, number, number];
  buildingScale: [number, number, number];
  buildingLabelPosition: [number, number, number];
  status: string;
}

interface otherModel {
  id: string;
  modelPath: string;
  modelPosition: [number, number, number];
  modelScale: [number, number, number];
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
        status: string;
      };
    };
  };
}

const SanBartolome: React.FC<ContainerProps> = ({ name }) => {
  const firestore = getFirestore(initializeApp(firebaseConfig));

  const [isNight, setIsNight] = useState(false);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [otherModel, setOtherModel] = useState<otherModel[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [showOverview, setShowOverview] = useState(false);

  const [animation, setAnimation] = useState("");
  const [selectedRoomModel, setSelectedRoomModel] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("");
  const [selectedShortPath, setSelectedShortPath] = useState("");

  const closeModal = () => {
    setShowModal(false);
  };

  const handleOverviewClick = () => {
    setShowOverview(true);
  };

  const handleFloorsClick = () => {
    setShowOverview(false);
  };

  const clickFloor = useCallback((floor: string) => {
    console.log("Selected floor:", floor);
    setSelectedFloor(floor);
    setShowOverview(false);
  }, []);

  const selectRoom = useCallback((room: string) => {
    console.log("Selected Room:", room);
    setSelectedRoom(room);
  }, []);

  const clickSB = () => {
    setShowModal(false);
    return;
  };

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const buildingsCollection = collection(db, "buildingData");
        const queryBuilding = query(buildingsCollection);
        const buildingsSnapshot = await getDocs(queryBuilding);
        const buildingsData = buildingsSnapshot.docs.map((doc) => {
          const buildingData = doc.data() as Building;
          return { ...buildingData, id: doc.id } as Building;
        });
        setBuildings(buildingsData);
      } catch (error) {
        console.error("Error fetching buildings: ", error);
      }
    };

    fetchBuildings();
  }, []);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const modelsCollection = collection(db, "otherModelData");
        const queryModel = query(modelsCollection);
        const modelsSnapshot = await getDocs(queryModel);
        const modelsData = modelsSnapshot.docs.map((doc) => {
          const modelData = doc.data() as otherModel;
          return { ...modelData, id: doc.id } as otherModel;
        });
        setOtherModel(modelsData);
      } catch (error) {
        console.error("Error fetching models: ", error);
      }
    };

    fetchModels();
  }, []);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsCollection = collection(db, "roomData");
        const queryRoom = query(roomsCollection);
        const roomsSnapshot = await getDocs(queryRoom);
        const roomsData = roomsSnapshot.docs.map((doc) => {
          const roomData = doc.data() as Room;
          return { ...roomData, id: doc.id } as Room;
        });

        // Extract unique floor values
        const uniqueFloors = Array.from(
          new Set(roomsData.map((room) => room.floors))
        );

        setRooms(roomsData);
      } catch (error) {
        console.error("Error fetching rooms: ", error);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    const checkTime = () => {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();

      const isNightTime = currentHour >= 18 || currentHour < 6;

      setIsNight(isNightTime);
    };

    checkTime();

    const intervalId = setInterval(checkTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleModelClick = useCallback((buildingName: string) => {
    setSelectedBuilding(buildingName);
    setShowModal(true);
    console.log(`Clicked on ${buildingName}`);
  }, []);

  const clickAnimation = async (room: string) => {
    try {
      const roomDataRef = collection(db, "roomData");
      const roomQuery = query(
        roomDataRef,
        where("buildingName", "==", selectedBuilding)
      );
      const roomSnapshot = await getDocs(roomQuery);

      roomSnapshot.forEach((doc) => {
        const floors = doc.data().floors;
        Object.keys(floors).forEach((floorKey) => {
          const rooms = floors[floorKey];
          const selectedRoomData = rooms[room];

          if (selectedRoomData) {
            // If the room is found, extract animation-related fields and set the state
            setAnimation(selectedRoomData.roomCode);
            setSelectedRoomModel(selectedRoomData.roomAnimation);
            setSelectedVoice(selectedRoomData.voiceGuide);
            // Set other relevant state variables here if needed
            // setIsAnimationActive(true);
            return; // Exit the loop once the room is found
          }
        });
      });
    } catch (error) {
      console.error("Error fetching animation data:", error);
    }
  };

  return (
    <>
      {selectedRoomModel && animation ? (
        <>
          <Animation
            name={""}
            roomName={selectedRoom}
            modelPath={selectedRoomModel}
            voice={selectedVoice}
            shortPath={selectedShortPath}
            selectedBuilding={selectedBuilding}
            selectedFloor={selectedFloor}
            selectedRoom={selectedRoom}
          />
          <button
            onClick={clickSB}
            className="absolute z-10 mt-10 btn btn-secondary ml-60"
          >
            Back
          </button>
        </>
      ) : (
        <>
          <Canvas
            camera={{
              fov: 50,
              position: [80, 40, 80],
            }}
            className={
              isNight
                ? "bg-gradient-to-tr from-stone-950 to-cyan-950"
                : "bg-gradient-to-tr from-sky-900 to-sky-400"
            }
            style={{ position: "absolute" }}
          >
            <OrbitControls
              minPolarAngle={Math.PI / 6} // vertical rotation
              maxPolarAngle={Math.PI / 2.5} // vertical rotation
              enablePan={true}
              zoomSpeed={1} // based sa touchpad
              autoRotate={true}
              autoRotateSpeed={0.3}
              enableZoom={true}
              minDistance={50}
              maxDistance={100}
            />

            <Stage shadows environment={isNight ? "night" : "city"}>
              {isNight ? (
                <>
                  <Stars radius={50} depth={30} count={100} factor={3} />
                </>
              ) : null}
              <Clouds />
              {otherModel.map((model) => (
                <ModelViewer
                  key={model.id}
                  modelPath={model.modelPath}
                  position={model.modelPosition}
                  scale={model.modelScale}
                />
              ))}

              {buildings.map((building) => (
                <ModelViewer
                  key={building.id}
                  name={building.buildingName}
                  modelPath={building.buildingPath}
                  position={building.buildingPosition}
                  scale={building.buildingScale}
                  textPosition={building.buildingLabelPosition}
                  onClick={() => handleModelClick(building.id)}
                />
              ))}

              {/* <RotatingMesh /> */}
            </Stage>
          </Canvas>
          <Modal
            isOpen={showModal}
            onRequestClose={closeModal}
            contentLabel="Building Information"
            className="flex items-center justify-center w-screen h-screen bg-black/60 text-base-content"
          >
            <div className="w-full p-6 shadow-xl m-80 bg-base-200 rounded-3xl h-fit">
              {selectedBuilding && (
                <>
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-semibold text-center">
                      {selectedBuilding}
                    </h2>
                    <button
                      onClick={closeModal}
                      className="btn btn-square hover:bg-red-500 hover:text-white"
                    >
                      <Icon icon="line-md:close-small" className="w-10 h-10" />
                    </button>
                  </div>
                  <div className="flex justify-center mt-6 space-x-3">
                    <div className="px-6 shadow-inner bg-base-300 w-96 rounded-3xl">
                      <div className="flex flex-col justify-center py-6 space-y-3 border-b-2 border-base-100">
                        <button
                          onClick={handleOverviewClick}
                          className={`h-10 btn-blocked btn  hover:bg-base-200 ${
                            showOverview ? "bg-base-content text-white" : ""
                          }`}
                        >
                          Building Details
                        </button>
                        <button
                          onClick={handleFloorsClick}
                          className={`h-10 btn-blocked btn  hover:bg-base-200 ${
                            !showOverview ? "bg-base-content text-white" : ""
                          }`}
                        >
                          Floors
                        </button>
                      </div>
                      {showOverview ? (
                        <div className="h-full overflow-y-auto">
                          <p className="p-2 text-2xl font-semibold">
                            Building Details
                          </p>
                          <p className="p-2 text-lg">Building Sqm: 6969</p>
                          <p className="p-2 text-lg">Building Status: 6969</p>
                          <p className="p-2 text-lg">Building floors: 6969</p>
                        </div>
                      ) : (
                        <div>
                          <div className="h-full overflow-y-auto">
                            <p className="p-2 text-2xl font-semibold">Floors</p>
                            <div className="grid grid-cols-2 gap-2">
                              {rooms
                                .filter((room) => room.id === selectedBuilding)
                                .map((room) => {
                                  const floorNames = Object.keys(room.floors);
                                  // Sort the floor names alphabetically
                                  floorNames.sort();
                                  return (
                                    <div key={room.id}>
                                      {floorNames.map((floorName) => (
                                        <div key={floorName}>
                                          <button
                                            className={`w-full h-10 bg-base-100 btn `}
                                            onClick={() =>
                                              clickFloor(floorName)
                                            }
                                          >
                                            {floorName}
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    {showOverview ? (
                      <div className="w-full h-full duration-150 ease-in-out shadow-inner bg-base-300 rounded-2xl">
                        <div className="flex items-center p-6">
                          <div className="w-full p-6 shadow-inner bg-base-200 h-96 rounded-2xl">
                            <div className="flex flex-col w-full h-full space-y-3">
                              <h1>Building Details</h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full shadow-inner bg-base-300 rounded-2xl">
                        <div className="flex items-center p-6 pl-0">
                          <div className="w-64 p-6 space-y-2 overflow-y-auto h-96">
                            {rooms
                              .filter((room) => room.id === selectedBuilding)
                              .map((room) => {
                                const roomCodes = Object.keys(
                                  room.floors[selectedFloor] || {}
                                );
                                // Sort the room codes alphabetically
                                roomCodes.sort();
                                return (
                                  <div key={room.id}>
                                    {roomCodes.map((roomCodeMap) => (
                                      <div key={roomCodeMap}>
                                        <button
                                          className="btn"
                                          onClick={() =>
                                            selectRoom(roomCodeMap)
                                          }
                                        >
                                          {roomCodeMap}
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                );
                              })}
                          </div>
                          <div className="w-full p-6 shadow-inner bg-base-200 h-96 rounded-2xl">
                            <div className="relative flex flex-col w-full h-full space-y-3">
                              <div className="text-base-content">
                                {" "}
                                {rooms
                                  .filter(
                                    (room) => room.id === selectedBuilding
                                  )
                                  .map((room) => {
                                    const roomCodes = Object.keys(
                                      room.floors[selectedFloor] || {}
                                    );
                                    // Sort the room codes alphabetically
                                    roomCodes.sort();
                                    return (
                                      <div key={room.id}>
                                        {roomCodes.map((roomCodeMap) => {
                                          const roomDetails =
                                            room.floors[selectedFloor][
                                              roomCodeMap
                                            ];
                                          return (
                                            selectedRoom === roomCodeMap && (
                                              <div key={roomCodeMap}>
                                                <p>
                                                  Room Code:{" "}
                                                  {roomDetails.roomCode}
                                                </p>
                                                <p>
                                                  Description:{" "}
                                                  {roomDetails.description}
                                                </p>
                                                <p>
                                                  Animation:{" "}
                                                  {roomDetails.roomAnimation}
                                                </p>
                                                {/* Render other room details as needed */}
                                                <button
                                                  onClick={() =>
                                                    clickAnimation(selectedRoom)
                                                  }
                                                  className="absolute bottom-0 right-0 btn btn-secondary btn-block"
                                                >
                                                  GO TO {roomCodeMap}
                                                </button>
                                              </div>
                                            )
                                          );
                                        })}
                                      </div>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

export default SanBartolome;
