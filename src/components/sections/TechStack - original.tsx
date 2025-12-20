"use client";

import React, { useRef, useState } from "react";
import { 
  SiPython, SiPytorch, SiTensorflow, SiOpencv, 
  SiSolidity, SiNextdotjs, SiReact, 
  SiTypescript, SiTailwindcss, SiDocker, SiGit, SiPostgresql,
  SiNodedotjs, SiGo, SiFastapi
} from "@icons-pack/react-simple-icons";
import { Blocks } from "lucide-react";

// Data Tools (Sama seperti sebelumnya)
const tools = [
  { name: "Python", icon: SiPython, type: "AI/ML" },
  { name: "PyTorch", icon: SiPytorch, type: "AI/ML" },
  { name: "TensorFlow", icon: SiTensorflow, type: "AI/ML" },
  { name: "OpenCV", icon: SiOpencv, type: "Vision" },
  { name: "Next.js", icon: SiNextdotjs, type: "Web" },
  { name: "React", icon: SiReact, type: "Web" },
  { name: "TypeScript", icon: SiTypescript, type: "Web" },
  { name: "Tailwind", icon: SiTailwindcss, type: "Design" },
  { name: "Node.js", icon: SiNodedotjs, type: "Backend" },
  { name: "FastAPI", icon: SiFastapi, type: "Backend" },
  { name: "Hyperledger", icon: Blocks, type: "Blockchain" },
  { name: "Solidity", icon: SiSolidity, type: "Blockchain" },
  { name: "Go", icon: SiGo, type: "Backend" },
  { name: "Docker", icon: SiDocker, type: "DevOps" },
  { name: "PostgreSQL", icon: SiPostgresql, type: "Database" },
  { name: "Git", icon: SiGit, type: "DevOps" },
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

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    // RESPONSIVE PADDING: pt-16 pb-24 di HP, pt-24 pb-64 di Desktop
    <section className="relative z-10 pt-16 pb-24 md:pt-24 md:pb-64 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-4">
            Technical Arsenal
          </h2>
          <h3 className="text-3xl md:text-4xl font-medium text-white">
             Powered by <span className="text-gray-500">modern technologies.</span>
          </h3>
        </div>

        {/* SPOTLIGHT CONTAINER */}
        <div
          ref={divRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          // RESPONSIVE GRID: grid-cols-2 (HP) -> grid-cols-4 (Tablet) -> grid-cols-8 (PC)
          className="relative grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-px bg-white/10 rounded-xl overflow-hidden border border-white/10"
        >
          <div
            className="pointer-events-none absolute -inset-px transition opacity duration-300"
            style={{
              opacity,
              background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`,
            }}
          />

          {tools.map((tool, i) => (
            <div
              key={i}
              className="group relative flex flex-col items-center justify-center gap-3 md:gap-4 py-6 md:py-8 px-2 md:px-4 bg-black hover:bg-white/5 transition-colors z-10"
            >
              <div className="p-2 md:p-3 rounded-xl bg-white/5 border border-white/5 group-hover:border-white/20 group-hover:scale-110 transition-all duration-300">
                <tool.icon size={20} className="text-gray-400 group-hover:text-white transition-colors md:w-6 md:h-6" />
              </div>
              
              <div className="text-center">
                <h4 className="text-xs md:text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                  {tool.name}
                </h4>
                <span className="hidden md:block text-[10px] font-mono text-gray-600 uppercase tracking-wider group-hover:text-gray-400 transition-colors mt-1">
                  {tool.type}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}