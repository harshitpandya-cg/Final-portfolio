import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Trophy, Calendar, MapPin } from 'lucide-react';
import { CertificateFrame, SafeImage } from './Frames';

import electrosphereImg from '../assets/electrosphere-2026.jpg';
import iiitSuratImg from '../assets/iiit-surat-hackathon.png';
import suHackathonImg from '../assets/su-hackathon-2026.jpg';
import hackTheSpringImg from '../assets/hackthespring.jpeg';

import hackTheSpringCert from '../assets/hack-the-spring.jpeg';
import bountyQuestCert from '../assets/Bounty Quest - 2k26.jpg';
import devHeatCert from '../assets/dev heat 2k26.jpg';
import encodeCert from '../assets/encode.jpg';
import suHackathonCert from '../assets/su-hackathon.jpeg';

const hackathonsList = [
  {
    id: 1,
    title: 'ElectroSphere 2026',
    institution: 'Swaminarayan University',
    badge: '2nd Place Podium 🥈',
    date: 'January 2026',
    location: 'Gujarat, India',
    image: electrosphereImg,
    summary:
      'Developed a cybersecurity awareness platform educating users on online threats with an engaging, interactive UI under the Open Innovation domain.',
    highlights: [
      'Secured 2nd position overall among all competing college teams.',
      'Demonstrated high-pressure technical excellence & rapid prototyping.',
      'Engineered an interactive phishing and threat simulation suite.',
    ],
    tags: ['Open Innovation', '2nd Position', 'Technical Excellence'],
  },
  {
    id: 2,
    title: 'IIIT Surat Hackathon',
    institution: 'Indian Institute of Information Technology',
    badge: '7th Rank National',
    date: '2025',
    location: 'IIIT Surat',
    image: iiitSuratImg,
    summary:
      'Ranked 7th among 30+ elite teams with a full project pitch presented live to judges, industry experts, and peers.',
    highlights: [
      'Secured 7th Rank overall among 30+ university teams.',
      'Defended live project pitch before judge panel under stringent QA.',
      'Sharpened rapid prototyping, socket handling, and architecture speed.',
    ],
    tags: ['IIIT Surat', '7th Rank', '30+ Teams', 'Live Pitch'],
  },
  {
    id: 3,
    title: 'SU Hackathon 2026',
    institution: 'Sangam University — Bhilwara',
    badge: 'Finalist Milestone',
    date: '2026',
    location: 'Bhilwara, Rajasthan',
    image: suHackathonImg,
    summary:
      'Selected as a Finalist among multiple competing teams in a university-level hackathon. Collaborated to develop a real-world software solution under time constraints.',
    highlights: [
      'Finalist among multiple competing university teams.',
      'Collaborated under intense sprint timeframes to architect full stack solution.',
      'Demonstrated problem-solving, clean code, and team execution.',
    ],
    tags: ['University Level', 'Team Work', 'Problem Solving'],
  },
  {
    id: 4,
    title: 'Hack The Spring POS Challenge',
    institution: 'Petpooja & GEC Gandhinagar',
    badge: '36-Hr Sprint Finalist',
    date: 'February 2026',
    location: 'GEC Gandhinagar',
    image: hackTheSpringImg,
    summary:
      'Completed 3 intense rounds in a 36-hour hackathon organized by Petpooja, building an automated restaurant POS system under tight deadlines.',
    highlights: [
      'Completed all 3 elimination rounds in a 36-hour sprint.',
      'Engineered restaurant domain automation & structured billing flows.',
      'Designed real-time kitchen order tracking and management views.',
    ],
    tags: ['Restaurant POS', '36-Hour Sprint', 'Petpooja Challenge'],
  },
];

const certificatesList = [
  {
    id: 1,
    index: '01',
    title: 'ElectroSphere 2026 - 2nd Place',
    organization: 'Swaminarayan University',
    year: 'Jan 2026',
    image: electrosphereImg,
  },
  {
    id: 2,
    index: '02',
    title: 'Hack The Spring POS Challenge',
    organization: 'Petpooja & GEC Gandhinagar',
    year: 'Feb 2026',
    image: hackTheSpringCert,
  },
  {
    id: 3,
    index: '03',
    title: 'Bounty Quest - 2k26 Algorithm Sprint',
    organization: 'CodingGita',
    year: 'Jan 2026',
    image: bountyQuestCert,
  },
  {
    id: 4,
    index: '04',
    title: 'Dev Heat 2k26 Tech Excellence',
    organization: 'Dev Heat Developer Summit',
    year: 'Jan 2026',
    image: devHeatCert,
  },
  {
    id: 5,
    index: '05',
    title: 'Encode 2026 Technical Challenge',
    organization: 'National Level Technical Symposium',
    year: '2026',
    image: encodeCert,
  },
  {
    id: 6,
    index: '06',
    title: 'SU Hackathon 2026 Finalist Diploma',
    organization: 'Sangam University',
    year: '2026',
    image: suHackathonCert,
  },
];

