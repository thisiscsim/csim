'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { COMPANIES, ALL_PROJECTS } from './data';
import PixelReveal from '@/components/pixel-reveal';

const FADE_UP = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' as const },
};

function stagger(index: number) {
  return { ...FADE_UP, transition: { ...FADE_UP.transition, delay: 0.1 + index * 0.05 } };
}

const CURSOR_DEFAULT_SIZE = 10;
const CURSOR_BLOCK_PADDING = 10;
const CURSOR_SPRING = { damping: 25, stiffness: 300, mass: 0.5 };
const CURSOR_SHAPE_SPRING = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 28,
  mass: 0.5,
};

const PREVIEW_WIDTH = 432;
const PREVIEW_HEIGHT = 256;

interface CursorState {
  type: 'default' | 'block';
  width: number;
  height: number;
  radius: string;
}

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
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const [cursorState, setCursorState] = useState<CursorState>({
    type: 'default',
    width: CURSOR_DEFAULT_SIZE,
    height: CURSOR_DEFAULT_SIZE,
    radius: '50%',
  });
  const [cursorVisible, setCursorVisible] = useState(false);
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map());
  const listRef = useRef<HTMLDivElement>(null);

  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const cursorX = useSpring(targetX, CURSOR_SPRING);
  const cursorY = useSpring(targetY, CURSOR_SPRING);

  useEffect(() => {
    setHasFinePointer(window.matchMedia('(pointer: fine)').matches);
  }, []);

  // RAF-based cursor update loop following the reference implementation
  useEffect(() => {
    if (!hasFinePointer) return;

    const mousePos = { x: 0, y: 0 };
    let rafId: number;
    let currentTarget: HTMLElement | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };

    const handleScroll = () => {
      // Triggers re-evaluation on scroll with last known mouse pos
    };

    const updateLoop = () => {
      let hitTarget: HTMLElement | null = null;
      let inListArea = false;

      if (mousePos.x !== 0 || mousePos.y !== 0) {
        const el = document.elementFromPoint(mousePos.x, mousePos.y);
        hitTarget = (el?.closest('[data-cursor-item]') as HTMLElement) || null;

        if (listRef.current) {
          const listRect = listRef.current.getBoundingClientRect();
          inListArea =
            mousePos.x >= listRect.left &&
            mousePos.x <= listRect.right &&
            mousePos.y >= listRect.top &&
            mousePos.y <= listRect.bottom;
        }
      }

      setCursorVisible(inListArea);

      if (hitTarget !== currentTarget) {
        currentTarget = hitTarget;

        if (hitTarget) {
          const rect = hitTarget.getBoundingClientRect();
          setCursorState({
            type: 'block',
            width: rect.width + CURSOR_BLOCK_PADDING,
            height: rect.height + CURSOR_BLOCK_PADDING,
            radius: '14px',
          });
        } else {
          setCursorState({
            type: 'default',
            width: CURSOR_DEFAULT_SIZE,
            height: CURSOR_DEFAULT_SIZE,
            radius: '50%',
          });
        }
      }

      if (currentTarget) {
        const rect = currentTarget.getBoundingClientRect();
        targetX.set(rect.left + rect.width / 2);
        targetY.set(rect.top + rect.height / 2);
      } else {
        targetX.set(mousePos.x);
        targetY.set(mousePos.y);
      }

      rafId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { capture: true, passive: true });
    rafId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [hasFinePointer, targetX, targetY]);

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
        return { top, left: listRect.right + 24 };
      }
      return { top, left: listRect.left - PREVIEW_WIDTH - 24 };
    },
    [projectsWithCompany]
  );

  const previewStyle = hoveredIndex >= 0 ? getPreviewStyle(hoveredIndex) : null;
  const isBlock = cursorState.type === 'block';

  return (
    <div className="flex flex-col items-center pb-24 pt-[100px] px-8 min-h-screen">
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
      {hasFinePointer && cursorVisible && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[100] overflow-hidden"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={false}
          animate={{
            width: cursorState.width,
            height: cursorState.height,
            borderRadius: cursorState.radius,
            backgroundColor: isBlock ? 'rgba(236, 236, 236, 0.08)' : 'rgba(180, 180, 180, 0.5)',
          }}
          transition={CURSOR_SHAPE_SPRING}
        />
      )}

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
      <div className="flex flex-col gap-3 w-[550px] max-w-full">
        <motion.div {...stagger(0)}>
          <p className="text-[17px]/[22px] font-medium fg-base">Christopher Sim</p>
          <p className="text-[17px]/[22px] fg-subtle">Software designer based in San Francisco</p>
        </motion.div>

        <motion.div className="text-[14px]/[20px] fg-base w-[550px] max-w-full" {...stagger(1)}>
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
      <motion.div className="w-[550px] max-w-full my-6" {...stagger(2)}>
        <div className="w-8 h-px bg-[var(--fg-base)] opacity-25" />
      </motion.div>

      {/* Project List */}
      <div
        ref={listRef}
        className="flex flex-col items-start w-[574px] max-w-full"
        style={hasFinePointer ? { cursor: 'none' } : undefined}
      >
        {projectsWithCompany.map(({ project, companyName }, i) => (
          <motion.div key={project.id} className="w-full" {...stagger(4 + i)}>
            <Link
              href={`/${project.id}`}
              data-cursor-item
              ref={(el) => {
                if (el) itemRefs.current.set(project.id, el);
              }}
              className="flex items-center justify-between px-3 py-2.5 rounded-[10px] w-full"
              onMouseEnter={() => {
                setHoveredId(project.id);
                setHoveredIndex(i);
              }}
              onMouseLeave={() => {
                setHoveredId(null);
                setHoveredIndex(-1);
              }}
            >
              <div className="flex gap-2 items-center">
                <div
                  className="shrink-0 rounded-[4px]"
                  style={{
                    width: 60,
                    height: 32,
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  }}
                />
                <div className="flex flex-col gap-px">
                  <p className="text-[13px]/[18px] fg-base">{project.title}</p>
                  <p className="text-[10px] fg-muted font-mono tracking-[-0.2px]">{companyName}</p>
                </div>
              </div>
              <p className="text-[10px] fg-muted font-mono whitespace-nowrap">
                {project.dateRange}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Bottom Divider */}
      <motion.div
        className="w-[550px] max-w-full my-6"
        {...stagger(4 + projectsWithCompany.length)}
      >
        <div className="w-8 h-px bg-[var(--fg-base)] opacity-25" />
      </motion.div>

      {/* Footer */}
      <motion.div
        className="text-[10px] fg-muted font-mono w-[550px] max-w-full"
        style={{ lineHeight: 1.3 }}
        {...stagger(5 + projectsWithCompany.length)}
      >
        <p>No trackers used on this site, enjoy your privacy.</p>
        <p>Site design and content &copy; 2026 Christopher Sim.</p>
        <p>Made with care in California.</p>
      </motion.div>
    </div>
  );
}
