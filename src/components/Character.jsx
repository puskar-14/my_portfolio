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
  const hairSproutRef = useRef();
  const duckRef = useRef();
  const leftEyeRef = useRef();
  const rightEyeRef = useRef();
  const headphonesRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth position interpolation
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, position[0], delta * 6);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, position[1], delta * 6);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, position[2], delta * 6);

    // Target rotation based on facing direction
    let targetRotY = 0; // facing forward down hallway (-Z)
    if (facing === 'left') targetRotY = Math.PI / 2;
    else if (facing === 'right') targetRotY = -Math.PI / 2;
    else if (facing === 'backward') targetRotY = Math.PI;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 9);

    const elapsedTime = state.clock.getElapsedTime();
    const time = elapsedTime * 8.5;

    // Cute Eye Blinking Logic (every 3.5 seconds for 0.15s)
    const blinkCycle = elapsedTime % 3.5;
    const isBlinking = blinkCycle < 0.15;
    const eyeScaleY = isBlinking ? 0.1 : 1.0;
    if (leftEyeRef.current) leftEyeRef.current.scale.y = eyeScaleY;
    if (rightEyeRef.current) rightEyeRef.current.scale.y = eyeScaleY;

    if (isWalking) {
      // Bouncy, funny waddle walk cycle
      const swing = Math.sin(time) * 0.65;
      const waddle = Math.sin(time) * 0.08;

      // Legs swing with lively foot step
      if (leftLegRef.current) {
        leftLegRef.current.rotation.x = swing;
        leftLegRef.current.rotation.z = Math.max(0, -swing * 0.1);
      }
      if (rightLegRef.current) {
        rightLegRef.current.rotation.x = -swing;
        rightLegRef.current.rotation.z = Math.max(0, swing * 0.1);
      }

      // Arms swing with funny playful flail
      if (leftArmRef.current) {
        leftArmRef.current.rotation.x = -swing * 0.8;
        leftArmRef.current.rotation.z = 0.2 + Math.abs(Math.sin(time)) * 0.1;
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.x = swing * 0.8;
        rightArmRef.current.rotation.z = -0.2 - Math.abs(Math.sin(time)) * 0.1;
      }

      // Torso energetic bounce & waddle
      const bounce = Math.abs(Math.sin(time)) * 0.12;
      if (torsoRef.current) {
        torsoRef.current.position.y = 0.82 + bounce;
        torsoRef.current.rotation.z = -waddle;
      }

      // Head cute bob & swagger
      if (headRef.current) {
        headRef.current.position.y = 1.48 + bounce * 1.3;
        headRef.current.rotation.z = waddle * 1.2;
        headRef.current.rotation.x = Math.sin(time * 0.5) * 0.04;
      }

      // Bouncy headphones wobble
      if (headphonesRef.current) {
        headphonesRef.current.rotation.z = Math.sin(time) * 0.06;
      }

      // Rubber duck bobbing excitedly in backpack!
      if (duckRef.current) {
        duckRef.current.position.y = 0.28 + Math.abs(Math.sin(time * 2)) * 0.06;
        duckRef.current.rotation.z = Math.sin(time) * 0.15;
      }

      // Hair cowlick bouncy jiggle
      if (hairSproutRef.current) {
        hairSproutRef.current.rotation.z = Math.sin(time * 1.5) * 0.3;
        hairSproutRef.current.rotation.x = Math.cos(time * 1.5) * 0.2;
      }
    } else {
      // Idle: curious, charming breathing & looking around
      const breath = Math.sin(elapsedTime * 2.2) * 0.025;
      const headLook = Math.sin(elapsedTime * 0.8) * 0.12; // slowly looking around hallway

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
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, 0.15, delta * 10);
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, 0, delta * 10);
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, -0.15, delta * 10);
      }

      if (torsoRef.current) {
        torsoRef.current.position.y = 0.82 + breath;
        torsoRef.current.rotation.z = THREE.MathUtils.lerp(torsoRef.current.rotation.z, 0, delta * 8);
      }

      if (headRef.current) {
        headRef.current.position.y = 1.48 + breath * 1.2;
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, headLook, delta * 4);
        headRef.current.rotation.z = THREE.MathUtils.lerp(headRef.current.rotation.z, headLook * 0.3, delta * 4);
      }

      if (duckRef.current) {
        duckRef.current.position.y = 0.28 + breath * 0.5;
        duckRef.current.rotation.z = Math.sin(elapsedTime * 1.5) * 0.05;
      }

      if (hairSproutRef.current) {
        hairSproutRef.current.rotation.z = Math.sin(elapsedTime * 2.5) * 0.1;
      }
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Soft Drop Shadow under character */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.48, 24]} />
        <meshBasicMaterial color="#30261E" transparent opacity={0.24} />
      </mesh>

      {/* Torso: Cozy Funny Striped Coder Sweater */}
      <group ref={torsoRef} position={[0, 0.82, 0]}>
        {/* Main Chunky Sweater Body (Warm Mustard Pastel) */}
        <mesh castShadow>
          <boxGeometry args={[0.54, 0.62, 0.36]} />
          <meshToonMaterial color="#F6CE65" />
        </mesh>

        {/* Playful Horizontal Teal/Sage Stripe */}
        <mesh position={[0, 0.02, 0.005]}>
          <boxGeometry args={[0.545, 0.16, 0.365]} />
          <meshToonMaterial color="#5CA08E" />
        </mesh>

        {/* Cute Sweater Front Pixel Heart / Coffee Motif */}
        <mesh position={[0, 0.02, 0.19]}>
          <planeGeometry args={[0.1, 0.1]} />
          <meshBasicMaterial color="#E05263" />
        </mesh>

        {/* Cozy Turtleneck Collar */}
        <mesh position={[0, 0.34, 0]}>
          <cylinderGeometry args={[0.22, 0.26, 0.1, 16]} />
          <meshToonMaterial color="#E8BE50" />
        </mesh>

        {/* Funny Backpack with Rubber Ducky Companion */}
        <group ref={backpackRef} position={[0, 0.02, 0.26]}>
          {/* Main Leather/Canvas Bag (Pastel Terracotta) */}
          <mesh castShadow>
            <boxGeometry args={[0.42, 0.48, 0.22]} />
            <meshToonMaterial color="#DE7A5A" />
          </mesh>

          {/* Front Pocket with Brass Buckle */}
          <mesh position={[0, -0.08, 0.12]}>
            <boxGeometry args={[0.3, 0.22, 0.06]} />
            <meshToonMaterial color="#C86343" />
          </mesh>
          <mesh position={[0, -0.06, 0.155]}>
            <planeGeometry args={[0.07, 0.05]} />
            <meshBasicMaterial color="#FCD34D" />
          </mesh>

          {/* Funny Laptop Sticker on Backpack (Blue Coder Terminal) */}
          <mesh position={[0.08, 0.1, 0.115]}>
            <planeGeometry args={[0.1, 0.08]} />
            <meshBasicMaterial color="#3B82F6" />
          </mesh>

          {/* Backpack Straps */}
          <mesh position={[-0.17, 0.02, -0.1]}>
            <boxGeometry args={[0.06, 0.46, 0.08]} />
            <meshToonMaterial color="#8F4630" />
          </mesh>
          <mesh position={[0.17, 0.02, -0.1]}>
            <boxGeometry args={[0.06, 0.46, 0.08]} />
            <meshToonMaterial color="#8F4630" />
          </mesh>

          {/* 🐥 THE FUNNY RUBBER DUCKY COMPANION PEEKING OUT! */}
          <group ref={duckRef} position={[0.08, 0.28, 0.04]}>
            {/* Duck Body */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.09, 12, 12]} />
              <meshToonMaterial color="#FCD34D" />
            </mesh>
            {/* Duck Head */}
            <mesh position={[0, 0.08, 0.03]}>
              <sphereGeometry args={[0.07, 12, 12]} />
              <meshToonMaterial color="#FCD34D" />
            </mesh>
            {/* Duck Cute Orange Beak */}
            <mesh position={[0, 0.07, 0.11]} rotation={[Math.PI / 2, 0, 0]}>
              <coneGeometry args={[0.032, 0.05, 8]} />
              <meshToonMaterial color="#F97316" />
            </mesh>
            {/* Duck Tiny Eyes */}
            <mesh position={[-0.03, 0.1, 0.08]}>
              <sphereGeometry args={[0.012, 6, 6]} />
              <meshBasicMaterial color="#1F2937" />
            </mesh>
            <mesh position={[0.03, 0.1, 0.08]}>
              <sphereGeometry args={[0.012, 6, 6]} />
              <meshBasicMaterial color="#1F2937" />
            </mesh>
          </group>
        </group>
      </group>

      {/* Head: Chibi Proportions, Expressive Eyes, Round Nerdy Glasses & Headphones */}
      <group ref={headRef} position={[0, 1.48, 0]}>
        {/* Cute Rounded Face */}
        <mesh castShadow>
          <sphereGeometry args={[0.29, 20, 20]} />
          <meshToonMaterial color="#FDE2CD" />
        </mesh>

        {/* Fluffy Messy Tousled Hair */}
        <mesh position={[0, 0.09, -0.04]}>
          <sphereGeometry args={[0.31, 16, 16]} />
          <meshToonMaterial color="#4A3428" />
        </mesh>
        {/* Front Hair Bangs */}
        <mesh position={[0, 0.2, 0.16]} rotation={[0.25, 0, 0]}>
          <boxGeometry args={[0.34, 0.15, 0.18]} />
          <meshToonMaterial color="#4A3428" />
        </mesh>
        {/* Side Hair Tufts */}
        <mesh position={[-0.24, 0.08, 0.04]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshToonMaterial color="#4A3428" />
        </mesh>
        <mesh position={[0.24, 0.08, 0.04]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshToonMaterial color="#4A3428" />
        </mesh>

        {/* 🌱 Funny Cowlick / Hair Sprout on top */}
        <group ref={hairSproutRef} position={[0, 0.38, -0.05]}>
          <mesh position={[0, 0.06, 0]}>
            <cylinderGeometry args={[0.015, 0.03, 0.14, 6]} />
            <meshToonMaterial color="#4A3428" />
          </mesh>
          <mesh position={[0.04, 0.12, 0]} rotation={[0, 0, -0.5]}>
            <sphereGeometry args={[0.035, 6, 6]} />
            <meshToonMaterial color="#4A3428" />
          </mesh>
        </group>

        {/* 🎧 Cute Oversized Retro Headphones */}
        <group ref={headphonesRef} position={[0, 0.05, 0]}>
          {/* Headband Arc */}
          <mesh position={[0, 0.28, 0]} rotation={[0, 0, 0]}>
            <torusGeometry args={[0.31, 0.028, 8, 24, Math.PI]} />
            <meshToonMaterial color="#3C3630" />
          </mesh>
          {/* Left Earcup Cushion (Pastel Mint) */}
          <mesh position={[-0.31, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.07, 16]} />
            <meshToonMaterial color="#7ECEB3" />
          </mesh>
          {/* Right Earcup Cushion (Pastel Mint) */}
          <mesh position={[0.31, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.07, 16]} />
            <meshToonMaterial color="#7ECEB3" />
          </mesh>
        </group>

        {/* 👀 Big Expressive Eyes with Animated Blinking */}
        <group position={[0, 0.04, 0.27]}>
          {/* Left Eye */}
          <group ref={leftEyeRef} position={[-0.1, 0, 0]}>
            <mesh>
              <sphereGeometry args={[0.042, 12, 12]} />
              <meshBasicMaterial color="#2B211A" />
            </mesh>
            {/* Specular Sparkle Highlight */}
            <mesh position={[0.012, 0.015, 0.035]}>
              <sphereGeometry args={[0.014, 6, 6]} />
              <meshBasicMaterial color="#FFFFFF" />
            </mesh>
          </group>

          {/* Right Eye */}
          <group ref={rightEyeRef} position={[0.1, 0, 0]}>
            <mesh>
              <sphereGeometry args={[0.042, 12, 12]} />
              <meshBasicMaterial color="#2B211A" />
            </mesh>
            {/* Specular Sparkle Highlight */}
            <mesh position={[0.012, 0.015, 0.035]}>
              <sphereGeometry args={[0.014, 6, 6]} />
              <meshBasicMaterial color="#FFFFFF" />
            </mesh>
          </group>

          {/* 🌸 Cute Blushing Cheeks (Pastel Pink) */}
          <mesh position={[-0.16, -0.06, -0.02]} rotation={[-0.2, -0.2, 0]}>
            <circleGeometry args={[0.045, 12]} />
            <meshBasicMaterial color="#FF9AA2" transparent opacity={0.65} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0.16, -0.06, -0.02]} rotation={[-0.2, 0.2, 0]}>
            <circleGeometry args={[0.045, 12]} />
            <meshBasicMaterial color="#FF9AA2" transparent opacity={0.65} side={THREE.DoubleSide} />
          </mesh>

          {/* Cute Confident Smirk / Smile */}
          <mesh position={[0.02, -0.08, 0]} rotation={[0, 0, 0.08]}>
            <ringGeometry args={[0.035, 0.048, 12, 1, 0, Math.PI * 0.9]} />
            <meshBasicMaterial color="#4A3428" side={THREE.DoubleSide} />
          </mesh>
        </group>

        {/* 👓 Nerdy Oversized Round Glasses */}
        <group position={[0, 0.04, 0.29]}>
          {/* Left Frame */}
          <mesh position={[-0.1, 0, 0]}>
            <ringGeometry args={[0.055, 0.075, 16]} />
            <meshBasicMaterial color="#3C3630" side={THREE.DoubleSide} />
          </mesh>
          {/* Right Frame */}
          <mesh position={[0.1, 0, 0]}>
            <ringGeometry args={[0.055, 0.075, 16]} />
            <meshBasicMaterial color="#3C3630" side={THREE.DoubleSide} />
          </mesh>
          {/* Glasses Bridge */}
          <mesh position={[0, 0.01, 0]}>
            <boxGeometry args={[0.07, 0.018, 0.01]} />
            <meshBasicMaterial color="#3C3630" />
          </mesh>
          {/* Side Temple Stems */}
          <mesh position={[-0.18, 0, -0.1]} rotation={[0, 0.4, 0]}>
            <boxGeometry args={[0.015, 0.015, 0.24]} />
            <meshBasicMaterial color="#3C3630" />
          </mesh>
          <mesh position={[0.18, 0, -0.1]} rotation={[0, -0.4, 0]}>
            <boxGeometry args={[0.015, 0.015, 0.24]} />
            <meshBasicMaterial color="#3C3630" />
          </mesh>
        </group>
      </group>

      {/* Left Leg: Denim Jeans with Rolled Hem & Chunky Sneaker */}
      <group ref={leftLegRef} position={[-0.16, 0.52, 0]}>
        {/* Denim Pant Leg */}
        <mesh position={[0, -0.2, 0]} castShadow>
          <boxGeometry args={[0.19, 0.42, 0.19]} />
          <meshToonMaterial color="#4F6D7A" />
        </mesh>
        {/* Funny Knee Patch on Left Leg */}
        <mesh position={[0, -0.16, 0.102]}>
          <planeGeometry args={[0.09, 0.09]} />
          <meshBasicMaterial color="#FBBF24" />
        </mesh>
        {/* Rolled Jean Cuff */}
        <mesh position={[0, -0.4, 0]}>
          <boxGeometry args={[0.21, 0.08, 0.21]} />
          <meshToonMaterial color="#7D98A1" />
        </mesh>
        {/* Chunky Retro Sneaker (Pastel Peach & Cream) */}
        <group position={[0, -0.47, -0.04]}>
          <mesh castShadow>
            <boxGeometry args={[0.2, 0.14, 0.32]} />
            <meshToonMaterial color="#FAEDCD" />
          </mesh>
          {/* Sneaker Toe Cap */}
          <mesh position={[0, -0.02, -0.13]}>
            <sphereGeometry args={[0.1, 10, 10]} />
            <meshToonMaterial color="#FFFFFF" />
          </mesh>
          {/* Colored Sole */}
          <mesh position={[0, -0.07, 0]}>
            <boxGeometry args={[0.22, 0.03, 0.34]} />
            <meshToonMaterial color="#E07A5F" />
          </mesh>
        </group>
      </group>

      {/* Right Leg: Denim Jeans & Chunky Sneaker */}
      <group ref={rightLegRef} position={[0.16, 0.52, 0]}>
        {/* Denim Pant Leg */}
        <mesh position={[0, -0.2, 0]} castShadow>
          <boxGeometry args={[0.19, 0.42, 0.19]} />
          <meshToonMaterial color="#4F6D7A" />
        </mesh>
        {/* Rolled Jean Cuff */}
        <mesh position={[0, -0.4, 0]}>
          <boxGeometry args={[0.21, 0.08, 0.21]} />
          <meshToonMaterial color="#7D98A1" />
        </mesh>
        {/* Chunky Retro Sneaker */}
        <group position={[0, -0.47, -0.04]}>
          <mesh castShadow>
            <boxGeometry args={[0.2, 0.14, 0.32]} />
            <meshToonMaterial color="#FAEDCD" />
          </mesh>
          {/* Sneaker Toe Cap */}
          <mesh position={[0, -0.02, -0.13]}>
            <sphereGeometry args={[0.1, 10, 10]} />
            <meshToonMaterial color="#FFFFFF" />
          </mesh>
          {/* Colored Sole */}
          <mesh position={[0, -0.07, 0]}>
            <boxGeometry args={[0.22, 0.03, 0.34]} />
            <meshToonMaterial color="#E07A5F" />
          </mesh>
        </group>
      </group>

      {/* Left Arm: Sweater Sleeve with Rolled Cuff & Cartoon Hand */}
      <group ref={leftArmRef} position={[-0.35, 1.05, 0]}>
        <mesh position={[0, -0.22, 0]} castShadow>
          <boxGeometry args={[0.16, 0.44, 0.16]} />
          <meshToonMaterial color="#F6CE65" />
        </mesh>
        {/* Sleeve Cuff */}
        <mesh position={[0, -0.42, 0]}>
          <boxGeometry args={[0.18, 0.08, 0.18]} />
          <meshToonMaterial color="#E8BE50" />
        </mesh>
        {/* Chubby Cartoon Hand */}
        <mesh position={[0, -0.5, 0]}>
          <sphereGeometry args={[0.085, 10, 10]} />
          <meshToonMaterial color="#FDE2CD" />
        </mesh>
        {/* Thumb */}
        <mesh position={[0.06, -0.48, 0.03]}>
          <sphereGeometry args={[0.035, 6, 6]} />
          <meshToonMaterial color="#FDE2CD" />
        </mesh>
      </group>

      {/* Right Arm: Sweater Sleeve with Rolled Cuff & Cartoon Hand */}
      <group ref={rightArmRef} position={[0.35, 1.05, 0]}>
        <mesh position={[0, -0.22, 0]} castShadow>
          <boxGeometry args={[0.16, 0.44, 0.16]} />
          <meshToonMaterial color="#F6CE65" />
        </mesh>
        {/* Sleeve Cuff */}
        <mesh position={[0, -0.42, 0]}>
          <boxGeometry args={[0.18, 0.08, 0.18]} />
          <meshToonMaterial color="#E8BE50" />
        </mesh>
        {/* Chubby Cartoon Hand */}
        <mesh position={[0, -0.5, 0]}>
          <sphereGeometry args={[0.085, 10, 10]} />
          <meshToonMaterial color="#FDE2CD" />
        </mesh>
        {/* Thumb */}
        <mesh position={[-0.06, -0.48, 0.03]}>
          <sphereGeometry args={[0.035, 6, 6]} />
          <meshToonMaterial color="#FDE2CD" />
        </mesh>
      </group>
    </group>
  );
}
