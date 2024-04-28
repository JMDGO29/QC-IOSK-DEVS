import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Clouds from "../Clouds";
import { Icon } from "@iconify/react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
import { useHistory } from "react-router";
import ModelViewer from "../ModelViewer";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import textGuide from "../../../../data/textGuide";
import Modal from "react-modal";
import feedback from "../../../../assets/imgs/feedback.png";
import registrarQR from "../../../qr_code/qrCodes/registrarQR.png";
import ccsQR from "../../../qr_code/qrCodes/ccsQR.png";
import lesitQR from "../../../qr_code/qrCodes/lesitQR.png";
import libraryQR from "../../../qr_code/qrCodes/libraryQR.png";
import nstpQR from "../../../qr_code/qrCodes/nstpQR.png";

import academicPic from "../../../qr_code/images/academic.png";
import adminPic from "../../../qr_code/images/admin.png";
import bautistaPic from "../../../qr_code/images/bautista.png";
import techvocPic from "../../../qr_code/images/techvoc.png";
import yellowPic from "../../../qr_code/images/yellow.png";

interface ContainerProps {
  name: string;
  roomName: string;
  modelPath: string;
  voice?: string;
  shortPath?: string;
  textGuide?: string[];
  selectedBuilding: string;
  selectedFloor: string;
  selectedRoom: string;
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

const modalStyle = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.1)", // Semi-transparent black color
    zIndex: "1000", // Ensure overlay is above other content
  },
  content: {
    width: "80%", // Adjust the width as needed
    height: "90%", // Adjust the height as needed
    padding: "20px", // Adjust the padding as needed
    top: "50%", // Center vertically
    left: "50%", // Center horizontally
    transform: "translate(-62%, -50%)", // Translate back to center
  },
};

