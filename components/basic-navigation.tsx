'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export function BasicNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: 'info', label: 'Info', href: '/info' },
    { id: 'photos', label: 'Photos', href: '/photos' },
    { id: 'writing', label: 'Writing', href: '/writing' },
  ];

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

  // Detect scroll for backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      style={{ top: '32px' }}
    >
      <div className="flex flex-row items-center pointer-events-auto gap-[4px]">
        {/* Avatar */}
        <button
          onClick={() => router.push('/')}
          type="button"
          className={`flex items-center justify-center rounded-[3px] bg-interactive hover:opacity-80 transition-all duration-300 cursor-pointer ${
            isScrolled ? 'backdrop-blur-lg' : ''
          }`}
          style={{ width: '22px', height: '22px' }}
        >
          <Image src="/avatar.svg" alt="Avatar" width={22} height={22} className="rounded-[3px]" />
        </button>

        {/* Navigation Items */}
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => router.push(item.href)}
            type="button"
            className={`px-[10px] py-[6px] font-medium bg-interactive hover:opacity-80 transition-all duration-300 rounded-[3px] cursor-pointer ${
              isScrolled ? 'backdrop-blur-lg' : ''
            } ${isActive(item.id) ? 'fg-base' : 'fg-muted'}`}
            style={{
              fontSize: '12px',
              lineHeight: '10px',
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
