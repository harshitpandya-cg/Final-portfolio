/**
 * Cinematic Smooth Scroll Helper using Lenis
 * Scales duration with distance: clamp(1.2s, distance / 2200px * 1s, 2.4s)
 * Custom easing: t => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2
 * Updates hash via history.replaceState after scroll finishes
 * Cancels if user wheels, touches, or presses a key
 */

export const smoothScrollTo = (target, options = {}) => {
  if (typeof window === 'undefined') return;

  // If a modal is open, completely ignore scroll requests
  if (window.__isModalOpen || document.body.dataset.modalOpen === 'true') {
    return;
  }

  let targetElement = null;
  let hash = '';

  if (typeof target === 'string') {
    if (target === '#' || target === '#top' || target === '') {
      targetElement = document.body;
      hash = '';
    } else {
      hash = target.startsWith('#') ? target : `#${target}`;
      targetElement = document.querySelector(hash);
    }
  } else if (target instanceof HTMLElement) {
    targetElement = target;
    if (target.id) hash = `#${target.id}`;
  }

  const currentScroll = window.scrollY || window.pageYOffset || 0;
  let targetPosition = 0;

  if (targetElement && targetElement !== document.body) {
    const rect = targetElement.getBoundingClientRect();
    targetPosition = rect.top + currentScroll;
  }

  const distance = Math.abs(targetPosition - currentScroll);

  // Scaled duration: clamp(1.2s, distance / 2200px * 1s, 2.4s)
  const duration = Math.min(2.4, Math.max(1.2, (distance / 2200) * 1.0));

  // Easing: t => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2
  const easing = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  // Reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Activate nav-scrolling state to freeze heavy hover/canvas renders during scroll
  window.__isNavScrolling = true;
  document.body.classList.add('nav-scrolling-active');

  let cancelled = false;
  const cancelEvents = ['wheel', 'touchstart', 'keydown'];
  let safetyTimer = null;

  const resetNavScrolling = () => {
    window.__isNavScrolling = false;
    document.body.classList.remove('nav-scrolling-active');
    if (safetyTimer) clearTimeout(safetyTimer);
  };

  const cleanup = () => {
    cancelEvents.forEach((evt) => {
      window.removeEventListener(evt, cancelHandler, { passive: true });
    });
  };

  const cancelHandler = () => {
    cancelled = true;
    resetNavScrolling();
    cleanup();
  };

  cancelEvents.forEach((evt) => {
    window.addEventListener(evt, cancelHandler, { passive: true });
  });

  const onScrollFinish = () => {
    resetNavScrolling();
    cleanup();
    if (!cancelled && !window.__isModalOpen) {
      if (hash) {
        history.replaceState(null, '', hash);
      } else if (target === '#' || target === '#top') {
        history.replaceState(null, '', window.location.pathname);
      }
      options.onComplete?.();
    }
  };

  // Safety fallback timer to prevent permanent freeze state
  safetyTimer = setTimeout(() => {
    resetNavScrolling();
  }, (duration + 0.6) * 1000);

  if (window.lenis && typeof window.lenis.scrollTo === 'function') {
    window.lenis.scrollTo(targetElement || 0, {
      offset: -88, // Clean offset leaving room below the navbar
      duration: prefersReducedMotion ? 0 : duration,
      easing,
      immediate: prefersReducedMotion,
      lock: false,
      onComplete: onScrollFinish,
    });
  } else {
    // Native fallback if Lenis is not available
    if (prefersReducedMotion) {
      window.scrollTo(0, Math.max(0, targetPosition - 88));
    } else {
      window.scrollTo({
        top: Math.max(0, targetPosition - 88),
        behavior: 'smooth',
      });
    }
    onScrollFinish();
  }
};
