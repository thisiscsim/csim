'use client';

import { useState, useEffect } from 'react';
import PhotoRoll from './photo-roll';
import PhotoGrid from './photo-grid';
import '../craft/system.css';

type ViewMode = 'strip' | 'grid';

export default function PhotosPage() {
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

  return (
    <>
      {viewMode === 'strip' ? <PhotoRoll /> : <PhotoGrid />}

      {/* View Mode Toggle - Hidden on mobile */}
      {!isMobile && (
        <div
          className="fixed top-3 right-3 z-10 flex gap-2 text-black/60 text-xs"
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
