import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight, Download, Eye } from 'lucide-react';

import harshitPhoto from '../assets/harshit.jpg';
import resumePdf from '../assets/Harshit Pandya Final-Resume.pdf.pdf';

const Hero = () => {
  const heroProfile = harshitPhoto;

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden py-32">
      {/* Background Animated Blobs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 -right-20 w-[700px] h-[700px] bg-secondary/20 rounded-full blur-[120px]"
      />

      <div className="container mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-20">
        
        {/* Left Side: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="md:w-3/5 text-left"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="px-6 py-2 rounded-full glass border border-white/10 text-[10px] font-black tracking-[0.4em] text-primary uppercase inline-block mb-10"
          >
            Digital Craftsman
          </motion.span>
          <h1 className="text-7xl md:text-9xl font-black tracking-tight leading-[0.85] mb-12">
            Harshit <br />
            <span className="text-gradient">Pandya</span>
          </h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.8 }}
            className="flex flex-col mb-16"
          >
             <p className="text-xl md:text-3xl text-white/50 font-medium max-w-2xl leading-relaxed">
               I build <span className="text-white font-bold">high-performance</span> web applications with a focus on <span className="text-gradient font-bold">modern user experiences</span>.
             </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <a href="#projects" className="w-full sm:w-auto group relative px-8 py-5 rounded-full overflow-hidden bg-primary font-black text-white shadow-2xl shadow-primary/40 hover:scale-105 transition-all duration-500 text-center">
              <span className="relative z-10 flex items-center justify-center tracking-widest uppercase text-[10px]">
                Explore Projects
                <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" size={14} />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </a>
            
            <a 
              href={resumePdf} 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto group px-8 py-5 rounded-full glass border border-white/10 font-black tracking-widest uppercase text-[10px] flex items-center justify-center hover:bg-white/5 transition-all duration-300 hover:border-white/30"
            >
               <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center mr-3 group-hover:bg-primary/20 transition-all">
                  <Eye size={12} className="text-white" />
               </div>
               View CV
            </a>

            <a 
              href={resumePdf} 
              download="Harshit_Pandya_Resume.pdf" 
              className="w-full sm:w-auto group px-8 py-5 rounded-full glass border border-white/10 font-black tracking-widest uppercase text-[10px] flex items-center justify-center hover:bg-white/5 transition-all duration-300 hover:border-white/30"
            >
               <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center mr-3 group-hover:bg-primary/20 transition-all">
                  <Download size={12} className="text-white" />
               </div>
               Download CV
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side: Identity/Photo Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="md:w-2/5 flex flex-col items-center justify-center"
        >
          <div className="relative w-64 h-64 md:w-[450px] md:h-[450px] group cursor-pointer">
             {/* Animated border rings - Luxury High-End Feel */}
             <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-[spin_12s_linear_infinite]"></div>
             <div className="absolute inset-6 rounded-full border-2 border-secondary/20 animate-[spin_18s_linear_infinite_reverse]"></div>
             
             <div className="absolute inset-0 m-auto w-56 h-56 md:w-[400px] md:h-[400px] rounded-full glass border border-white/10 overflow-hidden shadow-2xl shadow-primary/30 group-hover:scale-105 transition-transform duration-700">
               <img 
                 src={heroProfile} 
                 alt="Harshit Pandya Headshot" 
                 className="w-full h-full object-cover transition-all duration-700 brightness-90 group-hover:brightness-110" 
               />
             </div>
             
             {/* Circular rotating label decoration */}
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
               className="absolute -inset-10 hidden md:flex items-center justify-center pointer-events-none"
             >
                <svg viewBox="0 0 100 100" className="w-full h-full opacity-10">
                  <path id="circlePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="transparent" />
                  <text className="text-[6px] font-black uppercase tracking-[0.5em] fill-white">
                    <textPath href="#circlePath">
                      Frontend Developer • Full Stack Developer • UI/UX Designer •
                    </textPath>
                  </text>
                </svg>
             </motion.div>

          </div>
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
