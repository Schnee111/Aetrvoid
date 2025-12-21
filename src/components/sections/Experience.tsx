"use client";

import { motion } from "framer-motion";
import { Zap, Target, Flame, Ghost, Sparkles, EarthIcon, Orbit } from "lucide-react";

// Data narasi "Main-Main" dalam Bahasa Inggris
const loreData = [
  {
    year: "Era 2005",
    title: "The Initial Spawn",
    org: "Earth Sector",
    type: "Origin",
    icon: EarthIcon,
    description: "Successfully spawned into the world. Initial stats were low, but the curiosity meter was already maxed out.",
  },
  {
    year: "Circa 2023",
    title: "Awakening of the Code",
    org: "Digital Realm",
    type: "Class Change",
    icon: Zap,
    description: "Discovered the forbidden arts of Programming. Transmuted matcha into the first 'Hello World' spell. Mana pool increased significantly.",
  },
  {
    year: "Present Day",
    title: "The Great Grinding",
    org: "University Dungeon",
    type: "Main Quest",
    icon: Orbit,
    description: "Currently battling through complex algorithms and surviving the 'Semester 5' boss raid. Specializing in AI-mancy and Web-smithing.",
  },
  {
    year: "Future Log",
    title: "Ascension to Seniority",
    org: "The Void",
    type: "Side Quest",
    icon: Ghost,
    description: "Aiming to build a digital empire where 3D black holes coexist with waifu archives. Still searching for the legendary 'No-Bug' artifact.",
  }
];

export default function Experience() {
  return (
    <section className="relative z-10 py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-4xl">
        
        {/* Header */}
        <div className="mb-10 md:mb-16">
          <h2 className="text-[10px] md:text-sm font-mono text-gray-500 uppercase tracking-widest mb-3 md:mb-4">
            The Player's Lore
          </h2>
          <h3 className="text-2xl md:text-4xl font-medium text-white">
            Origin <span className="text-gray-500">Timeline.</span>
          </h3>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l border-white/10 ml-2 md:ml-3 space-y-10 md:space-y-12">
          
          {loreData.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative pl-6 md:pl-12 group"
            >
              {/* Dot Connector */}
              <div className="absolute -left-[5px] top-1.5 md:top-2 w-2.5 h-2.5 rounded-full bg-black border border-white/50 ring-4 ring-black group-hover:border-white transition-colors" />
              
              {/* Content Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 md:gap-2 mb-2">
                <h4 className="text-lg md:text-xl font-medium text-white group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h4>
                <span className="text-xs md:text-sm font-mono text-gray-500">{item.year}</span>
              </div>
              
              {/* Labels */}
              <div className="flex items-center gap-2 mb-3 text-xs md:text-sm font-medium text-gray-400">
                <item.icon size={12} className="text-amber-500 md:w-3.5 md:h-3.5" />
                <span>{item.org}</span>
                <span className="w-1 h-1 rounded-full bg-gray-600 mx-1" />
                <span className="text-gray-500 uppercase text-[9px] tracking-tighter">{item.type}</span>
              </div>

              {/* Text Description */}
              <p className="text-gray-400 leading-relaxed text-xs md:text-sm max-w-2xl font-light">
                {item.description}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}