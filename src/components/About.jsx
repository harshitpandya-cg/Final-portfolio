import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Database, Layout, Terminal, Braces, Binary } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-16 lg:gap-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 flex flex-col space-y-8"
          >
            <div className="space-y-4">
              <p className="text-secondary font-bold tracking-widest uppercase text-sm">A Bit About Me</p>
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
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1, delay: 0.2 }}
             className="md:w-1/2 flex items-center justify-center relative"
          >
            <div className="relative w-full max-w-md aspect-[4/5] rounded-[48px] group overflow-hidden border border-white/10 bg-dark/60 backdrop-blur-3xl shadow-2xl shadow-primary/10 p-10 flex flex-col justify-between transition-all duration-700 hover:border-primary/30">
              {/* Animated Background Elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
                <motion.div 
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-1/4 -right-1/4 w-full h-full bg-[radial-gradient(circle,rgba(20,184,166,0.15)_0%,transparent_70%)]"
                />
              </div>

              {/* Header / Title Bar */}
              <div className="flex items-center justify-between mb-10 relative z-10">
                <div className="flex space-x-2.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/40"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/40"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/40"></div>
                </div>
                <div className="text-[9px] font-black font-mono text-white/20 uppercase tracking-[0.4em]">system_core.sh</div>
              </div>

              {/* Main Content: Tech Icons Grid */}
              <div className="grid grid-cols-2 gap-5 relative z-10 flex-grow content-center">
                {[
                  { icon: <Layout className="text-primary" size={28} />, label: "UI Design" },
                  { icon: <Database className="text-secondary" size={28} />, label: "Architecture" },
                  { icon: <Code2 className="text-accent" size={28} />, label: "Development" },
                  { icon: <Terminal className="text-white" size={28} />, label: "Deployment" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' }}
                    className="flex flex-col items-center justify-center p-6 rounded-[32px] bg-white/[0.03] border border-white/5 transition-all duration-500 group/item"
                  >
                    <div className="mb-4 group-hover/item:scale-110 group-hover/item:rotate-3 transition-all duration-500">
                      {item.icon}
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 group-hover/item:text-white transition-colors">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Bottom "Code" Bar */}
              <div className="mt-10 relative z-10">
                <div className="bg-white/[0.03] rounded-3xl p-5 font-mono text-[10px] leading-relaxed text-white/30 border border-white/5 backdrop-blur-md">
                  <div className="flex items-center mb-2.5">
                    <Braces size={12} className="mr-2.5 text-primary/60" />
                    <span className="text-primary/80">const</span>
                    <span className="ml-2 text-white/60">vision</span>
                    <span className="ml-2 text-secondary/60">=</span>
                    <span className="ml-2">{'{'}</span>
                  </div>
                  <div className="ml-6 flex items-center">
                    <span className="text-white/40 italic">goal:</span>
                    <span className="ml-2 text-accent/80">'Scalable_Future'</span>
                  </div>
                  <div className="flex items-center mt-2.5">
                    <span className="ml-0">{'}'}</span>
                    <Binary size={14} className="ml-auto text-primary/20 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Floating Tech Badges */}
              <motion.div 
                animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 p-4 rounded-2xl bg-dark/80 border border-white/10 shadow-2xl z-20 backdrop-blur-xl"
              >
                <Cpu size={20} className="text-primary/60" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
