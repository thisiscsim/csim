'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS, Project } from './data';

const MAX_FRAME_HEIGHT = 680; // Maximum height for images
const MIN_FRAME_HEIGHT = 200; // Minimum height for images (mobile)
const MIN_FRAME_HEIGHT_DESKTOP = 400; // Minimum height for desktop
const FRAME_GAP = 24; // Gap between images

// Media map passed from server
interface MediaItem {
  url: string;
  isVideo: boolean;
}

// Mini Navigation Component
const TICK_WIDTH = 1; // Visual width of each tick line
const TICK_GAP = 0; // No gap needed since buttons have padding
const NAV_HEIGHT = 18; // Total height of navigation
const INDICATOR_WIDTH = 28; // Width of the square indicator (when active)
const TOUCH_PADDING_X = 5; // Horizontal padding (5+5=10 matches original gap)
const TOUCH_PADDING_Y = 4; // Vertical padding for touch target

interface MiniNavProps {
  total: number;
  currentIndex: number;
  onNavigate: (index: number) => void;
}

function MiniNav({ total, currentIndex, onNavigate }: MiniNavProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ height: NAV_HEIGHT + TOUCH_PADDING_Y * 2 }}
    >
      {/* Ticks container - uses flexbox with gap */}
      <div className="flex items-center" style={{ gap: TICK_GAP }}>
        {Array.from({ length: total }).map((_, index) => {
          const isActive = index === currentIndex;
          const isHovered = index === hoveredIndex && !isActive;

          return (
            <button
              key={index}
              type="button"
              className="relative shrink-0 cursor-pointer flex items-center justify-center"
              style={{
                height: NAV_HEIGHT + TOUCH_PADDING_Y * 2,
                padding: `${TOUCH_PADDING_Y}px ${TOUCH_PADDING_X}px`,
                background: 'transparent',
                border: 'none',
              }}
              onClick={() => onNavigate(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              aria-label={`Go to slide ${index + 1}`}
            >
              {/* Visual tick element - animates width */}
              <motion.div
                className="relative"
                style={{ height: NAV_HEIGHT }}
                initial={false}
                animate={{
                  width: isActive ? INDICATOR_WIDTH : TICK_WIDTH,
                  opacity: isActive ? 1 : isHovered ? 0.7 : 0.4,
                }}
                transition={{
                  width: {
                    type: 'spring',
                    stiffness: 300,
                    damping: 25,
                    mass: 0.8,
                  },
                  opacity: {
                    duration: 0.15,
                  },
                }}
              >
                {/* Outline - always visible, creates both the square and the line look */}
                <div
                  className="absolute inset-0"
                  style={{
                    border: `${isActive ? 1.25 : 0.75}px solid var(--fg-subtle)`,
                  }}
                />
              </motion.div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Calculate width from aspect ratio and height
function getFrameWidth(height: number, aspectRatio?: '16:9' | '3:4'): number {
  if (aspectRatio === '3:4') {
    return height * (3 / 4);
  }
  // Default to 16:9
  return height * (16 / 9);
}

// Fallback placeholder
const PLACEHOLDER_IMAGE = '/temp-cover/placeholder_1.png';

interface HomePhotoRollProps {
  initialMedia: Record<string, MediaItem>;
}

// Animation configuration - matching rauno.me spring values exactly
const INTRO_SPRING = {
  type: 'spring' as const,
  stiffness: 320,
  damping: 60,
  mass: 0.2,
  restSpeed: 0.0001,
  restDelta: 0.0001,
};
const INTRO_CONTENT_DELAY = 0.15; // Start fading in content earlier (during scale)
const INTRO_ADJACENT_DELAY = 0.7; // Adjacent frames appear after first frame content is visible

export default function HomePhotoRoll({ initialMedia }: HomePhotoRollProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [frameHeight, setFrameHeight] = useState(MAX_FRAME_HEIGHT);
  const [captionMaxWidth, setCaptionMaxWidth] = useState(800);
  const [introComplete, setIntroComplete] = useState(false);
  const [firstMediaReady, setFirstMediaReady] = useState(false);
  const isDragging = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef(false);

  const projects = PROJECTS;

  // Mark intro as complete after spring animation settles (only after first media is ready)
  useEffect(() => {
    if (!firstMediaReady) return;
    const timer = setTimeout(() => {
      setIntroComplete(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, [firstMediaReady]);

  // Callback when first media loads
  const handleFirstMediaLoad = useCallback(() => {
    setFirstMediaReady(true);
  }, []);

  // Get media source for a project - uses server-provided media map
  const getMediaSrc = useCallback(
    (project: Project): { src: string; isVideo: boolean } => {
      const match = initialMedia[project.id];
      if (match) {
        return { src: match.url, isVideo: match.isVideo };
      }
      // Fall back to placeholder
      return { src: PLACEHOLDER_IMAGE, isVideo: false };
    },
    [initialMedia]
  );

  // Calculate frame height and caption width based on viewport
  useEffect(() => {
    const calculateViewportSizes = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Use different settings for mobile vs desktop
      const isMobile = viewportWidth < 768;
      const heightPercentage = isMobile ? 0.28 : 0.55;
      const minHeight = isMobile ? MIN_FRAME_HEIGHT : MIN_FRAME_HEIGHT_DESKTOP;
      const maxHeight = isMobile ? 240 : MAX_FRAME_HEIGHT;

      const targetHeight = viewportHeight * heightPercentage;
      const clampedHeight = Math.min(maxHeight, Math.max(minHeight, targetHeight));
      setFrameHeight(clampedHeight);

      // Caption max width: 800px for >= 1500px, 680px for < 1500px
      setCaptionMaxWidth(viewportWidth >= 1500 ? 800 : 680);
    };

    calculateViewportSizes();
    window.addEventListener('resize', calculateViewportSizes);
    return () => window.removeEventListener('resize', calculateViewportSizes);
  }, []);

  // Embla Carousel - controls the visual carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    containScroll: false,
    loop: false,
    skipSnaps: false,
    watchDrag: true,
    duration: 45,
  });

  // Disable Lenis on this page
  useEffect(() => {
    if (window.lenis) {
      window.lenis.destroy();
      window.lenis = undefined;
    }
  }, []);

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
    if (!emblaApi || projects.length === 0) return;

    const onPointerDown = () => {
      isDragging.current = true;
      if (!isScrollingRef.current) {
        isScrollingRef.current = true;
        setIsScrolling(true);
      }
    };

    const onPointerUp = () => {
      isDragging.current = false;
      // Delay hiding scroll state to allow settle
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        isScrollingRef.current = false;
        setIsScrolling(false);
      }, 150);
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
  }, [emblaApi, projects.length]);

  // Map window scroll to Embla position (the Attio approach)
  useEffect(() => {
    if (!emblaApi || projects.length === 0) return;

    const handleWindowScroll = () => {
      if (isDragging.current) return;

      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;

      // Calculate target index from scroll progress
      const targetIndex = Math.round(scrollProgress * (projects.length - 1));

      // Only scroll if index changed
      if (targetIndex !== emblaApi.selectedScrollSnap()) {
        emblaApi.scrollTo(targetIndex);
      }
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, [emblaApi, projects.length]);

  // Track scrolling state for caption visibility (debounced to avoid jitter)
  useEffect(() => {
    if (projects.length === 0) return;

    const handleScrollStart = () => {
      if (!isScrollingRef.current) {
        isScrollingRef.current = true;
        setIsScrolling(true);
      }
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        isScrollingRef.current = false;
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScrollStart, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScrollStart);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [projects.length]);

  // Convert horizontal wheel to vertical scroll
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

  // Arrow key navigation
  useEffect(() => {
    if (projects.length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPerSlide = maxScroll / (projects.length - 1);
        window.scrollBy({ top: -scrollPerSlide, behavior: 'smooth' });
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPerSlide = maxScroll / (projects.length - 1);
        window.scrollBy({ top: scrollPerSlide, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [projects.length]);

  // Set up scrollable container and hide scrollbar
  useEffect(() => {
    if (projects.length === 0) return;

    // Prevent overscroll bounce
    document.body.style.overscrollBehavior = 'none';
    document.documentElement.scrollTo(0, 0);

    // Hide scrollbar completely
    const styleId = 'home-photo-roll-scrollbar-hide';
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
  }, [projects.length]);

  const currentProject = projects[currentIndex];

  return (
    <>
      {/* Tall scrollable container for native scroll physics */}
      {/* Using fixed height like photos page, but slightly reduced for faster feel */}
      <div style={{ height: '1500svh', pointerEvents: 'none' }} />

      {/* Fixed carousel container */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none bg-base transition-colors duration-300">
        {/* Embla Carousel */}
        <div className="overflow-hidden w-full pointer-events-auto" ref={emblaRef}>
          <div className="flex items-center" style={{ gap: FRAME_GAP }}>
            {projects.map((project, i) => {
              const { src, isVideo } = getMediaSrc(project);
              const frameWidth = getFrameWidth(frameHeight, project.aspectRatio);
              const isFirstThree = i < 3;
              const isFirstItem = i === 0;

              // First item: wrapped in scaling container like rauno.me's mainContainer
              // Animation waits for first media to be ready before playing
              if (isFirstItem) {
                return (
                  // This is the mainContainer equivalent - scales from 0 to 1 when media is ready
                  <motion.div
                    key={project.id}
                    className="shrink-0 flex items-center justify-center"
                    style={{ width: frameWidth }}
                    initial={{ scale: 0 }}
                    animate={{ scale: firstMediaReady ? 1 : 0 }}
                    transition={INTRO_SPRING}
                  >
                    {/* Frame with dark background (white at 8% alpha) */}
                    <div
                      className="relative overflow-hidden"
                      style={{
                        height: frameHeight,
                        width: frameWidth,
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      {/* Content fades in gradually during the scale animation */}
                      <motion.div
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: firstMediaReady ? 1 : 0 }}
                        transition={{
                          duration: 0.8,
                          ease: [0.25, 0.1, 0.25, 1],
                          delay: firstMediaReady ? INTRO_CONTENT_DELAY : 0,
                        }}
                      >
                        {isVideo ? (
                          <video
                            src={src}
                            className="object-cover select-none"
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                            draggable={false}
                            onCanPlay={handleFirstMediaLoad}
                            style={{
                              height: frameHeight,
                              width: frameWidth,
                            }}
                          />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            alt={project.title}
                            src={src}
                            className="object-cover select-none"
                            loading="eager"
                            fetchPriority="high"
                            decoding="async"
                            draggable={false}
                            onLoad={handleFirstMediaLoad}
                            style={{
                              height: frameHeight,
                              width: frameWidth,
                            }}
                          />
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                );
              }

              // Adjacent frames - fade in after first frame content is visible
              const adjacentIndex = i - 1; // 0-based index for adjacent frames
              const adjacentDelay = INTRO_ADJACENT_DELAY + adjacentIndex * 0.08;

              return (
                <motion.div
                  key={project.id}
                  className="shrink-0 flex items-center justify-center"
                  style={{ width: frameWidth }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: firstMediaReady ? 1 : 0 }}
                  transition={{
                    duration: 0.9,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: firstMediaReady ? adjacentDelay : 0,
                  }}
                >
                  <div
                    className="relative overflow-hidden"
                    style={{
                      height: frameHeight,
                      width: frameWidth,
                    }}
                  >
                    {isVideo ? (
                      <video
                        src={src}
                        className="object-cover select-none"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload={isFirstThree ? 'auto' : 'metadata'}
                        draggable={false}
                        style={{
                          height: frameHeight,
                          width: frameWidth,
                        }}
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        alt={project.title}
                        src={src}
                        className="object-cover select-none"
                        loading={isFirstThree ? 'eager' : 'lazy'}
                        fetchPriority={isFirstThree ? 'high' : 'auto'}
                        decoding="async"
                        draggable={false}
                        style={{
                          height: frameHeight,
                          width: frameWidth,
                        }}
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Caption - fades out when scrolling, fades in when stopped (only after intro) */}
        <AnimatePresence mode="wait">
          {!isScrolling && currentProject && introComplete && (
            <motion.p
              key={`caption-${currentIndex}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="fixed left-1/2 -translate-x-1/2 z-10 text-center font-mono fg-subtle px-8 pointer-events-none"
              style={{
                top: `calc(50% + ${frameHeight / 2 + 24}px)`,
                fontSize: '11px',
                lineHeight: 1.6,
                width: 'calc(100vw - 64px)',
                maxWidth: captionMaxWidth,
              }}
            >
              <span className="fg-base font-medium">{currentProject.title}:</span>{' '}
              {currentProject.description}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Footer with Mini Navigation */}
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-base pointer-events-auto"
          style={{
            paddingLeft: '32px',
            paddingRight: '32px',
            paddingTop: '24px',
            paddingBottom: '24px',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: firstMediaReady ? 1 : 0, y: firstMediaReady ? 0 : 20 }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
            delay: firstMediaReady ? INTRO_CONTENT_DELAY + 0.3 : 0,
          }}
        >
          <MiniNav
            total={projects.length}
            currentIndex={currentIndex}
            onNavigate={(index) => {
              if (!emblaApi) return;
              const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
              const targetScroll = (index / (projects.length - 1)) * maxScroll;
              window.scrollTo({ top: targetScroll, behavior: 'smooth' });
            }}
          />
        </motion.div>
      </div>
    </>
  );
}
