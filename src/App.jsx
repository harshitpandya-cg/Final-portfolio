import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LazySection from './components/LazySection';

// Individual Lazy Imports
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
  const [showWelcome, setShowWelcome] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    try { return localStorage.getItem('theme') || 'dark'; } catch { return 'dark'; }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    try { localStorage.setItem('theme', theme); } catch (e) {}
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    // Optimized preloader time for better UX and LCP
    const timer = setTimeout(() => setShowWelcome(false), 1200);
    
    // Efficient scroll handling
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowScrollTop(window.scrollY > 500);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 1.05,
              filter: "blur(20px)",
              transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
            }}
            className="fixed inset-0 z-[99999] bg-[#030014] flex items-center justify-center flex-col overflow-hidden pointer-events-none"
          >
            {/* Ambient Background */}
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

      <div className="min-h-screen selection:bg-primary selection:text-white relative bg-[#030014] text-white">
        
        {/* Only mount background after preloader is gone to save TBT */}
        <Suspense fallback={null}>
          {!showWelcome && <TechBackground theme={theme} />}
        </Suspense>
        
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        
        <main className="relative z-10">
          <Hero theme={theme} />
          
          <LazySection><Suspense fallback={null}><About /></Suspense></LazySection>
          <LazySection><Suspense fallback={null}><Skills /></Suspense></LazySection>
          <LazySection><Suspense fallback={null}><Projects /></Suspense></LazySection>
          <LazySection><Suspense fallback={null}><Certificates /></Suspense></LazySection>
          <LazySection><Suspense fallback={null}><HackathonJourney /></Suspense></LazySection>
          <LazySection><Suspense fallback={null}><Achievements /></Suspense></LazySection>
          <LazySection><Suspense fallback={null}><Services /></Suspense></LazySection>
          <LazySection><Suspense fallback={null}><Education /></Suspense></LazySection>
          <LazySection><Suspense fallback={null}><Contact /></Suspense></LazySection>
        </main>
        
        <Suspense fallback={null}>
          <Footer />
        </Suspense>

        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 z-[100] p-4 rounded-full bg-primary/90 text-dark shadow-2xl transition-all cursor-pointer border border-primary/20 backdrop-blur-md"
              aria-label="Scroll to top"
            >
              <ArrowUp size={24} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
