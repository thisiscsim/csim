'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Image from 'next/image';

function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-9 w-9 rounded-full bg-zinc-100 dark:bg-zinc-800" />;
  }

  const toggleTheme = () => {
    if (theme === 'system') {
      // If on system, switch to the opposite of current resolved theme
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    } else if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  // Show the rotation based on resolved theme
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="group relative h-6 w-6 rounded-full transition-all duration-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
      type="button"
      aria-label={`Switch theme (currently ${isDark ? 'dark' : 'light'})`}
    >
      <div className="relative h-full w-full flex items-center justify-center">
        <div
          className={`transition-all duration-500 ease-in-out ${
            isDark ? 'rotate-[225deg]' : 'rotate-45'
          }`}
        >
          <Image
            src="/half-circle.svg"
            alt="Theme toggle"
            width={16}
            height={16}
            className="dark:invert"
          />
        </div>
      </div>
    </button>
  );
}

export function Footer() {
  return (
    <footer className="mt-16 px-0 py-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500">Made with care and gusto from Oakland, CA.</p>
        <div className="text-xs text-zinc-400">
          <ThemeSwitch />
        </div>
      </div>
    </footer>
  );
}
