import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Trophy, Code2 } from 'lucide-react';

const highlights = [
  {
    id: 0,
    tabLabel: '01 / 2nd Place',
    headline: '2nd Place.',
    organization: 'SWAMINARAYAN UNIVERSITY // ELECTROSPHERE 2026',
    description:
      'Secured 2nd position among all competing teams in a prestigious inter-college technical event under the Open Innovation domain. Developed a cybersecurity awareness platform educating users on online threats with an engaging, user-friendly interface.',
    tags: ['Open Innovation', '2nd Position Podium', 'Technical Excellence', 'ElectroSphere 2K26'],
    icon: <Award size={18} className="text-[#F0552D]" />,
  },
  {
    id: 1,
    tabLabel: '02 / 7th Rank',
    headline: '7th Rank.',
    organization: 'IIIT SURAT HACKATHON // NATIONAL COMPETITION',
    description:
      'Ranked 7th among 30+ elite teams from across institutions. Delivered a full project pitch live in front of judges and fellow students, demonstrating rapid prototyping, architectural execution, and public defense under pressure.',
    tags: ['IIIT Surat', '7th Rank Overall', '30+ Elite Teams', 'Live Pitch Defense'],
    icon: <Trophy size={18} className="text-[#F0552D]" />,
  },
  {
    id: 2,
    tabLabel: '03 / 10+ Projects',
    headline: '10+ Projects.',
    organization: 'FULL-STACK, UI CLONES & SYSTEMS // CODINGGITA',
    description:
      'Engineered end-to-end web applications—including the CERS+ real-time medical emergency SOS platform, SecureComm cybersecurity simulation, and pixel-perfect production clones—bridging innovative design with robust back-end systems.',
    tags: ['CERS+ Medical SOS', 'SecureComm', 'Production Deploys', 'React & Node.js'],
    icon: <Code2 size={18} className="text-[#F0552D]" />,
  },
];

