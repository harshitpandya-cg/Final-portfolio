import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight, Download, Eye } from 'lucide-react';

const harshitPhoto = "/harshit.jpg";
const resumePdf = "https://drive.google.com/file/d/1iOnGN3g0YFzFb_9AxSzG1M7FyRsrc-J8/view";

const Hero = ({ theme, isVisible }) => {
  const heroProfile = harshitPhoto;
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden py-32">
      {/* Background Animated Blobs - Optimized with CSS for lower TBT */}
      <div 
        className="absolute top-1/4 -left-20 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse-slow will-change-[opacity,transform]" 
        style={{ animationDuration: '10s', display: isVisible ? 'block' : 'none' }} 
      />
      <div 
        className="absolute bottom-1/4 -right-20 w-[350px] md:w-[700px] h-[350px] md:h-[700px] bg-secondary/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse-slow will-change-[opacity,transform]" 
        style={{ animationDuration: '15s', animationDelay: '2s', display: isVisible ? 'block' : 'none' }} 
      />

      {/* Modern Center Glow for Legibility - Theme Aware */}
      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.8)_0%,transparent_100%)] ${theme === 'light' ? 'opacity-5' : 'opacity-40'} pointer-events-none transition-opacity duration-1000`}></div>

      <div className="container mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20">
        
        {/* Identity/Photo Content - Shows first on mobile, right on desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="w-full md:w-2/5 flex flex-col items-center justify-center order-1 md:order-2"
        >
          <div className="relative w-56 h-56 md:w-[450px] md:h-[450px] group cursor-pointer">
             {/* Animated border rings - Optimized with will-change */}
             <div className="absolute inset-0 rounded-full border border-primary/20 animate-[spin_20s_linear_infinite] will-change-transform"></div>
             <div className="absolute inset-4 md:inset-6 rounded-full border border-secondary/10 animate-[spin_30s_linear_infinite_reverse] will-change-transform"></div>
             
             <div className="absolute inset-0 m-auto w-48 h-48 md:w-[400px] md:h-[400px] rounded-full glass border border-white/5 overflow-hidden shadow-2xl transition-all duration-[1000ms] ease-[cubic-bezier(0.19,1,0.22,1)] will-change-transform bg-white/5">
               <img 
                 src={heroProfile} 
                 alt="Harshit Pandya Headshot" 
                 width={400}
                 height={400}
                 loading="eager"
                 fetchpriority="high"
                 decoding="async"
                 className="w-full h-full object-cover brightness-95 lg:group-hover:brightness-110 lg:group-hover:scale-105 transition-all duration-700 ease-out" 
               />
             </div>
             
             {/* Circular rotating label decoration - Only on Desktop for better TBT - CSS Animated */}
             <div 
               className="absolute -inset-6 md:-inset-10 hidden lg:flex items-center justify-center pointer-events-none animate-spin-slow opacity-20"
             >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                   <path id="circlePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="transparent" />
                   <text className="text-[6px] font-black uppercase tracking-[0.5em] fill-white">
                     <textPath href="#circlePath">
                       Frontend Developer • Full Stack Developer • UI/UX Designer •
                     </textPath>
                   </text>
                </svg>
             </div>
          </div>
        </motion.div>

        {/* Text Content - Shows second on mobile, left on desktop */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="w-full md:w-3/5 text-center md:text-left order-2 md:order-1 min-w-0"
        >
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="px-6 py-2 rounded-full glass border border-white/5 text-[9px] font-black tracking-[0.5em] text-primary uppercase inline-block mb-10 shadow-lg"
          >
            Digital Craftsman
          </motion.span>
          <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-black tracking-tighter leading-[0.85] mb-12">
            Harshit <br />
            <span className="text-gradient">Pandya</span>
          </h1>
          
          <motion.div
             initial={{ opacity: 0, y: 15 }}
             animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
             transition={{ duration: 1, delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
             className="flex flex-col mb-16 items-center md:items-start"
          >
             <p className="text-lg md:text-2xl text-white/40 font-medium max-w-xl leading-relaxed">
               I build <span className="text-white font-bold tracking-tight">high-performance</span> web applications with a focus on <span className="text-gradient font-black">modern user experiences</span>.
             </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-5"
          >
            <a href="#projects" aria-label="Explore my projects" className="w-full sm:w-auto group relative px-10 py-5 rounded-2xl overflow-hidden bg-primary font-black text-white shadow-2xl shadow-primary/20 lg:hover:-translate-y-2 transition-all duration-[0.8s] ease-[cubic-bezier(0.19,1,0.22,1)] text-center">
              <span className="relative z-10 flex items-center justify-center tracking-[0.2em] uppercase text-[11px]">
                Explore Projects
                <ArrowRight className="ml-3 lg:group-hover:translate-x-2 transition-transform duration-[0.8s] ease-[cubic-bezier(0.19,1,0.22,1)]" size={14} aria-hidden="true" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 lg:group-hover:opacity-100 transition-opacity duration-[0.8s] ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
            </a>
            
            <a 
              href={resumePdf} 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto group px-10 py-5 rounded-2xl glass border border-white/5 font-black tracking-[0.2em] uppercase text-[10px] flex items-center justify-center lg:hover:bg-white/10 lg:hover:-translate-y-1.5 transition-all duration-[0.8s] ease-[cubic-bezier(0.19,1,0.22,1)]"
            >
               <Eye size={14} className="mr-3 text-primary lg:group-hover:scale-110 transition-transform duration-500" aria-hidden="true" />
               View CV
            </a>

            <a 
              href={resumePdf} 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto group px-10 py-5 rounded-2xl glass border border-white/5 font-black tracking-[0.2em] uppercase text-[10px] flex items-center justify-center lg:hover:bg-white/10 lg:hover:-translate-y-1.5 transition-all duration-[0.8s] ease-[cubic-bezier(0.19,1,0.22,1)]"
            >
               <Download size={14} className="mr-3 text-secondary lg:group-hover:scale-110 transition-transform duration-500" aria-hidden="true" />
               Download CV
            </a>
          </motion.div>
        </motion.div>

      </div>

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-[10px] uppercase font-black tracking-[0.5em] text-white/20"
        >
          Scroll
        </motion.div>
        <div className="w-[1px] h-20 bg-gradient-to-b from-primary/30 to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
