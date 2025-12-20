"use client";

import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-black border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center">
        
        {/* Call to Action Besar */}
        <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-8">
          Let's work <br />
          <span className="text-gray-600 hover:text-white transition-colors cursor-pointer">together.</span>
        </h2>

        <p className="text-gray-400 max-w-md mb-10 text-lg">
          Tertarik diskusi soal Deep Learning, Competitive Programming, atau sekadar ngobrol soal film Sci-Fi?
        </p>

        {/* Email Button */}
        <a 
          href="mailto:email@anda.com" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform mb-16"
        >
          <Mail size={20} />
          <span>Say Hello</span>
        </a>

        {/* Social Links */}
        <div className="flex items-center gap-8 mb-16">
          {[
            { icon: Github, href: "https://github.com" },
            { icon: Linkedin, href: "https://linkedin.com" },
            { icon: Twitter, href: "https://twitter.com" },
          ].map((social, i) => (
            <a 
              key={i}
              href={social.href}
              target="_blank"
              className="text-gray-500 hover:text-white transition-colors transform hover:scale-110"
            >
              <social.icon size={24} />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="w-full border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-600 font-mono">
          <p>© 2025 Muhammad Daffa. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span>Bandung, Indonesia</span>
            <span>•</span>
            <span>Local Time: {new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'})}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}