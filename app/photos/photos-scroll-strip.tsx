'use client';

import React from 'react';
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
import { useMobileDetect } from '@/components/use-mobile-detect';
import { useEvent } from '@/components/use-event';
import { clamp } from '@/components/clamp';
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

interface PhotoImage {
  url: string;
  name: string;
  size: number;
  lastModified: string;
}

export default function PhotosScrollStrip() {
  const detect = useMobileDetect();
  const isMobile = detect.isMobile();

  const [images, setImages] = React.useState<PhotoImage[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [activeIndex, setActiveIndex] = React.useState<null | number>(null);
  const { scrollX, scrollY } = useScroll();
  const scrollAxis = React.useRef<'x' | 'y' | null>(null);
  const translateX = useMotionValue(0);
  const capturedY = React.useRef(0);
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const isScrolling = React.useRef(false);
  const scrollTimer = React.useRef<NodeJS.Timeout | null>(null);

  // Fetch images from API
  React.useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/photos');
        const data = await response.json();
        if (data.images && data.images.length > 0) {
          setImages(data.images);
        } else {
          console.error('No images found');
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  // Initialize with first image expanded after images load
  React.useEffect(() => {
    if (images.length === 0) return;

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
  }, [images]);

  React.useEffect(() => {
    if (images.length === 0) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setActiveIndex(null);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setActiveIndex((i) => {
          if (i === null) return 0;
          const next = i + 1;
          return clamp(next, [0, images.length - 1]);
        });
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setActiveIndex((i) => {
          if (i === null) return images.length - 1;
          const next = i - 1;
          return clamp(next, [0, images.length - 1]);
        });
      }
    }

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }
    };
  }, [images]);

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
      if (images.length === 0) return;

      const maxScroll = (images.length - 1) * FRAME_STEP;
      const clampedPosition = clamp(position, [0, maxScroll]);

      if (Math.abs(capturedY.current - clampedPosition) < 1) return;

      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
        scrollTimer.current = null;
      }

      // Use set instead of jump for smoother updates
      translateX.set(-clampedPosition);

      if (activeIndex !== null) {
        const currentIndex = Math.round(
          clamp(-translateX.get() / FRAME_STEP, [0, images.length - 1])
        );
        if (currentIndex !== activeIndex) {
          setActiveIndex(null);
          isScrolling.current = true;
        }
      } else {
        isScrolling.current = true;
      }

      capturedY.current = clampedPosition;

      if (isScrolling.current) {
        scrollTimer.current = setTimeout(() => {
          if (isScrolling.current) {
            const index = Math.round(clamp(-translateX.get() / FRAME_STEP, [0, images.length - 1]));
            if (activeIndex !== index) {
              setActiveIndex(index);
            }
            isScrolling.current = false;
          }
        }, 150);
      }
    },
    [activeIndex, translateX, images.length]
  );

  useEvent('scrollend', () => {
    if (isScrolling.current && images.length > 0) {
      const index = Math.round(clamp(-translateX.get() / FRAME_STEP, [0, images.length - 1]));
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
    if (images.length === 0) return;

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
  }, [isMobile, images.length]);

  React.useEffect(() => {
    if (activeIndex !== null && images.length > 0) {
      const newX = activeIndex * FRAME_STEP;

      capturedY.current = newX;
      isScrolling.current = false;

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
  }, [activeIndex, translateX, images.length]);

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

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-base transition-colors duration-300">
        <p className="fg-muted transition-colors duration-300">Loading photos...</p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-base transition-colors duration-300">
        <p className="fg-muted transition-colors duration-300">No photos found</p>
      </div>
    );
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
            willChange: 'transform',
          }}
        >
          <motion.div
            style={{ x: translateX }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
              mass: 0.5,
            }}
          >
            {images.map((image, i) => {
              const active = activeIndex === i;
              return (
                <Frame
                  key={`${image.name}-${i}`}
                  active={active}
                  onClick={() => setActiveIndex(i === activeIndex ? null : i)}
                  animate={{ x: x(i) }}
                  style={{ left: `${i * FRAME_STEP + FRAME_GAP / 2}px` }}
                >
                  <img
                    alt={image.name}
                    src={image.url}
                    className="pointer-events-none h-full w-full object-cover object-center select-none"
                    loading="eager"
                    decoding="async"
                    style={{
                      width: FRAME_WIDTH_EXPANDED,
                      height: FRAME_HEIGHT_EXPANDED,
                      display: 'block',
                    }}
                    draggable={false}
                  />
                </Frame>
              );
            })}
          </motion.div>
        </div>
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-10 fg-muted pointer-events-none transition-colors duration-300">
          <p className="text-xs font-medium">
            {activeIndex !== null
              ? `${activeIndex + 1} / ${images.length}`
              : `${images.length} photos`}
          </p>
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
        willChange: 'transform, height, clip-path',
        ...style,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
