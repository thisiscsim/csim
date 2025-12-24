'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { PROJECTS } from './data';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';

function getProjectImageFallback(projectId: string, projectName: string): string {
  const imageMap: { [key: string]: string } = {
    'exa-search': '/temp-cover/placeholder_1.png',
    'harvey-design-system': '/temp-cover/placeholder_1.png',
    'harvey-review-table': '/temp-cover/harvey-review-tables.png',
    'harvey-vault': '/temp-cover/placeholder_1.png',
    'harvey-artifacts': '/temp-cover/amend.png',
    'harvey-2': '/temp-cover/harvey-file-event-log.png',
    'harvey-upload-logging': '/temp-cover/harvey-file-event-log.png',
    'arc-1': '/temp-cover/arc-deposit.png',
    'arc-2': '/temp-cover/arc-billpay.png',
    'arc-3': '/temp-cover/arc-settings.png',
    'arc-design-system': '/temp-cover/placeholder_1.png',
    'arc-onboarding': '/temp-cover/placeholder_1.png',
    'flexport-1': '/temp-cover/flexport-teamview.png',
    'uber-1': '/temp-cover/uber-driver-onboarding.png',
  };
  if (projectName.includes('Moab')) return '/temp-cover/moab.png';
  if (projectName.includes('Amend')) return '/temp-cover/amend.png';
  return imageMap[projectId] || '/temp-cover/placeholder_1.png';
}

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 = forward, -1 = backward
  const isAnimating = useRef(false);

  const totalSlides = PROJECTS.length;

  const goToIndex = useCallback(
    (index: number) => {
      if (isAnimating.current) return;

      const clampedIndex = Math.max(0, Math.min(index, totalSlides - 1));
      if (clampedIndex === currentIndex) return;

      isAnimating.current = true;
      setDirection(clampedIndex > currentIndex ? 1 : -1);
      setCurrentIndex(clampedIndex);

      // Reset animation lock after transition
      setTimeout(() => {
        isAnimating.current = false;
      }, 600);
    },
    [currentIndex, totalSlides]
  );

  // Disable Lenis on this page
  useEffect(() => {
    if (window.lenis) {
      window.lenis.destroy();
      window.lenis = undefined;
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        goToIndex(currentIndex + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goToIndex(currentIndex - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, goToIndex]);

  // Wheel navigation
  useEffect(() => {
    let wheelTimeout: NodeJS.Timeout | null = null;
    let accumulatedDelta = 0;
    const threshold = 50;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isAnimating.current) return;

      accumulatedDelta += e.deltaY;

      if (wheelTimeout) {
        clearTimeout(wheelTimeout);
      }

      wheelTimeout = setTimeout(() => {
        if (Math.abs(accumulatedDelta) > threshold) {
          if (accumulatedDelta > 0) {
            goToIndex(currentIndex + 1);
          } else {
            goToIndex(currentIndex - 1);
          }
        }
        accumulatedDelta = 0;
      }, 50);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (wheelTimeout) clearTimeout(wheelTimeout);
    };
  }, [currentIndex, goToIndex]);

  const currentProject = PROJECTS[currentIndex];

  const isPlaceholderVideo =
    currentProject.media.includes('XSfIvT7BUWbPRXhrbLed') ||
    currentProject.media.includes('ee6871c9-8400-49d2-8be9-e32675eabf7e');
  const isVideo =
    !isPlaceholderVideo &&
    (currentProject.media.includes('.mp4') ||
      currentProject.media.includes('.webm') ||
      currentProject.media.includes('.mov'));
  const mediaSrc = isPlaceholderVideo
    ? getProjectImageFallback(currentProject.id, currentProject.title)
    : currentProject.media;

  // Slide animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      y: dir > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      y: dir > 0 ? -40 : 40,
      opacity: 0,
    }),
  };

  return (
    <div
      className="fixed inset-0 z-40 bg-base flex flex-col items-center justify-center transition-colors duration-300"
      style={{ paddingTop: 'clamp(50px, 5vh, 80px)' }}
    >
      <div className="w-full h-full flex items-center justify-center px-[3vw]">
        <div className="flex items-center gap-10 lg:gap-20">
          <p
            className="hidden lg:block fg-base font-medium tracking-tight whitespace-nowrap"
            style={{ fontSize: '20px', lineHeight: 1.4 }}
          >
            Christopher Sim
          </p>

          <div className="flex flex-col items-center">
            <div
              className="relative overflow-hidden"
              style={{
                width: 'clamp(320px, 60vw, 1600px)',
                aspectRatio: '16 / 9',
                borderRadius: 'clamp(4px, 0.5vw, 12px)',
              }}
            >
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={currentProject.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.5,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  className="absolute inset-0 overflow-hidden"
                  style={{ borderRadius: 'clamp(4px, 0.5vw, 12px)' }}
                >
                  {isVideo ? (
                    <video
                      src={mediaSrc}
                      className="absolute inset-0 w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <Image
                      src={mediaSrc}
                      alt={currentProject.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 90vw, 55vw"
                      priority
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.p
              key={`caption-${currentIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-center font-mono fg-subtle px-4"
              style={{
                marginTop: '16px',
                fontSize: 'clamp(10px, 0.7vw, 12px)',
                lineHeight: 1.6,
                maxWidth: 'clamp(300px, 45vw, 900px)',
              }}
            >
              <span className="fg-base font-medium">{currentProject.title}:</span>{' '}
              {currentProject.description || `A project from ${currentProject.year}.`}
            </motion.p>
          </div>

          <p
            className="hidden lg:block fg-base font-medium tracking-tight whitespace-nowrap"
            style={{ fontSize: '20px', lineHeight: 1.4 }}
          >
            Recent Work
          </p>
        </div>
      </div>

      {/* Left click zone */}
      <div
        onClick={() => goToIndex(currentIndex - 1)}
        className="fixed left-0 top-0 w-1/2 h-full z-30"
        style={{ cursor: currentIndex > 0 ? 'w-resize' : 'default' }}
      />

      {/* Right click zone */}
      <div
        onClick={() => goToIndex(currentIndex + 1)}
        className="fixed right-0 top-0 w-1/2 h-full z-30"
        style={{ cursor: currentIndex < totalSlides - 1 ? 'e-resize' : 'default' }}
      />

      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between font-mono text-xs fg-muted bg-base pointer-events-auto px-8 py-4">
        <span>
          [{String(currentIndex + 1).padStart(2, '0')}/{String(totalSlides).padStart(2, '0')}]
        </span>
        <span className="hidden sm:inline">Scroll or use arrow keys</span>
        <span className="fg-base">[S] SLIDE</span>
      </div>
    </div>
  );
}
