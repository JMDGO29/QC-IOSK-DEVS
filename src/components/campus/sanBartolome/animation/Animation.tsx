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

interface ContainerProps {
  name: string;
  roomName: string;
  modelPath: string;
  voice?: string;
  shortPath?: string;

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

const AnimatedModelViewer = ({ modelPath, mixer }: any) => {
  const { scene, animations, cameras } = useGLTF(modelPath) as unknown as GLTF;

  // useEffect(() => {
  //   if (animations) {
  //     const animationAction = mixer.clipAction(animations[0]); // Assuming there's only one animation
  //     animationAction.setLoop(THREE.LoopOnce); // Set the loop to play only once
  //     animationAction.clampWhenFinished = true; // Keep the last frame displayed after the animation finishes
  //     animationAction.play();
  //     console.log("Animation Name:", animations[0].name);

  //     animationAction.onFinish = () => {
  //       // Stop the animation when it finishes playing
  //       animationAction.stop();
  //     };
  //   }
  // }, [animations, mixer]);

  useEffect(() => {
    if (animations) {
      animations.forEach((clip: THREE.AnimationClip) => {
        const action = mixer.clipAction(clip);
        action.play();
        console.log("Animation Name:", clip.name);
      });
    }
  }, [animations, cameras, mixer]);

  useFrame((state, delta) => {
    mixer.update(delta);
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
  shortPath,
  selectedBuilding,
  selectedFloor,
  selectedRoom,
}) => {
  const { scene, cameras } = useGLTF(modelPath) as unknown as GLTF;

  const [activeCameraIndex, setActiveCameraIndex] = useState(0);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [buildings, setBuildings] = useState<Building[]>([]);
  const [otherModel, setOtherModel] = useState<otherModel[]>([]);

  const handleCameraSwitch = () => {
    setActiveCameraIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
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

  return (
    <>
      <div className="fixed z-20 w-full h-auto bg-red-500 bottom-2 ">
        <div className="flex items-start justify-center space-x-3">
          <div
            tabIndex={0}
            className="z-30 border-collapse collapse collapse-arrow bg-base-200 text-base-content w-96"
          >
            <input type="checkbox" />
            <div className="flex items-center justify-between collapse-title">
              <p className="text-xl font-bold">Room: {roomName}</p>
            </div>
          </div>
          <button
            onClick={handleCameraSwitch}
            className="btn-square rounded-2xl btn mt-1.5 btn-accent"
          >
            <Icon
              icon="icon-park-outline:flip-camera"
              className="w-10 h-10 text-base-content"
            />
          </button>
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
        <Clouds />
        <AnimatedModelViewer
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
    </>
  );
};

export default Animation;
