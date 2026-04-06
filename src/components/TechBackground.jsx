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
  // Significantly reduced counts for mobile performance
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const circleCount = isMobile ? 3 : 6;
  const dotCount = isMobile ? 5 : 12;
  const techCount = isMobile ? 8 : 16;
  
  const circles = Array.from({ length: circleCount });
  const dots = Array.from({ length: dotCount });
  const displayTech = technologies.slice(0, techCount);

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
        const size = isMobile ? 100 + Math.random() * 150 : 150 + Math.random() * 300;
        const dur = 25 + Math.random() * 20;
        
        return (
          <motion.div
            key={`circle-${i}`}
            animate={{
              x: [0, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 200 - 100, 0],
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: dur,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute rounded-full will-change-transform"
            style={{
              width: size,
              height: size,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: 'radial-gradient(circle, rgba(20, 184, 166, 0.1) 0%, rgba(0,0,0,0) 70%)'
            }}
          />
        );
      })}

      {/* 3. Floating Tech Names - Enhanced Visibility */}
      {displayTech.map((tech, idx) => {
        const startX = Math.random() * 90;
        const startY = Math.random() * 90;
        
        return (
          <motion.div
            key={`tech-${idx}`}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{ 
              duration: 40 + Math.random() * 40, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute text-primary/20 font-black text-[10px] md:text-[12px] tracking-[0.5em] uppercase whitespace-nowrap will-change-transform"
            style={{ left: `${startX}%`, top: `${startY}%` }}
          >
            {tech}
          </motion.div>
        );
      })}

      {/* 4. Moving Small Tech Dots */}
      {dots.map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0.5, 1.2, 0.5],
            x: [0, Math.random() * 60 - 30, 0],
            y: [0, Math.random() * 60 - 30, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 8,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          className="absolute w-1.5 h-1.5 bg-primary/60 rounded-full blur-[1px] will-change-transform"
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
