import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CHARS = "!<>-_\\/[]{}—=+*^?#@%$&";
const TARGET_TEXT = "Harshit Pandya";

const IntroAnimation = ({ onComplete }) => {
  const [displayText, setDisplayText] = useState("");
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    let iteration = 0;
    let animationFrame;
    
    const animate = () => {
      setDisplayText(TARGET_TEXT.split("").map((letter, index) => {
        if(index < iteration) {
          return TARGET_TEXT[index];
        }
        // Preserve spaces
        if (TARGET_TEXT[index] === " ") return " ";
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join(""));
      
      if(iteration >= TARGET_TEXT.length) {
        setIsRevealed(true);
        // Wait 1 second after fully resolving, then trigger fade out
        const finishTimer = setTimeout(() => {
          onComplete();
        }, 1200);
        return () => clearTimeout(finishTimer);
      }
      
      iteration += 1 / 4; // Adjust speed (lower is slower)
      animationFrame = requestAnimationFrame(animate);
    };

    // Small initial delay before hacking begins
    const startTimeout = setTimeout(() => {
      animate();
    }, 400);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(startTimeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      key="scramble-intro"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        filter: "blur(20px)",
        scale: 1.1,
        transition: { duration: 1.2, ease: [0.65, 0, 0.35, 1] } 
      }}
      className="fixed inset-0 z-[99999] bg-[#030014] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Soft Ambient Background / Particle Glow */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(20,184,166,0.15)_0%,transparent_70%)] rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(99,102,241,0.15)_0%,transparent_70%)] rounded-full blur-[120px]" 
        />
      </div>

      <div className="relative z-10 w-full flex items-center justify-center px-4">
        {/* Container for zooming effect */}
        <motion.div
          initial={{ scale: 0.8, filter: "blur(10px)" }}
          animate={{ scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <motion.h1 
            className={`text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-bold uppercase tracking-tight leading-none transition-all duration-500 font-serif flex gap-2 sm:gap-4 flex-wrap justify-center
              ${isRevealed ? 'text-gradient drop-shadow-[0_0_20px_rgba(20,184,166,0.6)]' : 'text-white/80 drop-shadow-md'}
            `}
          >
            {/* Map over characters to allow word wrap on small screens but keep monospace feel */}
            {displayText.split(" ").map((word, wIdx) => (
              <span key={wIdx} className="flex">
                {word.split("").map((char, cIdx) => (
                  <span key={cIdx} className="inline-block w-[0.8em] text-center">
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </motion.h1>
          
          {/* Accent Line that grows when revealed */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ 
              scaleX: isRevealed ? 1 : 0, 
              opacity: isRevealed ? 1 : 0 
            }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
            className="h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mt-8 mx-auto w-3/4 max-w-lg origin-center"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default IntroAnimation;
