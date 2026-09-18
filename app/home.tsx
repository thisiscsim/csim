'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'motion/react';

const FADE_UP = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' as const },
};

function stagger(index: number) {
  return { ...FADE_UP, transition: { ...FADE_UP.transition, delay: 0.1 + index * 0.05 } };
}

const HOME_LINK_CLASS = 'fg-base underline transition-colors duration-200 hover:fg-subtle';

function LazyVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // Begin fetching metadata well before the video reaches the viewport. For the
  // large MP4s this front-loads the costly, cache-miss-prone moov lookup so the
  // variable time-to-first-frame is absorbed before the clip is on screen.
  const shouldPreload = useInView(containerRef, { once: true, margin: '800px' });
  // Only autoplay/pause once the clip is actually near the viewport.
  const isInView = useInView(containerRef, { once: false, margin: '100px' });
  const hasLoaded = useRef(false);

  useEffect(() => {
    const video = ref.current;
    if (!video || !shouldPreload || hasLoaded.current) return;
    video.src = src;
    video.load();
    hasLoaded.current = true;
  }, [shouldPreload, src]);

  useEffect(() => {
    const video = ref.current;
    if (!video || !hasLoaded.current) return;

    if (isInView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isInView]);

  return (
    <div ref={containerRef}>
      <video
        ref={ref}
        className="select-none object-cover w-full aspect-video"
        loop
        muted
        playsInline
        preload="metadata"
      />
    </div>
  );
}

interface MediaItem {
  url: string;
  isVideo: boolean;
  name: string;
}

interface HomePageProps {
  media: MediaItem[];
}

export default function HomePage({ media }: HomePageProps) {
  return (
    <div className="flex min-h-screen -mx-4 flex-col items-center gap-[32px] px-5 pb-16 pt-[72px] md:px-8 md:pb-[82px] md:pt-[55px]">
      <div className="top-blur" />

      {/* Bio Section */}
      <div className="flex w-full max-w-full flex-col items-center justify-center gap-[12px] pb-[10px] md:w-[574px] md:px-[12px]">
        <motion.div className="w-full" {...stagger(0)}>
          <p className="text-[14px]/[22px] font-medium fg-base">Christopher Sim</p>
          <p className="text-[14px]/[22px] fg-subtle">Software designer based in San Francisco</p>
        </motion.div>

        <motion.div className="w-full space-y-[22px] text-[14px]/[22px] fg-base" {...stagger(1)}>
          <p>
            Currently, I&apos;m a designer at{' '}
            <a
              href="https://openai.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={HOME_LINK_CLASS}
            >
              OpenAI
            </a>{' '}
            working on Codex. Previously, I was one of the earliest designers at{' '}
            <a
              href="https://harvey.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className={HOME_LINK_CLASS}
            >
              Harvey
            </a>
            , where I worked on the frontier AI platform for legal, my work has touched almost every
            surface of the product and laid the foundations for where Harvey is today.
          </p>
          <p>
            I&apos;ve also had stints at{' '}
            <a
              href="https://flexport.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={HOME_LINK_CLASS}
            >
              Flexport
            </a>
            ,{' '}
            <a
              href="https://uber.com"
              target="_blank"
              rel="noopener noreferrer"
              className={HOME_LINK_CLASS}
            >
              Uber
            </a>
            , and{' '}
            <a
              href="https://www.joinarc.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={HOME_LINK_CLASS}
            >
              Arc
            </a>
            . In my free time, I&apos;m a design advisor for emerging software companies backed by
            top VCs.
          </p>
          <p>
            I love working on niche problems and simplifying complexities so people can focus on
            more valuable work. I received my masters in Human-Computer Interaction from the
            University of Washington. You can reach me at{' '}
            <a
              href="https://twitter.com/thisiscsim"
              target="_blank"
              rel="noopener noreferrer"
              className={HOME_LINK_CLASS}
            >
              @thisiscsim
            </a>{' '}
            or{' '}
            <a href="mailto:hello@csim.me" className={HOME_LINK_CLASS}>
              hello(at)csim.me
            </a>
            .
          </p>
        </motion.div>
      </div>

      {/* Divider */}
      <motion.div className="w-full md:w-[550px] max-w-full" {...stagger(2)}>
        <div className="mx-auto h-px w-[32px] bg-[var(--fg-base)] opacity-15" />
      </motion.div>

      {/* Media */}
      <div className="flex w-full flex-col items-center gap-[12px] md:-mx-8 md:w-screen">
        {media.map((item, i) => (
          <motion.div key={item.name} className="w-full md:w-auto" {...stagger(3 + i)}>
            {item.isVideo ? (
              <div className="w-full md:w-[978px] md:mx-auto">
                <LazyVideo src={item.url} />
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt={item.name}
                src={item.url}
                className="select-none object-cover w-full aspect-video md:w-[978px] md:h-[550px] md:mx-auto md:block"
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : 'auto'}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Divider */}
      <motion.div className="w-full md:w-[550px] max-w-full" {...stagger(3 + media.length)}>
        <div className="mx-auto h-px w-[32px] bg-[var(--fg-base)] opacity-15" />
      </motion.div>

      {/* Footer */}
      <motion.div
        className="flex w-full max-w-full flex-col items-center justify-center px-[12px] pt-[10px] md:w-[574px]"
        {...stagger(4 + media.length)}
      >
        <div className="w-full max-w-full text-center text-[12px]/[16px] fg-muted md:w-[550px]">
          <p>No trackers used on this site, enjoy your privacy.</p>
          <p>Site design and content &copy; 2026 Christopher Sim.</p>
        </div>
      </motion.div>
    </div>
  );
}
