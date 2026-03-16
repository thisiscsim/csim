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

function LazyVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: '200px' });
  const hasLoaded = useRef(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (isInView) {
      if (!hasLoaded.current) {
        video.src = src;
        hasLoaded.current = true;
      }
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isInView, src]);

  return (
    <div ref={containerRef}>
      <video
        ref={ref}
        className="select-none object-cover w-full aspect-video"
        loop
        muted
        playsInline
        preload="none"
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
    <div className="flex flex-col items-center gap-8 md:gap-12 pb-16 md:pb-24 pt-[72px] md:pt-[82px] px-5 md:px-8 min-h-screen">
      <div className="top-blur" />

      {/* Bio Section */}
      <div className="flex flex-col gap-3 items-center justify-center w-full md:w-[574px] max-w-full md:px-3 pb-2.5">
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
      <motion.div className="w-full md:w-[550px] max-w-full" {...stagger(2)}>
        <div className="w-8 h-px bg-[var(--fg-base)] opacity-15 mx-auto" />
      </motion.div>

      {/* Media */}
      <div className="flex flex-col items-center gap-3 w-full md:w-screen md:-mx-8">
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
        <div className="w-8 h-px bg-[var(--fg-base)] opacity-15 mx-auto" />
      </motion.div>

      {/* Footer */}
      <motion.div
        className="flex flex-col items-center justify-center w-full md:w-[574px] max-w-full px-3"
        {...stagger(4 + media.length)}
      >
        <div className="text-[11px]/[14px] fg-muted font-mono w-full md:w-[550px] max-w-full text-center">
          <p>No trackers used on this site, enjoy your privacy.</p>
          <p>Site design and content &copy; 2026 Christopher Sim.</p>
          <p>Made with care in California.</p>
        </div>
      </motion.div>
    </div>
  );
}
