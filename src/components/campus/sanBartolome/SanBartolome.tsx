import React, { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import ModelViewer from "./ModelViewer";
import { Billboard, OrbitControls, Stage, Stars, Text } from "@react-three/drei";
import Modal from "react-modal";
import { Icon } from "@iconify/react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import firebaseConfig, { db } from "../../utils/firebase";
import { initializeApp } from "firebase/app";
import Animation from "./animation/Animation";
import { useTranslation } from "react-i18next";
import { Mesh, BufferGeometry, NormalBufferAttributes, Material, Object3DEventMap } from "three";
// import UareHere from '/src/assets/models/others/clocation.glb';
import yellowQR from "../../../assets/imgs/qr/yellowQR.png";
import bautistaQR from "../../../assets/imgs/qr/bautistaQR.png";
import academicQR from "../../../assets/imgs/qr/academicQR.png";
import belmonteQR from "../../../assets/imgs/qr/belmonteQR.png";
import pathfinderQR from "../../../assets/imgs/qr/pathfinder.png";



interface ContainerProps {
  name: string;
}

interface Building {
  name: string;
  id: string;
  buildingName: string;
  buildingPath: string;
  buildingPosition: [number, number, number];
  buildingScale: [number, number, number];
  buildingLabelPosition: [number, number, number];
  status: string;
  totalFloor: string;
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
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showOverview, setShowOverview] = useState(false);
  const [showDualSelection, setDualSelection] = useState(false);
  const [animation, setAnimation] = useState("");
  const [selectedRoomModel, setSelectedRoomModel] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("");
  const [selectedTextGuide, setSelectedTextGuide] = useState<string[]>([""]);
  const [errorModal, setErrorModal] = useState(false);
  const [arQrModal, setArQrModal] = useState(false);
  const [showBuildingInfo, setBuildingInfoModal] = useState(false);
  const [modalContent, setModalContent] = useState(
    "Selected room data not found."
  );

  const qrCodes: { [key: string]: string } = {
    'Academic Building': academicQR,
    'veH3FuqACvWr5Rys3ddm': yellowQR,
    'Bautista Building': bautistaQR,
    'Belmonte Building': belmonteQR,
    // Add more mappings as needed
  };


  const uniqueFloorLevels = [
    ...new Set(
      rooms
        .filter((room) => room.buildingName === selectedBuilding)
        .map((room) => room.floorLevel)
    ),
  ];

  const closeModal = () => {
    setShowModal(false);
    setErrorModal(false);
    setBuildingInfoModal(false);
    setArQrModal(false);
    setDualSelection(false);
  };

  const closeErrorModal = () => {
    setShowModal(true);
    setErrorModal(false);
    setBuildingInfoModal(false);
  };

  const closeBuildingInfoModal = () => {
    setBuildingInfoModal(false);
  };

  const handleOverviewClick = () => {
    setShowOverview(true);
  };

  const handleFloorsClick = () => {
    setShowOverview(false);
  };

  const lineNavClick = () => {
    setShowModal(true);
    setDualSelection(false);
  }

  const arNavClick = () => {
    setArQrModal(true);
    setDualSelection(false);
  }


  const clickFloor = useCallback((floor: string, floorLevel: string) => {
    console.log("Selected floor:", floorLevel);
    setSelectedFloor(floorLevel);
    setShowOverview(false);
  }, []);

  const selectRoom = useCallback((room: Room) => {
    console.log("Selected Room:", room);
    setSelectedRoom(room);
  }, []);

  const clickSB = () => {
    setShowModal(false);
    return;
  };

  const handleBuildingInfoClick = async () => {
    setBuildingInfoModal(true);
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
    setDualSelection(true);
    setShowModal(false);
    console.log(`Clicked on ${buildingName}`);
  }, []);
  const handleModel2Click = () => {

    setDualSelection(true);
    setShowModal(false);
  };


  const clickAnimation = async (roomCode: string) => {
    try {
      const now = serverTimestamp();

      const roomData = rooms.find(
        (room) =>
          room.roomCode === roomCode &&
          room.buildingName === selectedBuilding &&
          room.floorLevel === selectedFloor
      );

      if (roomData) {
        setAnimation(roomData.roomCode);
        setSelectedRoomModel(roomData.roomAnimation);
        setSelectedVoice(roomData.voiceGuide);
        setSelectedTextGuide(roomData.textGuide);
        setSelectedTextGuide(roomData.textGuide);
        setErrorModal(true);

        if (roomData.roomAnimation) {
          const firestore = getFirestore(initializeApp(firebaseConfig));
          const roomRef = collection(firestore, "visitorData2");
          await addDoc(roomRef, {
            roomCode: roomData.roomCode,
            selectedFloor: selectedFloor,
            selectedBuilding: selectedBuilding,

            createdAt: now,
          });
        }
      } else {
        setModalContent("Selected room data not found.");
      }
    } catch (error) {
      console.error("Error fetching animation data:", error);
    }
  };

  const { t } = useTranslation();
  const RotatingMesh = () => {
    const meshRef =
      useRef<
        Mesh<
          BufferGeometry<NormalBufferAttributes>,
          Material | Material[],
          Object3DEventMap
        >
      >(null);

    useFrame((state: { clock: { elapsedTime: number } }, delta: any) => {
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.05;

        meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.8 + 5;
      }
    });

    return (
      <>

      </>
    );
  };


  return (
    <>
      {selectedRoomModel && animation ? (
        <>
          <Animation
            name={""}
            roomName={selectedRoom?.roomName || ""}
            modelPath={selectedRoomModel}
            voice={selectedVoice}
            textGuide={selectedRoom?.textGuide || []}
            selectedBuilding={selectedBuilding}
            selectedFloor={selectedFloor}
            selectedRoom={selectedRoom?.roomCode || ""}
          />
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
              {otherModel.map((model) => (
                <ModelViewer
                  key={model.id}
                  modelPath={model.modelPath}
                  position={model.modelPosition}
                  scale={model.modelScale}
                />
              ))}

              {buildings
                .filter((building) => building.status !== "not available")
                .map((building) => (
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


            </Stage>
            <RotatingMesh />
          </Canvas>
          <Modal
            className="flex items-center justify-center w-screen h-screen bg-black/60 text-base-content"
            isOpen={showModal}
            onRequestClose={closeModal}
            contentLabel="Building Information"
          >
            <div className="w-6/12 py-0 pl-0 shadow-xl m-80 bg-base-100 rounded-3xl h-fit">
              <div className="relative flex justify-center space-x-3">
                <div className="w-40 h-full px-3 mr-3 rounded-3xl">
                  <div className="flex flex-col justify-center py-3 space-y-3 border-b-2 border-base-100">
                    {selectedBuilding && (
                      <>
                        <>
                          <button
                            onClick={handleFloorsClick}
                            className={`h-10 btn  hover:bg-base-content hover:text-base-300 ${!showOverview
                              ? "bg-transparent btn-block shadow-none text-lg text-base-content"
                              : ""
                              }`}
                          >
                            Floors
                          </button>
                        </>
                      </>
                    )}
                  </div>
                  {showOverview ? (
                    <>
                      <div className="h-full overflow-y-auto"></div>
                    </>
                  ) : (
                    <div>
                      {selectedBuilding && !showOverview && (
                        <div className="h-full overflow-y-auto">
                          <div className="grid grid-cols-1 gap-2 my-3">
                            {uniqueFloorLevels
                              .sort()
                              .map((floorLevel, index) => (
                                <button
                                  key={floorLevel}
                                  className={`w-full h-10 btn ${selectedBuilding === "Bautista Building" &&
                                    ((index === 0 && selectedFloor === "LG") ||
                                      (index === 1 && selectedFloor === "G") ||
                                      (index >= 2 &&
                                        index <= 8 &&
                                        selectedFloor === `F${index}`))
                                    ? "bg-base-content text-base-100"
                                    : selectedBuilding !==
                                      "Bautista Building" &&
                                      selectedFloor === `F${index + 1}`
                                      ? "bg-base-content text-base-100"
                                      : "hover:bg-base-200"
                                    }`}
                                  onClick={() =>
                                    clickFloor(
                                      selectedBuilding,
                                      selectedBuilding ===
                                        "Bautista Building" && index === 0
                                        ? "LG"
                                        : selectedBuilding ===
                                          "Bautista Building" && index === 1
                                          ? "G"
                                          : selectedBuilding ===
                                            "Bautista Building" &&
                                            index >= 2 &&
                                            index <= 8
                                            ? `F${index}`
                                            : `F${index + 1}`
                                    )
                                  }
                                >
                                  {selectedBuilding === "Bautista Building" &&
                                    index === 0
                                    ? "LG"
                                    : selectedBuilding ===
                                      "Bautista Building" && index === 1
                                      ? "G"
                                      : selectedBuilding ===
                                        "Bautista Building" &&
                                        index >= 2 &&
                                        index <= 8
                                        ? `F${index}`
                                        : `F${index + 1}`}
                                </button>
                              ))}
                          </div>
                        </div>
                      )}

                    </div>
                  )}
                </div>
                <div className="absolute w-40 h-full px-3 pr-3 shadow-inner -left-10 bg-base-300 rounded-l-3xl">
                  <div className="flex flex-col justify-center pt-3">
                    {selectedBuilding && (
                      <>
                        <button
                          onClick={
                            showOverview
                              ? handleFloorsClick
                              : handleOverviewClick
                          }
                          className={` btn   w-full bg-transparent btn-square shadow-none ${!showOverview
                            ? "bg-transparent btn-square shadow-none font-semibold text-base-content"
                            : ""
                            }`}
                        >
                          {showOverview ? (
                            // Render back icon here
                            <Icon
                              icon="icon-park-outline:back"
                              className="w-10 h-10"
                            />
                          ) : (
                            // Render floor icon here
                            <Icon
                              icon="tabler:box-multiple"
                              className={`w-10 h-10`}
                            />
                          )}
                        </button>
                      </>
                    )}
                  </div>
                  {showOverview ? (
                    <>
                      <div className="w-full pr-3 space-y-2 overflow-y-auto h-96 mt-7 rounded-2xl">
                        {buildings.map((building, index) => (
                          <button
                            key={index}
                            className={`h-10 z-50 bg-base-100 btn btn-block rounded-2xl text-sm ${selectedBuilding === building.buildingName
                              ? "bg-base-content text-base-100"
                              : "hover:bg-base-200"
                              }`}
                            onClick={() =>
                              handleModelClick(building.buildingName)
                            }
                          >
                            {building.buildingName}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div>
                      {selectedBuilding && !showOverview && (
                        <div className="h-full overflow-y-auto">
                          <div className="grid grid-cols-1 gap-2 my-3">
                            {uniqueFloorLevels
                              .sort()
                              .map((floorLevel, index) => (
                                <button
                                  key={floorLevel}
                                  className={`w-full h-10 btn ${selectedBuilding === "Bautista Building" &&
                                    ((index === 0 && selectedFloor === "LG") ||
                                      (index === 1 && selectedFloor === "G") ||
                                      (index >= 2 &&
                                        index <= 8 &&
                                        selectedFloor === `F${index}`))
                                    ? "bg-base-content text-base-100"
                                    : selectedBuilding !==
                                      "Bautista Building" &&
                                      selectedFloor === `F${index + 1}`
                                      ? "bg-base-content text-base-100"
                                      : "hover:bg-base-200"
                                    }`}
                                  onClick={() =>
                                    clickFloor(
                                      selectedBuilding,
                                      selectedBuilding ===
                                        "Bautista Building" && index === 0
                                        ? "LG"
                                        : selectedBuilding ===
                                          "Bautista Building" && index === 1
                                          ? "G"
                                          : selectedBuilding ===
                                            "Bautista Building" &&
                                            index >= 2 &&
                                            index <= 8
                                            ? `F${index}`
                                            : `F${index + 1}`
                                    )
                                  }
                                >
                                  {selectedBuilding === "Bautista Building" &&
                                    index === 0
                                    ? "Lower Ground Floor"
                                    : selectedBuilding ===
                                      "Bautista Building" && index === 1
                                      ? "Ground Floor"
                                      : selectedBuilding ===
                                        "Bautista Building" &&
                                        index >= 2 &&
                                        index <= 8
                                        ? `F${index}`
                                        : `F${index + 1}`}
                                </button>
                              ))}
                          </div>
                        </div>
                      )}

                    </div>
                  )}
                </div>

                <div className="flex flex-col w-full space-y-3 transition-all duration-150 ease-in-out">
                  <div className="flex items-center justify-between w-full ">
                    {" "}
                    <button
                      onClick={handleOverviewClick}
                      className={` rounded-xl text-3xl p-2 font-bold mx-2 mt-4 h-14 hover:bg-base-300 ${showOverview
                        ? "hover:bg-transparent  text-base-content w-auto mt-4 h-14 mx-4"
                        : ""
                        }`}
                    >
                      {selectedBuilding}
                    </button>
                    <div className="flex">
                      <button
                        onClick={handleBuildingInfoClick}
                        className="mt-5 mr-5 bg-transparent border-none shadow-none btn btn-square hover:bg-base-content hover:text-white"
                      >
                        <Icon
                          icon="akar-icons:chat-question"
                          className="w-10 h-10"
                        />
                      </button>
                      <button
                        onClick={closeModal}
                        className="mt-5 mr-5 bg-transparent border-none shadow-none btn btn-square hover:bg-red-400 hover:text-white"
                      >
                        <Icon
                          icon="line-md:close-small"
                          className="w-10 h-10"
                        />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start justify-center w-full h-full ">
                    {!showOverview && (
                      <div className="flex flex-col justify-between h-auto mb-10 bg-base-200 rounded-3xl">
                        <h1 className="text-2xl font-semibold text-center">
                          Rooms
                        </h1>
                        <div className="w-64 p-3 pb-4 space-y-2 overflow-y-auto h-96 overflow-clip bg-base-300 rounded-2xl">
                          {!selectedFloor && (
                            <div className="flex flex-col items-center justify-center w-full p-6 text-lg text-center text-base-content">
                              <Icon
                                icon="typcn:warning-outline"
                                className="w-10 h-10"
                              />
                              <h1>
                                Please select a desired floor from the sidebar
                                on the left
                              </h1>
                            </div>
                          )}
                          {selectedBuilding &&
                            selectedFloor &&
                            rooms
                              .filter(
                                (room) =>
                                  room.floorLevel === selectedFloor &&
                                  room.buildingName === selectedBuilding
                              )
                              .sort((a, b) =>
                                a.roomCode.localeCompare(b.roomCode)
                              )
                              .map((room) => (
                                <div
                                  key={room.id}
                                  className="flex flex-col mb-4"
                                >
                                  <button
                                    className={`h-10 bg-base-100 btn flex`}
                                    onClick={() => selectRoom(room)}
                                  >
                                    {room.roomCode}
                                  </button>
                                </div>
                              ))}
                        </div>
                      </div>
                    )}
                    {showOverview ? (
                      <div className="w-full h-full duration-150 bg-base-100 rounded-2xl">
                        <div className="flex items-center p-6 pt-0 pl-0">
                          <div className="w-full p-6 shadow-inner bg-base-200 h-96 rounded-2xl">
                            <div className="flex w-full h-full ">
                              <div className="flex flex-col space-y-3 overflow-x-auto">

                              </div>
                              <div className="relative flex flex-col items-center justify-center w-full h-5 rounded-2xl ">
                                <h1 className="text-3xl font-semibold text-base-content">
                                  Details
                                </h1>
                                {/* Render building data here */}
                                {selectedBuilding && (
                                  <div className="absolute w-full space-y-2 top-12 h-72 rounded-2xl">
                                    {buildings.map((building) => {
                                      if (
                                        building.buildingName ===
                                        selectedBuilding
                                      ) {
                                        return (
                                          <div key={building.id}>

                                            <p className="text-2xl font-normal">
                                              Building Name:{" "}
                                              <span className="text-2xl font-bold">
                                                {building.buildingName}
                                              </span>
                                            </p>
                                            <p className="text-2xl font-normal">
                                              Status:{" "}
                                              <span className="text-2xl font-bold">
                                                {building.status}
                                              </span>
                                            </p>
                                            <p className="text-2xl font-normal">
                                              Total Floor/s:{" "}
                                              <span className="text-2xl font-bold">
                                                {building.totalFloor}
                                              </span>
                                            </p>
                                            <p className="text-2xl font-normal">
                                              Estimated Time of Arrival:{" "}
                                              <span className="text-2xl font-bold">
                                                Average of 4 minutes and 6 seconds
                                              </span>
                                            </p>
                                            {/* Add more building properties here if needed */}
                                          </div>
                                        );
                                      }
                                      return null;
                                    })}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-[450px] m-6 mt-0 shadow-inner bg-base-300 rounded-3xl">
                        <div className="flex flex-col items-center p-0">
                          <div className="w-full p-6 shadow-inner bg-base-200 h-[360px] rounded-3xl">
                            <div className="relative flex flex-col w-full h-full space-y-3">

                              <div className="relative text-base-content">
                                {selectedBuilding &&
                                  selectedFloor &&
                                  selectedRoom && (
                                    <>
                                      <div className="flex flex-col w-full p-3 mb-5 h-80 ">
                                        <ul className="space-y-2 text-2xl">
                                          <h1 className="-mt-2 text-3xl font-bold text-center mb-">
                                            Details
                                          </h1>
                                          <li>Room Code:
                                            <b> {selectedRoom.roomCode}</b>
                                          </li>
                                          <li>Room Name:
                                            <b> {selectedRoom.roomName}</b>
                                          </li>
                                          <li>Floor: {" "}
                                            <b>
                                              {selectedRoom.floorLevel}
                                            </b>
                                          </li>
                                          <li>Estimated Time of Arrival:
                                            <b> {selectedRoom.eta} N/A</b>
                                          </li>
                                          <div className="flex justify-between space-x-3">
                                            <li> Distance:
                                              <b>
                                                {selectedRoom.distance}
                                              </b>
                                            </li>
                                            <li>
                                              Area: <b>
                                                {selectedRoom.squareMeter}
                                              </b>
                                            </li>
                                          </div>
                                          <div className="flex justify-between space-x-3">
                                            <li>
                                              Status: <b> {selectedRoom.status}</b>
                                            </li>
                                          </div>


                                        </ul>

                                      </div>
                                      <div className="absolute w-full mt-4 rounded-2xl">
                                        <button
                                          className=" btn bg-base-content text-base-100 btn-block"
                                          onClick={() => clickAnimation(
                                            selectedRoom.roomCode
                                          )}
                                        >
                                          Get Direction {selectedRoom.roomCode}
                                        </button>
                                      </div>
                                    </>
                                  )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Modal>
          <Modal
            className="flex items-center justify-center w-screen h-screen transition-all duration-150 ease-in-out bg-black/60"
            isOpen={errorModal}
            onRequestClose={() => setShowModal(false)}
            contentLabel="Alert"
          >
            <div className="h-56 p-6 shadow-xl bg-base-100 rounded-2xl w-96">
              <p className="text-3xl text-center">{modalContent}</p>
              <div className="flex justify-center space-x-3 mt-14">
                <button onClick={closeErrorModal} className="btn bg-base-300">
                  <Icon icon="line-md:close-small" className="w-10 h-10" />
                  Close
                </button>
              </div>
            </div>
          </Modal>
          <Modal
            className="flex items-center justify-center w-screen h-screen transition-all duration-150 ease-in-out bg-black/60"
            isOpen={showDualSelection}
            onRequestClose={() => setShowModal(false)}
            contentLabel="Alert"
          >
            <div className="w-auto h-auto p-6 shadow-xl bg-base-100 rounded-2xl">
              <div className="flex items-center justify-between space-x-10">
              <p className="text-3xl font-semibold text-center">Select Navigation Method</p>
              <button onClick={closeModal} className="btn btn-square bg-base-300">
                  <Icon icon="line-md:close-small" className="w-10 h-10" />
                </button>
              </div>
              <div className="flex justify-around mt-10">
                <button onClick={lineNavClick} className="flex flex-col w-40 h-40 btn bg-base-300">
                  <Icon icon="mingcute:navigation-line" className="w-10 h-10" />
                  <p className="">Line Navigation</p>
                </button>
                <button onClick={arNavClick} className="flex flex-col w-40 h-40 btn bg-base-300">
                  <Icon icon="mynaui:ar" className="w-10 h-10" />
                  <p className="">Augmented Reality Navigation</p>
                </button>
              </div>
            </div>
          </Modal>
          <Modal
            className="flex items-center justify-center w-screen h-screen transition-all duration-150 ease-in-out bg-black/60"
            isOpen={arQrModal}
            onRequestClose={() => setArQrModal(false)}
            contentLabel="Alert"
          >
            <div className="flex w-auto h-auto p-6 shadow-xl bg-base-100 rounded-2xl">
              <section className="py-6 pt-0">
             <div className="flex items-center justify-between">
             <p className="text-3xl font-bold text-center text-primary drop-shadow-md">Augmented Reality Navigation</p>
              <div className="flex justify-center space-x-3">
                <button onClick={closeModal} className="btn btn-square bg-base-300">
                  <Icon icon="line-md:close-small" className="w-10 h-10" />
                </button>
              </div>
             </div>
                <div className="container flex flex-col justify-around p-4 mx-auto text-center md:p-10 lg:flex-row">
                  
                  <div className="flex flex-col justify-center lg:text-left">
                    
                    <p className="text-sm font-medium tracking-widest uppercase text-base-content"><span className="font-bold text-primary">first,</span><br /> make sure you have already<br/> installed this app</p>
                    <h1 className="text-3xl font-medium title-font">Google Services for AR</h1>
                  </div>
                  <div className="flex flex-col items-center justify-center flex-shrink-0 mt-6 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 lg:ml-4 lg:mt-0 lg:justify-end">
                    <button className="inline-flex items-center px-6 py-3 rounded-lg pointer-events-none disabled bg-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-current w-7 h-7">
                        <path d="M 5.4160156 2.328125 L 12.935547 10.158203 C 13.132547 10.363203 13.45925 10.363203 13.65625 10.158203 L 15.179688 8.5742188 C 15.405688 8.3392188 15.354312 7.956875 15.070312 7.796875 C 11.137313 5.571875 6.2620156 2.811125 5.4160156 2.328125 z M 3.140625 2.8476562 C 3.055625 3.0456562 3 3.2629063 3 3.5039062 L 3 20.591797 C 3 20.788797 3.044375 20.970625 3.109375 21.140625 L 11.576172 12.324219 C 11.762172 12.131219 11.762172 11.826813 11.576172 11.632812 L 3.140625 2.8476562 z M 17.443359 9.2578125 C 17.335484 9.2729375 17.233297 9.32375 17.154297 9.40625 L 15.015625 11.632812 C 14.829625 11.825812 14.829625 12.130219 15.015625 12.324219 L 17.134766 14.529297 C 17.292766 14.694297 17.546141 14.729188 17.744141 14.617188 C 19.227141 13.777188 20.226563 13.212891 20.226562 13.212891 C 20.725562 12.909891 21.007 12.443547 21 11.935547 C 20.992 11.439547 20.702609 10.981938 20.224609 10.710938 C 20.163609 10.676937 19.187672 10.124359 17.763672 9.3183594 C 17.664172 9.2623594 17.551234 9.2426875 17.443359 9.2578125 z M 13.296875 13.644531 C 13.165875 13.644531 13.034047 13.696328 12.935547 13.798828 L 5.4746094 21.566406 C 6.7566094 20.837406 11.328781 18.249578 15.050781 16.142578 C 15.334781 15.981578 15.386156 15.599281 15.160156 15.363281 L 13.65625 13.798828 C 13.55775 13.696328 13.427875 13.644531 13.296875 13.644531 z"></path>
                      </svg>
                      <span className="flex flex-col items-start ml-4 leading-none">
                        <span className="mb-1 text-xs">Download it on</span>
                        <span className="font-semibold title-font">Google Play Store</span>
                      </span>
                    </button>


                  </div>

                </div>
                <div>
                  <div className="flex items-center justify-center px-6">
                    <div className="flex flex-col justify-center p-14 lg:text-left">
                      <p className="mb-1 text-sm font-medium tracking-widest uppercase text-base-content"><span className="font-bold text-primary">Second,</span> <br /> Download the Pathfinder App by</p>
                      <h1 className="py-2 text-3xl font-medium leading-tight title-font">Scanning the QR Code </h1>
                    </div>
                    <div>
                      <img src={pathfinderQR} className="h-72 w-72" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-10">
                    <div className="flex flex-col justify-between space-x-10 lg:text-left">
                      <p className="mb-1 text-sm font-medium tracking-widest uppercase text-base-content"><span className="font-bold text-primary">Third,</span><br /> Open the PathFinder App and</p>
                      <h1 className="py-2 text-3xl font-medium leading-tight title-font">Scan the QR Code <br/>and start Navigating. </h1>
                    </div>
                    <div>
                      {selectedBuilding && qrCodes[selectedBuilding] ? (
                        <img src={qrCodes[selectedBuilding]} alt={`QR Code for ${selectedBuilding}`} />
                      ) : (
                        <div className="flex flex-col items-center justify-center space-y-2">
                           <Icon icon="ph:cloud-warning" className="w-40 h-40" />
                          <p>No QR code available for <br/>the selected building</p>
                          </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
             
            </div>
          </Modal>
          {/* Modal for General Building Information */}
          <Modal
            className="flex items-center justify-center w-screen h-screen bg-black/60"
            isOpen={showBuildingInfo}
            onRequestClose={() => setBuildingInfoModal(false)}
            contentLabel="Alert"
          >
            <div className="w-6/12 h-auto p-6 shadow-xl bg-base-100 rounded-2xl text-base-content">
              <div className="flex justify-evenly">
                <div className="">
                  <div className="flex items-center justify-center pb-2">
                    <h1 className="font-bold">Classification of Buildings</h1>
                  </div>
                  <div className="">
                    <div className="flex justify-between h-auto px-6 pb-3 shadow-inner bg-base-300 rounded-2xl">
                      <div className="flex flex-col">
                        <h1 className="text-base font-semibold">
                          Building Name
                        </h1>
                        <div className="">
                          <p>Techvoc Building </p>
                          <p>Yellow Building (Old Academic Building)</p>
                          <p>SB (Belmonte Hall)</p>
                          <p>Admin Building</p>
                          <p>Metalcasting Building</p>
                          <p>KorPhil Building</p>
                          <p>PHilChi Building</p>
                          <p>Chem Lab</p>
                          <p>Canteen</p>
                          <p>Auditorium (Bautista Building)</p>
                          <p>New Academic Building</p>
                        </div>
                      </div>
                      <div>
                        <h1 className="text-base font-semibold">
                          Reference Code
                        </h1>
                        <div className="text-center">
                          <p>IA</p>
                          <p>IB</p>
                          <p>IC</p>
                          <p>ID</p>
                          <p>IE</p>
                          <p>IF</p>
                          <p>IG</p>
                          <p>IH</p>
                          <p>IJ</p>
                          <p>IK</p>
                          <p>IL</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="flex items-center justify-center pb-2">
                    <h1 className="font-bold">Classification of Rooms</h1>
                  </div>
                  <div className="">
                    <div className="flex justify-between h-auto px-6 pb-3 shadow-inner bg-base-300 rounded-2xl">
                      <div className="flex flex-col">
                        <h1 className="text-base font-semibold">Room Type</h1>
                        <div className="">
                          <p>Lecture Room</p>
                          <p>Computer Lab Room</p>
                          <p>Working Lab Room</p>
                          <p>Science Lab Room</p>
                        </div>
                      </div>
                      <div>
                        <h1 className="text-base font-semibold">
                          Reference Code
                        </h1>
                        <div className="text-center">
                          <p>a</p>
                          <p>b</p>
                          <p>c</p>
                          <p>d</p>
                        </div>
                      </div>
                    </div>
                    <p className="pt-4 pb-2 text-center">
                      Room Allocation as of January 2023
                    </p>
                    <p className="py-3 text-center">
                      Building Codes as of January 2023
                    </p>
                    <div className="flex items-center justify-center mt-5">
                      <button
                        onClick={closeBuildingInfoModal}
                        className="text-xl btn bg-base-300 hover:bg-emerald-500 hover:text-white btn-block"
                      >
                        <Icon
                          icon="mingcute:check-2-line"
                          className="w-10 h-10"
                        />
                        Accept.
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

export default SanBartolome;