// Dentro de Experience.jsx

import { OrbitControls, Sky, Environment, Sphere } from "@react-three/drei";
import React from "react";
import { Avatar } from "./Avatar";

export const Experience = ({ targetPosition, animation, pointsOfInterest }) => {
  return (
    <>
      <OrbitControls />
      <Sky />
      <Environment preset="sunset" />
      <mesh rotation-x={-Math.PI * 0.5} position={[0, -0.5, -40]}>
        <planeGeometry args={[2, 100]} />
        <meshStandardMaterial color="lightgrey" />
      </mesh>
      {pointsOfInterest.map((pos, index) => (
        <Sphere key={index} args={[0.5, 32, 32]} position={pos} material-color="lightblue" />
      ))}
      <Avatar targetPosition={targetPosition} animation={animation} />
    </>
  );
};
