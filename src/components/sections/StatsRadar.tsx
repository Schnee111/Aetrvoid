"use client";

import { motion } from "framer-motion";

const playerStats = [
  { label: "Intelligence", value: 95, full: 100 },
  { label: "Creativity", value: 90, full: 100 },
  { label: "Endurance", value: 75, full: 100 },
  { label: "Luck", value: 60, full: 100 },
  { label: "Agility", value: 85, full: 100 },
];

export default function StatsRadar() {
  const size = 300;
  const center = size / 2;
  const radius = size * 0.4;
  const angleStep = (Math.PI * 2) / 5;

  const getPoint = (index: number, val: number, max: number) => {
    const r = (val / max) * radius;
    const angle = index * angleStep - Math.PI / 2;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const statsPath = playerStats
    .map((s, i) => {
      const p = getPoint(i, s.value, s.full);
      return `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`;
    })
    .join(" ") + " Z";

  const gridPath = playerStats
    .map((_, i) => {
      const p = getPoint(i, 100, 100);
      return `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`;
    })
    .join(" ") + " Z";

  return (
    <section className="relative z-10 py-16 flex flex-col items-center">
      
      {/* Header dengan Animasi Fade Up */}
      <div className="mb-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.5em] mb-2"
        >
          Attribute Analysis
        </motion.h2>
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl md:text-4xl font-medium text-white"
        >
          Skill <span className="text-gray-500">Capabilities.</span>
        </motion.h3>
      </div>

      <div className="relative flex items-center justify-center">
        <svg width={size} height={size} className="overflow-visible">
          {/* Grid Luar */}
          <path
            d={gridPath}
            fill="none"
            stroke="white"
            strokeOpacity="0.1"
            strokeWidth="1"
          />
          
          {/* Garis Jari-jari */}
          {playerStats.map((_, i) => {
            const p = getPoint(i, 100, 100);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={p.x}
                y2={p.y}
                stroke="white"
                strokeOpacity="0.1"
              />
            );
          })}

          {/* Area Statistik (Radar) */}
          <motion.path
            initial={{ d: `M ${center} ${center} L ${center} ${center} L ${center} ${center} L ${center} ${center} L ${center} ${center} Z`, opacity: 0 }}
            whileInView={{ d: statsPath, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            fill="rgba(245, 158, 11, 0.1)" // Amber transparan (sesuai tema)
            stroke="#f59e0b" // Garis Amber
            strokeWidth="2"
            className="drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]"
          />

          {/* Label Statistik */}
          {playerStats.map((stat, i) => {
            const p = getPoint(i, 120, 100);
            return (
              <motion.text
                key={i}
                x={p.x}
                y={p.y}
                // ANIMASI FIXED: Gunakan translateY (bukan scale) agar stabil di SVG
                initial={{ opacity: 0, translateY: 10 }} 
                whileInView={{ opacity: 1, translateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 + (i * 0.1), ease: "easeOut" }}
                
                // WARNA FIXED: Amber-500 (#f59e0b) sesuai Hero & Projects
                fill="#f59e0b" 
                fontSize="10"
                fontFamily="monospace"
                textAnchor="middle"
                dominantBaseline="middle"
                // Drop shadow warna Amber
                className="uppercase tracking-widest font-bold drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]"
              >
                {stat.label}
              </motion.text>
            );
          })}
        </svg>

        {/* Info Nilai Detail (Floating) */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20">
            <div className="w-1 h-1 bg-white rounded-full blur-sm" />
        </div>
      </div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 1.5 }}
        className="mt-8 text-[10px] text-gray-600 font-mono italic"
      >
        *Stats are subject to change based on matcha intake.
      </motion.p>
    </section>
  );
}