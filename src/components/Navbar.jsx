import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import hpLogo from '../assets/favicon.jpeg';


const Navbar = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Hackathon', href: '#hackathon' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 border-0 ${
      isScrolled 
        ? theme === 'light'
          ? 'bg-slate-100/90 backdrop-blur-xl py-4 shadow-sm border-b border-black/5'
          : 'bg-[#030014]/90 backdrop-blur-xl py-4'
        : 'bg-transparent py-4'
    } px-4 md:px-6`}>
      <div className="container mx-auto px-0 flex justify-between items-center">
        <motion.a
          href="#"
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-3.5 group relative"
          aria-label="Harshit Pandya Portfolio Home"
        >
          {/* Logo box */}
          <div className="relative shrink-0">
            {/* Spinning border ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-2 rounded-2xl border border-dashed border-primary/30 opacity-50 group-hover:opacity-100 group-hover:border-primary/70 transition-all duration-500 will-change-transform"
            />
             {/* Glow blob */}
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-primary/50 to-secondary/50 rotate-12 absolute -inset-1 blur-xl opacity-0 group-hover:opacity-80 transition-all duration-700" />
            {/* Logo container */}
            <div className="relative w-13 h-13 rounded-2xl bg-[#030014] border border-white/10 group-hover:border-primary/40 flex items-center justify-center overflow-hidden shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/15 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src={hpLogo}
                alt="Harshit Pandya Monogram"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>

        </motion.a>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`relative text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-500 group nav-link ${theme === 'light' ? 'text-dark/80' : 'text-white/40 hover:text-white'}`}
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-500 rounded-full"></span>
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center">
           <motion.button
             whileHover={{ scale: 1.1, rotate: 15 }}
             whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-primary cursor-pointer hover:shadow-[0_0_15px_rgba(20,184,166,0.2)] transition-all"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
        </div>

        {/* Mobile Menu Icon & Toggle */}
        <div className="flex items-center space-x-4 md:hidden">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-primary cursor-pointer"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
          
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className={`transition-colors p-2 ${theme === 'light' ? 'text-dark/70 hover:text-dark' : 'text-white/80 hover:text-white'}`}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`md:hidden fixed inset-0 top-0 left-0 w-full h-screen backdrop-blur-2xl z-[150] flex flex-col items-center justify-center space-y-8 ${
              theme === 'light' ? 'bg-slate-100/98' : 'bg-dark/98'
            }`}
          >
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-8 text-white/60 hover:text-white"
              aria-label="Close menu"
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
                className={`text-4xl font-black uppercase tracking-widest transition-all duration-300 ${theme === 'light' ? 'text-dark/40 hover:text-primary' : 'text-white/40 hover:text-primary'}`}
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
