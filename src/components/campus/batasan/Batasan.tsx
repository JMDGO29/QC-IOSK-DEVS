// Batasan.js
import React, { Suspense, useEffect, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { Canvas } from "@react-three/fiber";
import ModelViewer from "./ModelViewer";
import { Bounds, OrbitControls, Stage, Stars } from "@react-three/drei";
import Clouds from "../sanBartolome/Clouds";
import Loading from '../../../pages/loading';

import BatasanBuilding from "../../../assets/models/ba_buildings/batasanBuilding.glb"
import BatasanCourt from "../../../assets/models/ba_buildings/batasanCourt.glb"
import BatasanFlooring from "../../../assets/models/ba_buildings/batasanFlooring.glb"
import BatasanUrban from "../../../assets/models/ba_buildings/batasanUrban.glb"
import Landscape from "../../../assets/models/others/landscape.glb"
import { roomData } from '../../../data/roomData';
import SideBar from '../../sidebar/sidebarLayout';
// Import all other necessary dependencies

interface ContainerProps {
  name: string;
}
const Batasan: React.FC<ContainerProps> = ({ name }) => {
  // State variables and functions specific to Batasan
  // Create DRACO loader instance with the decoder path
  const [isNight, setIsNight] = useState(false);
  const [isAnimationActive, setIsAnimationActive] = useState(false);
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.7/");
  dracoLoader.setDecoderConfig({ type: 'js' }); // Specify the type of decoder (js or wasm)

  const gltfLoader = new GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader); // Pass the DRACOLoader instance
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


  const handleModelClick = (modelName: any) => {
    // Logic for handling model click specific to Batasan
  };

  // JSX rendering for Batasan
  return (
    <>
      <Suspense fallback={<Loading />}>
        <SideBar/>
        
        <Canvas
          camera={{
            fov: 50,
            position: isAnimationActive ? [80, 40, 80] : [80, 40, 80], // Change camera position based on animation activity
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
                {/* <directionalLight
                    intensity={1}
                    position={[30, 30, 30]}
                  /> */}
                <Stars radius={50} depth={30} count={100} factor={3} />
              </>
            ) : null}
            <Clouds />
            {/* SB FLOORING */}
            {/* <ModelViewer modelPath={openGrounds} position={[0, 0, 0]} /> */}

            <ModelViewer modelPath={Landscape} position={[-20, -16, 40]} />
            <ModelViewer modelPath={BatasanFlooring} position={[0, 0, 0]}   scale={[2.2, 2, 2]} />
            

            {/* <ModelViewer modelPath={IL401a} position={[3.4, -2, 28.5]} /> */}

            {/* TECHVOC */}
            <ModelViewer
              modelPath={BatasanBuilding}
              position={[0, 0, 0]}
              scale={[2.2, 2, 2]}
              name="Batasan Building"
              textPosition={[-3.5, 17, 0]}
              onClick={() => handleModelClick("Batasan Building")}
            />

            {/* TECHVOC */}
            <ModelViewer
              modelPath={BatasanCourt}
              position={[0, 0, 95]}
              scale={[2.2, 2, 2]}
              name="Batasan Court"
              textPosition={[17, 13, -13]}
              onClick={() => handleModelClick("Batasan Court")}
            />


            {/* TECHVOC */}
            <ModelViewer
              modelPath={BatasanUrban}
              position={[0, -0.95, 100]}
              scale={[2.2, 2, 2]}
              name="Batasan Urban"
              textPosition={[25, 5, 25]}
              onClick={() => handleModelClick("Batasan Urban")}
            />



            {/* <RotatingMesh /> */}
          </Stage>
        </Canvas>
      </Suspense>

    </>
  );
}

export default Batasan;
