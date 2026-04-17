import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { FaGithub, FaYoutube } from 'react-icons/fa';
import cersThumbnail from '../assets/cers-thumbnail.jpg';
import dorjeteaPreview from '../assets/dorjetea-preview.png';
import railonePreview from '../assets/railone-preview.png';
import daryaganjPreview from '../assets/daryaganj-preview.png';
import adilquadriPreview from '../assets/adilquadri-preview.png';

const Projects = () => {
  const uiCloneProjects = [
    {
      title: 'DorjeTeas Clone',
      category: 'UI Clone',
      details: 'A pixel-perfect clone of the Dorje Teas website built using HTML and CSS. Focused on replicating a clean, minimal UI with smooth layout structuring and responsive design. Emphasized typography, spacing, and product showcase sections to closely match the original user experience.',
      tags: ['HTML', 'CSS', 'Refined UI'],
      github: 'https://github.com/harshitpandya-cg/dorjetea',
      demo: 'https://dorjeteasbyharshit108660.netlify.app/',
      youtubeDemo: 'https://www.youtube.com/watch?v=Ztq7djCQkl0',
      image: dorjeteaPreview,
    },
    {
      title: 'Railone Clone',
      category: 'UI Clone',
      details: 'Developed a front-end clone of the RailOne platform using HTML and CSS, highlighting structured layouts and modern UI components. Implemented navigation sections, service cards, and responsive design techniques to ensure usability across devices.',
      tags: ['HTML', 'CSS', 'Responsive'],
      github: 'https://github.com/harshitpandya-cg/railone-clone',
      demo: 'https://railoneharshit108660.netlify.app/',
      youtubeDemo: 'https://www.youtube.com/watch?v=DWPFaA7PpnI',
      image: railonePreview,
    },
    {
      title: 'Daryaganj Clone',
      category: 'UI Clone',
      details: 'Created a visually rich clone of the Daryaganj website with a strong focus on layout precision and aesthetic consistency. Utilized CSS styling techniques to replicate menu sections, banners, and content alignment while maintaining responsiveness.',
      tags: ['HTML', 'CSS', 'Brand UI'],
      github: 'https://github.com/harshitpandya-cg/daryaganj-clone',
      demo: 'https://daryaganjharshit108660.netlify.app/',
      youtubeDemo: 'https://www.youtube.com/watch?v=Ut6qzL7NYV8',
      image: daryaganjPreview,
    },
    {
      title: 'AdilQadri Clone',
      category: 'UI Clone',
      details: 'Built a clone of the AdilQadri website with attention to detail in design elements such as product grids, banners, and typography. Applied CSS flexbox and grid to structure the layout and ensure a clean, modern user interface across screen sizes.',
      tags: ['HTML', 'CSS', 'Grid Layout'],
      github: 'https://github.com/harshitpandya-cg/adilquadri-clone',
      demo: 'https://adilquadribyharshit108660.netlify.app/',
      youtubeDemo: 'https://www.youtube.com/watch?v=Hil8ejxCRkI',
      image: adilquadriPreview,
    },
  ];

  const fullStackProjects = [
    {
      title: 'CERS+',
      category: 'Full Stack',
      details: 'CERS (Medical Emergency App) is a full-stack application designed to provide rapid emergency assistance. Built using React and Node.js, the platform enables users to send instant SOS alerts, locate nearby hospitals, and access essential first-aid guidance. The system focuses on minimizing response time during critical situations through real-time communication and location-based services.',
      tags: ['React', 'Node.js', 'SOS API', 'Real-time'],
      github: 'https://github.com/Dhvanitkanabar/CERS',
      demo: 'https://cers-plus.web.app/',
      image: cersThumbnail,
    },
    {
      title: 'SecureComm',
      category: 'Cyber Security',
      details: 'SecureComm is built to bridge the gap between theoretical cybersecurity concepts and real-world application. By simulating attacks like phishing and MITM, the project helps users visualize how data can be compromised—and more importantly, how it can be protected using modern security techniques.',
      tags: ['Security', 'React', 'Phishing Sim', 'MITM'],
      github: 'https://github.com/harshitpandya-cg/secure-comm',
      demo: 'https://secure-comm-jade.vercel.app/',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=60&w=600',
    },
  ];

  const ProjectCard = ({ project, idx }) => (
    <motion.div
      key={project.title}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.19, 1, 0.22, 1] }}
      className="group relative flex flex-col rounded-3xl overflow-hidden border border-white/8 bg-white/[0.03] backdrop-blur-sm lg:hover:border-primary/40 lg:hover:bg-white/[0.06] transition-all duration-[800ms] ease-[0.19,1,0.22,1]"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden m-3 rounded-2xl">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          width={600}
          height={375}
          className="w-full h-full object-cover brightness-75 lg:group-hover:brightness-50 lg:group-hover:scale-105 transition-all duration-700 ease-out"
        />
        {/* Overlay buttons */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 flex-wrap px-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-400">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} on GitHub`}
            className="flex items-center gap-2 bg-white text-black text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-full shadow-xl lg:hover:-translate-y-1 transition-transform duration-300"
          >
            <FaGithub size={14} />
            GitHub
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} live demo`}
            className="flex items-center gap-2 bg-primary text-white text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-full shadow-2xl shadow-primary/20 lg:hover:-translate-y-1.5 transition-all duration-[600ms] ease-[0.19,1,0.22,1]"
          >
            Live Demo
            <ArrowUpRight size={14} className="lg:group-hover:translate-x-0.5 lg:group-hover:-translate-y-0.5 transition-transform" />
          </a>
          {project.youtubeDemo && (
            <a
              href={project.youtubeDemo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Watch ${project.title} YouTube demo`}
              className="flex items-center gap-2 bg-[#FF0000] text-white text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-full shadow-xl lg:hover:-translate-y-1 transition-transform duration-300"
            >
              <FaYoutube size={14} />
              Demo
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 px-7 pt-5 pb-8">
        {/* Title row */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <h3 className="text-xl font-black text-white tracking-tight">{project.title}</h3>
          <span className="shrink-0 text-[9px] font-black uppercase tracking-[0.25em] text-secondary bg-secondary/10 border border-secondary/20 px-3 py-1 rounded-full">
            {project.category}
          </span>
        </div>

        {/* Details */}
        <p className="text-white/45 text-sm leading-relaxed mb-5 flex-1">{project.details}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-4 border-t border-white/6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-black text-white/25 lg:hover:text-secondary transition-colors cursor-default uppercase tracking-[0.35em]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const SectionDivider = ({ label }) => (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-5 my-14"
    >
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/15" />
      <span className="text-sm md:text-lg font-black uppercase tracking-[0.35em] text-secondary px-7 py-2.5 rounded-full border border-secondary/25 bg-secondary/5 whitespace-nowrap">
        {label}
      </span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/15" />
    </motion.div>
  );

  return (
    <section id="projects" className="py-24 px-6 md:px-12">
      <div className="container mx-auto">

        {/* Section Header */}
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

        {/* UI/UX Clone Projects */}
        <SectionDivider label="UI / UX Clones" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
          {uiCloneProjects.map((project, idx) => (
            <ProjectCard key={project.title} project={project} idx={idx} />
          ))}
        </div>

        {/* Full Stack Web Apps */}
        <SectionDivider label="Full Stack Web Apps" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {fullStackProjects.map((project, idx) => (
            <ProjectCard key={project.title} project={project} idx={idx} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
