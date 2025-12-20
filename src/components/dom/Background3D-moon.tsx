"use client";

import { useRef, useMemo, useLayoutEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";
import * as THREE from "three";

// ==========================================
// 1. KOMPONEN BATU CINCIN (High Density & Correct Shadows)
// ==========================================
const RockRing = ({ count = 15000 }) => { // NAIKKAN JUMLAH JADI 15.000
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Geometri: Icosahedron detail 0 (Low Poly tajam)
  // Radius sedikit divariasikan lewat scale nanti
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(0.012, 0), []);

  // Material: 
  // - Warna lebih gelap (#555) agar saat kena cahaya terang tidak "washed out"
  // - Roughness tinggi (bebatuan tidak mengkilap)
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#555555', 
    roughness: 0.9,
    metalness: 0.1,
    flatShading: true // Penting agar bayangan tegas di sisi-sisi batu
  }), []);

  useLayoutEffect(() => {
    if (!meshRef.current) return;

    // CONFIG RING: LEBIH RAPAT
    const innerRadius = 3.2; // Mulai tepat setelah bulan
    const outerRadius = 5.5; // Jangan terlalu jauh (sebelumnya 4.5) -> Lebih padat

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      
      // Distribusi jarak: Gunakan akar kuadrat agar kepadatan merata
      // (Jika random biasa, bagian dalam akan terlihat lebih padat dari luar)
      const r = Math.sqrt(Math.random()) * (outerRadius - innerRadius) + innerRadius;

      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      
      // Sebaran vertikal SANGAT TIPIS agar terlihat solid seperti cincin Saturnus
      const y = (Math.random() - 0.5) * 0.08; 

      // Variasi ukuran: Ada debu kecil, ada batu sedang
      const scale = 0.4 + Math.random() * 1.8; 

      dummy.position.set(x, y, z);
      // Rotasi random total agar pantulan cahaya tiap batu beda
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      dummy.scale.set(scale, scale, scale);
      
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [count, dummy]);

  // Rotasi cincin pelan
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y -= delta * 0.04; 
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, material, count]} castShadow receiveShadow />
  );
};

// ==========================================
// 2. KOMPONEN BULAN (Real Texture)
// ==========================================
const RealisticMoon = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  const [colorMap, bumpMap] = useLoader(THREE.TextureLoader, [
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg' 
  ]);

  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.001;
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <sphereGeometry args={[1.3, 64, 64]} />
      <meshStandardMaterial 
        map={colorMap} 
        bumpMap={bumpMap}
        bumpScale={0.06}
        roughness={0.9} // Bulan itu kasar, tidak memantulkan cahaya seperti plastik
        metalness={0}
        color="#d1d5db" // Abu-abu terang (Tailwind gray-300)
      />
    </mesh>
  );
};

// ==========================================
// 3. MAIN SCENE
// ==========================================
function SceneContent() {
  const starsRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const { x, y } = state.pointer;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, -x * 0.4, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, -y * 0.4, 0.05);
    state.camera.lookAt(0, 0, 0);

    if (starsRef.current) starsRef.current.rotation.z += 0.00005;
  });

  return (
    <>
      {/* --- LIGHTING FIX UNTUK BAYANGAN --- */}
      {/* Ambient redup untuk mengisi sisi gelap (agar tidak hitam total) */}
      <ambientLight intensity={0.08} color="#ffffff" />
      
      {/* Cahaya Matahari Utama */}
      <directionalLight 
        position={[5, 3, 4]} // Posisi miring agar tekstur kawah & batu terlihat
        intensity={3} 
        castShadow 
        shadow-mapSize={[2048, 2048]} // Resolusi bayangan tinggi
        shadow-bias={-0.0001}        // Mencegah shadow acne (garis-garis aneh)
        shadow-normalBias={0.05}     // KUNCI: Membuat bayangan pada objek melengkung/kecil akurat
      />
      
      {/* Rim Light (Biru tipis dari belakang untuk efek sinematik) */}
      <spotLight position={[-10, 0, -5]} intensity={2} color="#2563eb" distance={20} />

      {/* Bintang Background */}
      <group ref={starsRef} position={[0, 0, -15]}>
        <Stars radius={90} depth={80} count={10000} factor={4} saturation={0} fade speed={0.5} />
      </group>

      {/* Objek Utama */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
        <group position={[0, 0, -5]} rotation={[0.4, 0, 0.2]}> 
          <RealisticMoon />
          <RockRing count={15000} />
        </group>
      </Float>
    </>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 60 }}
        dpr={[1, 2]} 
        shadows // WAJIB AKTIF
        gl={{ 
          antialias: true, 
          alpha: true, 
          // Tone mapping agar area terang tidak "gosong" (terlalu putih)
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0
        }}
      >
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 5, 25]} />
        <SceneContent />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_70%,#000000_100%)] opacity-80" />
    </div>
  );
}