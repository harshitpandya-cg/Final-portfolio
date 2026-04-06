import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Layout, Zap } from 'lucide-react';

const Services = () => {
  const services = [
    {
      title: 'Full Stack Development',
      description: 'Building robust, scalable, and high-performance web applications using modern technologies like React, Node.js, and MongoDB.',
      icon: <Globe size={40} className="text-primary mb-6" />,
      tag: 'End-to-End Solutions',
    },
    {
      title: 'UI/UX Designing',
      description: 'Crafting visually stunning, user-centric, and intuitive digital interfaces with a focus on experience and aesthetics using Figma.',
      icon: <Layout size={40} className="text-secondary mb-6" />,
      tag: 'Human Centered Design',
    },
    {
      title: 'Performance Optimization',
      description: 'Optimizing existing web applications for speed, SEO, and accessibility to ensure a seamless user experience across all devices.',
      icon: <Zap size={40} className="text-accent mb-6" />,
      tag: 'Fast & Reliable',
    },
  ];

  return (
    <section id="services" className="py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[120px] rounded-full"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-secondary font-bold tracking-[0.5em] uppercase text-sm mb-6"
          >
            How I Help
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[40px] md:text-8xl font-black text-white mt-4 tracking-tight leading-[0.85]"
          >
            Creative <br /> <span className="text-gradient">Solutions</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              whileHover={typeof window !== 'undefined' && window.innerWidth >= 1024 ? { y: -10 } : {}}
              className="glass-card p-12 rounded-[50px] group relative overflow-hidden border border-white/5 bg-white/2"
            >
              {/* Animated Glow on hover */}
              <div className="absolute -inset-24 bg-gradient-to-br from-primary/10 to-transparent opacity-0 lg:group-hover:opacity-100 transition-opacity blur-[80px]"></div>
              
              <div className="relative z-10">
                <div className="bg-white/5 w-20 h-20 rounded-[30px] flex items-center justify-center mb-10 border border-white/10 lg:group-hover:bg-primary/20 transition-all duration-500 lg:group-hover:scale-110 shadow-2xl">
                  {service.icon}
                </div>
                <h3 className="text-3xl font-bold text-white mb-6 lg:group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-white/40 text-lg leading-[1.6] mb-12 italic">
                  {service.description}
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary shadow-lg shadow-primary/50"></div>
                  <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white/20 lg:group-hover:text-white/40 transition-colors">{service.tag}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
