"use client";

import { motion } from "framer-motion";
import { Sparkles, Terminal } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center pointer-events-none">
      
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 pointer-events-none"> 
        
        {/* Status Badge */}
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-500 text-[10px] uppercase tracking-[0.2em] font-mono"
        >
          <Terminal size={12} />
          System: Online & Stable
        </motion.div> */}

        {/* Name & Role */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-medium tracking-tighter text-white mb-3 leading-none">
            Entity <span className="text-amber-500">Katsukare.</span>
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-gray-400">
            Multiversal <span className="text-gray-200">Creative Developer.</span>
          </h2>
        </motion.div>

        {/* Description - Narrative Style */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-base md:text-lg text-gray-400 max-w-[90%] sm:max-w-2xl leading-relaxed font-light mx-auto"
        >
          A sentient existence currently navigating the <span className="text-white font-medium">Digital Void</span>. Specializing in transmuting matcha into <span className="text-amber-500 font-medium italic text-sm">Complex AI Structures</span> and <span className="text-white font-medium">Interactive Realities</span>. 
        </motion.p>

        {/* Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 w-full sm:w-auto px-6 sm:px-0"
        >
        <a href="mailto:daffam1357@upi.edu" className="w-full sm:w-auto">
          <button className="pointer-events-auto w-full sm:w-auto px-8 py-3 bg-white text-black rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            Initiate Contact
          </button>
        </a>
          
          <a href="#timeline" className="w-full sm:w-auto">
            <button className="pointer-events-auto w-full sm:w-auto px-8 py-3 bg-transparent text-white border border-white/10 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                View Lore
            </button>
          </a>
        </motion.div>

      </div>

      {/* Background Decorative Element */}
      <motion.div 
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-mono text-gray-600 uppercase tracking-[0.5em]"
      >
        Scroll to Explore the Event Horizon
      </motion.div>
    </section>
  );
}