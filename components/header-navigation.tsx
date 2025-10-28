'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import type { NotionBlogPost } from '@/lib/notion/blog';

interface HeaderNavigationProps {
  blogPosts?: NotionBlogPost[];
}

export function HeaderNavigation({ blogPosts = [] }: HeaderNavigationProps) {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  // Determine current page and subtitle
  const getCurrentPage = () => {
    if (pathname === '/') return { name: 'Index', subtitle: null };
    if (pathname.startsWith('/craft')) return { name: 'Craft', subtitle: null };
    if (pathname.startsWith('/photos')) return { name: 'Photos', subtitle: null };
    if (pathname.startsWith('/writing')) {
      // Check if we're on a blog post page
      const segments = pathname.split('/').filter(Boolean);
      if (segments.length > 1) {
        // Find the blog post title
        const slug = segments[1];
        const post = blogPosts.find((p) => p.slug === slug);
        if (post) {
          return { name: 'Writing', subtitle: post.title };
        }
      }
      return { name: 'Writing', subtitle: null };
    }
    return { name: 'Index', subtitle: null };
  };

  const currentPage = getCurrentPage();
  const isSubPage = currentPage.subtitle !== null;

  const navItems = [
    { name: 'Index', href: '/' },
    { name: 'Photos', href: '/photos' },
    { name: 'Craft', href: '/craft' },
    { name: 'Writing', href: '/writing' },
  ];

  return (
    <motion.div
      className="fixed left-0 right-0 z-50 flex justify-center px-4"
      style={{ top: '40px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden h-[20px]">
        <AnimatePresence mode="popLayout" initial={false}>
          {!isHovered ? (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -30, filter: 'blur(4px)' }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex items-center gap-3"
            >
              <Image
                src="/icon-information.svg"
                alt=""
                width={13}
                height={13}
                className="flex-shrink-0"
              />
              <span className="font-mono text-sm text-gray-900 whitespace-nowrap">
                {currentPage.name}
                {isSubPage && (
                  <>
                    <span className="text-gray-400 mx-2">—</span>
                    <span className="text-gray-600">{currentPage.subtitle}</span>
                  </>
                )}
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -30, filter: 'blur(4px)' }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex items-center gap-6"
            >
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`font-mono text-sm transition-colors whitespace-nowrap ${
                    pathname === item.href ||
                    (item.name === 'Photos' && pathname.startsWith('/photos')) ||
                    (item.name === 'Craft' && pathname.startsWith('/craft')) ||
                    (item.name === 'Writing' && pathname.startsWith('/writing'))
                      ? 'text-gray-900'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
