'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { PhotoImage } from '@/lib/photos';

const FRAME_HEIGHT = 600; // Fixed height for all images
const FRAME_GAP = 24; // Gap between images

interface PhotoRollProps {
  initialImages: PhotoImage[];
}

export default function PhotoRoll({ initialImages }: PhotoRollProps) {
  const [images, setImages] = useState<PhotoImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isDragging = useRef(false);

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

  // Shuffle array using Fisher-Yates algorithm
  const shuffleArray = useCallback((array: PhotoImage[]): PhotoImage[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  // Load images
  useEffect(() => {
    if (initialImages && initialImages.length > 0) {
      const randomizedImages = shuffleArray(initialImages);
      setImages(randomizedImages);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [initialImages, shuffleArray]);

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
      {/* Tall scrollable container for native scroll physics */}
      <div style={{ height: '2000svh', pointerEvents: 'none' }} />

      {/* Fixed carousel container */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none bg-base transition-colors duration-300">
        {/* Embla Carousel */}
        <div className="overflow-hidden w-full pointer-events-auto" ref={emblaRef}>
          <div className="flex items-center" style={{ gap: FRAME_GAP }}>
            {images.map((image, i) => (
              <div
                key={`${image.name}-${i}`}
                className="shrink-0 flex items-center justify-center"
                style={{ width: 'auto' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={image.name}
                  src={image.url}
                  className="object-cover select-none"
                  loading="eager"
                  fetchPriority={i < 3 ? 'high' : 'auto'}
                  decoding="async"
                  draggable={false}
                  style={{
                    height: FRAME_HEIGHT,
                    width: 'auto',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Counter - bottom left */}
        <div
          className="fixed bottom-4 left-8 z-10 fg-muted pointer-events-none text-xs transition-colors duration-300"
          style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
        >
          [{String(currentIndex + 1).padStart(3, '0')}/{String(images.length).padStart(3, '0')}]
        </div>

        {/* Navigation hint - bottom center */}
        <div
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-10 fg-muted pointer-events-none text-xs transition-colors duration-300"
          style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
        >
          SCROLL OR USE ARROW KEYS
        </div>
      </div>
    </>
  );
}
