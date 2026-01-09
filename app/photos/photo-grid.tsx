'use client';

import React from 'react';
import { motion } from 'motion/react';
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogContainer,
  MorphingDialogImage,
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
        className="min-h-dvh bg-base transition-colors duration-300"
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
              className="w-full bg-interactive animate-pulse transition-colors duration-300"
              style={{ aspectRatio: '1 / 1' }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-base transition-colors duration-300">
        <p className="fg-muted transition-colors duration-300">No photos found</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-dvh bg-base transition-colors duration-300"
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
                type: 'spring',
                stiffness: 200,
                damping: 24,
              }}
            >
              <MorphingDialogTrigger className="w-full block cursor-pointer group overflow-hidden focus:outline-hidden focus-visible:outline-hidden">
                <div
                  className="w-full relative transition-transform duration-200 group-hover:scale-[1.02]"
                  style={{ aspectRatio: '1 / 1' }}
                >
                  <MorphingDialogImage
                    src={image.url}
                    alt={image.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </MorphingDialogTrigger>
              <MorphingDialogContainer>
                <MorphingDialogContent className="relative flex items-center justify-center">
                  <MorphingDialogImage
                    src={image.url}
                    alt={image.name}
                    className="max-h-[90vh] max-w-[90vw] w-auto h-auto object-contain rounded-[4px]"
                  />
                </MorphingDialogContent>
              </MorphingDialogContainer>
            </MorphingDialog>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
