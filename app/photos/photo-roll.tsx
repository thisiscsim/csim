'use client';

import React from 'react';
import { animate, motion, useMotionValue, useMotionValueEvent, useScroll } from 'motion/react';
import { useMobileDetect } from '@/components/use-mobile-detect';
import { useEvent } from '@/components/use-event';
import { clamp } from '@/components/clamp';
import Script from 'next/script';
import type { PhotoImage } from '@/lib/photos';

const FRAME_HEIGHT = 600; // Fixed height for all images
const FRAME_GAP = 24; // Gap between images

interface ImageDimensions {
  width: number;
  height: number;
}

interface PhotoRollProps {
  initialImages: PhotoImage[];
}

export default function PhotoRoll({ initialImages }: PhotoRollProps) {
  const detect = useMobileDetect();
  const isMobile = detect.isMobile();

  const [images, setImages] = React.useState<PhotoImage[]>([]);
  const [imageDimensions, setImageDimensions] = React.useState<ImageDimensions[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const { scrollX, scrollY } = useScroll();
  const scrollAxis = React.useRef<'x' | 'y' | null>(null);
  const translateX = useMotionValue(0);
  const capturedScroll = React.useRef(0);
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const isScrolling = React.useRef(false);
  const scrollTimer = React.useRef<NodeJS.Timeout | null>(null);

  // Shuffle array using Fisher-Yates algorithm
  const shuffleArray = (array: PhotoImage[]): PhotoImage[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Use pre-fetched images
  React.useEffect(() => {
    if (initialImages && initialImages.length > 0) {
      // Randomize the order of images
      const randomizedImages = shuffleArray(initialImages);
      setImages(randomizedImages);

      // Start with default square dimensions for all images
      // This allows the page to render immediately
      const defaultDimensions = randomizedImages.map(() => ({
        width: FRAME_HEIGHT,
        height: FRAME_HEIGHT,
      }));
      setImageDimensions(defaultDimensions);
      setLoading(false);

      // Then asynchronously load actual dimensions for first 10 images
      // This improves initial render performance
      const loadDimensions = async () => {
        const dimensions = await Promise.all(
          randomizedImages.map((image: PhotoImage, index: number) => {
            // Only load dimensions for first 10 images immediately
            if (index >= 10) {
              return Promise.resolve({ width: FRAME_HEIGHT, height: FRAME_HEIGHT });
            }

            return new Promise<ImageDimensions>((resolve) => {
              const img = new Image();
              const timeout = setTimeout(() => {
                resolve({ width: FRAME_HEIGHT, height: FRAME_HEIGHT });
              }, 2000); // 2 second timeout

              img.onload = () => {
                clearTimeout(timeout);
                const aspectRatio = img.naturalWidth / img.naturalHeight;
                const width = Math.floor(FRAME_HEIGHT * aspectRatio);
                resolve({ width, height: FRAME_HEIGHT });
              };
              img.onerror = () => {
                clearTimeout(timeout);
                resolve({ width: FRAME_HEIGHT, height: FRAME_HEIGHT });
              };
              img.src = image.url;
            });
          })
        );
        setImageDimensions(dimensions);
      };

      loadDimensions();
    } else {
      setLoading(false);
    }
  }, [initialImages]);

  // Initialize scroll
  React.useEffect(() => {
    if (images.length === 0) return;

    // Reset everything on mount
    setActiveIndex(null);
    translateX.set(0);
    capturedScroll.current = 0;
    scrollAxis.current = null;
    isScrolling.current = false;

    document.documentElement.scrollTo(0, 0);
    document.body.style.overflowX = '';
    document.body.style.overflowY = '';

    // Set first image as active after a brief delay
    const timer = setTimeout(() => {
      setActiveIndex(0);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }
      document.body.style.overflowX = '';
      document.body.style.overflowY = '';
      document.body.style.height = '';
      document.body.style.width = '';
    };
  }, [images, translateX]);

  // Arrow key navigation
  React.useEffect(() => {
    if (images.length === 0) return;

    function onKeyDown(e: KeyboardEvent) {
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
    };
  }, [images.length]);

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

  // Calculate scroll positions to center each image
  // Container has marginLeft: '50vw', so left edge starts at viewport center
  // To center an image, we need: translateX = -(leftEdgePosition + width/2)
  // Since scroll position maps to: translateX.set(-position)
  // The position should be: leftEdgePosition + width/2
  const imagePositions = React.useMemo(() => {
    const positions: number[] = [];
    let leftEdgePosition = 0;

    for (let i = 0; i < imageDimensions.length; i++) {
      const imageWidth = imageDimensions[i]?.width || 0;
      // Center position = left edge + half width
      positions.push(leftEdgePosition + imageWidth / 2);
      // Move to next image position
      leftEdgePosition += imageWidth + FRAME_GAP;
    }
    return positions;
  }, [imageDimensions]);

  // Find the image nearest to the center of the viewport
  const findNearestImageIndex = React.useCallback(
    (currentPosition: number) => {
      if (imagePositions.length === 0) return 0;

      let nearestIndex = 0;
      let minDistance = Infinity;

      for (let i = 0; i < imagePositions.length; i++) {
        const distance = Math.abs(imagePositions[i] - currentPosition);
        if (distance < minDistance) {
          minDistance = distance;
          nearestIndex = i;
        }
      }

      return nearestIndex;
    },
    [imagePositions]
  );

  const scroll = React.useCallback(
    (position: number) => {
      if (images.length === 0 || imageDimensions.length === 0 || imagePositions.length === 0)
        return;

      // Clamp position to first and last image
      const minPosition = imagePositions[0];
      const maxPosition = imagePositions[imagePositions.length - 1];
      const clampedPosition = clamp(position, [minPosition, maxPosition]);

      if (Math.abs(capturedScroll.current - clampedPosition) < 0.5) return;

      // Clear any existing timer
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
        scrollTimer.current = null;
      }

      // Use direct set for immediate response
      translateX.set(-clampedPosition);

      // Clear activeIndex when manually scrolling
      if (activeIndex !== null) {
        const currentPos = -translateX.get();
        const currentIndex = findNearestImageIndex(currentPos);
        if (currentIndex !== activeIndex) {
          setActiveIndex(null);
          isScrolling.current = true;
        }
      } else {
        isScrolling.current = true;
      }

      capturedScroll.current = clampedPosition;

      // Set a timer to detect when scrolling has stopped
      if (isScrolling.current) {
        scrollTimer.current = setTimeout(() => {
          if (isScrolling.current) {
            const currentPos = -translateX.get();
            const nearestIndex = findNearestImageIndex(currentPos);
            if (activeIndex !== nearestIndex) {
              setActiveIndex(nearestIndex);
            }
            isScrolling.current = false;
          }
        }, 150);
      }
    },
    [images.length, imageDimensions, translateX, activeIndex, imagePositions, findNearestImageIndex]
  );

  useEvent('scrollend', () => {
    if (isScrolling.current && images.length > 0) {
      const currentPos = -translateX.get();
      const nearestIndex = findNearestImageIndex(currentPos);
      if (activeIndex !== nearestIndex) {
        setActiveIndex(nearestIndex);
      }
      isScrolling.current = false;
    }
  });

  useEvent('beforeunload', () => {
    localStorage.setItem('scrollY', String(window.scrollY));
  });

  // Snap to active image
  React.useEffect(() => {
    if (activeIndex !== null && imagePositions.length > 0) {
      const targetPosition = imagePositions[activeIndex];

      capturedScroll.current = targetPosition;
      isScrolling.current = false;

      if (scrollAxis.current === 'x') {
        document.documentElement.scrollLeft = targetPosition;
      } else if (scrollAxis.current === 'y' || !scrollAxis.current) {
        document.documentElement.scrollTop = targetPosition;
      }

      animate(translateX, -targetPosition, {
        type: 'spring',
        stiffness: 200,
        damping: 35,
        mass: 0.8,
      });
    }
  }, [activeIndex, imagePositions, translateX]);

  React.useEffect(() => {
    if (images.length === 0 || imageDimensions.length === 0 || !carouselRef.current) return;

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
  }, [isMobile, images.length, imageDimensions]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-primary">
        <p className="text-black/60">Loading photos...</p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-primary">
        <p className="text-black/60">No photos found</p>
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
            marginLeft: '50vw',
            willChange: 'transform',
          }}
        >
          <motion.div style={{ x: translateX }} className="flex items-center">
            {images.map((image, i) => {
              const dimensions = imageDimensions[i];
              if (!dimensions) return null;

              return (
                <div
                  key={`${image.name}-${i}`}
                  className="flex-shrink-0 relative bg-gray-100"
                  style={{
                    width: dimensions.width,
                    height: dimensions.height,
                    marginRight: i < images.length - 1 ? FRAME_GAP : 0,
                    transform: 'translateZ(0)', // Force GPU acceleration
                    backfaceVisibility: 'hidden',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={image.name}
                    src={image.url}
                    className="h-full w-full object-cover select-none pointer-events-none"
                    loading="eager"
                    fetchPriority={i < 3 ? 'high' : 'auto'}
                    decoding="async"
                    draggable={false}
                    style={{
                      display: 'block',
                      transform: 'translateZ(0)',
                    }}
                  />
                </div>
              );
            })}
          </motion.div>
        </div>
        <div
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-10 text-black/60 pointer-events-none text-xs"
          style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
        >
          <p>SCROLL OR USE ARROW KEYS</p>
        </div>
      </div>
    </>
  );
}
