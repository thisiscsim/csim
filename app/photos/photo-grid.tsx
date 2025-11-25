'use client';

import React from 'react';
import { motion } from 'motion/react';
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogContainer,
} from '@/components/motion-primitives/morphing-dialog';

interface PhotoImage {
  url: string;
  name: string;
  size: number;
  lastModified: string;
}

export default function PhotoGrid() {
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

  // Fetch images from API
  React.useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/photos');
        const data = await response.json();
        if (data.images && data.images.length > 0) {
          // Randomize the order of images
          const randomizedImages = shuffleArray(data.images);
          setImages(randomizedImages);
        } else {
          console.error('No images found');
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-primary">
        <p className="text-black/60">Loading photos...</p>
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
                i < 30 ? `fadeInScale 0.5s ease-out ${Math.min(i * 0.015, 0.45)}s both` : 'none',
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
                  className="w-full transition-transform duration-200 group-hover:scale-[1.02]"
                  style={{ aspectRatio: '1 / 1' }}
                >
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover"
                    loading={i < 20 ? 'eager' : 'lazy'}
                    decoding="async"
                    style={{ display: 'block' }}
                  />
                </div>
              </MorphingDialogTrigger>
              <MorphingDialogContainer>
                <MorphingDialogContent className="relative flex items-center justify-center">
                  <div onClick={(e) => e.stopPropagation()}>
                    <img
                      src={image.url}
                      alt={image.name}
                      className="max-h-[90vh] max-w-[90vw] w-auto h-auto object-contain rounded-[4px]"
                      style={{ display: 'block' }}
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
