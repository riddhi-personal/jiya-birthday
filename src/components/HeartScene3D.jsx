import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

// Realistic anatomical heart using custom geometry
const HeartMesh = ({ isOpen, onClick }) => {
  const groupRef = useRef();
  const time = useRef(0);

  // Spring for the heartbeat
  const { scale } = useSpring({
    scale: isOpen ? 1.2 : 1,
    config: { mass: 1, tension: 300, friction: 20 },
  });

  useFrame((state, delta) => {
    time.current += delta;
    if (groupRef.current) {
      // Heartbeat animation - natural systolic/diastolic rhythm
      const t = time.current;
      const beat = Math.pow(Math.sin(t * 2.5), 2) * 0.08;
      const beat2 = Math.pow(Math.sin(t * 2.5 - 0.5), 2) * 0.04;
      const beatScale = 1 + beat + beat2;
      groupRef.current.scale.setScalar(isOpen ? beatScale * 1.1 : beatScale);
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.15;
    }
  });

  // Create heart shape points (upright: lobes at top, tapered tip at bottom)
  const heartGeom = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;

    // Top notch
    shape.moveTo(x, y + 0.6);
    // Right lobe (top)
    shape.bezierCurveTo(x, y + 1.0, x + 0.8, y + 1.1, x + 0.8, y + 0.5);
    // Right lower curve to bottom tip
    shape.bezierCurveTo(x + 0.8, y, x, y - 0.3, x, y - 0.75);
    // Left lower curve from bottom tip
    shape.bezierCurveTo(x, y - 0.3, x - 0.8, y, x - 0.8, y + 0.5);
    // Left lobe (top)
    shape.bezierCurveTo(x - 0.8, y + 1.1, x, y + 1.0, x, y + 0.6);

    const extrudeSettings = {
      steps: 2,
      depth: 0.6,
      bevelEnabled: true,
      bevelThickness: 0.12,
      bevelSize: 0.1,
      bevelSegments: 10,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  // Blood vessels (aorta, pulmonary artery, vena cava)
  const aortaGeom = useMemo(() => new THREE.CylinderGeometry(0.12, 0.09, 0.5, 16), []);
  const pulmonaryGeom = useMemo(() => new THREE.CylinderGeometry(0.09, 0.07, 0.4, 12), []);
  const venaCavaGeom = useMemo(() => new THREE.CylinderGeometry(0.07, 0.07, 0.35, 10), []);

  // Anatomical materials
  const heartMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#9B1C2E'),
    roughness: 0.35,
    metalness: 0.12,
  }), []);

  const vesselMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#7B1A28'),
    roughness: 0.45,
    metalness: 0.08,
  }), []);

  return (
    <animated.group
      ref={groupRef}
      scale={scale}
      onClick={onClick}
      position={[0, 0, 0]}
    >
      {/* Main heart body — perfectly upright: wide lobes at top, tapered tip at bottom */}
      <mesh
        geometry={heartGeom}
        material={heartMaterial}
        position={[0, -0.2, -0.3]}
        rotation={[0, 0, 0]}
        castShadow
        receiveShadow
      />

      {/* Aorta arch exiting top right lobe */}
      <mesh
        geometry={aortaGeom}
        material={vesselMaterial}
        position={[0.2, 0.95, 0]}
        rotation={[0, 0, 0.3]}
        castShadow
      />

      {/* Pulmonary artery exiting top left */}
      <mesh
        geometry={pulmonaryGeom}
        material={vesselMaterial}
        position={[-0.15, 0.9, 0.08]}
        rotation={[0.2, 0, -0.4]}
        castShadow
      />

      {/* Superior vena cava */}
      <mesh
        geometry={venaCavaGeom}
        material={vesselMaterial}
        position={[0.35, 0.85, -0.05]}
        rotation={[0, 0, -0.2]}
        castShadow
      />

      {/* Subtle warm glow around heart */}
      <mesh position={[0, 0, 0]} scale={1.3}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshBasicMaterial
          color={new THREE.Color('#FF4466')}
          transparent
          opacity={0.05}
        />
      </mesh>
    </animated.group>
  );
};

// Liquid drip effect particles
const LiquidParticles = ({ active }) => {
  const particlesRef = useRef();
  const particles = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 80; i++) {
      pts.push({
        x: (Math.random() - 0.5) * 2,
        y: 2 - Math.random() * 6,
        z: (Math.random() - 0.5) * 1,
        speed: Math.random() * 0.02 + 0.005,
      });
    }
    return pts;
  }, []);

  useFrame(() => {
    if (!active || !particlesRef.current) return;
    const positions = particlesRef.current.geometry.attributes.position.array;
    for (let i = 0; i < particles.length; i++) {
      particles[i].y -= particles[i].speed;
      if (particles[i].y < -4) particles[i].y = 2;
      positions[i * 3] = particles[i].x;
      positions[i * 3 + 1] = particles[i].y;
      positions[i * 3 + 2] = particles[i].z;
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  if (!active) return null;

  const posArray = new Float32Array(particles.length * 3);
  particles.forEach((p, i) => {
    posArray[i * 3] = p.x;
    posArray[i * 3 + 1] = p.y;
    posArray[i * 3 + 2] = p.z;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length}
          array={posArray}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#8B0000"
        size={0.06}
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
};

const HeartScene3D = ({ isOpen, onHeartClick }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 50 }}
      shadows
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
    >
      {/* Lighting */}
      <ambientLight intensity={0.4} color="#FFE0E8" />
      <directionalLight
        position={[2, 3, 2]}
        intensity={1.2}
        color="#FFD0D8"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-2, -1, -1]} intensity={0.3} color="#8B1A28" />
      <pointLight position={[0, 2, 1]} intensity={0.8} color="#FF6688" distance={5} />
      <pointLight position={[0, -2, 2]} intensity={0.4} color="#CC3355" distance={4} />

      {/* Upright Heart */}
      <HeartMesh isOpen={isOpen} onClick={onHeartClick} />

      {/* Liquid drip effect */}
      <LiquidParticles active={isOpen} />
    </Canvas>
  );
};

export default HeartScene3D;
