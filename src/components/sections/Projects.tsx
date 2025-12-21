"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, Variants } from "framer-motion"; 
import { Github, ExternalLink, ChevronUp, ChevronDown } from "lucide-react"; 
import Image from "next/image";
import { waifus as projects } from "@/data/waifus";

// --- KOMPONEN ANIMASI 1: TYPEWRITER ---
const TypewriterText = ({ text }: { text: string }) => {
  const letters = Array.from(text);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.03 * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: -5, 
    },
  };

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", justifyContent: "center" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="md:justify-start"
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

// --- KOMPONEN ANIMASI 2: MASKED REVEAL ---
const MaskedReveal = ({ text, className }: { text: React.ReactNode, className?: string }) => {
    return (
        <div className={`overflow-hidden pb-1 ${className}`}>
            <motion.div
                initial={{ y: "140%", skewY: 5 }} 
                whileInView={{ y: 0, skewY: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            >
                {text}
            </motion.div>
        </div>
    )
}

const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className={`relative w-full h-full overflow-hidden bg-white/5 shadow-2xl group rounded-2xl md:rounded-3xl`}>
          <Image
            src={project.image}
            alt={project.title}
            fill 
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 500px" 
            priority={project.id === 1} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-amber-500/5" />
        </div>
      </div>
    );
};
  
