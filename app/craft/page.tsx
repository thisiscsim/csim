'use client';

import ScrollStrip from './scroll-strip';
import InfiniteGrid from './infinite-grid';
import './system.css';
import { AnimatedBackground } from '@/components/ui/animated-background';
import { useState } from 'react';

export default function CraftPage() {
  const [view, setView] = useState<'strip' | 'grid'>('strip');

  return (
    <>
      {/* Fixed segmented control in the top-right corner */}
      <div className="fixed top-4 right-4 z-50">
        <AnimatedBackground
          defaultValue={view}
          onValueChange={(val) => {
            if (val === 'strip' || val === 'grid') setView(val);
          }}
          className="rounded-md bg-white/80 backdrop-blur px-1 py-1 shadow border border-gray-200"
          enableHover={false}
        >
          <button
            type="button"
            data-id="strip"
            className="relative px-3 py-1.5 text-xs font-mono text-gray-800 cursor-pointer hover:text-gray-900"
            onClick={() => setView('strip')}
          >
            Scroll Strip
          </button>
          <button
            type="button"
            data-id="grid"
            className="relative px-3 py-1.5 text-xs font-mono text-gray-800 cursor-pointer hover:text-gray-900"
            onClick={() => setView('grid')}
          >
            Infinite Grid
          </button>
        </AnimatedBackground>
      </div>

      {view === 'strip' ? <ScrollStrip /> : <InfiniteGrid />}
    </>
  );
}
