'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export function GeometricHero() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Rotate and animate mesh
  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    // Slow rotation
    meshRef.current.rotation.x = time * 0.1;
    meshRef.current.rotation.y = time * 0.15;

    // Subtle floating motion
    meshRef.current.position.y = Math.sin(time * 0.5) * 0.3;
  });

  return (
    <group>
      {/* Ambient light */}
      <ambientLight intensity={0.5} />

      {/* Directional light */}
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* Geometric mesh */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[2, 1]} />
        <MeshDistortMaterial
          color="#166534"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Background spheres for depth */}
      <mesh position={[-3, 2, -2]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#E7E5E4" opacity={0.3} transparent />
      </mesh>

      <mesh position={[3, -2, -3]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color="#5F5F5F" opacity={0.2} transparent />
      </mesh>
    </group>
  );
}
