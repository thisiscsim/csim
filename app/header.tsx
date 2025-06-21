'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatedBackground } from '@/components/ui/animated-background';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('Home');

  // Determine active tab based on current pathname
  const getActiveTab = () => {
    if (pathname === '/') return 'Home';
    if (pathname.startsWith('/craft')) return 'Craft';
    if (pathname.startsWith('/writing')) return 'Writing';
    return 'Home'; // Default to Home
  };

  const NAVIGATION_ITEMS = [
    { label: 'Home', href: '/' },
    { label: 'Craft', href: '/craft' },
    { label: 'Writing', href: '/writing' },
  ];

  // Update active tab when pathname changes
  useEffect(() => {
    setActiveTab(getActiveTab());
  }, [pathname]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Only trigger if not typing in an input or textarea
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case 'h':
          router.push('/');
          break;
        case 'c':
          router.push('/craft');
          break;
        case 'w':
          router.push('/writing');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [router]);

  return (
    <header className="mb-24 mt-6 flex items-center justify-between">
      <div>
        <Link
          href="/"
          className="block transform-gpu transition-all duration-300 ease-out hover:scale-120 hover:-rotate-8"
        >
          <Image src="/logo.svg" alt="Christopher Sim" width={24} height={24} priority />
        </Link>
      </div>
      <nav className="flex items-center">
        <AnimatedBackground
          defaultValue={activeTab}
          className="rounded-lg bg-zinc-100 dark:bg-zinc-800"
          transition={{
            type: 'spring',
            bounce: 0.2,
            duration: 0.3,
          }}
          enableHover={false}
          onValueChange={(value) => {
            if (value) setActiveTab(value);
          }}
        >
          {NAVIGATION_ITEMS.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              data-id={item.label}
              className={`px-2 py-1 text-sm text-zinc-600 transition-colors duration-300 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50 ${
                index > 0 ? 'ml-1' : ''
              }`}
              onClick={() => setActiveTab(item.label)}
            >
              {item.label}
            </Link>
          ))}
        </AnimatedBackground>
      </nav>
    </header>
  );
}
