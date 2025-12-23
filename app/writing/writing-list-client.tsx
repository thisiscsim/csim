'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import type { NotionBlogPost } from '@/lib/notion/blog';

interface WritingListClientProps {
  posts: NotionBlogPost[];
}

// Animation variants matching homepage
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export function WritingListClient({ posts }: WritingListClientProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

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

  // Group posts by year
  const postsByYear = posts.reduce(
    (acc, post) => {
      const year = new Date(post.date).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    },
    {} as Record<number, typeof posts>
  );

  // Sort years in descending order
  const years = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a);

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

      <div className="max-w-5xl mx-auto py-16 px-4">
        <motion.div
          className="space-y-0"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {years.map((year, yearIndex) => (
            <div key={year}>
              {/* Separator above each year section */}
              {yearIndex > 0 && (
                <motion.div
                  className="border-b border-base transition-colors duration-300"
                  variants={itemVariants}
                />
              )}

              {postsByYear[year].map((post, index) => {
                const isHovered = hoveredId === post.id;
                const isMuted = hoveredId !== null && !isHovered;

                return (
                  <motion.div key={post.id} variants={itemVariants}>
                    <Link
                      href={`/writing/${post.slug}`}
                      className="flex items-center gap-8 py-[12px] -mx-4 px-4 rounded-lg"
                      onMouseEnter={() => setHoveredId(post.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      prefetch={true}
                    >
                      {/* Year - only show for first post of each year, always full opacity */}
                      <div className="w-20 flex-shrink-0">
                        {index === 0 && (
                          <span
                            className="fg-muted transition-colors duration-300"
                            style={{ fontSize: '14px', lineHeight: '20px' }}
                          >
                            {year}
                          </span>
                        )}
                      </div>

                      {/* Title - opacity changes on hover */}
                      <div
                        className="flex-1 transition-opacity duration-300"
                        style={{
                          opacity: isMuted ? 0.32 : 1,
                        }}
                      >
                        <h3
                          className="fg-base transition-colors duration-300"
                          style={{ fontSize: '14px', lineHeight: '20px' }}
                        >
                          {post.title}
                        </h3>
                      </div>

                      {/* Date - opacity changes on hover */}
                      <div
                        className="w-16 flex-shrink-0 text-right transition-opacity duration-300"
                        style={{
                          opacity: isMuted ? 0.32 : 1,
                        }}
                      >
                        <span
                          className="fg-muted transition-colors duration-300"
                          style={{ fontSize: '14px', lineHeight: '20px' }}
                        >
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: '2-digit',
                            day: '2-digit',
                          })}
                        </span>
                      </div>
                    </Link>

                    {/* Divider after each post except the last one in each year */}
                    {index < postsByYear[year].length - 1 && (
                      <div className="ml-28 border-b border-base transition-colors duration-300" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          ))}
        </motion.div>
      </div>
    </>
  );
}
