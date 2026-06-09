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
                className="w-full h-full relative [transform-style:preserve-3d] rounded-[40px] shadow-2xl transition-shadow duration-500 hover:shadow-primary/20 cursor-pointer"
                initial="rest"
                whileHover="hover"
                animate="rest"
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
                <div className="absolute inset-0 w-full h-full glass-card p-10 rounded-[40px] flex flex-col items-center justify-center [backface-visibility:hidden] overflow-hidden group">
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
                <div className="absolute inset-0 w-full h-full glass-card p-8 rounded-[40px] [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-y-auto hidden-scrollbar flex flex-col border border-white/10 bg-white/[0.03]">
                  <h3 className="text-xl font-bold mb-6 text-white/90 text-center tracking-tight border-b border-white/10 pb-4">{cat.title} Skills</h3>
                  <motion.div 
                    className="flex flex-wrap gap-3 justify-center items-center h-full content-center"
                    variants={{
                      rest: { opacity: 1 },
                      hover: { 
                        opacity: 1, 
                        transition: { staggerChildren: 0.05, delayChildren: 0.3 } 
                      }
                    }}
                  >
                    {cat.skills.map((skill, i) => (
                      <motion.span 
                        key={skill.name} 
                        variants={{
                          rest: { opacity: 0, scale: 0.8 },
                          hover: { opacity: 1, scale: 1 }
                        }}
                        className="px-4 py-2.5 rounded-2xl bg-white/10 text-xs font-bold tracking-wider uppercase text-white/80 border border-white/10 flex items-center gap-2 backdrop-blur-md shadow-lg"
                      >
                        {skill.icon && <span className="flex items-center justify-center scale-110">{skill.icon}</span>}
                        {skill.name}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
