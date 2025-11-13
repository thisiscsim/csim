'use client';

import { motion } from 'motion/react';

// Create item animation with custom delay for waterfall effect (left to right)
const createItemVariants = (columnIndex: number, positionInColumn: number) => ({
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      // Waterfall: base delay + column offset + position in column
      delay: 0.4 + columnIndex * 0.15 + positionInColumn * 0.05,
    },
  },
});

export default function MasonryGrid() {
  const getAspectRatioClass = (aspectRatio: string) => {
    switch (aspectRatio) {
      case 'landscape':
        return 'aspect-[5/4]'; // 5:4 ratio
      case 'portrait':
        return 'aspect-[4/5]'; // 4:5 ratio (taller)
      case 'wide':
        return 'aspect-[3/2]'; // 3:2 ratio
      default:
        return 'aspect-[5/4]'; // default landscape
    }
  };

  // Generate items with craft images
  const craftImages = Array.from({ length: 9 }, (_, i) => `/craft/${i + 1}.jpg`);
  const aspectRatios = [
    'landscape',
    'portrait',
    'wide',
    'landscape',
    'portrait',
    'wide',
    'landscape',
    'portrait',
    'landscape',
  ];

  // Create all items first
  const allItems = [];
  for (let i = 0; i < 30; i++) {
    const imageUrl = craftImages[i % craftImages.length];
    const aspectRatio = aspectRatios[i % aspectRatios.length];
    const columnIndex = i % 3;
    allItems.push({ imageUrl, aspectRatio, index: i, columnIndex });
  }

  // Group items by column for layout and track position in column
  const columns = [[], [], []] as Array<Array<(typeof allItems)[0] & { positionInColumn: number }>>;
  allItems.forEach((item) => {
    const positionInColumn = columns[item.columnIndex].length;
    columns[item.columnIndex].push({ ...item, positionInColumn });
  });

  return (
    <div
      className="min-h-screen bg-[#fafafa] pt-[78px] pb-2"
      style={{
        width: '100vw',
        paddingLeft: '8px',
        paddingRight: '8px',
        boxSizing: 'border-box',
      }}
    >
      <div className="flex gap-2 w-full">
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="flex-1 flex flex-col gap-2">
            {column.map((item) => {
              const aspectClass = getAspectRatioClass(item.aspectRatio);
              return (
                <motion.div
                  key={item.index}
                  className="w-full"
                  initial="hidden"
                  animate="visible"
                  variants={createItemVariants(colIndex, item.positionInColumn)}
                >
                  <div
                    className={`w-full ${aspectClass} overflow-hidden bg-[#e5e5e5] rounded-md relative`}
                  >
                    <img
                      src={item.imageUrl}
                      alt={`Craft ${item.index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'rgba(0,0,0,0.2)',
                        maskImage: 'linear-gradient(to top, black 50%, transparent)',
                        WebkitMaskImage: 'linear-gradient(to top, black 50%, transparent)',
                      }}
                    >
                      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between gap-2">
                        <h3 className="text-sm font-medium text-white font-mono">Project Title</h3>
                        <p className="text-sm text-white/80 font-mono">Month 2024</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
