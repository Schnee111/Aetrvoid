"use client";

import { motion, Variants } from "framer-motion";

// --- 1. FIX TYPESCRIPT ERROR ---
// Kita harus memberi tahu TS bahwa ini adalah Tuple berisi tepat 4 angka (Cubic Bezier)
const SMOOTH_EASE: [number, number, number, number] = [0.33, 1, 0.68, 1];

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 * i },
  }),
};

const maskChild: Variants = {
  hidden: { y: "115%", transition: { ease: SMOOTH_EASE, duration: 0.7 } },
  visible: { 
    y: 0, 
    transition: { ease: SMOOTH_EASE, duration: 0.9 }
  },
};

// --- KOMPONEN HELPER: MASKED TEXT ---
const MaskedText = ({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) => {
  const words = text.split(" ");
  
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      custom={delay}
      className={`flex flex-wrap justify-center gap-[0.25em] ${className}`}
    >
      {words.map((word, i) => (
        // --- 2. FIX TEXT TERPOTONG (DESCENDERS) ---
        // Ubah pb-1 menjadi pb-2 atau lebih untuk memberi ruang huruf 'g', 'y', 'j'
        <div key={i} className="overflow-hidden pb-2 -mb-2"> 
          <motion.span variants={maskChild} className="inline-block origin-bottom-left">
             {word}
          </motion.span>
        </div>
      ))}
    </motion.div>
  );
};

export default function Hero() {
  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center pointer-events-none">
      
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 pointer-events-none"> 
        
        {/* Name & Role */}
        <div className="flex flex-col items-center gap-1">
          {/* TITLE UTAMA */}
          <div className="flex flex-wrap justify-center gap-x-3 text-3xl sm:text-5xl md:text-7xl font-shadow font-medium tracking-tighter text-white mb-1 leading-[1.1]">
              
              {/* --- 3. FIX SHADOW TERPOTONG --- 
                  Masalah: overflow-hidden memotong drop-shadow.
                  Solusi: Tambah padding (p-4) agar shadow muat di dalam kotak,
                  lalu gunakan margin negatif (-m-4) agar posisi teks tidak bergeser/renggang.
              */}
              
              {/* Kata: Entity */}
              <div className="overflow-hidden p-4 -m-4">
                 <motion.h1 
                    initial={{ y: "130%" }} 
                    animate={{ y: 0 }} 
                    transition={{ ease: SMOOTH_EASE, duration: 1.2, delay: 0.2 }}
                    // Shadow hitam pekat
                    className="drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]"
                 >
                    Entity
                 </motion.h1>
              </div>

              {/* Kata: Katsukare */}
              <div className="overflow-hidden p-4 -m-4">
                 <motion.h1 
                    initial={{ y: "130%" }} 
                    animate={{ y: 0 }} 
                    transition={{ ease: SMOOTH_EASE, duration: 1.2, delay: 0.35 }}
                    // Shadow glow amber yang lebar
                    className="text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.6)] italic"
                 >
                    Katsukare.
                 </motion.h1>
              </div>
          </div>
          
          {/* SUBTITLE */}
          <MaskedText 
            text="Multiversal Creative Developer." 
            className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-gray-400 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"
            delay={3} 
          />
        </div>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="text-sm sm:text-base md:text-lg text-gray-300 max-w-[90%] sm:max-w-2xl leading-relaxed font-light mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,1)]"
        >
          A sentient existence currently navigating the <span className="text-white font-medium">Digital Void</span>. Specializing in transmuting matcha into <span className="text-amber-500 font-medium italic text-sm">Complex AI Structures</span> and <span className="text-white font-medium">Interactive Realities</span>. 
        </motion.p>

        {/* Buttons */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 w-full sm:w-auto px-6 sm:px-0"
        >
          <a href="mailto:daffam1357@upi.edu" className="w-full sm:w-auto">
            <button className="pointer-events-auto w-full sm:w-auto px-8 py-3 bg-white text-black rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Initiate Contact
            </button>
          </a>
          
          <a href="#timeline" className="w-full sm:w-auto">
            <button className="pointer-events-auto w-full sm:w-auto px-8 py-3 bg-transparent text-white border border-white/20 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                View Lore
            </button>
          </a>
        </motion.div>

      </div>

      {/* Decorative */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 0.7, 0.2] }}
        transition={{ duration: 4, delay: 1.5, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-mono text-gray-500 uppercase tracking-[0.5em] drop-shadow-[0_2px_4px_rgba(0,0,0,1)]"
      >
        Scroll to Explore the Event Horizon
      </motion.div>
    </section>
  );
}