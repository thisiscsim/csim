'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { COMPANIES, ALL_PROJECTS } from './data';
import PixelReveal from '@/components/pixel-reveal';
import { AnimatedBackground } from '@/components/animated-background';

const FADE_UP = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' as const },
};

function stagger(index: number) {
  return { ...FADE_UP, transition: { ...FADE_UP.transition, delay: 0.1 + index * 0.05 } };
}

const PREVIEW_WIDTH = 432;
const PREVIEW_HEIGHT = 256;

interface MediaItem {
  url: string;
  isVideo: boolean;
}

interface HomePageProps {
  initialMedia?: Record<string, MediaItem>;
}

export default function HomePage({ initialMedia = {} }: HomePageProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map());
  const listRef = useRef<HTMLDivElement>(null);

  const projectsWithCompany = ALL_PROJECTS.map((project) => {
    const company = COMPANIES.find((c) => c.projects.some((p) => p.id === project.id));
    return { project, companyName: company?.name ?? '' };
  });

  const getPreviewStyle = useCallback(
    (index: number): React.CSSProperties | null => {
      const projectId = projectsWithCompany[index]?.project.id;
      if (!projectId) return null;
      const el = itemRefs.current.get(projectId);
      const list = listRef.current;
      if (!el || !list) return null;

      const itemRect = el.getBoundingClientRect();
      const listRect = list.getBoundingClientRect();
      const isRight = index % 2 === 0;
      const top = itemRect.top + itemRect.height / 2 - PREVIEW_HEIGHT / 2;

      if (isRight) {
        return { top, left: listRect.right + 12 };
      }
      return { top, left: listRect.left - PREVIEW_WIDTH - 12 };
    },
    [projectsWithCompany]
  );

  const previewStyle = hoveredIndex >= 0 ? getPreviewStyle(hoveredIndex) : null;

  return (
    <div className="flex flex-col items-center gap-8 pb-24 pt-[82px] px-8 min-h-screen">
      {/* Top blur gradient */}
      <div
        className="fixed top-0 left-0 right-0 pointer-events-none z-[45]"
        style={{
          height: '96px',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          opacity: 0.95,
          maskImage: 'linear-gradient(to bottom, black 25%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 25%, transparent)',
        }}
      />

      {/* Hover preview */}
      <AnimatePresence mode="wait">
        {hoveredId && previewStyle && (
          <motion.div
            key={hoveredId}
            className="fixed pointer-events-none z-40 rounded-[4px] overflow-hidden"
            style={{
              width: PREVIEW_WIDTH,
              height: PREVIEW_HEIGHT,
              ...previewStyle,
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              opacity: { duration: 0.2 },
              scale: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] },
            }}
          >
            {initialMedia[hoveredId] ? (
              initialMedia[hoveredId].isVideo ? (
                <video
                  src={initialMedia[hoveredId].url}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <PixelReveal
                  src={initialMedia[hoveredId].url}
                  width={PREVIEW_WIDTH}
                  height={PREVIEW_HEIGHT}
                  visible={true}
                />
              )
            ) : (
              <div
                style={{
                  width: PREVIEW_WIDTH,
                  height: PREVIEW_HEIGHT,
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bio Section */}
      <div className="flex flex-col gap-3 items-center justify-center w-[574px] max-w-full px-3 pb-2.5">
        <motion.div className="w-full" {...stagger(0)}>
          <p className="text-[17px]/[24px] font-medium fg-base">Christopher Sim</p>
          <p className="text-[17px]/[24px] fg-subtle">Software designer based in San Francisco</p>
        </motion.div>

        <motion.div className="text-[14px]/[20px] fg-base w-full" {...stagger(1)}>
          <p className="mb-4">
            Currently a designer at{' '}
            <a
              href="https://harvey.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="link-styled"
            >
              Harvey
            </a>
            , building the frontier AI platform for legal and professional services. Previously,
            worked with teams at{' '}
            <a
              href="https://flexport.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link-styled"
            >
              Flexport
            </a>
            ,{' '}
            <a
              href="https://uber.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link-styled"
            >
              Uber
            </a>
            , and{' '}
            <a
              href="https://www.joinarc.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-styled"
            >
              Arc
            </a>
            . In my free time, I&apos;m a design consultant for emerging software companies backed
            by top VCs.
          </p>
          <p>
            I love working on niche problems and simplifying complexities so people can focus on
            more valuable work. I received my master&apos;s in Human-Computer Interaction from the
            University of Washington. You can reach me at{' '}
            <a
              href="https://twitter.com/thisiscsim"
              target="_blank"
              rel="noopener noreferrer"
              className="link-styled"
            >
              @thisiscsim
            </a>{' '}
            or{' '}
            <a href="mailto:hello@csim.me" className="link-styled">
              hello(at)csim.me
            </a>
            .
          </p>
        </motion.div>
      </div>

      {/* Divider */}
      <motion.div className="w-[550px] max-w-full" {...stagger(2)}>
        <div className="w-8 h-px bg-[var(--fg-base)] opacity-25 mx-auto" />
      </motion.div>

      {/* Project List */}
      <div ref={listRef} className="flex flex-col items-start w-[574px] max-w-full">
        <AnimatedBackground
          className="rounded-[10px] bg-hover"
          transition={{
            type: 'spring',
            bounce: 0.2,
            duration: 0.6,
          }}
          enableHover
          onValueChange={(id) => {
            setHoveredId(id);
            const idx = projectsWithCompany.findIndex((p) => p.project.id === id);
            setHoveredIndex(idx);
          }}
        >
          {projectsWithCompany.map(({ project, companyName }, i) => (
            <motion.div
              key={project.id}
              data-id={project.id}
              className="w-full"
              {...stagger(3 + i)}
            >
              <Link
                href={`/${project.id}`}
                ref={(el) => {
                  if (el) itemRefs.current.set(project.id, el);
                }}
                className="flex items-center justify-between px-3 py-2.5 w-full"
              >
                <div className="flex gap-2.5 items-center">
                  <div
                    className="shrink-0 rounded-[3px]"
                    style={{
                      width: 60,
                      height: 36,
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    }}
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-[14px] leading-none fg-base">{project.title}</p>
                    <p className="text-[11px]/[14px] fg-muted font-mono tracking-[-0.22px]">
                      {companyName}
                    </p>
                  </div>
                </div>
                <p className="text-[11px]/[14px] fg-muted font-mono whitespace-nowrap">
                  {project.dateRange}
                </p>
              </Link>
            </motion.div>
          ))}
        </AnimatedBackground>
      </div>

      {/* Bottom Divider */}
      <motion.div className="w-[550px] max-w-full" {...stagger(3 + projectsWithCompany.length)}>
        <div className="w-8 h-px bg-[var(--fg-base)] opacity-25 mx-auto" />
      </motion.div>

      {/* Footer */}
      <motion.div
        className="flex flex-col items-center justify-center w-[574px] max-w-full px-3 pt-2.5"
        {...stagger(4 + projectsWithCompany.length)}
      >
        <div className="text-[11px]/[14px] fg-muted font-mono w-[550px] max-w-full text-center">
          <p>No trackers used on this site, enjoy your privacy.</p>
          <p>Site design and content &copy; 2026 Christopher Sim.</p>
          <p>Made with care in California.</p>
        </div>
      </motion.div>
    </div>
  );
}
