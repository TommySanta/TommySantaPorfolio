import { OrbitControls, Sky, Environment, Sphere, Html } from "@react-three/drei";
import React from "react";
import { motion } from "framer-motion"; // Importa motion desde framer-motion
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
      <Avatar targetPosition={targetPosition} animation={animation} pointsOfInterest={pointsOfInterest}/>
      {/* Texto en la escena 3D con animación */}
      <Html position={[-5, 1, -80]}>
      <motion.div
        className="absolute left-0 bottom-0 p-8"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -25 }} // Animación de salida
        transition={{ duration: 1, delay: 1.5 }}
      >
        <motion.h1
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-2"
          style={{ whiteSpace: 'nowrap' }}
        >
          Hola, me llamo 
          <br className="hidden md:block" />
          Tomás Santamaría
        </motion.h1>
        <motion.p
          className="text-base md:text-lg lg:text-xl text-dark-300 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          Estudiante DAW + DAM
        </motion.p>
      </motion.div>
    </Html>

    </>
  );
};
