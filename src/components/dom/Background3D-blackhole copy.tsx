"use client";

import { useRef } from "react";
import { Canvas, useFrame, extend, Object3DNode } from "@react-three/fiber";
import { Stars, Float, shaderMaterial } from "@react-three/drei";
import { EffectComposer, Bloom, ToneMapping } from "@react-three/postprocessing";
import * as THREE from "three";

// =========================================================
// MATERIAL ACCRETION DISK - DENGAN L-FOLD
// =========================================================

const AccretionDiskMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorCore: new THREE.Color(30.0, 20.0, 10.0), // Core kuning terang
    uColorInner: new THREE.Color(10.0, 4.0, 0.5),  // Oranye
    uColorOuter: new THREE.Color(2.0, 0.1, 0.0),   // Merah gelap
  },
  // === VERTEX SHADER: LIPATAN "L" dengan Gravitational Lensing ===
  `
    varying vec2 vUv;
    varying float vRadius;
    varying vec3 vWorldPos;
    varying float vBackFactor;
    varying float vDistortion;

    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Radius dari center (0,0)
      float r = length(pos.xy);
      vRadius = r;

      // === LOGIKA LIPATAN "L" dengan Gravitational Distortion ===
      
      // Geser titik lipatan ke belakang (bukan di Y=0, tapi di Y=0.5)
      float foldPoint = 0.5;
      float backAmount = max(0.0, pos.y - foldPoint);
      vBackFactor = smoothstep(0.0, 1.2, backAmount);
      
      // Lipat ke atas dengan kurva yang lebih dramatis
      float foldStrength = 0.6;
      float zLift = pow(backAmount / (r + 0.1), 1.2) * r * foldStrength;
      
      // Gravitational pull: semakin dekat ke pusat, semakin kuat tarikan
      float gravityPull = 4.5 / (r + 0.2);
      zLift *= (1.0 + gravityPull);
      
      // === PENYEMPITAN RING (Gravitational Lensing) ===
      // Ring menyempit di area lipatan untuk simulasi pembelokan cahaya
      float narrowingZone = smoothstep(foldPoint - 0.3, foldPoint + 0.7, pos.y);
      float narrowingAmount = narrowingZone * (1.0 - narrowingZone) * 0.25;
      
      // Tarik pos.xy ke arah center secara radial
      vec2 toCenter = -normalize(pos.xy);
      pos.xy += toCenter * narrowingAmount * r;
      
      vDistortion = narrowingAmount;
      
      pos.z += zLift;

      vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
      vWorldPos = worldPosition.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,
  // === FRAGMENT SHADER: PLASMA SPIRAL ===
  `
    uniform float uTime;
    uniform vec3 uColorCore;
    uniform vec3 uColorInner;
    uniform vec3 uColorOuter;
    varying vec2 vUv;
    varying float vRadius;
    varying vec3 vWorldPos;
    varying float vBackFactor;
    varying float vDistortion;

    // Noise functions
    float hash(float n) { return fract(sin(n) * 43758.5453123); }
    float noise(vec2 x) {
        vec2 p = floor(x);
        vec2 f = fract(x);
        f = f * f * (3.0 - 2.0 * f);
        float n = p.x + p.y * 57.0;
        return mix(mix(hash(n + 0.0), hash(n + 1.0), f.x),
                   mix(hash(n + 57.0), hash(n + 58.0), f.x), f.y);
    }
    float fbm(vec2 p) {
        float f = 0.0;
        f += 0.50000 * noise(p); p = p * 2.02;
        f += 0.25000 * noise(p); p = p * 2.03;
        f += 0.12500 * noise(p); 
        return f;
    }

    void main() {
      vec2 center = vUv - 0.5;
      float r = length(center) * 2.0; 
      float angle = atan(center.y, center.x);

      // Spiral rotation
      float speed = uTime * 0.4;
      float spiral = angle + (4.0 / (r + 0.2)) - speed;

      // Turbulent streaks
      float streaks = fbm(vec2(r * 4.0, spiral * 18.0));
      float plasma = smoothstep(0.25, 0.85, streaks);

      // === GRADIENT BRIGHTNESS: HANYA GARIS DALAM YANG TERANG ===
      // Tentukan zona brightness berdasarkan radius di UV space
      float uvR = length(center) * 2.0; // Normalize ke 0-1
      
      // Inner streaks (0.0 - 0.25): Sangat terang seperti plasma
      float innerStreaks = smoothstep(0.3, 0.0, uvR);
      
      // Middle ring (0.25 - 0.6): Moderate brightness
      float middleRing = smoothstep(0.25, 0.35, uvR) * (1.0 - smoothstep(0.5, 0.7, uvR));
      
      // Outer ring (0.6 - 1.0): Debu redup
      float outerDust = smoothstep(0.6, 1.0, uvR);

      // Color gradient
      float radialMask = smoothstep(0.0, 0.5, 1.0 - uvR);
      vec3 col = mix(uColorOuter, uColorInner, radialMask);
      
      // Core color HANYA untuk garis dalam
      col = mix(col, uColorCore, innerStreaks * plasma * 4.0);
      
      // Apply brightness berdasarkan zona
      float brightnessFactor = innerStreaks * 3.0 + middleRing * 0.8 + (1.0 - outerDust) * 0.2;
      vec3 finalColor = col * (plasma * brightnessFactor + 0.15);

      // Doppler effect (redshift/blueshift)
      float worldX = normalize(vWorldPos).x;
      float doppler = smoothstep(-0.7, 0.7, -worldX); 
      finalColor *= (doppler * 1.3 + 0.4);
      
      // Brightness boost untuk bagian yang terlipat (simulasi pencahayaan)
      finalColor *= (1.0 + vBackFactor * 0.2);
      
      // Brightness boost HANYA di area dalam (inner streaks)
      finalColor *= (1.0 + innerStreaks * 0.8);
      
      // Outer regions fade to dust-like appearance
      finalColor *= (1.0 - outerDust * 0.7);
      
      // Alpha mask untuk edge yang smooth
      float innerFade = smoothstep(0.2, 0.25, uvR);
      float outerFade = 1.0 - smoothstep(0.95, 1.0, uvR);
      float alpha = innerFade * outerFade;
      
      // Outer regions more transparent (dust effect)
      alpha *= (1.0 - outerDust * 0.5);
      
      // Inner streaks lebih opaque
      alpha = max(alpha, innerStreaks * 0.8);

      gl_FragColor = vec4(finalColor, alpha * 0.85);
    }
  `
);

// MATERIAL PHOTON RING dengan Red Glow
const PhotonRingMaterial = shaderMaterial(
  { 
    uColor: new THREE.Color(1.5, 4.0, 8.0), // Biru terang
    uRedGlow: new THREE.Color(8.0, 2.0, 0.5) // Merah glowing
  },
  `varying vec3 vNormal; 
   varying vec3 vViewPosition;
   varying vec3 vWorldPosition;
   void main() { 
     vNormal = normalize(normalMatrix * normal); 
     vec4 mv = modelViewMatrix * vec4(position, 1.0); 
     vViewPosition = -mv.xyz;
     vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
     gl_Position = projectionMatrix * mv; 
   }`,
  `uniform vec3 uColor; 
   uniform vec3 uRedGlow;
   varying vec3 vNormal; 
   varying vec3 vViewPosition;
   varying vec3 vWorldPosition;
   void main() {
     float fresnel = 1.0 - dot(normalize(vViewPosition), vNormal);
     float rim = smoothstep(0.6, 1.0, pow(fresnel, 5.0));
     
     // Red glow di ujung kanan sphere (gravitational redshift area)
     float redZone = smoothstep(-0.5, 1.0, vWorldPosition.x);
     vec3 finalColor = mix(uColor, uRedGlow, redZone * 0.7);
     
     gl_FragColor = vec4(finalColor, rim * 0.9);
   }`
);

extend({ AccretionDiskMaterial, PhotonRingMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      accretionDiskMaterial: Object3DNode<THREE.ShaderMaterial, typeof AccretionDiskMaterial>;
      photonRingMaterial: Object3DNode<THREE.ShaderMaterial, typeof PhotonRingMaterial>;
    }
  }
}

// =========================================================
// BLACK HOLE COMPONENT
// =========================================================

const BlackHole = () => {
  const diskRef = useRef<THREE.ShaderMaterial>(null!);

  useFrame((state, delta) => {
    if (diskRef.current) {
      diskRef.current.uniforms.uTime.value += delta;
    }
  });

  return (
    // ROTASI: Miring kiri untuk efek dramatis
    // X: 0 (Horizontal sejajar dengan kamera)
    // Y: 0
    // Z: 0.3 (Miring kiri agar bentuk L terlihat dari sudut pandang user)
    <group rotation={[0, 0, 0.3]} position={[0, 0, -2]}> 
      
      {/* BLACK HOLE SPHERE */}
      <mesh>
        <sphereGeometry args={[1.4, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* PHOTON RING (Event Horizon Glow) */}
      <mesh scale={[1.03, 1.03, 1.03]}>
        <sphereGeometry args={[1.4, 64, 64]} />
        <photonRingMaterial 
          transparent 
          blending={THREE.AdditiveBlending} 
          side={THREE.BackSide} 
          depthWrite={false}
        />
      </mesh>

      {/* ACCRETION DISK dengan L-FOLD */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        {/* Ring dengan gap lebih besar dari event horizon */}
        <ringGeometry args={[2.0, 5.5, 256, 128]} /> 
        <accretionDiskMaterial
          ref={diskRef}
          side={THREE.DoubleSide} 
          transparent={true}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

// =========================================================
// PARALLAX CAMERA
// =========================================================

function ParallaxCamera() {
  useFrame((state) => {
    const { x, y } = state.pointer;
    // Kamera sejajar horizontal dengan ring, parallax subtle
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, x * 1.2, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, y * 0.8, 0.05);
    state.camera.lookAt(0, 0, -2); // Look at black hole position
  });
  return null;
}

// =========================================================
// MAIN SCENE
// =========================================================

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-black">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 42 }}
        gl={{ antialias: true, powerPreference: "high-performance", alpha: false }}
      >
        <color attach="background" args={["#000000"]} />
        
        <ParallaxCamera />
        
        {/* Starfield */}
        <Stars 
          radius={180} 
          depth={60} 
          count={8000} 
          factor={5} 
          saturation={0.7} 
          fade 
          speed={0.4} 
        />
        
        {/* Subtle float untuk efek "breathing" */}
        <Float speed={0.8} rotationIntensity={0.03} floatIntensity={0.08}>
          <BlackHole />
        </Float>

        {/* Post-processing */}
        <EffectComposer enableNormalPass={false}>
          <Bloom 
            luminanceThreshold={0.6}
            mipmapBlur 
            intensity={1.2}
            radius={0.5} 
          />
          <ToneMapping />
        </EffectComposer>
      </Canvas>
      
      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_65%,#000000_100%)] pointer-events-none" />
    </div>
  );
}