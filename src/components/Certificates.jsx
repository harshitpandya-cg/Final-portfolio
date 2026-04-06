import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, Calendar, MapPin, X, Eye } from 'lucide-react';
import encodeCert from '../assets/encode.jpg';
import hackTheSpringCert from '../assets/hack-the-spring.jpeg';
import suHackathonCert from '../assets/su-hackathon.jpeg';
import bountyQuestCert from '../assets/Bounty Quest - 2k26.jpg';
import devHeatCert from '../assets/dev heat 2k26.jpg';

const Certificates = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const certificates = [
    {
      title: 'Hack the Spring',
      organization: 'GEC Gandhinagar',
      date: '2025',
      location: 'Gandhinagar, Gujarat',
      description: 'Participated in the offline hackathon "Hack the Spring", gaining valuable experience in collaborative problem-solving and rapid development.',
      icon: <Award className="text-primary" size={24} />,
      image: hackTheSpringCert
    },
    {
      title: 'Bounty Quest 2.0',
      organization: 'NIT Tiruchirappalli',
      date: '2025',
      location: 'Tiruchirappalli, Tamil Nadu',
      description: 'Participated in Bounty Quest 2.0, an event organized by NIT Tiruchirappalli, showcasing technical skills and innovative thinking.',
      icon: <Award className="text-secondary" size={24} />,
      image: bountyQuestCert
    },
    {
      title: 'SU Hackathon (Bhilwara)',
      organization: 'Rajasthan Bhilwara',
      date: '2024',
      location: 'Bhilwara, Rajasthan',
      description: 'Participated in a 24-hour hackathon, developing innovative tech solutions for regional challenges.',
      icon: <Award className="text-primary" size={24} />,
      image: suHackathonCert
    },
    {
      title: 'Electrosphere 2026 (2nd Place)',
      organization: 'Swaminarayan University',
      date: '2026',
      location: 'Gujarat, IN',
      description: 'Winner - Secured 2nd Place for technical innovation and excellence in the university symposium.',
      icon: <Award className="text-secondary" size={24} />,
      image: null
    },
    {
      title: 'EnCode 2026: Participation',
      organization: 'IIT Guwahati',
      date: '2026',
      location: 'Guwahati, Assam',
      description: 'Participated in EnCode 2026: Code To Innovate of Udgam 2026, organised by the Indian Institute of Technology (IIT), Guwahati.',
      icon: <Award className="text-accent" size={24} />,
      image: encodeCert
    },
    {
      title: 'DevHeat 2026',
      organization: 'IIIT Surat',
      date: '2026',
      location: 'Surat, Gujarat',
      description: 'Participated in intensive coding challenges and collaborative sessions at the regional developer conference.',
      icon: <Award className="text-primary" size={24} />,
      image: devHeatCert
    }
  ];

  return (
    <section id="certificates" className="py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-24">
          <motion.h4 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-primary font-bold tracking-[0.5em] uppercase text-xs mb-6"
          >
            Achievements
          </motion.h4>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black text-white mt-4 tracking-tight leading-[0.85]"
          >
            Honors & <br /> <span className="text-gradient">Recognition</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {certificates.map((cert, idx) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="glass-card p-10 rounded-[40px] flex flex-col justify-between border border-white/5 bg-white/2 hover:bg-white/5 transition-all duration-500 relative group"
            >
              <div>
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:bg-primary/20 transition-all duration-500">
                  {cert.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 transition-colors group-hover:text-primary">{cert.title}</h3>
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-6">{cert.organization}</p>
                <p className="text-white/40 text-sm leading-relaxed mb-8 italic">
                  {cert.description}
                </p>
              </div>
              
              <div className="pt-6 border-t border-white/5 flex items-center justify-between text-[11px] font-bold text-white/30 uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-secondary" />
                  <span>{cert.date}</span>
                </div>
                {cert.image && (
                  <button 
                    onClick={() => setSelectedImage(cert.image)}
                    className="flex items-center gap-2 text-primary hover:text-white animate-pulse transition-colors font-black cursor-pointer"
                  >
                    <Eye size={14} />
                    <span>View Cert</span>
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image Modal Preview */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 cursor-zoom-out"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-5xl w-full"
            >
              <div className="flex justify-end mb-4">
                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                  className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/40 text-red-500 hover:text-white px-6 py-2 rounded-full transition-all duration-300 backdrop-blur-md border border-red-500/30 font-bold"
                >
                  <X size={20} />
                  <span>Cancel</span>
                </button>
              </div>
              <img 
                src={selectedImage} 
                alt="Certificate Preview" 
                className="w-full h-auto rounded-3xl shadow-2xl border border-white/10"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;
