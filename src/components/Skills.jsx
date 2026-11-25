import React from 'react';
import { FaHtml5, FaCss3Alt, FaNodeJs, FaGitAlt, FaGithub, FaTerminal, FaJava, FaDatabase } from 'react-icons/fa';
import {
  SiReact,
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
  SiVercel,
  SiDocker,
  SiFirebase,
  SiRedis,
} from 'react-icons/si';

const categories = [
  {
    index: '01',
    title: 'Frontend Engineering',
    tag: 'CLIENT-SIDE // UI',
    skills: [
      { name: 'HTML5', icon: <FaHtml5 size={18} className="text-[#E34F26]" /> },
      { name: 'CSS3', icon: <FaCss3Alt size={18} className="text-[#1572B6]" /> },
      { name: 'JavaScript', icon: <SiJavascript size={18} className="text-[#F7DF1E]" /> },
      { name: 'React', icon: <SiReact size={18} className="text-[#61DAFB]" /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss size={18} className="text-[#06B6D4]" /> },
      { name: 'TypeScript', icon: <SiTypescript size={18} className="text-[#3178C6]" /> },
      { name: 'Vite', icon: <SiVite size={18} className="text-[#646CFF]" /> },
    ],
  },
  {
    index: '02',
    title: 'Backend & Systems',
    tag: 'SERVER-SIDE // DB',
    skills: [
      { name: 'Node.js', icon: <FaNodeJs size={18} className="text-[#339933]" /> },
      { name: 'Express', icon: <SiExpress size={18} className="text-[#E6E4DE]" /> },
      { name: 'MongoDB', icon: <SiMongodb size={18} className="text-[#47A248]" /> },
      { name: 'PostgreSQL', icon: <SiPostgresql size={18} className="text-[#4169E1]" /> },
      { name: 'Redis', icon: <SiRedis size={18} className="text-[#DC382D]" /> },
      { name: 'Firebase', icon: <SiFirebase size={18} className="text-[#FFCA28]" /> },
      { name: 'NoSQL', icon: <FaDatabase size={18} className="text-[#E97627]" /> },
      { name: 'REST APIs', icon: <FaTerminal size={18} className="text-[#F0552D]" /> },
    ],
  },
  {
    index: '03',
    title: 'Tools & DevOps',
    tag: 'WORKFLOW // DEPLOY',
    skills: [
      { name: 'Git', icon: <FaGitAlt size={18} className="text-[#F05032]" /> },
      { name: 'GitHub', icon: <FaGithub size={18} className="text-[#E6E4DE]" /> },
      { name: 'Figma', icon: <SiFigma size={18} className="text-[#F24E1E]" /> },
      { name: 'Postman', icon: <SiPostman size={18} className="text-[#FF6C37]" /> },
      { name: 'Docker', icon: <SiDocker size={18} className="text-[#2496ED]" /> },
      { name: 'Vercel', icon: <SiVercel size={18} className="text-[#E6E4DE]" /> },
      { name: 'Netlify', icon: <SiNetlify size={18} className="text-[#00C7B7]" /> },
    ],
  },
  {
    index: '04',
    title: 'Languages & Core',
    tag: 'COMPUTING // SYNTAX',
    skills: [
      { name: 'Java', icon: <FaJava size={18} className="text-[#007396]" /> },
      { name: 'Python', icon: <SiPython size={18} className="text-[#3776AB]" /> },
      { name: 'C++', icon: <SiCplusplus size={18} className="text-[#00599C]" /> },
      { name: 'C', icon: <SiC size={18} className="text-[#A8B9CC]" /> },
      { name: 'JavaScript', icon: <SiJavascript size={18} className="text-[#F7DF1E]" /> },
    ],
  },
];

const Skills = () => {
  return (
    <section
      id="skills"
      data-theme="ink"
      className="relative py-24 sm:py-32 bg-[#0B0B08] text-[#E6E4DE] select-none scroll-mt-24 border-t border-[#8A8880]/20"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-[#8A8880]/20 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#F0552D] font-bold">
                03 // TECHNICAL ARSENAL
              </span>
              <span className="h-[1px] w-12 bg-[#F0552D]" />
            </div>
            <h2
              className="font-semibold tracking-[-0.04em] text-[#E6E4DE]"
              style={{ fontSize: 'clamp(44px, min(8vw, 12vh), 110px)', lineHeight: 0.9, textWrap: 'balance' }}
            >
              Technical Proficiency.
            </h2>
          </div>

          <p className="font-mono text-xs uppercase tracking-widest text-[#8A8880] max-w-xs">
            27 technologies mastered across full-stack architecture, design systems, and systems programming.
          </p>
        </div>

        {/* Ruled 2x2 Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#8A8880]/20 border border-[#8A8880]/20 rounded-2xl overflow-hidden shadow-xl">
          {categories.map((cat) => (
            <div
              key={cat.index}
              className="bg-[#0B0B08] p-6 sm:p-10 md:p-12 flex flex-col justify-between hover:bg-[#0B0B08]/90 transition-colors duration-200"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs text-[#8A8880] uppercase tracking-widest mb-4">
                  <span className="text-[#F0552D] font-bold">{cat.index}</span>
                  <span>{cat.tag}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#E6E4DE] mb-8">
                  {cat.title}
                </h3>
              </div>

              {/* Skills Badges with Uniform 40px Icon Containers */}
              <div className="flex flex-wrap gap-2.5 pt-6 border-t border-[#8A8880]/15">
                {cat.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-[#8A8880]/25 bg-[#E6E4DE]/[0.02] hover:border-[#F0552D] hover:bg-[#F0552D]/10 transition-colors duration-200 group"
                  >
                    <div className="w-6 h-6 rounded flex items-center justify-center shrink-0">
                      {skill.icon}
                    </div>
                    <span className="font-mono text-xs text-[#E6E4DE] uppercase tracking-wider">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default React.memo(Skills);
