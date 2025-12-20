"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// === SHADER DEFINITION (TETAP SAMA: BIRU/CYAN) ===
const vertexShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying float vNoise;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v) {
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 = v - i + dot(i, C.xxx) ;
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute( permute( permute( 
              i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
            + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                  dot(p2,x2), dot(p3,x3) ) );
  }

  void main() {
    vUv = uv;
    vNormal = normal;
    float noise = snoise(position * 2.0 + uTime * 0.2);
    vNoise = noise;
    vPosition = position;
    vec3 newPosition = position + normal * (noise * 0.05); 
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying float vNoise;

  void main() {
    // --- PALET WARNA BIRU/CYAN ---
    vec3 colorDeep = vec3(0.0, 0.1, 0.3);
    vec3 colorMid = vec3(0.0, 0.4, 0.8);
    vec3 colorHot = vec3(0.4, 0.9, 1.0);
    
    vec3 finalColor = mix(colorDeep, colorMid, vNoise + 0.5);
    finalColor = mix(finalColor, colorHot, vNoise * 1.5);

    float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
    finalColor += vec3(0.1, 0.5, 1.0) * fresnel * 2.5;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function ParticleSystem() {
  const starsRef = useRef<THREE.Group>(null);
  const midLayerRef = useRef<THREE.Group>(null);
  const foregroundRef = useRef<THREE.Group>(null);
  const nebulaRef = useRef<THREE.Group>(null);
  const galaxyCoreRef = useRef<THREE.Mesh>(null);
  const energyWave1Ref = useRef<THREE.Mesh>(null);
  const energyWave2Ref = useRef<THREE.Mesh>(null);

  const sunMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
      },
      side: THREE.FrontSide, 
    });
  }, []);

  useFrame((state) => {
    const { x, y } = state.pointer;
    const time = state.clock.getElapsedTime();

    if (sunMaterial) {
      sunMaterial.uniforms.uTime.value = time;
    }

    // === PERBAIKAN PARALLAX ===
    // Intensitas dikurangi drastis (0.3) agar gerakan lebih tenang
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, -x * 0.3, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, -y * 0.2, 0.05);
    state.camera.lookAt(0, 0, 0);

    // Animasi Layer lainnya tetap sama
    if (starsRef.current) starsRef.current.rotation.z += 0.00005;

    if (nebulaRef.current) {
      nebulaRef.current.position.y = Math.sin(time * 0.3) * 0.15;
      nebulaRef.current.position.x = Math.cos(time * 0.2) * 0.1;
    }

    if (midLayerRef.current) {
      midLayerRef.current.position.y = Math.sin(time * 0.25) * 0.1;
      midLayerRef.current.position.x = Math.cos(time * 0.18) * 0.08;
    }
    if (foregroundRef.current) {
      foregroundRef.current.position.y = Math.sin(time * 0.2) * 0.06;
      foregroundRef.current.position.x = Math.cos(time * 0.15) * 0.04;
    }

    if (galaxyCoreRef.current) {
      galaxyCoreRef.current.rotation.y = time * 0.05; 
    }

    if (energyWave1Ref.current) {
      // Scale disesuaikan karena base sizenya nanti diperbesar
      const scale = 1.1 + Math.sin(time * 1.5) * 0.05;
      energyWave1Ref.current.scale.set(scale, scale, scale);
      energyWave1Ref.current.rotation.z = time * 0.1;
    }
    if (energyWave2Ref.current) {
      const scale = 1.2 + Math.sin(time * 1.0 + 2) * 0.08;
      energyWave2Ref.current.scale.set(scale, scale, scale);
      energyWave2Ref.current.rotation.z = -time * 0.1;
    }
  });

  return (
    <>
      {/* LAYER 1: STARS (Mundur sedikit ke -12) */}
      <group ref={starsRef} position={[0, 0, -15]}>
        <Stars radius={150} depth={80} count={7000} factor={5} saturation={0} fade speed={0.5} />
      </group>

      {/* LAYER 2: NEBULA (Mundur ke -6) */}
      <group ref={nebulaRef} position={[0, 0, -12]}>
        <Sparkles count={100} scale={25} size={8} speed={0} opacity={0.3} color="#8b5cf6" />
        <Sparkles count={80} scale={20} size={6} speed={0} opacity={0.25} color="#3b82f6" />
      </group>

      {/* === GALAXY CORE / SUN === */}
      {/* PERBAIKAN POSISI: Mundur ke -5 (sebelumnya -3) */}
      <group position={[0, 0, -10]}>
        
        {/* MATAHARI UTAMA: Radius diperbesar sedikit (0.9 -> 1.3) agar tetap terlihat jelas walau jauh */}
        <mesh ref={galaxyCoreRef} material={sunMaterial}>
          <sphereGeometry args={[1.3, 64, 64]} /> 
        </mesh>

        {/* ATMOSPHERE GLOW */}
        <mesh>
          <sphereGeometry args={[1.35, 32, 32]} />
          <meshBasicMaterial 
            color="#60a5fa"  
            transparent opacity={0.3} blending={THREE.AdditiveBlending} side={THREE.BackSide}
          />
        </mesh>

        {/* ENERGY WAVES (Ukuran base disesuaikan dengan matahari baru) */}
        {/* <mesh ref={energyWave1Ref}>
          <sphereGeometry args={[1.45, 32, 32]} />
          <meshBasicMaterial 
            color="#3b82f6" 
            transparent opacity={0.15} blending={THREE.AdditiveBlending} wireframe={false} />
        </mesh>
        
        <mesh ref={energyWave2Ref}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshBasicMaterial 
            color="#06b6d4" 
            transparent opacity={0.1} blending={THREE.AdditiveBlending} wireframe={true} />
        </mesh> */}

        {/* SURFACE PARTICLES */}
        <Sparkles count={80} scale={3.5} size={3} speed={0.4} opacity={0.8} color="#cffafe" />
      </group>

      {/* LAYER 3: MID (Mundur sedikit ke -3) */}
      <group ref={midLayerRef} position={[0, 0, -7]}>
        <Sparkles count={150} scale={15} size={2.5} speed={0} opacity={0.4} color="#ffffff" />
      </group>

      {/* LAYER 4: FOREGROUND (Tetap di 0) */}
      <group ref={foregroundRef} position={[0, 0, 0]}>
        <Sparkles count={80} scale={8} size={4} speed={0} opacity={0.7} color="#ffffff" />
        <Sparkles count={30} scale={6} size={5} speed={0} opacity={0.8} color="#818cf8" />
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
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#000000", 5, 25]} />
        <ParticleSystem />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,20,0.8)_70%,#000000_100%)] opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03)_0%,transparent_50%)]" />
    </div>
  );
}