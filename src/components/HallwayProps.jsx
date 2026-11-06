import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// =====================================================================
// 1. Potted Plant with Pastel Monstera & Trailing Leaves
// =====================================================================
export function PottedPlant({ position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Terracotta / Pastel Clay Pot */}
      <mesh position={[0, 0.28, 0]} castShadow>
        <cylinderGeometry args={[0.26, 0.18, 0.52, 16]} />
        <meshToonMaterial color="#E8A88E" />
      </mesh>
      {/* Pot Rim */}
      <mesh position={[0, 0.53, 0]}>
        <cylinderGeometry args={[0.28, 0.26, 0.06, 16]} />
        <meshToonMaterial color="#E8A88E" />
      </mesh>
      {/* Rich Dark Soil */}
      <mesh position={[0, 0.52, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.05, 16]} />
        <meshToonMaterial color="#5E4C3E" />
      </mesh>
      {/* Plant Leaves Fan */}
      <group position={[0, 0.55, 0]}>
        {[0, 55, 115, 175, 235, 295].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <mesh
              key={i}
              position={[Math.cos(rad) * 0.16, 0.16 + (i % 2) * 0.09, Math.sin(rad) * 0.16]}
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

// =====================================================================
// 2. Bookshelf Packed with Rich Interactive Storybook Props
// =====================================================================
export function Bookshelf({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const bookColors = ['#D6E6FF', '#E8DDFF', '#FFE5D4', '#D4F4DD', '#FFDFE8', '#FDE68A', '#CBD5E1'];

  return (
    <group position={position} rotation={rotation}>
      {/* Outer Wooden Bookshelf Body */}
      <mesh position={[0, 1.3, 0]} castShadow>
        <boxGeometry args={[1.1, 2.5, 0.35]} />
        <meshToonMaterial color="#DFCFC0" />
      </mesh>
      {/* Inner Cavity */}
      <mesh position={[0, 1.3, 0.04]}>
        <boxGeometry args={[0.96, 2.36, 0.3]} />
        <meshBasicMaterial color="#CFC0B0" />
      </mesh>
      {/* Horizontal Shelves Dividers */}
      {[-0.5, 0, 0.5].map((y, idx) => (
        <mesh key={idx} position={[0, 1.3 + y, 0.06]}>
          <boxGeometry args={[0.96, 0.05, 0.28]} />
          <meshToonMaterial color="#BEAF9F" />
        </mesh>
      ))}

      {/* ---------------------------------------------------- */}
      {/* TOP SURFACE OF BOOKCASE (y = 2.58)                  */}
      {/* ---------------------------------------------------- */}
      {/* 1. Trailing Potted Ivy Plant on Top Left */}
      <group position={[-0.32, 2.65, 0.06]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.08, 0.06, 0.12, 12]} />
          <meshToonMaterial color="#E8A88E" />
        </mesh>
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.02, 12]} />
          <meshToonMaterial color="#5E4C3E" />
        </mesh>
        {/* Plant Foliage & Vines Cascading down side */}
        <mesh position={[0, 0.12, 0]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshToonMaterial color="#86EFAC" />
        </mesh>
        {/* Vine Leaves Draping Down */}
        <mesh position={[-0.08, 0.02, 0.08]} rotation={[0.4, 0, 0.3]}>
          <boxGeometry args={[0.05, 0.12, 0.02]} />
          <meshToonMaterial color="#4ADE80" />
        </mesh>
        <mesh position={[-0.1, -0.1, 0.07]} rotation={[0.6, 0, 0.4]}>
          <boxGeometry args={[0.04, 0.14, 0.02]} />
          <meshToonMaterial color="#22C55E" />
        </mesh>
      </group>

      {/* 2. Golden Achievement Trophy Cup in Center */}
      <group position={[0.02, 2.68, 0.06]}>
        {/* Pedestal */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.07, 0.04, 12]} />
          <meshToonMaterial color="#3C3630" />
        </mesh>
        {/* Stem */}
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.02, 0.025, 0.06, 8]} />
          <meshToonMaterial color="#FFD166" />
        </mesh>
        {/* Cup Body */}
        <mesh position={[0, 0.12, 0]}>
          <cylinderGeometry args={[0.07, 0.03, 0.1, 12]} />
          <meshToonMaterial color="#FFD166" />
        </mesh>
        {/* Left & Right Trophy Handles */}
        <mesh position={[-0.065, 0.12, 0]}>
          <torusGeometry args={[0.03, 0.008, 6, 12]} />
          <meshToonMaterial color="#FFD166" />
        </mesh>
        <mesh position={[0.065, 0.12, 0]}>
          <torusGeometry args={[0.03, 0.008, 6, 12]} />
          <meshToonMaterial color="#FFD166" />
        </mesh>
        {/* Glowing star inside cup */}
        <mesh position={[0, 0.16, 0]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshBasicMaterial color="#FFF9C4" />
        </mesh>
      </group>

      {/* 3. Glowing Amethyst Mineral Crystal on Top Right */}
      <group position={[0.34, 2.66, 0.06]}>
        <mesh position={[0, 0.04, 0]} rotation={[0.2, 0.4, 0.1]}>
          <octahedronGeometry args={[0.065]} />
          <meshToonMaterial color="#C084FC" />
        </mesh>
        <mesh position={[0.05, 0.03, 0.02]} rotation={[-0.3, 0.2, 0.4]}>
          <octahedronGeometry args={[0.045]} />
          <meshToonMaterial color="#E879F9" />
        </mesh>
      </group>

      {/* ---------------------------------------------------- */}
      {/* TOP SHELF (y = 1.8)                                  */}
      {/* ---------------------------------------------------- */}
      {/* Standing Books on Left */}
      <group position={[-0.36, 1.95, 0.08]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[i * 0.09, 0, 0]}>
            <boxGeometry args={[0.07, 0.26 + (i % 2) * 0.04, 0.2]} />
            <meshToonMaterial color={bookColors[i % bookColors.length]} />
          </mesh>
        ))}
        {/* Tilted book leaning */}
        <mesh position={[0.28, -0.02, 0]} rotation={[0, 0, -0.28]}>
          <boxGeometry args={[0.07, 0.28, 0.2]} />
          <meshToonMaterial color="#F472B6" />
        </mesh>
      </group>

      {/* Antique Brass Hourglass in Center */}
      <group position={[0.1, 1.95, 0.08]}>
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.015, 12]} />
          <meshToonMaterial color="#D97706" />
        </mesh>
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.015, 12]} />
          <meshToonMaterial color="#D97706" />
        </mesh>
        {/* Glass bulbs */}
        <mesh position={[0, -0.04, 0]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial color="#E0F2FE" transparent opacity={0.65} />
        </mesh>
        <mesh position={[0, 0.04, 0]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial color="#E0F2FE" transparent opacity={0.65} />
        </mesh>
        {/* Sand */}
        <mesh position={[0, -0.05, 0]}>
          <coneGeometry args={[0.025, 0.03, 8]} />
          <meshToonMaterial color="#F59E0B" />
        </mesh>
      </group>

      {/* Cute Mascot Ducky / Porcelain Swan on Right */}
      <group position={[0.32, 1.93, 0.08]}>
        {/* Body */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.055, 8, 8]} />
          <meshToonMaterial color="#FDE047" />
        </mesh>
        {/* Head */}
        <mesh position={[0.03, 0.06, 0]}>
          <sphereGeometry args={[0.038, 8, 8]} />
          <meshToonMaterial color="#FDE047" />
        </mesh>
        {/* Beak */}
        <mesh position={[0.065, 0.055, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.016, 0.03, 6]} />
          <meshToonMaterial color="#FB923C" />
        </mesh>
      </group>

      {/* ---------------------------------------------------- */}
      {/* MIDDLE SHELF (y = 1.3)                               */}
      {/* ---------------------------------------------------- */}
      {/* Horizontal Stack of 3 Books on Left */}
      <group position={[-0.26, 1.4, 0.08]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.26, 0.045, 0.18]} />
          <meshToonMaterial color="#93C5FD" />
        </mesh>
        <mesh position={[0.01, 0.045, 0]} rotation={[0, 0.05, 0]}>
          <boxGeometry args={[0.24, 0.045, 0.17]} />
          <meshToonMaterial color="#F472B6" />
        </mesh>
        <mesh position={[-0.01, 0.09, 0]} rotation={[0, -0.04, 0]}>
          <boxGeometry args={[0.22, 0.045, 0.16]} />
          <meshToonMaterial color="#A7F3D0" />
        </mesh>
        {/* Paperweight gemstone on top */}
        <mesh position={[0, 0.14, 0]}>
          <octahedronGeometry args={[0.03]} />
          <meshToonMaterial color="#FDE047" />
        </mesh>
      </group>

      {/* Standing books in middle */}
      <group position={[0.05, 1.46, 0.08]}>
        {[0, 1].map((i) => (
          <mesh key={i} position={[i * 0.08, 0, 0]}>
            <boxGeometry args={[0.065, 0.25, 0.19]} />
            <meshToonMaterial color={bookColors[(i + 4) % bookColors.length]} />
          </mesh>
        ))}
      </group>

      {/* Miniature Celestial Globe on Stand on Right */}
      <group position={[0.31, 1.45, 0.08]}>
        {/* Base */}
        <mesh position={[0, -0.09, 0]}>
          <cylinderGeometry args={[0.045, 0.055, 0.02, 12]} />
          <meshToonMaterial color="#D97706" />
        </mesh>
        {/* Stem */}
        <mesh position={[0, -0.04, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.08, 6]} />
          <meshToonMaterial color="#D97706" />
        </mesh>
        {/* Meridian Ring */}
        <mesh position={[0, 0.02, 0]} rotation={[0.3, 0.4, 0]}>
          <torusGeometry args={[0.06, 0.007, 6, 16]} />
          <meshToonMaterial color="#D97706" />
        </mesh>
        {/* Globe Sphere */}
        <mesh position={[0, 0.02, 0]}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshToonMaterial color="#38BDF8" />
        </mesh>
      </group>

      {/* ---------------------------------------------------- */}
      {/* BOTTOM SHELF (y = 0.8)                               */}
      {/* ---------------------------------------------------- */}
      {/* Heavy Programming Encyclopedias on Left */}
      <group position={[-0.34, 0.94, 0.08]}>
        {[
          { color: '#1E3A8A', title: 'Java' },
          { color: '#047857', title: 'Python' },
          { color: '#7C2D12', title: 'DSA' },
          { color: '#4C1D95', title: 'Cloud' }
        ].map((book, i) => (
          <group key={i} position={[i * 0.09, 0, 0]}>
            <mesh>
              <boxGeometry args={[0.075, 0.28, 0.21]} />
              <meshToonMaterial color={book.color} />
            </mesh>
            {/* Gold foil spine stripe */}
            <mesh position={[0, 0.04, 0.106]}>
              <boxGeometry args={[0.05, 0.015, 0.005]} />
              <meshBasicMaterial color="#FFD166" />
            </mesh>
          </group>
        ))}
      </group>

      {/* Storage Crate / Wicker Basket with Rolled Blueprints on Right */}
      <group position={[0.26, 0.91, 0.08]}>
        {/* Wooden Crate Body */}
        <mesh>
          <boxGeometry args={[0.28, 0.18, 0.2]} />
          <meshToonMaterial color="#D4A373" />
        </mesh>
        {/* Crate Plank Detail */}
        <mesh position={[0, 0, 0.102]}>
          <boxGeometry args={[0.26, 0.03, 0.005]} />
          <meshToonMaterial color="#A98467" />
        </mesh>
        {/* Rolled Blueprint Scrolls sticking out */}
        <mesh position={[-0.05, 0.12, 0]} rotation={[0.2, 0, 0.15]}>
          <cylinderGeometry args={[0.025, 0.025, 0.2, 8]} />
          <meshToonMaterial color="#FEF3C7" />
        </mesh>
        <mesh position={[0.05, 0.13, 0]} rotation={[-0.15, 0, -0.2]}>
          <cylinderGeometry args={[0.022, 0.022, 0.22, 8]} />
          <meshToonMaterial color="#DBEAFE" />
        </mesh>
      </group>
    </group>
  );
}

