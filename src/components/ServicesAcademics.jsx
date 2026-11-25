import React from 'react';
import { GraduationCap, School } from 'lucide-react';

const services = [
  {
    number: '01',
    title: 'Full-Stack Development',
    description:
      'Architecting responsive, high-performance web applications using React, Node.js, Express, and modern database solutions. Specialized in end-to-end implementation from API design to live cloud deployment.',
    tag: 'ARCHITECTURE & SCALABILITY',
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
  },
  {
    number: '02',
    title: 'Frontend Architecture',
    description:
      'Engineering accessible, pixel-perfect user interfaces with React, Tailwind CSS, and sophisticated interaction frameworks. Prioritizing 60fps animations, cross-device responsiveness, and high Core Web Vitals.',
    tag: 'PERFORMANCE & INTERACTION',
    skills: ['Tailwind CSS', 'Framer Motion', 'TypeScript', 'Vite', 'Three.js'],
  },
  {
    number: '03',
    title: 'UI/UX & Design Systems',
    description:
      'Translating user requirements into cohesive, scalable design systems, wireframes, and high-fidelity interactive prototypes in Figma. Emphasizing typography, spacing, and micro-interactions.',
    tag: 'DESIGN SYSTEMS & FIGMA',
    skills: ['Figma', 'Prototyping', 'User Flows', 'Wireframing', 'Design Tokens'],
  },
];

const education = [
  {
    period: '2025 – 2029 (CURRENT)',
    title: 'B.Tech in Computer Science',
    institution: 'CodingGita',
    code: 'CG',
    description:
      '2nd year B.Tech in Computer Science at CodingGita (2025–2029). Immersed in full-stack web engineering, data structures, algorithm optimization, and real-world software architecture.',
    icon: <GraduationCap size={20} className="text-[#F0552D]" />,
  },
  {
    period: '2023 – 2025',
    title: 'Higher Secondary Education',
    institution: 'Gyanmanjari School, Bhavnagar',
    code: 'GMS',
    description:
      'Completed HSE with a rigorous academic foundation in Science, Advanced Mathematics, and analytical problem-solving.',
    icon: <School size={20} className="text-[#8A8880]" />,
  },
];

const ServicesAcademics = () => {
  return (
    <section
      id="services"
      data-theme="ink"
      className="relative py-24 sm:py-32 bg-[#0B0B08] text-[#E6E4DE] select-none scroll-mt-24 border-t border-[#8A8880]/20"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-[#8A8880]/20 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#F0552D] font-bold">
                06 // CAPABILITIES &amp; ACADEMICS
              </span>
              <span className="h-[1px] w-12 bg-[#F0552D]" />
            </div>
            <h2
              className="font-semibold tracking-[-0.04em] text-[#E6E4DE]"
              style={{ fontSize: 'clamp(44px, min(8vw, 12vh), 110px)', lineHeight: 0.9, textWrap: 'balance' }}
            >
              Services &amp; Foundations.
            </h2>
          </div>

          <p className="font-mono text-xs uppercase tracking-widest text-[#8A8880] max-w-xs">
            End-to-end software capabilities backed by disciplined technical education at CodingGita.
          </p>
        </div>

        {/* Services Ruled List */}
        <div className="divide-y divide-[#8A8880]/20 border-y border-[#8A8880]/20 mb-20">
          {services.map((service) => (
            <div
              key={service.number}
              className="py-10 flex flex-col lg:flex-row lg:items-start justify-between gap-8 group hover:bg-[#E6E4DE]/[0.02] transition-colors duration-200 px-4 -mx-4 rounded-xl"
            >
              <div className="lg:w-1/3">
                <span className="font-mono text-xs text-[#F0552D] font-bold block mb-2">
                  {service.number} // {service.tag}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#E6E4DE] group-hover:text-[#F0552D] transition-colors">
                  {service.title}
                </h3>
              </div>

              <div className="lg:w-1/2 space-y-4">
                <p className="text-sm sm:text-base text-[#8A8880] font-light leading-relaxed">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {service.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded bg-[#E6E4DE]/5 text-[#E6E4DE] font-mono text-[10px] uppercase tracking-wider"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Academics Section with Small Square Frames */}
        <div>
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#8A8880]/20">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-[#8A8880]">
              ACADEMIC BACKGROUND &amp; DEGREE TRACK
            </h3>
            <span className="font-mono text-[11px] text-[#F0552D] font-bold">CODINGGITA // GANDHINAGAR</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((item, idx) => (
              <div
                key={idx}
                className="border border-[#8A8880]/20 rounded-2xl p-6 sm:p-8 bg-[#0B0B08] flex flex-col justify-between hover:border-[#8A8880]/40 transition-colors shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[#8A8880] mb-6">
                    <span className="text-[#F0552D] font-bold">{item.period}</span>
                    {/* Small Square Institution Badge */}
                    <div className="w-10 h-10 rounded-lg border border-[#8A8880]/30 bg-[#E6E4DE]/5 flex items-center justify-center font-mono text-xs font-bold text-[#E6E4DE]">
                      {item.code}
                    </div>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-[#E6E4DE] mb-1">{item.title}</h4>
                  <p className="font-mono text-xs text-[#F0552D] uppercase tracking-wider mb-4">
                    {item.institution}
                  </p>
                  <p className="text-sm text-[#8A8880] leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default React.memo(ServicesAcademics);
