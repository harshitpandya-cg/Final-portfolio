import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowDown, X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { FaGithub, FaYoutube } from 'react-icons/fa';
import WorkPreviewPortal from './WorkPreviewPortal';
import { BrowserFrame, SafeImage } from './Frames';

import cersThumbnail from '../assets/cers-thumbnail.jpg';
import dorjeteaPreview from '../assets/dorjetea-preview.png';
import dorjeteaThumbnail from '../assets/dorjetea-thumbnail.jpg';
import railonePreview from '../assets/railone-preview.png';
import daryaganjPreview from '../assets/daryaganj-preview.png';
import adilquadriPreview from '../assets/adilquadri-preview.png';
import hotelRoomsPreview from '../assets/hotel-rooms.png';
import dashStackPreview from '../assets/dash-stack.png';

const projectsData = [
  {
    id: 1,
    number: '01',
    title: 'DorjeTeas Clone',
    category: 'UI Clone',
    year: '2025',
    domain: 'dorjeteasbyharshit108660.netlify.app',
    details:
      'A pixel-perfect clone of the Dorje Teas website built using HTML and CSS. Focused on replicating a clean, minimal UI with smooth layout structuring and responsive design. Emphasized typography, spacing, and product showcase sections to closely match the original user experience.',
    tags: ['HTML', 'CSS', 'Refined UI', 'Responsive Design'],
    github: 'https://github.com/harshitpandya-cg/dorjetea',
    demo: 'https://dorjeteasbyharshit108660.netlify.app/',
    youtubeDemo: 'https://www.youtube.com/watch?v=Ztq7djCQkl0',
    image: dorjeteaPreview,
    gallery: [dorjeteaPreview, dorjeteaThumbnail],
  },
  {
    id: 2,
    number: '02',
    title: 'Railone Clone',
    category: 'UI Clone',
    year: '2025',
    domain: 'railoneharshit108660.netlify.app',
    details:
      'Developed a front-end clone of the RailOne platform using HTML and CSS, highlighting structured layouts and modern UI components. Implemented navigation sections, service cards, and responsive design techniques to ensure usability across devices.',
    tags: ['HTML', 'CSS', 'Responsive', 'Flexbox'],
    github: 'https://github.com/harshitpandya-cg/railone-clone',
    demo: 'https://railoneharshit108660.netlify.app/',
    youtubeDemo: 'https://www.youtube.com/watch?v=DWPFaA7PpnI',
    image: railonePreview,
    gallery: [railonePreview],
  },
  {
    id: 3,
    number: '03',
    title: 'Daryaganj Clone',
    category: 'UI Clone',
    year: '2025',
    domain: 'daryaganjharshit108660.netlify.app',
    details:
      'Created a visually rich clone of the Daryaganj website with a strong focus on layout precision and aesthetic consistency. Utilized CSS styling techniques to replicate menu sections, banners, and content alignment while maintaining responsiveness.',
    tags: ['HTML', 'CSS', 'Brand UI', 'Typography'],
    github: 'https://github.com/harshitpandya-cg/daryaganj-clone',
    demo: 'https://daryaganjharshit108660.netlify.app/',
    youtubeDemo: 'https://www.youtube.com/watch?v=Ut6qzL7NYV8',
    image: daryaganjPreview,
    gallery: [daryaganjPreview],
  },
  {
    id: 4,
    number: '04',
    title: 'AdilQadri Clone',
    category: 'UI Clone',
    year: '2025',
    domain: 'adilquadribyharshit108660.netlify.app',
    details:
      'Built a clone of the AdilQadri website with attention to detail in design elements such as product grids, banners, and typography. Applied CSS flexbox and grid to structure the layout and ensure a clean, modern user interface across screen sizes.',
    tags: ['HTML', 'CSS', 'Grid Layout', 'E-Commerce UI'],
    github: 'https://github.com/harshitpandya-cg/adilquadri-clone',
    demo: 'https://adilquadribyharshit108660.netlify.app/',
    youtubeDemo: 'https://www.youtube.com/watch?v=Hil8ejxCRkI',
    image: adilquadriPreview,
    gallery: [adilquadriPreview],
  },
  {
    id: 5,
    number: '05',
    title: 'CERS+ Medical SOS',
    category: 'Full Stack',
    year: '2026',
    domain: 'cers-plus.web.app',
    details:
      'CERS (Medical Emergency App) is a full-stack application designed to provide rapid emergency assistance. Built using React and Node.js, the platform enables users to send instant SOS alerts, locate nearby hospitals, and access essential first-aid guidance. The system focuses on minimizing response time during critical situations through real-time communication and location-based services.',
    tags: ['React', 'Node.js', 'SOS API', 'Real-time', 'Geolocation'],
    github: 'https://github.com/Dhvanitkanabar/CERS',
    demo: 'https://cers-plus.web.app/',
    image: cersThumbnail,
    gallery: [cersThumbnail],
  },
  {
    id: 6,
    number: '06',
    title: 'SecureComm Platform',
    category: 'Full Stack',
    year: '2026',
    domain: 'secure-comm-jade.vercel.app',
    details:
      'SecureComm is built to bridge the gap between theoretical cybersecurity concepts and real-world application. By simulating attacks like phishing and MITM, the project helps users visualize how data can be compromised—and more importantly, how it can be protected using modern security techniques.',
    tags: ['Security', 'React', 'Phishing Sim', 'MITM', 'Node.js'],
    github: 'https://github.com/harshitpandya-cg/secure-comm',
    demo: 'https://secure-comm-jade.vercel.app/',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=60&w=1200',
    gallery: ['https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=60&w=1200'],
  },
  {
    id: 7,
    number: '07',
    title: 'Hotel Rooms UI/UX',
    category: 'UI/UX Design',
    year: '2025',
    domain: 'figma.com/@hotelrooms',
    details:
      'A comprehensive hotel reservation user experience design crafted in Figma. Focused on high-end luxury aesthetics, dark minimalist interfaces, seamless booking flows, and micro-interactions that elevate user engagement and conversion.',
    tags: ['Figma', 'UI/UX Design', 'Luxury Booking', 'Wireframing'],
    demo: 'https://www.figma.com/design/4sHau33t51x47i6nN1x9aZ/Untitled?node-id=0-1&t=1qH6aQdGzQc1B3jX-1',
    image: hotelRoomsPreview,
    gallery: [hotelRoomsPreview],
  },
  {
    id: 8,
    number: '08',
    title: 'DashStack Analytics',
    category: 'UI/UX Design',
    year: '2025',
    domain: 'figma.com/@dashstack',
    details:
      'A clean, modern SaaS analytics dashboard created in Figma. Features complex data visualization systems, financial charts, transaction breakdowns, and user activity timelines structured in an intuitive, modular design system.',
    tags: ['Figma', 'SaaS Dashboard', 'Data Visualization', 'Design System'],
    demo: 'https://www.figma.com/design/4sHau33t51x47i6nN1x9aZ/Untitled?node-id=0-1&t=1qH6aQdGzQc1B3jX-1',
    image: dashStackPreview,
    gallery: [dashStackPreview],
  },
];

