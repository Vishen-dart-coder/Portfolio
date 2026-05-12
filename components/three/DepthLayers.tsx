// @ts-nocheck
'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function DepthLayers() {
  const layer1 = useRef<THREE.Mesh>(null);
  const layer2 = useRef<THREE.Mesh>(null);
  const layer3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const mouseX = state.mouse.x * 0.5;
    const mouseY = state.mouse.y * 0.5;

    // Parallax effect based on mouse position
    if (layer1.current) {
      layer1.current.rotation.x = mouseY * 0.3;
      layer1.current.rotation.y = mouseX * 0.3;
    }

    if (layer2.current) {
      layer2.current.rotation.x = mouseY * 0.2;
      layer2.current.rotation.y = mouseX * 0.2;
    }

    if (layer3.current) {
      layer3.current.rotation.x = mouseY * 0.1;
      layer3.current.rotation.y = mouseX * 0.1;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />

      {/* Layer 1 - Closest */}
      <mesh ref={layer1} position={[0, 0, 0]}>
        <planeGeometry args={[6, 6, 20, 20]} />
        <meshStandardMaterial
          color="#E7E5E4"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Layer 2 - Middle */}
      <mesh ref={layer2} position={[0, 0, -2]}>
        <planeGeometry args={[8, 8, 15, 15]} />
        <meshStandardMaterial
          color="#5F5F5F"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Layer 3 - Farthest */}
      <mesh ref={layer3} position={[0, 0, -4]}>
        <planeGeometry args={[10, 10, 10, 10]} />
        <meshStandardMaterial
          color="#166534"
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  );
}
