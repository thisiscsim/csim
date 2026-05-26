'use client';

import { useEffect, useState } from 'react';
import PhotoRoll from './photo-roll';
import PhotoGrid from './photo-grid';
import '../craft/system.css';
import type { PhotoImage } from '@/lib/photos';

type ViewMode = 'strip' | 'grid';
const MOBILE_QUERY = '(max-width: 767px)';

interface PhotosClientProps {
  initialImages: PhotoImage[];
}

export default function PhotosClient({ initialImages }: PhotosClientProps) {
  const [isReady, setIsReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('strip');

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_QUERY);

    const syncViewport = () => {
      const nextIsMobile = mediaQuery.matches;

      setIsMobile(nextIsMobile);
      setViewMode((currentViewMode) => (nextIsMobile ? 'grid' : currentViewMode));
      setIsReady(true);
    };

    syncViewport();
    mediaQuery.addEventListener('change', syncViewport);
    return () => mediaQuery.removeEventListener('change', syncViewport);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const key = e.key.toLowerCase();
      if (key === 's' && !isMobile) setViewMode('strip');
      if (key === 'g') setViewMode('grid');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobile]);

  if (!isReady) {
    return (
      <>
        <div className="top-blur" />
        <div className="fixed inset-0 bg-base transition-colors duration-300" />
      </>
    );
  }

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
