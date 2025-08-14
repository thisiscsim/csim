'use client';

import React from 'react';
import Image from 'next/image';
import {
  animate,
  motion,
  TargetAndTransition,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { useMobileDetect } from './use-mobile-detect';
import { useEvent } from './use-event';
import { clamp } from './clamp';

// Load the polyfill
import Script from 'next/script';

const SCALE = 1;
export const FRAME_WIDTH = 72 * SCALE;
export const FRAME_WIDTH_EXPANDED = 480 * SCALE;
export const FRAME_HEIGHT = FRAME_WIDTH * 4 * SCALE;
export const FRAME_HEIGHT_EXPANDED = 720 * SCALE;
export const FRAME_WIDTH_DIFF = FRAME_WIDTH_EXPANDED - FRAME_WIDTH;
export const FRAME_HEIGHT_DIFF = FRAME_HEIGHT_EXPANDED - FRAME_HEIGHT;
export const FRAME_GAP = 16;
export const FRAME_DIFF_CENTER = FRAME_WIDTH_DIFF / 2;
export const FRAME_STEP = FRAME_GAP + FRAME_WIDTH;

// Create frames array with public paths
let FRAMES = [
  '/craft/1.jpg',
  '/craft/2.jpg',
  '/craft/3.jpg',
  '/craft/4.jpg',
  '/craft/5.jpg',
  '/craft/6.jpg',
  '/craft/7.jpg',
  '/craft/8.jpg',
  '/craft/9.jpg',
];
FRAMES = [...FRAMES, ...FRAMES, ...FRAMES, ...FRAMES];

export default function ScrollStrip() {
  const detect = useMobileDetect();
  const isMobile = detect.isMobile();

  const [activeIndex, setActiveIndex] = React.useState<null | number>(null); // Start with no image expanded
  const { scrollX, scrollY } = useScroll();
  const scrollAxis = React.useRef<'x' | 'y' | null>(null);
  const translateX = useMotionValue(0);
  const capturedY = React.useRef(0);
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const isScrolling = React.useRef(false);
  const scrollTimer = React.useRef<NodeJS.Timeout | null>(null);

  // Initialize with first image expanded after mount
  React.useEffect(() => {
    // Reset everything when component mounts
    setActiveIndex(null);
    translateX.set(0);
    capturedY.current = 0;
    isScrolling.current = false;
    scrollAxis.current = null;

    // Reset scroll position
    document.documentElement.scrollTo(0, 0);
    document.body.style.overflowX = '';
    document.body.style.overflowY = '';

    // Small delay to ensure smooth initial animation
    const timer = setTimeout(() => {
      setActiveIndex(0);
    }, 100);

    return () => {
      clearTimeout(timer);
      // Clean up on unmount
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }
      // Reset body styles
      document.body.style.overflowX = '';
      document.body.style.overflowY = '';
      document.body.style.height = '';
      document.body.style.width = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs on every mount

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setActiveIndex(null);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setActiveIndex((i) => {
          if (i === null) return 0; // Start from first if nothing selected
          const next = i + 1;
          return clamp(next, [0, FRAMES.length - 1]);
        });
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setActiveIndex((i) => {
          if (i === null) return FRAMES.length - 1; // Start from last if nothing selected
          const next = i - 1;
          return clamp(next, [0, FRAMES.length - 1]);
        });
      }
    }

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      // Clean up timer on unmount
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }
    };
  }, []);

  useMotionValueEvent(scrollX, 'change', (x) => {
    if (!scrollAxis.current) {
      document.body.style.overflowY = 'hidden';
      scrollAxis.current = 'x';
    }
    if (scrollAxis.current === 'x') {
      scroll(x);
    }
  });

  useMotionValueEvent(scrollY, 'change', (y) => {
    if (!scrollAxis.current) {
      document.body.style.overflowX = 'hidden';
      scrollAxis.current = 'y';
    }
    if (scrollAxis.current === 'y') {
      scroll(y);
    }
  });

  const scroll = React.useCallback(
    (position: number) => {
      // Clamp position to prevent overscroll issues
      const maxScroll = (FRAMES.length - 1) * FRAME_STEP;
      const clampedPosition = clamp(position, [0, maxScroll]);

      if (capturedY.current === clampedPosition) return;

      // Clear any existing timer
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
        scrollTimer.current = null;
      }

      if (translateX.isAnimating()) {
        translateX.stop();
      } else {
        translateX.jump(-clampedPosition);
        // Only clear activeIndex if we're actually scrolling to a different position
        if (activeIndex !== null) {
          const currentIndex = Math.round(
            clamp(-translateX.get() / FRAME_STEP, [0, FRAMES.length - 1])
          );
          if (currentIndex !== activeIndex) {
            setActiveIndex(null);
            isScrolling.current = true;
          }
        } else {
          isScrolling.current = true;
        }
      }

      // Update capturedY to the current position
      capturedY.current = clampedPosition;

      // Set a timer to detect when scrolling has stopped
      if (isScrolling.current) {
        scrollTimer.current = setTimeout(() => {
          if (isScrolling.current) {
            const index = Math.round(clamp(-translateX.get() / FRAME_STEP, [0, FRAMES.length - 1]));
            // Only set if different from current to prevent double-firing
            if (activeIndex !== index) {
              setActiveIndex(index);
            }
            isScrolling.current = false;
          }
        }, 200); // Slightly longer delay for better debouncing
      }
    },
    [activeIndex, translateX]
  );

  useEvent('scrollend', () => {
    // Fallback for browsers that support scrollend
    if (isScrolling.current) {
      const index = Math.round(clamp(-translateX.get() / FRAME_STEP, [0, FRAMES.length - 1]));
      // Only set if different from current to prevent double-firing
      if (activeIndex !== index) {
        setActiveIndex(index);
      }
      isScrolling.current = false;
    }
  });

  useEvent('beforeunload', () => {
    localStorage.setItem('scrollY', String(window.scrollY));
  });

  React.useEffect(() => {
    window.history.scrollRestoration = 'manual';
    document.documentElement.scrollTo(0, 0);

    function calc() {
      if (!carouselRef.current) return;
      let scrollableWidth = carouselRef.current.scrollWidth;
      let containerWidth = document.documentElement.clientWidth;

      const carousel = carouselRef.current;
      containerWidth -= carousel.offsetLeft;
      scrollableWidth += carousel.offsetLeft;

      const scrollHeight = scrollableWidth - containerWidth;
      document.body.style.height = `calc(100vh + ${scrollHeight}px)`;
      document.body.style.width = `calc(100vw + ${scrollHeight}px)`;
    }

    calc();

    if (!isMobile) {
      window.addEventListener('resize', calc);
      return () => window.removeEventListener('resize', calc);
    }
  }, [isMobile]);

  React.useEffect(() => {
    if (activeIndex !== null) {
      const newX = activeIndex * FRAME_STEP;

      capturedY.current = newX;
      isScrolling.current = false; // Ensure we're not in scrolling state when programmatically moving

      if (scrollAxis.current === 'x') {
        document.documentElement.scrollLeft = newX;
      } else if (scrollAxis.current === 'y' || !scrollAxis.current) {
        document.documentElement.scrollTop = newX;
      }

      animate(translateX, -newX, {
        stiffness: 500,
        damping: 30,
      });
    }
  }, [activeIndex, translateX]);

  function x(i: number) {
    if (activeIndex === i) {
      return 0;
    }
    if (activeIndex === 0 && i !== 0) {
      return FRAME_DIFF_CENTER;
    }
    if (activeIndex) {
      return i > activeIndex ? FRAME_DIFF_CENTER : -FRAME_DIFF_CENTER;
    }
    return 0;
  }

  return (
    <>
      <Script src="/scrollend-polyfill.js" strategy="beforeInteractive" />
      <div className="relative flex h-[100vh] w-full items-center justify-end">
        <div
          ref={carouselRef}
          className="fixed left-0 top-1/2 flex -translate-y-1/2"
          style={{
            height: FRAME_HEIGHT,
            marginLeft: `calc(50vw - ${FRAME_DIFF_CENTER + FRAME_STEP / 2}px)`,
          }}
        >
          <motion.div style={{ x: translateX }}>
            {FRAMES.map((src, i) => {
              const active = activeIndex === i;
              return (
                <Frame
                  key={i}
                  active={active}
                  onClick={() => setActiveIndex(i === activeIndex ? null : i)}
                  animate={{ x: x(i) }}
                  style={{ left: `${i * FRAME_STEP + FRAME_GAP / 2}px` }}
                >
                  <Image
                    alt={`Craft item ${(i % 9) + 1}`}
                    src={src}
                    width={FRAME_WIDTH_EXPANDED}
                    height={FRAME_HEIGHT_EXPANDED}
                    sizes="50vw"
                    className="pointer-events-none h-full w-full object-cover object-center select-none"
                  />
                </Frame>
              );
            })}
          </motion.div>
        </div>
      </div>
    </>
  );
}

interface FrameProps {
  children: React.ReactNode;
  active: boolean;
  animate?: TargetAndTransition;
  style?: React.CSSProperties;
  onClick?: () => void;
}

function Frame({ children, active, animate, style, ...props }: FrameProps) {
  // Initialize based on active state to prevent visual glitch
  const clip = useSpring(active ? 0 : FRAME_DIFF_CENTER, {
    stiffness: 500,
    damping: 50,
  });

  React.useEffect(() => {
    clip.set(active ? 0 : FRAME_DIFF_CENTER);
  }, [active, clip]);

  return (
    <motion.div
      initial={false}
      className="ease-swift absolute h-full cursor-pointer grayscale-100 transition-[filter] duration-300 hover:grayscale-0 [&[data-active=true]]:grayscale-0"
      data-active={active}
      animate={{
        height: active ? FRAME_HEIGHT_EXPANDED : FRAME_HEIGHT,
        y: active ? -FRAME_HEIGHT_DIFF / 2 : 0,
        ...animate,
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 50,
      }}
      style={{
        width: FRAME_WIDTH_EXPANDED,
        clipPath: useTransform(clip, (c) => `inset(0 ${c}px 0 ${c}px)`),
        ...style,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
