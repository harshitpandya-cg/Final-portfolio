import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Scroll listener removed as navbar is no longer sticky
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="absolute top-0 left-0 w-full z-100 bg-transparent py-6 px-6 md:px-12">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.a 
          href="#" 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center group"
        >
          <div className="relative">
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }} 
              className="absolute -inset-2 rounded-2xl border-[2px] border-dashed border-primary/40 opacity-50 group-hover:opacity-100 group-hover:border-primary transition-all duration-500"
            ></motion.div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-secondary rotate-12 absolute -inset-1 blur-lg opacity-40 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
            <div className="relative w-12 h-12 rounded-xl bg-dark border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="text-2xl font-black text-primary italic tracking-tighter drop-shadow-[0_0_10px_rgba(20,184,166,1)]">HP</span>
            </div>
          </div>
        </motion.a>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-semibold hover:text-primary transition-all duration-300 uppercase tracking-widest opacity-60 hover:opacity-100">
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Icon */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white cursor-pointer">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[72px] bg-dark/95 backdrop-blur-xl z-99 flex flex-col items-center justify-center space-y-8 animate-in fade-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl font-semibold hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="flex space-x-6 mt-4">
            <a href="https://github.com/harshitpandya-cg" target="_blank" rel="noopener noreferrer"><FaGithub className="cursor-pointer hover:text-primary transition-colors" /></a>
            <a href="https://www.linkedin.com/in/harshitpandya2911/" target="_blank" rel="noopener noreferrer"><FaLinkedin className="cursor-pointer hover:text-primary transition-colors" /></a>
            <a href="https://x.com/HarshitP68223" target="_blank" rel="noopener noreferrer"><FaTwitter className="cursor-pointer hover:text-primary transition-colors" /></a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
