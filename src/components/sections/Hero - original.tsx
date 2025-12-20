"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center pointer-events-none">
      
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 pointer-events-none"> 
        
        {/* Name & Role */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-medium tracking-tighter text-white mb-3 leading-none">
            I'm <span className="text-gray-400">Katsukare.</span>
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-gray-300">
            Creative Developer.
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-base md:text-lg text-gray-300 max-w-[90%] sm:max-w-2xl leading-relaxed font-light mx-auto"
        >
          Computer Science student focusing on <span className="text-white font-medium">AI, Data</span> as well as <span className="text-white font-medium">Web and Mobile Development</span>. Currently experimenting with interactive 3D.
        </motion.p>

        {/* Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 w-full sm:w-auto px-6 sm:px-0"
        >
          <button className="pointer-events-auto w-full sm:w-auto px-6 py-2 bg-white text-black rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-[0_0_30px_-10px_rgba(255,255,255,0.3)]">
            View Projects
          </button>
          
          <button className="pointer-events-auto w-full sm:w-auto px-6 py-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-full font-medium text-sm hover:bg-white/10 transition-colors text-white">
            Download CV
          </button>
        </motion.div>

      </div>
    </section>
  );
}