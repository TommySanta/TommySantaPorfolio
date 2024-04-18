import { useFrame, useThree } from '@react-three/fiber';
import React from 'react';

const CameraController = ({ avatarPosition }) => {
  const { camera } = useThree();

  useFrame(() => {
    camera.position.x = avatarPosition[0];
    camera.position.y = avatarPosition[1] + 2; // Eleva la cámara un poco sobre el avatar
    camera.position.z = avatarPosition[2] + 12; // Coloca la cámara 10 unidades en frente del avatar

    camera.lookAt(...avatarPosition);
  });

  return null;
};

export default CameraController;