import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WireframeLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isWiping, setIsWiping] = useState(false);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 1800; // 1.8s for smooth counter

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const pct = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(updateCounter);
      } else {
        setIsWiping(true);
        setTimeout(() => {
          onComplete();
        }, 850);
      }
    };

    const animFrame = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animFrame);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key="site-loader"
        initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
        animate={
          isWiping
            ? {
                clipPath: 'polygon(0 0, 100% 0, 100% 0%, 0 0%)',
                transition: { duration: 0.85, ease: [0.77, 0, 0.175, 1] },
              }
            : { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }
        }
        className="fixed inset-0 z-[99999] bg-[#0B0B08] flex flex-col items-center justify-center select-none"
      >
        {/* Subtle background technical grid */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(to right, #8A8880 1px, transparent 1px), linear-gradient(to bottom, #8A8880 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative z-10 flex flex-col items-center">
          {/* Architectural HP Wireframe Monogram */}
          <div className="relative w-28 h-28 md:w-36 md:h-36 mb-10 flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              fill="none"
              strokeWidth="2.5"
            >
              {/* Outer guide diamond */}
              <circle
                cx="50"
                cy="50"
                r="46"
                stroke="#8A8880"
                strokeWidth="1"
                strokeDasharray="4 6"
                className="opacity-40"
              />

              {/* H - Left stem */}
              <motion.path
                d="M 18 18 L 30 18 L 30 82 L 18 82 Z"
                stroke="#E6E4DE"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: progress / 100, opacity: 1 }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />

              {/* H-P bridge bar */}
              <motion.path
                d="M 30 44 L 46 44 L 46 56 L 30 56 Z"
                stroke="#F0552D"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: progress / 100, opacity: 1 }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />

              {/* H Right / P Left Stem */}
              <motion.path
                d="M 46 18 L 58 18 L 58 82 L 46 82 Z"
                stroke="#E6E4DE"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: progress / 100, opacity: 1 }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />

              {/* P Head Loop */}
              <motion.path
                d="M 58 18 L 82 18 L 82 52 L 58 52 Z M 58 30 L 70 30 L 70 40 L 58 40 Z"
                stroke="#E6E4DE"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: progress / 100, opacity: 1 }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
            </svg>
          </div>

          {/* Degree Counter and Mono Labels */}
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-baseline space-x-2">
              <span className="font-mono text-4xl md:text-5xl font-light text-[#F0552D] tracking-tighter">
                {String(progress).padStart(3, '0')}°
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#8A8880]">
                ROT / INIT
              </span>
            </div>

            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#8A8880]/70">
              HARSHIT PANDYA // ARCHITECTING
            </p>
          </div>
        </div>

        {/* Bottom subtle status bar */}
        <div className="absolute bottom-10 left-10 right-10 flex justify-between items-center font-mono text-[10px] text-[#8A8880]/50 uppercase tracking-[0.25em]">
          <span>GANDHINAGAR, IN</span>
          <span>SYSTEM CALIBRATION</span>
          <span>BTECH CSE '29</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default React.memo(WireframeLoader);
