"use client";

import { useRef, useMemo, useLayoutEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";
import * as THREE from "three";

// ==========================================
// 1. KOMPONEN BATU CINCIN (Rusty/Reddish Rocks)
// ==========================================
const RustyRockRing = ({ count = 15000 }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Geometri: Tetap Icosahedron tajam
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(0.012, 0), []);

  // Material: Kita pakai warna dasar putih, warnanya nanti diatur per-instance (per batu)
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    roughness: 0.9,
    metalness: 0.2, // Sedikit lebih metalik (seperti bijih besi)
    flatShading: true
  }), []);

  useLayoutEffect(() => {
    if (!meshRef.current) return;

    const innerRadius = 2.1;
    const outerRadius = 4.0; 

    // Palet Warna Batu (Variasi Karat)
    const color1 = new THREE.Color("#8B4513"); // Saddle Brown (Karat tua)
    const color2 = new THREE.Color("#cd5c5c"); // Indian Red (Merah pudar)
    const color3 = new THREE.Color("#555555"); // Abu gelap (Batu biasa)
    const tempColor = new THREE.Color();

    for (let i = 0; i < count; i++) {
      // 1. Posisi
      const angle = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * (outerRadius - innerRadius) + innerRadius;
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      const y = (Math.random() - 0.5) * 0.1; // Tetap tipis

      // 2. Skala & Rotasi
      const scale = 0.4 + Math.random() * 1.8; 
      dummy.position.set(x, y, z);
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // 3. WARNA RANDOM (Mix batu karat & batu biasa)
      const randomVal = Math.random();
      if (randomVal > 0.6) tempColor.copy(color1);      // 40% Karat Tua
      else if (randomVal > 0.3) tempColor.copy(color2); // 30% Merah Pudar
      else tempColor.copy(color3);                      // 30% Abu biasa
      
      // Sedikit variasi brightness agar tidak flat
      tempColor.multiplyScalar(0.8 + Math.random() * 0.4); 
      meshRef.current.setColorAt(i, tempColor);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  }, [count, dummy]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y -= delta * 0.05; 
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, material, count]} castShadow receiveShadow />
  );
};

// ==========================================
// 2. KOMPONEN BULAN (Red Tinted)
// ==========================================
const RedMoon = () => {
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
        bumpScale={0.08} // Kawah lebih dalam
        roughness={1}
        metalness={0.1}
        color="#ffaa88" // TINT MERAH/ORANYE pada tekstur asli
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
      {/* Lighting: Warm / Sunset Tone */}
      <ambientLight intensity={0.15} color="#553333" /> {/* Shadow agak merah gelap */}
      
      <directionalLight 
        position={[8, 3, 5]} 
        intensity={3.0} 
        color="#ffddcc" // Cahaya Matahari agak hangat/oranye
        castShadow 
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
        shadow-normalBias={0.05}
      />
      
      {/* Rim Light Merah menyala dari belakang bawah */}
      <spotLight position={[-5, -5, -2]} intensity={5} color="#ff4500" distance={20} />

      <group ref={starsRef} position={[0, 0, -10]}>
        <Stars radius={150} depth={80} count={5000} factor={4} saturation={1} fade speed={0.5} />
      </group>

      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
        <group position={[0, 0, -5]} rotation={[0.4, 0, 0.2]}> 
          <RedMoon />
          <RustyRockRing count={15000} />
        </group>
      </Float>
    </>
  );
}

export default function Background3D() {
  return (
    <div className="fixed top-0 left-0 w-full h-[100vh] sm:h-[100lvh] z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 60 }}
        dpr={[1, 2]} 
        shadows
        gl={{ 
          antialias: true, 
          alpha: true, 
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1
        }}
      >
        {/* Background color gelap kemerahan */}
        <color attach="background" args={["#080202"]} />
        {/* Kabut merah tebal di kejauhan */}
        <fog attach="fog" args={["#1a0505", 5, 25]} />
        
        <SceneContent />
      </Canvas>
      
      {/* Overlay Gradient juga disesuaikan ke merah/hangat */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,0,0,0.8)_70%,#000000_100%)] opacity-80" />
    </div>
  );
}