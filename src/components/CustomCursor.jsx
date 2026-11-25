import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const haloRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const isHoveredRef = useRef(false);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    // Disable on touch devices
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const cursor = cursorRef.current;
    const halo = haloRef.current;
    if (!cursor) return;

    let animId;
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const handleMouseMove = (e) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        cursor.style.opacity = '1';
        if (halo) halo.style.opacity = '1';
      }

      const target = e.target;
      const interactive = target && target.closest('a, button, [role="button"], input, textarea, [data-cursor="pointer"]');
      const isInteractive = Boolean(interactive);

      if (isInteractive !== isHoveredRef.current) {
        isHoveredRef.current = isInteractive;
        const innerShard = cursor.querySelector('.cursor-shard');
        if (innerShard) {
          if (isInteractive) {
            innerShard.classList.add('scale-150', 'bg-[#F0552D]', 'border-[#F0552D]', 'shadow-[0_0_12px_rgba(240,85,45,0.6)]');
            innerShard.classList.remove('bg-[#E6E4DE]', 'border-[#0B0B08]/40');
          } else {
            innerShard.classList.remove('scale-150', 'bg-[#F0552D]', 'border-[#F0552D]', 'shadow-[0_0_12px_rgba(240,85,45,0.6)]');
            innerShard.classList.add('bg-[#E6E4DE]', 'border-[#0B0B08]/40');
          }
        }
        if (halo) {
          halo.style.display = isInteractive ? 'block' : 'none';
        }
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      cursor.style.opacity = '0';
      if (halo) halo.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      // Don't calculate or write to DOM during nav-triggered scrolls
      if (!window.__isNavScrolling && isVisibleRef.current) {
        posRef.current.x = lerp(posRef.current.x, targetRef.current.x, 0.22);
        posRef.current.y = lerp(posRef.current.y, targetRef.current.y, 0.22);

        cursor.style.transform = `translate3d(${posRef.current.x - 7}px, ${posRef.current.y - 7}px, 0)`;
        if (halo && isHoveredRef.current) {
          halo.style.transform = `translate3d(${posRef.current.x - 20}px, ${posRef.current.y - 20}px, 0) scale(1.3)`;
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Small diamond / shard cursor (zero React setState on render) */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3.5 h-3.5 pointer-events-none flex items-center justify-center opacity-0 transition-opacity duration-150"
        style={{ willChange: 'transform' }}
      >
        <div className="cursor-shard w-3.5 h-3.5 rotate-45 transition-all duration-200 ease-out border bg-[#E6E4DE] border-[#0B0B08]/40 shadow-sm" />
      </div>

      {/* Outer halo when hovered on links */}
      <div
        ref={haloRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-[#F0552D]/40 pointer-events-none opacity-0 transition-opacity duration-200"
        style={{ display: 'none', willChange: 'transform' }}
      />
    </div>
  );
};

export default React.memo(CustomCursor);
