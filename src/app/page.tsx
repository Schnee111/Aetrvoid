"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/dom/Navbar";
import Hero from "@/components/sections/Hero";
import TechStack from "@/components/sections/TechStack";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import StatsRadar from "@/components/sections/StatsRadar";
import Footer from "@/components/dom/Footer";
import { useRef, useState, useEffect } from "react";
import Image from "next/image"; 
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

// Lazy Load Backgrounds
const backgroundMap = {
  blackhole: dynamic(() => import("@/components/dom/Background3D-blackhole")),
  moon: dynamic(() => import("@/components/dom/Background3D-moon")),
  redmoon: dynamic(() => import("@/components/dom/Background3D-redmoon")),
  ori: dynamic(() => import("@/components/dom/Background3D-ori")),
  nebula: dynamic(() => import("@/components/dom/Background3D-nebula")),
};

export default function Home() {
  const isMobile = useIsMobile();
  const [activeBG, setActiveBG] = useState<keyof typeof backgroundMap>("ori");
  const [showBackground, setShowBackground] = useState(true);
  const ActiveBackground = backgroundMap[activeBG];

  // Set default background berdasarkan device
  useEffect(() => {
    setActiveBG(isMobile ? "ori" : "moon");
  }, [isMobile]);

  // UNMOUNT Background saat scroll keluar dari Hero
  const heroRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Jika Hero section tidak terlihat (intersecting = false), unmount background
          setShowBackground(entry.isIntersecting);
        });
      },
      { threshold: 0.1 } // Trigger saat 10% Hero masih terlihat
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  // --- SETUP PARALLAX PROJECTS ---
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"] 
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "75%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.3, 1.0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // --- SETUP PARALLAX: footer ---
  const footerRef = useRef(null);
  const { scrollYProgress: footerScroll } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const yFooter = useTransform(footerScroll, [0, 1], ["-20%", "0%"]); 
  const opacityFooter = useTransform(footerScroll, [0, 0.3, 0.8, 1], [0, 1, 1, 0.6]);

  return (
    <main className="relative w-full min-h-screen bg-black text-white font-sans selection:bg-white/30">
      
      <Navbar onBGChange={setActiveBG} currentBG={activeBG} />
      
      <section id="about" ref={heroRef} className="relative">
        {/* Background 3D - HANYA RENDER SAAT TERLIHAT */}
        {showBackground && <ActiveBackground />}
        <Hero />
      </section>

      {/* TechStack */}
      <section id="tech" className="relative z-20 pb-32">
        <TechStack />
      </section>

      {/* === SECTION PROJECTS === */}
      <div id="projects" ref={containerRef} className="relative z-20 w-full bg-black -mt-[20vh]">
        
        <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.div
              style={{ y, scale, opacity, willChange: "transform", backfaceVisibility: "hidden" }}
              className="relative w-full h-[90vh] sm:h-[90lvh] -bottom-[20vh]" 
            >
                <div 
                   className="w-full h-full transform-gpu"
                   style={{
                      maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 55%, transparent 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 55%, transparent 100%)'
                   }}
                >
                   <video
                     autoPlay
                     loop
                     muted
                     playsInline
                     poster="/images/angel-preview.jpg"
                     className="w-full h-full object-cover"
                   >
                     <source src="/videos/bg-video.mp4" type="video/mp4" />
                   </video>
                </div>
                
                <div className="absolute inset-0 bg-black/50" />
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
      <div id="stats" className="relative z-20 py-20 bg-black flex items-center justify-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
        
        <div className="relative z-10 container mx-auto flex justify-center">
          <StatsRadar />
        </div>
      </div>

      <section id="contact" ref={footerRef} className="relative z-20 min-h-[80vh] flex items-end bg-black overflow-hidden">
        
        {/* PARALLAX VIDEO GARGANTUA */}
        <div className="absolute inset-0 z-0">
            <motion.div
              style={{ y: yFooter, opacity: opacityFooter, willChange: "transform" }}
              className="relative w-full h-[100%]"
            >
               <div 
                   className="w-full h-full transform-gpu"
                   style={{
                      maskImage: 'linear-gradient(to bottom, transparent 10%, black 40%, black 90%, black 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, transparent 10%, black 40%, black 90%, black 100%)'
                   }}
                >
                   <video
                     autoPlay
                     loop
                     muted
                     playsInline
                     poster="/images/gargantua-preview.jpg" 
                     className="w-full h-full object-cover opacity-90"
                   >
                     <source src="/videos/gargantua.mp4" type="video/mp4" />
                   </video>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </motion.div>
        </div>

        {/* COMPONENT FOOTER */}
        <div className="relative z-10 w-full">
            <Footer />
        </div>

      </section>

    </main>
  );
}