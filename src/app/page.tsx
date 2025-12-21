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
// 1. IMPORT IMAGE DARI NEXT
import Image from "next/image"; 
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

      {/* === SECTION PROJECTS === */}
      <div id="projects" ref={containerRef} className="relative z-20 w-full bg-black -mt-[20vh]">
        
        <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.div
              style={{ y, scale, opacity, willChange: "transform", backfaceVisibility: "hidden" }}
              className="relative w-full h-[90vh] sm:h-[90lvh] -bottom-[20vh]" 
            >
                {/* CONTAINER VIDEO */}
                <div 
                   className="w-full h-full transform-gpu"
                   style={{
                      // Masking tetap dipakai agar transisi atas-bawah mulus
                      maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 55%, transparent 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 55%, transparent 100%)'
                   }}
                >
                   {/* PENTING: Tag Video HTML5 
                      - autoPlay loop muted: Wajib agar jalan otomatis.
                      - playsInline: WAJIB UNTUK IPHONE (kalau tidak, video akan fullscreen otomatis).
                      - poster: Gambar thumbnail ringan yang muncul duluan sebelum video selesai loading (biar tidak blank hitam).
                   */}
                   <video
                     autoPlay
                     loop
                     muted
                     playsInline
                     poster="/images/angel-preview.jpg" // Opsional: Buat screenshot frame pertama video
                     className="w-full h-full object-cover opacity-80"
                   >
                     {/* Ganti path sesuai lokasi video Anda */}
                     <source src="/videos/bg-video.mp4" type="video/mp4" />
                   </video>
                </div>
                
                {/* Overlay tetap diperlukan agar teks di atasnya terbaca */}
                <div className="absolute inset-0 bg-black/40" />
            </motion.div>
        </div>

        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black via-black/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none" />

        <div className="relative z-20 pb-24 pt-24">
          <Projects />
        </div>

      </div>

      <div id="timeline" className="relative z-20 bg-black">
        <Experience />
      </div>

      {/* Section Stats */}
      {/* Section Stats */}
      <div id="stats" ref={statsRef} className="relative z-20 py-40 overflow-hidden min-h-[90vh] flex items-center bg-black">
        
        {/* PARALLAX VIDEO STATS */}
        <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.div
              style={{ 
                  y: yStats, 
                  scale: scaleStats, 
                  opacity: opacityStats, 
                  willChange: "transform", 
                  backfaceVisibility: "hidden" 
              }}
              className="relative w-full h-[100vh] sm:h-[100lvh] -bottom-[10vh]"
            >
               {/* MASKING CONTAINER */}
               <div 
                   className="w-full h-full transform-gpu"
                   style={{
                      maskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)'
                   }}
                >
                   {/* VIDEO TAG HTML5 */}
                   <video
                     autoPlay
                     loop
                     muted
                     playsInline
                     // Poster wajib ada agar tidak "blink" hitam saat loading
                     poster="/images/gargantua-preview.jpg" 
                     className="w-full h-full object-cover"
                   >
                     {/* Ganti path video sesuai lokasi file Anda */}
                     <source src="/videos/gargantua.mp4" type="video/mp4" />
                   </video>
                </div>

                <div className="absolute inset-0 bg-black/70" />
            </motion.div>
        </div>

        {/* Gradient Connector Atas */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />

        {/* Content Radar */}
        <div className="relative z-20 container mx-auto flex justify-center">
          <StatsRadar />
        </div>
        
        {/* Gradient Connector Bawah */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

      </div>

      <section id="contact">
        <Footer />
      </section>

    </main>
  );
}