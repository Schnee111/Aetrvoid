"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/dom/Navbar";
import Hero from "@/components/sections/Hero";
import TechStack from "@/components/sections/TechStack";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import StatsRadar from "@/components/sections/StatsRadar";
import Footer from "@/components/dom/Footer";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Lazy Load Backgrounds
const backgroundMap = {
  blackhole: dynamic(() => import("@/components/dom/Background3D-blackhole")),
  moon: dynamic(() => import("@/components/dom/Background3D-moon")),
  redmoon: dynamic(() => import("@/components/dom/Background3D-redmoon")),
  ori: dynamic(() => import("@/components/dom/Background3D-ori")),
  nebula: dynamic(() => import("@/components/dom/Background3D-nebula")),
};

export default function Home() {
  const [activeBG, setActiveBG] = useState<keyof typeof backgroundMap>("redmoon");
  const ActiveBackground = backgroundMap[activeBG];

  // --- SETUP PARALLAX PROJECTS ---
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"] 
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "75%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.3, 1.0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // --- SETUP PARALLAX: STATS
  const statsRef = useRef(null);
  const { scrollYProgress: statsScroll } = useScroll({
    target: statsRef,
    offset: ["start end", "end start"] 
  });

  const yStats = useTransform(statsScroll, [0, 1], ["-10%", "20%"]); 
  const scaleStats = useTransform(statsScroll, [0, 1], [1.2, 1.0]);
  const opacityStats = useTransform(statsScroll, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

  return (
    <main className="relative w-full min-h-screen bg-black text-white font-sans selection:bg-white/30">
      
      {/* Background 3D Global */}
      <ActiveBackground />
      <Navbar onBGChange={setActiveBG} currentBG={activeBG} />
      
      <section id="about">
        <Hero />
      </section>

      {/* TechStack */}
      <section id="tech" className="relative z-20">
        <TechStack />
      </section>

      {/* === SECTION PROJECTS === */}\
      <div id="projects" ref={containerRef} className="relative z-20 w-full bg-black -mt-[20vh]">
        
        {/* WRAPPER PARALLAX IMAGE */}
        <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.div
              style={{ y, scale, opacity }}
              className="relative w-full h-[90vh] -bottom-[20vh]" // Height extra & posisi ditarik ke atas
            >
                {/* GAMBAR */}
                <div 
                   className="w-full h-full"
                   style={{
                       // Masking Ganda: Atas memudar (nyambung ke TechStack), Bawah memudar (nyambung ke Stats)
                      maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 55%, transparent 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 55%, transparent 100%)'
                   }}
                >
                   <img
                     src="/images/angel.jpg"
                     alt="Background"
                     className="w-full h-full object-cover object-top opacity-80 blur-[2.5px]" 
                   />
                </div>
                {/* Overlay Gelap Tambahan */}
                <div className="absolute inset-0 bg-black/40" />
            </motion.div>
        </div>

        {/* 1. Atas: Nyambung ke TechStack */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black via-black/80 to-transparent z-10 pointer-events-none" />
        
        {/* 2. Bawah: Nyambung ke Stats */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none" />


        {/* KONTEN UTAMA */}
        <div className="relative z-20 pb-24 pt-24">
          <Projects />
        </div>

      </div>

      {/* =========================================== */}

      <div id="timeline" className="relative z-20 bg-black">
        <Experience />
      </div>

      {/* =========================================== */}

      {/* Section Stats */}
      <div id="stats" ref={statsRef} className="relative z-20 py-40 overflow-hidden min-h-[90vh] flex items-center bg-black">
        
        {/* PARALLAX IMAGE STATS */}
        <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.div
              style={{ y: yStats, scale: scaleStats, opacity: opacityStats }}
              className="relative w-full h-[100vh] -bottom-[10vh]"
            >
               {/* MASKING IMAGE */}
               <div 
                   className="w-full h-full"
                   style={{
                      // Masking halus di atas dan bawah agar menyatu dengan background hitam
                      maskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)'
                   }}
                >
                   {/* GANTI GAMBAR DISINI: Gunakan gambar sci-fi/tech/grid */}
                   <img
                     src="/images/slay.jpg" 
                     alt="Stats Background"
                     className="w-full h-full object-cover opacity-60 blur-[2px]" 
                   />
                </div>

                {/* Overlay Gelap Tambahan (Agar Radar Chart terlihat jelas) */}
                <div className="absolute inset-0 bg-black/50" />
            </motion.div>
        </div>

        {/* Gradient Connector Atas (Nyambung ke Timeline) */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />

        {/* Content */}
        <div className="relative z-20 container mx-auto flex justify-center">
          <StatsRadar />
        </div>
        
        {/* Gradient Connector Bawah (Nyambung ke Footer) */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

      </div>

      <section id="contact">
        <Footer />
      </section>

    </main>
  );
}