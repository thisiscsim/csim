import { useEffect } from 'react';
import Lenis from 'lenis';

// Add global type declaration
declare global {
  interface Window {
    lenis?: Lenis;
  }
}

export const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.2, // Increased from 0.1 for faster, more responsive scrolling
      wheelMultiplier: 1.2, // Slightly increased for better responsiveness
      smoothWheel: true,
    });

    // Store lenis instance globally
    window.lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.lenis = undefined;
    };
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
