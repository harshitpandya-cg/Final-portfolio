import React from 'react';
import { motion } from 'framer-motion';

const TechBackground = () => {
  const technologies = [
    'JavaScript', 'Python', 'React', 'Node.js', 'C++', 'Java', 'Tailwind', 'Git',
    'HTML', 'CSS', 'MongoDB', 'PostgreSQL', 'Framer Motion', 'Vite', 'Express',
    'Next.js', 'Typescript', 'Three.js', 'Rust', 'Go', 'Docker', 'AWS'
  ];

  // Moving elements (Optimized for 60fps, no lag)
  const circles = Array.from({ length: 10 });
  const dots = Array.from({ length: 20 });

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none bg-black">
      {/* 1. Subtle Radial Baseline */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/[0.05] via-transparent to-secondary/[0.05]"></div>

      {/* 2. Visible Floating Rings/Circles */}
      {circles.map((_, i) => {
        const size = 100 + Math.random() * 200;
        const dur = 25 + Math.random() * 25;
        
        return (
          <motion.div
            key={`circle-${i}`}
            animate={{
              x: [0, Math.random() * 250 - 125, 0],
              y: [0, Math.random() * 250 - 125, 0],
              scale: [1, 1.1, 1],
              opacity: [0.05, 0.15, 0.05]
            }}
            transition={{
              duration: dur,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: 'radial-gradient(circle, rgba(234, 179, 8, 0.08) 0%, rgba(0,0,0,0) 70%)'
            }}
          />
        );
      })}

      {/* 3. Floating Tech Names - Clearly Visible */}
      {technologies.map((tech, idx) => {
        const startX = Math.random() * 95;
        const startY = Math.random() * 95;
        
        return (
          <motion.div
            key={`tech-${idx}`}
            animate={{ 
              opacity: [0.1, 0.25, 0.1],
              x: [0, Math.random() * 150 - 75, 0],
              y: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{ 
              duration: 45 + Math.random() * 45, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute text-primary/40 font-bold text-[10px] md:text-[12px] tracking-[0.4em] uppercase whitespace-nowrap"
            style={{ left: `${startX}%`, top: `${startY}%` }}
          >
            {tech}
          </motion.div>
        );
      })}

      {/* 4. Moving Small Tech Dots (Visible Blinking) */}
      {dots.map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0.5, 1.2, 0.5],
            x: [0, Math.random() * 50 - 25, 0],
            y: [0, Math.random() * 50 - 25, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 8,
            repeat: Infinity,
            delay: Math.random() * 10,
          }}
          className="absolute w-1.5 h-1.5 bg-primary/60 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

export default TechBackground;
