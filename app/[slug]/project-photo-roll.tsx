'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Project } from '../data';

const MEDIA_GAP = 24;
const INFO_PANEL_WIDTH = 431;
const CONTENT_GAP = 40;
const MEDIA_HEIGHT = 468;
const SECTION_HEIGHT = 500;
const PADDING_X = 80;

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

interface MediaItem {
  url: string;
  isVideo: boolean;
}

interface Props {
  project: Project;
  mediaItems: MediaItem[];
  captions?: Record<number, string>;
}

export default function ProjectPhotoRoll({ project, mediaItems, captions = {} }: Props) {
  const [ready, setReady] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const firstLoadRef = useRef(false);

  useEffect(() => {
    if (mediaItems.length === 0) {
      setReady(true);
    }
  }, [mediaItems.length]);

  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => setIntroComplete(true), 1000);
    return () => clearTimeout(t);
  }, [ready]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  const handleFirstMediaReady = () => {
    if (!firstLoadRef.current) {
      firstLoadRef.current = true;
      setReady(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-base flex flex-col">
      <div
        ref={containerRef}
        className="flex-1 overflow-x-auto overflow-y-hidden flex items-center"
        style={{ scrollbarWidth: 'none', padding: `32px ${PADDING_X}px` }}
      >
        <style>{`[data-scroll]::-webkit-scrollbar { display: none; }`}</style>

        <div
          className="relative flex flex-row items-center shrink-0"
          style={{ height: SECTION_HEIGHT, gap: CONTENT_GAP }}
        >
          {/* Project info panel */}
          <motion.div
            className="flex flex-col items-start justify-start shrink-0"
            style={{ width: INFO_PANEL_WIDTH, height: SECTION_HEIGHT }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 20 }}
            transition={{
              duration: 0.5,
              ease: 'easeOut',
              delay: ready ? INTRO_CONTENT_DELAY + 0.3 : 0,
            }}
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-[7px]">
                <div className="flex flex-col gap-1">
                  <h3 className="text-[17px]/[22px] fg-base">{project.title}</h3>
                  <p className="text-[10px] fg-muted font-mono leading-[1.3]">
                    {project.dateRange}
                  </p>
                </div>
              </div>

              {project.description && (
                <p className="text-[15px]/[22px] fg-base whitespace-pre-wrap">
                  {project.description}
                </p>
              )}

              {project.collaborators && (
                <p className="text-[11px]/[16px] fg-muted font-mono">{project.collaborators}</p>
              )}
            </div>
          </motion.div>

          {/* Media items */}
          <div className="flex items-center shrink-0" style={{ gap: MEDIA_GAP }}>
            {mediaItems.map((media, idx) => {
              const isFirst = idx === 0;

              return (
                <div
                  key={`${media.url}-${idx}`}
                  className="relative shrink-0"
                  style={{ height: SECTION_HEIGHT }}
                >
                  {isFirst ? (
                    // First item: scale from 0 with spring
                    <motion.div
                      className="relative shrink-0 overflow-hidden rounded-[4px]"
                      style={{ height: MEDIA_HEIGHT }}
                      initial={{ scale: 0 }}
                      animate={{ scale: ready ? 1 : 0 }}
                      transition={INTRO_SPRING}
                    >
                      <motion.div
                        className="h-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: ready ? 1 : 0 }}
                        transition={{
                          duration: 0.8,
                          ease: [0.25, 0.1, 0.25, 1],
                          delay: ready ? INTRO_CONTENT_DELAY : 0,
                        }}
                      >
                        {media.isVideo ? (
                          <video
                            src={media.url}
                            className="h-full w-auto select-none"
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                            onCanPlay={handleFirstMediaReady}
                          />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            alt={`${project.title} 1`}
                            src={media.url}
                            className="h-full w-auto select-none"
                            loading="eager"
                            fetchPriority="high"
                            onLoad={handleFirstMediaReady}
                          />
                        )}
                      </motion.div>
                    </motion.div>
                  ) : (
                    // Subsequent items: fade in with staggered delay
                    <motion.div
                      className="relative shrink-0 overflow-hidden rounded-[4px]"
                      style={{ height: MEDIA_HEIGHT }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: ready ? 1 : 0 }}
                      transition={{
                        duration: 0.9,
                        ease: [0.25, 0.1, 0.25, 1],
                        delay: ready ? INTRO_ADJACENT_DELAY + (idx - 1) * 0.08 : 0,
                      }}
                    >
                      {media.isVideo ? (
                        <video
                          src={media.url}
                          className="h-full w-auto select-none"
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload={idx < 3 ? 'auto' : 'metadata'}
                        />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          alt={`${project.title} ${idx + 1}`}
                          src={media.url}
                          className="h-full w-auto select-none"
                          loading={idx < 3 ? 'eager' : 'lazy'}
                          fetchPriority={idx < 3 ? 'high' : 'auto'}
                        />
                      )}
                    </motion.div>
                  )}

                  {captions[idx] && (
                    <motion.div
                      className="font-mono fg-muted absolute left-0"
                      style={{
                        fontSize: '11px',
                        lineHeight: '16px',
                        top: MEDIA_HEIGHT + 16,
                        maxWidth: '100%',
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: ready && introComplete ? 1 : 0 }}
                      transition={{
                        duration: 0.3,
                        delay: ready ? 0.2 + idx * 0.02 : 0,
                      }}
                    >
                      {captions[idx]}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {mediaItems.length === 0 && (
            <div
              className="relative shrink-0 flex flex-col items-center justify-center fg-muted rounded-[4px]"
              style={{
                height: MEDIA_HEIGHT,
                width: 800,
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
              }}
            >
              <p className="text-[11px] font-mono">No media available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
