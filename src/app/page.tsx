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
      <section id="tech">
        <TechStack />
      </section>

      {/* Section 3: Projects (Sticky Scroll) */}
      <div id="projects" className="relative z-20 bg-black"> 
        <Projects />
      </div>

      {/* Section 4: Experience / Contact (Berdasarkan footer) */}
      <div id="timeline" className="relative z-20 bg-black">
        <Experience />
      </div>

      {/* Section 5: Stats (Radar Chart) */}
      <div id="stats" className="relative z-20 bg-white/5 backdrop-blur border-t border-white/10 py-16 md:py-24">
        <StatsRadar />
      </div>

      {/* Section 6: Footer */}
      <section id="contact">
        <Footer />
      </section>

    </main>
  );
}