'use client';
import { useEffect, useRef } from 'react';
import { PROJECT_GROUPS } from './data';
import { motion } from 'motion/react';
import Image from 'next/image';

declare global {
  interface Window {
    companyRefs?: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  }
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

// Map project IDs to their static image fallbacks
function getProjectImageFallback(projectId: string, projectName: string): string {
  const imageMap: { [key: string]: string } = {
    // Harvey projects
    'harvey-review-table': '/temp-cover/harvey-review-tables.png',
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

// Animation variants for staggered effect
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
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
    },
  },
};

export default function HomePage() {
  const companyRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Make refs available globally for navigation
  useEffect(() => {
    window.companyRefs = companyRefs;
  }, []);

  return (
    <div className="min-h-screen relative mt-[90px]">
      {/* Introduction Section */}
      <div className="w-full px-4 md:px-6 lg:px-8 mb-32">
        <div className="max-w-[1400px] mx-auto">
          <motion.h1
            className="text-xl font-medium text-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0 }}
          >
            Christopher Sim
          </motion.h1>
          <motion.h2
            className="text-xl text-secondary mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          >
            Software designer based in San Francisco
          </motion.h2>

          <motion.div
            className="space-y-4 text-md text-secondary leading-relaxed max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
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

          <motion.div
            className="mt-8 text-sm font-mono text-secondary flex items-center gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
          >
            <a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              <Image src="/social-icons/IconX.svg" alt="" width={16} height={16} />
              <span>Twitter</span>
            </a>
            <a
              href="https://threads.net/@yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              <Image src="/social-icons/IconThreads.svg" alt="" width={16} height={16} />
              <span>Threads</span>
            </a>
            <a
              href="https://instagram.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              <Image src="/social-icons/IconInstagram.svg" alt="" width={16} height={16} />
              <span>Instagram</span>
            </a>
            <a
              href="https://are.na/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              <Image src="/social-icons/IconArena.svg" alt="" width={16} height={16} />
              <span>Are.na</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Project case studies grid */}
      <div className="w-full pb-32 px-4 md:px-6 lg:px-8">
        <motion.div
          className="space-y-32 max-w-[1400px] mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {PROJECT_GROUPS.map((group, groupIdx) => (
            <div
              key={groupIdx}
              id={`company-${groupIdx}`}
              ref={(el) => {
                companyRefs.current[`company-${groupIdx}`] = el;
              }}
              className="scroll-mt-32"
            >
              <motion.div className="space-y-8" variants={containerVariants}>
                {group.projects.map((project, projectIdx) => {
                  // Check if it's a real video URL (not the placeholder Cloudinary URL)
                  const isPlaceholderVideo =
                    project.video.includes('XSfIvT7BUWbPRXhrbLed') ||
                    project.video.includes('ee6871c9-8400-49d2-8be9-e32675eabf7e');

                  const isVideo =
                    project.video &&
                    !isPlaceholderVideo &&
                    (project.video.includes('.mp4') ||
                      project.video.includes('.webm') ||
                      project.video.includes('.mov'));

                  const mediaSrc = isPlaceholderVideo
                    ? getProjectImageFallback(project.id, project.name)
                    : project.video;

                  const aspectRatioClass = getAspectRatioClass(project.aspectRatio);

                  return (
                    <motion.div key={projectIdx} className="relative" variants={itemVariants}>
                      <div className="w-full h-full">
                        <div
                          className={`relative ${aspectRatioClass} w-full overflow-hidden bg-gray-100`}
                        >
                          {isVideo ? (
                            <video
                              src={mediaSrc}
                              className="absolute inset-0 w-full h-full object-cover"
                              autoPlay
                              loop
                              muted
                              playsInline
                            />
                          ) : (
                            <Image
                              src={mediaSrc}
                              alt={project.name}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <p className="mt-3 text-[12px] font-mono text-secondary">
                          {project.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
