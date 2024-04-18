import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import CameraController from "./CameraController";
import './index.css';

function App() {
  const pointsOfInterest = [
    [0, 0, 0],
    [0, 0, -20],
    [0, 0, -40],
    [0, 0, -60],
    [0, 0, -80],
  ];
  
  const [targetPosition, setTargetPosition] = useState(pointsOfInterest[pointsOfInterest.length - 1]);
  const [animation, setAnimation] = useState("Standing");

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      const currentIndex = pointsOfInterest.findIndex(
        (p) => p[0] === targetPosition[0] && p[1] === targetPosition[1] && p[2] === targetPosition[2]
      );
      if (event.key === "ArrowUp" && currentIndex < pointsOfInterest.length - 1) {
        setTargetPosition(pointsOfInterest[currentIndex + 1]);
        setAnimation("Walk");
      } else if (event.key === "ArrowDown" && currentIndex > 0) {
        setTargetPosition(pointsOfInterest[currentIndex - 1]);
        setAnimation("Walk");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [targetPosition]);

  return (
    <Canvas shadows camera={{ position: [0, 2, 10], fov: 30 }}>
      <color attach="background" args={["#ececec"]} />
      <CameraController avatarPosition={targetPosition} />
      <Experience targetPosition={targetPosition} animation={animation} pointsOfInterest={pointsOfInterest} />
    </Canvas>
  );
}

export default App;
