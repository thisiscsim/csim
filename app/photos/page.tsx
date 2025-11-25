'use client';

import { useState } from 'react';
import PhotoRoll from './photo-roll';
import PhotoGrid from './photo-grid';
import '../craft/system.css';

type ViewMode = 'strip' | 'grid';

export default function PhotosPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('strip');

  return (
    <>
      {viewMode === 'strip' ? <PhotoRoll /> : <PhotoGrid />}

      {/* View Mode Toggle */}
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
    </>
  );
}
