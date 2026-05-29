"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Points() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 4000;
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    // Cinematic Palette
    const colorChampagne = new THREE.Color("#D4AF37");
    const colorIvory = new THREE.Color("#F5F5F0");
    const colorSilver = new THREE.Color("#C0C0C0");

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      
      const r = 2.5; // slightly larger
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      
      positions[i * 3] = x + (Math.random() - 0.5) * 0.3;
      positions[i * 3 + 1] = y + (Math.random() - 0.5) * 0.3;
      positions[i * 3 + 2] = z + (Math.random() - 0.5) * 0.3;
      
      const mix = Math.random();
      let color;
      if (mix > 0.85) {
        color = colorChampagne;
      } else if (mix > 0.6) {
        color = colorSilver;
      } else {
        color = colorIvory;
      }
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.015;
    }
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
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.01}
        vertexColors={true}
        transparent={true}
        opacity={0.6}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

import ErrorBoundary from "./ErrorBoundary";

export default function ParticleSphere() {
  return (
    <div className="absolute inset-0 z-0 opacity-30 mix-blend-screen pointer-events-none transition-opacity duration-1000">
      <ErrorBoundary fallback={null}>
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <fog attach="fog" args={["#050505", 3, 10]} />
          <Points />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
