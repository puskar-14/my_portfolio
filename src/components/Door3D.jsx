import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { soundManager } from '../utils/audio';

export function Door3D({
  door,
  isOpen = false,
  isHovered = false,
  onHover,
  onSelect,
  hallwayWidth = 4.2
}) {
  const doorHingeRef = useRef();
  const [internalHover, setInternalHover] = useState(false);

  const activeHover = isHovered || internalHover;

  // Position and orientation based on which wall
  const isLeft = door.side === 'left';
  const isRight = door.side === 'right';

  let posX = 0;
  let rotY = 0;

  if (isLeft) {
    posX = -hallwayWidth / 2 + 0.08;
    rotY = Math.PI / 2; // Facing right into the corridor
  } else if (isRight) {
    posX = hallwayWidth / 2 - 0.08;
    rotY = -Math.PI / 2; // Facing left into the corridor
  } else {
    // End wall
    posX = 0;
    rotY = 0; // Facing forward down the hall
  }

  useFrame((_, delta) => {
    if (!doorHingeRef.current) return;

    // Smooth door swing rotation on hinge
    let targetAngle = 0;
    if (isOpen) {
      targetAngle = isLeft ? -Math.PI / 2.1 : isRight ? Math.PI / 2.1 : -Math.PI / 2.2;
    }
    doorHingeRef.current.rotation.y = THREE.MathUtils.lerp(
      doorHingeRef.current.rotation.y,
      targetAngle,
      delta * 4.5
    );
  });

  const handlePointerEnter = (e) => {
    e.stopPropagation();
    setInternalHover(true);
    if (onHover) onHover(door.id);
    soundManager.playHover();
  };

  const handlePointerLeave = (e) => {
    e.stopPropagation();
    setInternalHover(false);
    if (onHover) onHover(null);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    soundManager.playDoorOpen();
    if (onSelect) onSelect(door.id);
  };

  return (
    <group position={[posX, 0, door.zPos]} rotation={[0, rotY, 0]}>
      {/* Warm Ambient Glow / Spotlight around Door */}
      <pointLight
        position={[0, 2.5, 0.9]}
        color={door.color}
        intensity={activeHover ? 2.2 : 0.8}
        distance={4.5}
      />

      {/* Welcome Mat / Carpet Patch outside door */}
      <mesh position={[0, 0.015, 0.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.5, 0.9]} />
        <meshBasicMaterial
          color={activeHover ? door.color : '#E8DFD3'}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Door Frame Outer (Ivory / Warm Wood) */}
      <mesh position={[0, 1.8, 0]}>
        <boxGeometry args={[1.8, 3.4, 0.22]} />
        <meshToonMaterial color="#EFE7DA" />
      </mesh>

      {/* Door Frame Inner Opening Cutout Effect (Wall recessed depth) */}
      <mesh position={[0, 1.7, -0.05]}>
        <boxGeometry args={[1.42, 3.12, 0.18]} />
        <meshBasicMaterial color="#362E28" />
      </mesh>

      {/* Door Leaf on Hinge (Left edge hinge) */}
      <group
        ref={doorHingeRef}
        position={[-0.68, 0.16, 0.02]}
        onClick={handleClick}
        onPointerOver={handlePointerEnter}
        onPointerOut={handlePointerLeave}
      >
        {/* The Door Slab */}
        <mesh position={[0.68, 1.5, 0]} castShadow>
          <boxGeometry args={[1.36, 3.0, 0.1]} />
          <meshToonMaterial
            color={activeHover ? door.color : door.color}
            emissive={activeHover ? door.color : '#000000'}
            emissiveIntensity={activeHover ? 0.25 : 0}
          />
        </mesh>

        {/* Upper Inset Panel */}
        <mesh position={[0.68, 2.2, 0.055]}>
          <boxGeometry args={[0.95, 1.1, 0.02]} />
          <meshToonMaterial color={door.badgeBg || '#FFFFFF'} />
        </mesh>

        {/* Lower Inset Panel */}
        <mesh position={[0.68, 0.95, 0.055]}>
          <boxGeometry args={[0.95, 0.95, 0.02]} />
          <meshToonMaterial color={door.badgeBg || '#FFFFFF'} />
        </mesh>

        {/* Brass Doorknob */}
        <group position={[1.22, 1.45, 0.08]}>
          {/* Knob base plate */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.02, 12]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Knob handle */}
          <mesh position={[0, 0, 0.04]}>
            <sphereGeometry args={[0.042, 12, 12]} />
            <meshStandardMaterial color="#E6C35C" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>

        {/* Door Number Plaque on the door slab */}
        <group position={[0.68, 2.45, 0.068]}>
          <mesh>
            <planeGeometry args={[0.34, 0.18]} />
            <meshBasicMaterial color="#FAF5EE" />
          </mesh>
          <Text
            position={[0, 0, 0.01]}
            fontSize={0.09}
            color="#3C3630"
            anchorX="center"
            anchorY="middle"
          >
            {door.number}
          </Text>
        </group>
      </group>

      {/* Hanging Carved Signboard Above Door */}
      <group position={[0, 3.65, 0.15]}>
        {/* Support chains / hooks */}
        <mesh position={[-0.55, 0.22, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.35, 6]} />
          <meshBasicMaterial color="#5A524A" />
        </mesh>
        <mesh position={[0.55, 0.22, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.35, 6]} />
          <meshBasicMaterial color="#5A524A" />
        </mesh>

        {/* Wooden Board */}
        <mesh castShadow>
          <boxGeometry args={[1.5, 0.38, 0.06]} />
          <meshToonMaterial color="#FDFBF7" />
        </mesh>

        {/* Board Outline Accent */}
        <mesh position={[0, 0, 0.032]}>
          <planeGeometry args={[1.42, 0.32]} />
          <meshBasicMaterial color={activeHover ? door.badgeBg : '#F4EFE6'} />
        </mesh>

        {/* Door Title Text */}
        <Text
          position={[0, 0.02, 0.045]}
          fontSize={0.13}
          color={door.textAccent || '#3C3630'}
          anchorX="center"
          anchorY="middle"
        >
          {door.title.toUpperCase()}
        </Text>
      </group>

      {/* Decorative Wall Sconce Lamp above sign */}
      <group position={[0, 4.15, 0.25]}>
        <mesh>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshBasicMaterial color="#FFF7DE" />
        </mesh>
        <mesh position={[0, -0.06, 0]}>
          <cylinderGeometry args={[0.12, 0.06, 0.08, 12]} />
          <meshToonMaterial color="#6E6258" />
        </mesh>
      </group>
    </group>
  );
}
