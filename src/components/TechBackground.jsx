import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TechBackground = () => {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 5000], [0, -200]);

  const technologies = [
    'JavaScript', 'Python', 'React', 'Node.js', 'C++', 'Java', 'Tailwind', 'Git',
    'HTML', 'CSS', 'MongoDB', 'PostgreSQL', 'Framer Motion', 'Vite', 'Express',
    'Next.js', 'Typescript', 'Three.js', 'Rust', 'Go', 'Docker', 'AWS'
  ];

  // Moving elements (Optimized for 60fps, no lag)
  const circles = Array.from({ length: 8 });
  const dots = Array.from({ length: 15 });

  return (
    <motion.div 
      style={{ y: yParallax }}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none bg-black"
    >
      {/* 1. Enhanced Radial Baseline */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/[0.08] via-transparent to-secondary/[0.08]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.05)_0%,transparent_70%)]"></div>

      {/* 2. More Visible Floating Rings/Circles */}
      {circles.map((_, i) => {
        const size = 150 + Math.random() * 300;
        const dur = 20 + Math.random() * 20;
        
        return (
          <motion.div
            key={`circle-${i}`}
            animate={{
              x: [0, Math.random() * 300 - 150, 0],
              y: [0, Math.random() * 300 - 150, 0],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.25, 0.1]
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
              background: 'radial-gradient(circle, rgba(20, 184, 166, 0.12) 0%, rgba(0,0,0,0) 70%)'
            }}
          />
        );
      })}

      {/* 3. Floating Tech Names - Enhanced Visibility */}
      {technologies.map((tech, idx) => {
        const startX = Math.random() * 95;
        const startY = Math.random() * 95;
        
        return (
          <motion.div
            key={`tech-${idx}`}
            animate={{ 
              opacity: [0.15, 0.4, 0.15],
              x: [0, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 150 - 75, 0],
            }}
            transition={{ 
              duration: 35 + Math.random() * 35, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute text-primary/30 font-black text-[11px] md:text-[13px] tracking-[0.5em] uppercase whitespace-nowrap drop-shadow-[0_0_10px_rgba(20,184,166,0.1)]"
            style={{ left: `${startX}%`, top: `${startY}%` }}
          >
            {tech}
          </motion.div>
        );
      })}

      {/* 4. Moving Small Tech Dots (More Frequent & Brighter) */}
      {dots.map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.5, 0.5],
            x: [0, Math.random() * 80 - 40, 0],
            y: [0, Math.random() * 80 - 40, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          className="absolute w-2 h-2 bg-primary/80 rounded-full blur-[1px]"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </motion.div>
  );
};

export default TechBackground;
