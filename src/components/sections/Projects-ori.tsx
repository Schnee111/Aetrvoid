"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Github, ExternalLink } from "lucide-react"; 
import Image from "next/image";
// Pastikan path import data Anda benar (waifus atau projects)
import { waifus as projects } from "@/data/waifus";

const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
  return (
    // PERBAIKAN 1: Hapus padding (p-4 md:p-6) agar gambar full
    <div className="w-full h-full flex items-center justify-center">
      
      {/* PERBAIKAN 2: Ubah aspect-video menjadi h-full w-full agar mengikuti container parent-nya */}
      <div className={`relative w-full h-full overflow-hidden bg-white/5 border border-white/10 shadow-2xl group rounded-2xl md:rounded-3xl`}>
        
        {/* Render Gambar */}
        <Image
          src={project.image}
          alt={project.title}
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw" 
          priority={project.id === 1} 
        />

        {/* Overlay Gelap */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        
        {/* Judul Proyek */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
           <h3 className="text-xl md:text-3xl font-bold text-white uppercase tracking-widest drop-shadow-lg">
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
      className="min-h-[30vh] md:min-h-[40vh] flex flex-col justify-center py-12 md:py-24 px-2 md:px-0"
    >
      <div className="space-y-3 md:space-y-4 max-w-lg">
        
        {/* MOBILE ONLY IMAGE */}
        <div className="block lg:hidden w-full mb-4">
           {/* Kita beri aspect ratio manual di sini untuk mobile agar rapi */}
           <div className="aspect-video w-full">
              <ProjectCard project={project} />
           </div>
        </div>

        {/* JUDUL */}
        <motion.div
            animate={{ opacity: isActive ? 1 : 0.3 }}
            transition={{ duration: 0.4 }}
        >
            <div className="flex items-center gap-2 md:gap-3 mb-2">
                <span className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r ${project.color}`} />
                <span className="text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-widest">{project.category}</span>
            </div>
            
            <h3 className="text-xl md:text-3xl font-bold text-white leading-tight cursor-default">
              {project.title}
            </h3>
        </motion.div>

        {/* DESKRIPSI */}
        <motion.div
            animate={{ 
                opacity: isActive ? 1 : 0, 
                filter: isActive ? "blur(0px)" : "blur(4px)", 
                y: isActive ? 0 : 20
            }}
            transition={{ duration: 0.5 }} 
            className="space-y-4 md:space-y-6"
        >
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 md:px-3 text-[9px] md:text-[10px] font-medium text-white bg-white/10 rounded-full border border-white/5">
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex items-center gap-4 md:gap-6 pt-2">
                <button className={`flex items-center gap-2 text-white transition-colors group ${!isActive && 'pointer-events-none'}`}>
                    <Github size={14} className="md:w-4 md:h-4" /> 
                    <span className="font-medium text-xs">Code</span>
                </button>
                <button className={`flex items-center gap-2 text-white transition-colors group ${!isActive && 'pointer-events-none'}`}>
                    <ExternalLink size={14} className="md:w-4 md:h-4" />
                    <span className="font-medium text-xs">Live Demo</span>
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
          
          <div className="py-16 md:py-20 text-center md:text-left">
             <h2 className="text-[10px] font-mono text-gray-500 mb-3 uppercase tracking-[0.2em]">Selected Works</h2>
             <p className="text-2xl md:text-4xl font-bold text-white max-w-3xl">
               Exploring the intersection of <span className="text-gray-500">Deep Learning</span> and <span className="text-gray-500">Modern Web</span>.
             </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-start"> 
            
            {/* KOLOM KIRI (SCROLLABLE TEXT) */}
            <div 
                className="order-2 lg:order-1 relative z-10 py-[5vh] md:py-[20vh]"
            > 
              {projects.map((project) => (
                <ProjectDetails 
                  key={project.id} 
                  project={project} 
                  setInView={setActiveId} 
                  isActive={activeId === project.id}
                />
              ))}
            </div>

            {/* KOLOM KANAN: Sticky Image (DESKTOP ONLY) */}
            {/* Kita gunakan 'h-screen' untuk area sticky, tapi containernya kita buat besar */}
            <div className="hidden lg:flex order-1 lg:order-2 sticky top-0 h-screen items-center justify-center py-0 z-0">
               
               {/* PERBAIKAN 3: 
                   - Ubah aspect-square menjadi aspect-video (agar lebar).
                   - Naikkan max-h agar gambar lebih besar (80vh).
                   - Gunakan w-full.
               */}
               <div className="relative w-full max-w-md aspect-[3/4] max-h-[85vh] bg-white/5 rounded-3xl border border-white/10 overflow-hidden backdrop-blur-sm shadow-2xl">
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
                      transition={{ duration: 0.5 }}
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