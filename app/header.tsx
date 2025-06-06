'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function Header() {
  const router = useRouter();

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
    <header className="mb-8 flex items-center justify-between">
      <div>
        <Link
          href="/"
          className="block transform-gpu transition-all duration-300 ease-out hover:scale-120 hover:-rotate-8"
        >
          <Image src="/logo.svg" alt="Christopher Sim" width={24} height={24} priority />
        </Link>
      </div>
      <nav className="flex items-center space-x-6">
        <Link
          href="/craft"
          className="text-base text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          Craft
        </Link>
        <Link
          href="/writing"
          className="text-base text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          Writing
        </Link>
      </nav>
    </header>
  );
}
