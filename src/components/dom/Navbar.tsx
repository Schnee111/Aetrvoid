"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { ChevronDown, Code2, Github, Menu, Palette, X } from "lucide-react";

interface NavbarProps {
  onBGChange: (id: "blackhole" | "moon" | "redmoon" | "ori" | "nebula") => void;
  currentBG: string;
}

export default function Navbar({ onBGChange, currentBG }: NavbarProps) {
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State untuk hover/click
  
  const { scrollY } = useScroll();
  const [lastY, setLastY] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastY;
    if (Math.abs(diff) > 5) {
      if (diff > 0 && latest > 50 && !isMobileMenuOpen) { 
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
    }
    setIsScrolled(latest > 50);
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
          <div className="flex items-center gap-2">
            <Code2 size={20} className="text-white" />
            <span className="font-bold text-white tracking-tight">Schnee.</span>
          </div>

          {/* MENU LINKS + DROPDOWN (DESKTOP) */}
          <div className="hidden md:flex items-center gap-8">
            
            {/* DROPDOWN AREA WITH HOVER LOGIC */}
            <div 
              className="relative py-2" // py-2 memberi area "aman" agar dropdown tidak tertutup saat kursor bergerak ke bawah
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
             <button className="hidden md:block px-5 py-2 bg-white text-black text-[10px] font-bold rounded-full hover:scale-105 transition-all active:scale-95">
               LET'S TALK
             </button>
             <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-white">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
             </button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
             {menuItems.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-bold text-white uppercase tracking-tighter hover:text-gray-400 transition-colors">
                  {item}
                </a>
             ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}