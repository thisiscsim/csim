'use client';
import { useState, useEffect, memo, useMemo } from 'react';
import { motion } from 'motion/react';
import type { NotionBlogPost } from '@/lib/notion/blog';
import MarkdownContent from './markdown-content';

interface Heading {
  id: string;
  text: string;
  level: number;
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

export default function BlogPost({ post, content }: BlogPostProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [activeId, setActiveId] = useState<string>('');
  const [isScrolled, setIsScrolled] = useState(false);

  // Extract headings from markdown content
  const headings = useMemo(() => {
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    const extractedHeadings: Heading[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      extractedHeadings.push({ id, text, level });
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

  // Handle scroll detection for gradient
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // Show top gradient when scrolled down from top
      setIsScrolled(scrollTop > 0);
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      {/* Top Blur Gradient Overlay */}
      <div
        className={`fixed top-0 left-0 right-0 pointer-events-none z-[45] transition-opacity duration-300 ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          height: '96px',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          opacity: 0.95,
          maskImage: 'linear-gradient(to bottom, black 25%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 25%, transparent)',
        }}
      />

      {/* Table of Contents - Fixed Left Side */}
      {headings.length > 0 && (
        <aside
          className="hidden xl:block fixed left-0 top-[120px] w-[200px]"
          style={{
            left: 'max(1rem, calc((100vw - 1440px) / 2 - 240px))',
          }}
        >
          <nav>
            <ul className="space-y-2 text-sm">
              {headings.map((heading) => (
                <li key={heading.id} style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}>
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
                    className={`block transition-colors duration-300 font-mono ${
                      activeId === heading.id ? 'fg-base' : 'fg-muted hover:fg-subtle'
                    }`}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      )}

      {/* Main Content */}
      <div className="pb-24 mt-[70px]">
        <motion.div
          key={post.slug}
          className="space-y-8"
          variants={VARIANTS_CONTAINER}
          initial="hidden"
          animate="visible"
        >
          <motion.header variants={VARIANTS_SECTION}>
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-2xl font-medium fg-base transition-colors duration-300">
                  {post.title}
                </h1>
                <div className="flex flex-col gap-1 text-sm fg-muted transition-colors duration-300">
                  <div className="text-xs fg-muted font-mono transition-colors duration-300">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                  {post.categories && post.categories.length > 0 && (
                    <div className="text-xs fg-muted font-mono transition-colors duration-300">
                      {post.categories.join(', ')}
                    </div>
                  )}
                </div>
              </div>
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
