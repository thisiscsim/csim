'use client';
import { useState, useEffect, memo, useMemo, useRef } from 'react';
import { motion } from 'motion/react';
import type { NotionBlogPost } from '@/lib/notion/blog';
import MarkdownContent from './markdown-content';

interface Heading {
  id: string;
  text: string;
}

const LoadingSkeleton = memo(function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="skeleton_wrapper w-full h-4"></div>
      <div className="skeleton_wrapper w-5/6 h-4"></div>
      <div className="skeleton_wrapper w-4/6 h-4"></div>
    </div>
  );
});

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.05,
    },
  },
};

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

interface BlogPostProps {
  post: NotionBlogPost;
  content: string;
}

function formatPostDate(date: string): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).formatToParts(new Date(date));

  const day = parts.find((part) => part.type === 'day')?.value;
  const month = parts.find((part) => part.type === 'month')?.value;
  const year = parts.find((part) => part.type === 'year')?.value;

  return `${day} ${month}, ${year}`;
}

export default function BlogPost({ post, content }: BlogPostProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [activeId, setActiveId] = useState<string>('');
  const [isTitleVisible, setIsTitleVisible] = useState(true);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Extract headings from markdown content
  const headings = useMemo(() => {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const extractedHeadings: Heading[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const text = match[2].trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      extractedHeadings.push({ id, text });
    }

    return extractedHeadings;
  }, [content]);

  // Reset scroll on post change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post.slug]);

  useEffect(() => {
    // Reset loading state when post changes
    setIsLoading(true);

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 50); // Reduced from 100ms for faster transition

    return () => clearTimeout(timer);
  }, [post.slug]);

  // Track when the title scrolls out of view
  useEffect(() => {
    if (!titleRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTitleVisible(entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: '-100px 0px 0px 0px', // Account for any fixed header
      }
    );

    observer.observe(titleRef.current);

    return () => observer.disconnect();
  }, [isLoading]);

  // Track active heading on scroll
  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings
        .map((h) => ({
          id: h.id,
          element: document.getElementById(h.id),
        }))
        .filter((h) => h.element !== null);

      // Check if we're near the bottom of the page
      const isNearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;

      if (isNearBottom && headingElements.length > 0) {
        // Set to last heading when near bottom
        setActiveId(headingElements[headingElements.length - 1].id);
        return;
      }

      // Find the heading that's currently most visible in viewport
      let currentId = '';
      for (const { id, element } of headingElements) {
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if heading is in the top portion of viewport
          if (rect.top <= 150 && rect.top >= -100) {
            currentId = id;
          }
        }
      }

      if (currentId) {
        setActiveId(currentId);
      }
    };

    handleScroll(); // Initial call
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings, isLoading]);

  return (
    <>
      <div className="top-blur" />

      {/* Table of Contents - Fixed Left Side */}
      {headings.length > 0 && (
        <motion.aside
          className="fixed top-[155px] left-8 hidden w-[200px] xl:block"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
        >
          <nav style={{ fontSize: '11px', lineHeight: '16px' }}>
            {/* Title that fades in when scrolled out of view - always in DOM to prevent layout shift */}
            <div
              className={`mb-4 transition-opacity duration-200 ${
                isTitleVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            >
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="block cursor-pointer text-left transition-colors duration-300 fg-muted hover:fg-subtle"
              >
                {post.title}
              </button>
            </div>

            <ul className="space-y-2 list-none p-0 m-0">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <a
                    href={`#${heading.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById(heading.id);
                      if (element) {
                        const yOffset = -100;
                        const y =
                          element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                      }
                    }}
                    className={`block font-normal transition-colors duration-300 ${
                      activeId === heading.id ? 'fg-base' : 'fg-muted hover:fg-subtle'
                    }`}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </motion.aside>
      )}

      {/* Main Content */}
      <div className="mx-auto mt-[55px] w-full max-w-[574px] px-[12px] pb-[82px]">
        <motion.div
          key={post.slug}
          className="flex flex-col gap-[12px]"
          variants={VARIANTS_CONTAINER}
          initial="hidden"
          animate="visible"
        >
          <motion.header variants={VARIANTS_SECTION}>
            <div className="text-[14px]/[22px] font-medium">
              <h1
                ref={titleRef}
                className="text-[14px]/[22px] font-medium transition-colors duration-300 fg-base"
              >
                {post.title}
              </h1>
              <p className="transition-colors duration-300 fg-muted">{formatPostDate(post.date)}</p>
            </div>
          </motion.header>

          <motion.main variants={VARIANTS_SECTION}>
            <div className="relative">
              {isLoading ? (
                <LoadingSkeleton />
              ) : (
                <div className="w-full max-w-none fg-base transition-colors duration-300">
                  <MarkdownContent content={content} />
                </div>
              )}
            </div>
          </motion.main>
        </motion.div>
      </div>
    </>
  );
}
