import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LazySection from './components/LazySection';
import IntroAnimation from './components/IntroAnimation';

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
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <AnimatePresence>
        {showWelcome && (
          <IntroAnimation 
            onComplete={() => setShowWelcome(false)} 
          />
        )}
      </AnimatePresence>

      <div className="min-h-screen selection:bg-primary selection:text-white relative bg-[#030014] text-white">
        
        {/* Only mount background after preloader is gone to save TBT */}
        <Suspense fallback={null}>
          {!showWelcome && <TechBackground theme={theme} />}
        </Suspense>
        
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        
        <main className="relative z-10">
          <Hero theme={theme} isVisible={!showWelcome} />
          
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
