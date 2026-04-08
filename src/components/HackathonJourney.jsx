import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Users, Zap, ChevronLeft, ChevronRight, Award, MapPin, Calendar } from 'lucide-react';
import suHackathonImg from '../assets/su-hackathon-2026.jpg';
import electrosphereImg from '../assets/electrosphere-2026.jpg';

const hackathons = [
  {
    id: 0,
    title: 'SU Hackathon 2026',
    subtitle: 'Sangam University — Bhilwara',
    badge: 'Finalist',
    badgeColor: 'from-primary to-teal-400',
    glowColor: 'rgba(20,184,166,0.3)',
    borderColor: 'border-primary/30',
    accentColor: 'text-primary',
    bgAccent: 'bg-primary/10',
    icon: <Users className="text-primary" size={22} />,
    date: '2026',
    location: 'Bhilwara, Rajasthan',
    image: suHackathonImg,
    tagline: 'Selected as a Finalist among multiple competing teams',
    highlights: [
      {
        icon: <Trophy size={16} />,
        text: 'Selected as a finalist among multiple teams in a university-level hackathon.',
      },
      {
        icon: <Users size={16} />,
        text: 'Collaborated with a team to develop a solution within limited time constraints.',
      },
      {
        icon: <Zap size={16} />,
        text: 'Demonstrated strong problem-solving, teamwork, and development skills.',
      },
    ],
    tags: ['University Level', 'Team Work', 'Problem Solving', 'Finalist'],
  },
  {
    id: 1,
    title: 'ElectroSphere 2026',
    subtitle: 'Swaminarayan University',
    badge: '2nd Place 🥈',
    badgeColor: 'from-secondary to-indigo-400',
    glowColor: 'rgba(99,102,241,0.3)',
    borderColor: 'border-secondary/30',
    accentColor: 'text-secondary',
    bgAccent: 'bg-secondary/10',
    icon: <Award className="text-secondary" size={22} />,
    date: 'January 2026',
    location: 'Gujarat, India',
    image: electrosphereImg,
    tagline: 'Secured 2nd Position in a competitive IoT-based Technical Hackathon',
    highlights: [
      {
        icon: <Trophy size={16} />,
        text: 'Secured 2nd position in a competitive technical hackathon.',
      },
      {
        icon: <Zap size={16} />,
        text: 'Demonstrated strong problem-solving and technical skills under pressure.',
      },
      {
        icon: <Users size={16} />,
        text: 'Collaborated effectively to deliver a high-quality solution.',
      },
    ],
    tags: ['IoT Based', '2nd Position', 'Technical Excellence', 'Innovation'],
  },
];

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const imageVariants = {
  enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0, scale: 1.05 }),
  center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  exit: (dir) => ({ x: dir < 0 ? '100%' : '-100%', opacity: 0, scale: 0.97, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }),
};

