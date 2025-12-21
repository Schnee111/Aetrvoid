"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/dom/Navbar";
import Hero from "@/components/sections/Hero";
import TechStack from "@/components/sections/TechStack";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import StatsRadar from "@/components/sections/StatsRadar";
import Footer from "@/components/dom/Footer";
import { useState } from "react";

// 1. Lazy Load Backgrounds (Menghindari Bentrok & Hemat RAM)
const backgroundMap = {
  blackhole: dynamic(() => import("@/components/dom/Background3D-blackhole")),
  moon: dynamic(() => import("@/components/dom/Background3D-moon")),
  redmoon: dynamic(() => import("@/components/dom/Background3D-redmoon")),
  ori: dynamic(() => import("@/components/dom/Background3D-ori")),
  nebula: dynamic(() => import("@/components/dom/Background3D-nebula")),
};

// Lazy load Scene 3D
const Scene = dynamic(() => import("@/components/canvas/Scene"), { 
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black" />
});

export default function Home() {
  const [activeBG, setActiveBG] = useState<keyof typeof backgroundMap>("redmoon");
  const ActiveBackground = backgroundMap[activeBG];

  return (
    <main className="relative w-full min-h-screen bg-black text-white font-sans selection:bg-white/30">
      
      <ActiveBackground />
      
      <Navbar onBGChange={setActiveBG} currentBG={activeBG} />
      {/* <Scene /> */}

      
      {/* Section 1: Intro */}
      <section id="about">
        <Hero />
      </section>

      {/* Section 2: Tools (Bento Grid) */}
      <section id="tech" className="relative z-20">
        <TechStack />
      </section>

      {/* Section 3: Projects di page.tsx */}
      <div id="projects" className="relative z-20 w-full min-h-screen"> 
        
        {/* LAYER 1: Backdrop Blur */}
        <div 
          className="absolute top-0 left-0 w-full h-[100vh] backdrop-blur z-0 pointer-events-none"
          style={{ 
            maskImage: 'linear-gradient(to bottom, black 0%, transparent 80%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 80%)'
          }} 
        />

        {/* LAYER 2: THE MAGIC FIX - Single Continuous Gradient */}
        <div 
          className="absolute inset-0 -z-10"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 50vh, #000000 85vh, #000000 100%)'
          }}
        />

        {/* LAYER 3: Konten Proyek */}
        <div className="relative z-10">
          <Projects />
        </div>

      </div>

      {/* Section 4: Experience / Contact (Berdasarkan footer) */}
      <div id="timeline" className="relative z-20 bg-black">
        <Experience />
      </div>

      {/* Section 5: Stats (Radar Chart) */}
      <div id="stats" className="relative z-20 py-40 overflow-hidden min-h-[80vh] flex items-center">
        
        {/* LAYER 1: Background Gelap Dasar */}
        <div className="absolute inset-0 bg-black/80 z-0" />

        {/* LAYER 2: Grid Pattern Overlay (Ini pembedanya!) */}
        {/* Memberikan kesan 'Technical' atau 'Ruang Simulasi' */}
        {/* <div className="absolute inset-0 bg-grid-white bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] z-0 opacity-50" /> */}

        {/* LAYER 3: Spotlight Effect (Opsional) */}
        {/* Memberikan sorotan cahaya di tengah radar */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

        {/* Konten Utama */}
        <div className="relative z-20 container mx-auto flex justify-center">
          <StatsRadar />
        </div>
      </div>

      {/* Section 6: Footer */}
      <section id="contact">
        <Footer />
      </section>

    </main>
  );
}