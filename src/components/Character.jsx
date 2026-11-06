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
  const propellerRef = useRef();
  const duckRef = useRef();
  const leftEyeRef = useRef();
  const rightEyeRef = useRef();
  const eyebrowsRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth position interpolation
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, position[0], delta * 6);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, position[1], delta * 6);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, position[2], delta * 6);

    // Smooth facing rotation
    let targetRotY = 0;
    if (facing === 'left') targetRotY = Math.PI / 2;
    else if (facing === 'right') targetRotY = -Math.PI / 2;
    else if (facing === 'backward') targetRotY = Math.PI;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 9);

    const elapsedTime = state.clock.getElapsedTime();
    const time = elapsedTime * 9.0;

    // Animated Eye Blinking (cute cartoon blink)
    const blinkCycle = elapsedTime % 3.0;
    const isBlinking = blinkCycle < 0.14;
    const eyeScaleY = isBlinking ? 0.08 : 1.0;
    if (leftEyeRef.current) leftEyeRef.current.scale.y = eyeScaleY;
    if (rightEyeRef.current) rightEyeRef.current.scale.y = eyeScaleY;

    // Funny Eyebrow Wiggle
    if (eyebrowsRef.current) {
      eyebrowsRef.current.position.y = 0.08 + Math.sin(elapsedTime * 4) * 0.012;
    }

    if (isWalking) {
      // 🚁 PROPELLER SPINS LIKE CRAZY WHEN WALKING!
      if (propellerRef.current) {
        propellerRef.current.rotation.y += delta * 28.0;
      }

      // Exaggerated cartoon walk cycle
      const swing = Math.sin(time) * 0.75;
      const waddle = Math.sin(time) * 0.12;

      // Legs: High cartoon knee lifts
      if (leftLegRef.current) {
        leftLegRef.current.rotation.x = swing;
        leftLegRef.current.rotation.z = Math.max(0, -swing * 0.12);
      }
      if (rightLegRef.current) {
        rightLegRef.current.rotation.x = -swing;
        rightLegRef.current.rotation.z = Math.max(0, swing * 0.12);
      }

      // Arms: Comical exaggerated cartoon flail
      if (leftArmRef.current) {
        leftArmRef.current.rotation.x = -swing * 0.9;
        leftArmRef.current.rotation.z = 0.25 + Math.abs(Math.sin(time)) * 0.15;
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.x = swing * 0.9;
        rightArmRef.current.rotation.z = -0.25 - Math.abs(Math.sin(time)) * 0.15;
      }

      // Squash and stretch bounce!
      const bounce = Math.abs(Math.sin(time)) * 0.14;
      const squashX = 1 - bounce * 0.4;
      const stretchY = 1 + bounce * 0.6;

      if (torsoRef.current) {
        torsoRef.current.position.y = 0.82 + bounce;
        torsoRef.current.rotation.z = -waddle;
        torsoRef.current.scale.set(squashX, stretchY, squashX);
      }

      // Head bouncy bob & goofy tilt
      if (headRef.current) {
        headRef.current.position.y = 1.48 + bounce * 1.4;
        headRef.current.rotation.z = waddle * 1.4;
        headRef.current.rotation.x = Math.sin(time * 0.5) * 0.05;
      }

      // 🐥 Rubber Ducky in backpack bounces enthusiastically!
      if (duckRef.current) {
        duckRef.current.position.y = 0.29 + Math.abs(Math.sin(time * 2)) * 0.08;
        duckRef.current.rotation.z = Math.sin(time) * 0.2;
      }
    } else {
      // Idle: Propeller spins lazily in the breeze
      if (propellerRef.current) {
        propellerRef.current.rotation.y += delta * 3.0;
      }

      // Gentle cartoon breathing
      const breath = Math.sin(elapsedTime * 2.4) * 0.03;
      const headLook = Math.sin(elapsedTime * 0.9) * 0.15;

      if (leftLegRef.current) {
        leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, 0, delta * 10);
        leftLegRef.current.rotation.z = THREE.MathUtils.lerp(leftLegRef.current.rotation.z, 0, delta * 10);
      }
      if (rightLegRef.current) {
        rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, 0, delta * 10);
        rightLegRef.current.rotation.z = THREE.MathUtils.lerp(rightLegRef.current.rotation.z, 0, delta * 10);
      }
      if (leftArmRef.current) {
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, 0, delta * 10);
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, 0.18, delta * 10);
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, 0, delta * 10);
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, -0.18, delta * 10);
      }

      if (torsoRef.current) {
        torsoRef.current.position.y = 0.82 + breath;
        torsoRef.current.rotation.z = THREE.MathUtils.lerp(torsoRef.current.rotation.z, 0, delta * 8);
        torsoRef.current.scale.set(1, 1 + breath * 0.5, 1);
      }

      if (headRef.current) {
        headRef.current.position.y = 1.48 + breath * 1.3;
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, headLook, delta * 4);
        headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, headLook * 0.25, delta * 4);
      }

      if (duckRef.current) {
        duckRef.current.position.y = 0.29 + breath * 0.4;
        duckRef.current.rotation.z = Math.sin(elapsedTime * 1.5) * 0.05;
      }
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Soft Drop Shadow under character */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.5, 24]} />
        <meshBasicMaterial color="#30261E" transparent opacity={0.25} />
      </mesh>

      {/* ================================================= */}
      {/* TORSO: CHUBBY VIBRANT SUNNY HOODIE                */}
      {/* ================================================= */}
      <group ref={torsoRef} position={[0, 0.82, 0]}>
        {/* Main Chubby Body (Vibrant Sunny Warm Yellow) */}
        <mesh castShadow>
          <boxGeometry args={[0.56, 0.62, 0.38]} />
          <meshToonMaterial color="#FFCA3A" />
        </mesh>

        {/* Playful Bright Teal / Sky Blue Stripe */}
        <mesh position={[0, 0.02, 0.005]}>
          <boxGeometry args={[0.565, 0.16, 0.385]} />
          <meshToonMaterial color="#1982C4" />
        </mesh>

        {/* Funny Front Heart/Coder Doodle */}
        <mesh position={[0, 0.02, 0.2]}>
          <planeGeometry args={[0.11, 0.11]} />
          <meshBasicMaterial color="#FF5964" />
        </mesh>

        {/* Cozy Hoodie Collar */}
        <mesh position={[0, 0.34, 0]}>
          <cylinderGeometry args={[0.24, 0.28, 0.1, 16]} />
          <meshToonMaterial color="#F4B924" />
        </mesh>

        {/* Funny Oversized Backpack with Rubber Ducky */}
        <group ref={backpackRef} position={[0, 0.02, 0.27]}>
          {/* Main Bag (Attractive Coral Red / Terracotta) */}
          <mesh castShadow>
            <boxGeometry args={[0.44, 0.5, 0.24]} />
            <meshToonMaterial color="#FF5964" />
          </mesh>

          {/* Front Pocket with Gold Clasp */}
          <mesh position={[0, -0.09, 0.13]}>
            <boxGeometry args={[0.32, 0.24, 0.07]} />
            <meshToonMaterial color="#EE3D48" />
          </mesh>
          <mesh position={[0, -0.07, 0.17]}>
            <planeGeometry args={[0.08, 0.06]} />
            <meshBasicMaterial color="#FFCA3A" />
          </mesh>

          {/* Funny Coder Sticker on Bag */}
          <mesh position={[0.09, 0.11, 0.125]}>
            <planeGeometry args={[0.1, 0.08]} />
            <meshBasicMaterial color="#8AC926" />
          </mesh>

          {/* Backpack Straps */}
          <mesh position={[-0.18, 0.02, -0.1]}>
            <boxGeometry args={[0.06, 0.48, 0.08]} />
            <meshToonMaterial color="#D12C38" />
          </mesh>
          <mesh position={[0.18, 0.02, -0.1]}>
            <boxGeometry args={[0.06, 0.48, 0.08]} />
            <meshToonMaterial color="#D12C38" />
          </mesh>

          {/* 🐥 THE FUNNY RUBBER DUCKY WEARING SUNGLASSES! */}
          <group ref={duckRef} position={[0.09, 0.29, 0.05]}>
            {/* Duck Body */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.095, 12, 12]} />
              <meshToonMaterial color="#FFD166" />
            </mesh>
            {/* Duck Head */}
            <mesh position={[0, 0.08, 0.03]}>
              <sphereGeometry args={[0.075, 12, 12]} />
              <meshToonMaterial color="#FFD166" />
            </mesh>
            {/* Duck Orange Beak */}
            <mesh position={[0, 0.07, 0.11]} rotation={[Math.PI / 2, 0, 0]}>
              <coneGeometry args={[0.035, 0.055, 8]} />
              <meshToonMaterial color="#F77F00" />
            </mesh>
            {/* 🕶️ Duck Tiny Sunglasses! */}
            <group position={[0, 0.09, 0.09]}>
              <mesh position={[-0.03, 0, 0]}>
                <boxGeometry args={[0.035, 0.022, 0.015]} />
                <meshBasicMaterial color="#1E293B" />
              </mesh>
              <mesh position={[0.03, 0, 0]}>
                <boxGeometry args={[0.035, 0.022, 0.015]} />
                <meshBasicMaterial color="#1E293B" />
              </mesh>
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.025, 0.008, 0.015]} />
                <meshBasicMaterial color="#1E293B" />
              </mesh>
            </group>
          </group>
        </group>
      </group>

      {/* ================================================= */}
      {/* HEAD: BIG CHIBI HEAD + PROPELLER BEANIE CAP       */}
      {/* ================================================= */}
      <group ref={headRef} position={[0, 1.48, 0]}>
        {/* Round Cute Face */}
        <mesh castShadow>
          <sphereGeometry args={[0.3, 22, 22]} />
          <meshToonMaterial color="#FDE2CD" />
        </mesh>

        {/* Fluffy Messy Hair */}
        <mesh position={[0, 0.07, -0.03]}>
          <sphereGeometry args={[0.32, 16, 16]} />
          <meshToonMaterial color="#4A3428" />
        </mesh>
        <mesh position={[0, 0.21, 0.15]} rotation={[0.25, 0, 0]}>
          <boxGeometry args={[0.34, 0.14, 0.18]} />
          <meshToonMaterial color="#4A3428" />
        </mesh>

        {/* 🧢 HILARIOUS MULTI-COLORED PROPELLER BEANIE CAP! */}
        <group position={[0, 0.22, 0]}>
          {/* Beanie Dome Half Sphere */}
          <mesh position={[0, 0.05, 0]}>
            <sphereGeometry args={[0.315, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshToonMaterial color="#1982C4" />
          </mesh>
          {/* Backwards Cap Visor / Brim */}
          <mesh position={[0, 0.06, -0.32]} rotation={[-0.3, 0, 0]}>
            <cylinderGeometry args={[0.24, 0.24, 0.03, 16, 1, false, Math.PI * 0.8, Math.PI * 1.4]} />
            <meshToonMaterial color="#FF5964" />
          </mesh>
          {/* Brass Pin on top */}
          <mesh position={[0, 0.36, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.08, 8]} />
            <meshStandardMaterial color="#FFCA3A" metalness={0.8} roughness={0.2} />
          </mesh>

          {/* 🚁 SPINNING TWO-BLADE PROPELLER! */}
          <group ref={propellerRef} position={[0, 0.4, 0]}>
            {/* Propeller Center Cap */}
            <mesh>
              <sphereGeometry args={[0.035, 10, 10]} />
              <meshToonMaterial color="#FF5964" />
            </mesh>
            {/* Blade 1 (Sunny Yellow) */}
            <mesh position={[0.13, 0, 0]} rotation={[0.2, 0, 0]}>
              <boxGeometry args={[0.22, 0.012, 0.055]} />
              <meshToonMaterial color="#FFCA3A" />
            </mesh>
            {/* Blade 2 (Sunny Yellow) */}
            <mesh position={[-0.13, 0, 0]} rotation={[-0.2, 0, 0]}>
              <boxGeometry args={[0.22, 0.012, 0.055]} />
              <meshToonMaterial color="#FFCA3A" />
            </mesh>
          </group>
        </group>

        {/* 👀 FUNNY CARTOON EYES, EYEBROWS & TOOTHY GRIN */}
        <group position={[0, 0.04, 0.28]}>
          {/* Expressive Wiggling Eyebrows */}
          <group ref={eyebrowsRef} position={[0, 0.08, 0]}>
            <mesh position={[-0.1, 0, 0]} rotation={[0, 0, -0.15]}>
              <boxGeometry args={[0.07, 0.02, 0.015]} />
              <meshBasicMaterial color="#30221A" />
            </mesh>
            <mesh position={[0.1, 0, 0]} rotation={[0, 0, 0.15]}>
              <boxGeometry args={[0.07, 0.02, 0.015]} />
              <meshBasicMaterial color="#30221A" />
            </mesh>
          </group>

          {/* Left Eye */}
          <group ref={leftEyeRef} position={[-0.1, 0, 0]}>
            <mesh>
              <sphereGeometry args={[0.048, 14, 14]} />
              <meshBasicMaterial color="#2B211A" />
            </mesh>
            {/* Big Cartoon Highlight */}
            <mesh position={[0.014, 0.016, 0.04]}>
              <sphereGeometry args={[0.016, 6, 6]} />
              <meshBasicMaterial color="#FFFFFF" />
            </mesh>
          </group>

          {/* Right Eye */}
          <group ref={rightEyeRef} position={[0.1, 0, 0]}>
            <mesh>
              <sphereGeometry args={[0.048, 14, 14]} />
              <meshBasicMaterial color="#2B211A" />
            </mesh>
            <mesh position={[0.014, 0.016, 0.04]}>
              <sphereGeometry args={[0.016, 6, 6]} />
              <meshBasicMaterial color="#FFFFFF" />
            </mesh>
          </group>

          {/* 🌸 Rosy Pink Cheeks */}
          <mesh position={[-0.17, -0.06, -0.02]} rotation={[-0.2, -0.2, 0]}>
            <circleGeometry args={[0.05, 12]} />
            <meshBasicMaterial color="#FF758F" transparent opacity={0.7} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0.17, -0.06, -0.02]} rotation={[-0.2, 0.2, 0]}>
            <circleGeometry args={[0.05, 12]} />
            <meshBasicMaterial color="#FF758F" transparent opacity={0.7} side={THREE.DoubleSide} />
          </mesh>

          {/* 😄 Goofy Open Smile with Little White Tooth */}
          <group position={[0, -0.09, 0]}>
            {/* Smile Mouth Arc */}
            <mesh rotation={[0, 0, 0]}>
              <ringGeometry args={[0.038, 0.054, 12, 1, 0, Math.PI]} />
              <meshBasicMaterial color="#30221A" side={THREE.DoubleSide} />
            </mesh>
            {/* Cute Cartoon Buck Tooth */}
            <mesh position={[0.015, -0.018, 0.01]}>
              <boxGeometry args={[0.022, 0.02, 0.01]} />
              <meshBasicMaterial color="#FFFFFF" />
            </mesh>
          </group>
        </group>

        {/* 👓 Nerdy Oversized Round Glasses */}
        <group position={[0, 0.04, 0.31]}>
          <mesh position={[-0.1, 0, 0]}>
            <ringGeometry args={[0.058, 0.078, 16]} />
            <meshBasicMaterial color="#30221A" side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0.1, 0, 0]}>
            <ringGeometry args={[0.058, 0.078, 16]} />
            <meshBasicMaterial color="#30221A" side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 0.01, 0]}>
            <boxGeometry args={[0.07, 0.018, 0.01]} />
            <meshBasicMaterial color="#30221A" />
          </mesh>
          <mesh position={[-0.18, 0, -0.1]} rotation={[0, 0.4, 0]}>
            <boxGeometry args={[0.015, 0.015, 0.24]} />
            <meshBasicMaterial color="#30221A" />
          </mesh>
          <mesh position={[0.18, 0, -0.1]} rotation={[0, -0.4, 0]}>
            <boxGeometry args={[0.015, 0.015, 0.24]} />
            <meshBasicMaterial color="#30221A" />
          </mesh>
        </group>
      </group>

      {/* ================================================= */}
      {/* LEGS: BLUE JEANS & COMICAL GIANT PUFFY KICKS      */}
      {/* ================================================= */}
      {/* Left Leg */}
      <group ref={leftLegRef} position={[-0.17, 0.52, 0]}>
        <mesh position={[0, -0.2, 0]} castShadow>
          <boxGeometry args={[0.2, 0.42, 0.2]} />
          <meshToonMaterial color="#1982C4" />
        </mesh>
        <mesh position={[0, -0.15, 0.106]}>
          <planeGeometry args={[0.09, 0.09]} />
          <meshBasicMaterial color="#FFCA3A" />
        </mesh>
        {/* Rolled Cuff */}
        <mesh position={[0, -0.4, 0]}>
          <boxGeometry args={[0.22, 0.08, 0.22]} />
          <meshToonMaterial color="#64DFDF" />
        </mesh>
        {/* 👟 Comical Giant Puffy Sneaker (Bright Coral & White Cap) */}
        <group position={[0, -0.48, -0.05]}>
          <mesh castShadow>
            <boxGeometry args={[0.22, 0.15, 0.35]} />
            <meshToonMaterial color="#FF5964" />
          </mesh>
          <mesh position={[0, -0.01, -0.15]}>
            <sphereGeometry args={[0.11, 12, 12]} />
            <meshToonMaterial color="#FFFFFF" />
          </mesh>
          {/* Thick White Rubber Sole */}
          <mesh position={[0, -0.08, 0]}>
            <boxGeometry args={[0.24, 0.04, 0.37]} />
            <meshToonMaterial color="#FFFFFF" />
          </mesh>
        </group>
      </group>

      {/* Right Leg */}
      <group ref={rightLegRef} position={[0.17, 0.52, 0]}>
        <mesh position={[0, -0.2, 0]} castShadow>
          <boxGeometry args={[0.2, 0.42, 0.2]} />
          <meshToonMaterial color="#1982C4" />
        </mesh>
        {/* Rolled Cuff */}
        <mesh position={[0, -0.4, 0]}>
          <boxGeometry args={[0.22, 0.08, 0.22]} />
          <meshToonMaterial color="#64DFDF" />
        </mesh>
        {/* 👟 Comical Giant Puffy Sneaker */}
        <group position={[0, -0.48, -0.05]}>
          <mesh castShadow>
            <boxGeometry args={[0.22, 0.15, 0.35]} />
            <meshToonMaterial color="#FF5964" />
          </mesh>
          <mesh position={[0, -0.01, -0.15]}>
            <sphereGeometry args={[0.11, 12, 12]} />
            <meshToonMaterial color="#FFFFFF" />
          </mesh>
          <mesh position={[0, -0.08, 0]}>
            <boxGeometry args={[0.24, 0.04, 0.37]} />
            <meshToonMaterial color="#FFFFFF" />
          </mesh>
        </group>
      </group>

      {/* ================================================= */}
      {/* ARMS: CARTOON SLEEVES & CHUBBY WHITE GLOVE HANDS */}
      {/* ================================================= */}
      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.37, 1.05, 0]}>
        <mesh position={[0, -0.22, 0]} castShadow>
          <boxGeometry args={[0.17, 0.44, 0.17]} />
          <meshToonMaterial color="#FFCA3A" />
        </mesh>
        <mesh position={[0, -0.42, 0]}>
          <boxGeometry args={[0.19, 0.08, 0.19]} />
          <meshToonMaterial color="#F4B924" />
        </mesh>
        {/* Cute White Cartoon Glove Hand */}
        <mesh position={[0, -0.5, 0]}>
          <sphereGeometry args={[0.09, 12, 12]} />
          <meshToonMaterial color="#FFFFFF" />
        </mesh>
        <mesh position={[0.06, -0.48, 0.03]}>
          <sphereGeometry args={[0.038, 8, 8]} />
          <meshToonMaterial color="#FFFFFF" />
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef} position={[0.37, 1.05, 0]}>
        <mesh position={[0, -0.22, 0]} castShadow>
          <boxGeometry args={[0.17, 0.44, 0.17]} />
          <meshToonMaterial color="#FFCA3A" />
        </mesh>
        <mesh position={[0, -0.42, 0]}>
          <boxGeometry args={[0.19, 0.08, 0.19]} />
          <meshToonMaterial color="#F4B924" />
        </mesh>
        {/* Cute White Cartoon Glove Hand */}
        <mesh position={[0, -0.5, 0]}>
          <sphereGeometry args={[0.09, 12, 12]} />
          <meshToonMaterial color="#FFFFFF" />
        </mesh>
        <mesh position={[-0.06, -0.48, 0.03]}>
          <sphereGeometry args={[0.038, 8, 8]} />
          <meshToonMaterial color="#FFFFFF" />
        </mesh>
      </group>
    </group>
  );
}
