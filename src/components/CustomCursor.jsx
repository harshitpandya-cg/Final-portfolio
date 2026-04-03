import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = ({ className = "" }) => {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { stiffness: 500, damping: 30 };
  const dotX = useSpring(cursorX, springConfig);
  const dotY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor);
    
    // Select all interactive elements
    const interactables = document.querySelectorAll('a, button, [role="button"], .group');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, []);

  return (
    <div className={`fixed inset-0 pointer-events-none z-[9999] hidden md:block ${className}`}>
      {/* Sleek Modern Arrow Cursor */}
      <motion.div
        className="absolute top-0 left-0"
        style={{
          x: dotX,
          y: dotY,
          rotate: -20, // Modern tilt
        }}
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_8px_rgba(20,184,166,0.5)]"
        >
          <path 
            d="M5.5 3.21V20.87C5.5 21.41 6.13 21.71 6.55 21.36L10.96 17.51C11.14 17.36 11.37 17.27 11.61 17.27H19.78C20.31 17.27 20.59 16.65 20.24 16.26L5.95 3.01C5.55 2.65 5.5 3.21 5.5 3.21Z" 
            fill="var(--color-primary, #14b8a6)" 
            stroke="white" 
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
      
      {/* Subtle Expansion on Hover */}
      <motion.div
        className="absolute top-0 left-0 w-8 h-8 rounded-full border border-primary/20 bg-primary/5"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-20%',
          translateY: '-20%',
          scale: isHovering ? 2.5 : 0,
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </div>
  );
};

export default CustomCursor;
