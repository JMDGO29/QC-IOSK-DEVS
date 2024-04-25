// Batasan.js
import React from "react";
import image from "./image.jpg";
import video from "./mov_bbb.mp4";

interface ContainerProps {
  name: string;
}
const RegistrarOffice: React.FC<ContainerProps> = ({ name }) => {
  return (
    <>
      <h1>
        <b>THIS IS THE REGISTRAR PAGE</b>
      </h1>

      <img src={image} width={400} height={400} alt="Sample Image" />
      <h1>TEXT GUIDE 1</h1>
      <h1>TEXT GUIDE 2</h1>

      <video width="750" height="500" controls>
        <source src={video} type="video/mp4" />
      </video>
    </>
  );
};

export default RegistrarOffice;