const ProjectDetails = ({ 
  project, 
  setInView, 
  isActive,
  onRegisterRef
}: { 
  project: typeof projects[0], 
  setInView: (id: number) => void, 
  isActive: boolean,
  onRegisterRef: (id: number, node: HTMLDivElement | null) => void
}) => {
    const ref = useRef<HTMLDivElement>(null);
    
    // FIX 1: LOGIKA SCROLL SPY
    // Ubah margin menjadi "-50% ...". Ini membuat 'garis trigger' setipis 1px tepat di tengah layar.
    // Item akan aktif TEPAT saat menyentuh tengah layar, mencegah skipping (1 -> 3).
    const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });
  
    useEffect(() => {
      if (ref.current) {
        onRegisterRef(project.id, ref.current);
      }
    }, [project.id, onRegisterRef]);

    useEffect(() => {
      if (isInView) setInView(project.id);
    }, [isInView, project.id, setInView]);
  
    return (
      <div ref={ref} className="min-h-[30vh] md:min-h-[40vh] flex flex-col justify-center py-12 md:py-28 px-2 md:px-0 scroll-mt-32">
        <div className="space-y-3 md:space-y-4 max-w-lg">
           <div className="block lg:hidden w-full mb-6">
              <div className="aspect-[3/4] w-full max-w-xs mx-auto shadow-2xl rounded-2xl overflow-hidden border border-white/10">
                 <ProjectCard project={project} />
              </div>
           </div>
           
           <motion.div animate={{ opacity: isActive ? 1 : 0.3 }} transition={{ duration: 0.4 }}>
               <div className="flex items-center gap-2 md:gap-3 mb-2">
                   <span className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r ${project.color}`} />
                   <span className="text-[9px] md:text-[10px] font-medium text-gray-500 uppercase tracking-widest">{project.category}</span>
               </div>
               <h3 className="text-xl md:text-4xl text-white font-base leading-tight cursor-default">{project.title}</h3>
           </motion.div>
           <motion.div
              animate={{ opacity: isActive ? 1 : 0, filter: isActive ? "blur(0px)" : "blur(4px)", y: isActive ? 0 : 20 }}
              transition={{ duration: 0.5 }} 
              className="space-y-4 md:space-y-6"
          >
              <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-light">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag: string) => (
                      <span key={tag} className={`px-2 py-1 md:px-3 text-[9px] md:text-[10px] font-medium rounded-full border transition-all duration-300 ${isActive ? 'text-amber-500/60 bg-amber-500/5 border-amber-500/10 shadow-[0_0_10px_rgba(245,158,11,0.15)]' : 'text-white bg-white/10 border-white/5'}`}>{tag}</span>
                  ))}
              </div>
              <div className="flex items-center gap-4 md:gap-6 pt-2">
                  <button className={`flex items-center gap-2 text-white hover:text-amber-400 transition-colors group ${!isActive && 'pointer-events-none'}`}>
                      <Github size={14} className="md:w-4 md:h-4" /> <span className="font-base text-[10px] uppercase tracking-tighter">More Info</span>
                  </button>
                  <button className={`flex items-center gap-2 text-white hover:text-amber-400 transition-colors group ${!isActive && 'pointer-events-none'}`}>
                      <ExternalLink size={14} className="md:w-4 md:h-4" /> <span className="font-base text-[10px] uppercase tracking-tighter">Gallery</span>
                  </button>
              </div>
          </motion.div>
        </div>
      </div>
    );
};

export default function Projects() {
  const [activeId, setActiveId] = useState(projects[0].id);
  const projectRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const registerRef = useCallback((id: number, node: HTMLDivElement | null) => {
    if (node) {
      projectRefs.current.set(id, node);
    } else {
      projectRefs.current.delete(id);
    }
  }, []);

  const scrollToProject = (direction: 'prev' | 'next') => {
    const currentIndex = projects.findIndex((p) => p.id === activeId);
    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

    if (nextIndex < 0) return;
    if (nextIndex >= projects.length) return;

    const nextProject = projects[nextIndex];
    const element = projectRefs.current.get(nextProject.id);

    if (element) {
      const rect = element.getBoundingClientRect();
      const elementCenterAbsolute = window.scrollY + rect.top + (rect.height / 2);
      const targetScroll = elementCenterAbsolute - (window.innerHeight / 2);

      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative z-20">
       <div className="container mx-auto px-4 md:px-12 lg:px-24">
          
          <div className="py-16 md:py-32 text-center md:text-left flex flex-col items-center md:items-start">
             <div className="text-[10px] md:text-sm font-mono text-amber-500/50 mb-3 uppercase tracking-[0.5em]">
                <TypewriterText text="Selected Waifus" />
             </div>
             <div className="text-2xl md:text-6xl text-white max-w-4xl tracking-tighter font-base leading-[1.1]">
                <MaskedReveal 
                    className="inline-block mr-2"
                    text={<span>Exploring the beauty of</span>} 
                />
                <div className="overflow-hidden inline-block align-top pb-1">
                     <motion.div
                        initial={{ y: "130%", skewY: 5 }}
                        whileInView={{ y: 0, skewY: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} 
                     >
                        <span className="text-gray-500 italic">Fiction</span> and <span className="text-amber-500">Visuals</span>.
                     </motion.div>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 pt-20 gap-8 md:gap-10 items-start"> 
            
            <div className="order-2 lg:order-1 relative z-10 py-[5vh] md:py-[15vh]"> 
              {projects.map((project) => (
                <ProjectDetails 
                  key={project.id} 
                  project={project} 
                  setInView={setActiveId} 
                  isActive={activeId === project.id}
                  onRegisterRef={registerRef} 
                />
              ))}
            </div>

            <div className="hidden lg:flex order-1 lg:order-2 sticky top-0 h-screen items-center justify-center py-0 z-0">
                
                <div className="relative w-full max-w-md">
                    
                    <div className="relative w-full aspect-[3/4] max-h-[80vh] bg-white/5 rounded-3xl border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(251,191,36,0.1)]">
                        {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                            animate={{ 
                            opacity: activeId === project.id ? 1 : 0,
                            scale: activeId === project.id ? 1 : 0.95,
                            filter: activeId === project.id ? "blur(0px)" : "blur(10px)",
                            zIndex: activeId === project.id ? 10 : 0
                            }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="absolute inset-0"
                        >
                            <ProjectCard project={project} />
                        </motion.div>
                        ))}
                    </div>

                    <div className="absolute top-1/2 -right-20 -translate-y-1/2 flex flex-col gap-4">
                      <button 
                          onClick={() => scrollToProject('prev')}
                          disabled={activeId === projects[0].id}
                          // Ubah style di sini:
                          className="p-2 text-white/30 hover:text-amber-400 transition-all disabled:opacity-0 disabled:cursor-not-allowed"
                      >
                          {/* Perkecil icon size */}
                          <ChevronUp size={24} />
                      </button>
                      
                      <button 
                          onClick={() => scrollToProject('next')}
                          disabled={activeId === projects[projects.length - 1].id}
                          // Ubah style di sini:
                          className="p-2 text-white/30 hover:text-amber-400 transition-all disabled:opacity-0 disabled:cursor-not-allowed"
                      >
                          {/* Perkecil icon size */}
                          <ChevronDown size={24} />
                      </button>
                  </div>
                </div>

            </div>
          </div>
       </div>
    </section>
  );
}