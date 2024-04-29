import React, { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useFBX, useGLTF, useAnimations, Effects } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";

export function Avatar({ targetPosition, animation, pointsOfInterest }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("models/6603042075cd33aaccc0c8cf.glb");
  const { camera } = useThree();

  const { animations: standingAnimation } = useFBX("animations/Standing Idle.fbx");
  const { animations: walkAnimation} = useFBX("animations/Walking.fbx");
  
  standingAnimation[0].name = "Standing";
  walkAnimation[0].name = "Walk";

  const { actions } = useAnimations([standingAnimation[0], walkAnimation[0]], group);

  // Estado para controlar si el avatar está en movimiento
  const [isMoving, setIsMoving] = useState(false);
  // Estado para almacenar la posición anterior del avatar
  const [previousPosition, setPreviousPosition] = useState(null);
   // Estado para almacenar la posición actual del avatar
   const [currentPosition, setCurrentPosition] = useState(null);

   useFrame(() => {
    // Lógica para mover el avatar hacia el siguiente punto de interés
    if (!group.current || !targetPosition) return;
    const currentPos = new THREE.Vector3().setFromMatrixPosition(group.current.matrixWorld);
    const targetPos = new THREE.Vector3(...targetPosition);
    const direction = new THREE.Vector3().subVectors(targetPos, currentPos).normalize();
  
    // Determina el ángulo hacia el objetivo en el plano horizontal (XZ)
    const angle = Math.atan2(direction.x, direction.z);
  
    // Aplica la rotación en z para que el avatar mire hacia el punto objetivo
    group.current.rotation.z = angle; 
  
    const distance = currentPos.distanceTo(targetPos);
  
    if (distance > 0.1) {
      setIsMoving(true);
      // Almacena la posición anterior justo antes de comenzar a moverse, si no estaba moviéndose antes
      if (!isMoving) {
        setPreviousPosition([...currentPos.toArray()]);
      }
      const step = currentPos.lerp(targetPos, 0.023); // Ajusta la velocidad según sea necesario
      group.current.position.copy(step);
      
      // Determina si el objetivo está detrás
      const isBehind = Math.abs(angle - group.current.rotation.x) > Math.PI / 2;
      
    } else if (isMoving) {
      setIsMoving(false);
      // Actualiza la posición actual del avatar solo cuando se detiene en un punto
      setCurrentPosition([...currentPos.toArray()]);
    } else if (!isMoving) {
      setIsMoving(false);
      // Calcula el ángulo opuesto para que el avatar mire hacia adelante cuando se detiene
      if (previousPosition && currentPosition && previousPosition[2] > currentPosition[2]) {
        const angle = Math.atan2(currentPosition[0] - previousPosition[0], currentPosition[2] - previousPosition[2]);
        const oppositeAngle = angle + Math.PI;
        group.current.rotation.z = oppositeAngle;
      }
    }
  });
 
  useEffect(() => {
    const currentAction = isMoving ? "Walk" : "Standing";
    const previousAction = isMoving ? "Standing" : "Walk";

    actions[currentAction]?.reset().fadeIn(0.25).play();
    actions[previousAction]?.fadeOut(0.25);

    return () => {
      actions[currentAction]?.fadeOut(0.25);
    };
  }, [isMoving, actions]);

  useEffect(() => {
    // Cuando cambia el punto de interés, actualiza la posición del avatar y reinicia la animación
    group.current.position.set(...targetPosition);
    setIsMoving(true); // Comienza a moverse hacia el nuevo punto
  }, [targetPosition]);

  useEffect(() => {
    // Almacena la posición anterior justo antes de moverse nuevamente, si estaba moviéndose antes
    if (isMoving) {
      if (currentPosition !== null) 
      setPreviousPosition([...currentPosition]);
    }
  }, [isMoving]);

  useEffect(() => {
    
    console.log("Posición anterior del avatar:", previousPosition);
  }, [previousPosition]);

  useEffect(() => {
    
    console.log("Posición actual del avatar:", currentPosition);
  }, [currentPosition]);



  return (
    <group ref={group} dispose={null}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
          geometry={nodes.Wolf3D_Body.geometry}
          material={materials.Wolf3D_Body}
          skeleton={nodes.Wolf3D_Body.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
          material={materials.Wolf3D_Outfit_Bottom}
          skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
          material={materials.Wolf3D_Outfit_Footwear}
          skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Top.geometry}
          material={materials.Wolf3D_Outfit_Top}
          skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Hair.geometry}
          material={materials.Wolf3D_Hair}
          skeleton={nodes.Wolf3D_Hair.skeleton}
        />
        <skinnedMesh
          name="EyeLeft"
          geometry={nodes.EyeLeft.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeLeft.skeleton}
          morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
        />
        <skinnedMesh
          name="EyeRight"
          geometry={nodes.EyeRight.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeRight.skeleton}
          morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
        />
        <skinnedMesh
          name="Wolf3D_Head"
          geometry={nodes.Wolf3D_Head.geometry}
          material={materials.Wolf3D_Skin}
          skeleton={nodes.Wolf3D_Head.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
        />
        <skinnedMesh
          name="Wolf3D_Teeth"
          geometry={nodes.Wolf3D_Teeth.geometry}
          material={materials.Wolf3D_Teeth}
          skeleton={nodes.Wolf3D_Teeth.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
        />
    </group>
  );
}

useGLTF.preload("models/6603042075cd33aaccc0c8cf.glb");
