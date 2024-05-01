import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import CameraController from "./CameraController";
import { LoadingScreen } from "./components/LoadingScreen"; // Importa el componente LoadingScreen
import "./index.css";

function App() {
  const pointsOfInterest = [
    [0, 0, 0],
    [0, 0, -20],
    [0, 0, -40],
    [0, 0, -60],
    [0, 0, -80],
  ];

  const [targetIndex, setTargetIndex] = useState(pointsOfInterest.length - 1); // Comenzamos desde el último punto
  const [animation, setAnimation] = useState("Standing");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp" && targetIndex < pointsOfInterest.length - 1) {
        setTargetIndex(targetIndex + 1);
        setAnimation("Walk");
      } else if (event.key === "ArrowDown" && targetIndex > 0) {
        setTargetIndex(targetIndex - 1);
        setAnimation("Walk");
      }
    };

    const handleScroll = (event) => {
      if (event.deltaY < 0 && targetIndex < pointsOfInterest.length - 1) {
        setTargetIndex(targetIndex + 1);
        setAnimation("Walk");
      } else if (event.deltaY > 0 && targetIndex > 0) {
        setTargetIndex(targetIndex - 1);
        setAnimation("Walk");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleScroll);
    };
  }, [targetIndex, pointsOfInterest.length]);

  const targetPosition = pointsOfInterest[targetIndex];

  return (
    <>
      <LoadingScreen started={started} setStarted={setStarted} />
      <Canvas shadows camera={{ position: [0, 2, 10], fov: 30 }}>
        <color attach="background" args={["#ececec"]} />
        <CameraController avatarPosition={targetPosition} />
        <Experience
          targetPosition={targetPosition}
          animation={animation}
          pointsOfInterest={pointsOfInterest}
        />
      </Canvas>
    </>
  );
}

export default App;
