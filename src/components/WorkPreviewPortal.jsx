import React, { useEffect, useState, useRef, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { BrowserFrame } from './Frames';

const emptySubscribe = () => () => {};

const WorkPreviewPortal = ({ hoveredProject }) => {
  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const cardRef = useRef(null);
  const posRef = useRef({ x: -500, y: -500 });
  const targetRef = useRef({ x: -500, y: -500 });
  const [isTouch] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(pointer: coarse)').matches : false
  );

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animId;
    const cardWidth = 320;
    const cardHeight = 220;

    const render = () => {
      if (!window.__isNavScrolling && cardRef.current) {
        const lerp = 0.22;
        posRef.current.x += (targetRef.current.x - posRef.current.x) * lerp;
        posRef.current.y += (targetRef.current.y - posRef.current.y) * lerp;

        const desiredX = posRef.current.x + 24;
        const desiredY = posRef.current.y + 24;

        const maxX = window.innerWidth - cardWidth - 20;
        const maxY = window.innerHeight - cardHeight - 20;

        const clampedX = Math.min(maxX, Math.max(20, desiredX));
        const clampedY = Math.min(maxY, Math.max(20, desiredY));

        cardRef.current.style.transform = `translate3d(${clampedX}px, ${clampedY}px, 0)`;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [isTouch]);

  if (!isMounted || isTouch || !hoveredProject) return null;

  return createPortal(
    <div
      ref={cardRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        transform: 'translate3d(-500px, -500px, 0)',
        width: '320px',
        pointerEvents: 'none',
        zIndex: 350,
        willChange: 'transform',
      }}
      className="transition-opacity duration-200"
    >
      <BrowserFrame
        src={hoveredProject.image}
        alt={hoveredProject.title}
        domain={hoveredProject.domain || hoveredProject.demo || 'project.live'}
        variant="ink"
        className="w-full bg-[#0B0B08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-[#8A8880]/30"
      />
    </div>,
    document.body
  );
};

export default React.memo(WorkPreviewPortal);
