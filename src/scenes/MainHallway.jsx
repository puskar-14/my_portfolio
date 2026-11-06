import React from 'react';
import { useFrame } from '@react-three/fiber';
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
  isWalking,
  facing,
  hoveredDoor,
  setHoveredDoor,
  selectedDoor,
  onSelectDoor,
  isEnteringRoom = false
}) {
  const hallwayWidth = 4.4;
  const hallwayLength = 46;

  // Camera smooth follow logic
  useFrame((state, delta) => {
    const { camera } = state;
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
      {/* Warm Ambient Sunlight & Cozy Fill Lights */}
      <ambientLight intensity={1.25} color="#FFF8EB" />
      <directionalLight
        position={[4, 9, 5]}
        intensity={1.35}
        color="#FFE9C7"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <hemisphereLight skyColor="#FAF2E6" groundColor="#C8D8CE" intensity={0.7} />

      {/* Hallway Floor (Rich Warm Honey-Oak Parquet) */}
      <mesh position={[0, 0, -18]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[hallwayWidth, hallwayLength]} />
        <meshToonMaterial color="#DECCA8" />
      </mesh>

      {/* Subtle Wooden Floor Plank Inlay Seams */}
      {[-1.5, -0.5, 0.5, 1.5].map((x, idx) => (
        <mesh key={`plank-${idx}`} position={[x, 0.003, -18]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.02, hallwayLength]} />
          <meshBasicMaterial color="#CEB892" />
        </mesh>
      ))}

      {/* Hand-Drawn Woven Runner Carpet down Hallway (Warm Apricot & Pastel Sage Trim) */}
      <mesh position={[0, 0.008, -18]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.9, hallwayLength - 2]} />
        <meshToonMaterial color="#F7D4BE" />
      </mesh>
      {/* Inner Cream Border Left & Right */}
      <mesh position={[-0.88, 0.01, -18]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.04, hallwayLength - 2]} />
        <meshBasicMaterial color="#FFF9F2" />
      </mesh>
      <mesh position={[0.88, 0.01, -18]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.04, hallwayLength - 2]} />
        <meshBasicMaterial color="#FFF9F2" />
      </mesh>
      {/* Outer Pastel Sage Border Left & Right */}
      <mesh position={[-0.95, 0.012, -18]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.08, hallwayLength - 2]} />
        <meshToonMaterial color="#799988" />
      </mesh>
      <mesh position={[0.95, 0.012, -18]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.08, hallwayLength - 2]} />
        <meshToonMaterial color="#799988" />
      </mesh>

      {/* Carpet Fringe Ends */}
      <mesh position={[0, 0.012, 1.05]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.9, 0.1]} />
        <meshToonMaterial color="#E8D5BC" />
      </mesh>
      <mesh position={[0, 0.012, -37.05]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.9, 0.1]} />
        <meshToonMaterial color="#E8D5BC" />
      </mesh>

      {/* Hallway Ceiling with Soft Cream Warmth */}
      <mesh position={[0, 4.6, -18]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[hallwayWidth, hallwayLength]} />
        <meshToonMaterial color="#FCF8F2" />
      </mesh>

      {/* Ceiling Wooden Beams (Warm Sandalwood Tone) */}
      {[-2, -7, -12, -17, -22, -27, -32, -37].map((z, idx) => (
        <group key={idx} position={[0, 4.5, z]}>
          <mesh>
            <boxGeometry args={[hallwayWidth, 0.22, 0.24]} />
            <meshToonMaterial color="#D5C3AE" />
          </mesh>
          {/* Hanging pendant lamp on alternating beams */}
          {idx % 2 === 1 && <HangingLamp position={[0, -0.6, 0]} />}
        </group>
      ))}

      {/* ========================================================= */}
      {/* LEFT WALL: TWO-TONE DECENT PASTEL THEME (SAGE & CREAM)    */}
      {/* ========================================================= */}
      {/* Left Lower Wainscoting (Soft Pastel French Sage) */}
      <mesh position={[-hallwayWidth / 2, 0.75, -18]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[hallwayLength, 1.5]} />
        <meshToonMaterial color="#CAD9CE" />
      </mesh>
      {/* Left Upper Wall (Warm French Antique Ivory) */}
      <mesh position={[-hallwayWidth / 2, 3.05, -18]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[hallwayLength, 3.1]} />
        <meshToonMaterial color="#FAF5EC" />
      </mesh>
      {/* Left Chair Rail Moulding (Decorative Trim at y=1.5) */}
      <mesh position={[-hallwayWidth / 2 + 0.03, 1.5, -18]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[hallwayLength, 0.09, 0.06]} />
        <meshToonMaterial color="#A4B9AB" />
      </mesh>
      {/* Left Picture Rail Trim at y=3.9 */}
      <mesh position={[-hallwayWidth / 2 + 0.02, 3.9, -18]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[hallwayLength, 0.05, 0.04]} />
        <meshToonMaterial color="#D5C5B2" />
      </mesh>
      {/* Left Wall Baseboard Trim */}
      <mesh position={[-hallwayWidth / 2 + 0.04, 0.14, -18]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[hallwayLength, 0.28, 0.08]} />
        <meshToonMaterial color="#BDAC99" />
      </mesh>

      {/* ========================================================= */}
      {/* RIGHT WALL: TWO-TONE DECENT PASTEL THEME (SAGE & CREAM)   */}
      {/* ========================================================= */}
      {/* Right Lower Wainscoting (Soft Pastel French Sage) */}
      <mesh position={[hallwayWidth / 2, 0.75, -18]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[hallwayLength, 1.5]} />
        <meshToonMaterial color="#CAD9CE" />
      </mesh>
      {/* Right Upper Wall (Warm French Antique Ivory) */}
      <mesh position={[hallwayWidth / 2, 3.05, -18]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[hallwayLength, 3.1]} />
        <meshToonMaterial color="#FAF5EC" />
      </mesh>
      {/* Right Chair Rail Moulding (Decorative Trim at y=1.5) */}
      <mesh position={[hallwayWidth / 2 - 0.03, 1.5, -18]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[hallwayLength, 0.09, 0.06]} />
        <meshToonMaterial color="#A4B9AB" />
      </mesh>
      {/* Right Picture Rail Trim at y=3.9 */}
      <mesh position={[hallwayWidth / 2 - 0.02, 3.9, -18]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[hallwayLength, 0.05, 0.04]} />
        <meshToonMaterial color="#D5C5B2" />
      </mesh>
      {/* Right Wall Baseboard Trim */}
      <mesh position={[hallwayWidth / 2 - 0.04, 0.14, -18]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[hallwayLength, 0.28, 0.08]} />
        <meshToonMaterial color="#BDAC99" />
      </mesh>

      {/* ========================================================= */}
      {/* END WALL: WARM HORIZON ACCENT WALL                        */}
      {/* ========================================================= */}
      {/* End Lower Wainscot */}
      <mesh position={[0, 0.75, -38]} rotation={[0, 0, 0]}>
        <planeGeometry args={[hallwayWidth, 1.5]} />
        <meshToonMaterial color="#CAD9CE" />
      </mesh>
      {/* End Upper Accent Wall (Warm Buttercream/Golden Ivory) */}
      <mesh position={[0, 3.05, -38]} rotation={[0, 0, 0]}>
        <planeGeometry args={[hallwayWidth, 3.1]} />
        <meshToonMaterial color="#FBF0D9" />
      </mesh>
      {/* End Chair Rail Moulding */}
      <mesh position={[0, 1.5, -37.97]}>
        <boxGeometry args={[hallwayWidth, 0.09, 0.06]} />
        <meshToonMaterial color="#A4B9AB" />
      </mesh>
      {/* End Baseboard */}
      <mesh position={[0, 0.14, -37.96]}>
        <boxGeometry args={[hallwayWidth, 0.28, 0.08]} />
        <meshToonMaterial color="#BDAC99" />
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
