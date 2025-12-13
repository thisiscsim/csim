'use client';

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogContainer,
} from '@/components/motion-primitives/morphing-dialog';
import type { PhotoImage } from '@/lib/photos';

interface PhotoGridProps {
  initialImages: PhotoImage[];
}

export default function PhotoGrid({ initialImages }: PhotoGridProps) {
  const [images, setImages] = React.useState<PhotoImage[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Add CSS animation
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInScale {
        from {
          opacity: 0;
          transform: scale(0.95);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Shuffle array using Fisher-Yates algorithm
  const shuffleArray = (array: PhotoImage[]): PhotoImage[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Use pre-fetched images
  React.useEffect(() => {
    if (initialImages && initialImages.length > 0) {
      // Randomize the order of images
      const randomizedImages = shuffleArray(initialImages);
      setImages(randomizedImages);
    }
    setLoading(false);
  }, [initialImages]);

  if (loading) {
    return (
      <div
        className="min-h-screen bg-primary"
        style={{
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          padding: '40px 32px',
        }}
      >
        <div
          className="grid gap-1"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          }}
        >
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="w-full bg-gray-100 animate-pulse"
              style={{ aspectRatio: '1 / 1' }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-primary">
        <p className="text-black/60">No photos found</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-primary"
      style={{
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        padding: '40px 32px',
      }}
    >
      <motion.div
        className="grid gap-1"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {images.map((image, i) => (
          <div
            key={`${image.name}-${i}`}
            style={{
              animation:
                i < 12 ? `fadeInScale 0.3s ease-out ${Math.min(i * 0.015, 0.18)}s both` : 'none',
            }}
          >
            <MorphingDialog
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
              }}
            >
              <MorphingDialogTrigger className="w-full block cursor-pointer group overflow-hidden focus:outline-none focus-visible:outline-none">
                <div
                  className="w-full relative transition-transform duration-200 group-hover:scale-[1.02]"
                  style={{ aspectRatio: '1 / 1' }}
                >
                  <Image
                    src={image.url}
                    alt={image.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover"
                    loading={i < 6 ? 'eager' : 'lazy'}
                    priority={i < 2}
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y1ZjVmNSIvPjwvc3ZnPg=="
                  />
                </div>
              </MorphingDialogTrigger>
              <MorphingDialogContainer>
                <MorphingDialogContent className="relative flex items-center justify-center">
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="relative max-h-[90vh] max-w-[90vw]"
                  >
                    <Image
                      src={image.url}
                      alt={image.name}
                      width={1600}
                      height={1600}
                      className="w-auto h-auto max-h-[90vh] max-w-[90vw] object-contain rounded-[4px]"
                      quality={90}
                      priority
                    />
                  </div>
                </MorphingDialogContent>
                <MorphingDialogClose
                  className="fixed inset-0 cursor-pointer focus:outline-none focus-visible:outline-none"
                  variants={{
                    initial: { opacity: 0 },
                    animate: {
                      opacity: 1,
                      transition: { delay: 0.3, duration: 0.1 },
                    },
                    exit: { opacity: 0, transition: { duration: 0 } },
                  }}
                />
              </MorphingDialogContainer>
            </MorphingDialog>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
