import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import cersThumbnail from '../assets/cers-thumbnail.jpg';
import dorjeteaThumbnail from '../assets/dorjetea-thumbnail.jpg';

const Projects = () => {
  const projects = [
    {
      title: 'CERS',
      category: 'Full Stack',
      description: 'Medical Emergency Response System with SOS features and real-time hospital alerts.',
      details: 'Built with React and Node.js. Features include instant SOS messaging to nearest hospital staff.',
      tags: ['React', 'Node.js', 'SOS API', 'Real-time'],
      github: 'https://github.com/Dhvanitkanabar/CERS',
      demo: 'https://cers-plus.web.app/',
      image: cersThumbnail,
    },
    {
      title: 'Two-Player Chess',
      category: 'Frontend',
      description: 'Interactive real-time chess game for web browsing.',
      details: 'Developed using HTML, CSS, and vanilla JS with complex game logic and move verification.',
      tags: ['HTML', 'CSS', 'JavaScript', 'Logic'],
      github: 'https://github.com/harshitpandya-cg/Chess-game',
      demo: 'https://2-player-chessgame.netlify.app/',
      image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=60&w=600',
    },
    {
      title: 'DorjeTeas Clone',
      category: 'Frontend',
      description: 'A pixel-perfect static clone of the original DorjeTeas website.',
      details: 'Focus on UI/UX replication, custom layouts, and responsive design.',
      tags: ['HTML', 'CSS', 'Refined UI'],
      github: 'https://github.com/harshitpandya-cg/dorjetea',
      demo: 'https://dorjeteasbyharshit108660.netlify.app/',
      image: dorjeteaThumbnail,
    },
    {
      title: 'Cyber Security Awareness',
      category: 'Educational',
      description: 'A project demonstrating common cyber threats like phishing and man-in-the-middle attacks.',
      details: 'Aimed at spreading awareness of digital vulnerabilities and best practices. Deployment coming soon.',
      tags: ['Security', 'Educational', 'Upcoming'],
      github: 'https://github.com/harshitpandya-cg',
      demo: '#',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=60&w=600',
    },
  ];

  return (
    <section id="projects" className="py-24 px-6 md:px-12">
      <div className="container mx-auto">
        <div className="text-center mb-24">
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-secondary font-bold tracking-[0.3em] uppercase text-sm mb-6"
          >
            Selection of Work
          </motion.p>
          <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="text-5xl md:text-8xl font-black text-white mt-4 tracking-tight leading-[0.85]"
           >
             Digital <br /> <span className="text-gradient">Creations</span>
           </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {projects.map((project, idx) => (
            <motion.div
              layout
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring" }}
              className="group relative rounded-[40px] overflow-hidden glass-card border border-white/5 bg-white/2 lg:hover:bg-white/5 transition-all duration-500"
            >
              <div className="relative aspect-[16/10] overflow-hidden m-4 rounded-[32px] transform transition-transform duration-[1000ms] ease-[cubic-bezier(0.19,1,0.22,1)] lg:group-hover:scale-[0.98]">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  loading="lazy"
                  width={600}
                  height={375}
                  className="w-full h-full object-cover lg:group-hover:scale-110 transition-transform duration-[1200ms] ease-out brightness-[0.6] lg:group-hover:brightness-50" 
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500">
                  <div className="flex space-x-6">
                    <motion.a whileHover={typeof window !== 'undefined' && window.innerWidth >= 1024 ? { y: -5 } : {}} href={project.github} target="_blank" className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-dark shadow-2xl" aria-label={`View ${project.title} on GitHub`}>
                      <FaGithub size={24} aria-hidden="true" />
                    </motion.a>
                    <motion.a whileHover={typeof window !== 'undefined' && window.innerWidth >= 1024 ? { y: -5 } : {}} href={project.demo} target="_blank" className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white shadow-2xl" aria-label={`View ${project.title} live demo`}>
                      <ArrowUpRight size={24} aria-hidden="true" />
                    </motion.a>
                  </div>
                </div>
              </div>
              
              <div className="px-10 pb-12 pt-6 text-left">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-3xl font-black text-white">{project.title}</h3>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-white/10 px-4 py-1.5 rounded-full text-secondary border border-secondary/20 blur-none">{project.category}</span>
                </div>
                <p className="text-white/40 text-lg mb-10 max-w-lg leading-relaxed italic">
                  {project.details}
                </p>
                <div className="flex flex-wrap gap-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-black text-white/20 hover:text-primary transition-colors cursor-default uppercase tracking-[0.3em]">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
