import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Zap, Users, Award, MapPin, Calendar } from 'lucide-react';
import electrosphereImg from '../assets/electrosphere-2026.jpg';

const achievement = {
  title: 'ElectroSphere 2026',
  subtitle: 'Swaminarayan University',
  badge: '2nd Place 🥈',
  badgeColor: 'from-secondary to-indigo-400',
  glowColor: 'rgba(99,102,241,0.28)',
  borderColor: 'border-secondary/30',
  accentColor: 'text-secondary',
  bgAccent: 'bg-secondary/10',
  date: 'January 2026',
  location: 'Gujarat, India',
  image: electrosphereImg,
  tagline: '2nd Place – Electrosphere Hackathon 2026. Developed a cybersecurity awareness platform to educate users on online threats. Focused on simplifying complex security concepts through an engaging and user-friendly interface.',
  highlights: [
    {
      icon: <Trophy size={16} />,
      text: 'Secured 2nd position among all competing teams in a prestigious inter-college technical event.',
    },
    {
      icon: <Zap size={16} />,
      text: 'Demonstrated technical excellence and creative problem-solving under Open Innovation domain.',
    },
    {
      icon: <Users size={16} />,
      text: 'Collaborated effectively as a team to deliver a high-quality, impactful solution.',
    },
  ],
  tags: ['Open Innovation', '2nd Position', 'Technical Excellence', 'ElectroSphere 2K26'],
};

const textVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Achievements = () => {
  return (
    <section id="achievements" className="py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Ambient Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${achievement.glowColor}, transparent 70%)`,
        }}
      />

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-secondary font-bold tracking-[0.3em] uppercase text-sm mb-6"
          >
            Recognition & Glory
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-8xl font-black text-white mt-4 tracking-tight leading-[0.85]"
          >
            My <br /> <span className="text-gradient">Achievements</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-white/30 mt-8 text-lg max-w-xl mx-auto italic"
          >
            Where dedication meets recognition — milestones earned through hard work and innovation.
          </motion.p>
        </div>

        {/* Achievement Card — same layout as HackathonJourney */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Image Side ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/3] rounded-[40px] overflow-hidden border border-white/5 shadow-2xl"
          >
            <img
              src={electrosphereImg}
              alt="ElectroSphere 2026 hackathon team with certificates"
              loading="lazy"
              width={800}
              height={600}
              className="absolute inset-0 w-full h-full object-cover brightness-80"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent pointer-events-none" />

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className={`absolute top-6 left-6 bg-gradient-to-r ${achievement.badgeColor} text-white font-black text-xs uppercase tracking-widest px-5 py-2 rounded-full shadow-lg flex items-center gap-2`}
            >
              <Award size={13} /> {achievement.badge}
            </motion.div>

            {/* Location & Date */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white/80 text-xs font-bold tracking-wider uppercase drop-shadow">
                <MapPin size={12} className={achievement.accentColor} />
                <span>{achievement.location}</span>
              </div>
              <div className="flex items-center gap-2 text-white/80 text-xs font-bold tracking-wider uppercase drop-shadow">
                <Calendar size={12} className={achievement.accentColor} />
                <span>{achievement.date}</span>
              </div>
            </div>
          </motion.div>

          {/* ── Text Side ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col justify-center space-y-8"
          >
            {/* Event indicator */}
            <motion.p
              custom={0}
              variants={textVariants}
              className={`text-[11px] font-black uppercase tracking-[0.4em] ${achievement.accentColor}`}
            >
              01 / 01 — Achievement
            </motion.p>

            {/* Title */}
            <div>
              <motion.h3
                custom={1}
                variants={textVariants}
                className="text-4xl md:text-5xl font-black text-white leading-tight"
              >
                {achievement.title}
              </motion.h3>
              <motion.p
                custom={2}
                variants={textVariants}
                className="text-white/40 font-bold tracking-widest text-xs uppercase mt-2"
              >
                {achievement.subtitle}
              </motion.p>
            </div>

            {/* Tagline */}
            <motion.p
              custom={3}
              variants={textVariants}
              className="text-white/75 text-lg italic leading-relaxed border-l-2 border-secondary/50 pl-4"
            >
              {achievement.tagline}
            </motion.p>

            {/* Highlights */}
            <motion.div custom={4} variants={textVariants} className="space-y-3">
              {achievement.highlights.map((h, i) => (
                <motion.div
                  key={i}
                  custom={4 + i}
                  variants={textVariants}
                  className={`flex items-start gap-4 glass-card rounded-2xl px-5 py-4 border ${achievement.borderColor} ${achievement.bgAccent} transition-all duration-300`}
                >
                  <span className={`mt-0.5 flex-shrink-0 ${achievement.accentColor}`} aria-hidden="true">
                    {h.icon}
                  </span>
                  <span className="text-white/80 text-sm leading-relaxed">{h.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Tags */}
            <motion.div custom={7} variants={textVariants} className="flex flex-wrap gap-3 pt-2">
              {achievement.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-black text-white/20 hover:text-secondary transition-colors cursor-default uppercase tracking-[0.3em]"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Achievements;
