import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { MainHallway } from '../scenes/MainHallway';
import { Navbar } from '../components/Navbar';
import { NavigationControls } from '../components/NavigationControls';
import { InteractionPrompt } from '../components/InteractionPrompt';
import { EducationRoom } from '../scenes/EducationRoom';
import { SkillsRoom } from '../scenes/SkillsRoom';
import { ProjectsRoom } from '../scenes/ProjectsRoom';
import { AchievementsRoom } from '../scenes/AchievementsRoom';
import { ContactRoom } from '../scenes/ContactRoom';
import { NextChapterRoom } from '../scenes/NextChapterRoom';
import { StorybookReader } from './StorybookReader';
import { PencilSketchOverlay } from '../components/PencilSketchOverlay';
import { doorsData } from '../data/doors';
import { soundManager } from '../utils/audio';

export function Home() {
  const [viewMode, setViewMode] = useState('3d'); // '3d' or 'reader'
  const [characterPos, setCharacterPos] = useState([0, 0, 0]);
  const [isWalking, setIsWalking] = useState(false);
  const [facing, setFacing] = useState('forward');
  const [hoveredDoor, setHoveredDoor] = useState(null);
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [isEnteringRoom, setIsEnteringRoom] = useState(false);

  const walkingTimeoutRef = useRef(null);

  // Derive active door when character is within 2.5 units
  const nearbyDoor = useMemo(() => {
    const curZ = characterPos[2];
    return doorsData.find((d) => Math.abs(d.zPos - curZ) < 2.5) || null;
  }, [characterPos]);

  // Handle walking step
  const moveCharacter = useCallback((dx, dz, newFacing) => {
    setCharacterPos((prev) => {
      const newX = Math.max(Math.min(prev[0] + dx, 1.4), -1.4);
      // Clamp between hallway entrance (2.0) and in front of the final door (-34.2)
      const newZ = Math.max(Math.min(prev[2] + dz, 2.0), -34.2);
      return [newX, prev[1], newZ];
    });

    setIsWalking(true);
    if (newFacing) setFacing(newFacing);
    soundManager.playStep();

    if (walkingTimeoutRef.current) clearTimeout(walkingTimeoutRef.current);
    walkingTimeoutRef.current = setTimeout(() => {
      setIsWalking(false);
    }, 250);
  }, []);

  // Glide directly to target door
  const glideToDoor = useCallback((doorId) => {
    const door = doorsData.find((d) => d.id === doorId);
    if (!door) return;

    soundManager.playDoorOpen();
    setIsWalking(true);
    setFacing(door.side === 'left' ? 'left' : door.side === 'right' ? 'right' : 'forward');

    // Smoothly step position in front of the selected door
    const targetX = door.side === 'left' ? -0.8 : door.side === 'right' ? 0.8 : 0;
    const targetZ = door.side === 'end' ? -34.2 : door.zPos + 1.0;

    setCharacterPos([targetX, 0, targetZ]);

    setTimeout(() => {
      setIsWalking(false);
      setIsEnteringRoom(true);
      setTimeout(() => {
        setSelectedDoor(doorId);
        setIsEnteringRoom(false);
      }, 400);
    }, 350);
  }, []);

  // Glide to specific Z position along the hallway
  const glideToZ = useCallback((targetZ) => {
    setIsWalking(true);
    const clampedZ = Math.max(Math.min(targetZ, 2.0), -34.2);
    setFacing(clampedZ < characterPos[2] ? 'forward' : 'backward');
    setCharacterPos([0, 0, clampedZ]);
    soundManager.playStep();

    if (walkingTimeoutRef.current) clearTimeout(walkingTimeoutRef.current);
    walkingTimeoutRef.current = setTimeout(() => {
      setIsWalking(false);
    }, 300);
  }, [characterPos]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // If room is open, ESC closes it
      if (selectedDoor) {
        if (e.key === 'Escape') {
          soundManager.playDoorOpen();
          setSelectedDoor(null);
        }
        return;
      }

      const key = e.key.toLowerCase();
      const step = 1.0;

      if (key === 'w' || key === 'arrowup') {
        e.preventDefault();
        moveCharacter(0, -step, 'forward');
      } else if (key === 's' || key === 'arrowdown') {
        e.preventDefault();
        moveCharacter(0, step, 'backward');
      } else if (key === 'a' || key === 'arrowleft') {
        e.preventDefault();
        moveCharacter(-0.4, 0, 'left');
      } else if (key === 'd' || key === 'arrowright') {
        e.preventDefault();
        moveCharacter(0.4, 0, 'right');
      } else if (key === 'e') {
        if (nearbyDoor) {
          glideToDoor(nearbyDoor.id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDoor, nearbyDoor, moveCharacter, glideToDoor]);

  // Wheel scroll navigation down hallway
  useEffect(() => {
    const handleWheel = (e) => {
      if (selectedDoor || viewMode !== '3d') return;
      const delta = e.deltaY > 0 ? -1.2 : 1.2;
      moveCharacter(0, delta, delta < 0 ? 'forward' : 'backward');
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [selectedDoor, viewMode, moveCharacter]);

  // Render active room component
  const renderRoomOverlay = () => {
    if (!selectedDoor) return null;

    const props = {
      onBackToHallway: () => {
        soundManager.playDoorOpen();
        setSelectedDoor(null);
      },
      onNavigateRoom: (newRoomId) => {
        soundManager.playDoorOpen();
        setSelectedDoor(newRoomId);
      }
    };

    return (
      <div className="fixed inset-0 z-40 overflow-y-auto bg-[#FAF7F2]/95 backdrop-blur-md p-4 sm:p-6 animate-fadeIn">
        {selectedDoor === 'education' && <EducationRoom {...props} />}
        {selectedDoor === 'skills' && <SkillsRoom {...props} />}
        {selectedDoor === 'projects' && <ProjectsRoom {...props} />}
        {selectedDoor === 'achievements' && <AchievementsRoom {...props} />}
        {selectedDoor === 'contact' && <ContactRoom {...props} />}
        {selectedDoor === 'next-chapter' && <NextChapterRoom {...props} />}
      </div>
    );
  };

  return (
    <div className="relative w-full min-h-screen bg-[#FAF7F2] select-none overflow-hidden">
      {/* Paper Pencil Texture Overlay */}
      <PencilSketchOverlay />

      {/* Top Navbar */}
      <Navbar
        currentView={viewMode}
        onToggleView={() => setViewMode(viewMode === '3d' ? 'reader' : '3d')}
        activeRoom={selectedDoor}
        onSelectDoor={glideToDoor}
        onReturnToHallway={() => setSelectedDoor(null)}
      />

      {/* Main Content: 3D Hallway or 2D Storybook Reader */}
      {viewMode === 'reader' ? (
        <StorybookReader onSwitchTo3D={() => setViewMode('3d')} />
      ) : (
        <div className="relative w-full h-[calc(100vh-64px)]">
          {/* Three.js 3D Canvas */}
          <Canvas
            shadows
            camera={{ position: [0, 2.4, 5.0], fov: 50, near: 0.1, far: 80 }}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            <MainHallway
              characterPos={characterPos}
              isWalking={isWalking}
              facing={facing}
              hoveredDoor={hoveredDoor}
              setHoveredDoor={setHoveredDoor}
              selectedDoor={selectedDoor}
              onSelectDoor={glideToDoor}
              isEnteringRoom={isEnteringRoom}
            />
          </Canvas>

          {/* Interaction Prompt when near a door */}
          {!selectedDoor && (
            <InteractionPrompt door={nearbyDoor} onEnter={glideToDoor} />
          )}

          {/* Hallway Dock & Controls */}
          {!selectedDoor && (
            <NavigationControls
              characterZ={characterPos[2]}
              onGlideToZ={glideToZ}
              activeDoorId={nearbyDoor ? nearbyDoor.id : null}
              onSelectDoor={glideToDoor}
              hoveredDoor={hoveredDoor}
              isWalking={isWalking}
            />
          )}

          {/* Room Overlay (when a door is opened) */}
          {renderRoomOverlay()}
        </div>
      )}
    </div>
  );
}
