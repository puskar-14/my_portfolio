import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Character } from '../components/Character';
import { Door3D } from '../components/Door3D';
import {
  PottedPlant,
  Bookshelf,
  WallFrame,
  HangingLamp,
  SunlightWindow,
  FloatingDustMotes
} from '../components/HallwayProps';
import { doorsData } from '../data/doors';

export function MainHallway({
  characterPos,
  targetPos,
  isWalking,
  facing,
  hoveredDoor,
  setHoveredDoor,
  selectedDoor,
  onSelectDoor,
  isEnteringRoom = false
}) {
  const { camera } = useThree();
  const hallwayWidth = 4.4;
  const hallwayLength = 46;

  // Camera smooth follow logic
  useFrame((_, delta) => {
    if (isEnteringRoom && selectedDoor) {
      // Find door position
      const door = doorsData.find(d => d.id === selectedDoor);
      if (door) {
        let targetCamX = door.side === 'left' ? -1.0 : door.side === 'right' ? 1.0 : 0;
        let targetCamY = 1.8;
        let targetCamZ = door.zPos + 1.2;

        camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamX, delta * 3.5);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, delta * 3.5);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, delta * 3.5);

        const lookTarget = new THREE.Vector3(
          door.side === 'left' ? -2.2 : door.side === 'right' ? 2.2 : 0,
          1.8,
          door.zPos
        );
        camera.lookAt(lookTarget);
      }
    } else {
      // Third-person cozy trailing camera
      const targetCamX = characterPos[0] * 0.35;
      const targetCamY = 2.4;
      const targetCamZ = characterPos[2] + 4.8;

      camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamX, delta * 5);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, delta * 5);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, delta * 5);

      const lookTarget = new THREE.Vector3(
        characterPos[0] * 0.15,
        1.5,
        characterPos[2] - 3.2
      );
      camera.lookAt(lookTarget);
    }
  });

  return (
    <>
      {/* Warm Ambient Sunlight & Fill Lights */}
      <ambientLight intensity={1.1} color="#FFFBF2" />
      <directionalLight
        position={[3, 8, 4]}
        intensity={1.2}
        color="#FFF5E0"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <hemisphereLight skyColor="#FAF5EE" groundColor="#E8DFD0" intensity={0.6} />

      {/* Hallway Floor (Warm Wood Plank Tone) */}
      <mesh position={[0, 0, -18]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[hallwayWidth, hallwayLength]} />
        <meshToonMaterial color="#EBE1D2" />
      </mesh>

      {/* Hand-Drawn Style Runner Carpet down hallway */}
      <mesh position={[0, 0.008, -18]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.9, hallwayLength - 2]} />
        <meshToonMaterial color="#F6ECE1" />
      </mesh>
      {/* Carpet Border Left */}
      <mesh position={[-0.95, 0.01, -18]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.06, hallwayLength - 2]} />
        <meshBasicMaterial color="#DEC2A8" />
      </mesh>
      {/* Carpet Border Right */}
      <mesh position={[0.95, 0.01, -18]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.06, hallwayLength - 2]} />
        <meshBasicMaterial color="#DEC2A8" />
      </mesh>

      {/* Hallway Ceiling with Cream Tone */}
      <mesh position={[0, 4.6, -18]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[hallwayWidth, hallwayLength]} />
        <meshToonMaterial color="#FCFAF6" />
      </mesh>

      {/* Ceiling Wooden Beams */}
      {[-2, -7, -12, -17, -22, -27, -32, -37].map((z, idx) => (
        <group key={idx} position={[0, 4.5, z]}>
          <mesh>
            <boxGeometry args={[hallwayWidth, 0.22, 0.24]} />
            <meshToonMaterial color="#E4D5C3" />
          </mesh>
          {/* Hanging pendant lamp on alternating beams */}
          {idx % 2 === 1 && <HangingLamp position={[0, -0.6, 0]} />}
        </group>
      ))}

      {/* Left Wall (Warm Cream / Ivory) */}
      <mesh position={[-hallwayWidth / 2, 2.3, -18]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[hallwayLength, 4.6]} />
        <meshToonMaterial color="#F8F3EA" />
      </mesh>
      {/* Left Wall Baseboard Trim */}
      <mesh position={[-hallwayWidth / 2 + 0.04, 0.15, -18]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[hallwayLength, 0.3, 0.08]} />
        <meshToonMaterial color="#DFD4C4" />
      </mesh>

      {/* Right Wall (Warm Cream / Ivory) */}
      <mesh position={[hallwayWidth / 2, 2.3, -18]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[hallwayLength, 4.6]} />
        <meshToonMaterial color="#F8F3EA" />
      </mesh>
      {/* Right Wall Baseboard Trim */}
      <mesh position={[hallwayWidth / 2 - 0.04, 0.15, -18]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[hallwayLength, 0.3, 0.08]} />
        <meshToonMaterial color="#DFD4C4" />
      </mesh>

      {/* End Wall of Hallway */}
      <mesh position={[0, 2.3, -38]} rotation={[0, 0, 0]}>
        <planeGeometry args={[hallwayWidth, 4.6]} />
        <meshToonMaterial color="#F4EDE2" />
      </mesh>

      {/* The 5 Main Doors + The Next Chapter Door */}
      {doorsData.map((door) => (
        <Door3D
          key={door.id}
          door={door}
          isOpen={selectedDoor === door.id}
          isHovered={hoveredDoor === door.id}
          onHover={setHoveredDoor}
          onSelect={onSelectDoor}
          hallwayWidth={hallwayWidth}
        />
      ))}

      {/* Cozy Hallway Decorative Elements & Furniture */}
      {/* Bookshelves in alcoves */}
      <Bookshelf position={[-1.9, 0, -1] } rotation={[0, Math.PI / 2, 0]} />
      <Bookshelf position={[1.9, 0, -18]} rotation={[0, -Math.PI / 2, 0]} />
      <Bookshelf position={[-1.9, 0, -24]} rotation={[0, Math.PI / 2, 0]} />

      {/* Potted Plants near doorways */}
      <PottedPlant position={[1.8, 0, -4]} scale={1.1} />
      <PottedPlant position={[-1.8, 0, -10]} scale={0.9} />
      <PottedPlant position={[1.8, 0, -14]} scale={1.0} />
      <PottedPlant position={[-1.8, 0, -21]} scale={1.15} />
      <PottedPlant position={[1.8, 0, -28]} scale={1.05} />
      <PottedPlant position={[-1.4, 0, -36.5]} scale={1.2} />
      <PottedPlant position={[1.4, 0, -36.5]} scale={1.2} />

      {/* Framed Wall Art between doors */}
      <WallFrame position={[2.15, 2.5, -7]} rotation={[0, -Math.PI / 2, 0]} title="Code" color="#C2DBFE" />
      <WallFrame position={[-2.15, 2.5, -14]} rotation={[0, Math.PI / 2, 0]} title="Create" color="#E0D4FC" />
      <WallFrame position={[2.15, 2.5, -20]} rotation={[0, -Math.PI / 2, 0]} title="Ship" color="#FFDBC2" />
      <WallFrame position={[-2.15, 2.5, -27]} rotation={[0, Math.PI / 2, 0]} title="Learn" color="#C4EED0" />
      <WallFrame position={[2.15, 2.5, -33]} rotation={[0, -Math.PI / 2, 0]} title="Connect" color="#FFD4E2" />

      {/* Windows with Sunlight along corridor */}
      <SunlightWindow position={[-2.18, 2.7, -3.5]} rotation={[0, Math.PI / 2, 0]} />
      <SunlightWindow position={[2.18, 2.7, -9.5]} rotation={[0, -Math.PI / 2, 0]} />
      <SunlightWindow position={[-2.18, 2.7, -15.5]} rotation={[0, Math.PI / 2, 0]} />
      <SunlightWindow position={[2.18, 2.7, -21.5]} rotation={[0, -Math.PI / 2, 0]} />
      <SunlightWindow position={[-2.18, 2.7, -27.5]} rotation={[0, Math.PI / 2, 0]} />

      {/* Floating Sunlight Dust Motes for Atmosphere */}
      <FloatingDustMotes count={140} />

      {/* The Animated Developer Character with Backpack */}
      <Character
        position={characterPos}
        isWalking={isWalking}
        facing={facing}
      />
    </>
  );
}