const Work = () => {
  const [filter, setFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [prevModalId, setPrevModalId] = useState(null);
  const savedScrollY = useRef(0);
  const modalRef = useRef(null);
  const lastActiveElementRef = useRef(null);

  if (activeModalProject?.id !== prevModalId) {
    setPrevModalId(activeModalProject?.id);
    setHasScrolled(false);
  }

  // Lock background scrolling, set modal state, call lenis.stop() / lenis.start() and restore scroll position
  useEffect(() => {
    if (activeModalProject) {
      savedScrollY.current = window.scrollY || window.pageYOffset || 0;
      window.__isModalOpen = true;
      document.body.dataset.modalOpen = 'true';

      if (typeof window !== 'undefined' && window.lenis && typeof window.lenis.stop === 'function') {
        window.lenis.stop();
      }
      document.body.style.overflow = 'hidden';
    } else {
      window.__isModalOpen = false;
      delete document.body.dataset.modalOpen;

      if (typeof window !== 'undefined' && window.lenis && typeof window.lenis.start === 'function') {
        window.lenis.start();
      }
      document.body.style.overflow = '';
      if (typeof window !== 'undefined' && savedScrollY.current !== undefined) {
        window.scrollTo(0, savedScrollY.current);
        window.lenis?.scrollTo(savedScrollY.current, { immediate: true });
      }
    }
    return () => {
      window.__isModalOpen = false;
      delete document.body.dataset.modalOpen;
      if (typeof window !== 'undefined' && window.lenis && typeof window.lenis.start === 'function') {
        window.lenis.start();
      }
      document.body.style.overflow = '';
    };
  }, [activeModalProject]);

  // Focus trap inside the modal
  useEffect(() => {
    if (!activeModalProject) return;

    lastActiveElementRef.current = document.activeElement;

    const timer = setTimeout(() => {
      if (modalRef.current) {
        const focusables = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length > 0) {
          focusables[0].focus();
        }
      }
    }, 60);

    const handleTabTrap = (e) => {
      if (e.key !== 'Tab' || !modalRef.current) return;

      const focusables = Array.from(
        modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);

      if (focusables.length === 0) return;

      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    window.addEventListener('keydown', handleTabTrap);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleTabTrap);
      if (lastActiveElementRef.current && typeof lastActiveElementRef.current.focus === 'function') {
        lastActiveElementRef.current.focus();
      }
    };
  }, [activeModalProject]);

  const handleModalScroll = (e) => {
    if (e.currentTarget.scrollTop > 25) {
      if (!hasScrolled) setHasScrolled(true);
    }
  };

  const filteredProjects = projectsData.filter((p) => {
    if (filter === 'all') return true;
    return p.category.toLowerCase().includes(filter.toLowerCase());
  });

  const currentIndex = activeModalProject
    ? filteredProjects.findIndex((p) => p.id === activeModalProject.id)
    : -1;

  const prevProject = currentIndex > 0 
    ? filteredProjects[currentIndex - 1] 
    : filteredProjects[filteredProjects.length - 1];
  const nextProject = currentIndex >= 0 && currentIndex < filteredProjects.length - 1 
    ? filteredProjects[currentIndex + 1] 
    : filteredProjects[0];

  const handleNext = useCallback(() => {
    if (currentIndex >= 0 && currentIndex < filteredProjects.length - 1) {
      setActiveModalProject(filteredProjects[currentIndex + 1]);
    } else if (filteredProjects.length > 0) {
      setActiveModalProject(filteredProjects[0]);
    }
  }, [currentIndex, filteredProjects]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setActiveModalProject(filteredProjects[currentIndex - 1]);
    } else if (filteredProjects.length > 0) {
      setActiveModalProject(filteredProjects[filteredProjects.length - 1]);
    }
  }, [currentIndex, filteredProjects]);

  const handleClose = useCallback(() => {
    setActiveModalProject(null);
  }, []);

  // Keyboard navigation for case study modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeModalProject) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalProject, handleNext, handlePrev, handleClose]);

  return (
    <section
      id="work"
      data-theme="paper"
      className="relative py-24 sm:py-32 bg-[#E6E4DE] text-[#0B0B08] select-none scroll-mt-24"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-[#0B0B08]/15 mb-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#F0552D] font-bold">
                01 // INDEXED WORK
              </span>
              <span className="h-[1px] w-12 bg-[#F0552D]" />
            </div>
            <h2
              className="font-semibold tracking-[-0.04em] text-[#0B0B08]"
              style={{ fontSize: 'clamp(44px, min(8vw, 12vh), 110px)', lineHeight: 0.9, textWrap: 'balance' }}
            >
              Selected Projects.
            </h2>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'All Works', val: 'all' },
              { label: 'UI Clones', val: 'ui clone' },
              { label: 'Full Stack', val: 'full stack' },
              { label: 'UI/UX Design', val: 'ui/ux design' },
            ].map((f) => (
              <button
                key={f.val}
                onClick={() => setFilter(f.val)}
                className={`px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-widest transition-all duration-200 border cursor-pointer ${
                  filter === f.val
                    ? 'bg-[#0B0B08] text-[#E6E4DE] border-[#0B0B08]'
                    : 'bg-transparent text-[#0B0B08]/65 border-[#0B0B08]/20 hover:border-[#0B0B08] hover:text-[#0B0B08]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Rows with Thumbnails & Mobile Stacking */}
        <div className="divide-y divide-[#0B0B08]/15">
          {filteredProjects.map((project) => {
            const isHovered = hoveredProject?.id === project.id;
            const isDimmed = hoveredProject !== null && !isHovered;

            return (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => setActiveModalProject(project)}
                className="group py-7 sm:py-9 md:py-11 cursor-pointer transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                {/* Desktop Left: Number + Small 96x64 Thumbnail + Big Title */}
                <div className="flex items-center gap-5 sm:gap-7 md:gap-9 transition-transform duration-300 group-hover:translate-x-2">
                  <span
                    className={`font-mono text-sm md:text-base text-[#F0552D] font-bold w-6 shrink-0 transition-opacity duration-300 ${
                      isDimmed ? 'opacity-30' : 'opacity-100'
                    }`}
                  >
                    {project.number}
                  </span>

                  {/* 96x64 Small Thumbnail (Desktop) - Stays at 100% opacity & full color */}
                  <div className="hidden sm:block w-24 h-16 rounded-lg overflow-hidden border border-[#0B0B08]/20 shrink-0 bg-[#0B0B08]/5 shadow-sm opacity-100">
                    <SafeImage
                      src={project.image}
                      alt={project.title}
                      aspectRatio="3/2"
                      className="w-full h-full block transition-transform duration-300"
                    />
                  </div>

                  {/* Title & Mobile Category/Year - Dims on sibling hover */}
                  <div className={`transition-opacity duration-300 ${isDimmed ? 'opacity-30' : 'opacity-100'}`}>
                    <h3
                      className="font-semibold tracking-[-0.04em] text-[#0B0B08] group-hover:text-[#F0552D] transition-colors duration-200"
                      style={{ fontSize: 'clamp(28px, min(4.5vw, 6vh), 64px)', lineHeight: 1.05 }}
                    >
                      {project.title}
                    </h3>
                    <div className="sm:hidden font-mono text-[10px] uppercase tracking-widest text-[#0B0B08]/60 mt-1">
                      {project.category} · {project.year}
                    </div>
                  </div>
                </div>

                {/* Mobile Screenshot (<768px): Full-width 16:10 frame - Stays at 100% opacity */}
                <div className="sm:hidden w-full my-2 opacity-100">
                  <BrowserFrame
                    src={project.image}
                    alt={project.title}
                    domain={project.domain}
                    variant="paper"
                    className="w-full bg-[#E6E4DE]"
                  />
                </div>

                {/* Desktop Right: Metadata Badges & Pill Action - Dims on sibling hover */}
                <div
                  className={`hidden md:flex items-center gap-6 font-mono text-xs uppercase tracking-widest text-[#0B0B08]/60 shrink-0 transition-opacity duration-300 ${
                    isDimmed ? 'opacity-30' : 'opacity-100'
                  }`}
                >
                  <span className="px-3 py-1 rounded-full border border-[#0B0B08]/20 bg-[#0B0B08]/5">
                    {project.category}
                  </span>
                  <span>{project.year}</span>
                  <div className="w-9 h-9 rounded-full border border-[#0B0B08]/20 flex items-center justify-center group-hover:bg-[#0B0B08] group-hover:text-[#E6E4DE] transition-colors duration-200">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Floating Hover Preview Card Rendered via Body Portal (Full Color, 100% Opacity) */}
      <WorkPreviewPortal hoveredProject={hoveredProject} />

      {/* FULL-SCREEN CASE STUDY MODAL (INK #0B0B08) */}
      <AnimatePresence>
        {activeModalProject && (
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, clipPath: 'circle(0% at 50% 50%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 50% 50%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 50% 50%)' }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            data-lenis-prevent="true"
            onScroll={handleModalScroll}
            style={{ overscrollBehavior: 'contain' }}
            className="fixed inset-0 z-[500] bg-[#0B0B08]/96 backdrop-blur-2xl text-[#E6E4DE] overflow-y-auto overscroll-contain select-none"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeModalProject.title} Case Study`}
            tabIndex={-1}
          >
            {/* Modal Top Control Bar (Sticky ~56px) */}
            <div className="sticky top-0 z-30 w-full h-14 bg-[#0B0B08]/95 backdrop-blur-md border-b border-[#8A8880]/20 px-4 sm:px-8 flex items-center justify-between shrink-0">
              <div className="font-mono text-xs uppercase tracking-widest text-[#8A8880] flex items-center gap-2 sm:gap-3">
                <span className="text-[#F0552D] font-bold">{activeModalProject.number}</span>
                <span className="hidden sm:inline">// CASE STUDY OVERLAY</span>
                <span className="text-[#E6E4DE]/60 text-[10px]">({currentIndex + 1} of {filteredProjects.length})</span>
              </div>

              {/* Prev / Next / Close Controls */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={handlePrev}
                  className="px-3 py-1.5 rounded-full border border-[#8A8880]/30 font-mono text-[11px] uppercase tracking-widest hover:border-[#F0552D] hover:text-[#F0552D] transition-colors flex items-center gap-1 cursor-pointer"
                  aria-label="Previous project"
                >
                  <ChevronLeft size={14} />
                  <span className="hidden sm:inline">PREV</span>
                </button>
                <button
                  onClick={handleNext}
                  className="px-3 py-1.5 rounded-full border border-[#8A8880]/30 font-mono text-[11px] uppercase tracking-widest hover:border-[#F0552D] hover:text-[#F0552D] transition-colors flex items-center gap-1 cursor-pointer"
                  aria-label="Next project"
                >
                  <span className="hidden sm:inline">NEXT</span>
                  <ChevronRight size={14} />
                </button>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full bg-[#F0552D] text-[#0B0B08] flex items-center justify-center hover:scale-105 transition-transform ml-2 cursor-pointer font-bold"
                  aria-label="Close modal"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* ── FIRST VIEWPORT (Fits in 100svh without scrolling) ── */}
            <div className="min-h-[calc(100svh-56px)] max-w-6xl mx-auto px-4 sm:px-8 py-3 flex flex-col justify-between items-center w-full">
              {/* Project Type / Year Label + Title Block */}
              <div className="shrink-0 text-center mb-2 sm:mb-3">
                <div className="font-mono text-[10px] sm:text-xs text-[#F0552D] uppercase tracking-[0.25em] font-bold mb-1">
                  {activeModalProject.category} // {activeModalProject.year}
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.04em] text-[#E6E4DE]">
                  {activeModalProject.title}
                </h2>
              </div>

              {/* Full Browser Frame Centered, Contained & Fully Visible */}
              <div className="w-full flex-1 flex items-center justify-center min-h-0 my-auto">
                <div className="w-full max-w-5xl flex flex-col items-center justify-center">
                  <BrowserFrame
                    src={activeModalProject.image}
                    alt={activeModalProject.title}
                    domain={activeModalProject.domain}
                    variant="ink"
                    aspectRatio={undefined}
                    objectFit="contain"
                    imageClassName="block mx-auto"
                    imageStyle={{
                      maxHeight: 'calc(100svh - 220px)',
                      width: 'auto',
                      maxWidth: '100%',
                      objectFit: 'contain',
                    }}
                    className="w-full bg-[#0B0B08] border-[#8A8880]/30 shadow-2xl"
                    priority={true}
                  />
                </div>
              </div>

              {/* Scroll Hint */}
              <div className="shrink-0 pt-2 pb-1 flex items-center justify-center">
                <div
                  className={`transition-opacity duration-300 font-mono text-[10px] uppercase tracking-widest text-[#8A8880] flex items-center gap-1.5 ${
                    hasScrolled ? 'opacity-0 pointer-events-none' : 'opacity-80 animate-bounce'
                  }`}
                >
                  <span>Scroll for details</span>
                  <ArrowDown size={11} className="text-[#F0552D]" />
                </div>
              </div>
            </div>

            {/* ── BELOW THE FIRST VIEWPORT (Revealed on Scroll) ── */}
            <div className="max-w-5xl mx-auto px-4 sm:px-8 pb-16 pt-6 w-full">
              {/* Specs & Link Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 pt-8 border-t border-[#8A8880]/20 mb-12">
                <div className="md:col-span-2 space-y-4">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-[#8A8880]">
                    SPECIFICATIONS &amp; ARCHITECTURE
                  </h3>
                  <p className="text-base sm:text-lg text-[#E6E4DE]/90 leading-relaxed font-light">
                    {activeModalProject.details}
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-widest text-[#8A8880] mb-3">
                      TECHNOLOGIES
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {activeModalProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded bg-[#E6E4DE]/10 text-[#E6E4DE] font-mono text-[10px] uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-widest text-[#8A8880] mb-3">
                      DIRECT ACCESS
                    </h3>
                    <div className="flex flex-col space-y-2.5">
                      {activeModalProject.demo && (
                        <a
                          href={activeModalProject.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-[#F0552D] hover:underline font-mono"
                        >
                          <ExternalLink size={14} />
                          <span>Live Deploy ↗</span>
                        </a>
                      )}
                      {activeModalProject.github && (
                        <a
                          href={activeModalProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-[#E6E4DE] hover:text-[#F0552D] font-mono transition-colors"
                        >
                          <FaGithub size={14} />
                          <span>View on GitHub ↗</span>
                        </a>
                      )}
                      {activeModalProject.youtubeDemo && (
                        <a
                          href={activeModalProject.youtubeDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-[#E6E4DE] hover:text-[#F0552D] font-mono transition-colors"
                        >
                          <FaYoutube size={14} />
                          <span>Watch Video Demo ↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Extra Gallery Screenshots if available */}
              {activeModalProject.gallery && activeModalProject.gallery.length > 1 && (
                <div className="mb-14">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-[#8A8880] mb-5">
                    SCREENSHOT GALLERY
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {activeModalProject.gallery.slice(1).map((img, i) => (
                      <BrowserFrame
                        key={i}
                        src={img}
                        alt={`${activeModalProject.title} screenshot ${i + 2}`}
                        domain={activeModalProject.domain}
                        variant="ink"
                        aspectRatio={undefined}
                        objectFit="contain"
                        imageClassName="block mx-auto"
                        imageStyle={{ maxHeight: '380px', objectFit: 'contain' }}
                        className="w-full bg-[#0B0B08] border-[#8A8880]/30"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* PREV / NEXT Project Footer Navigation */}
              {prevProject && nextProject && (
                <div className="pt-8 border-t border-[#8A8880]/20 mb-8">
                  <div className="font-mono text-xs uppercase tracking-widest text-[#8A8880] mb-4">
                    EXPLORE OTHER WORKS
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={handlePrev}
                      className="p-5 rounded-xl border border-[#8A8880]/25 bg-[#E6E4DE]/[0.02] hover:border-[#F0552D] hover:bg-[#F0552D]/5 transition-all text-left group cursor-pointer"
                    >
                      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#8A8880] mb-1 group-hover:text-[#F0552D]">
                        <ChevronLeft size={12} />
                        <span>PREVIOUS PROJECT ({prevProject.number})</span>
                      </div>
                      <div className="text-lg font-bold text-[#E6E4DE] group-hover:text-[#F0552D] transition-colors">
                        {prevProject.title}
                      </div>
                    </button>

                    <button
                      onClick={handleNext}
                      className="p-5 rounded-xl border border-[#8A8880]/25 bg-[#E6E4DE]/[0.02] hover:border-[#F0552D] hover:bg-[#F0552D]/5 transition-all text-right group cursor-pointer"
                    >
                      <div className="flex items-center justify-end gap-2 font-mono text-[10px] uppercase tracking-widest text-[#8A8880] mb-1 group-hover:text-[#F0552D]">
                        <span>NEXT PROJECT ({nextProject.number})</span>
                        <ChevronRight size={12} />
                      </div>
                      <div className="text-lg font-bold text-[#E6E4DE] group-hover:text-[#F0552D] transition-colors">
                        {nextProject.title}
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Modal Bottom Keyboard Shortcuts */}
              <div className="w-full border-t border-[#8A8880]/20 pt-4 flex flex-col sm:flex-row justify-between items-center gap-2 font-mono text-[10px] text-[#8A8880] uppercase tracking-widest">
                <span>NAVIGATE: ARROW KEYS (← / →)</span>
                <span>CLOSE: ESC</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default React.memo(Work);
