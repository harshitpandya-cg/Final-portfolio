import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, MapPin, GraduationCap, Briefcase } from 'lucide-react';
import aboutPhoto from '../assets/about-photo.jpg';
const aboutImage = aboutPhoto;

const About = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-16 lg:gap-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 flex flex-col space-y-8 order-2 md:order-1"
          >
            <div className="space-y-4">
              <h4 className="text-secondary font-bold tracking-widest uppercase text-xs">A Bit About Me</h4>
              <h2 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
                Passion for <br className="hidden md:block" />
                <span className="text-gradient">quality development.</span>
              </h2>
            </div>
            <p className="text-lg text-white/50 leading-relaxed max-w-xl italic">
              "I am a passionate <span className="text-white">Full Stack Developer</span> and a 2nd-semester B.Tech Computer Science student at <span className="text-white">CodingGita</span> (2025-2029). 
              I specialize in bridging the gap between innovative design and robust back-end logic."
            </p>
            <p className="text-lg text-white/50 leading-relaxed max-w-xl">
              From crafting pixel-perfect interfaces to architecting scalable server-side systems, I thrive on building end-to-end solutions that are both functional and performant. My goal is to master the entire modern web stack.
            </p>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="md:w-1/2 flex items-center justify-center relative order-1 md:order-2"
          >
            <div className="relative w-full max-w-sm md:max-w-md aspect-[4/5] overflow-hidden rounded-[50px] group shadow-2xl shadow-primary/10 bg-dark">
                <div className="absolute inset-0 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                <img 
                  src={aboutImage} 
                  alt="About me" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
