import React, { useState, useEffect } from "react";
import { useProgress } from "@react-three/drei";

export const LoadingScreen = (props) => {
  const { started, setStarted } = props;
  const { progress, total, loaded, item } = useProgress();

  useEffect(() => {
    console.log(progress, total, loaded, item);
    if (progress === 100) {
      setTimeout(() => {
        setStarted(true);
      }, 1000); // Cambiar a lo otro después de 4 segundos
    }
  }, [progress, total, loaded, item, setStarted]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-50 transition-opacity duration-2000 pointer-events-none
  flex items-center justify-center bg-indigo-50 
  ${started ? "opacity-0" : "opacity-100"}`}
    >
      <div className="text-4xl md:text-9xl font-bold text-indigo-900 relative">
        <div
          className="absolute left-0 top-0  overflow-hidden truncate text-clip transition-all duration-500"
          style={{
            color: "indigo", // Color del texto
            width: `${progress}%`,
          }}
        >
          Tomás
          <br />
          Santamaría
        </div>
        <div className="opacity-50">
          Tomás
          <br />
          Santamaría
        </div>
      </div>
    </div>
  );
};
