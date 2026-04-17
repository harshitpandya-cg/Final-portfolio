import React, { useState, useEffect, useRef } from 'react';

/**
 * LazySection component that only renders its children when it enters the viewport.
 * This significantly improves TBT (Total Blocking Time) and initial Page Load.
 */
const LazySection = ({ children, threshold = 0.1, rootMargin = '200px' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [threshold, rootMargin]);

  return (
    <div ref={sectionRef} className="min-h-[200px]">
      {isVisible ? children : null}
    </div>
  );
};

export default LazySection;
