import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/5 relative z-10 px-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <div className="flex items-center gap-4 mb-6 justify-center md:justify-start">
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-2 rounded-xl border-[2px] border-dashed border-primary/40 opacity-50 lg:group-hover:opacity-100 lg:group-hover:border-primary transition-all duration-500 animate-[spin_10s_linear_infinite]"></div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary rotate-12 absolute -inset-1 blur-md opacity-30 animate-pulse"></div>
              <div className="relative w-10 h-10 rounded-lg bg-dark border border-white/10 flex items-center justify-center">
                <span className="text-xl font-black text-primary italic tracking-tighter drop-shadow-[0_0_8px_rgba(20,184,166,1)]">HP</span>
              </div>
            </div>
          </div>
          <p className="text-white/30 text-xs font-semibold tracking-widest uppercase">
            &copy; 2026 Harshit Pandya. All Rights Reserved.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Social Links */}
          <div className="flex space-x-6">
            <a href="https://github.com/harshitpandya-cg" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-white/30 lg:hover:text-white transition-all duration-300 lg:hover:scale-125">
              <FaGithub size={20} />
            </a>
            <a href="https://www.linkedin.com/in/harshitpandya2911/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/30 lg:hover:text-[#0077b5] transition-all duration-300 lg:hover:scale-125">
              <FaLinkedin size={20} />
            </a>
            <a href="https://x.com/HarshitP68223" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-white/30 lg:hover:text-[#1da1f2] transition-all duration-300 lg:hover:scale-125">
               <FaTwitter size={20} />
            </a>
            <a href="https://www.youtube.com/@harshitpandya2911" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-white/30 lg:hover:text-[#ff0000] transition-all duration-300 lg:hover:scale-125">
              <FaYoutube size={20} />
            </a>
          </div>

          <p className="text-white/30 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
            Built with <span className="text-primary animate-pulse font-black text-lg">❤️</span> using React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