// =====================================================================
// 3. Floating Wall Shelf with Decorative Trinkets
// =====================================================================
export function FloatingWallShelf({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Wooden Shelf Board */}
      <mesh position={[0, 0, 0.11]} castShadow>
        <boxGeometry args={[0.85, 0.04, 0.24]} />
        <meshToonMaterial color="#E6CCB2" />
      </mesh>
      {/* Left & Right Brass Wall Brackets */}
      <mesh position={[-0.3, -0.07, 0.08]}>
        <boxGeometry args={[0.025, 0.14, 0.18]} />
        <meshToonMaterial color="#D97706" />
      </mesh>
      <mesh position={[0.3, -0.07, 0.08]}>
        <boxGeometry args={[0.025, 0.14, 0.18]} />
        <meshToonMaterial color="#D97706" />
      </mesh>

      {/* Decorative items on the floating shelf */}
      {/* 1. Geometric Succulent in White Ceramic Pot */}
      <group position={[-0.26, 0.08, 0.11]}>
        <mesh>
          <cylinderGeometry args={[0.055, 0.04, 0.08, 6]} />
          <meshToonMaterial color="#FFFFFF" />
        </mesh>
        <mesh position={[0, 0.06, 0]}>
          <sphereGeometry args={[0.05, 6, 6]} />
          <meshToonMaterial color="#6EE7B7" />
        </mesh>
      </group>

      {/* 2. Vintage Twin-Bell Alarm Clock in Center */}
      <group position={[0, 0.08, 0.11]}>
        {/* Clock Body */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.055, 0.055, 0.035, 16]} />
          <meshToonMaterial color="#F43F5E" />
        </mesh>
        {/* White Dial Face */}
        <mesh position={[0, 0, 0.019]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.046, 0.046, 0.005, 16]} />
          <meshBasicMaterial color="#FFFBEB" />
        </mesh>
        {/* Tiny Twin Bells */}
        <mesh position={[-0.04, 0.05, 0]}>
          <sphereGeometry args={[0.018, 6, 6]} />
          <meshToonMaterial color="#FDE047" />
        </mesh>
        <mesh position={[0.04, 0.05, 0]}>
          <sphereGeometry args={[0.018, 6, 6]} />
          <meshToonMaterial color="#FDE047" />
        </mesh>
      </group>

      {/* 3. Leaning Bookends & Small Notebook */}
      <group position={[0.24, 0.1, 0.11]}>
        <mesh position={[-0.04, 0, 0]}>
          <boxGeometry args={[0.035, 0.16, 0.14]} />
          <meshToonMaterial color="#818CF8" />
        </mesh>
        <mesh position={[0.02, 0, 0]} rotation={[0, 0, 0.15]}>
          <boxGeometry args={[0.03, 0.14, 0.13]} />
          <meshToonMaterial color="#FDE047" />
        </mesh>
        <mesh position={[0.07, -0.04, 0]}>
          <boxGeometry args={[0.02, 0.08, 0.08]} />
          <meshToonMaterial color="#D97706" />
        </mesh>
      </group>
    </group>
  );
}

