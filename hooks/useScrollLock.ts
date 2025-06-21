import { useEffect } from 'react';

export function useScrollLock(lock: boolean) {
  useEffect(() => {
    if (lock) {
      // Store current values
      const scrollY = window.scrollY;
      const bodyStyle = window.getComputedStyle(document.body);
      const bodyPaddingRight = bodyStyle.paddingRight;

      // Calculate scrollbar width
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      // Apply styles to prevent scrolling
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `calc(${bodyPaddingRight} + ${scrollbarWidth}px)`;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';

      // Also lock html element
      document.documentElement.style.overflow = 'hidden';

      // Stop Lenis if it exists - but only the main instance, not dialog instances
      if (window.lenis) {
        window.lenis.stop();
      }

      return () => {
        // Restore all styles
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.documentElement.style.overflow = '';

        // Restore scroll position
        window.scrollTo(0, scrollY);

        // Start Lenis again if it exists
        if (window.lenis) {
          window.lenis.start();
        }
      };
    }
  }, [lock]);
}
