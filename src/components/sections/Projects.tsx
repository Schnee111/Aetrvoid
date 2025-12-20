"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Github, ExternalLink } from "lucide-react"; 
import Image from "next/image";
import { waifus as projects } from "@/data/waifus";

const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className={`relative w-full h-full overflow-hidden bg-white/5 border border-white/10 shadow-2xl group rounded-2xl md:rounded-3xl`}>
        <Image
          src={project.image}
          alt={project.title}
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 500px" 
          priority={project.id === 1} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-amber-500/5" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
           <h3 className="text-xl md:text-3xl text-white font-bold uppercase tracking-widest drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            {project.title}
           </h3>
        </div>
      </div>
    </div>
  );
};

const ProjectDetails = ({ 
  project, 
  setInView, 
  isActive
}: { 
  project: typeof projects[0], 
  setInView: (id: number) => void,
  isActive: boolean
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    if (isInView) {
      setInView(project.id);
    }
  }, [isInView, project.id, setInView]);

  return (
    <div 
      ref={ref} 
      className="min-h-[30vh] md:min-h-[40vh] flex flex-col justify-center py-12 md:py-28 px-2 md:px-0"
    >
      <div className="space-y-3 md:space-y-4 max-w-lg">
        
        <div className="block lg:hidden w-full mb-6">
           <div className="aspect-[3/4] w-full max-w-xs mx-auto shadow-2xl rounded-2xl overflow-hidden border border-white/10">
              <ProjectCard project={project} />
           </div>
        </div>

        <motion.div
            animate={{ opacity: isActive ? 1 : 0.3 }}
            transition={{ duration: 0.4 }}
        >
            <div className="flex items-center gap-2 md:gap-3 mb-2">
                {/* Indikator mengikuti warna data */}
                <span className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r ${project.color}`} />
                <span className="text-[9px] md:text-[10px] font-medium text-gray-500 uppercase tracking-widest">
                  {project.category}
                </span>
            </div>
            
            <h3 className="text-xl md:text-4xl text-white font-bold leading-tight cursor-default">
              {project.title}
            </h3>
        </motion.div>

        <motion.div
            animate={{ 
                opacity: isActive ? 1 : 0, 
                filter: isActive ? "blur(0px)" : "blur(4px)", 
                y: isActive ? 0 : 20
            }}
            transition={{ duration: 0.5 }} 
            className="space-y-4 md:space-y-6"
        >
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-light">
                {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
                {/* Badge/Tag diubah menjadi Oranye (Amber) saat aktif */}
                {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className={`px-2 py-1 md:px-3 text-[9px] md:text-[10px] font-medium rounded-full border transition-all duration-300 ${
                        isActive 
                          ? 'text-amber-400 bg-amber-500/10 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]' 
                          : 'text-white bg-white/10 border-white/5'
                      }`}
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex items-center gap-4 md:gap-6 pt-2">
                <button className={`flex items-center gap-2 text-white hover:text-amber-400 transition-colors group ${!isActive && 'pointer-events-none'}`}>
                    <Github size={14} className="md:w-4 md:h-4" /> 
                    <span className="font-bold text-[10px] uppercase tracking-tighter">More Info</span>
                </button>
                <button className={`flex items-center gap-2 text-white hover:text-amber-400 transition-colors group ${!isActive && 'pointer-events-none'}`}>
                    <ExternalLink size={14} className="md:w-4 md:h-4" />
                    <span className="font-bold text-[10px] uppercase tracking-tighter">Gallery</span>
                </button>
            </div>
        </motion.div>

      </div>
    </div>
  );
};

export default function Projects() {
  const [activeId, setActiveId] = useState(projects[0].id);

  return (
    <section className="relative z-20 bg-black">
       <div className="container mx-auto px-4 md:px-12 lg:px-24">
          
          <div className="py-16 md:py-32 text-center md:text-left">
             <h2 className="text-[10px] md:text-xs font-mono text-amber-500/50 mb-3 uppercase tracking-[0.5em]">
               Selected Waifus
             </h2>
             <p className="text-2xl md:text-6xl text-white max-w-4xl tracking-tighter font-medium">
               Exploring the beauty of <span className="text-gray-500 italic">Fiction</span> and <span className="text-amber-500">Visuals</span>.
             </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-start"> 
            <div className="order-2 lg:order-1 relative z-10 py-[5vh] md:py-[15vh]"> 
              {projects.map((project) => (
                <ProjectDetails 
                  key={project.id} 
                  project={project} 
                  setInView={setActiveId} 
                  isActive={activeId === project.id}
                />
              ))}
            </div>

            <div className="hidden lg:flex order-1 lg:order-2 sticky top-0 h-screen items-center justify-center py-0 z-0">
               <div className="relative w-full max-w-md aspect-[3/4] max-h-[80vh] bg-white/5 rounded-3xl border border-white/10 overflow-hidden backdrop-blur-sm shadow-[0_0_50px_rgba(251,191,36,0.1)]">
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
            </div>
          </div>
       </div>
    </section>
  );
}