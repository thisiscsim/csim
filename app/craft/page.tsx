'use client';
import { motion } from 'motion/react';

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

const TRANSITION_SECTION = {
  duration: 0.3,
};

// Generate random heights for masonry items
const generateMasonryItems = () => {
  const heights = [200, 300, 250, 400, 320, 280, 350, 240, 380, 260, 340, 290];
  return heights.map((height, index) => ({
    id: index,
    height: height,
  }));
};

export default function CraftPage() {
  const masonryItems = generateMasonryItems();

  return (
    <motion.main
      className="space-y-24"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="w-full"
      >
        {/* Masonry Grid Container */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {masonryItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="mb-4 break-inside-avoid"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
              }}
            >
              <div
                className="w-full bg-zinc-700 rounded-lg"
                style={{ height: `${item.height}px` }}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.main>
  );
}