// =====================================================================
// 4. Architectural Wainscoting Boiserie Wall Panel
// =====================================================================
export function WallWainscotPanel({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Outer Crisp White Beveled Frame */}
      <mesh position={[0, 0, 0.015]}>
        <boxGeometry args={[1.7, 0.96, 0.025]} />
        <meshToonMaterial color="#FFFFFF" />
      </mesh>
      {/* Inner Recessed Lavender Panel */}
      <mesh position={[0, 0, 0.028]}>
        <planeGeometry args={[1.52, 0.78]} />
        <meshToonMaterial color="#DDD4FC" />
      </mesh>
      {/* Inner Fine Gold Filigree Inlay Border */}
      <mesh position={[0, 0, 0.03]}>
        <planeGeometry args={[1.44, 0.7]} />
        <meshBasicMaterial color="#E9D5FF" />
      </mesh>
      {/* Central Golden Rosette / Medallion */}
      <mesh position={[0, 0, 0.035]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.09, 0.09, 0.015]} />
        <meshToonMaterial color="#FFD166" />
      </mesh>
      <mesh position={[0, 0, 0.043]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshToonMaterial color="#FFFBEB" />
      </mesh>
    </group>
  );
}

// =====================================================================
// 5. Architectural Pilaster (Fluted Classical Wall Column Strip)
// =====================================================================
export function ArchitecturalPilaster({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Plinth Base at Bottom */}
      <mesh position={[0, 0.16, 0.03]}>
        <boxGeometry args={[0.24, 0.32, 0.07]} />
        <meshToonMaterial color="#FFFFFF" />
      </mesh>
      {/* Column Body running up wall */}
      <mesh position={[0, 2.3, 0.02]}>
        <boxGeometry args={[0.18, 4.0, 0.04]} />
        <meshToonMaterial color="#FFFFFF" />
      </mesh>
      {/* Inner Vertical Fluting Shadow Lines */}
      <mesh position={[-0.04, 2.3, 0.042]}>
        <boxGeometry args={[0.015, 3.8, 0.005]} />
        <meshBasicMaterial color="#E2E8F0" />
      </mesh>
      <mesh position={[0.04, 2.3, 0.042]}>
        <boxGeometry args={[0.015, 3.8, 0.005]} />
        <meshBasicMaterial color="#E2E8F0" />
      </mesh>
      {/* Capital Crown Moulding at Top (near ceiling y = 4.4) */}
      <mesh position={[0, 4.38, 0.035]}>
        <boxGeometry args={[0.26, 0.18, 0.08]} />
        <meshToonMaterial color="#FFFFFF" />
      </mesh>
      {/* Gold Trim band at Capital */}
      <mesh position={[0, 4.34, 0.042]}>
        <boxGeometry args={[0.27, 0.025, 0.085]} />
        <meshToonMaterial color="#FFD166" />
      </mesh>
    </group>
  );
}

