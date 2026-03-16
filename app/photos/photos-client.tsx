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

  // Keyboard shortcuts for view mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const key = e.key.toLowerCase();
      if (key === 's') setViewMode('strip');
      if (key === 'g') setViewMode('grid');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <div className="top-blur" />

      {viewMode === 'strip' ? (
        <PhotoRoll initialImages={initialImages} />
      ) : (
        <PhotoGrid initialImages={initialImages} />
      )}

      {/* View Mode Toggle - Hidden on mobile, positioned at bottom right */}
      {!isMobile && (
        <div
          className="fixed bottom-4 right-8 z-50 flex gap-4 text-xs pointer-events-auto"
          style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
        >
          <button
            onClick={() => setViewMode('strip')}
            className={`cursor-pointer transition-colors duration-300 ${
              viewMode === 'strip' ? 'fg-base' : 'fg-muted hover:fg-subtle'
            }`}
          >
            [S] STRIP
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`cursor-pointer transition-colors duration-300 ${
              viewMode === 'grid' ? 'fg-base' : 'fg-muted hover:fg-subtle'
            }`}
          >
            [G] GRID
          </button>
        </div>
      )}
    </>
  );
}
