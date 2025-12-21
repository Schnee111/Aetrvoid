"use client";

import React from "react"; // Hapus useState
// 1. Import useMotionValue & useMotionTemplate
import { motion, Variants, useMotionValue, useMotionTemplate } from "framer-motion";
import { 
  SiPython, SiPytorch, SiNextdotjs, SiReact, 
  SiSolidity, SiDocker, SiGit, SiFastapi
} from "@icons-pack/react-simple-icons";
import { Zap, Ghost, Coffee, Cpu, Network, Bug } from "lucide-react";

// --- DATA: VOID ARSENAL ---
const voidArsenal = [
  { name: "Python", icon: SiPython, lore: "The Ancient Serpent Speak", tier: "Legendary", color: "group-hover:text-blue-400" },
  { name: "PyTorch", icon: SiPytorch, lore: "Neural Neuron Weaver", tier: "Mythic", color: "group-hover:text-orange-500" },
  { name: "Next.js", icon: SiNextdotjs, lore: "Dimensional Portal Smith", tier: "S-Rank", color: "group-hover:text-white" },
  { name: "React", icon: SiReact, lore: "Component Necromancy", tier: "A-Rank", color: "group-hover:text-cyan-400" },
  { name: "FastAPI", icon: SiFastapi, lore: "Supersonic Delivery Spell", tier: "B-Rank", color: "group-hover:text-teal-400" },
  { name: "Solidity", icon: SiSolidity, lore: "Unbreakable Contract", tier: "Relic", color: "group-hover:text-gray-300" },
  { name: "Docker", icon: SiDocker, lore: "Reality Containment Box", tier: "Artifact", color: "group-hover:text-blue-500" },
  { name: "Git", icon: SiGit, lore: "Time Traveler's Save Point", tier: "Essential", color: "group-hover:text-red-500" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

export default function TechStack() {
  // 2. GANTI STATE DENGAN MOTION VALUE (Ringan, Bypass React Render Cycle)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    // Update value langsung ke DOM tanpa re-render komponen
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  return (
    <section 
        className="relative z-10 py-24 md:py-40 bg-black overflow-hidden"
        onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_60%,transparent)]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-0 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-20 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 font-mono text-[10px] text-gray-500 uppercase tracking-[0.5em]"
          >
            <span>Arsenal of the Void</span>
          </motion.div>
          
          <motion.h3 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-4xl md:text-6xl font-medium text-white tracking-tighter"
          >
            Constructing <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white">Digital</span> 
            <br />
            <span className="text-amber-500 italic">Realities.</span>
          </motion.h3>
        </div>

        {/* GRID SECTION */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {voidArsenal.map((item, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="group relative h-36 md:h-40 rounded-2xl bg-black/80 md:bg-black/20 border border-white/10 overflow-hidden hover:bg-white/[0.03] transition-colors duration-300 backdrop-blur-none md:backdrop-blur-md"
            >
              {/* 3. OPTIMASI SPOTLIGHT:
                  - hidden md:block: Sembunyikan total di mobile (Hemat GPU)
                  - useMotionTemplate: Update style langsung via GPU tanpa lewat React JS thread
              */}
              <motion.div 
                className="hidden md:block pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300"
                style={{
                    background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.06), transparent 40%)` 
                }}
               />
               
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 border border-amber-500/30 rounded-2xl transition-opacity duration-500" />
              
              <div className="relative h-full p-4 md:p-6 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                    <div className={`p-2 md:p-3 rounded-xl bg-black/50 border border-white/10 group-hover:border-amber-500/20 transition-all duration-300 ${item.color} text-gray-400`}>
                        <item.icon className="w-5 h-5 md:w-7 md:h-7" />
                    </div>
                    <span className="text-[8px] md:text-[9px] font-mono text-gray-600 uppercase tracking-widest group-hover:text-amber-500 transition-colors">
                        [{item.tier}]
                    </span>
                </div>

                <div>
                  <h4 className="text-sm md:text-lg font-base text-white mb-1 group-hover:translate-x-1 transition-transform duration-300">
                    {item.name}
                  </h4>
                  <div className="overflow-hidden h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                      <p className="text-[9px] md:text-[10px] text-amber-500/80 font-mono pt-1 leading-tight">
                        &gt; {item.lore}
                      </p>
                  </div>
                  <div className="group-hover:hidden transition-all duration-300">
                      <div className="h-0.5 w-6 md:w-8 bg-white/10 mt-2" />
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 right-0 p-2 md:p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Network size={10} className="md:w-3 md:h-3 text-amber-500/40" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* FOOTER STATS */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-12 md:mt-20 border-t border-white/5 pt-6 md:pt-8 flex flex-wrap justify-center md:justify-between gap-4 md:gap-6 text-gray-600 font-mono text-[9px] md:text-[10px] uppercase tracking-widest"
        >
            <div className="flex items-center gap-2 hover:text-[#B7E4C7] transition-colors cursor-crosshair">
                <Coffee size={12} className="md:w-[14px] md:h-[14px]" /> 
                <span>Matcha: <span className="text-white">88%</span></span>
            </div>
            <div className="hidden md:block w-px h-3 bg-white/10" />
            <div className="flex items-center gap-2 hover:text-rose-400 transition-colors cursor-crosshair">
                <Ghost size={12} className="md:w-[14px] md:h-[14px]" /> 
                <span>Sanity: <span className="text-white">Crit</span></span>
            </div>
            <div className="hidden md:block w-px h-3 bg-white/10" />
            <div className="flex items-center gap-2 hover:text-amber-400 transition-colors cursor-crosshair">
                <Bug size={12} className="md:w-[14px] md:h-[14px]" /> 
                <span>Bugs: <span className="text-white">Low</span></span>
            </div>
        </motion.div>

      </div>
    </section>
  );
}