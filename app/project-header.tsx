'use client';

import Link from 'next/link';
import Image from 'next/image';
import { X } from 'lucide-react';

export function ProjectHeader() {
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
        <Link
          href="/"
          className="group rounded-lg bg-zinc-100 px-2 py-1 transition-all duration-300 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          aria-label="Close and return to home"
        >
          <X className="h-4 w-4 text-zinc-600 transition-colors duration-300 dark:text-zinc-400" />
        </Link>
      </nav>
    </header>
  );
}
