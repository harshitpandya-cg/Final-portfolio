import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight, Download, Eye } from 'lucide-react';

const harshitPhoto = "/harshit.jpg";
const resumePdf = "/Harshit_Pandya_Resume.pdf";

const Hero = ({ theme }) => {
  const heroProfile = harshitPhoto;
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden py-32">
      {/* Background Animated Blobs - Static on mobile for TBT optimization */}
      {isMobile ? (
        <>
          <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -right-20 w-[700px] h-[700px] bg-secondary/10 rounded-full blur-[120px]" />
        </>
      ) : (
        <>
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]"
          />
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-1/4 -right-20 w-[700px] h-[700px] bg-secondary/20 rounded-full blur-[120px]"
          />
        </>
      )}

      {/* Modern Center Glow for Legibility - Theme Aware */}
      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.8)_0%,transparent_100%)] ${theme === 'light' ? 'opacity-5' : 'opacity-40'} pointer-events-none transition-opacity duration-1000`}></div>

      <div className="container mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20">
        
        {/* Identity/Photo Content - Shows first on mobile, right on desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-2/5 flex flex-col items-center justify-center order-1 md:order-2"
        >
          <div className="relative w-56 h-56 md:w-[450px] md:h-[450px] group cursor-pointer">
             {/* Animated border rings - Optimized with will-change */}
             <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-[spin_12s_linear_infinite] will-change-transform"></div>
             <div className="absolute inset-4 md:inset-6 rounded-full border-2 border-secondary/20 animate-[spin_18s_linear_infinite_reverse] will-change-transform"></div>
             
             <div className="absolute inset-0 m-auto w-48 h-48 md:w-[400px] md:h-[400px] rounded-full glass border border-white/10 overflow-hidden shadow-2xl shadow-primary/20 lg:group-hover:scale-[1.03] transition-all duration-[1000ms] ease-[cubic-bezier(0.19,1,0.22,1)] will-change-transform">
               <img 
                 src={heroProfile} 
                 alt="Harshit Pandya Headshot" 
                 width={400}
                 height={400}
                 loading="eager"
                 className="w-full h-full object-cover transition-all duration-[1000ms] brightness-90 lg:group-hover:brightness-110 lg:group-hover:scale-110" 
               />
             </div>
             
             {/* Circular rotating label decoration - Only on Desktop for better TBT - CSS Animated */}
             <div 
               className="absolute -inset-6 md:-inset-10 hidden lg:flex items-center justify-center pointer-events-none animate-spin-slow"
             >
                <svg viewBox="0 0 100 100" className="w-full h-full opacity-10">
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
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full md:w-3/5 text-center md:text-left order-2 md:order-1 min-w-0"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="px-6 py-2 rounded-full glass border border-white/10 text-[9px] font-black tracking-[0.5em] text-primary uppercase inline-block mb-10 shadow-lg shadow-primary/5"
          >
            Digital Craftsman
          </motion.span>
          <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-black tracking-tight leading-[0.85] mb-12">
            Harshit <br />
            <span className="text-gradient">Pandya</span>
          </h1>
          
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 2, delay: 0.8 }}
             className="flex flex-col mb-16 items-center md:items-start"
          >
             <p className="text-lg md:text-2xl text-white/40 font-medium max-w-xl leading-relaxed">
               I build <span className="text-white font-bold">high-performance</span> web applications with a focus on <span className="text-gradient font-bold">modern user experiences</span>.
             </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-5"
          >
            <a href="#projects" aria-label="Explore my projects" className="w-full sm:w-auto group relative px-10 py-5 rounded-2xl overflow-hidden bg-primary font-black text-white shadow-xl shadow-primary/20 lg:hover:shadow-primary/40 lg:hover:-translate-y-1.5 transition-all duration-500 text-center">
              <span className="relative z-10 flex items-center justify-center tracking-[0.2em] uppercase text-[11px]">
                Explore Projects
                <ArrowRight className="ml-3 lg:group-hover:translate-x-1.5 transition-transform duration-500" size={14} aria-hidden="true" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 lg:group-hover:opacity-100 transition-opacity duration-700"></div>
            </a>
            
            <a 
              href={resumePdf} 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Harshit Pandya's resume (opens in new tab)"
              className="w-full sm:w-auto group px-10 py-5 rounded-2xl glass border border-white/10 font-black tracking-[0.2em] uppercase text-[10px] flex items-center justify-center lg:hover:bg-white/10 lg:hover:-translate-y-1 transition-all duration-500 lg:hover:border-white/20"
            >
               <Eye size={14} className="mr-3 text-primary lg:group-hover:scale-110 transition-transform" aria-hidden="true" />
               View CV
            </a>

            <a 
              href={resumePdf} 
              download="Harshit_Pandya_Resume.pdf"
              aria-label="Download Harshit Pandya's resume as PDF"
              className="w-full sm:w-auto group px-10 py-5 rounded-2xl glass border border-white/10 font-black tracking-[0.2em] uppercase text-[10px] flex items-center justify-center lg:hover:bg-white/10 lg:hover:-translate-y-1 transition-all duration-500 lg:hover:border-white/20"
            >
               <Download size={14} className="mr-3 text-secondary lg:group-hover:scale-110 transition-transform" aria-hidden="true" />
               Download CV
            </a>
          </motion.div>
        </motion.div>

      </div>

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[10px] uppercase font-bold tracking-[0.4em] text-white/20"
        >
          Scroll Down
        </motion.div>
        <div className="w-[1px] h-20 bg-gradient-to-b from-primary/50 to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
