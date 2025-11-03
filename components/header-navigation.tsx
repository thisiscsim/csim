'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import type { NotionBlogPost } from '@/lib/notion/blog';

interface HeaderNavigationProps {
  blogPosts?: NotionBlogPost[];
}

export function HeaderNavigation({ blogPosts = [] }: HeaderNavigationProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

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
    { name: 'Index', href: '/', key: 'I' },
    { name: 'Photos', href: '/photos', key: 'P' },
    { name: 'Craft', href: '/craft', key: 'C' },
    { name: 'Writing', href: '/writing', key: 'W' },
  ];

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
          setPressedKey('I');
          router.push('/');
          break;
        case 'c':
          setPressedKey('C');
          router.push('/craft');
          break;
        case 'p':
          setPressedKey('P');
          router.push('/photos');
          break;
        case 'w':
          setPressedKey('W');
          router.push('/writing');
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
  }, [router]);

  return (
    <motion.div
      className="fixed left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      style={{ top: '40px' }}
    >
      <div
        className="overflow-hidden h-[20px] pointer-events-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
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
              className="flex items-center cursor-pointer"
            >
              <span className="font-mono font-medium text-sm whitespace-nowrap flex items-center gap-2">
                <span className="text-gray-400 text-base">[ </span>
                <span className="flex items-center gap-2">
                  <span className="text-gray-900">{currentPage.name}</span>
                  <span
                    className={`flex cursor-default flex-col items-center justify-center border-[0.5px] border-b-2 font-mono leading-none h-4 w-4 text-[10px] transition-all ${
                      pressedKey === navItems.find((item) => item.name === currentPage.name)?.key
                        ? 'bg-gray-100 text-black border-gray-900'
                        : 'border-gray-900 hover:bg-gray-100 hover:text-black'
                    }`}
                  >
                    {navItems.find((item) => item.name === currentPage.name)?.key}
                  </span>
                </span>
                <span className="text-gray-400 text-base"> ]</span>
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
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.name === 'Photos' && pathname.startsWith('/photos')) ||
                  (item.name === 'Craft' && pathname.startsWith('/craft')) ||
                  (item.name === 'Writing' && pathname.startsWith('/writing'));
                const showBrackets = isActive || hoveredItem === item.name;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`font-mono font-medium text-sm transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                      isActive ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <span
                      className={`text-gray-400 text-base transition-opacity ${showBrackets ? 'opacity-100' : 'opacity-0'}`}
                    >
                      [{' '}
                    </span>
                    <span className="flex items-center gap-2">
                      {item.name}
                      <span
                        className={`flex cursor-default flex-col items-center justify-center border-[0.5px] border-b-2 font-mono leading-none h-4 w-4 text-[10px] transition-all ${
                          pressedKey === item.key
                            ? 'bg-gray-100 text-black border-gray-900'
                            : isActive
                              ? 'border-gray-900 hover:bg-gray-100 hover:text-black'
                              : 'border-gray-400 hover:bg-gray-100 hover:text-black'
                        }`}
                      >
                        {item.key}
                      </span>
                    </span>
                    <span
                      className={`text-gray-400 text-base transition-opacity ${showBrackets ? 'opacity-100' : 'opacity-0'}`}
                    >
                      {' '}
                      ]
                    </span>
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
