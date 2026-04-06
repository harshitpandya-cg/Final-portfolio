const TechBackground = ({ theme }) => {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 5000], [0, -200]);

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const technologies = [
    'React', 'Node.js', 'Python', 'FastAPI', 'JavaScript', 'Tailwind', 'MongoDB', 'PostgreSQL'
  ];

  // Using CSS animations significantly reduces main-thread work
  const configs = React.useMemo(() => {
    const circleCount = isMobile ? 2 : 4;
    const dotCount = isMobile ? 4 : 8;
    const techCount = isMobile ? 4 : 8;
    
    return {
      circles: Array.from({ length: circleCount }).map((_, i) => ({
        size: isMobile ? 150 + i * 50 : 200 + i * 100,
        dur: 20 + i * 5,
        left: (i * 35) % 100,
        top: (i * 25) % 100,
        delay: i * -2,
      })),
      dots: Array.from({ length: dotCount }).map((_, i) => ({
        dur: 6 + i * 2,
        left: (i * 15) % 100,
        top: (i * 12) % 100,
        delay: i * -1,
      })),
      techs: technologies.slice(0, techCount).map((name, i) => ({
        name,
        left: (i * 20) % 90,
        top: (i * 15 + 10) % 90,
        dur: 30 + i * 10,
        delay: i * -5,
      }))
    };
  }, [isMobile]);

  return (
    <motion.div 
      style={{ y: yParallax }}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none bg-dark transition-colors duration-1000"
    >
      {/* 1. Enhanced Radial Baseline */}
      <div className={`absolute inset-0 bg-gradient-to-tr ${theme === 'light' ? 'from-primary/[0.03] to-secondary/[0.03]' : 'from-primary/[0.08] via-transparent to-secondary/[0.08]'}`}></div>
      
      {/* 2. Floating Rings/Circles */}
      {configs.circles.map((config, i) => (
        <div
          key={`circle-${i}`}
          className="absolute rounded-full animate-float-bg will-change-transform opacity-10"
          style={{
            width: config.size,
            height: config.size,
            left: `${config.left}%`,
            top: `${config.top}%`,
            animationDuration: `${config.dur}s`,
            animationDelay: `${config.delay}s`,
            background: `radial-gradient(circle, rgba(20, 184, 166, ${theme === 'light' ? '0.05' : '0.15'}) 0%, rgba(0,0,0,0) 70%)`
          }}
        />
      ))}

      {/* 3. Floating Tech Names */}
      {configs.techs.map((tech, idx) => (
        <div
          key={`tech-${idx}`}
          className={`absolute font-black text-[10px] md:text-[12px] tracking-[0.6em] uppercase whitespace-nowrap animate-float-bg-slow will-change-transform ${theme === 'light' ? 'text-primary/10' : 'text-primary/20'}`}
          style={{ 
            left: `${tech.left}%`, 
            top: `${tech.top}%`,
            animationDuration: `${tech.dur}s`,
            animationDelay: `${tech.delay}s`
          }}
        >
          {tech.name}
        </div>
      ))}

      {/* 4. Moving Small Tech Dots */}
      {configs.dots.map((dot, i) => (
        <div
          key={`dot-${i}`}
          className="absolute w-1.5 h-1.5 bg-primary/40 rounded-full blur-[1px] animate-pulse-slow will-change-transform"
          style={{
            left: `${dot.left}%`,
            top: `${dot.top}%`,
            animationDuration: `${dot.dur}s`,
            animationDelay: `${dot.delay}s`
          }}
        />
      ))}
    </motion.div>
  );
};

export default TechBackground;
