// SanFrancisco.js
import React, { Suspense, useEffect, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { Canvas } from "@react-three/fiber";
import ModelViewer from "./ModelViewer";
import { Bounds, OrbitControls, Stage, Stars } from "@react-three/drei";
import Clouds from "../sanBartolome/Clouds";
import Loading from '../../../pages/loading';

import SanFranciscoBuilding from "../../../assets/models/sf_buildings/sf_building.glb"
import SanFranciscoUrban from "../../../assets/models/sf_buildings/sf_urban.glb"
import Landscape from "../../../assets/models/others/landscape.glb"
import SideBar from '../../sidebar/sidebarLayout';
// Import all other necessary dependencies

interface ContainerProps {
  name: string;
}
const SanFrancisco: React.FC<ContainerProps> = ({ name }) => {
  // State variables and functions specific to SanFrancisco
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
    // Logic for handling model click specific to SanFrancisco
  };

  // JSX rendering for SanFrancisco
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
            

            {/* <ModelViewer modelPath={IL401a} position={[3.4, -2, 28.5]} /> */}

            {/* TECHVOC */}
            <ModelViewer
              modelPath={SanFranciscoBuilding}
              position={[-13,-5, 32]}
              scale={[4, 4, 4]}
              name="SanFrancisco Building"
              textPosition={[-20, 8, 18]}
              onClick={() => handleModelClick("SanFrancisco Building")}
            />

            {/* TECHVOC */}
            <ModelViewer
              modelPath={SanFranciscoUrban}
              position={[-10, -4, 1]}
              scale={[5, 5, 5]}
              name="SanFrancisco Urban"
              textPosition={[-20, 0, -5]}
              onClick={() => handleModelClick("SanFrancisco Urban")}
            />



            {/* <RotatingMesh /> */}
          </Stage>
        </Canvas>
      </Suspense>

    </>
  );
}

export default SanFrancisco;
