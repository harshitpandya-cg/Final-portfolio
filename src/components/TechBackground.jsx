import React from 'react';

const TechBackground = ({ theme }) => {
  const [isMobile, setIsMobile] = React.useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const technologies = [
    'React', 'Node.js', 'Python', 'JavaScript', 'Tailwind', 'MongoDB'
  ];

  const configs = React.useMemo(() => {
    // Drastically reduced counts for massive TBT improvement
    const circleCount = isMobile ? 1 : 2; 
    const dotCount = isMobile ? 2 : 4;
    const techCount = isMobile ? 2 : 4;

    return {
      circles: Array.from({ length: circleCount }).map((_, i) => ({
        size: isMobile ? 150 : 250 + i * 150,
        dur: 25 + i * 10,
        left: (i * 45 + 10) % 100,
        top: (i * 35 + 15) % 100,
        delay: i * -5,
      })),
      dots: Array.from({ length: dotCount }).map((_, i) => ({
        dur: 8 + i * 3,
        left: (i * 25 + 5) % 100,
        top: (i * 20 + 10) % 100,
        delay: i * -2,
      })),
      techs: technologies.slice(0, techCount).map((name, i) => ({
        name,
        left: (i * 25 + 10) % 90,
        top: (i * 25 + 20) % 90,
        dur: 40 + i * 15,
        delay: i * -8,
      }))
    };
  }, [isMobile]);

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none bg-dark transition-colors duration-1000"
    >
      {/* Radial Baseline */}
      <div className={`absolute inset-0 bg-gradient-to-tr ${theme === 'light' ? 'from-primary/[0.01] to-secondary/[0.01]' : 'from-primary/[0.03] via-transparent to-secondary/[0.03]'}`} />

      {/* Floating Rings - Optimized with will-change and hardware acceleration */}
      {configs.circles.map((config, i) => (
        <div
          key={`circle-${i}`}
          aria-hidden="true"
          className="absolute rounded-full animate-float-bg will-change-transform opacity-[0.03] pointer-events-none"
          style={{
            width: config.size,
            height: config.size,
            left: `${config.left}%`,
            top: `${config.top}%`,
            animationDuration: `${config.dur}s`,
            animationDelay: `${config.delay}s`,
            background: `radial-gradient(circle, rgba(20,184,166,${theme === 'light' ? '0.02' : '0.05'}) 0%, rgba(0,0,0,0) 70%)`,
            transform: 'translate3d(0,0,0)'
          }}
        />
      ))}

      {/* Floating Tech Names */}
      {configs.techs.map((tech, idx) => (
        <div
          key={`tech-${idx}`}
          aria-hidden="true"
          className={`absolute font-black text-[9px] md:text-[11px] tracking-[0.5em] uppercase whitespace-nowrap animate-float-bg-slow will-change-transform pointer-events-none ${theme === 'light' ? 'text-primary/[0.05]' : 'text-primary/[0.08]'}`}
          style={{
            left: `${tech.left}%`,
            top: `${tech.top}%`,
            animationDuration: `${tech.dur}s`,
            animationDelay: `${tech.delay}s`,
            transform: 'translate3d(0,0,0)'
          }}
        >
          {tech.name}
        </div>
      ))}

      {/* Small Tech Dots */}
      {configs.dots.map((dot, i) => (
        <div
          key={`dot-${i}`}
          aria-hidden="true"
          className="absolute w-1 h-1 bg-primary/20 rounded-full blur-[1px] animate-pulse-slow will-change-transform pointer-events-none"
          style={{
            left: `${dot.left}%`,
            top: `${dot.top}%`,
            animationDuration: `${dot.dur}s`,
            animationDelay: `${dot.delay}s`,
            transform: 'translate3d(0,0,0)'
          }}
        />
      ))}
    </div>
  );
};

export default React.memo(TechBackground);

