'use client';

import { useState, useEffect } from 'react';
import PhotoRoll from './photo-roll';
import PhotoGrid from './photo-grid';
import '../craft/system.css';
import type { PhotoImage } from '@/lib/photos';

type ViewMode = 'strip' | 'grid';

interface PhotosClientProps {
  initialImages: PhotoImage[];
}

export default function PhotosClient({ initialImages }: PhotosClientProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('strip');
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Set initial view mode based on device
    if (window.innerWidth < 768) {
      setViewMode('grid');
    }

    // Listen for resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle scroll detection for gradient
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // Show top gradient when scrolled down from top
      setIsScrolled(scrollTop > 0);
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Blur Gradient Overlay */}
      <div
        className={`fixed top-0 left-0 right-0 pointer-events-none z-[45] transition-opacity duration-300 ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          height: '96px',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          opacity: 0.95,
          maskImage: 'linear-gradient(to bottom, black 25%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 25%, transparent)',
        }}
      />

      {viewMode === 'strip' ? (
        <PhotoRoll initialImages={initialImages} />
      ) : (
        <PhotoGrid initialImages={initialImages} />
      )}

      {/* View Mode Toggle - Hidden on mobile */}
      {!isMobile && (
        <div
          className="fixed top-3 right-3 z-50 flex gap-2 text-black/60 text-xs"
          style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
        >
          <button
            onClick={() => setViewMode('strip')}
            className={`transition-colors ${
              viewMode === 'strip' ? 'text-black' : 'text-black/40 hover:text-black/60'
            }`}
          >
            [S] STRIP
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`transition-colors ${
              viewMode === 'grid' ? 'text-black' : 'text-black/40 hover:text-black/60'
            }`}
          >
            [G] GRID
          </button>
        </div>
      )}
    </>
  );
}
