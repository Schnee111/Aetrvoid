"use client";

import { useRef } from "react";
// FIX: Hapus Object3DNode dari import
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { Stars, Float, shaderMaterial } from "@react-three/drei";
import { EffectComposer, Bloom, ToneMapping } from "@react-three/postprocessing";
import * as THREE from "three";

// =========================================================
// 1. MATERIAL REALISTIC DUSTY DISK
// =========================================================

const RealisticDustyDiskMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorHot: new THREE.Color(12.0, 5.0, 1.0),
    uColorMid: new THREE.Color(1.5, 0.4, 0.1),
    uColorOuter: new THREE.Color(0.1, 0.02, 0.0),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform vec3 uColorHot;
    uniform vec3 uColorMid;
    uniform vec3 uColorOuter;
    varying vec2 vUv;

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
        f += 0.50000 * noise(p); p = p * 2.52; 
        f += 0.25000 * noise(p); p = p * 2.53;
        f += 0.12500 * noise(p); p = p * 2.51;
        f += 0.06250 * noise(p); 
        return f;
    }

    void main() {
      vec2 center = vUv - 0.5;
      float r = length(center) * 2.0; 
      float angle = atan(center.y, center.x);

      float speed = uTime * 0.15;
      float spiral = angle + (4.0 / (r + 0.1)) - speed;

      float dust = fbm(vec2(r * 15.0, spiral * 8.0));
      float dustOcclusion = smoothstep(0.3, 0.7, dust);

      float falloff = pow(1.0 - smoothstep(0.2, 1.0, r), 6.0);
      float combinedIntensity = falloff * (0.2 + 0.8 * dustOcclusion);

      vec3 finalColor;
      
      if (combinedIntensity > 0.4) {
         finalColor = mix(uColorMid, uColorHot, smoothstep(0.4, 1.0, combinedIntensity));
      } else {
         finalColor = mix(uColorOuter, uColorMid, smoothstep(0.0, 0.4, combinedIntensity));
         finalColor *= (0.5 + 0.5 * dustOcclusion);
      }

      float alpha = smoothstep(0.19, 0.21, r) * (1.0 - smoothstep(0.9, 1.0, r));
      alpha *= smoothstep(0.0, 0.8, combinedIntensity + 0.3);

      gl_FragColor = vec4(finalColor, alpha);
    }
  `
);

// Material Photon Ring
const PhotonRingMaterial = shaderMaterial(
  { uColor: new THREE.Color(4.0, 6.0, 10.0) },
  `varying vec3 vNormal; varying vec3 vViewPosition;
   void main() { vNormal = normalize(normalMatrix * normal); vec4 mv = modelViewMatrix * vec4(position, 1.0); vViewPosition = -mv.xyz; gl_Position = projectionMatrix * mv; }`,
  `uniform vec3 uColor; varying vec3 vNormal; varying vec3 vViewPosition;
   void main() {
     float fresnel = 1.0 - dot(normalize(vViewPosition), vNormal);
     float rim = smoothstep(0.6, 1.0, pow(fresnel, 5.0));
     gl_FragColor = vec4(uColor, rim);
   }`
);

extend({ RealisticDustyDiskMaterial, PhotonRingMaterial });

// FIX: Gunakan 'any' untuk melewati error TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      realisticDustyDiskMaterial: any;
      photonRingMaterial: any;
    }
  }
}

// =========================================================
// 2. BLACK HOLE COMPONENT
// =========================================================

const BlackHole = () => {
  const matRef = useRef<THREE.ShaderMaterial>(null!);

  useFrame((state, delta) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value += delta;
    }
  });

  return (
    <group>
      {/* Bola Hitam */}
      <mesh>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Photon Ring */}
      <mesh scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[1.5, 64, 64]} />
        {/* @ts-ignore */}
        <photonRingMaterial 
          transparent blending={THREE.AdditiveBlending} 
          side={THREE.BackSide} depthWrite={false}
        />
      </mesh>

      {/* Dusty Accretion Disk */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.6, 6.5, 128]} /> 
        {/* @ts-ignore */}
        <realisticDustyDiskMaterial
          ref={matRef}
          side={THREE.DoubleSide}
          transparent={true}
          blending={THREE.NormalBlending} 
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

// =========================================================
// 3. MAIN SCENE
// =========================================================

function ParallaxCamera() {
  useFrame((state) => {
    const { x, y } = state.pointer;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, x * 1.5, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 2.5 + (y * 0.5), 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Background3D() {
  return (
    <div className="fixed top-0 left-0 w-full h-[100vh] sm:h-[100lvh] z-0 pointer-events-none bg-black">
      <Canvas
        camera={{ position: [0, 2.5, 9], fov: 45 }}
        gl={{ 
          antialias: false, 
          powerPreference: "high-performance", 
          alpha: false,
          toneMapping: THREE.NoToneMapping 
        }}
      >
        <color attach="background" args={["#000000"]} />
        
        <ParallaxCamera />
        <Stars radius={150} depth={50} count={6000} factor={4} saturation={0} fade speed={0.5} />
        
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.1}>
          <BlackHole />
        </Float>

        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={1.0} mipmapBlur intensity={1.5} radius={0.4} />
          {/* @ts-ignore */}
          <ToneMapping />
        </EffectComposer>
      </Canvas>
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_60%,#000000_100%)]" />
    </div>
  );
}