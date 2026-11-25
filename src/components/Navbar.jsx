import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { smoothScrollTo } from '../utils/smoothScroll';

const Navbar = () => {
  const [activeTheme, setActiveTheme] = useState('ink'); // 'ink' | 'paper'
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('work');
  const [hoveredLink, setHoveredLink] = useState(null);
  const [currentTime, setCurrentTime] = useState('');
  const [currentMode, setCurrentMode] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.getAttribute('data-mode') || 'dark';
    }
    return 'dark';
  });

  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const lastActiveElementRef = useRef(null);

  // Observe theme mode changes on <html>
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const mo = new MutationObserver(() => {
      setCurrentMode(document.documentElement.getAttribute('data-mode') || 'dark');
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-mode'] });
    return () => mo.disconnect();
  }, []);

  // Live Clock for Asia/Kolkata (Gandhinagar, IST)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setCurrentTime(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Screen width detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll Progress Calculation (0 to 100%) and 80px Compact Threshold
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || window.pageYOffset || 0;
          setIsScrolled(scrollY >= 80);

          const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
          const pct = totalScroll > 0 ? (scrollY / totalScroll) * 100 : 0;
          setScrollProgress(Math.min(100, Math.max(0, pct)));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme Detection via IntersectionObserver on sections with data-theme="ink|paper"
  useEffect(() => {
    const sections = document.querySelectorAll('section[data-theme]');
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const theme = entry.target.getAttribute('data-theme');
            if (theme === 'ink' || theme === 'paper') {
              setActiveTheme(theme);
            }
          }
        });
      },
      {
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0,
      }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const targets = ['work', 'about', 'skills', 'contact']
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        if (window.__isModalOpen) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -60% 0px', threshold: 0 }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  // Lenis stop/start & focus trap for full-screen menu overlay
  useEffect(() => {
    if (menuOpen) {
      lastActiveElementRef.current = document.activeElement;

      if (typeof window !== 'undefined' && window.lenis && typeof window.lenis.stop === 'function') {
        window.lenis.stop();
      }
      document.body.style.overflow = 'hidden';

      const timer = setTimeout(() => {
        if (menuRef.current) {
          const focusables = menuRef.current.querySelectorAll('button, a[href]');
          if (focusables.length > 0) focusables[0].focus();
        }
      }, 80);

      const handleKey = (e) => {
        if (e.key === 'Escape') {
          setMenuOpen(false);
          buttonRef.current?.focus();
        } else if (e.key === 'Tab' && menuRef.current) {
          const focusables = Array.from(
            menuRef.current.querySelectorAll('button, a[href]')
          ).filter((el) => !el.hasAttribute('disabled'));
          if (focusables.length === 0) return;
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      window.addEventListener('keydown', handleKey);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', handleKey);
        if (typeof window !== 'undefined' && window.lenis && typeof window.lenis.start === 'function') {
          window.lenis.start();
        }
        document.body.style.overflow = '';
      };
    } else {
      if (typeof window !== 'undefined' && window.lenis && typeof window.lenis.start === 'function') {
        window.lenis.start();
      }
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  const navLinks = [
    { name: 'Work', href: '#work', index: '01' },
    { name: 'About', href: '#about', index: '02' },
    { name: 'Skills', href: '#skills', index: '03' },
    { name: 'Contact', href: '#contact', index: '04' },
  ];

  const socials = [
    { name: 'GitHub', href: 'https://github.com/harshitpandya-cg', icon: <FaGithub size={16} /> },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/harshitpandya2911/', icon: <FaLinkedin size={16} /> },
    { name: 'Twitter', href: 'https://x.com/HarshitP68223', icon: <FaTwitter size={16} /> },
    { name: 'YouTube', href: 'https://www.youtube.com/@harshitpandya2911', icon: <FaYoutube size={16} /> },
    { name: 'LeetCode', href: 'https://leetcode.com/u/harshit_pandya01/', icon: <SiLeetcode size={16} /> },
  ];

  const handleMenuLinkClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    setTimeout(() => {
      smoothScrollTo(href);
    }, 300);
  };

  const isLightMode = currentMode === 'light';
  const isInk = activeTheme === 'ink';
  const isCompact = isMobile || isScrolled;

  const headerBgClass = isCompact
    ? 'bg-transparent border-transparent shadow-none px-0 py-0'
    : isLightMode
    ? 'bg-[rgba(243,241,236,0.92)] text-[#0B0B08] border border-[rgba(11,11,8,0.12)] shadow-xl backdrop-blur-xl px-5 py-3.5'
    : isInk
    ? 'bg-[rgba(11,11,8,0.85)] text-[#E6E4DE] border border-[rgba(138,136,128,0.2)] shadow-2xl backdrop-blur-xl px-5 py-3.5'
    : 'bg-[rgba(230,228,222,0.88)] text-[#0B0B08] border border-[rgba(11,11,8,0.12)] shadow-xl backdrop-blur-xl px-5 py-3.5';

  return (
    <>
      {/* Top Floating Header Track */}
      <div className="fixed top-4 left-4 right-4 md:top-6 md:left-8 md:right-8 z-[300] pointer-events-none select-none">
        <header
          className={`relative rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${headerBgClass}`}
          style={!isCompact ? { backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' } : {}}
        >
          <div className="w-full flex items-center justify-between relative pointer-events-auto">
            {/* Logo / Monogram (Left) */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo('#');
              }}
              className="flex items-center gap-3 group shrink-0"
              aria-label="Harshit Pandya Portfolio - Back to top"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm tracking-tighter transition-all duration-300 shadow-md ${
                  isInk
                    ? 'bg-[#E6E4DE] text-[#0B0B08] group-hover:bg-[#F0552D] group-hover:text-white'
                    : 'bg-[#0B0B08] text-[#E6E4DE] group-hover:bg-[#F0552D] group-hover:text-white'
                } ${isCompact ? 'border border-[#8A8880]/30 backdrop-blur-md' : ''}`}
              >
                HP
              </div>
              <div
                className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] hidden sm:flex flex-col"
                style={{
                  opacity: isCompact ? 0 : 1,
                  maxWidth: isCompact ? '0px' : '220px',
                  pointerEvents: isCompact ? 'none' : 'auto',
                }}
              >
                <span className={`text-xs font-bold tracking-tight uppercase leading-none whitespace-nowrap ${isInk ? 'text-[#E6E4DE]' : 'text-[#0B0B08]'}`}>
                  Harshit Pandya
                </span>
                <span className={`font-mono text-[9px] uppercase tracking-widest mt-0.5 whitespace-nowrap ${isInk ? 'text-[#8A8880]' : 'text-[#0B0B08]/60'}`}>
                  Full-Stack &amp; UI/UX
                </span>
              </div>
            </a>

            {/* Nav Links (Center, Collapses smoothly on scroll) */}
            <nav
              className="hidden md:flex items-center space-x-8 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
              style={{
                opacity: isCompact ? 0 : 1,
                transform: isCompact ? 'translateY(-12px)' : 'translateY(0)',
                pointerEvents: isCompact ? 'none' : 'auto',
              }}
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.name.toLowerCase();
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`group relative flex items-baseline gap-1.5 py-1 text-xs uppercase tracking-[0.2em] font-mono transition-colors duration-200 ${
                      isInk ? 'text-[#8A8880] hover:text-[#E6E4DE]' : 'text-[#0B0B08]/65 hover:text-[#0B0B08]'
                    }`}
                  >
                    <span className={`text-[10px] font-bold ${isInk ? 'text-[#F0552D]' : 'text-[#D63B13]'}`}>
                      {link.index}
                    </span>
                    <span className="font-medium">{link.name}</span>
                    <span
                      className={`absolute bottom-0 left-0 h-[1.5px] transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      } ${isInk ? 'bg-[#F0552D]' : 'bg-[#D63B13]'}`}
                    />
                  </a>
                );
              })}
            </nav>

            {/* Right Action: Pill CTA (Collapses smoothly on scroll) */}
            <div
              className="hidden md:flex items-center transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
              style={{
                opacity: isCompact ? 0 : 1,
                transform: isCompact ? 'scale(0.85)' : 'scale(1)',
                pointerEvents: isCompact ? 'none' : 'auto',
              }}
            >
              <a
                href="#contact"
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-widest transition-all duration-300 group border ${
                  isInk
                    ? 'border-[#8A8880]/40 text-[#E6E4DE] hover:border-[#F0552D] hover:bg-[#F0552D] hover:text-[#0B0B08]'
                    : 'border-[#0B0B08]/30 text-[#0B0B08] hover:border-[#D63B13] hover:bg-[#D63B13] hover:text-[#E6E4DE]'
                }`}
              >
                <span className="font-semibold">Get in touch</span>
                <ArrowUpRight
                  size={13}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </a>
            </div>

            {/* Compact Hamburger Button (Scales & fades in when isCompact) */}
            <div
              className="transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
              style={{
                opacity: isCompact ? 1 : 0,
                transform: isCompact ? 'scale(1)' : 'scale(0.8)',
                pointerEvents: isCompact ? 'auto' : 'none',
              }}
            >
              <button
                ref={buttonRef}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-expanded={menuOpen}
                aria-controls="fullscreen-menu"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition-colors duration-250 cursor-pointer shadow-lg backdrop-blur-md relative overflow-hidden ${
                  isLightMode
                    ? 'bg-[#0B0B08] border-[#0B0B08]/40 text-[#E6E4DE] hover:border-[#F0552D]'
                    : isInk
                    ? 'bg-[#E6E4DE] border-[#E6E4DE]/40 text-[#0B0B08] hover:border-[#F0552D]'
                    : 'bg-[#0B0B08] border-[#0B0B08]/40 text-[#E6E4DE] hover:border-[#D63B13]'
                }`}
              >
                <span
                  className={`absolute w-5 h-[1.5px] transition-transform duration-300 ease-in-out ${
                    isLightMode ? 'bg-[#E6E4DE]' : isInk ? 'bg-[#0B0B08]' : 'bg-[#E6E4DE]'
                  }`}
                  style={{
                    transform: menuOpen ? 'rotate(45deg)' : 'translateY(-3.5px)',
                  }}
                />
                <span
                  className={`absolute w-5 h-[1.5px] transition-transform duration-300 ease-in-out ${
                    isLightMode ? 'bg-[#E6E4DE]' : isInk ? 'bg-[#0B0B08]' : 'bg-[#E6E4DE]'
                  }`}
                  style={{
                    transform: menuOpen ? 'rotate(-45deg)' : 'translateY(3.5px)',
                  }}
                />
              </button>
            </div>
          </div>

          {/* Simultaneous Scroll Completion Progress Line (Full Nav state) */}
          {!isCompact && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black/5 overflow-hidden rounded-b-2xl">
              <div
                className="h-full bg-[#F0552D] transition-[width] duration-75 ease-out"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          )}
        </header>

        {/* Compact Mode Scroll Progress Line at Top Edge */}
        {isCompact && (
          <div className="fixed top-0 left-0 right-0 h-[2px] bg-black/10 overflow-hidden z-[300]">
            <div
              className="h-full bg-[#F0552D] transition-[width] duration-75 ease-out"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        )}
      </div>

      {/* FULL-SCREEN MENU OVERLAY (Ink #0B0B08 with Film Grain & Circular Wipe) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="fullscreen-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site Navigation Menu"
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 44px) 44px)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[400] bg-[#0B0B08] text-[#E6E4DE] flex flex-col justify-between p-6 sm:p-10 md:p-16 select-none overflow-y-auto"
          >
            {/* Film Grain inside menu */}
            <div className="noise-overlay pointer-events-none" aria-hidden="true" />

            {/* Menu Header: Top Bar */}
            <div className="w-full flex items-center justify-between z-10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#E6E4DE] text-[#0B0B08] flex items-center justify-center font-black text-sm tracking-tighter">
                  HP
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold tracking-tight uppercase leading-none text-[#E6E4DE]">
                    Harshit Pandya
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-widest mt-0.5 text-[#8A8880]">
                    Full-Stack &amp; UI/UX
                  </span>
                </div>
              </div>

              {/* Close Button matching Hamburger */}
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="w-11 h-11 rounded-full border border-[#E6E4DE]/40 bg-[#E6E4DE] text-[#0B0B08] flex items-center justify-center hover:bg-[#F0552D] hover:text-white transition-colors cursor-pointer shadow-xl relative"
              >
                <span className="absolute w-5 h-[1.5px] bg-current rotate-45" />
                <span className="absolute w-5 h-[1.5px] bg-current -rotate-45" />
              </button>
            </div>

            {/* Center: Huge Display Navigation Links */}
            <nav className="my-auto py-8 flex flex-col space-y-3 sm:space-y-5 z-10">
              {navLinks.map((link, idx) => {
                const isHovered = hoveredLink === link.name;
                const isOtherHovered = hoveredLink !== null && !isHovered;

                return (
                  <div key={link.name} className="overflow-hidden">
                    <motion.div
                      initial={{ y: '100%', opacity: 0 }}
                      animate={{ y: '0%', opacity: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.12 + idx * 0.07,
                        ease: [0.19, 1, 0.22, 1],
                      }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => handleMenuLinkClick(e, link.href)}
                        onMouseEnter={() => setHoveredLink(link.name)}
                        onMouseLeave={() => setHoveredLink(null)}
                        className={`group inline-flex items-baseline transition-all duration-300 cursor-pointer ${
                          isOtherHovered ? 'opacity-30' : 'opacity-100'
                        } ${isHovered ? 'translate-x-4' : 'translate-x-0'}`}
                      >
                        <span className="font-mono text-base sm:text-2xl md:text-3xl text-[#F0552D] font-bold mr-4 sm:mr-8">
                          {link.index}
                        </span>
                        <span
                          className="font-semibold tracking-[-0.04em] text-[#E6E4DE] group-hover:text-[#F0552D] transition-colors"
                          style={{ fontSize: 'clamp(44px, min(8vw, 12vh), 110px)', lineHeight: 0.95 }}
                        >
                          {link.name}
                        </span>
                      </a>
                    </motion.div>
                  </div>
                );
              })}
            </nav>

            {/* Bottom Row: Pill, Email, Socials, Local Time */}
            <div className="pt-8 border-t border-[#8A8880]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 font-mono text-xs text-[#8A8880] uppercase tracking-widest z-10 shrink-0">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <a
                  href="#contact"
                  onClick={(e) => handleMenuLinkClick(e, '#contact')}
                  className="px-5 py-2.5 rounded-full bg-[#F0552D] text-[#0B0B08] font-bold hover:bg-[#E6E4DE] transition-colors cursor-pointer"
                >
                  Get in touch ↗
                </a>
                <a
                  href="mailto:harshitpandya073@gmail.com"
                  className="hover:text-[#F0552D] transition-colors lowercase cursor-pointer"
                >
                  harshitpandya073@gmail.com
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-6 sm:gap-8">
                <div className="flex items-center gap-4">
                  {socials.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#F0552D] transition-colors cursor-pointer"
                      aria-label={s.name}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
                <span>Gandhinagar, IN • {currentTime} IST</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default React.memo(Navbar);
