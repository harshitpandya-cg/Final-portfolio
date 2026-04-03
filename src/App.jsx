import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Services from './components/Services';
import Education from './components/Education';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TechBackground from './components/TechBackground';
import CustomCursor from './components/CustomCursor';

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Hide welcome screen after 3.5 seconds (increased by 1s)
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3500);

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
              scale: 1.1,
              filter: "blur(100px)",
              transition: { duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }
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
                  {["H", "a", "r", "s", "h", "i", "t"].map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      transition={{ 
                        delay: 0.4 + (i * 0.08), 
                        duration: 1, 
                        ease: [0.22, 1, 0.36, 1] 
                      }}
                      className="inline-block hover:text-primary transition-all duration-500 cursor-default"
                    >
                      {char}
                    </motion.span>
                  ))}
                  <span className="inline-block w-6 md:w-12"></span>
                  {["P", "a", "n", "d", "y", "a"].map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      transition={{ 
                        delay: 1.1 + (i * 0.08), 
                        duration: 1, 
                        ease: [0.22, 1, 0.36, 1] 
                      }}
                      className="inline-block text-gradient hover:scale-105 transition-all duration-500 cursor-default"
                    >
                      {char}
                    </motion.span>
                  ))}
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

      <div className="bg-dark text-white min-h-screen selection:bg-primary selection:text-white relative overflow-x-hidden">
        <CustomCursor className="hidden md:block" />
        <TechBackground />
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Certificates />
          <Services />
          <Education />
          <Contact />
        </main>
        <Footer />

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
