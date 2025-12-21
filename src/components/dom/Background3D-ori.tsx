"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function ParticleSystem() {
  const starsRef = useRef<THREE.Group>(null);
  const midLayerRef = useRef<THREE.Group>(null);
  const foregroundRef = useRef<THREE.Group>(null);
  const nebulaRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const { x, y } = state.pointer;
    const time = state.clock.getElapsedTime();

    // GERAKKAN CAMERA untuk parallax yang benar - range lebih besar
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      -x * 1.0, // Diperbesar untuk parallax lebih terasa
      0.08 // Lerp lebih lambat untuk smoothness
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      -y * 0.8, // Diperbesar untuk parallax lebih terasa
      0.08
    );
    
    // Camera selalu melihat ke center
    state.camera.lookAt(0, 0, 0);

    // LAYER 1: STARS - Auto-rotation subtle
    if (starsRef.current) {
      starsRef.current.rotation.z += 0.00005;
    }

    // LAYER 2: NEBULA - Wavy motion subtle (dikembalikan ke nilai awal)
    if (nebulaRef.current) {
      nebulaRef.current.position.y = Math.sin(time * 0.05) * 0.1;
      nebulaRef.current.position.x = Math.cos(time * 0.01) * 0.7;
    }

    // LAYER 3: MID SPARKLES - Wavy motion subtle
    if (midLayerRef.current) {
      midLayerRef.current.position.y = Math.sin(time * 0.02) * 0.1;
      midLayerRef.current.position.x = Math.cos(time * 0.015) * 0.08;
    }

    // LAYER 4: FOREGROUND - Wavy motion subtle
    if (foregroundRef.current) {
      foregroundRef.current.position.y = Math.sin(time * 0.02) * 0.06;
      foregroundRef.current.position.x = Math.cos(time * 0.03) * 0.04;
    }
  });

  return (
    <>
      {/* LAYER 1: STARS (Jauh di belakang) */}
      <group ref={starsRef} position={[0, 0, -10]}>
        <Stars 
          radius={150}
          depth={80}
          count={7000}
          factor={5}
          saturation={0}
          fade
          speed={0.5}
        />
      </group>

      {/* LAYER 2: NEBULA */}
      <group ref={nebulaRef} position={[0, 0, -5]}>
        <Sparkles 
          count={100}
          scale={25}
          size={8}
          speed={0}
          opacity={0.3}
          color="#8b5cf6"
        />
        <Sparkles 
          count={80}
          scale={20}
          size={6}
          speed={0}
          opacity={0.25}
          color="#3b82f6"
        />
        <Sparkles 
          count={40}
          scale={18}
          size={5}
          speed={0}
          opacity={0.2}
          color="#ec4899"
        />
      </group>

      {/* LAYER 3: MID SPARKLES */}
      <group ref={midLayerRef} position={[0, 0, -2]}>
        <Sparkles 
          count={150}
          scale={15}
          size={2.5}
          speed={0}
          opacity={0.4}
          color="#ffffff"
        />
        <Sparkles 
          count={60}
          scale={12}
          size={3}
          speed={0}
          opacity={0.5}
          color="#60a5fa"
        />
      </group>

      {/* LAYER 4: FOREGROUND */}
      <group ref={foregroundRef} position={[0, 0, 0]}>
        <Sparkles 
          count={80}
          scale={8}
          size={4}
          speed={0}
          opacity={0.7}
          color="#ffffff"
        />
        <Sparkles 
          count={30}
          scale={6}
          size={5}
          speed={0}
          opacity={0.8}
          color="#818cf8"
        />
      </group>
    </>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: false,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#000000", 5, 25]} />
        <ParticleSystem />
      </Canvas>
      
      {/* Enhanced vignette with space gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,20,0.8)_70%,#000000_100%)] opacity-90" />
      
      {/* Subtle blue glow overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03)_0%,transparent_50%)]" />
    </div>
  );
}