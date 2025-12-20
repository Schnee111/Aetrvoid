"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/use-mobile";

export default function InteractiveParticles() {
  const isMobile = useIsMobile();
  const count = isMobile ? 800 : 2000;

  const meshRef = useRef<THREE.InstancedMesh>(null);
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      // Sebaran lebih luas (Field of particles)
      const x = (Math.random() * 2 - 1) * 35;
      const y = (Math.random() * 2 - 1) * 20;
      // Z lebih tipis agar wave terlihat jelas
      const z = (Math.random() * 2 - 1) * 10;
      
      temp.push({
        x, y, z, // Posisi Saat Ini
        ox: x, oy: y, oz: z, // Posisi Asli (Origin)
        // Offset waktu acak untuk wave agar tidak gerak barengan (robotic)
        tOffset: Math.random() * 100, 
        // Kecepatan wave individu
        speed: 0.002 + Math.random() * 0.002, 
        scale: 0.5 + Math.random() * 0.5
      });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const vMouse = useMemo(() => new THREE.Vector3(), []);
  const vIntersect = useMemo(() => new THREE.Vector3(), []);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);

  useFrame((state) => {
    if (!meshRef.current) return;

    // 1. Raycasting Mouse (Tetap Akurat)
    raycaster.setFromCamera(state.pointer, state.camera);
    raycaster.ray.intersectPlane(plane, vIntersect);
    vMouse.copy(vIntersect);

    // Ambil waktu global untuk sinkronisasi ombak
    const time = state.clock.getElapsedTime();

    particles.forEach((p, i) => {
      // --- A. BASE MOTION: CALM WAVE (OMBAK TENANG) ---
      // Rumus Sinus: y = sin(waktu + posisi)
      // Ini membuat partikel mengalun naik turun secara alami tanpa input mouse
      
      const waveX = Math.sin(time * 0.5 + p.tOffset) * 0.5; // Gerakan kiri-kanan tipis
      const waveY = Math.cos(time * 0.3 + p.ox * 0.1) * 1.5; // Gerakan naik-turun utama (Ombak)
      const waveZ = Math.sin(time * 0.2 + p.oy * 0.1) * 1.5; // Gerakan depan-belakang (Depth)

      // Target posisi adalah Posisi Asli + Ombak
      let targetX = p.ox + waveX;
      let targetY = p.oy + waveY;
      let targetZ = p.oz + waveZ;

      // --- B. MOUSE INTERACTION: SOFT MAGNET ---
      const dx = vMouse.x - p.x;
      const dy = vMouse.y - p.y;
      const dist = Math.sqrt(dx*dx + dy*dy);

      // Radius pengaruh magnet diperluas agar transisi sangat halus
      const magnetRadius = 12;

      if (dist < magnetRadius) {
        // Kekuatan tarikan (0 di pinggir radius, 1 di tengah)
        const intensity = 1 - dist / magnetRadius;
        
        // Agar tidak menumpuk di tengah (titik mati), kita buat targetnya
        // sedikit berhenti sebelum menyentuh mouse (dist * 0.2)
        // Ini mencegah "clumping" brutal.
        targetX += dx * intensity * 0.8; 
        targetY += dy * intensity * 0.8;
        targetZ += 5 * intensity; // Efek menarik partikel "naik" mendekati layar (Z-axis)
      }

      // --- C. MOVEMENT: LERP (KUNCI KEHALUSAN) ---
      // Rumus: PosisiSekarang += (Target - PosisiSekarang) * FaktorKehalusan
      // Faktor kecil (0.05) = Sangat lambat & mulus (seperti di air)
      // Faktor besar (0.5) = Cepat & responsif
      
      const smoothness = 0.04; // Ubah ini untuk mengatur "kekenyalan" (0.01 - 0.1)

      p.x += (targetX - p.x) * smoothness;
      p.y += (targetY - p.y) * smoothness;
      p.z += (targetZ - p.z) * smoothness;

      // --- D. RENDER ---
      dummy.position.set(p.x, p.y, p.z);
      
      // Scale pulse pelan sesuai ombak
      const scaleWave = p.scale + Math.sin(time * 2 + p.tOffset) * 0.2;
      dummy.scale.setScalar(scaleWave);
      
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      {/* Geometri sangat kecil & halus */}
      <sphereGeometry args={[0.025, 8, 8]} /> 
      {/* Opacity rendah agar terlihat seperti kabut/air */}
      <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
    </instancedMesh>
  );
}