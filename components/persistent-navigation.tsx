'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
    info: pathname.startsWith('/info'),
    craft: pathname.startsWith('/craft'),
    photos: pathname.startsWith('/photos'),
    writing: pathname.startsWith('/writing'),
  });

  const [hoveredBlogPost, setHoveredBlogPost] = useState<string | null>(null);
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  // Update expanded sections when pathname changes
  useEffect(() => {
    setExpandedSections({
      info: pathname.startsWith('/info'),
      craft: pathname.startsWith('/craft'),
      photos: pathname.startsWith('/photos'),
      writing: pathname.startsWith('/writing'),
    });
  }, [pathname]);

  const handleCraftClick = useCallback(() => {
    router.push('/craft');
  }, [router]);

  const handlePhotosClick = useCallback(() => {
    router.push('/photos');
  }, [router]);

  const handleWritingClick = useCallback(() => {
    // Navigate to the first blog post if available
    if (blogPosts.length > 0) {
      router.push(`/writing/${blogPosts[0].slug}`);
    } else {
      router.push('/writing');
    }
  }, [router, blogPosts]);

  const handleInfoClick = useCallback(() => {
    router.push('/info');
  }, [router]);

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
        info: false,
        craft: false,
        photos: false,
        writing: false,
        [section]: true,
      };
    });
  };

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Only trigger if not typing in an input or textarea
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      const key = event.key.toLowerCase();
      switch (key) {
        case 'i':
          setPressedKey('i');
          handleInfoClick();
          break;
        case 'c':
          setPressedKey('c');
          handleCraftClick();
          break;
        case 'p':
          setPressedKey('p');
          handlePhotosClick();
          break;
        case 'w':
          setPressedKey('w');
          handleWritingClick();
          break;
      }
    };

    const handleKeyUp = () => {
      setPressedKey(null);
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleInfoClick, handleCraftClick, handlePhotosClick, handleWritingClick]);

  return (
    <div className="w-full bg-base rounded-lg p-6 transition-colors duration-300">
      {/* INFO Section */}
      <div>
        <div className="w-full py-3 flex items-center justify-between text-left font-mono text-sm fg-base transition-colors duration-300 border-b-2 border-dotted border-base">
          <button
            onClick={handleInfoClick}
            className="flex-1 flex items-center gap-3 text-left cursor-pointer group"
          >
            <Image
              src="/flower.svg"
              alt=""
              width={12}
              height={12}
              className={pathname.startsWith('/info') ? '' : 'grayscale opacity-40'}
            />
            <span className="fg-base uppercase tracking-wider transition-colors duration-300">
              INFO
            </span>
          </button>
          <button
            onClick={() => toggleSection('info')}
            className={`w-[18px] h-[18px] px-1 flex items-center justify-center text-[11px] fg-muted rounded-[5px] border border-base font-sans hover:bg-interactive hover:fg-base transition-colors duration-300 cursor-pointer ${
              pressedKey === 'i' ? 'bg-interactive fg-base' : ''
            }`}
          >
            I
          </button>
        </div>
        <AnimatePresence>
          {expandedSections.info && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-4 pb-2 pl-6 font-mono text-sm fg-muted transition-colors duration-300">
                <p className="text-sm/5 fg-subtle transition-colors duration-300">
                  I&apos;m Christopher Sim, a software designer at Harvey. I work on the
                  intersection of design and engineering. Previously, I&apos;ve worked with teams at
                  Flexport, Uber, and Arc. I studied Human-Computer Interaction at the University of
                  Washington.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CRAFT section */}
      <div>
        <div className="w-full py-3 flex items-center justify-between text-left font-mono text-sm fg-base transition-colors duration-300 border-b-2 border-dotted border-base">
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
            <span className="fg-base transition-colors duration-300">CRAFT</span>
          </button>
          <button
            onClick={() => toggleSection('craft')}
            className={`w-[18px] h-[18px] px-1 flex items-center justify-center text-[11px] fg-muted rounded-[5px] border border-base font-sans hover:bg-interactive hover:fg-base transition-colors duration-300 cursor-pointer ${
              pressedKey === 'c' ? 'bg-interactive fg-base' : ''
            }`}
          >
            C
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
              <div className="pt-4 pb-2 pl-6 font-mono text-sm fg-muted transition-colors duration-300">
                <p className="text-sm/5 fg-subtle transition-colors duration-300">
                  A collection of creative experiments, side projects, and visual explorations. This
                  is where I play with new ideas and push creative boundaries outside of my
                  day-to-day work.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* PHOTOS section */}
      <div>
        <div className="w-full py-3 flex items-center justify-between text-left font-mono text-sm fg-base transition-colors duration-300 border-b-2 border-dotted border-base">
          <button
            onClick={handlePhotosClick}
            className="flex-1 flex items-center gap-3 text-left cursor-pointer group"
          >
            <Image
              src="/photo.svg"
              alt=""
              width={12}
              height={12}
              className={
                pathname.startsWith('/photos')
                  ? 'brightness-0 saturate-100'
                  : 'grayscale opacity-40'
              }
              style={
                pathname.startsWith('/photos')
                  ? {
                      filter:
                        'invert(24%) sepia(76%) saturate(1431%) hue-rotate(329deg) brightness(88%) contrast(91%)',
                    }
                  : {}
              }
            />
            <span className="fg-base transition-colors duration-300">PHOTOS</span>
          </button>
          <button
            onClick={() => toggleSection('photos')}
            className={`w-[18px] h-[18px] px-1 flex items-center justify-center text-[11px] fg-muted rounded-[5px] border border-base font-sans hover:bg-interactive hover:fg-base transition-colors duration-300 cursor-pointer ${
              pressedKey === 'p' ? 'bg-interactive fg-base' : ''
            }`}
          >
            P
          </button>
        </div>
        <AnimatePresence>
          {expandedSections.photos && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-4 pb-2 pl-6 font-mono text-sm fg-muted transition-colors duration-300">
                <p className="text-sm/5 fg-subtle transition-colors duration-300">
                  I&apos;m a amatuer photographer, most of my inspiration comes from nature, who I
                  believe is the best designer. Here are some of my favorite shots from my travels.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* WRITING section */}
      <div>
        <div className="w-full py-3 flex items-center justify-between text-left font-mono text-sm fg-base transition-colors duration-300 border-b-2 border-dotted border-base">
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
            <span className="fg-base transition-colors duration-300">WRITING</span>
          </button>
          <button
            onClick={() => toggleSection('writing')}
            className={`w-[18px] h-[18px] px-1 flex items-center justify-center text-[11px] fg-muted rounded-[5px] border border-base font-sans hover:bg-interactive hover:fg-base transition-colors duration-300 cursor-pointer ${
              pressedKey === 'w' ? 'bg-interactive fg-base' : ''
            }`}
          >
            W
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
              <div className="pt-4 pb-2 pl-6 font-mono text-sm fg-muted transition-colors duration-300">
                <p className="text-sm/5 fg-subtle transition-colors duration-300">
                  Infrequent thoughts on design, tech, relationships, geopolitics, society, and the
                  future. I use Notion as the CMS, and the list here updates automatically through
                  Notion&apos;s API.
                </p>
              </div>

              <div className="pt-4 pb-2 pl-6 font-mono text-sm fg-muted transition-colors duration-300">
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
                                <span className="w-6 fg-base transition-colors duration-300">
                                  {pathname === `/writing/${post.slug}` ? '•' : ''}
                                </span>
                                <div className="flex-1 flex items-center justify-between gap-4 min-w-0">
                                  <div className="font-medium fg-base truncate min-w-0 transition-colors duration-300">
                                    {post.title}
                                  </div>
                                  <div className="text-sm font-medium fg-base whitespace-nowrap shrink-0 transition-colors duration-300">
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
                    <p className="text-sm fg-muted ml-6 transition-colors duration-300">
                      No blog posts yet.
                    </p>
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
