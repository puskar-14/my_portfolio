import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Character({ position = [0, 0, 0], isWalking = false, facing = 'forward' }) {
  const groupRef = useRef();
  const leftLegRef = useRef();
  const rightLegRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const torsoRef = useRef();
  const backpackRef = useRef();
  const headRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth position interpolation
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, position[0], delta * 6);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, position[1], delta * 6);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, position[2], delta * 6);

    // Target rotation based on facing direction
    let targetRotY = 0; // facing forward down the hallway (-Z)
    if (facing === 'left') targetRotY = Math.PI / 2;
    else if (facing === 'right') targetRotY = -Math.PI / 2;
    else if (facing === 'backward') targetRotY = Math.PI;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 8);

    const time = state.clock.getElapsedTime() * 8;

    if (isWalking) {
      // Walk cycle swing
      const swing = Math.sin(time) * 0.55;
      if (leftLegRef.current) leftLegRef.current.rotation.x = swing;
      if (rightLegRef.current) rightLegRef.current.rotation.x = -swing;

      if (leftArmRef.current) leftArmRef.current.rotation.x = -swing * 0.7;
      if (rightArmRef.current) rightArmRef.current.rotation.x = swing * 0.7;

      // Subtle torso and backpack bobbing
      const bob = Math.abs(Math.sin(time)) * 0.08;
      if (torsoRef.current) torsoRef.current.position.y = 0.85 + bob;
      if (backpackRef.current) {
        backpackRef.current.position.y = 0.85 + bob;
        backpackRef.current.rotation.x = Math.sin(time) * 0.05;
      }
      if (headRef.current) {
        headRef.current.position.y = 1.45 + bob * 1.2;
        headRef.current.rotation.z = Math.sin(time * 0.5) * 0.04;
      }
    } else {
      // Idle gentle breathing animation
      const breath = Math.sin(state.clock.getElapsedTime() * 2) * 0.02;
      if (leftLegRef.current) leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, 0, delta * 10);
      if (rightLegRef.current) rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, 0, delta * 10);
      if (leftArmRef.current) leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, 0, delta * 10);
      if (rightArmRef.current) rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, 0, delta * 10);
      if (torsoRef.current) torsoRef.current.position.y = 0.85 + breath;
      if (headRef.current) headRef.current.position.y = 1.45 + breath * 1.3;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Soft Drop Shadow under character */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.42, 24]} />
        <meshBasicMaterial color="#3D352E" transparent opacity={0.22} />
      </mesh>

      {/* Torso / Pastel Hoodie */}
      <mesh ref={torsoRef} position={[0, 0.85, 0]} castShadow>
        <boxGeometry args={[0.5, 0.6, 0.32]} />
        <meshToonMaterial color="#A4C2CB" />
      </mesh>

      {/* Cozy Hoodie Hood Collar */}
      <mesh position={[0, 1.15, 0.04]}>
        <cylinderGeometry args={[0.22, 0.28, 0.1, 12]} />
        <meshToonMaterial color="#8EAAB3" />
      </mesh>

      {/* Backpack with Pastel Ochre/Mustard Hue */}
      <group ref={backpackRef} position={[0, 0.86, 0.24]}>
        <mesh castShadow>
          <boxGeometry args={[0.38, 0.44, 0.2]} />
          <meshToonMaterial color="#E6B86C" />
        </mesh>
        {/* Backpack pocket */}
        <mesh position={[0, -0.06, 0.11]}>
          <boxGeometry args={[0.28, 0.2, 0.06]} />
          <meshToonMaterial color="#D4A152" />
        </mesh>
        {/* Tiny backpack patch (like a coder sticker) */}
        <mesh position={[0.07, 0.08, 0.105]}>
          <planeGeometry args={[0.09, 0.09]} />
          <meshBasicMaterial color="#7FA9E8" />
        </mesh>
        {/* Backpack straps */}
        <mesh position={[-0.14, 0.02, -0.1]}>
          <boxGeometry args={[0.05, 0.42, 0.08]} />
          <meshToonMaterial color="#B08643" />
        </mesh>
        <mesh position={[0.14, 0.02, -0.1]}>
          <boxGeometry args={[0.05, 0.42, 0.08]} />
          <meshToonMaterial color="#B08643" />
        </mesh>
      </group>

      {/* Head */}
      <group ref={headRef} position={[0, 1.45, 0]}>
        {/* Face */}
        <mesh castShadow>
          <sphereGeometry args={[0.24, 16, 16]} />
          <meshToonMaterial color="#F8D3B8" />
        </mesh>
        {/* Hair - Soft Messy Developer Hair */}
        <mesh position={[0, 0.08, -0.02]}>
          <sphereGeometry args={[0.26, 14, 14]} />
          <meshToonMaterial color="#4A3B32" />
        </mesh>
        {/* Front Hair Bangs */}
        <mesh position={[0, 0.16, 0.14]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.28, 0.14, 0.14]} />
          <meshToonMaterial color="#4A3B32" />
        </mesh>
        {/* Cute Glasses / Spectacles */}
        <group position={[0, 0.02, 0.23]}>
          <mesh position={[-0.09, 0, 0]}>
            <ringGeometry args={[0.045, 0.065, 12]} />
            <meshBasicMaterial color="#3A322C" side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0.09, 0, 0]}>
            <ringGeometry args={[0.045, 0.065, 12]} />
            <meshBasicMaterial color="#3A322C" side={THREE.DoubleSide} />
          </mesh>
          {/* Bridge */}
          <mesh position={[0, 0.01, 0]}>
            <planeGeometry args={[0.06, 0.02]} />
            <meshBasicMaterial color="#3A322C" side={THREE.DoubleSide} />
          </mesh>
        </group>
      </group>

      {/* Left Leg */}
      <group ref={leftLegRef} position={[-0.14, 0.55, 0]}>
        {/* Pant leg */}
        <mesh position={[0, -0.22, 0]} castShadow>
          <boxGeometry args={[0.16, 0.44, 0.16]} />
          <meshToonMaterial color="#505A69" />
        </mesh>
        {/* Sneaker */}
        <mesh position={[0, -0.48, -0.04]}>
          <boxGeometry args={[0.17, 0.12, 0.26]} />
          <meshToonMaterial color="#FAF5EE" />
        </mesh>
      </group>

      {/* Right Leg */}
      <group ref={rightLegRef} position={[0.14, 0.55, 0]}>
        {/* Pant leg */}
        <mesh position={[0, -0.22, 0]} castShadow>
          <boxGeometry args={[0.16, 0.44, 0.16]} />
          <meshToonMaterial color="#505A69" />
        </mesh>
        {/* Sneaker */}
        <mesh position={[0, -0.48, -0.04]}>
          <boxGeometry args={[0.17, 0.12, 0.26]} />
          <meshToonMaterial color="#FAF5EE" />
        </mesh>
      </group>

      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.32, 1.05, 0]}>
        <mesh position={[0, -0.24, 0]}>
          <boxGeometry args={[0.13, 0.46, 0.13]} />
          <meshToonMaterial color="#8EAAB3" />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.5, 0]}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshToonMaterial color="#F8D3B8" />
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef} position={[0.32, 1.05, 0]}>
        <mesh position={[0, -0.24, 0]}>
          <boxGeometry args={[0.13, 0.46, 0.13]} />
          <meshToonMaterial color="#8EAAB3" />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.5, 0]}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshToonMaterial color="#F8D3B8" />
        </mesh>
      </group>
    </group>
  );
}
