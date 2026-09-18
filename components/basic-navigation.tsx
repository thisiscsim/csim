'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';

export function BasicNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const isHomePage = pathname === '/';

  const navItems = [
    { id: 'writing', label: 'Writing', href: '/writing' },
    { id: 'photos', label: 'Photos', href: '/photos' },
  ];

  const isActive = (id: string) => {
    if (id === 'photos') return pathname.startsWith('/photos');
    if (id === 'writing') return pathname.startsWith('/writing');
    return false;
  };

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

  const getNavItemClasses = (id: string) => {
    const active = isActive(id);
    const isHovered = hoveredItem === id;

    if (isHomePage) {
      if (isHovered) return 'fg-subtle';
      return 'fg-base';
    } else {
      if (active) return 'fg-base';
      if (isHovered) return 'fg-subtle';
      return 'fg-muted';
    }
  };

  return (
    <motion.nav
      className="pointer-events-auto fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-[20px] py-[16px] md:px-[32px] md:py-[24px]"
      initial={isHomePage ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        delay: isHomePage ? 0.45 : 0,
      }}
    >
      {/* Left: Avatar */}
      <button
        onClick={() => router.push('/')}
        type="button"
        className="flex items-center justify-center rounded-[6px] hover:opacity-80 transition-opacity duration-200 cursor-pointer overflow-hidden shrink-0"
        style={{ width: '32px', height: '32px' }}
        aria-label="Go to homepage"
      >
        <Image src="/avatar.svg" alt="Avatar" width={32} height={32} className="rounded-[6px]" />
      </button>

      {/* Right: Navigation Items */}
      <div className="flex items-center">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => router.push(item.href)}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            type="button"
            className={`flex h-[22px] cursor-pointer items-center justify-center rounded-[4px] font-normal transition-colors duration-200 ${getNavItemClasses(item.id)}`}
            style={{
              fontSize: '14px',
              lineHeight: '14px',
              padding: '6px 10px',
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </motion.nav>
  );
}
