"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { ChevronDown, Github, Menu, Palette, X, ArrowRight } from "lucide-react";

interface NavbarProps {
  onBGChange: (id: "blackhole" | "moon" | "redmoon" | "ori" | "nebula") => void;
  currentBG: string;
}

export default function Navbar({ onBGChange, currentBG }: NavbarProps) {
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const { scrollY } = useScroll();
  const [lastY, setLastY] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastY;
    if (Math.abs(diff) > 0) {
      if (diff > 0 && latest > 5 && !isMobileMenuOpen) { 
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
    }
    setIsScrolled(latest > 5);
    setLastY(latest);
  });

  const menuItems = ["About", "Tech", "Projects", "Stats", "Contact"];
  const bgOptions = [
    { id: "redmoon", name: "Blood Moon" },
    { id: "blackhole", name: "Black Hole (beta)" },
    { id: "nebula", name: "Deep Nebula" },
    { id: "moon", name: "Pale Moon" },
    { id: "ori", name: "Original Space" },
  ] as const;

  return (
    <>
      <motion.nav
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 pointer-events-none ${
          isScrolled ? "py-4" : "py-6"
        }`}
      >
        <div className={`flex items-center justify-between px-6 md:px-8 transition-all duration-300 pointer-events-auto ${
            isScrolled 
              ? "w-[95%] md:w-[85%] bg-black/50 backdrop-blur-md border border-white/10 rounded-full h-14 shadow-lg" 
              : "w-full px-6 bg-transparent border-transparent h-16"
          }`}
        >
          {/* LOGO */}
            <div className="flex items-center gap-2 group cursor-pointer relative z-50">
            <div className="relative w-6 h-6">
                <div className="absolute inset-0 border-2 border-amber-500 rounded-full border-t-transparent animate-spin-slow" />
                <div className="absolute inset-1 border border-white/20 rounded-full" />
            </div>
            <span className="font-bold text-white tracking-tighter text-lg group-hover:text-amber-500 transition-colors">
                Aetr<span className="text-amber-500 group-hover:text-white transition-colors">Void</span>
            </span>
            </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">
            <div 
              className="relative py-2"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all bg-white/5 px-3 py-1.5 rounded-full">
                <Palette size={12} />
                {bgOptions.find(opt => opt.id === currentBG)?.name}
                <ChevronDown size={10} className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-1 w-40 bg-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                  >
                    <div className="py-2">
                      {bgOptions.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => {
                            onBGChange(opt.id);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-5 py-2.5 text-[10px] uppercase tracking-tighter transition-colors flex items-center justify-between ${
                            currentBG === opt.id 
                              ? 'text-white bg-white/10' 
                              : 'text-gray-500 hover:bg-white/5 hover:text-gray-200'
                          }`}
                        >
                          {opt.name}
                          {currentBG === opt.id && <div className="w-1 h-1 rounded-full bg-white shadow-[0_0_8px_white]" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {menuItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-4">
             <a href="https://github.com/Schnee111" target="_blank" className="hidden sm:block text-gray-400 hover:text-white transition-colors">
               <Github size={20} />
             </a>
             <a href="https://api.whatsapp.com/send?phone=6281321918632" className="w-full sm:w-auto">
                <button className="hidden md:block px-5 py-2 bg-white text-black text-[10px] font-bold rounded-full hover:scale-105 transition-all active:scale-95">
                LET'S TALK
                </button>
            </a>
             {/* Mobile Menu Toggle - Pastikan Z-Index tinggi */}
             <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-white relative z-50 p-2">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
             </button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-40 bg-black/75 backdrop-blur-xl flex flex-col md:hidden overflow-y-auto"
          >
             <div className="flex flex-col items-center justify-start pt-28 pb-10 min-h-screen gap-8">
               
               {/* 1. NAVIGATION LINKS */}
               <nav className="flex flex-col items-center gap-5 w-full">
                 {menuItems.map((item, i) => (
                    <motion.a
                      key={item}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + (i * 0.05) }}
                      href={`#${item.toLowerCase()}`} 
                      onClick={() => setIsMobileMenuOpen(false)} 
                      className="group flex items-center gap-3 text-2xl font-light text-white uppercase tracking-[0.2em] hover:text-amber-500 transition-colors"
                    >
                      <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 text-amber-500">
                        <ArrowRight size={20} />
                      </span>
                      {item}
                    </motion.a>
                 ))}
               </nav>

               <div className="w-16 h-px bg-white/10" />

               {/* 2. BACKGROUND SELECTOR (GRID LAYOUT) */}
               <div className="flex flex-col items-center gap-4 w-full px-6 max-w-sm">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.25em] flex items-center gap-2">
                     <Palette size={12} /> System Atmosphere
                  </span>
                  
                  {/* Grid 2 Kolom agar lebih rapi */}
                  <div className="grid grid-cols-2 gap-2 w-full">
                      {bgOptions.map((opt) => (
                          <button
                              key={opt.id}
                              onClick={() => {
                                  onBGChange(opt.id);
                                  setIsMobileMenuOpen(false);
                              }}
                              className={`relative py-3 px-2 rounded-lg border text-[10px] font-medium uppercase tracking-widest transition-all overflow-hidden group ${
                                  currentBG === opt.id
                                  ? "border-amber-500 text-amber-500 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                                  : "border-white/10 text-gray-400 bg-white/5 hover:bg-white/10 hover:text-white hover:border-white/20"
                              }`}
                          >
                              {/* Indikator aktif kecil */}
                              {currentBG === opt.id && (
                                <span className="absolute top-1.5 right-1.5 w-1 h-1 bg-amber-500 rounded-full animate-pulse" />
                              )}
                              {opt.name}
                          </button>
                      ))}
                  </div>
               </div>

               <div className="w-16 h-px bg-white/10" />

               {/* 3. FOOTER ACTIONS */}
               <div className="flex flex-col items-center gap-6 mt-2">
                   <a href="https://github.com/Schnee111" target="_blank" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                     <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                        <Github size={18} /> 
                     </div>
                     <span className="text-xs font-mono tracking-widest uppercase">Schnee111</span>
                   </a>
                   
                   <a href="https://api.whatsapp.com/send?phone=6281321918632">
                      <button className="px-10 py-3 bg-white text-black text-xs font-bold rounded-full hover:scale-105 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.15)] tracking-widest">
                        INITIATE CONTACT
                      </button>
                  </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}