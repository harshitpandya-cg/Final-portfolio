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
const HackathonJourney = React.lazy(() => import('./components/HackathonJourney'));
const Achievements = React.lazy(() => import('./components/Achievements'));
const Contact = React.lazy(() => import('./components/Contact'));
const Footer = React.lazy(() => import('./components/Footer'));
const TechBackground = React.lazy(() => import('./components/TechBackground'));


const App = () => {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);
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
    // Hide welcome screen after 1.2 seconds (optimized for aesthetic experience & LCP)
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(false);
    }, 1200);

    // Delay theme and scroll listener slightly to improve TBT
    const interactionTimer = setTimeout(() => {
      let ticking = false;
      const handleScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            setShowScrollTop(window.scrollY > 400);
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }, 100);

    return () => {
      clearTimeout(welcomeTimer);
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
            {/* Reduced complexity background for lower TBT */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -top-1/4 -left-1/4 w-full h-full bg-[radial-gradient(circle,rgba(20,184,166,0.15)_0%,transparent_60%)]" />
              <div className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-[radial-gradient(circle,rgba(99,102,241,0.15)_0%,transparent_60%)]" />
            </div>

            <motion.div
              className="text-center relative z-10"
            >
              <motion.div 
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-xs md:text-sm text-primary/80 font-black uppercase tracking-[0.5em] mb-8"
              >
                Crafting Digital Excellence
              </motion.div>
              
              <div className="relative inline-block px-4">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1], delay: 0.3 }}
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent z-20 origin-center"
                />
                <div className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black text-white uppercase tracking-tighter leading-none mb-6 flex items-center justify-center">
                  <motion.div
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                    className="flex"
                  >
                    Harshit
                  </motion.div>
                  <span className="inline-block w-4 md:w-8"></span>
                  <motion.div
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                    className="flex text-gradient"
                  >
                    Pandya
                  </motion.div>
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="text-white/20 font-mono text-[9px] tracking-[0.4em] mt-10 uppercase italic"
              >
                Optimizing Core Vitals...
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div 
        className={`min-h-screen selection:bg-primary selection:text-white relative bg-[#030014] text-white transition-opacity duration-500`}
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
            <HackathonJourney />
            <Achievements />
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
