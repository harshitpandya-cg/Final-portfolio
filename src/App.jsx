import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import CustomCursor from './components/CustomCursor';
import WireframeLoader from './components/WireframeLoader';
import ThemeSwitch from './components/ThemeSwitch';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Work from './components/Work';
import AboutProcess from './components/AboutProcess';
import Skills from './components/Skills';
import HighlightsCarousel from './components/HighlightsCarousel';
import Honors from './components/Honors';
import ServicesAcademics from './components/ServicesAcademics';
import Stats from './components/Stats';
import Footer from './components/Footer';
import { smoothScrollTo } from './utils/smoothScroll';

const App = () => {
  const [loading, setLoading] = useState(true);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  // Global anchor click interception for smooth cinematic scroll
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Only intercept in-page hash links (e.g., "#work", "#", "#contact")
      if (href.startsWith('#')) {
        e.preventDefault();

        // While modal is open, clicks must do nothing
        if (window.__isModalOpen || document.body.dataset.modalOpen === 'true') {
          return;
        }

        smoothScrollTo(href);
      }
    };

    const handleHashChange = (e) => {
      // If modal is open, prevent hash updates in the address bar
      if (window.__isModalOpen || document.body.dataset.modalOpen === 'true') {
        e.preventDefault();
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    };

    document.addEventListener('click', handleAnchorClick);
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <>
      {/* Wireframe Outline Loader with Degree Counter */}
      {loading && <WireframeLoader onComplete={() => setLoading(false)} />}

      {/* Lerped Shard/Diamond Cursor */}
      <CustomCursor />

      {/* Subtle Film-Grain Overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Site Frame with 24px Rounded Corners */}
      <div className="min-h-screen bg-[var(--bg-primary,#0B0B08)] p-2 sm:p-3 md:p-4 transition-colors duration-300">
        <div className="site-frame min-h-screen relative bg-[var(--bg-primary,#0B0B08)] transition-colors duration-300">
          
          {/* Hanging Light-Bulb Pull Cord Theme Switch (Fixed Top-Right) */}
          <ThemeSwitch />

          {/* Fixed Navigation */}
          <Navbar />

          {/* Main Layout Following Exact Approved Section Sequence */}
          <main className="relative w-full">
            {/* 01. Hero (Pinned, Dark #0B0B08, 300vh, 3D Monogram, 3-Beat Story) */}
            <Hero />

            {/* 02. Work / Projects (Paper #E6E4DE) */}
            <Work />

            {/* 03. About & Process (Paper → Ink Blueprint + Diagonal Slash Reveal) */}
            <AboutProcess />

            {/* 04. Skills / Arsenal (Ink #0B0B08) */}
            <Skills />

            {/* 05. Highlights & Recognition Quote Carousel (Paper #E6E4DE) */}
            <HighlightsCarousel />

            {/* 06. Honors, Hackathons & Certificates (Paper #E6E4DE) */}
            <Honors />

            {/* 07. Services & Academics (Ink #0B0B08) */}
            <ServicesAcademics />

            {/* 08. Stats (Paper #E6E4DE, Ruled Rows with Count-Up, Near the End) */}
            <Stats />

            {/* 09. Footer / Get In Touch (Ink #0B0B08) */}
            <Footer />
          </main>

        </div>
      </div>
    </>
  );
};

export default App;
