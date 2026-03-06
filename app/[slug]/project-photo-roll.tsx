'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Project } from '../data';

const INFO_PANEL_WIDTH = 400;
const SECTION_HEIGHT_VH = 65;
const PLACEHOLDER = '/temp-cover/placeholder_1.png';

function getAspectRatio(aspectRatio?: string): string {
  switch (aspectRatio) {
    case '3:4':
      return '3/4';
    case '1:1':
      return '1/1';
    case '4:5':
      return '4/5';
    case '5:3':
      return '5/3';
    default:
      return '16/9';
  }
}

interface MediaItem {
  url: string;
  isVideo: boolean;
}

interface Props {
  project: Project;
  companyName: string;
  companyCategory?: string;
  companyDescription?: string;
  companyLink?: string;
  media: MediaItem | null;
}

export default function ProjectPhotoRoll({
  project,
  companyName,
  companyCategory,
  companyDescription,
  companyLink,
  media,
}: Props) {
  const [ready, setReady] = useState(false);
  const [captionsVisible, setCaptionsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const resolvedMedia = media || { url: PLACEHOLDER, isVideo: false };

  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => setCaptionsVisible(true), 600);
    return () => clearTimeout(t);
  }, [ready]);

  // Convert vertical wheel to horizontal scroll
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

  const sectionHeight = `${SECTION_HEIGHT_VH}vh`;
  const minHeight = 300;
  const maxHeight = 680;

  return (
    <div className="fixed inset-0 bg-base flex flex-col">
      <div
        ref={containerRef}
        className="flex-1 overflow-x-auto overflow-y-hidden flex items-center"
        style={{ scrollbarWidth: 'none' }}
      >
        <style>{`[data-scroll]::-webkit-scrollbar { display: none; }`}</style>

        <div className="shrink-0" style={{ width: 32 }} />

        <div
          className="relative flex flex-row items-center shrink-0"
          style={{
            height: sectionHeight,
            minHeight,
            maxHeight,
            gap: 16,
          }}
        >
          {/* Project info panel */}
          <motion.div
            className="h-full flex flex-col items-start justify-start shrink-0"
            style={{ width: INFO_PANEL_WIDTH, paddingRight: 32 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: ready ? 1 : 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
          >
            <div className="flex flex-col gap-0.5">
              <h3 className="text-lg font-medium fg-base">{project.title}</h3>
              {companyLink ? (
                <a href={companyLink} target="_blank" rel="noopener noreferrer" className="group">
                  <p className="text-[11px] fg-muted font-mono group-hover:fg-subtle transition-colors flex items-center gap-1">
                    {companyName}
                    {companyCategory && <span>· {companyCategory}</span>}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="opacity-50"
                    >
                      <path
                        d="M17.5 7.5V2.5M17.5 2.5H12.5M17.5 2.5L10.833 9.167M8.333 4.167H6.5c-1.4 0-2.1 0-2.635.272a2.5 2.5 0 00-1.093 1.093C2.5 6.066 2.5 6.767 2.5 8.167V13.5c0 1.4 0 2.1.272 2.635a2.5 2.5 0 001.093 1.092c.535.273 1.235.273 2.635.273h5.333c1.4 0 2.1 0 2.635-.273a2.5 2.5 0 001.092-1.092c.273-.535.273-1.235.273-2.635v-1.833"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </p>
                </a>
              ) : (
                <p className="text-[11px] fg-muted font-mono">
                  {companyName}
                  {companyCategory && <span> · {companyCategory}</span>}
                </p>
              )}
              {project.description && (
                <p className="text-[13px]/[20px] fg-subtle mt-3" style={{ maxWidth: 340 }}>
                  {project.description}
                </p>
              )}
              {companyDescription && (
                <p className="text-[12px]/[18px] fg-muted mt-4" style={{ maxWidth: 340 }}>
                  {companyDescription}
                </p>
              )}
            </div>
          </motion.div>

          {/* Single project media */}
          <div className="relative shrink-0 flex flex-col" style={{ height: '100%' }}>
            <motion.div
              className="relative shrink-0 overflow-hidden"
              style={{
                height: 'calc(100% - 48px)',
                aspectRatio: getAspectRatio(project.aspectRatio),
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: ready ? 1 : 0 }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.1,
              }}
            >
              {resolvedMedia.isVideo ? (
                <video
                  src={resolvedMedia.url}
                  className="object-cover w-full h-full select-none"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  onCanPlay={() => setReady(true)}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  alt={project.title}
                  src={resolvedMedia.url}
                  className="object-cover w-full h-full select-none"
                  loading="eager"
                  fetchPriority="high"
                  onLoad={() => setReady(true)}
                />
              )}
            </motion.div>

            <motion.div
              className="pt-3 font-mono fg-subtle"
              style={{ fontSize: '11px', lineHeight: 1.5, maxWidth: 650 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: ready && captionsVisible ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <span className="fg-base font-medium">
                {companyName} {project.title}:
              </span>{' '}
              <span className="fg-muted">{project.description}</span>
            </motion.div>
          </div>
        </div>

        <div className="shrink-0" style={{ width: 32 }} />
      </div>
    </div>
  );
}
