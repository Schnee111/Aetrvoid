"use client";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Suspense } from "react";
import InteractiveParticles from "./InteractiveParticles"; // Import komponen baru
import { useIsMobile } from "@/hooks/use-mobile";

export default function Scene() {
  const isMobile = useIsMobile();

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none">
      <Canvas
        // Kamera ditarik lebih mundur (Z=15) agar area sebaran partikel terlihat luas
        camera={{ position: [0, 0, 15], fov: 50 }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {/* Kita hapus Environment dan Lights karena partikel bercahaya sendiri (BasicMaterial) */}

          {/* Warna background gelap kebiruan tipis agar tidak hitam mati (opsional) */}
          <color attach="background" args={['#050505']} />
          {/* Kabut tipis agar partikel yang jauh terlihat memudar */}
          <fog attach="fog" args={['#050505', 10, 30]} />

          {/* Masukkan Partikel */}
          <InteractiveParticles />

          {/* EFEK GLOW (Hanya Desktop) */}
          {/* Ini akan membuat partikel terlihat "berpendar" */}
          {!isMobile && (
            <EffectComposer enableNormalPass={false}>
              <Bloom
                luminanceThreshold={0.2} // Ambang batas cahaya untuk glow
                mipmapBlur
                intensity={0.8} // Intensitas glow
                radius={0.5}
              />
            </EffectComposer>
          )}

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}