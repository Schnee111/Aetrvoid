"use client";

import { Github, Linkedin, Mail, Twitter, Terminal, Zap, Instagram, Coffee } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-black border-t border-white/5 pt-24 pb-12 overflow-hidden">
      {/* Efek Pijar Oranye Halus di Latar Belakang */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-30" />
      
      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        
        {/* Status System */}
        <div className="flex items-center gap-2 mb-8 text-[10px] font-mono text-amber-500/60 uppercase tracking-[0.3em]">
          <Terminal size={12} />
          End of Transmission
        </div>

        {/* Call to Action Utama */}
        <h2 className="text-5xl md:text-8xl font-medium tracking-tighter text-white mb-8 leading-tight">
          Ready to <br />
          <span className="text-gray-600 hover:text-amber-500 transition-all duration-500 cursor-crosshair">Collaborate?</span>
        </h2>

        <p className="text-gray-400 max-w-md mb-12 text-sm md:text-base font-light leading-relaxed">
          The void is always open for new <span className="text-white">Anomalies</span>, <span className="text-white">Neural Networks</span>, or just a casual <span className="text-white">Lore Talk</span>. Reach out before the event horizon closes.
        </p>

        {/* Email Button - Dengan Glow Amber */}
        <a 
          href="mailto:daffam1357@upi.edu" 
          className="group relative inline-flex items-center gap-3 px-10 py-4 bg-white text-black rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all mb-20 overflow-hidden"
        >
          <div className="absolute inset-0 bg-amber-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <Mail size={18} className="relative z-10" />
          <span className="relative z-10">Initiate Contact</span>
        </a>

        {/* Social Links */}
        <div className="flex items-center gap-10 mb-20">
          {[
            { icon: Github, href: "https://github.com/Schnee111" },
            { icon: Linkedin, href: "https://linkedin.com" },
            { icon: Instagram, href: "https://instagram.com/nyx.zest_" },
          ].map((social, i) => (
            <a 
              key={i}
              href={social.href}
              target="_blank"
              className="group relative text-gray-500 hover:text-amber-500 transition-colors"
            >
              <social.icon size={22} />
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-px bg-amber-500 group-hover:w-full transition-all" />
            </a>
          ))}
        </div>

        {/* Footer Bottom / System Info */}
        <div className="w-full border-t border-white/5 pt-10 flex flex-col md:flex-row items-center justify-between text-[10px] text-gray-600 font-mono uppercase tracking-[0.2em]">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <p>© 2025 Daffa | schnee | katsukare </p>
            <span className="hidden md:block w-1 h-1 bg-gray-800 rounded-full" />
            <p className="text-gray-800 italic">Built in the Digital Void</p>
          </div>
          
          <div className="flex gap-6 items-center">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50 animate-pulse" />
              <span>Entity: Sleep</span>
            </div>
            <span className="text-gray-800">|</span>
            <div className="flex items-center gap-2">
              <Coffee size={10} className="text-lime-300/60" />
              <span>Matcha: 0%</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}