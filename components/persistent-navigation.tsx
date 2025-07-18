'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECT_GROUPS } from '@/app/data';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import type { NotionBlogPost } from '@/lib/notion/blog';
import Image from 'next/image';

interface PersistentNavigationProps {
  blogPosts?: NotionBlogPost[];
}

export function PersistentNavigation({ blogPosts = [] }: PersistentNavigationProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    index: pathname === '/',
    craft: pathname.startsWith('/craft'),
    writing: pathname.startsWith('/writing'),
  });

  const [activeCompany, setActiveCompany] = useState<string | null>(null);
  const [hoveredBlogPost, setHoveredBlogPost] = useState<string | null>(null);

  // Update expanded sections when pathname changes
  useEffect(() => {
    setExpandedSections({
      index: pathname === '/',
      craft: pathname.startsWith('/craft'),
      writing: pathname.startsWith('/writing'),
    });
  }, [pathname]);

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Only trigger if not typing in an input or textarea
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case 'h':
          handleIndexClick();
          break;
        case 'c':
          handleCraftClick();
          break;
        case 'w':
          handleWritingClick();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [blogPosts]); // Add blogPosts as dependency since handleWritingClick uses it

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      // If the clicked section is already open, close it
      if (prev[section]) {
        return {
          ...prev,
          [section]: false,
        };
      }

      // Otherwise, close all sections and open the clicked one
      return {
        index: false,
        craft: false,
        writing: false,
        [section]: true,
      };
    });
  };

  const handleCraftClick = () => {
    router.push('/craft');
  };

  const handleWritingClick = () => {
    // Navigate to the first blog post if available
    if (blogPosts.length > 0) {
      router.push(`/writing/${blogPosts[0].slug}`);
    } else {
      router.push('/writing');
    }
  };

  const handleIndexClick = () => {
    router.push('/');
  };

  const scrollToCompany = (companyId: string) => {
    if (pathname !== '/') {
      // If not on homepage, navigate to homepage first
      router.push('/');
      return;
    }

    // Use global refs from homepage
    const companyRefs = window.companyRefs;
    if (companyRefs) {
      const element = companyRefs.current[companyId];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Set up intersection observer for scroll-based highlighting (only on homepage)
  useEffect(() => {
    if (pathname !== '/') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCompany(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -70% 0px',
      }
    );

    // Use global refs from homepage
    const companyRefs = window.companyRefs;
    if (companyRefs) {
      Object.values(companyRefs.current).forEach((ref) => {
        if (ref) observer.observe(ref);
      });
    }

    return () => {
      if (companyRefs) {
        Object.values(companyRefs.current).forEach((ref) => {
          if (ref) observer.unobserve(ref);
        });
      }
    };
  }, [pathname]);

  return (
    <div className="w-full bg-white rounded-lg p-6">
      {/* Force light mode styles */}
      <style jsx global>{`
        .dotted-border {
          border-bottom: 2px dotted #d1d5db;
        }
        /* Berkeley Mono override */
        .font-mono {
          font-family: var(--font-berkeley-mono), monospace !important;
        }
      `}</style>

      {/* INDEX Section */}
      <div>
        <div className="w-full py-3 flex items-center justify-between text-left font-mono text-sm text-gray-900 transition-colors dotted-border hover:bg-gray-50">
          <button
            onClick={handleIndexClick}
            className="flex-1 flex items-center gap-3 text-left cursor-pointer group"
          >
            <Image
              src="/flower.svg"
              alt=""
              width={12}
              height={12}
              className={pathname === '/' ? '' : 'grayscale opacity-40'}
            />
            <span className="text-gray-900 uppercase tracking-wider">INDEX</span>
            <span className="text-xs text-gray-400 group-hover:text-gray-600">H</span>
          </button>
          <button
            onClick={() => toggleSection('index')}
            className="text-gray-400 hover:text-gray-600 px-2 cursor-pointer"
          >
            {expandedSections.index ? '−' : '+'}
          </button>
        </div>
        <AnimatePresence>
          {expandedSections.index && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-4 pb-2 pl-6 font-mono text-sm text-gray-600">
                <p className="text-sm leading-snug text-gray-700 mb-4">
                  I&apos;m Christopher Sim, a software designer at Harvey. I work on the
                  intersection of design and engineering. Previously, I&apos;ve worked with teams at
                  Flexport, Uber, and Arc. I studied Human-Computer Interaction at the University of
                  Washington.
                </p>

                {/* Project list moved here */}
                <div className="space-y-4 -ml-6">
                  {PROJECT_GROUPS.map((group, groupIdx) => {
                    const isActive = activeCompany === `company-${groupIdx}`;
                    return (
                      <div key={groupIdx}>
                        <button
                          onClick={() => scrollToCompany(`company-${groupIdx}`)}
                          className="block w-full text-left transition-all hover:opacity-80 cursor-pointer"
                        >
                          <div className="flex items-center">
                            <span className="w-6 text-gray-900">{isActive ? '•' : ''}</span>
                            <div className="flex-1 flex items-center justify-between">
                              <div className="font-medium text-gray-900">{group.company}</div>
                              <div className="text-sm font-medium text-gray-900">
                                {`${group.start} - ${group.end}`}
                              </div>
                            </div>
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CRAFT section */}
      <div>
        <div className="w-full py-3 flex items-center justify-between text-left font-mono text-sm text-gray-900 transition-colors dotted-border hover:bg-gray-50">
          <button
            onClick={handleCraftClick}
            className="flex-1 flex items-center gap-3 text-left cursor-pointer group"
          >
            <Image
              src="/star.svg"
              alt=""
              width={12}
              height={12}
              className={
                pathname.startsWith('/craft') ? 'brightness-0 saturate-100' : 'grayscale opacity-40'
              }
              style={
                pathname.startsWith('/craft')
                  ? {
                      filter:
                        'invert(24%) sepia(76%) saturate(1431%) hue-rotate(329deg) brightness(88%) contrast(91%)',
                    }
                  : {}
              }
            />
            <span className="text-gray-900">CRAFT</span>
            <span className="text-xs text-gray-400 group-hover:text-gray-600">C</span>
          </button>
          <button
            onClick={() => toggleSection('craft')}
            className="text-gray-400 hover:text-gray-600 px-2 cursor-pointer"
          >
            {expandedSections.craft ? '−' : '+'}
          </button>
        </div>
        <AnimatePresence>
          {expandedSections.craft && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-4 pb-2 pl-6 font-mono text-sm text-gray-600">
                <p className="text-sm leading-snug text-gray-700">
                  A collection of creative experiments, side projects, and visual explorations. This
                  is where I play with new ideas and push creative boundaries outside of my
                  day-to-day product design work.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* WRITING section */}
      <div>
        <div className="w-full py-3 flex items-center justify-between text-left font-mono text-sm text-gray-900 transition-colors dotted-border hover:bg-gray-50">
          <button
            onClick={handleWritingClick}
            className="flex-1 flex items-center gap-3 text-left cursor-pointer group"
          >
            <Image
              src="/feather.svg"
              alt=""
              width={12}
              height={12}
              className={
                pathname.startsWith('/writing')
                  ? 'brightness-0 saturate-100'
                  : 'grayscale opacity-40'
              }
              style={
                pathname.startsWith('/writing')
                  ? {
                      filter:
                        'invert(24%) sepia(76%) saturate(1431%) hue-rotate(329deg) brightness(88%) contrast(91%)',
                    }
                  : {}
              }
            />
            <span className="text-gray-900">WRITING</span>
            <span className="text-xs text-gray-400 group-hover:text-gray-600">W</span>
          </button>
          <button
            onClick={() => toggleSection('writing')}
            className="text-gray-400 hover:text-gray-600 px-2 cursor-pointer"
          >
            {expandedSections.writing ? '−' : '+'}
          </button>
        </div>
        <AnimatePresence>
          {expandedSections.writing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-4 pb-2 pl-6 font-mono text-sm text-gray-600">
                <p className="text-sm leading-snug text-gray-700">
                  Infrequent thoughts on design, tech, relationships, geopolitics, society, and the
                  future. I use Notion as the CMS, and the list here updates automatically through
                  Notion&apos;s API.
                </p>
              </div>

              <div className="pt-4 pb-2 pl-6 font-mono text-sm text-gray-600">
                <div className="space-y-4 -ml-6">
                  {blogPosts.length > 0 ? (
                    <div className="relative">
                      {/* Blog post list */}
                      <div className="space-y-2">
                        {blogPosts.map((post, idx) => (
                          <div key={idx} className="relative">
                            <Link
                              href={`/writing/${post.slug}`}
                              className={`block w-full text-left transition-all ${
                                hoveredBlogPost && hoveredBlogPost !== post.slug
                                  ? 'opacity-50'
                                  : 'opacity-100'
                              }`}
                              onMouseEnter={() => setHoveredBlogPost(post.slug)}
                              onMouseLeave={() => setHoveredBlogPost(null)}
                              onClick={() => {
                                // Immediate scroll reset
                                window.scrollTo(0, 0);
                                document.documentElement.scrollTop = 0;
                                document.body.scrollTop = 0;
                              }}
                            >
                              <div className="flex items-center">
                                <span className="w-6 text-gray-900">
                                  {pathname === `/writing/${post.slug}` ? '•' : ''}
                                </span>
                                <div className="flex-1 flex items-center justify-between gap-4 min-w-0">
                                  <div className="font-medium text-gray-900 truncate min-w-0">
                                    {post.title}
                                  </div>
                                  <div className="text-sm font-medium text-gray-900 whitespace-nowrap flex-shrink-0">
                                    {new Date(post.date)
                                      .toLocaleDateString('en-US', {
                                        month: '2-digit',
                                        day: '2-digit',
                                        year: '2-digit',
                                      })
                                      .replace(/\//g, '/')}
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 ml-6">No blog posts yet.</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
