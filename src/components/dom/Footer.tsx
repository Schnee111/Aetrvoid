"use client";

import { motion } from "framer-motion"; // 1. Tambahkan Import Motion
import { Github, Linkedin, Mail, Twitter, Terminal, Zap, Instagram, Coffee } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 w-full pt-24 pb-12 overflow-hidden">
      
      {/* Efek Pijar */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-30" />
      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        
        {/* Status System (Animasi Fade In) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-8 text-[10px] font-mono text-amber-500/60 uppercase tracking-[0.3em]"
        >
          <Terminal size={12} />
          End of Transmission
        </motion.div>

        {/* Call to Action Utama */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-8xl font-medium tracking-tighter text-white mb-8 leading-tight"
        >
          Ready to <br />
          <span className="text-amber-500 hover:text-white transition-all duration-500 cursor-crosshair">Collaborate?</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 max-w-md mb-12 text-sm md:text-base font-light leading-relaxed"
        >
          The void is always open for new <span className="text-white">Anomalies</span>, <span className="text-white">Neural Networks</span>, or just a casual <span className="text-white">Lore Talk</span>. Reach out before the event horizon closes.
        </motion.p>

        {/* Email Button - Dengan Glow Amber */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5, delay: 0.3 }}
        >
            <a 
            href="mailto:daffam1357@upi.edu" 
            className="group relative inline-flex items-center gap-3 px-10 py-4 bg-white text-black rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all mb-20 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]"
            >
            <div className="absolute inset-0 bg-amber-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <Mail size={18} className="relative z-10" />
            <span className="relative z-10">Initiate Contact</span>
            </a>
        </motion.div>

        {/* Social Links */}
        <div className="flex items-center gap-10 mb-20">
          {[
            { icon: Github, href: "https://github.com/Schnee111" },
            { icon: Linkedin, href: "https://linkedin.com" },
            { icon: Instagram, href: "https://instagram.com/nyx.zest_" },
          ].map((social, i) => (
            <motion.a 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 + (i * 0.1) }} // Staggered delay
              href={social.href}
              target="_blank"
              className="group relative text-gray-500 hover:text-amber-500 transition-colors"
            >
              <social.icon size={22} />
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-px bg-amber-500 group-hover:w-full transition-all" />
            </motion.a>
          ))}
        </div>

        {/* Footer Bottom / System Info */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            className="w-full border-t border-white/5 pt-10 flex flex-col md:flex-row items-center justify-between text-[10px] text-gray-600 font-mono uppercase tracking-[0.2em]"
        >
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <p>© 2025 Daffa | schnee | katsukare </p>
            <span className="hidden md:block w-1 h-1 bg-gray-800 rounded-full" />
            <p className="text-gray-800 italic">Built in the Digital Void</p>
          </div>
          
          <div className="flex gap-6 items-center">
            {/* Status: Sleep (Amber Pulse) */}
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50 animate-pulse" />
              <span>Entity: Sleep</span>
            </div>
            
            <span className="text-gray-800">|</span>
            
            {/* Status: Matcha (Lime Glow - Sesuai request 'Alternative Green') */}
            <div className="flex items-center gap-2">
              <Coffee size={10} className="text-lime-400" />
              <span className="group">
                  Matcha: <span className="text-lime-400 drop-shadow-[0_0_5px_rgba(163,230,53,0.5)]">100%</span>
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}