"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

const vertexShader = `
uniform float uProgress;
uniform float uTime;
varying vec2 vUv;
varying vec3 vPosition;

// Simple random function
float rand(vec2 co) {
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
    vUv = uv;
    vPosition = position;
    
    // Get a random direction for this particle based on its UV
    vec2 randomDir = vec2(rand(uv) * 2.0 - 1.0, rand(uv + 1.0) * 2.0 - 1.0);
    float randomZ = rand(uv + 2.0) * 2.0 - 1.0;
    vec3 direction = normalize(vec3(randomDir, randomZ));
    
    // Calculate explosion based on progress
    // Progress goes from 0 (intact) to 1 (fully exploded)
    
    // Add some noise/swirl based on time and position
    float swirl = sin(uTime * 2.0 + position.x * 10.0) * 0.1;
    direction.x += swirl;
    direction.y += cos(uTime * 2.0 + position.y * 10.0) * 0.1;
    
    // Move particle
    vec3 newPosition = position + direction * uProgress * (2.0 + rand(uv) * 3.0);
    
    // Rotate particle slightly as it explodes
    
    vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
    
    // Point size depends on distance and random factor
    gl_PointSize = (15.0 * (1.0 + rand(uv))) * (1.0 / -mvPosition.z);
    
    gl_Position = projectionMatrix * mvPosition;
}
`;

const fragmentShader = `
uniform sampler2D uTexture;
uniform float uProgress;
varying vec2 vUv;

void main() {
    // Sample color from the texture
    vec4 color = texture2D(uTexture, vUv);
    
    // Make particles circular instead of square
    vec2 coord = gl_PointCoord - vec2(0.5);
    if(length(coord) > 0.5) discard;
    
    // Fade out as they explode
    color.a *= (1.0 - smoothstep(0.5, 1.0, uProgress));
    
    gl_FragColor = color;
}
`;

interface FragmentImageProps {
  imageUrl: string;
  progress: number;
}

export default function FragmentImage({ imageUrl, progress }: FragmentImageProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  // Load texture
  const texture = useTexture(imageUrl);
  
  // Create a grid of particles
  const { positions, uvs } = useMemo(() => {
    const width = 200;
    const height = 200;
    const count = width * height;
    
    const positions = new Float32Array(count * 3);
    const uvs = new Float32Array(count * 2);
    
    let i3 = 0;
    let i2 = 0;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Center the grid around 0,0
        positions[i3] = (x / width - 0.5) * 4; // aspect ratio width
        positions[i3 + 1] = (y / height - 0.5) * 4; // aspect ratio height
        positions[i3 + 2] = 0;
        
        uvs[i2] = x / width;
        uvs[i2 + 1] = y / height;
        
        i3 += 3;
        i2 += 2;
      }
    }
    
    return { positions, uvs };
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // Smoothly interpolate the progress uniform toward the prop
      materialRef.current.uniforms.uProgress.value += (progress - materialRef.current.uniforms.uProgress.value) * 0.1;
    }
  });

  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uProgress: { value: 0 },
    uTime: { value: 0 }
  }), [texture]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          args={[positions, 3]} 
        />
        <bufferAttribute 
          attach="attributes-uv" 
          args={[uvs, 2]} 
        />
      </bufferGeometry>
      <shaderMaterial 
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
