'use client';

import { usePathname, useRouter } from 'next/navigation';
import { AnimatedBackground } from '@/components/ui/animated-background';
import { useEffect } from 'react';

export function CompactNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  // Removed shortcuts state as they are not in the example
  // const [pressedKey, setPressedKey] = useState<string | null>(null);

  const navItems = [
    { id: 'info', label: 'Info', href: '/info' },
    { id: 'photos', label: 'Photos', href: '/photos' },
    // { id: 'craft', label: 'Craft', href: '/craft' }, // Temporarily removed
    { id: 'writing', label: 'Writing', href: '/writing' },
  ];

  // Determine active item based on pathname
  const getActiveId = () => {
    if (pathname.startsWith('/info')) return 'info';
    if (pathname.startsWith('/photos')) return 'photos';
    // if (pathname.startsWith('/craft')) return 'craft'; // Temporarily removed
    if (pathname.startsWith('/writing')) return 'writing';
    return 'info';
  };

  // Add keyboard shortcuts logic (kept functionality, hidden UI)
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
        // case 'c': // Temporarily removed
        //   router.push('/craft');
        //   break;
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

  const handleValueChange = (newActiveId: string | null) => {
    if (!newActiveId) return;
    const item = navItems.find((item) => item.id === newActiveId);
    if (item) {
      router.push(item.href);
    }
  };

  return (
    <div
      className="fixed left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      style={{ top: '32px' }}
    >
      <div className="flex flex-row pointer-events-auto">
        <AnimatedBackground
          defaultValue={getActiveId()}
          onValueChange={handleValueChange}
          className="rounded-full bg-interactive transition-colors duration-300"
          transition={{
            type: 'spring',
            bounce: 0.2,
            duration: 0.3,
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              data-id={item.id}
              type="button"
              className="px-[10px] py-[6px] font-medium fg-muted transition-colors duration-300 hover:fg-base data-[checked=true]:fg-base cursor-pointer"
              style={{
                fontSize: '12px',
                lineHeight: '10px',
              }}
            >
              {item.label}
            </button>
          ))}
        </AnimatedBackground>
      </div>
    </div>
  );
}
