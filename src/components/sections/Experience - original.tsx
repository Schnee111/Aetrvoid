"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Trophy, Code } from "lucide-react";

// Data Pengalaman (TETAP SAMA)
const timelineData = [
  {
    year: "Sep 2023 - Present",
    title: "Computer Science Undergraduate",
    org: "University Name",
    type: "Education",
    icon: GraduationCap,
    description: "Mahasiswa Semester 5. Fokus pada Deep Learning, Web Development, dan Blockchain Technology. Aktif dalam Competitive Programming.",
  },
  {
    year: "Nov 2025 - Dec 2025",
    title: "Deep Learning Projects",
    org: "Academic & Personal",
    type: "Project",
    icon: Code,
    description: "Mengembangkan berbagai model AI termasuk Chatbot (Transformers), Klasifikasi Citra Rempah (CNN), dan Sentimen Analisis.",
  },
  {
    year: "Sep 2025 - Nov 2025",
    title: "E-Business Research",
    org: "Group Project",
    type: "Research",
    icon: Trophy,
    description: "Melakukan Topic Modeling pada ulasan aplikasi SeaBank dan mempublikasikan artikel jurnal terkait hasil analisis.",
  },
  {
    year: "Oct 2025 - Dec 2025",
    title: "Blockchain Simulation",
    org: "Supply Chain Project",
    type: "Project",
    icon: Briefcase,
    description: "Implementasi Hyperledger Fabric untuk simulasi rantai pasok kopi (Coffee Supply Chain) guna menjamin transparansi data.",
  }
];

export default function Experience() {
  return (
    <section className="relative z-10 py-16 md:py-24 bg-black">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-4xl">
        
        {/* Header */}
        <div className="mb-10 md:mb-16">
          <h2 className="text-[10px] md:text-sm font-mono text-gray-500 uppercase tracking-widest mb-3 md:mb-4">
            My Journey
          </h2>
          <h3 className="text-2xl md:text-4xl font-medium text-white">
            Education & <span className="text-gray-500">Experience.</span>
          </h3>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l border-white/10 ml-2 md:ml-3 space-y-10 md:space-y-12">
          
          {timelineData.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative pl-6 md:pl-12"
            >
              {/* Dot Connector */}
              <div className="absolute -left-[5px] top-1.5 md:top-2 w-2.5 h-2.5 rounded-full bg-black border border-white/50 ring-4 ring-black" />
              
              {/* Content */}
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 md:gap-2 mb-2">
                <h4 className="text-lg md:text-xl font-medium text-white">{item.title}</h4>
                <span className="text-xs md:text-sm font-mono text-gray-500">{item.year}</span>
              </div>
              
              <div className="flex items-center gap-2 mb-3 text-xs md:text-sm font-medium text-gray-400">
                <item.icon size={12} className="text-blue-400 md:w-3.5 md:h-3.5" />
                <span>{item.org}</span>
                <span className="w-1 h-1 rounded-full bg-gray-600 mx-1" />
                <span className="text-gray-500">{item.type}</span>
              </div>

              <p className="text-gray-400 leading-relaxed text-xs md:text-sm max-w-2xl">
                {item.description}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}