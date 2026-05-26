'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion } from 'motion/react';
import useEmblaCarousel from 'embla-carousel-react';
import type { PhotoImage } from '@/lib/photos';

const FRAME_HEIGHT = 600; // Fixed height for all images
const FRAME_GAP = 24; // Gap between images
const EAGER_IMAGE_COUNT = 1;
const INTRO_READY_FALLBACK_MS = 1800;

// Animation constants (same as homepage)
const INTRO_SPRING = {
  type: 'spring' as const,
  stiffness: 320,
  damping: 60,
  mass: 0.2,
  restSpeed: 0.0001,
  restDelta: 0.0001,
};
const INTRO_CONTENT_DELAY = 0.15;
const INTRO_ADJACENT_DELAY = 0.7;

interface PhotoRollProps {
  initialImages: PhotoImage[];
}

export default function PhotoRoll({ initialImages }: PhotoRollProps) {
  const images = initialImages;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const isDragging = useRef(false);
  const hasMarkedReady = useRef(false);
  const readyFrame = useRef<number | null>(null);

  // Mark intro as complete after animation finishes
  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => setIntroComplete(true), 1000);
    return () => clearTimeout(t);
  }, [ready]);

  // Embla Carousel - controls the visual carousel
  // Duration 45 matches Attio's 0.45s animation timing
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    containScroll: false,
    loop: false,
    skipSnaps: false,
    watchDrag: true,
    duration: 45,
  });
  const emblaApiRef = useRef<typeof emblaApi>(emblaApi);

  useEffect(() => {
    emblaApiRef.current = emblaApi;
  }, [emblaApi]);

  const markReady = useCallback(() => {
    if (hasMarkedReady.current) return;
    hasMarkedReady.current = true;

    emblaApiRef.current?.reInit();
    emblaApiRef.current?.scrollTo(0, true);

    readyFrame.current = window.requestAnimationFrame(() => {
      readyFrame.current = window.requestAnimationFrame(() => {
        setReady(true);
        readyFrame.current = null;
      });
    });
  }, []);

  const handleFirstImageLoad = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      const img = event.currentTarget;

      if (typeof img.decode === 'function') {
        img.decode().then(markReady).catch(markReady);
        return;
      }

      markReady();
    },
    [markReady]
  );

  useEffect(() => {
    hasMarkedReady.current = false;
    setReady(false);
    setIntroComplete(false);
    setCurrentIndex(0);

    if (images.length === 0) return;

    const fallback = window.setTimeout(markReady, INTRO_READY_FALLBACK_MS);

    return () => {
      window.clearTimeout(fallback);
      if (readyFrame.current !== null) {
        window.cancelAnimationFrame(readyFrame.current);
        readyFrame.current = null;
      }
    };
  }, [images, markReady]);

  // Update current index when Embla selection changes
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Sync Embla drag to window scroll position
  useEffect(() => {
    if (!emblaApi || images.length === 0) return;

    const onPointerDown = () => {
      isDragging.current = true;
    };

    const onPointerUp = () => {
      isDragging.current = false;
    };

    const onScroll = () => {
      if (!isDragging.current) return;
      // When dragging, sync Embla's position back to window scroll
      const progress = emblaApi.scrollProgress();
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const targetScroll = progress * maxScroll;
      window.scrollTo({ top: targetScroll, behavior: 'auto' });
    };

    emblaApi.on('pointerDown', onPointerDown);
    emblaApi.on('pointerUp', onPointerUp);
    emblaApi.on('scroll', onScroll);

    return () => {
      emblaApi.off('pointerDown', onPointerDown);
      emblaApi.off('pointerUp', onPointerUp);
      emblaApi.off('scroll', onScroll);
    };
  }, [emblaApi, images.length]);

  // Map window scroll to Embla position (the Attio approach)
  useEffect(() => {
    if (!emblaApi || images.length === 0) return;

    const handleWindowScroll = () => {
      if (isDragging.current) return;

      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;

      // Calculate target index from scroll progress
      const targetIndex = Math.round(scrollProgress * (images.length - 1));

      // Only scroll if index changed
      if (targetIndex !== emblaApi.selectedScrollSnap()) {
        emblaApi.scrollTo(targetIndex);
      }
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, [emblaApi, images.length]);

  // Convert horizontal wheel to vertical scroll (like Attio does)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // If horizontal scroll is dominant, convert to vertical
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        window.scrollBy({ top: e.deltaX, behavior: 'auto' });
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  // Arrow key navigation - scroll the window which triggers the scroll handler
  useEffect(() => {
    if (images.length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPerSlide = maxScroll / (images.length - 1);
        window.scrollBy({ top: -scrollPerSlide, behavior: 'smooth' });
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPerSlide = maxScroll / (images.length - 1);
        window.scrollBy({ top: scrollPerSlide, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length]);

  // Set up scrollable container, prevent gestures, and hide scrollbar
  useEffect(() => {
    if (images.length === 0) return;

    // Prevent overscroll bounce
    document.body.style.overscrollBehavior = 'none';
    document.documentElement.scrollTo(0, 0);

    // Hide scrollbar completely (cross-browser) - target everything
    const styleId = 'photo-roll-scrollbar-hide';
    let style = document.getElementById(styleId) as HTMLStyleElement | null;
    if (!style) {
      style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        *, *::before, *::after {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        *::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
          background: transparent !important;
        }
        html {
          overflow: scroll !important;
          overflow-x: hidden !important;
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      document.body.style.overscrollBehavior = '';
      const styleEl = document.getElementById(styleId);
      if (styleEl) {
        styleEl.remove();
      }
    };
  }, [images.length]);

  if (images.length === 0) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-base transition-colors duration-300">
        <p className="fg-muted transition-colors duration-300">No photos found</p>
      </div>
    );
  }

  return (
    <>
      {/* Tall scrollable container for native scroll physics */}
      <div style={{ height: '2000svh', pointerEvents: 'none' }} />

      {/* Fixed carousel container */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none bg-base transition-colors duration-300">
        {/* Embla Carousel */}
        <div className="overflow-hidden w-full pointer-events-auto" ref={emblaRef}>
          <div className="flex items-center" style={{ gap: FRAME_GAP }}>
            {images.map((image, i) => {
              const isFirst = i === 0;
              const isPriorityImage = i < EAGER_IMAGE_COUNT;
              return (
                <motion.div
                  key={`${image.name}-${i}`}
                  className="shrink-0 flex items-center justify-center overflow-hidden"
                  style={{ width: 'auto' }}
                  initial={{ scale: isFirst ? 0 : 1, opacity: isFirst ? 1 : 0 }}
                  animate={{
                    scale: ready ? 1 : isFirst ? 0 : 1,
                    opacity: ready ? 1 : isFirst ? 1 : 0,
                  }}
                  transition={
                    isFirst
                      ? INTRO_SPRING
                      : {
                          duration: 0.9,
                          ease: [0.25, 0.1, 0.25, 1],
                          delay: ready ? INTRO_ADJACENT_DELAY + (i - 1) * 0.08 : 0,
                        }
                  }
                >
                  {/* Content fades in during scale animation */}
                  <motion.div
                    initial={{ opacity: isFirst ? 0 : 1 }}
                    animate={{ opacity: ready ? 1 : isFirst ? 0 : 1 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.25, 0.1, 0.25, 1],
                      delay: isFirst && ready ? INTRO_CONTENT_DELAY : 0,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={image.name}
                      src={image.url}
                      className="object-cover select-none"
                      loading={isPriorityImage ? 'eager' : 'lazy'}
                      fetchPriority={isPriorityImage ? 'high' : 'auto'}
                      decoding="async"
                      draggable={false}
                      data-photo-roll-priority={isPriorityImage ? 'true' : undefined}
                      onLoad={isFirst ? handleFirstImageLoad : undefined}
                      style={{
                        height: FRAME_HEIGHT,
                        width: 'auto',
                      }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Counter - bottom left */}
        <motion.div
          className="fixed bottom-4 left-8 z-10 fg-muted pointer-events-none text-xs transition-colors duration-300"
          style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: ready && introComplete ? 1 : 0 }}
          transition={{ duration: 0.3, delay: ready ? 0.2 : 0 }}
        >
          [{String(currentIndex + 1).padStart(3, '0')}/{String(images.length).padStart(3, '0')}]
        </motion.div>

        {/* Navigation hint - bottom center */}
        <motion.div
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-10 fg-muted pointer-events-none text-xs transition-colors duration-300"
          style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: ready && introComplete ? 1 : 0 }}
          transition={{ duration: 0.3, delay: ready ? 0.2 : 0 }}
        >
          SCROLL OR USE ARROW KEYS
        </motion.div>
      </div>
    </>
  );
}
