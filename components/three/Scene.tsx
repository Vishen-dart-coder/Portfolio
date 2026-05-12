'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

interface SceneProps {
  children: React.ReactNode;
  className?: string;
  camera?: {
    position?: [number, number, number];
    fov?: number;
  };
}

export function Scene({ children, className = '', camera }: SceneProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{
          position: camera?.position || [0, 0, 5],
          fov: camera?.fov || 75,
        }}
        gl={{
          antialias: true,
          alpha: true,
        }}
        dpr={[1, 2]} // Device pixel ratio (1x for mobile, 2x for retina)
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}
