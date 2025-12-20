"use client";

import React, { useRef, useState } from "react";
import { 
  SiPython, SiPytorch, SiTensorflow, SiOpencv, 
  SiSolidity, SiNextdotjs, SiReact, 
  SiTypescript, SiTailwindcss, SiDocker, SiGit, SiPostgresql,
  SiNodedotjs, SiGo, SiFastapi
} from "@icons-pack/react-simple-icons";
import { Sparkles, Skull, Zap, Ghost, Coffee } from "lucide-react";

const voidArsenal = [
  { name: "Python", icon: SiPython, lore: "The Ancient Serpent Speak", tier: "Legendary" },
  { name: "PyTorch", icon: SiPytorch, lore: "Neural Neuron Weaver", tier: "Mythic" },
  { name: "Next.js", icon: SiNextdotjs, lore: "Dimensional Portal Smith", tier: "S-Rank" },
  { name: "React", icon: SiReact, lore: "Component Necromancy", tier: "A-Rank" },
  { name: "FastAPI", icon: SiFastapi, lore: "Supersonic Delivery Spell", tier: "B-Rank" },
  { name: "Solidity", icon: SiSolidity, lore: "Unbreakable Digital Contract", tier: "Relic" },
  { name: "Docker", icon: SiDocker, lore: "Reality Containment Box", tier: "Artifact" },
  { name: "Git", icon: SiGit, lore: "Time Traveler's Save Point", tier: "Essential" },
];

export default function TechStack() {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section className="relative z-10 pt-16 pb-24 md:pt-24 md:pb-48 bg-black overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl">
        
        <div className="text-center mb-16">
          <h2 className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.5em] mb-4">
            Arsenal of the Void
          </h2>
          <h3 className="text-3xl md:text-5xl font-medium text-white tracking-tighter">
            <span className="text-gray-500">Gear </span>&<span className="text-amber-500"> Spells.</span>
          </h3>
        </div>

        <div
          ref={divRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setOpacity(1)}
          onMouseLeave={() => setOpacity(0)}
          className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* Spotlight Effect - Amber to match Black Hole */}
          <div
            className="pointer-events-none absolute -inset-px transition opacity duration-500 rounded-3xl"
            style={{
              opacity,
              background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(251,191,36,0.1), transparent 80%)`,
            }}
          />

          {voidArsenal.map((item, i) => (
            <div
              key={i}
              className="group relative p-5 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-amber-500/30 transition-all duration-500 z-10 overflow-hidden"
            >
              {/* Background Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-black border border-white/10 group-hover:border-amber-500/50 transition-all">
                    <item.icon size={22} className="text-gray-400 group-hover:text-white" />
                  </div>
                  <span className="text-[8px] font-mono text-amber-500/60 uppercase tracking-widest border border-amber-500/20 px-2 py-0.5 rounded-full">
                    {item.tier}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-gray-500 leading-relaxed font-light italic">
                    "{item.lore}"
                  </p>
                </div>
              </div>

              {/* Decorative Scanline Effect */}
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent translate-y-1 group-hover:translate-y-0 transition-transform" />
            </div>
          ))}
        </div>

        {/* Fun Footer Stats */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-gray-600 font-mono text-[10px] uppercase tracking-widest">
            <div className="flex items-center gap-2">
                <Coffee size={12} /> Matcha level: 88%
            </div>
            <div className="flex items-center gap-2">
                <Ghost size={12} /> Debugging Sanity: Critical
            </div>
            <div className="flex items-center gap-2">
                <Zap size={12} /> Bug Spawn Rate: Low
            </div>
        </div>
      </div>
    </section>
  );
}