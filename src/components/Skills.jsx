import React from 'react';
import { motion } from 'framer-motion';
import { FaWrench, FaGlobe } from 'react-icons/fa';
import { SiReact, SiNodedotjs, SiTailwindcss, SiJavascript, SiFigma, SiGithub, SiExpress, SiMongodb, SiGit } from 'react-icons/si';

const Skills = () => {
  const categories = [
    {
      title: 'Frontend',
      icon: <SiReact className="text-primary" />,
      skills: [
        { name: 'HTML5', icon: null },
        { name: 'CSS3', icon: null },
        { name: 'JS', icon: <SiJavascript size={12} /> },
        { name: 'React', icon: <SiReact size={12} /> },
        { name: 'Tailwind', icon: <SiTailwindcss size={12} /> }
      ],
    },
    {
      title: 'Backend',
      icon: <SiNodedotjs className="text-secondary" />,
      skills: [
        { name: 'Node.js', icon: <SiNodedotjs size={12} /> },
        { name: 'Express', icon: <SiExpress size={12} /> },
        { name: 'MongoDB', icon: <SiMongodb size={12} /> },
        { name: 'REST API', icon: null }
      ],
    },
    {
      title: 'Tools & Tech',
      icon: <FaWrench className="text-accent" />,
      skills: [
        { name: 'Git', icon: <SiGit size={12} /> },
        { name: 'GitHub', icon: <SiGithub size={12} /> },
        { name: 'Figma', icon: <SiFigma size={12} /> },
        { name: 'Render', icon: null },
        { name: 'Netlify', icon: null }
      ],
    },
    {
      title: 'Languages',
      icon: <FaGlobe className="text-white" />,
      skills: [
        { name: 'C Language', icon: null },
        { name: 'C++', icon: null }
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
    <section id="skills" className="py-24 px-6 md:px-12 overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.h4 
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
            className="text-primary font-bold tracking-widest uppercase text-xs"
          >
            My Arsenal
          </motion.h4>
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="glass-card p-10 rounded-[40px] border border-white/5 relative group"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[40px]"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-transform text-3xl">
                  {cat.icon}
                </div>
                <h3 className="text-2xl font-bold mb-8 text-white">{cat.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span 
                      key={skill.name} 
                      className="px-4 py-1.5 rounded-xl bg-white/5 text-[11px] font-bold tracking-wider uppercase text-white/50 hover:bg-white/10 transition-all border border-white/5 cursor-default hover:text-white flex items-center gap-2"
                    >
                      {skill.icon && <span className="text-white/30">{skill.icon}</span>}
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
