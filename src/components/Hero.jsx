import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Download, Eye } from 'lucide-react';
import HeroMonogramCanvas from './HeroMonogramCanvas';
import resumeFile from '../assets/Harshit_Pandya_Resume.pdf';

const Hero = () => {
  const containerRef = useRef(null);
  const monogramRef = useRef(null);
  const degreeTextRef = useRef(null);
  const degreeCircleRef = useRef(null);
  const currentBeatTextRef = useRef(null);
  const currentBeatRef = useRef(1);
  const [currentBeat, setCurrentBeat] = useState(1);
  const [currentTime, setCurrentTime] = useState(() => {
    if (typeof window !== 'undefined') {
      const now = new Date();
      return now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    }
    return '';
  });
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  // Live Clock for Asia/Kolkata (Gandhinagar, IST)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setCurrentTime(timeStr);
    };
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Screen width check
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  // Scroll Progress Tracking for the 300svh pinned container
  // Updates DOM refs & 3D monogram directly to eliminate per-frame React re-renders
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) {
            ticking = false;
            return;
          }
          const rect = containerRef.current.getBoundingClientRect();
          const totalScroll = containerRef.current.offsetHeight - window.innerHeight;
          const currentScroll = -rect.top;
          const progress = Math.max(0, Math.min(1, currentScroll / (totalScroll || 1)));

          // Direct Three.js monogram update
          monogramRef.current?.updateProgress(progress);

          // Direct DOM updates for degree counter & circle progress
          const deg = Math.min(360, Math.round(progress * 360));
          if (degreeTextRef.current) {
            degreeTextRef.current.textContent = `${String(deg).padStart(3, '0')}°`;
          }
          if (degreeCircleRef.current) {
            degreeCircleRef.current.style.strokeDashoffset = String(100.5 - (100.5 * progress));
          }

          // 3 Beats driven by scroll progress (only triggers setState when beat changes)
          const newBeat = progress < 0.33 ? 1 : progress < 0.66 ? 2 : 3;
          if (currentBeatTextRef.current) {
            currentBeatTextRef.current.textContent = `0${newBeat}`;
          }
          if (newBeat !== currentBeatRef.current) {
            currentBeatRef.current = newBeat;
            setCurrentBeat(newBeat);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      data-theme="ink"
      className="relative h-[300svh] w-full bg-[#0B0B08] text-[#E6E4DE]"
    >
      {/* Sticky Child (100svh Viewport) */}
      <div className="sticky top-0 h-[100svh] w-full flex flex-col justify-between pt-24 pb-8 px-6 sm:px-10 md:px-16 overflow-hidden select-none">
        
        {/* Top Status & Role Meta */}
        <div className="w-full flex items-center justify-between z-20 shrink-0">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#8A8880]">
              Full-Stack Developer · UI/UX Designer · Btech CSE'29
            </span>
            <span className="font-mono text-[9px] text-[#F0552D] tracking-widest mt-0.5">
              CODINGGITA // GANDHINAGAR
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-6 font-mono text-[11px] uppercase tracking-widest text-[#8A8880] mr-24 md:mr-32">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F0552D] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F0552D]" />
              </span>
              <span className="text-[#E6E4DE]">Open for opportunities</span>
            </div>
            <div className="h-3 w-[1px] bg-[#8A8880]/30" />
            <div className="flex items-center gap-1.5">
              <span>Gandhinagar</span>
              <span className="text-[#E6E4DE]">{currentTime} IST</span>
            </div>
          </div>
        </div>

        {/* Center Arena: 3-Column Grid Layout (Desktop) / Vertical Stack (Mobile < 1100px) */}
        <div className="relative flex-1 w-full my-auto min-h-0">
          <div className="grid grid-cols-1 xl:grid-cols-[auto_minmax(0,1fr)_auto] grid-rows-[auto_minmax(160px,36svh)_auto] xl:grid-rows-1 items-center gap-2 xl:gap-6 w-full h-full min-h-0">
            
            {/* Block 1: "I design it." */}
            <div className="row-start-1 col-start-1 xl:row-start-1 xl:col-start-1 shrink-0 z-20 min-w-0">
              <AnimatePresence mode="wait">
                {currentBeat === 1 && (
                  <motion.div
                    key="beat-1-left"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
                    className="text-left"
                  >
                    <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#F0552D] block mb-0.5 xl:mb-1">
                      01 // PHILOSOPHY
                    </span>
                    <h1
                      className="tracking-[-0.04em] text-[#E6E4DE] font-semibold whitespace-nowrap"
                      style={{ fontSize: 'clamp(34px, min(8.5vw, 13.5vh), 136px)', lineHeight: 0.9 }}
                    >
                      I design it.
                    </h1>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Block 2: Middle Canvas Arena */}
            <div className="row-start-2 col-start-1 xl:row-start-1 xl:col-start-2 relative w-full h-full min-w-0 flex items-center justify-center overflow-visible z-10 px-4 xl:px-6">
              <HeroMonogramCanvas ref={monogramRef} isMobile={isMobile} currentBeat={currentBeat} />

              {/* Beats 2 & 3 Centered Overlay */}
              <AnimatePresence mode="wait">
                {currentBeat === 2 && (
                  <motion.div
                    key="beat-2"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 pointer-events-none px-4"
                  >
                    <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#F0552D] block mb-2 sm:mb-3">
                      BEAT 02 // BLUEPRINT &amp; ARCHITECTURE
                    </span>
                    <h2
                      className="font-semibold tracking-[-0.04em] text-[#E6E4DE] mb-3"
                      style={{ fontSize: 'clamp(28px, min(6.5vw, 9vh), 88px)', lineHeight: 0.95 }}
                    >
                      Every build starts <br /> as a sketch.
                    </h2>
                    <p className="font-mono text-[10px] sm:text-xs text-[#8A8880] tracking-widest max-w-lg mx-auto uppercase">
                      From initial wireframe and system architecture to precision design.
                    </p>
                  </motion.div>
                )}

                {currentBeat === 3 && (
                  <motion.div
                    key="beat-3"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 pointer-events-none px-4"
                  >
                    <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#F0552D] block mb-2 sm:mb-3">
                      BEAT 03 // SHIP TO PRODUCTION
                    </span>
                    <h2
                      className="font-semibold tracking-[-0.04em] text-[#E6E4DE] mb-3"
                      style={{ fontSize: 'clamp(28px, min(6.5vw, 9vh), 88px)', lineHeight: 0.95 }}
                    >
                      Then I ship it <br /> myself.
                    </h2>
                    <p className="font-mono text-[10px] sm:text-xs text-[#8A8880] tracking-widest max-w-lg mx-auto uppercase">
                      Robust backend logic, clean interfaces, live production deploy.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Block 3: "I build it." */}
            <div className="row-start-3 col-start-1 xl:row-start-1 xl:col-start-3 shrink-0 z-20 min-w-0">
              <AnimatePresence mode="wait">
                {currentBeat === 1 && (
                  <motion.div
                    key="beat-1-right"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
                    className="text-right"
                  >
                    <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#F0552D] block mb-0.5 xl:mb-1">
                      02 // EXECUTION
                    </span>
                    <h2
                      className="tracking-[-0.04em] text-[#E6E4DE] font-semibold whitespace-nowrap"
                      style={{ fontSize: 'clamp(34px, min(8.5vw, 13.5vh), 136px)', lineHeight: 0.9 }}
                    >
                      I build it.
                    </h2>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* Bottom Strip: Bio, Action Buttons, and Aligned Degree Indicator */}
        <div className="w-full flex flex-col md:flex-row items-center md:items-end justify-between gap-6 z-20 shrink-0">
          
          {/* Bio & Actions */}
          <div className="max-w-xl text-center md:text-left">
            <p className="text-xs sm:text-sm text-[#8A8880] leading-relaxed mb-4 font-light max-w-lg">
              Full-stack developer and UI/UX designer from Gandhinagar, crafting fast, polished web apps from first wireframe to live deploy.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <a
                href="#work"
                className="px-5 py-2.5 rounded-full bg-[#E6E4DE] text-[#0B0B08] font-mono text-[10px] sm:text-[11px] uppercase tracking-widest font-bold hover:bg-[#F0552D] hover:text-white transition-all duration-300 flex items-center gap-1.5"
              >
                <span>Explore Work</span>
                <ArrowDown size={13} />
              </a>

              <a
                href={resumeFile}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-full border border-[#8A8880]/30 text-[#E6E4DE] font-mono text-[10px] sm:text-[11px] uppercase tracking-widest hover:border-[#F0552D] hover:text-[#F0552D] transition-colors flex items-center gap-1.5"
              >
                <Eye size={13} />
                <span>View CV</span>
              </a>

              <a
                href={resumeFile}
                download="Harshit_Pandya_Resume.pdf"
                className="px-4 py-2.5 rounded-full border border-[#8A8880]/30 text-[#E6E4DE] font-mono text-[10px] sm:text-[11px] uppercase tracking-widest hover:border-[#F0552D] hover:text-[#F0552D] transition-colors flex items-center gap-1.5"
              >
                <Download size={13} />
                <span>Download CV</span>
              </a>
            </div>
          </div>

          {/* Right: Degree Counter with 32px Margin */}
          <div className="flex items-center gap-4 shrink-0 self-end md:self-auto">
            <div className="flex flex-col items-end font-mono">
              <div
                ref={degreeTextRef}
                className="text-2xl sm:text-3xl font-light text-[#F0552D] tracking-tighter"
              >
                000°
              </div>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#8A8880]">
                SCROLL ROTATION
              </span>
            </div>

            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#8A8880]/20 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 40 40">
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="transparent"
                  className="text-[#8A8880]/20"
                />
                <circle
                  ref={degreeCircleRef}
                  cx="20"
                  cy="20"
                  r="16"
                  stroke="#F0552D"
                  strokeWidth="2"
                  strokeDasharray={100.5}
                  strokeDashoffset={100.5}
                  fill="transparent"
                  className="transition-all duration-75"
                />
              </svg>
              <span
                ref={currentBeatTextRef}
                className="absolute font-mono text-[8px] sm:text-[9px] text-[#E6E4DE]"
              >
                01
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default React.memo(Hero);
