import React from 'react';
import { motion } from 'framer-motion';
import { FaWrench, FaGlobe, FaHtml5, FaCss3Alt, FaNodeJs, FaGitAlt, FaGithub, FaTerminal, FaJava, FaDatabase } from 'react-icons/fa';
import { 
  SiReact, 
  SiNodedotjs, 
  SiTailwindcss, 
  SiJavascript, 
  SiFigma, 
  SiExpress, 
  SiMongodb, 
  SiPostgresql, 
  SiTypescript, 
  SiVite, 
  SiPostman, 
  SiC, 
  SiCplusplus, 
  SiPython,
  SiNetlify,
  SiRender,
  SiVercel,
  SiDocker,
  SiFirebase,
  SiRedis
} from 'react-icons/si';

const Skills = () => {
  const categories = [
    {
      title: 'Frontend',
      icon: <SiReact className="text-primary" />,
      skills: [
        { name: 'HTML5', icon: <FaHtml5 size={14} className="text-[#E34F26]" /> },
        { name: 'CSS3', icon: <FaCss3Alt size={14} className="text-[#1572B6]" /> },
        { name: 'JS', icon: <SiJavascript size={14} className="text-[#F7DF1E]" /> },
        { name: 'React', icon: <SiReact size={14} className="text-[#61DAFB]" /> },
        { name: 'Tailwind', icon: <SiTailwindcss size={14} className="text-[#06B6D4]" /> },
        { name: 'TypeScript', icon: <SiTypescript size={14} className="text-[#3178C6]" /> },
        { name: 'Vite', icon: <SiVite size={14} className="text-[#646CFF]" /> }
      ],
    },
    {
      title: 'Backend',
      icon: <SiNodedotjs className="text-secondary" />,
      skills: [
        { name: 'Node.js', icon: <FaNodeJs size={14} className="text-[#339933]" /> },
        { name: 'Express', icon: <SiExpress size={14} className="text-white" /> },
        { name: 'MongoDB', icon: <SiMongodb size={14} className="text-[#47A248]" /> },
        { name: 'PostgreSQL', icon: <SiPostgresql size={14} className="text-[#4169E1]" /> },
        { name: 'Redis', icon: <SiRedis size={14} className="text-[#DC382D]" /> },
        { name: 'Firebase', icon: <SiFirebase size={14} className="text-[#FFCA28]" /> },
        { name: 'NoSQL', icon: <FaDatabase size={14} className="text-[#E97627]" /> },
        { name: 'REST API', icon: <FaTerminal size={14} className="text-accent" /> }
      ],
    },
    {
      title: 'Tools & Tech',
      icon: <FaWrench className="text-accent" />,
      skills: [
        { name: 'Git', icon: <FaGitAlt size={14} className="text-[#F05032]" /> },
        { name: 'GitHub', icon: <FaGithub size={14} className="text-white" /> },
        { name: 'Figma', icon: <SiFigma size={14} className="text-[#F24E1E]" /> },
        { name: 'Postman', icon: <SiPostman size={14} className="text-[#FF6C37]" /> },
        { name: 'Docker', icon: <SiDocker size={14} className="text-[#2496ED]" /> },
        { name: 'Vercel', icon: <SiVercel size={14} className="text-white" /> },
        { name: 'Netlify', icon: <SiNetlify size={14} className="text-[#00C7B7]" /> }
      ],
    },
    {
      title: 'Languages',
      icon: <FaGlobe className="text-white" />,
      skills: [
        { name: 'Java', icon: <FaJava size={14} className="text-[#007396]" /> },
        { name: 'Python', icon: <SiPython size={14} className="text-[#3776AB]" /> },
        { name: 'C++', icon: <SiCplusplus size={14} className="text-[#00599C]" /> },
        { name: 'C', icon: <SiC size={14} className="text-[#A8B9CC]" /> },
        { name: 'JavaScript', icon: <SiJavascript size={14} className="text-[#F7DF1E]" /> }
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <section id="skills" className="py-24 px-6 md:px-12 overflow-hidden relative">
      {/* Decorative background blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            className="text-primary font-bold tracking-widest uppercase text-sm"
          >
            My Arsenal
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white mt-4 tracking-tight"
          >
            Technical Proficiency
          </motion.h2>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              variants={itemVariants}
              className="relative min-h-[400px] w-full [perspective:1000px]"
            >
              <motion.div
                className="w-full h-full group"
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                <motion.div
                  className="w-full h-full relative [transform-style:preserve-3d] rounded-[40px] shadow-2xl transition-shadow duration-500 group-hover:shadow-primary/20 cursor-pointer"
                  variants={{
                    rest: { rotateY: 0, y: 0, scale: 1 },
                    hover: { 
                      rotateY: 180, 
                      y: -10, 
                      scale: 1.03,
                      transition: { duration: 0.7, ease: "easeInOut" }
                    }
                  }}
                >
                  {/* Front Side */}
                  <div className="absolute inset-0 w-full h-full bg-white/[0.02] bg-gradient-to-br from-primary/5 to-transparent backdrop-blur-xl border border-white/10 p-10 rounded-[40px] flex flex-col items-center justify-center [backface-visibility:hidden] overflow-hidden shadow-xl">
                  {/* Subtle Shimmer Sweep */}
                  <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out"></div>
                  
                  {/* Neon Glow Border */}
                  <div className="absolute -inset-[2px] rounded-[42px] bg-gradient-to-br from-primary/30 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md -z-10"></div>
                  
                  <motion.div 
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-24 h-24 rounded-3xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 text-5xl shadow-[0_0_30px_rgba(20,184,166,0.15)] group-hover:border-primary/40 group-hover:shadow-[0_0_40px_rgba(20,184,166,0.3)] transition-all duration-500"
                  >
                    {cat.icon}
                  </motion.div>
                  <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-primary transition-colors duration-300 tracking-tight text-center">{cat.title}</h3>
                  <p className="text-white/40 text-sm font-medium tracking-widest uppercase">Hover to explore skills</p>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 w-full h-full bg-white/[0.05] bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-8 rounded-[40px] [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-y-auto hidden-scrollbar flex flex-col shadow-xl">
                  <h3 className="text-xl font-bold mb-6 text-white/90 text-center tracking-tight border-b border-white/10 pb-4">{cat.title} Skills</h3>
                  <div className="flex flex-wrap gap-3 justify-center content-start pt-2 pb-6">
                    {cat.skills.map((skill, i) => (
                      <motion.div 
                        key={skill.name} 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-4 py-2.5 rounded-lg bg-[#050505]/80 text-[10px] sm:text-xs font-bold tracking-widest uppercase text-white/70 border border-white/10 flex items-center gap-2.5 cursor-pointer overflow-hidden transition-all duration-300 hover:border-primary/50 hover:text-white hover:bg-primary/5 hover:shadow-[0_0_15px_rgba(20,184,166,0.25)]"
                      >
                        {/* Tech sweep effect */}
                        <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-primary/20 to-transparent skew-x-12 group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"></div>
                        {/* Neon accent edge */}
                        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom"></div>

                        {skill.icon && (
                          <span className="relative z-10 flex items-center justify-center scale-125 opacity-90 group-hover:opacity-100 transition-opacity">
                            {skill.icon}
                          </span>
                        )}
                        <span className="relative z-10 flex items-center gap-1.5 pt-[1px]">
                          <span className="text-primary/30 group-hover:text-primary transition-colors duration-300 font-bold text-sm leading-none">{'['}</span>
                          <span className="group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] transition-all">{skill.name}</span>
                          <span className="text-primary/30 group-hover:text-primary transition-colors duration-300 font-bold text-sm leading-none">{']'}</span>
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
