import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';

const ThemeSwitch = () => {
  const [mode, setMode] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.getAttribute('data-mode') || 'dark';
    }
    return 'dark';
  });

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  const [isHidden, setIsHidden] = useState(false);
  const bulbRef = useRef(null);
  const isDraggingRef = useRef(false);

  const swingControls = useAnimation();
  const pullControls = useAnimation();
  const flickerControls = useAnimation();

  // Reduced motion detection
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setPrefersReducedMotion(e.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  // Synchronize state with document attribute if changed externally
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const current = document.documentElement.getAttribute('data-mode') || 'dark';
      setMode(current);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-mode'] });
    return () => observer.disconnect();
  }, []);

  // Hide while case study modal or fullscreen menu is open
  useEffect(() => {
    const checkVisibility = () => {
      const modalOpen =
        Boolean(window.__isModalOpen) ||
        Boolean(document.body.dataset.modalOpen) ||
        document.body.style.overflow === 'hidden';
      setIsHidden(modalOpen);
    };

    const interval = setInterval(checkVisibility, 150);
    window.addEventListener('modalStateChange', checkVisibility);
    return () => {
      clearInterval(interval);
      window.removeEventListener('modalStateChange', checkVisibility);
    };
  }, []);

  const triggerFeedback = useCallback(
    (toMode) => {
      if (prefersReducedMotion) return;

      // 1. Pendulum swing around top anchor
      const swingAngle = toMode === 'light' ? 6 : -6;
      swingControls.start({
        rotate: [0, swingAngle, -swingAngle * 0.55, swingAngle * 0.25, 0],
        transition: { duration: 0.85, ease: [0.25, 1, 0.5, 1] },
      });

      // 2. Pull bounce
      pullControls.start({
        y: [0, 18, 0],
        transition: { type: 'spring', stiffness: 320, damping: 14 },
      });

      // 3. Bulb flicker when turning on (Light mode)
      if (toMode === 'light') {
        flickerControls.start({
          opacity: [1, 0.45, 1, 0.75, 1],
          transition: { duration: 0.2, times: [0, 0.25, 0.5, 0.75, 1] },
        });
      }
    },
    [flickerControls, prefersReducedMotion, pullControls, swingControls]
  );

  const toggleTheme = useCallback(() => {
    const nextMode = mode === 'dark' ? 'light' : 'dark';

    // Pause Three.js & Carousel during transition
    window.__isThemeTransitioning = true;
    setTimeout(() => {
      window.__isThemeTransitioning = false;
    }, 750);

    const applyNewTheme = () => {
      setMode(nextMode);
      document.documentElement.setAttribute('data-mode', nextMode);
      try {
        localStorage.setItem('theme-mode', nextMode);
      } catch {
        // Ignore localStorage restrictions
      }
      const metaTheme = document.querySelector('meta[name="theme-color"]');
      if (metaTheme) {
        metaTheme.setAttribute('content', nextMode === 'light' ? '#F3F1EC' : '#0B0B08');
      }
      triggerFeedback(nextMode);
    };

    if (
      !prefersReducedMotion &&
      typeof document !== 'undefined' &&
      typeof document.startViewTransition === 'function'
    ) {
      const rect = bulbRef.current?.getBoundingClientRect();
      const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 100;
      const y = rect ? rect.top + rect.height / 2 : 75;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      document.documentElement.setAttribute('data-vt', 'true');
      const transition = document.startViewTransition(() => {
        applyNewTheme();
      });

      transition.ready.then(() => {
        const anim = document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 700,
            easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );
        anim.onfinish = () => {
          document.documentElement.removeAttribute('data-vt');
        };
      });
    } else {
      applyNewTheme();
    }
  }, [mode, prefersReducedMotion, triggerFeedback]);

  const isLight = mode === 'light';

  return (
    <aside
      aria-label="Theme switcher"
      style={{
        position: 'fixed',
        top: 0,
        right: 'clamp(80px, 8vw, 128px)',
        zIndex: 350,
      }}
      className={`pointer-events-auto transition-opacity duration-300 ${
        isHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <button
        role="switch"
        aria-checked={isLight}
        aria-label={`Toggle theme (currently ${mode}). Drag cord down or click to switch.`}
        onClick={() => {
          if (!isDraggingRef.current) toggleTheme();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleTheme();
          }
        }}
        className="group relative flex flex-col items-center cursor-pointer focus:outline-none select-none bg-transparent border-0 p-0"
      >
        {/* Top Anchor Rosette Mount on Screen Edge */}
        <div className="w-3.5 h-1.5 bg-[#8A8880] rounded-b-sm shadow-sm transition-colors duration-300" />

        {/* Pendulum Swinging & Pulling Assembly */}
        <motion.div
          style={{ transformOrigin: 'top center' }}
          animate={swingControls}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={pullControls}
            drag="y"
            dragConstraints={{ top: 0, bottom: 28 }}
            dragElastic={0.35}
            onDragStart={() => {
              isDraggingRef.current = true;
            }}
            onDragEnd={(e, info) => {
              setTimeout(() => {
                isDraggingRef.current = false;
              }, 60);
              if (info.offset.y > 15) {
                toggleTheme();
              }
            }}
            className="flex flex-col items-center cursor-grab active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-[#F0552D] focus-visible:ring-offset-2 rounded-full p-1"
          >
            {/* Cord with Hanging Grab Bead */}
            <div className="relative flex flex-col items-center">
              {/* Upper Cord */}
              <div className="w-[1.5px] h-7 sm:h-9 bg-[#8A8880]/80 transition-colors duration-300" />

              {/* Grab Bead / Knob Handle */}
              <div className="w-2.5 h-3.5 rounded-full bg-[#F0552D] shadow-sm border border-black/20 my-0.5 group-hover:scale-110 transition-transform duration-200" />

              {/* Lower Cord to Bulb Socket */}
              <div className="w-[1.5px] h-4 sm:h-6 bg-[#8A8880]/80 transition-colors duration-300" />
            </div>

            {/* Light Bulb Container */}
            <motion.div
              ref={bulbRef}
              animate={flickerControls}
              className="relative flex items-center justify-center"
            >
              {/* Warm Ambient Radial Glow when Bulb is ON (Light Mode) */}
              <div
                className={`absolute w-16 h-16 rounded-full pointer-events-none transition-opacity duration-300 ${
                  isLight ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}
                style={{
                  background:
                    'radial-gradient(circle, rgba(255,217,160,0.55) 0%, rgba(240,85,45,0.2) 45%, transparent 70%)',
                }}
              />

              {/* Inline SVG Light Bulb */}
              <svg
                width="24"
                height="34"
                viewBox="0 0 24 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-10 transition-transform duration-200 group-hover:scale-105"
              >
                {/* Screw Socket / Base */}
                <rect x="8.5" y="0" width="7" height="3" rx="0.5" fill="#8A8880" />
                <path d="M 8.5 3 Q 12 4.5 15.5 3" stroke="#6B6963" strokeWidth="1" />
                <path d="M 8.5 5.5 Q 12 7 15.5 5.5" stroke="#6B6963" strokeWidth="1" />
                <path d="M 9.5 8 L 14.5 8 L 13.5 10 L 10.5 10 Z" fill="#6B6963" />

                {/* Glass Bulb Body */}
                <path
                  d="M 9.5 9.5 C 9.5 13 4 17 4 23 C 4 28.5 7.6 33 12 33 C 16.4 33 20 28.5 20 23 C 20 17 14.5 13 14.5 9.5 Z"
                  fill={isLight ? 'rgba(255, 248, 235, 0.45)' : 'rgba(28, 27, 24, 0.55)'}
                  stroke={isLight ? '#FFD9A0' : 'rgba(138, 136, 128, 0.55)'}
                  strokeWidth="1.2"
                  className="transition-colors duration-300"
                />

                {/* Internal Filament */}
                <path
                  d="M 10 14 L 10 19 L 12 17 L 14 19 L 14 14"
                  stroke={isLight ? '#FFD9A0' : '#4A4843'}
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-colors duration-300"
                />

                {/* Filament Glow Ring (Active in Light mode) */}
                {isLight && (
                  <circle cx="12" cy="18" r="3" fill="#FFE5B4" opacity="0.8" />
                )}

                {/* Glass Specular Reflection Highlight */}
                <path
                  d="M 6.5 21 C 6.5 17.5 9 14.5 10 13.5"
                  stroke={isLight ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)'}
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Hover / Focus Tooltip */}
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded bg-[#0B0B08] text-[#E6E4DE] dark:bg-[#E6E4DE] dark:text-[#0B0B08] font-mono text-[9px] uppercase tracking-wider shadow-lg opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 pointer-events-none transition-opacity duration-200 border border-[#8A8880]/30">
          {isLight ? 'Pull for dark mode' : 'Pull for light mode'}
        </div>
      </button>
    </aside>
  );
};

export default React.memo(ThemeSwitch);