const HackathonJourney = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((index, dir) => {
    setDirection(dir);
    setCurrent(index);
  }, []);

  const prev = () => {
    const newIdx = (current - 1 + hackathons.length) % hackathons.length;
    goTo(newIdx, -1);
  };

  const next = useCallback(() => {
    const newIdx = (current + 1) % hackathons.length;
    goTo(newIdx, 1);
  }, [current, goTo]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next, isPaused]);

  const hack = hackathons[current];

  return (
    <section id="hackathon" className="py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Ambient Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${hack.glowColor}, transparent 70%)`,
        }}
      />

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-6"
          >
            Battle-Tested
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black text-white mt-4 tracking-tight leading-[0.85]"
          >
            My Hackathon <br />
            <span className="text-gradient">Journey</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/30 mt-8 text-lg max-w-xl mx-auto italic"
          >
            Competing, building, and innovating under pressure — one hackathon at a time.
          </motion.p>
        </div>

        {/* Slider */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* ── Image Side ── */}
          <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden border border-white/5 shadow-2xl">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.img
                key={hack.id}
                src={hack.image}
                alt={`${hack.title} hackathon participants`}
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                loading="lazy"
                decoding="async"
                width={800}
                height={600}
                className="absolute inset-0 w-full h-full object-cover brightness-75"
              />
            </AnimatePresence>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent pointer-events-none" />

            {/* Badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`badge-${hack.id}`}
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                transition={{ duration: 0.4 }}
                className={`absolute top-6 left-6 bg-gradient-to-r ${hack.badgeColor} text-dark font-black text-xs uppercase tracking-widest px-5 py-2 rounded-full shadow-lg`}
              >
                {hack.badge}
              </motion.div>
            </AnimatePresence>

            {/* Bottom meta — only on desktop where it doesn't clash with dots */}
            <div className="absolute bottom-16 left-6 right-6 hidden sm:flex items-center justify-between">
              <div className="flex items-center gap-2 text-white/80 text-xs font-bold tracking-wider uppercase drop-shadow">
                <MapPin size={12} className={hack.accentColor} />
                <span>{hack.location}</span>
              </div>
              <div className="flex items-center gap-2 text-white/80 text-xs font-bold tracking-wider uppercase drop-shadow">
                <Calendar size={12} className={hack.accentColor} />
                <span>{hack.date}</span>
              </div>
            </div>

            {/* Slide dots */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
              {hackathons.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > current ? 1 : -1)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`rounded-full transition-all duration-500 ${
                    i === current
                      ? 'w-8 h-2 bg-primary'
                      : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ── Text Side ── */}
          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${hack.id}`}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-8"
              >
                {/* Event number indicator */}
                <motion.p
                  custom={0}
                  variants={textVariants}
                  className={`text-[11px] font-black uppercase tracking-[0.4em] ${hack.accentColor}`}
                >
                  {String(hack.id + 1).padStart(2, '0')} / {String(hackathons.length).padStart(2, '0')} — Hackathon
                </motion.p>

                {/* Title */}
                <div>
                  <motion.h3
                    custom={1}
                    variants={textVariants}
                    className="text-4xl md:text-5xl font-black text-white leading-tight"
                  >
                    {hack.title}
                  </motion.h3>
                  <motion.p
                    custom={2}
                    variants={textVariants}
                    className="text-white/40 font-bold tracking-widest text-xs uppercase mt-2"
                  >
                    {hack.subtitle}
                  </motion.p>
                </div>

                {/* Tagline */}
                <motion.p
                  custom={3}
                  variants={textVariants}
                  className="text-white/75 text-lg italic leading-relaxed border-l-2 border-primary/50 pl-4"
                >
                  {hack.tagline}
                </motion.p>

                {/* Highlights */}
                <motion.div custom={4} variants={textVariants} className="space-y-3">
                  {hack.highlights.map((h, i) => (
                    <motion.div
                      key={i}
                      custom={4 + i}
                      variants={textVariants}
                      className={`flex items-start gap-4 glass-card rounded-2xl px-5 py-4 border ${hack.borderColor} ${hack.bgAccent} transition-all duration-300`}
                    >
                      <span className={`mt-0.5 flex-shrink-0 ${hack.accentColor}`} aria-hidden="true">{h.icon}</span>
                      <span className="text-white/80 text-sm leading-relaxed">{h.text}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Tags */}
                <motion.div custom={7} variants={textVariants} className="flex flex-wrap gap-3 pt-2">
                  {hack.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-black text-white/20 hover:text-primary transition-colors cursor-default uppercase tracking-[0.3em]"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-4 mt-10">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prev}
                aria-label="Previous hackathon"
                className="w-14 h-14 rounded-full glass-card border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-primary/50 transition-all duration-300 cursor-pointer"
              >
                <ChevronLeft size={22} aria-hidden="true" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={next}
                aria-label="Next hackathon"
                className={`w-14 h-14 rounded-full bg-gradient-to-r ${hack.badgeColor} flex items-center justify-center text-dark shadow-lg transition-all duration-300 cursor-pointer`}
              >
                <ChevronRight size={22} aria-hidden="true" />
              </motion.button>
              <span className="text-white/40 text-xs font-bold tracking-widest uppercase ml-2" aria-hidden="true">
                Auto-cycles slides
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HackathonJourney;
