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

  // Fungsi untuk menghitung koordinat titik berdasarkan sudut dan nilai
  const getPoint = (index: number, val: number, max: number) => {
    const r = (val / max) * radius;
    const angle = index * angleStep - Math.PI / 2;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // Membuat string path untuk area statistik
  const statsPath = playerStats
    .map((s, i) => {
      const p = getPoint(i, s.value, s.full);
      return `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`;
    })
    .join(" ") + " Z";

  // Membuat garis panduan (segi lima luar)
  const gridPath = playerStats
    .map((_, i) => {
      const p = getPoint(i, 100, 100);
      return `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`;
    })
    .join(" ") + " Z";

  return (
    <section className="relative z-10 py-16 flex flex-col items-center bg-black">
      <div className="mb-10 text-center">
        <h2 className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em] mb-2">
          Attribute Analysis
        </h2>
        <h3 className="text-2xl font-medium text-white">Skill <span className="text-gray-500">Capabilities.</span></h3>
      </div>

      <div className="relative flex items-center justify-center">
        <svg width={size} height={size} className="overflow-visible">
          {/* Garis Grid Luar */}
          <path
            d={gridPath}
            fill="none"
            stroke="white"
            strokeOpacity="0.1"
            strokeWidth="1"
          />
          
          {/* Garis Jari-jari (Sumbu) */}
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

          {/* Area Statistik dengan Animasi */}
          <motion.path
            initial={{ d: `M ${center} ${center} L ${center} ${center} L ${center} ${center} L ${center} ${center} L ${center} ${center} Z`, opacity: 0 }}
            whileInView={{ d: statsPath, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            fill="rgba(255, 255, 255, 0.1)"
            stroke="white"
            strokeWidth="2"
            className="drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          />

          {/* Label Statistik */}
          {playerStats.map((stat, i) => {
            const p = getPoint(i, 120, 100); // Letakkan label sedikit di luar grid
            return (
              <text
                key={i}
                x={p.x}
                y={p.y}
                fill="#aa6d28ff"
                fontSize="10"
                fontFamily="monospace"
                textAnchor="middle"
                dominantBaseline="middle"
                className="uppercase tracking-widest font-bold"
              >
                {stat.label}
              </text>
            );
          })}
        </svg>

        {/* Info Nilai Detail (Floating) */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20">
            <div className="w-1 h-1 bg-white rounded-full blur-sm" />
        </div>
      </div>
      
      <p className="mt-8 text-[10px] text-gray-600 font-mono italic">
        *Stats are subject to change based on matcha intake.
      </p>
    </section>
  );
}