const AnimatedModelViewer = ({ modelPath, mixer }: any) => {
  const { scene, animations, cameras } = useGLTF(modelPath) as unknown as GLTF;

  useEffect(() => {
    if (animations && mixer) {
      animations.forEach((clip: THREE.AnimationClip) => {
        const action = mixer.clipAction(clip);
        action.reset(); // Reset the animation
        action.play(); // Start the animation from the beginning
      });
    }
  }, [animations, mixer]);

  useFrame((state, delta) => {
    if (mixer) {
      mixer.update(delta);
    }
  });
  return (
    <>
      <primitive object={scene} position={[0, 0, 0]} />
    </>
  );
};
const Animation: React.FC<ContainerProps> = ({
  name,
  roomName,
  modelPath,
  voice,
  textGuide,
  shortPath,
  selectedBuilding,
  selectedFloor,
  selectedRoom,
}) => {
  const { scene, cameras } = useGLTF(modelPath) as unknown as GLTF;

  const [activeCameraIndex, setActiveCameraIndex] = useState(0);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [qrModal, setQrModal] = useState(false);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [otherModel, setOtherModel] = useState<otherModel[]>([]);
  const [resetScene, setResetScene] = useState(false);
  const [initialCameraPosition, setInitialCameraPosition] = useState<
    [number, number, number]
  >([0, 0, 0]);
  const [option, setOption] = useState("online");

  const toggleOption = () => {
    setOption((prevOption) => (prevOption === "online" ? "offline" : "online"));
  };

  const handleCameraSwitch = () => {
    setActiveCameraIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
  };

  const handleResetScene = () => {
    setResetScene((prevReset) => !prevReset); // Toggle the state to trigger a re-render
    if (mixerRef.current && scene.animations && scene.animations.length > 0) {
      mixerRef.current.setTime(0); // Set time to start of animation
    }
    if (cameras && cameras.length > 0 && initialCameraPosition) {
      cameras[activeCameraIndex].position.set(...initialCameraPosition);
    }
  };

  useEffect(() => {
    if (cameras && cameras.length > 0) {
      const initialPosition = [
        cameras[activeCameraIndex].position.x,
        cameras[activeCameraIndex].position.y,
        cameras[activeCameraIndex].position.z,
      ] as [number, number, number]; // Convert to tuple type
      setInitialCameraPosition(initialPosition);
    }
  }, [cameras, activeCameraIndex]);

  const clickHome = () => {
    window.location.reload();
  };

  const clickQr = () => {
    setQrModal(true);
  };

  const closeModal = () => {
    setQrModal(false);
    setOption("online");
  };

  useEffect(() => {
    let timeoutId: any;

    const audio = audioRef.current;
    if (audio && voice) {
      timeoutId = setTimeout(() => {
        audio.src = voice;
        audio
          .play()
          .catch((error) => console.error("Audio play error:", error));
      }, 10000); // Delay audio playback
    }

    return () => {
      clearTimeout(timeoutId); // Clear the timeout if the component unmounts before audio starts playing
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
        audio.src = ""; // Reset the audio source
      }
    };
  }, [voice]);

  const gltfCamera =
    cameras && cameras.length > 0
      ? (cameras[activeCameraIndex] as THREE.PerspectiveCamera)
      : null;

  if (!mixerRef.current) {
    mixerRef.current = new THREE.AnimationMixer(scene);
  }

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
  }, [resetScene]);

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
  }, [resetScene]);

  return (
    <>
      <div className="fixed bottom-0 right-0 z-50 w-auto h-auto">
        <div className="flex items-start justify-start space-x-3">
          <div className="h-screen w-[400px] bg-base-100">
            <div className="relative flex flex-col justify-between h-full p-3 space-y-3 bg-transparent gap-">
              <div className="flex flex-col w-full h-24 space-y-5 min-h-10">
                <div className="h-auto p-6 bg-base-300 rounded-3xl ">
                  <p className="text-xs font-bold text-base-content align-super">
                    {selectedRoom}
                  </p>
                  <p className="text-3xl font-bold text-base-content">
                    {roomName}
                  </p>
                </div>
                <div className="w-full h-auto max-h-[810px] p-3 bg-base-300 rounded-3xl">
                  <div className="h-auto max-h-full p-6 overflow-y-auto bg-base-300 rounded-3xl ">
                    <div className="text-xl font-bold text-base-content">
                      {Array.isArray(textGuide) && (
                        <ul className="steps steps-vertical">
                          {textGuide.map((guide, index) => (
                            <li key={index} className=" step step-accent">
                              <p className="text-left">{guide}</p>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-24 bg-base-300 text-base-content rounded-3xl">
                <div className="flex items-center justify-around w-full h-24 px-3 ">
                  <button
                    onClick={clickHome}
                    className="border-none shadow-none btn-square rounded-2xl btn btn-lg hover:btn-accent"
                  >
                    <Icon
                      icon="octicon:home-16"
                      className="w-10 h-10 text-base-content"
                    />
                  </button>
                  <button
                    onClick={handleResetScene}
                    className="border-none shadow-none btn-square rounded-2xl btn btn-lg hover:btn-accent"
                  >
                    <Icon
                      icon="mi:refresh"
                      className="w-10 h-10 text-base-content"
                    />
                  </button>
                  <button
                    onClick={handleCameraSwitch}
                    className="border-none shadow-none btn-square rounded-2xl btn btn-lg hover:btn-accent"
                  >
                    <Icon
                      icon="icon-park-outline:flip-camera"
                      className="w-10 h-10 text-base-content"
                    />
                  </button>
                  <button
                    onClick={clickQr}
                    className="border-none shadow-none btn-square rounded-2xl btn btn-lg hover:btn-accent"
                  >
                    <Icon
                      icon="mingcute:qrcode-2-line"
                      className="w-10 h-10 text-base-content"
                    />
                  </button>
                </div>
              </div>
            </div>
            <p className="text-xl font-bold">Room: {roomName}</p>
          </div>
        </div>
      </div>
      <Canvas
        className={"bg-gradient-to-tr from-sky-900 to-sky-400"}
        style={{ position: "absolute" }}
        camera={gltfCamera as THREE.PerspectiveCamera}
      >
        <OrbitControls
          target={[0, -20, 25]}
          enablePan={true}
          enableZoom={false}
          enableRotate={false}
          camera={cameras[1]}
        />
        <ambientLight intensity={2} />
        <AnimatedModelViewer
          key={resetScene ? "reset" : "default"}
          modelPath={modelPath}
          mixer={mixerRef.current}
          activeCameraIndex={activeCameraIndex}
          cameras={cameras}
        />

        {buildings.map((building) => (
          <ModelViewer
            key={building.id}
            name={building.buildingName}
            modelPath={building.buildingPath}
            position={building.buildingPosition}
            scale={building.buildingScale}
            textPosition={building.buildingLabelPosition}
          />
        ))}

        {otherModel.map((model) => (
          <ModelViewer
            key={model.id}
            modelPath={model.modelPath}
            position={model.modelPosition}
            scale={model.modelScale}
          />
        ))}
      </Canvas>
      <audio ref={audioRef} src={voice} />

      <Modal
        isOpen={qrModal}
        onRequestClose={() => setQrModal(false)}
        contentLabel="Alert"
        style={modalStyle}
      >
        {/* TECHVOC BUILDING */}
        {roomName === "NSTP" && (
          <>
            {option === "online" ? (
              <>
                <h1 className="text-center mt-14">
                  Scan this code for your mobile navigational guide.
                </h1>
                <p className="text-center">
                  You will be redirected to a web page after scanning.
                </p>
                <p className="text-center mb-14">
                  The provided information will help you to locate NSTP.
                </p>
                <div className="flex justify-center space-x-3">
                  <img src={nstpQR} />
                </div>
                <p className="text-center">
                  If you do not have internet connection, please click the link
                  below to view an alternative guide
                </p>
                <div className="flex justify-center space-x-3">
                  <button
                    className="text-center text-blue-500"
                    onClick={toggleOption}
                  >
                    <u>Click here</u>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col w-full">
                  <div className="grid h-auto flex-grow card bg-base-300 rounded-box place-items-center">
                    <p className="text-black text-center mt-5">
                      Follow the green line to reach the Techvoc building. You
                      can use your mobile phone to capture the screen as your
                      guide.
                    </p>
                    <p className="text-black text-center">
                      Estimation Time of Arrival: 1 minute
                    </p>
                  </div>
                  <div className="divider divider-horizontal"></div>
                  <div className="grid h-auto place-items-center">
                    <img src={techvocPic} />
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-center space-x-3 mt-14">
              <button onClick={closeModal} className="btn bg-base-300">
                <Icon icon="line-md:close-small" className="w-10 h-10" />
                Close
              </button>
            </div>
          </>
        )}

        {/* ADMIN BUILDING */}
        {roomName === "Registrar & Admission Division" && (
          <>
            {option === "online" ? (
              <>
                <h1 className="text-center mt-14">
                  Scan this code for your mobile navigational guide.
                </h1>
                <p className="text-center">
                  You will be redirected to a web page after scanning.
                </p>
                <p className="text-center mb-14">
                  The provided information will help you to locate Registrar
                  Office.
                </p>
                <div className="flex justify-center space-x-3">
                  <img src={registrarQR} />
                </div>
                <p className="text-center">
                  If you do not have internet connection, please click the link
                  below to view an alternative guide
                </p>
                <div className="flex justify-center space-x-3">
                  <button
                    className="text-center text-blue-500"
                    onClick={toggleOption}
                  >
                    <u>Click here</u>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col w-full">
                  <p className="text-black text-center mt-5">
                    Follow the green line to reach the Techvoc building. You can
                    use your mobile phone to capture the screen as your guide.
                  </p>
                  <p className="text-black text-center">
                    Estimation Time of Arrival: 3 minutes and 30 seconds
                  </p>            
                  <div className="divider divider-horizontal"></div>
                  <div className="grid h-auto flex-grow card bg-base-300 rounded-box place-items-center">
                    <div className="grid h-auto place-items-center">
                      <img src={adminPic} />
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-center space-x-3 mt-14">
              <button onClick={closeModal} className="btn bg-base-300">
                <Icon icon="line-md:close-small" className="w-10 h-10" />
                Close
              </button>
            </div>
          </>
        )}

        {/* YELLOW BUILDING */}
        {roomName === "LESIT and Gen Z Office" && (
          <>
            {option === "online" ? (
              <>
                <h1 className="text-center mt-14">
                  Scan this code for your mobile navigational guide.
                </h1>
                <p className="text-center">
                  You will be redirected to a web page after scanning.
                </p>
                <p className="text-center mb-14">
                  The provided information will help you to locate LESIT and GEN
                  Z Office.
                </p>
                <div className="flex justify-center space-x-3">
                  <img src={lesitQR} />
                </div>
                <p className="text-center">
                  If you do not have internet connection, please click the link
                  below to view an alternative guide
                </p>
                <div className="flex justify-center space-x-3">
                  <button
                    className="text-center text-blue-500"
                    onClick={toggleOption}
                  >
                    <u>Click here</u>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col w-full">
                  <div className="grid h-auto flex-grow bg-base-300 place-items-center">
                    <p className="text-black text-center mt-5">
                      Follow the green line to reach the Yellow building. You
                      can use your mobile phone to capture the screen as your
                      guide.
                    </p>
                    <p className="text-black text-center">
                      Estimation Time of Arrival: 3 minutes
                    </p>
                  </div>
                  <div className="divider divider-horizontal"></div>
                  <div className="grid h-auto place-items-center">
                    <img src={yellowPic} />
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-center space-x-3 mt-14">
              <button onClick={closeModal} className="btn bg-base-300">
                <Icon icon="line-md:close-small" className="w-10 h-10" />
                Close
              </button>
            </div>
          </>
        )}

        {/* BAUTISTA BUILDING */}
        {roomName === "College of Computer Studies" && (
          <>
            {option === "online" ? (
              <>
                <h1 className="text-center mt-14">
                  Scan this code for your mobile navigational guide.
                </h1>
                <p className="text-center">
                  You will be redirected to a web page after scanning.
                </p>
                <p className="text-center mb-14">
                  The provided information will help you to locate College of Computer Studies (CCS).
                </p>
                <div className="flex justify-center space-x-3">
                  <img src={ccsQR} />
                </div>
                <p className="text-center">
                  If you do not have internet connection, please click the link
                  below to view an alternative guide
                </p>
                <div className="flex justify-center space-x-3">
                  <button
                    className="text-center text-blue-500"
                    onClick={toggleOption}
                  >
                    <u>Click here</u>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col w-full">
                  <div className="grid h-auto flex-grow bg-base-300 place-items-center">
                    <p className="text-black text-center mt-5">
                      Follow the green line to reach the Bautista building. You
                      can use your mobile phone to capture the screen as your
                      guide.
                    </p>
                    <p className="text-black text-center">
                      Estimation Time of Arrival: 5 minutes
                    </p>
                  </div>
                  <div className="divider divider-horizontal"></div>
                  <div className="grid h-auto place-items-center">
                    <img src={bautistaPic} />
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-center space-x-3 mt-14">
              <button onClick={closeModal} className="btn bg-base-300">
                <Icon icon="line-md:close-small" className="w-10 h-10" />
                Close
              </button>
            </div>
          </>
        )}

        {/* ACADEMIC BUILDING */}
        {roomName === "Library Room" && (
          <>
            {option === "online" ? (
              <>
                <h1 className="text-center mt-14">
                  Scan this code for your mobile navigational guide.
                </h1>
                <p className="text-center">
                  You will be redirected to a web page after scanning.
                </p>
                <p className="text-center mb-14">
                  The provided information will help you to locate the Library.
                </p>
                <div className="flex justify-center space-x-3">
                  <img src={libraryQR} />
                </div>
                <p className="text-center">
                  If you do not have internet connection, please click the link
                  below to view an alternative guide
                </p>
                <div className="flex justify-center space-x-3">
                  <button
                    className="text-center text-blue-500"
                    onClick={toggleOption}
                  >
                    <u>Click here</u>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col w-full">
                  <div className="grid h-auto flex-grow bg-base-300 place-items-center">
                    <p className="text-black text-center mt-5">
                      Follow the green line to reach the Academic building. You
                      can use your mobile phone to capture the screen as your
                      guide.
                    </p>
                    <p className="text-black text-center">
                      Estimation Time of Arrival: 6 minutes
                    </p>
                  </div>
                  <div className="divider divider-horizontal"></div>
                  <div className="grid h-auto place-items-center">
                    <img src={academicPic} />
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-center space-x-3 mt-14">
              <button onClick={closeModal} className="btn bg-base-300">
                <Icon icon="line-md:close-small" className="w-10 h-10" />
                Close
              </button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default Animation;
