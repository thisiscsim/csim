import { useEffect } from 'react';
import type Lenis from 'lenis';

// Add global type declaration
declare global {
  interface Window {
    lenis?: Lenis;
  }
}

export const useLenis = () => {
  useEffect(() => {
    // Only initialize Lenis on devices that will benefit from it (desktop with pointer device)
    const isPointerDevice = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Skip Lenis if on mobile or if user prefers reduced motion
    if (!isPointerDevice || prefersReducedMotion) {
      return;
    }

    // Lazy load Lenis only when needed (desktop with mouse)
    import('lenis').then(({ default: Lenis }) => {
      const lenis = new Lenis({
        lerp: 0.25, // Slightly faster for better responsiveness
        wheelMultiplier: 1.1,
        smoothWheel: true,
        smoothTouch: false, // Disable on touch devices
      });

      // Store lenis instance globally
      window.lenis = lenis;

      let rafId: number;
      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);

      // Cleanup
      return () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
        window.lenis = undefined;
      };
    });
  }, []);
};

// Hook to scroll to top on route change
export const useScrollToTop = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    const timer = setTimeout(() => {
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);
};
