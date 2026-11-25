import React, { useRef, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PhotoFrame } from './Frames';
import profilePhoto from '../assets/Profile image.jpeg';

/**
 * Shared Content Component rendered identically for both Paper and Blueprint layers.
 * Guarantees 100% matching line-breaks, font sizing, and element wrapping.
 */
const AboutContent = ({ variant = 'paper' }) => {
  const isBlueprint = variant === 'blueprint';

  return (
    <div
      className={`w-full h-full flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1320px] mx-auto relative z-10 ${
        isBlueprint ? 'text-[#E6E4DE]' : 'text-[#0B0B08]'
      }`}
    >
      {/* 01. Label */}
      <div className="flex items-center gap-3 mb-6 shrink-0">
        <span
          className={`font-mono text-[11px] uppercase tracking-[0.25em] font-bold ${
            isBlueprint ? 'text-[#F0552D]' : 'text-[#D63B13]'
          }`}
        >
          02 // ABOUT &amp; PROCESS
        </span>
        <span className="h-[1px] w-12 bg-[#F0552D]" />
      </div>

      {/* 02. Heading with Figma Bounding Box */}
      <div className="relative inline-block mb-8 shrink-0 max-w-4xl">
        {/* Figma Corner Handles (Hidden under 1024px) */}
        <div className="hidden lg:block absolute -inset-2 border border-[#F0552D]/60 pointer-events-none">
          <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-[#F0552D] border border-white" />
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#F0552D] border border-white" />
          <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-[#F0552D] border border-white" />
          <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-[#F0552D] border border-white" />
          <div className="absolute -top-5 left-0 bg-[#F0552D] text-[#0B0B08] font-mono text-[9px] uppercase px-1.5 py-0.5 rounded-sm font-bold tracking-wider">
            H2: DISPLAY // CLAMP(40px, 7vw, 92px)
          </div>
        </div>

        <h2
          className={`font-semibold tracking-[-0.04em] ${
            isBlueprint
              ? 'text-transparent [-webkit-text-stroke:1.2px_#F0552D]'
              : 'text-[#0B0B08]'
          }`}
          style={{
            fontSize: 'clamp(36px, min(6.5vw, 9vh), 84px)',
            lineHeight: 0.94,
            textWrap: 'balance',
          }}
        >
          Passion for <br />
          quality development.
        </h2>
      </div>

      {/* 03. Bio & Profile Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl">
        {/* Left Column: Bio Paragraphs & Two Lists */}
        <div className="md:col-span-8 space-y-6">
          <p
            className={`text-sm sm:text-base md:text-lg leading-relaxed font-light ${
              isBlueprint ? 'text-[#E6E4DE]/90' : 'text-[#0B0B08]/85'
            }`}
          >
            I am a passionate <span className="font-semibold">Full Stack Developer</span> and a 2nd year B.Tech in Computer Science student at <span className="font-semibold">CodingGita</span> (2025–2029).
          </p>

          <p
            className={`text-xs sm:text-sm md:text-base leading-relaxed font-light ${
              isBlueprint ? 'text-[#8A8880]' : 'text-[#0B0B08]/70'
            }`}
          >
            I specialize in bridging the gap between innovative design and robust back-end logic. From crafting pixel-perfect interfaces to architecting scalable server-side systems, I thrive on building end-to-end solutions that are both functional and performant. My goal is to master the entire modern web stack.
          </p>

          {/* Two Structured Lists in a 2-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 font-mono text-xs">
            <div className={`p-4 rounded-xl border ${isBlueprint ? 'border-[#8A8880]/20 bg-[#0B0B08]' : 'border-[#0B0B08]/15 bg-[#E6E4DE]'}`}>
              <span className="text-[#F0552D] font-bold block mb-2">// CORE ARCHITECTURE</span>
              <ul className="space-y-1.5 opacity-80">
                <li>• Scalable Client-Server Design</li>
                <li>• Real-Time Sockets &amp; Emergency APIs</li>
                <li>• High Core Web Vitals &amp; 60fps</li>
              </ul>
            </div>

            <div className={`p-4 rounded-xl border ${isBlueprint ? 'border-[#8A8880]/20 bg-[#0B0B08]' : 'border-[#0B0B08]/15 bg-[#E6E4DE]'}`}>
              <span className="text-[#F0552D] font-bold block mb-2">// DESIGN SYSTEMS</span>
              <ul className="space-y-1.5 opacity-80">
                <li>• Figma Wireframe &amp; Interactive Flow</li>
                <li>• Accessible Contrast &amp; Fluid Typography</li>
                <li>• Production Deployment on Vercel</li>
              </ul>
            </div>
          </div>

          {/* Button in its OWN dedicated row with at least 40px gap */}
          <div className="pt-6">
            <div className="relative inline-block">
              {/* Figma Corner Handles around Button (Hidden under 1024px) */}
              <div className="hidden lg:block absolute -inset-2 border border-[#F0552D]/60 pointer-events-none">
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#F0552D]" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#F0552D]" />
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#F0552D]" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#F0552D]" />
                <div className="absolute -bottom-5 left-1 bg-[#0B0B08] text-[#E6E4DE] font-mono text-[8px] uppercase px-1 tracking-widest">
                  BTN // 210x44
                </div>
              </div>

              <a
                href="#honors"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 ${
                  isBlueprint
                    ? 'bg-[#F0552D] text-[#0B0B08] hover:bg-[#E6E4DE]'
                    : 'bg-[#0B0B08] text-[#E6E4DE] hover:bg-[#F0552D] hover:text-[#0B0B08]'
                }`}
              >
                <span>View Full Journey</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Profile Photo in PhotoFrame */}
        <div className="hidden md:block md:col-span-4 pl-4 lg:pl-8">
          <PhotoFrame
            src={profilePhoto}
            alt="Harshit Pandya"
            caption="HP — Gandhinagar, IN"
            className="w-full max-w-[280px] mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

const AboutProcess = () => {
  const containerRef = useRef(null);
  const blueprintLayerRef = useRef(null);
  const neonLineRef = useRef(null);

  // Direct DOM clip-path & opacity updates on scroll to eliminate per-frame React re-rendering
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) {
            ticking = false;
            return;
          }
          const rect = containerRef.current.getBoundingClientRect();
          // Culling: if completely offscreen, skip styling work
          if (rect.bottom < 0 || rect.top > window.innerHeight) {
            ticking = false;
            return;
          }

          const totalScroll = containerRef.current.offsetHeight - window.innerHeight;
          const currentScroll = -rect.top;
          const progress = Math.max(0, Math.min(1, currentScroll / (totalScroll || 1)));

          const isRevealing = progress > 0.02 && progress < 0.98;
          const cutX = 125 - progress * 150; // Sweeps from 125% down to -25%
          const topCut = cutX + 22;
          const bottomCut = cutX - 22;

          if (blueprintLayerRef.current) {
            if (isRevealing) {
              blueprintLayerRef.current.style.opacity = '1';
              blueprintLayerRef.current.style.clipPath = `polygon(${topCut}% 0%, 100% 0%, 100% 100%, ${bottomCut}% 100%)`;
            } else {
              blueprintLayerRef.current.style.opacity = '0';
              blueprintLayerRef.current.style.clipPath = 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)';
            }
          }

          if (neonLineRef.current) {
            if (isRevealing) {
              neonLineRef.current.style.opacity = '1';
              neonLineRef.current.style.left = `${(topCut + bottomCut) / 2}%`;
            } else {
              neonLineRef.current.style.opacity = '0';
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      data-theme="paper"
      className="relative h-[200svh] w-full bg-[#E6E4DE] select-none scroll-mt-24"
    >
      {/* Sticky Viewport Container (100svh) holding stacked CSS grid cells */}
      <div className="sticky top-0 h-[100svh] w-full grid grid-cols-1 grid-rows-1 overflow-hidden">
        
        {/* ── LAYER 1: PAPER BASE LAYER ── */}
        <div
          className="w-full h-full bg-[#E6E4DE] overflow-hidden"
          style={{ gridArea: '1 / 1' }}
        >
          <AboutContent variant="paper" />
        </div>

        {/* ── LAYER 2: BLUEPRINT / WIREFRAME LAYER (STACKED IN SAME CELL) ── */}
        <div
          ref={blueprintLayerRef}
          aria-hidden="true"
          className="w-full h-full bg-[#0B0B08] pointer-events-none select-none overflow-hidden transition-opacity duration-150"
          style={{
            gridArea: '1 / 1',
            opacity: 0,
            clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
          }}
        >
          {/* Blueprint Background Line Drawing Canvas */}
          <svg
            className="absolute inset-0 w-full h-full opacity-30 pointer-events-none z-0"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="bpGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#F0552D" strokeWidth="0.5" strokeDasharray="2 4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#bpGrid)" />

            {/* Concentric Guides kept inside frame */}
            <circle cx="75%" cy="40%" r="140" fill="none" stroke="#F0552D" strokeWidth="1" strokeDasharray="4 8" />
            <circle cx="75%" cy="40%" r="220" fill="none" stroke="#8A8880" strokeWidth="0.75" strokeDasharray="6 12" />
            <line x1="0" y1="40%" x2="100%" y2="40%" stroke="#F0552D" strokeWidth="0.5" strokeDasharray="3 6" />
            <line x1="75%" y1="0" x2="75%" y2="100%" stroke="#F0552D" strokeWidth="0.5" strokeDasharray="3 6" />
            <circle cx="75%" cy="40%" r="6" fill="#F0552D" />

            {/* Pivot Label hidden under 1280px */}
            <text
              x="77%"
              y="39%"
              fill="#F0552D"
              fontFamily="JetBrains Mono"
              fontSize="10"
              letterSpacing="2"
              className="hidden xl:block"
            >
              PIVOT [75.0%, 40.0%] // RADIAL SYNC
            </text>
          </svg>

          {/* Blueprint Mirror Content (Matches Paper Layer 1:1) */}
          <AboutContent variant="blueprint" />

          {/* Cutting Edge Neon Coral Line */}
          <div
            ref={neonLineRef}
            className="absolute top-0 bottom-0 w-[2px] bg-[#F0552D] shadow-[0_0_16px_#F0552D] pointer-events-none"
            style={{
              opacity: 0,
              transform: 'rotate(18deg)',
              transformOrigin: 'center center',
            }}
          />
        </div>

      </div>
    </section>
  );
};

export default React.memo(AboutProcess);
