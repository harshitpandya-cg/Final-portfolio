import React, { useState, useEffect, useRef } from 'react';

const statsData = [
  {
    index: '01',
    endValue: 10,
    suffix: '+',
    label: 'COMPLETED PROJECTS',
    description: 'Full-stack applications, UI clones, and interactive Figma systems.',
  },
  {
    index: '02',
    endValue: 4,
    suffix: '+',
    label: 'COMPETITIVE HACKATHONS',
    description: 'High-pressure technical sprints across universities and industry summits.',
  },
  {
    index: '03',
    endValue: 2,
    suffix: 'nd',
    label: 'ELECTROSPHERE PODIUM',
    description: 'Second place finish in Open Innovation cybersecurity challenge.',
  },
  {
    index: '04',
    endValue: 7,
    suffix: 'th',
    label: 'IIIT SURAT NATIONAL RANK',
    description: 'Ranked 7th among 30+ elite teams with live pitch defense.',
  },
  {
    index: '05',
    endValue: 2029,
    suffix: '',
    label: 'BTECH CSE COHORT',
    description: 'Degree track at CodingGita specializing in full-stack architecture.',
  },
];

const StatRow = ({ stat, hasTriggered }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!hasTriggered) return;

    let start = 0;
    const end = stat.endValue;
    const duration = 1600;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = end / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [hasTriggered, stat.endValue]);

  return (
    <div className="py-7 sm:py-9 md:py-11 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:translate-x-2 transition-transform duration-200">
      <div className="flex items-baseline gap-6 md:gap-10">
        <span className="font-mono text-sm text-[#F0552D] font-bold w-6 shrink-0">
          {stat.index}
        </span>
        <div
          className="font-semibold tracking-[-0.04em] text-[#0B0B08] group-hover:text-[#F0552D] transition-colors"
          style={{ fontSize: 'clamp(44px, min(8vw, 10vh), 96px)', lineHeight: 1 }}
        >
          {hasTriggered ? count : 0}
          <span className="text-3xl sm:text-4xl md:text-5xl font-mono text-[#F0552D]">
            {stat.suffix}
          </span>
        </div>
      </div>

      <div className="max-w-xs md:text-right pl-12 md:pl-0">
        <div className="font-mono text-xs uppercase tracking-widest text-[#0B0B08] font-bold mb-1">
          {stat.label}
        </div>
        <p className="text-xs text-[#0B0B08]/65 font-light leading-relaxed">
          {stat.description}
        </p>
      </div>
    </div>
  );
};

const Stats = () => {
  const sectionRef = useRef(null);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="stats"
      ref={sectionRef}
      data-theme="paper"
      className="relative py-24 sm:py-32 bg-[#E6E4DE] text-[#0B0B08] select-none scroll-mt-24 border-t border-[#0B0B08]/15"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-[#0B0B08]/15 mb-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#D63B13] font-bold">
                07 // BY THE NUMBERS
              </span>
              <span className="h-[1px] w-12 bg-[#F0552D]" />
            </div>
            <h2
              className="font-semibold tracking-[-0.04em] text-[#0B0B08]"
              style={{ fontSize: 'clamp(44px, min(8vw, 12vh), 110px)', lineHeight: 0.9, textWrap: 'balance' }}
            >
              Metrics &amp; Trajectory.
            </h2>
          </div>

          <p className="font-mono text-xs uppercase tracking-widest text-[#0B0B08]/65 max-w-xs">
            Measured outputs across development, national podium finishes, and academic milestones.
          </p>
        </div>

        {/* Ruled Count-Up Rows */}
        <div className="divide-y divide-[#0B0B08]/15 border-b border-[#0B0B08]/15">
          {statsData.map((stat) => (
            <StatRow key={stat.index} stat={stat} hasTriggered={hasTriggered} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default React.memo(Stats);
