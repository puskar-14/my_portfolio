import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Potted Plant with Pastel Monstera Leaves
export function PottedPlant({ position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Terracotta / Pastel Clay Pot */}
      <mesh position={[0, 0.28, 0]} castShadow>
        <cylinderGeometry args={[0.26, 0.18, 0.52, 16]} />
        <meshToonMaterial color="#E8A88E" />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.52, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.05, 16]} />
        <meshToonMaterial color="#5E4C3E" />
      </mesh>
      {/* Plant Leaves */}
      <group position={[0, 0.55, 0]}>
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <mesh
              key={i}
              position={[Math.cos(rad) * 0.15, 0.15 + (i % 2) * 0.08, Math.sin(rad) * 0.15]}
              rotation={[0.35 + (i % 3) * 0.1, rad, 0.2]}
            >
              <sphereGeometry args={[0.18, 8, 8]} />
              <meshToonMaterial color={i % 2 === 0 ? '#98D8AA' : '#B5EAD7'} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

// Bookshelf with Pastel Books
export function Bookshelf({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const bookColors = ['#D6E6FF', '#E8DDFF', '#FFE5D4', '#D4F4DD', '#FFDFE8', '#FDE68A', '#CBD5E1'];

  return (
    <group position={position} rotation={rotation}>
      {/* Shelf Body */}
      <mesh position={[0, 1.3, 0]} castShadow>
        <boxGeometry args={[1.1, 2.5, 0.35]} />
        <meshToonMaterial color="#DFCFC0" />
      </mesh>
      {/* Inner Cavity */}
      <mesh position={[0, 1.3, 0.04]}>
        <boxGeometry args={[0.96, 2.36, 0.3]} />
        <meshBasicMaterial color="#CFC0B0" />
      </mesh>
      {/* Shelves Dividers */}
      {[-0.5, 0, 0.5].map((y, idx) => (
        <mesh key={idx} position={[0, 1.3 + y, 0.06]}>
          <boxGeometry args={[0.96, 0.05, 0.28]} />
          <meshToonMaterial color="#BEAF9F" />
        </mesh>
      ))}
      {/* Books on Shelves */}
      {[-0.2, 0.3, 0.8].map((y, rowIdx) => (
        <group key={rowIdx} position={[-0.38, 1.3 + y + 0.16, 0.08]}>
          {[0, 1, 2, 3, 4, 5].map((b, i) => (
            <mesh key={i} position={[i * 0.12, 0, 0]}>
              <boxGeometry args={[0.08, 0.26 + (i % 3) * 0.06, 0.2]} />
              <meshToonMaterial color={bookColors[(rowIdx * 3 + i) % bookColors.length]} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

// Framed Wall Art with Soft Pastel Canvas
export function WallFrame({ position = [0, 0, 0], rotation = [0, 0, 0], title = '', color = '#FFE5D4' }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Wooden Frame */}
      <mesh>
        <boxGeometry args={[0.9, 1.1, 0.06]} />
        <meshToonMaterial color="#6B5C4E" />
      </mesh>
      {/* Matting */}
      <mesh position={[0, 0, 0.032]}>
        <planeGeometry args={[0.76, 0.96]} />
        <meshBasicMaterial color="#FAF5EE" />
      </mesh>
      {/* Artwork Canvas */}
      <mesh position={[0, 0, 0.035]}>
        <planeGeometry args={[0.62, 0.8]} />
        <meshToonMaterial color={color} />
      </mesh>
    </group>
  );
}

// Hanging Pastel Lantern / Pendant Lamp
export function HangingLamp({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* Cord */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 1.6, 6]} />
        <meshBasicMaterial color="#554B42" />
      </mesh>
      {/* Lamp Shade */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.35, 0.3, 16, 1, true]} />
        <meshToonMaterial color="#FAF2E3" side={THREE.DoubleSide} />
      </mesh>
      {/* Glowing Warm Bulb */}
      <mesh position={[0, -0.05, 0]}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshBasicMaterial color="#FFF1C2" />
      </mesh>
      {/* Soft warm light down the hallway */}
      <pointLight position={[0, -0.2, 0]} color="#FFE6B3" intensity={1.1} distance={6} />
    </group>
  );
}

// Hallway Window with Sunlight Angle
export function SunlightWindow({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Window Frame */}
      <mesh>
        <boxGeometry args={[1.4, 2.2, 0.1]} />
        <meshToonMaterial color="#EAE1D5" />
      </mesh>
      {/* Window Glass Pane with Warm Sky Glow */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[1.2, 2.0]} />
        <meshBasicMaterial color="#EBF4FE" />
      </mesh>
      {/* Window Mullions (crossbars) */}
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[0.04, 2.0, 0.04]} />
        <meshToonMaterial color="#D8CABE" />
      </mesh>
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[1.2, 0.04, 0.04]} />
        <meshToonMaterial color="#D8CABE" />
      </mesh>
      {/* Sunlight glow into the hallway */}
      <spotLight
        position={[0, 0.5, 0.5]}
        target-position={[0, -2, 2]}
        color="#FFF6D8"
        intensity={2.0}
        angle={0.65}
        penumbra={0.6}
        distance={8}
      />
    </group>
  );
}

// Floating Dust Motes / Sunlight Particles
export function FloatingDustMotes({ count = 120 }) {
  const pointsRef = useRef();

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sc = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 4.0; // X across hallway
      pos[i * 3 + 1] = 0.5 + Math.random() * 3.5;    // Y height
      pos[i * 3 + 2] = -Math.random() * 40.0;        // Z down hallway
      sc[i] = 0.02 + Math.random() * 0.03;
    }
    return [pos, sc];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime() * 0.25;
    const posArr = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      // gentle drifting motion
      posArr[i * 3 + 1] += Math.sin(time + i) * 0.002;
      posArr[i * 3 + 0] += Math.cos(time + i * 0.5) * 0.001;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#FFEAA7"
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