const HighlightsCarousel = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  const sectionRef = useRef(null);
  const timerRef = useRef(null);
  const startTimeRef = useRef(0);
  const remainingTimeRef = useRef(5500);

  const duration = prefersReducedMotion ? 8000 : 5500;

  // Reduced motion event listener
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setPrefersReducedMotion(e.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveTab((prev) => (prev + 1) % highlights.length);
    setCycleKey((prev) => prev + 1);
    remainingTimeRef.current = duration;
    startTimeRef.current = Date.now();
  }, [duration]);

  // Handle Tab Selection by User Click
  const selectTab = useCallback((idx) => {
    setActiveTab(idx);
    setCycleKey((prev) => prev + 1);
    remainingTimeRef.current = duration;
    startTimeRef.current = Date.now();
  }, [duration]);

  // Keyboard navigation for tablist (ArrowLeft / ArrowRight)
  const handleKeyDown = useCallback(
    (e, idx) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const next = (idx + 1) % highlights.length;
        selectTab(next);
        document.getElementById(`highlight-tab-${next}`)?.focus();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = (idx - 1 + highlights.length) % highlights.length;
        selectTab(prev);
        document.getElementById(`highlight-tab-${prev}`)?.focus();
      }
    },
    [selectTab]
  );

  // Main Timer loop
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearTimeout(timerRef.current);
      // Calculate remaining time
      const elapsed = Date.now() - startTimeRef.current;
      remainingTimeRef.current = Math.max(200, remainingTimeRef.current - elapsed);
      return;
    }

    startTimeRef.current = Date.now();
    timerRef.current = setTimeout(nextSlide, remainingTimeRef.current);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeTab, cycleKey, isPaused, nextSlide]);

  // Pause when off-screen, tab hidden, or modal/menu open
  useEffect(() => {
    let isVisibleOnScreen = true;
    let isTabVisible = !document.hidden;

    const checkPause = () => {
      const isModalOrMenuOpen =
        Boolean(window.__isModalOpen) ||
        Boolean(document.body.dataset.modalOpen) ||
        Boolean(window.__isThemeTransitioning) ||
        document.body.style.overflow === 'hidden';

      const shouldPause = !isVisibleOnScreen || !isTabVisible || isModalOrMenuOpen;
      setIsPaused(shouldPause);
    };

    // 1. Off-screen detection
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleOnScreen = entry.isIntersecting;
        checkPause();
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // 2. Tab visibility change
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      checkPause();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 3. Periodic check for modal/menu state
    const interval = setInterval(checkPause, 300);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(interval);
    };
  }, []);

  const current = highlights[activeTab];

  return (
    <section
      id="highlights"
      ref={sectionRef}
      data-theme="paper"
      role="region"
      aria-roledescription="carousel"
      aria-label="Highlights and Recognition"
      style={{
        isolation: 'isolate',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'geometricPrecision',
      }}
      className="relative py-24 sm:py-32 bg-[#E6E4DE] text-[#0B0B08] select-none scroll-mt-24 border-t border-[#0B0B08]/15"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#D63B13] font-bold">
            04 // HIGHLIGHTS &amp; RECOGNITION
          </span>
          <span className="h-[1px] w-12 bg-[#F0552D]" />
        </div>

        {/* 3 Tabs with Linear scaleX Progress Bar */}
        <div
          role="tablist"
          aria-label="Highlights and recognition milestones"
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14 border-b border-[#0B0B08]/15 pb-8"
        >
          {highlights.map((item, idx) => {
            const isActive = activeTab === idx;
            const isCompleted = activeTab > idx;

            return (
              <button
                key={item.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`highlight-panel-${item.id}`}
                id={`highlight-tab-${item.id}`}
                onClick={() => selectTab(idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F0552D] rounded-sm"
              >
                <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest mb-2.5 transition-colors duration-250">
                  <span
                    className={`transition-colors duration-250 ${
                      isActive
                        ? 'text-[#D63B13] font-bold'
                        : 'text-[#0B0B08]/65 group-hover:text-[#0B0B08]'
                    }`}
                  >
                    {item.tabLabel}
                  </span>
                  <span className="text-[#0B0B08]/50">0{idx + 1}</span>
                </div>

                {/* Linear scaleX Progress Bar (Zero Frame-by-Frame React State Updates) */}
                <div className="w-full h-[2px] bg-[#0B0B08]/15 overflow-hidden rounded-full relative">
                  {isActive && (
                    <div
                      key={`active-progress-${cycleKey}`}
                      className="absolute inset-0 bg-[#F0552D] origin-left"
                      style={{
                        animation: `linearScaleX ${duration}ms linear forwards`,
                        animationPlayState: isPaused ? 'paused' : 'running',
                        transformOrigin: 'left',
                      }}
                    />
                  )}
                  {isCompleted && (
                    <div className="absolute inset-0 bg-[#F0552D] origin-left scale-x-100" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Giant Quote Display (Reserved Height to Prevent Layout Shift) */}
        <div
          className="relative min-h-[340px] md:min-h-[300px] flex flex-col justify-between"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="absolute -top-12 -left-4 text-7xl md:text-9xl font-serif text-[#F0552D]/15 pointer-events-none select-none">
            “
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              role="tabpanel"
              id={`highlight-panel-${current.id}`}
              aria-labelledby={`highlight-tab-${current.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 max-w-5xl"
            >
              {/* Organization & Icon Badge */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#D63B13] mb-4 font-bold"
              >
                {current.icon}
                <span>{current.organization}</span>
              </motion.div>

              {/* Masked Headline Reveal */}
              <div className="overflow-hidden mb-6">
                <motion.h3
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { y: '110%' }
                  }
                  animate={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { y: '0%' }
                  }
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { y: '-110%' }
                  }
                  transition={{
                    duration: prefersReducedMotion ? 0.3 : 0.75,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="font-semibold tracking-[-0.04em] text-[#0B0B08]"
                  style={{
                    fontSize: 'clamp(40px, min(7vw, 10vh), 96px)',
                    lineHeight: 0.95,
                  }}
                >
                  {current.headline}
                </motion.h3>
              </div>

              {/* Supporting Text Crossfade */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.12 }}
                className="text-lg sm:text-xl md:text-2xl text-[#0B0B08]/85 font-light leading-relaxed mb-8 max-w-4xl"
              >
                "{current.description}"
              </motion.p>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex flex-wrap gap-2"
              >
                {current.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full border border-[#0B0B08]/20 bg-[#0B0B08]/5 font-mono text-[11px] text-[#0B0B08] uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Global CSS for the linear scaleX animation */}
      <style>{`
        @keyframes linearScaleX {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </section>
  );
};

export default React.memo(HighlightsCarousel);
