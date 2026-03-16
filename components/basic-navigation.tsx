'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';

export function BasicNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Check if we're on the homepage
  const isHomePage = pathname === '/';

  const navItems = [
    { id: 'writing', label: 'Writing', href: '/writing' },
    { id: 'photos', label: 'Photos', href: '/photos' },
  ];

  // Determine active item based on pathname
  const isActive = (id: string) => {
    if (id === 'photos') return pathname.startsWith('/photos');
    if (id === 'writing') return pathname.startsWith('/writing');
    return false;
  };

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      const key = event.key.toLowerCase();
      switch (key) {
        case 'p':
          router.push('/photos');
          break;
        case 'w':
          router.push('/writing');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [router]);

  // Get text color classes based on state
  const getNavItemClasses = (id: string) => {
    const active = isActive(id);
    const isHovered = hoveredItem === id;

    if (isHomePage) {
      // On homepage: all items white, with hover state
      if (isHovered) {
        return 'fg-subtle';
      }
      return 'fg-base';
    } else {
      // On sub-pages: active item white, others dimmed
      if (active) {
        return 'fg-base';
      }
      if (isHovered) {
        return 'fg-subtle';
      }
      return 'fg-muted';
    }
  };

  return (
    <motion.nav
      className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between pointer-events-auto"
      style={{
        paddingLeft: '32px',
        paddingRight: '32px',
        paddingTop: '24px',
        paddingBottom: '24px',
      }}
      initial={isHomePage ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        delay: isHomePage ? 0.45 : 0,
      }}
    >
      {/* Left: Avatar (150px container) */}
      <div className="flex items-start shrink-0" style={{ width: 150 }}>
        <button
          onClick={() => router.push('/')}
          type="button"
          className="flex items-center justify-center rounded-[6px] hover:opacity-80 transition-opacity duration-200 cursor-pointer overflow-hidden shrink-0"
          style={{ width: '32px', height: '32px' }}
          aria-label="Go to homepage"
        >
          <Image src="/avatar.svg" alt="Avatar" width={32} height={32} className="rounded-[6px]" />
        </button>
      </div>

      {/* Center: Navigation Items */}
      <div className="flex items-center shrink-0">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => router.push(item.href)}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            type="button"
            className={`font-normal transition-colors duration-200 cursor-pointer ${getNavItemClasses(item.id)}`}
            style={{
              fontSize: '13px',
              lineHeight: 'normal',
              padding: '6px 10px',
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Right: Location (150px container, justify-end) */}
      <div className="flex items-center justify-end shrink-0" style={{ width: 150 }}>
        <span className="fg-base" style={{ fontSize: '13px', lineHeight: 'normal' }}>
          San Francisco, CA
        </span>
      </div>
    </motion.nav>
  );
}
