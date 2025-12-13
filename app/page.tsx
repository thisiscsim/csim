'use client';
import { useEffect, useState } from 'react';
import { PROJECTS } from './data';
import { motion } from 'motion/react';
import Image from 'next/image';

// Map project IDs to their static image fallbacks
function getProjectImageFallback(projectId: string, projectName: string): string {
  const imageMap: { [key: string]: string } = {
    // Exa projects
    'exa-search': '/temp-cover/placeholder_1.png',

    // Harvey projects
    'harvey-design-system': '/temp-cover/placeholder_1.png',
    'harvey-review-table': '/temp-cover/harvey-review-tables.png',
    'harvey-vault': '/temp-cover/placeholder_1.png',
    'harvey-2': '/temp-cover/harvey-file-event-log.png',
    'harvey-3': '/temp-cover/placeholder_1.png',
    'harvey-4': '/temp-cover/placeholder_1.png',
    'harvey-5': '/temp-cover/placeholder_1.png',
    'harvey-6': '/temp-cover/placeholder_1.png',
    'harvey-7': '/temp-cover/placeholder_1.png',

    // Arc projects
    'arc-1': '/temp-cover/arc-deposit.png',
    'arc-2': '/temp-cover/arc-billpay.png',
    'arc-3': '/temp-cover/arc-settings.png',
    'arc-4': '/temp-cover/placeholder_1.png',
    'arc-design-system': '/temp-cover/placeholder_1.png',
    'arc-onboarding': '/temp-cover/placeholder_1.png',

    // Flexport projects
    'flexport-1': '/temp-cover/flexport-teamview.png',

    // Uber projects
    'uber-1': '/temp-cover/uber-driver-onboarding.png',
  };

  // Special handling for projects
  if (projectName.includes('Moab')) {
    return '/temp-cover/moab.png';
  }
  if (projectName.includes('Amend')) {
    return '/temp-cover/amend.png';
  }

  return imageMap[projectId] || '/temp-cover/placeholder_1.png';
}

// Map aspect ratio to Tailwind classes
function getAspectRatioClass(aspectRatio?: string): string {
  switch (aspectRatio) {
    case 'portrait':
      return 'aspect-[4/5]';
    case 'wide':
      return 'aspect-[3/2]';
    case 'landscape':
    default:
      return 'aspect-[5/4]';
  }
}

// Animation variants for staggered effect - optimized for faster initial render
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1, // Reduced from 0.4s to 0.1s
      staggerChildren: 0.03, // Reduced from 0.05s to 0.03s
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 10, // Reduced from 20px to 10px for subtler, faster animation
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3, // Reduced from 0.5s to 0.3s
      ease: 'easeOut',
    },
  },
};

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll detection for gradient
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // Show top gradient when scrolled down from top
      setIsScrolled(scrollTop > 0);
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative mt-[70px]">
      {/* Top Blur Gradient Overlay */}
      <div
        className={`fixed top-0 left-0 right-0 pointer-events-none z-[45] transition-opacity duration-300 ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          height: '96px',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          opacity: 0.95,
          maskImage: 'linear-gradient(to bottom, black 25%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 25%, transparent)',
        }}
      />

      {/* Introduction Section */}
      <div className="w-full px-4 md:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <motion.h1
            className="text-[17px] leading-[26px] font-medium text-primary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut', delay: 0 }}
          >
            Christopher Sim
          </motion.h1>
          <motion.h2
            className="text-[17px] leading-[26px] text-secondary mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut', delay: 0.05 }}
          >
            Software designer based in San Francisco
          </motion.h2>

          <motion.div
            className="space-y-4 text-md text-secondary leading-relaxed max-w-3xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 }}
          >
            <p>
              Currently a software designer at{' '}
              <a
                href="https://harvey.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-[#C03540] hover:border-b hover:border-dotted hover:border-[#C03540] transition-colors"
              >
                Harvey
                <sup>1</sup>
              </a>
              , building the frontier agentic AI platform for legal and professional services.
              Previously, worked with teams at{' '}
              <a
                href="https://flexport.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-[#C03540] hover:border-b hover:border-dotted hover:border-[#C03540] transition-colors"
              >
                Flexport
                <sup>2</sup>
              </a>
              ,{' '}
              <a
                href="https://uber.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-[#C03540] hover:border-b hover:border-dotted hover:border-[#C03540] transition-colors"
              >
                Uber
                <sup>3</sup>
              </a>
              , and{' '}
              <a
                href="https://www.joinarc.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-[#C03540] hover:border-b hover:border-dotted hover:border-[#C03540] transition-colors"
              >
                Arc
                <sup>4</sup>
              </a>
              . In my free time, I&apos;m a design consultant for emerging software companies backed
              by top VCs.
            </p>
            <p>
              I love working on niche problems and simplifying complexities so people can focus on
              more valuable work. I received my master&apos;s in Human-Computer Interaction from the
              University of Washington.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Separator */}
      <div
        className="w-full px-4 md:px-6 lg:px-8"
        style={{ marginTop: '56px', marginBottom: '56px' }}
      >
        <div className="max-w-[1400px] mx-auto flex justify-center">
          <motion.div
            className="w-[40px] h-[1px] bg-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut', delay: 0.15 }}
          />
        </div>
      </div>

      {/* Projects */}
      <div className="w-full pb-32 px-4 md:px-6 lg:px-8">
        <motion.div
          className="space-y-16 max-w-[1400px] mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {PROJECTS.map((project, projectIdx) => {
            // Check if it's a real video URL (not the placeholder Cloudinary URL)
            const isPlaceholderVideo =
              project.media.includes('XSfIvT7BUWbPRXhrbLed') ||
              project.media.includes('ee6871c9-8400-49d2-8be9-e32675eabf7e');

            const isVideo =
              project.media &&
              !isPlaceholderVideo &&
              (project.media.includes('.mp4') ||
                project.media.includes('.webm') ||
                project.media.includes('.mov'));

            const mediaSrc = isPlaceholderVideo
              ? getProjectImageFallback(project.id, project.title)
              : project.media;

            const aspectRatioClass = getAspectRatioClass(project.aspectRatio);

            return (
              <motion.div key={projectIdx} className="relative" variants={itemVariants}>
                <div className="w-full h-full">
                  {/* Caption at top */}
                  <div className="mb-3 flex items-baseline gap-2">
                    <span className="text-[14px] leading-[20px] text-secondary">
                      {project.title}
                    </span>
                    <span className="ml-auto text-[12px] leading-[18px] text-secondary font-mono">
                      {project.year}
                    </span>
                  </div>

                  {/* Image/Video */}
                  <div
                    className={`relative ${aspectRatioClass} w-full overflow-hidden bg-gray-100 rounded-md`}
                  >
                    {isVideo ? (
                      <video
                        src={mediaSrc}
                        className="absolute inset-0 w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload={projectIdx < 2 ? 'auto' : 'metadata'} // Only preload first 2 videos
                      />
                    ) : (
                      <Image
                        src={mediaSrc}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1400px) 80vw, 1200px"
                        priority={projectIdx < 2}
                        loading={projectIdx < 2 ? 'eager' : 'lazy'}
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y1ZjVmNSIvPjwvc3ZnPg=="
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
