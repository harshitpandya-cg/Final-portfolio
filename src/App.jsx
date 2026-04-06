import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
const About = React.lazy(() => import('./components/About'));
const Skills = React.lazy(() => import('./components/Skills'));
const Projects = React.lazy(() => import('./components/Projects'));
const Services = React.lazy(() => import('./components/Services'));
const Education = React.lazy(() => import('./components/Education'));
const Certificates = React.lazy(() => import('./components/Certificates'));
const Contact = React.lazy(() => import('./components/Contact'));
const Footer = React.lazy(() => import('./components/Footer'));
const TechBackground = React.lazy(() => import('./components/TechBackground'));


const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('theme') || 'dark'; } catch { return 'dark'; }
  });

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    // Hide welcome screen after 2.0 seconds (optimized for Speed Index)
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 2000);

    // Track scroll for "Move to Top" button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 1.05,
              transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
            }}
            className="fixed inset-0 z-[99999] bg-dark flex items-center justify-center flex-col overflow-hidden"
          >
            {/* Animated background patterns for welcome screen */}
            <div className="absolute inset-0 opacity-30">
              <motion.div 
                animate={{ 
                  scale: [1, 1.15, 1],
                  rotate: [0, 45, 0],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1/2 -left-1/2 w-full h-full bg-[radial-gradient(circle,rgba(20,184,166,0.2)_0%,transparent_70%)]"
              />
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, -45, 0],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-[radial-gradient(circle,rgba(99,102,241,0.2)_0%,transparent_70%)]"
              />
            </div>

            <motion.div
              className="text-center relative z-10"
            >
              <motion.h1 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-sm md:text-lg text-primary/80 font-black uppercase tracking-[0.6em] mb-10"
              >
                Transforming Ideas Into Digital Experiences
              </motion.h1>
              
              <div className="relative inline-block px-4">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1], delay: 0.5 }}
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent z-20 origin-center"
                />
                <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] font-black text-white uppercase tracking-tighter leading-none mb-6 flex items-center justify-center">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
                    className="flex"
                  >
                    {["H", "a", "r", "s", "h", "i", "t"].map((char, i) => (
                      <span key={i} className="inline-block hover:text-primary transition-all duration-500 cursor-default">{char}</span>
                    ))}
                  </motion.div>
                  <span className="inline-block w-6 md:w-12"></span>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
                    className="flex text-gradient"
                  >
                    {["P", "a", "n", "d", "y", "a"].map((char, i) => (
                      <span key={i} className="inline-block hover:scale-105 transition-all duration-500 cursor-default">{char}</span>
                    ))}
                  </motion.div>
                </h2>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 1.2 }}
                className="text-white/20 font-mono text-[10px] tracking-[0.5em] mt-12 uppercase italic"
              >
                Refining digital experience...
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div 
        className={`min-h-screen selection:bg-primary selection:text-white relative overflow-x-hidden bg-dark text-white transition-colors duration-1000 ease-in-out`}
      >

        <React.Suspense fallback={null}>
          {!showWelcome && <TechBackground theme={theme} />}
        </React.Suspense>
        
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        
        <main className="relative z-10">
          <Hero theme={theme} />
          
          <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center -mt-20"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
            <About />
            <Skills />
            <Projects />
            <Certificates />
            <Services />
            <Education />
            <Contact />
          </React.Suspense>
        </main>
        
        <React.Suspense fallback={null}>
          <Footer />
        </React.Suspense>

        {/* Scroll To Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 z-[100] p-4 rounded-full bg-primary/90 text-dark shadow-[0_0_10px_rgba(20,184,166,0.2)] hover:shadow-[0_0_25px_rgba(20,184,166,0.8)] transition-all cursor-pointer border border-primary/20 hover:border-primary/50 backdrop-blur-md"
              aria-label="Scroll to top"
            >
              <ArrowUp size={24} className="font-bold" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
