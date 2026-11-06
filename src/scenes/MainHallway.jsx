import React from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Character } from '../components/Character';
import { Door3D } from '../components/Door3D';
import {
  PottedPlant,
  Bookshelf,
  FloatingWallShelf,
  WallWainscotPanel,
  ArchitecturalPilaster,
  WallSconce,
  PastelBuntingGarland,
  RoundGildedMirror,
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
        let targetCamZ = door.side === 'end' ? door.zPos + 2.4 : door.zPos + 1.2;

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
      <ambientLight intensity={1.35} color="#FFFBF0" />
      <directionalLight
        position={[4, 9, 5]}
        intensity={1.45}
        color="#FFE5B4"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <hemisphereLight skyColor="#FFE8D6" groundColor="#C4B5FD" intensity={0.75} />

      {/* Hallway Floor (Rich Warm Golden Honey-Oak Parquet) */}
      <mesh position={[0, 0, -18]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[hallwayWidth, hallwayLength]} />
        <meshToonMaterial color="#F5C582" />
      </mesh>

      {/* Subtle Wooden Floor Plank Inlay Seams */}
      {[-1.5, -0.5, 0.5, 1.5].map((x, idx) => (
        <mesh key={`plank-${idx}`} position={[x, 0.003, -18]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.02, hallwayLength]} />
          <meshBasicMaterial color="#DE9E4E" />
        </mesh>
      ))}

      {/* Hand-Drawn Woven Runner Carpet down Hallway (Vibrant Strawberry-Coral with Gold Trim) */}
      <mesh position={[0, 0.008, -18]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.9, hallwayLength - 2]} />
        <meshToonMaterial color="#FF758F" />
      </mesh>
      {/* Inner Crisp White Border Left & Right */}
      <mesh position={[-0.88, 0.01, -18]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.04, hallwayLength - 2]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0.88, 0.01, -18]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.04, hallwayLength - 2]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      {/* Outer Bright Sunny Gold Border Left & Right */}
      <mesh position={[-0.95, 0.012, -18]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.08, hallwayLength - 2]} />
        <meshToonMaterial color="#FFD166" />
      </mesh>
      <mesh position={[0.95, 0.012, -18]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.08, hallwayLength - 2]} />
        <meshToonMaterial color="#FFD166" />
      </mesh>

      {/* Carpet Gold Fringe Ends */}
      <mesh position={[0, 0.012, 1.05]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.9, 0.1]} />
        <meshToonMaterial color="#FFE6A7" />
      </mesh>
      <mesh position={[0, 0.012, -37.05]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.9, 0.1]} />
        <meshToonMaterial color="#FFE6A7" />
      </mesh>

      {/* Hallway Ceiling with Soft Cream Warmth */}
      <mesh position={[0, 4.6, -18]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[hallwayWidth, hallwayLength]} />
        <meshToonMaterial color="#FFFBF5" />
      </mesh>

      {/* Ceiling Wooden Beams (Rich Honey Caramel Tone) */}
      {[-2, -7, -12, -17, -22, -27, -32, -37].map((z, idx) => (
        <group key={idx} position={[0, 4.5, z]}>
          <mesh>
            <boxGeometry args={[hallwayWidth, 0.22, 0.24]} />
            <meshToonMaterial color="#E0A36A" />
          </mesh>
          {/* Hanging pendant lamp on alternating beams */}
          {idx % 2 === 1 && <HangingLamp position={[0, -0.6, 0]} />}
        </group>
      ))}

      {/* ========================================================= */}
      {/* LEFT WALL: ATTRACTIVE SUNSET PEACH & PERIWINKLE LAVENDER */}
      {/* ========================================================= */}
      {/* Left Lower Wainscoting (Dreamy Periwinkle Lavender) */}
      <mesh position={[-hallwayWidth / 2, 0.75, -18]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[hallwayLength, 1.5]} />
        <meshToonMaterial color="#C4B5FD" />
      </mesh>
      {/* Left Upper Wall (Luscious Sunset Pastel Peach) */}
      <mesh position={[-hallwayWidth / 2, 3.05, -18]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[hallwayLength, 3.1]} />
        <meshToonMaterial color="#FFDECB" />
      </mesh>
      {/* Left Chair Rail Moulding (Crisp White & Gold Trim at y=1.5) */}
      <mesh position={[-hallwayWidth / 2 + 0.03, 1.5, -18]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[hallwayLength, 0.09, 0.06]} />
        <meshToonMaterial color="#FFFFFF" />
      </mesh>
      {/* Left Chair Rail Gold Accent Line */}
      <mesh position={[-hallwayWidth / 2 + 0.04, 1.46, -18]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[hallwayLength, 0.02, 0.05]} />
        <meshToonMaterial color="#FFD166" />
      </mesh>
      {/* Left Picture Rail Trim at y=3.9 */}
      <mesh position={[-hallwayWidth / 2 + 0.02, 3.9, -18]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[hallwayLength, 0.05, 0.04]} />
        <meshToonMaterial color="#FFFFFF" />
      </mesh>
      {/* Left Wall Baseboard Trim (Crisp Clean White) */}
      <mesh position={[-hallwayWidth / 2 + 0.04, 0.14, -18]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[hallwayLength, 0.28, 0.08]} />
        <meshToonMaterial color="#FFFFFF" />
      </mesh>

      {/* ========================================================= */}
      {/* RIGHT WALL: ATTRACTIVE SUNSET PEACH & PERIWINKLE LAVENDER */}
      {/* ========================================================= */}
      {/* Right Lower Wainscoting (Dreamy Periwinkle Lavender) */}
      <mesh position={[hallwayWidth / 2, 0.75, -18]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[hallwayLength, 1.5]} />
        <meshToonMaterial color="#C4B5FD" />
      </mesh>
      {/* Right Upper Wall (Luscious Sunset Pastel Peach) */}
      <mesh position={[hallwayWidth / 2, 3.05, -18]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[hallwayLength, 3.1]} />
        <meshToonMaterial color="#FFDECB" />
      </mesh>
      {/* Right Chair Rail Moulding (Crisp White at y=1.5) */}
      <mesh position={[hallwayWidth / 2 - 0.03, 1.5, -18]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[hallwayLength, 0.09, 0.06]} />
        <meshToonMaterial color="#FFFFFF" />
      </mesh>
      {/* Right Chair Rail Gold Accent Line */}
      <mesh position={[hallwayWidth / 2 - 0.04, 1.46, -18]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[hallwayLength, 0.02, 0.05]} />
        <meshToonMaterial color="#FFD166" />
      </mesh>
      {/* Right Picture Rail Trim at y=3.9 */}
      <mesh position={[hallwayWidth / 2 - 0.02, 3.9, -18]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[hallwayLength, 0.05, 0.04]} />
        <meshToonMaterial color="#FFFFFF" />
      </mesh>
      {/* Right Wall Baseboard Trim (Crisp Clean White) */}
      <mesh position={[hallwayWidth / 2 - 0.04, 0.14, -18]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[hallwayLength, 0.28, 0.08]} />
        <meshToonMaterial color="#FFFFFF" />
      </mesh>

      {/* ========================================================= */}
      {/* END WALL: LUMINOUS GOLDEN ACCENT HORIZON                  */}
      {/* ========================================================= */}
      {/* End Lower Wainscot */}
      <mesh position={[0, 0.75, -36.6]} rotation={[0, 0, 0]}>
        <planeGeometry args={[hallwayWidth, 1.5]} />
        <meshToonMaterial color="#C4B5FD" />
      </mesh>
      {/* End Upper Accent Wall (Radiant Warm Amber Champagne) */}
      <mesh position={[0, 3.05, -36.6]} rotation={[0, 0, 0]}>
        <planeGeometry args={[hallwayWidth, 3.1]} />
        <meshToonMaterial color="#FFE8A3" />
      </mesh>
      {/* End Chair Rail Moulding */}
      <mesh position={[0, 1.5, -36.57]}>
        <boxGeometry args={[hallwayWidth, 0.09, 0.06]} />
        <meshToonMaterial color="#FFFFFF" />
      </mesh>
      {/* End Baseboard */}
      <mesh position={[0, 0.14, -36.56]}>
        <boxGeometry args={[hallwayWidth, 0.28, 0.08]} />
        <meshToonMaterial color="#FFFFFF" />
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

      {/* ========================================================= */}
      {/* ARCHITECTURAL WALL DESIGNS: PILASTERS & WAINSCOT PANELS   */}
      {/* ========================================================= */}
      {/* Classical Architectural Wall Pilasters along both sides */}
      {[0, -5, -10, -15, -20, -25, -30, -35].map((z, idx) => (
        <group key={`pilasters-${idx}`}>
          {/* Left Wall Pilaster */}
          <ArchitecturalPilaster position={[-hallwayWidth / 2 + 0.02, 0, z]} rotation={[0, Math.PI / 2, 0]} />
          {/* Right Wall Pilaster */}
          <ArchitecturalPilaster position={[hallwayWidth / 2 - 0.02, 0, z]} rotation={[0, -Math.PI / 2, 0]} />
        </group>
      ))}

      {/* Raised Wainscoting Boiserie Panels on Lower Lavender Wall */}
      {/* Left Wall Panels */}
      {[-1.5, -9, -13.5, -21.5, -26.5, -34].map((z, idx) => (
        <WallWainscotPanel
          key={`wainscot-left-${idx}`}
          position={[-hallwayWidth / 2 + 0.02, 0.75, z]}
          rotation={[0, Math.PI / 2, 0]}
        />
      ))}
      {/* Right Wall Panels */}
      {[-1.5, -4.5, -15, -19.5, -27.5, -34].map((z, idx) => (
        <WallWainscotPanel
          key={`wainscot-right-${idx}`}
          position={[hallwayWidth / 2 - 0.02, 0.75, z]}
          rotation={[0, -Math.PI / 2, 0]}
        />
      ))}
      {/* End Wall Panels flanking The Next Chapter Door */}
      <WallWainscotPanel position={[-1.4, 0.75, -36.56]} rotation={[0, 0, 0]} />
      <WallWainscotPanel position={[1.4, 0.75, -36.56]} rotation={[0, 0, 0]} />

      {/* Ornamental Brass Wall Sconces with Warm Tulip Shades */}
      {/* Left Wall Sconces */}
      {[-2.5, -8.5, -16.8, -22.8, -28.8].map((z, idx) => (
        <WallSconce
          key={`sconce-left-${idx}`}
          position={[-hallwayWidth / 2 + 0.02, 2.65, z]}
          rotation={[0, Math.PI / 2, 0]}
        />
      ))}
      {/* Right Wall Sconces */}
      {[-2.5, -8.5, -14.2, -22.8, -28.5].map((z, idx) => (
        <WallSconce
          key={`sconce-right-${idx}`}
          position={[hallwayWidth / 2 - 0.02, 2.65, z]}
          rotation={[0, -Math.PI / 2, 0]}
        />
      ))}

      {/* Whimsical Storybook Pastel Bunting Garlands Overhead */}
      {[-4.5, -14.5, -24.5, -34.5].map((z, idx) => (
        <PastelBuntingGarland key={`bunting-${idx}`} position={[0, 0, z]} />
      ))}

      {/* Round Gilded Baroque Sunburst Mirrors */}
      <RoundGildedMirror position={[hallwayWidth / 2 - 0.02, 2.65, -16.5]} rotation={[0, -Math.PI / 2, 0]} />
      <RoundGildedMirror position={[-hallwayWidth / 2 + 0.02, 2.65, -22.5]} rotation={[0, Math.PI / 2, 0]} />

      {/* Floating Wall Shelves with Succulents, Alarm Clocks & Trinkets */}
      <FloatingWallShelf position={[-hallwayWidth / 2 + 0.03, 1.85, -11]} rotation={[0, Math.PI / 2, 0]} />
      <FloatingWallShelf position={[hallwayWidth / 2 - 0.03, 1.85, -4.2]} rotation={[0, -Math.PI / 2, 0]} />
      <FloatingWallShelf position={[hallwayWidth / 2 - 0.03, 1.85, -29]} rotation={[0, -Math.PI / 2, 0]} />

      {/* Cozy Hallway Furniture & Richly Decorated Bookshelves */}
      <Bookshelf position={[-1.9, 0, -1]} rotation={[0, Math.PI / 2, 0]} />
      <Bookshelf position={[1.9, 0, -18]} rotation={[0, -Math.PI / 2, 0]} />
      <Bookshelf position={[-1.9, 0, -24]} rotation={[0, Math.PI / 2, 0]} />

      {/* Potted Plants near doorways */}
      <PottedPlant position={[1.8, 0, -4]} scale={1.1} />
      <PottedPlant position={[-1.8, 0, -10]} scale={0.9} />
      <PottedPlant position={[1.8, 0, -14]} scale={1.0} />
      <PottedPlant position={[-1.8, 0, -21]} scale={1.15} />
      <PottedPlant position={[1.8, 0, -28]} scale={1.05} />
      <PottedPlant position={[-1.5, 0, -35.8]} scale={1.15} />
      <PottedPlant position={[1.5, 0, -35.8]} scale={1.15} />

      {/* Framed Wall Art with Hand-Drawn Motifs between doors */}
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
