import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Vintage Film Camera 3D Model
const VintageCamera = ({ animationPhase }) => {
  const groupRef = useRef();
  const lensRef = useRef();
  const time = useRef(0);

  useFrame((state, delta) => {
    time.current += delta;
    if (!groupRef.current) return;

    if (animationPhase === 0) {
      // Gentle float
      groupRef.current.rotation.y = Math.sin(time.current * 0.4) * 0.15;
      groupRef.current.position.y = Math.sin(time.current * 0.6) * 0.05;
    } else if (animationPhase === 1) {
      // Move closer - zoom into lens
      groupRef.current.position.z = Math.min(groupRef.current.position.z + delta * 1.5, 2);
    }

    if (lensRef.current) {
      lensRef.current.rotation.z += delta * 0.3;
    }
  });

  // Camera body
  const bodyGeom = useMemo(() => new THREE.BoxGeometry(2.4, 1.6, 1.0, 1, 1, 1), []);
  const lensBarrelGeom = useMemo(() => new THREE.CylinderGeometry(0.5, 0.45, 0.8, 32), []);
  const lensInnerGeom = useMemo(() => new THREE.CylinderGeometry(0.35, 0.35, 0.6, 32), []);
  const lensGlassGeom = useMemo(() => new THREE.CircleGeometry(0.3, 32), []);
  const viewfinderGeom = useMemo(() => new THREE.BoxGeometry(0.5, 0.35, 0.3), []);
  const filmKnobGeom = useMemo(() => new THREE.CylinderGeometry(0.12, 0.12, 0.2, 16), []);
  const shutterGeom = useMemo(() => new THREE.BoxGeometry(0.3, 0.2, 0.15), []);
  const strapLugGeom = useMemo(() => new THREE.BoxGeometry(0.08, 0.3, 0.08), []);
  const topPlateGeom = useMemo(() => new THREE.BoxGeometry(2.4, 0.15, 1.0), []);

  // Materials
  const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1a1208'),
    roughness: 0.85,
    metalness: 0.1,
  }), []);

  const metalMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#b8a070'),
    roughness: 0.3,
    metalness: 0.8,
  }), []);

  const chromeMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#d4c090'),
    roughness: 0.15,
    metalness: 0.9,
  }), []);

  const lensGlassMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1a3355'),
    roughness: 0.05,
    metalness: 0.1,
    transparent: true,
    opacity: 0.85,
    envMapIntensity: 2,
  }), []);

  const lensRingMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#888870'),
    roughness: 0.2,
    metalness: 0.7,
  }), []);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Camera body */}
      <mesh geometry={bodyGeom} material={bodyMat} castShadow receiveShadow />

      {/* Top plate */}
      <mesh geometry={topPlateGeom} material={chromeMat} position={[0, 0.875, 0]} castShadow />

      {/* Lens barrel */}
      <mesh geometry={lensBarrelGeom} material={lensRingMat} position={[0, 0, 0.6]} rotation={[Math.PI / 2, 0, 0]} castShadow />
      <mesh geometry={lensInnerGeom} material={bodyMat} position={[0, 0, 0.75]} rotation={[Math.PI / 2, 0, 0]} />

      {/* Lens glass */}
      <mesh geometry={lensGlassGeom} material={lensGlassMat} position={[0, 0, 1.0]} />

      {/* Lens reflection ring */}
      <mesh ref={lensRef} position={[0, 0, 1.01]}>
        <ringGeometry args={[0.15, 0.28, 32]} />
        <meshStandardMaterial color="#4466aa" transparent opacity={0.4} metalness={0.5} roughness={0.1} />
      </mesh>

      {/* Viewfinder */}
      <mesh geometry={viewfinderGeom} material={chromeMat} position={[0.6, 0.65, -0.2]} castShadow />
      <mesh position={[0.6, 0.65, -0.05]}>
        <boxGeometry args={[0.26, 0.16, 0.05]} />
        <meshStandardMaterial color="#112233" transparent opacity={0.9} />
      </mesh>

      {/* Film advance knob */}
      <mesh geometry={filmKnobGeom} material={metalMat} position={[0.9, 0.95, 0]} rotation={[0, 0, 0]} castShadow />
      <mesh geometry={filmKnobGeom} material={metalMat} position={[-0.7, 0.95, 0]} rotation={[0, 0, 0]} castShadow />

      {/* Shutter button */}
      <mesh geometry={shutterGeom} material={chromeMat} position={[0.5, 0.95, 0.2]} castShadow />

      {/* Strap lugs */}
      <mesh geometry={strapLugGeom} material={chromeMat} position={[1.24, 0.3, 0]} />
      <mesh geometry={strapLugGeom} material={chromeMat} position={[-1.24, 0.3, 0]} />

      {/* Body texture lines (engraving effect) */}
      {[-0.5, 0, 0.5].map((x, i) => (
        <mesh key={i} position={[x, 0, 0.51]}>
          <boxGeometry args={[0.02, 1.4, 0.02]} />
          <meshStandardMaterial color="#2a1f0a" roughness={1} />
        </mesh>
      ))}

      {/* Rangefinder window */}
      <mesh position={[-0.5, 0.5, 0.52]}>
        <boxGeometry args={[0.25, 0.15, 0.02]} />
        <meshStandardMaterial color="#aaccee" transparent opacity={0.7} roughness={0.1} />
      </mesh>
    </group>
  );
};

const CameraScene3D = ({ animationPhase }) => {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 5], fov: 45 }}
      shadows
      style={{ background: 'transparent' }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.5} color="#fff8f0" />
      <directionalLight
        position={[3, 4, 3]}
        intensity={1.5}
        color="#ffe8d0"
        castShadow
      />
      <directionalLight position={[-2, -1, 2]} intensity={0.4} color="#c0d0ff" />
      <pointLight position={[0, 2, 4]} intensity={0.6} color="#fff0e8" />

      <VintageCamera animationPhase={animationPhase} />
    </Canvas>
  );
};

export default CameraScene3D;
