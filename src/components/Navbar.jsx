import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${
      isScrolled 
        ? 'bg-dark/40 backdrop-blur-3xl py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)] border-b border-white/5' 
        : 'bg-transparent py-8'
    } px-6 md:px-12`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.a 
          href="#" 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center group relative"
        >
          <div className="relative">
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }} 
              className="absolute -inset-2.5 rounded-2xl border border-dashed border-primary/30 opacity-40 group-hover:opacity-100 group-hover:border-primary/60 transition-all duration-700"
            ></motion.div>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-primary/40 to-secondary/40 rotate-12 absolute -inset-1 blur-xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
            <div className="relative w-11 h-11 rounded-xl bg-dark border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="text-xl font-black text-primary italic tracking-tighter drop-shadow-[0_0_8px_rgba(20,184,166,0.8)]">HP</span>
            </div>
          </div>
        </motion.a>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="relative text-[11px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-all duration-500 group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-500 rounded-full"></span>
            </a>
          ))}
        </div>

        {/* Right Actions (Optional - could add social icons here) */}
        <div className="hidden md:flex items-center space-x-6">
           <a href="https://github.com/harshitpandya-cg" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-primary transition-colors duration-300"><FaGithub size={18} /></a>
           <a href="https://www.linkedin.com/in/harshitpandya2911/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-primary transition-colors duration-300"><FaLinkedin size={18} /></a>
        </div>

        {/* Mobile Menu Icon */}
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="md:hidden text-white/80 hover:text-white transition-colors p-2"
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="md:hidden fixed inset-0 top-0 left-0 w-full h-screen bg-dark/98 backdrop-blur-2xl z-[150] flex flex-col items-center justify-center space-y-8"
          >
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-8 text-white/60 hover:text-white"
            >
              <X size={32} />
            </button>
            {navLinks.map((link, idx) => (
              <motion.a 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className="text-4xl font-black uppercase tracking-widest text-white/40 hover:text-primary transition-all duration-300"
              >
                {link.name}
              </motion.a>
            ))}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex space-x-8 mt-12"
            >
              <a href="https://github.com/harshitpandya-cg" target="_blank" rel="noopener noreferrer"><FaGithub size={24} className="text-white/40 hover:text-primary transition-colors" /></a>
              <a href="https://www.linkedin.com/in/harshitpandya2911/" target="_blank" rel="noopener noreferrer"><FaLinkedin size={24} className="text-white/40 hover:text-primary transition-colors" /></a>
              <a href="https://x.com/HarshitP68223" target="_blank" rel="noopener noreferrer"><FaTwitter size={24} className="text-white/40 hover:text-primary transition-colors" /></a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
