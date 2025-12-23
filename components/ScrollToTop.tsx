'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top on route change
    // Use setTimeout to ensure it runs after the page transition
    const timer = setTimeout(() => {
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