// =====================================================================
// 6. Ornamental Wall Sconce Lamp (Warm Golden Ambiance)
// =====================================================================
export function WallSconce({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Circular Brass Wall Backplate */}
      <mesh position={[0, 0, 0.02]}>
        <cylinderGeometry args={[0.075, 0.075, 0.02, 16]} />
        <meshToonMaterial color="#D97706" />
      </mesh>
      {/* Curved Brass Gooseneck Arm */}
      <mesh position={[0, -0.06, 0.1]}>
        <boxGeometry args={[0.02, 0.12, 0.16]} />
        <meshToonMaterial color="#F59E0B" />
      </mesh>
      {/* Fluted Tulip Glass Shade */}
      <mesh position={[0, 0.06, 0.18]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.09, 0.04, 0.13, 16, 1, true]} />
        <meshToonMaterial color="#FFFDF0" side={THREE.DoubleSide} />
      </mesh>
      {/* Glowing Warm Filament Bulb */}
      <mesh position={[0, 0.05, 0.18]}>
        <sphereGeometry args={[0.042, 12, 12]} />
        <meshBasicMaterial color="#FFFBEB" />
      </mesh>
      {/* Subtle Warm Point Light */}
      <pointLight position={[0, 0.05, 0.22]} color="#FFE6AA" intensity={0.8} distance={4.5} />
    </group>
  );
}

