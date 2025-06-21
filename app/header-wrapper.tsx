'use client';

import { usePathname } from 'next/navigation';
import { Header } from './header';

export function HeaderWrapper() {
  const pathname = usePathname();

  // Don't show the regular header on project pages
  if (pathname.startsWith('/projects/')) {
    return null;
  }

  return <Header />;
}