const Honors = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const savedScrollY = useRef(0);
  const lightboxRef = useRef(null);
  const lastActiveElementRef = useRef(null);

  const activeCert = lightboxIndex !== null ? certificatesList[lightboxIndex] : null;
  const isLightboxOpen = lightboxIndex !== null;

  // Lock background scroll, pause Lenis, and trap focus while Lightbox is open
  useEffect(() => {
    if (!isLightboxOpen) return;

    savedScrollY.current = window.scrollY || window.pageYOffset || 0;
    lastActiveElementRef.current = document.activeElement;
    window.__isModalOpen = true;
    document.body.dataset.modalOpen = 'true';
    window.dispatchEvent(new Event('modalStateChange'));

    if (typeof window !== 'undefined' && window.lenis && typeof window.lenis.stop === 'function') {
      window.lenis.stop();
    }
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    const preventScroll = (e) => {
      e.preventDefault();
    };
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });

    const focusTimer = setTimeout(() => {
      if (lightboxRef.current) {
        const focusables = lightboxRef.current.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
        if (focusables.length > 0) focusables[0].focus();
      }
    }, 40);

    const handleTabTrap = (e) => {
      if (e.key !== 'Tab' || !lightboxRef.current) return;
      const focusables = Array.from(
        lightboxRef.current.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])')
      ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);
      if (focusables.length === 0) return;
      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    window.addEventListener('keydown', handleTabTrap);
    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', handleTabTrap);
      window.__isModalOpen = false;
      delete document.body.dataset.modalOpen;
      window.dispatchEvent(new Event('modalStateChange'));
      if (typeof window !== 'undefined' && window.lenis && typeof window.lenis.start === 'function') {
        window.lenis.start();
      }
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      if (savedScrollY.current !== undefined) {
        window.scrollTo(0, savedScrollY.current);
        window.lenis?.scrollTo(savedScrollY.current, { immediate: true });
      }
      if (lastActiveElementRef.current && typeof lastActiveElementRef.current.focus === 'function') {
        lastActiveElementRef.current.focus();
      }
    };
  }, [isLightboxOpen]);

  const handleNext = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev + 1) % certificatesList.length);
    }
  }, [lightboxIndex]);

  const handlePrev = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev - 1 + certificatesList.length) % certificatesList.length);
    }
  }, [lightboxIndex]);

  const handleClose = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, handleNext, handlePrev, handleClose]);

  return (
    <section
      id="honors"
      data-theme="paper"
      className="relative py-24 sm:py-32 bg-[#E6E4DE] text-[#0B0B08] select-none scroll-mt-24 border-t border-[#0B0B08]/15"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-[#0B0B08]/15 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#F0552D] font-bold">
                05 // COMPETITIVE HONORS &amp; CERTIFICATES
              </span>
              <span className="h-[1px] w-12 bg-[#F0552D]" />
            </div>
            <h2
              className="font-semibold tracking-[-0.04em] text-[#0B0B08]"
              style={{ fontSize: 'clamp(44px, min(8vw, 12vh), 110px)', lineHeight: 0.9, textWrap: 'balance' }}
            >
              Hackathons &amp; Credentials.
            </h2>
          </div>

          <p className="font-mono text-xs uppercase tracking-widest text-[#0B0B08]/65 max-w-xs">
            Where dedication meets recognition — high-pressure milestones earned across national hackathons.
          </p>
        </div>

        {/* 1. Hackathon Event Showcase (Grid of 2 or 4 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {hackathonsList.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-[#0B0B08]/15 p-6 sm:p-8 bg-[#E6E4DE] hover:border-[#F0552D] transition-colors duration-300 flex flex-col justify-between group shadow-sm"
            >
              <div>
                {/* Event Photo Box */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-6 border border-[#0B0B08]/10 bg-[#0B0B08]">
                  <SafeImage
                    src={item.image}
                    alt={item.title}
                    aspectRatio="16/10"
                    objectFit="cover"
                    className="w-full h-full block group-hover:scale-[1.03] transition-transform duration-500"
                    fallbackText={item.title}
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded bg-[#0B0B08]/90 text-[#E6E4DE] font-mono text-[10px] uppercase tracking-wider font-bold shadow-md">
                    {item.badge}
                  </div>
                </div>

                <div className="flex items-center justify-between font-mono text-[11px] text-[#0B0B08]/65 uppercase tracking-widest mb-2">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={12} className="text-[#F0552D]" />
                    <span>{item.institution}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-[#8A8880]" />
                    <span>{item.date}</span>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-[#0B0B08] mb-3 group-hover:text-[#F0552D] transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-[#0B0B08]/75 leading-relaxed mb-6 font-light">
                  {item.summary}
                </p>

                <ul className="space-y-1.5 mb-6">
                  {item.highlights.map((h, i) => (
                    <li key={i} className="text-xs text-[#0B0B08]/70 flex items-start gap-2">
                      <span className="text-[#F0552D] mt-0.5 font-bold">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#0B0B08]/10">
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded bg-[#0B0B08]/5 font-mono text-[9px] uppercase tracking-wider text-[#0B0B08]/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 2. Verified Certificates in CertificateFrame (3-Column Grid, 2 on Tablet, 1 on Mobile) */}
        <div>
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#0B0B08]/15">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-[#0B0B08] font-bold">
              VERIFIED DIPLOMAS &amp; ACCREDITATIONS
            </h3>
            <span className="font-mono text-xs text-[#F0552D] font-bold">06 ISSUED DOCUMENTS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificatesList.map((cert, idx) => (
              <CertificateFrame
                key={cert.id}
                index={cert.index}
                title={cert.title}
                organization={cert.organization}
                year={cert.year}
                src={cert.image}
                alt={cert.title}
                onClick={() => setLightboxIndex(idx)}
              />
            ))}
          </div>
        </div>

      </div>

      {/* ACCESSIBLE LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeCert && (
          <motion.div
            ref={lightboxRef}
            data-lenis-prevent="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            style={{ overscrollBehavior: 'contain' }}
            className="fixed inset-0 z-[600] bg-[#0B0B08]/96 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8 cursor-zoom-out select-none overscroll-contain"
            role="dialog"
            aria-modal="true"
            aria-label={activeCert.title}
            tabIndex={-1}
          >
            {/* Top Controls */}
            <div
              className="w-full flex items-center justify-between px-2 sm:px-6 py-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="font-mono text-xs text-[#8A8880] uppercase tracking-widest flex items-center gap-3">
                <span className="text-[#F0552D] font-bold">{activeCert.index}</span>
                <span className="hidden sm:inline">// VERIFIED CREDENTIAL VIEWER</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="px-3 py-1.5 rounded-full border border-[#8A8880]/30 font-mono text-[11px] uppercase tracking-widest text-[#E6E4DE] hover:border-[#F0552D] hover:text-[#F0552D] transition-colors flex items-center gap-1 cursor-pointer"
                  aria-label="Previous certificate"
                >
                  <ChevronLeft size={14} />
                  <span className="hidden sm:inline">PREV</span>
                </button>
                <button
                  onClick={handleNext}
                  className="px-3 py-1.5 rounded-full border border-[#8A8880]/30 font-mono text-[11px] uppercase tracking-widest text-[#E6E4DE] hover:border-[#F0552D] hover:text-[#F0552D] transition-colors flex items-center gap-1 cursor-pointer"
                  aria-label="Next certificate"
                >
                  <span className="hidden sm:inline">NEXT</span>
                  <ChevronRight size={14} />
                </button>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full bg-[#F0552D] text-[#0B0B08] flex items-center justify-center hover:scale-105 transition-transform ml-2 cursor-pointer font-bold"
                  aria-label="Close viewer"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Main Lightbox Image Viewport */}
            <div
              className="flex-1 max-w-5xl w-full mx-auto flex items-center justify-center p-2 sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative max-h-[75vh] w-full rounded-2xl overflow-hidden border border-[#8A8880]/30 bg-[#0B0B08] shadow-2xl flex items-center justify-center p-2">
                <img
                  src={activeCert.image}
                  alt={activeCert.title}
                  className="max-h-[72vh] w-auto max-w-full object-contain rounded-xl"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>

            {/* Bottom Caption Bar */}
            <div
              className="w-full text-center py-2 border-t border-[#8A8880]/20 font-mono text-xs text-[#8A8880] uppercase tracking-widest flex items-center justify-between px-4 sm:px-8"
              onClick={(e) => e.stopPropagation()}
            >
              <span>{activeCert.organization} · {activeCert.year}</span>
              <span className="font-bold text-[#E6E4DE]">{activeCert.title}</span>
              <span className="text-[#F0552D]">{lightboxIndex + 1} / {certificatesList.length}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default React.memo(Honors);