// =====================================================================
// 7. Whimsical Pastel Bunting Garland Overhead
// =====================================================================
export function PastelBuntingGarland({ position = [0, 0, 0] }) {
  const pennantColors = ['#A7F3D0', '#FBCFE8', '#DDD6FE', '#BAE6FD', '#FEF08A'];
  return (
    <group position={position}>
      {/* Thin cord strung across width of hallway */}
      <mesh position={[0, 4.25, 0]}>
        <boxGeometry args={[4.3, 0.012, 0.012]} />
        <meshBasicMaterial color="#554B42" />
      </mesh>
      {/* Triangular Pastel Flags hanging along cord */}
      {[-1.8, -1.35, -0.9, -0.45, 0, 0.45, 0.9, 1.35, 1.8].map((x, idx) => (
        <mesh
          key={idx}
          position={[x, 4.14, 0]}
          rotation={[0, 0, Math.PI]}
        >
          <coneGeometry args={[0.13, 0.2, 3]} />
          <meshToonMaterial color={pennantColors[idx % pennantColors.length]} />
        </mesh>
      ))}
    </group>
  );
}

// =====================================================================
// 8. Round Gilded Baroque Sunburst Mirror
// =====================================================================
export function RoundGildedMirror({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Golden Sunburst Rays */}
      {[0, 30, 60, 90, 120, 150].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <mesh key={i} position={[0, 0, 0.01]} rotation={[0, 0, rad]}>
            <boxGeometry args={[0.04, 0.85, 0.015]} />
            <meshToonMaterial color="#FFD166" />
          </mesh>
        );
      })}
      {/* Outer Golden Beveled Frame */}
      <mesh position={[0, 0, 0.02]}>
        <torusGeometry args={[0.32, 0.035, 8, 24]} />
        <meshToonMaterial color="#F59E0B" />
      </mesh>
      {/* Reflective Sky Blue Mirror Glass */}
      <mesh position={[0, 0, 0.025]}>
        <cylinderGeometry args={[0.3, 0.3, 0.008, 24]} />
        <meshBasicMaterial color="#EBF4FE" />
      </mesh>
      {/* Subtle shine glint */}
      <mesh position={[0.08, 0.08, 0.03]} rotation={[0, 0, Math.PI / 4]}>
        <planeGeometry args={[0.08, 0.2]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

// =====================================================================
// 9. Framed Wall Art with Storybook Canvas Illustrations
// =====================================================================
export function WallFrame({ position = [0, 0, 0], rotation = [0, 0, 0], title = "Code", color = '#FFE5D4' }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Wooden Frame */}
      <mesh>
        <boxGeometry args={[0.9, 1.1, 0.06]} />
        <meshToonMaterial color="#6B5C4E" />
      </mesh>
      {/* Outer Frame Gold Trim */}
      <mesh position={[0, 0, 0.015]}>
        <boxGeometry args={[0.84, 1.04, 0.04]} />
        <meshToonMaterial color="#FFD166" />
      </mesh>
      {/* White Matting */}
      <mesh position={[0, 0, 0.032]}>
        <planeGeometry args={[0.74, 0.94]} />
        <meshBasicMaterial color="#FAF5EE" />
      </mesh>
      {/* Artwork Canvas */}
      <mesh position={[0, 0, 0.035]}>
        <planeGeometry args={[0.62, 0.8]} />
        <meshToonMaterial color={color} />
      </mesh>

      {/* Hand-Drawn Motifs Based on Frame Theme */}
      {title === "Code" && (
        <group position={[0, 0, 0.038]}>
          {/* Left bracket */}
          <mesh position={[-0.14, 0, 0]}>
            <boxGeometry args={[0.03, 0.24, 0.005]} />
            <meshBasicMaterial color="#1E40AF" />
          </mesh>
          {/* Semicolon */}
          <mesh position={[0, 0.04, 0]}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshBasicMaterial color="#1E40AF" />
          </mesh>
          {/* Right bracket */}
          <mesh position={[0.14, 0, 0]}>
            <boxGeometry args={[0.03, 0.24, 0.005]} />
            <meshBasicMaterial color="#1E40AF" />
          </mesh>
        </group>
      )}

      {title === "Create" && (
        <group position={[0, 0, 0.038]}>
          {/* Golden Crescent Moon */}
          <mesh position={[-0.04, 0.04, 0]}>
            <torusGeometry args={[0.12, 0.04, 6, 16, Math.PI * 1.2]} />
            <meshToonMaterial color="#F59E0B" />
          </mesh>
          {/* Twinkling Star */}
          <mesh position={[0.12, 0.08, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.05, 0.05, 0.005]} />
            <meshBasicMaterial color="#FEF08A" />
          </mesh>
        </group>
      )}

      {title === "Ship" && (
        <group position={[0, 0, 0.038]}>
          {/* Origami Boat */}
          <mesh position={[0, -0.04, 0]} rotation={[0, 0, Math.PI]}>
            <coneGeometry args={[0.14, 0.12, 3]} />
            <meshToonMaterial color="#FFFFFF" />
          </mesh>
          {/* Mast */}
          <mesh position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 0.18, 6]} />
            <meshToonMaterial color="#EA580C" />
          </mesh>
        </group>
      )}

      {title === "Learn" && (
        <group position={[0, 0, 0.038]}>
          {/* Open Book */}
          <mesh position={[-0.08, 0, 0]} rotation={[0, -0.2, 0]}>
            <boxGeometry args={[0.14, 0.18, 0.01]} />
            <meshToonMaterial color="#FFFFFF" />
          </mesh>
          <mesh position={[0.08, 0, 0]} rotation={[0, 0.2, 0]}>
            <boxGeometry args={[0.14, 0.18, 0.01]} />
            <meshToonMaterial color="#FFFFFF" />
          </mesh>
        </group>
      )}

      {title === "Connect" && (
        <group position={[0, 0, 0.038]}>
          {/* Steaming Coffee Mug */}
          <mesh position={[0, -0.04, 0]}>
            <cylinderGeometry args={[0.08, 0.065, 0.14, 12]} />
            <meshToonMaterial color="#BE123C" />
          </mesh>
          {/* Mug Handle */}
          <mesh position={[0.09, -0.04, 0]}>
            <torusGeometry args={[0.045, 0.012, 6, 12]} />
            <meshToonMaterial color="#BE123C" />
          </mesh>
        </group>
      )}
    </group>
  );
}

// =====================================================================
// 10. Hanging Pastel Lantern / Pendant Lamp
// =====================================================================
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

// =====================================================================
// 11. Hallway Window with Sunlight Angle
// =====================================================================
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
      {/* Window Apron & Sill */}
      <mesh position={[0, -1.14, 0.06]}>
        <boxGeometry args={[1.5, 0.08, 0.16]} />
        <meshToonMaterial color="#FFFFFF" />
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

// =====================================================================
// 12. Floating Dust Motes / Sunlight Particles
// =====================================================================
function createDustPositions(count) {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const pseudo1 = ((i * 123.456) % 1.0) - 0.5;
    const pseudo2 = ((i * 789.012) % 1.0);
    const pseudo3 = ((i * 345.678) % 1.0);
    pos[i * 3 + 0] = pseudo1 * 4.0;
    pos[i * 3 + 1] = 0.5 + pseudo2 * 3.5;
    pos[i * 3 + 2] = -pseudo3 * 40.0;
  }
  return pos;
}

export function FloatingDustMotes({ count = 120 }) {
  const pointsRef = useRef();
  const [positions] = useState(() => createDustPositions(count));

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime() * 0.25;
    const posArr = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
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
