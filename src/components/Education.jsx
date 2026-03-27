import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Clock } from 'lucide-react';

const Education = () => {
  const experiences = [
    {
      title: 'B.Tech in Computer Science',
      institution: 'CodingGita',
      period: '2025 – 2029 (Current)',
      description: 'Currently pursuing 2nd semester. Focused on full-stack development, algorithms, and real-world system architecture.',
      icon: <GraduationCap className="text-primary" size={24} />,
    },
    {
      title: 'Higher Secondary Education',
      institution: 'Gyanmanjari School, Bhavnagar',
      period: '2023 – 2025',
      description: 'Completed HSE with a strong academic background in Science and Mathematics.',
      icon: <BookOpen className="text-secondary" size={24} />,
    },
  ];

  return (
    <section id="education" className="py-24 px-6 md:px-12">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h4 className="text-primary font-bold tracking-widest uppercase text-xs">My Journey</h4>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4 tracking-tight">Academic Background</h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-8 relative">
          <div className="absolute left-0 h-full border-l-2 border-white/5 md:left-1/2 -ml-[1px]"></div>

          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              className={`flex flex-col md:flex-row items-center justify-between gap-12 mb-12 relative z-10 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="w-full md:w-[45%] glass-card p-10 rounded-3xl relative overflow-hidden group">
                 {/* Indicator mark */}
                 <div className={`absolute top-10 ${idx % 2 === 0 ? 'right-0 -mr-1' : 'left-0 -ml-1'} w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50`}></div>
                 
                 <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-primary/20 transition-all duration-300">
                       {exp.icon}
                    </div>
                    <div>
                       <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">{exp.title}</h3>
                       <p className="text-xs font-bold text-primary tracking-widest uppercase mt-1">{exp.period}</p>
                    </div>
                 </div>
                 <h4 className="text-lg font-bold text-white/80 mb-4">{exp.institution}</h4>
                 <p className="text-white/40 text-sm leading-relaxed">
                   {exp.description}
                 </p>
              </div>
              <div className="hidden md:block w-[10%]"></div>
              <div className="w-full md:w-[45%]"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
