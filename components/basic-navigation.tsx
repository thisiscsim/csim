'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export function BasicNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems = [
    { id: 'info', label: 'Info', href: '/info' },
    { id: 'writing', label: 'Writing', href: '/writing' },
    { id: 'photos', label: 'Photos', href: '/photos' },
  ];

  // Check if we're on the homepage
  const isHomePage = pathname === '/';

  // Determine active item based on pathname
  const isActive = (id: string) => {
    if (id === 'info') return pathname.startsWith('/info');
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
        case 'i':
          router.push('/info');
          break;
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

  // Role text is always full brightness
  const getRoleTextClasses = () => {
    return 'fg-base';
  };

  return (
    <nav
      className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between pointer-events-auto"
      style={{
        paddingLeft: '32px',
        paddingRight: '32px',
        paddingTop: '24px',
        paddingBottom: '24px',
      }}
    >
      {/* Left: Avatar */}
      <button
        onClick={() => router.push('/')}
        type="button"
        className="flex items-center justify-center rounded-[4px] hover:opacity-80 transition-opacity duration-200 cursor-pointer overflow-hidden flex-shrink-0"
        style={{ width: '32px', height: '32px' }}
        aria-label="Go to homepage"
      >
        <Image src="/avatar.svg" alt="Avatar" width={32} height={32} className="rounded-[4px]" />
      </button>

      {/* Navigation Items - centered on desktop, right-aligned on mobile */}
      <div className="md:absolute md:left-1/2 md:-translate-x-1/2 flex items-center gap-5 ml-auto md:ml-0">
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
              lineHeight: '1.4',
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Right: Role - hidden on mobile */}
      <span
        className={`hidden md:block font-normal transition-colors duration-200 flex-shrink-0 ${getRoleTextClasses()}`}
        style={{
          fontSize: '13px',
          lineHeight: '1.4',
        }}
      >
        Software Designer
      </span>
    </nav>
  );
}
