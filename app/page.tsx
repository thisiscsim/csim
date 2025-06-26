'use client';
import { motion } from 'motion/react';
import { PROJECT_GROUPS, EMAIL } from './data';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useCallback } from 'react';

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.3,
    },
  },
};

export default function HomePage() {
  const router = useRouter();

  // Prefetch all project pages on mount for instant navigation
  const prefetchProjects = useCallback(() => {
    PROJECT_GROUPS.forEach((group) => {
      group.projects.forEach((project) => {
        router.prefetch(`/projects/${project.id}`);
      });
    });
  }, [router]);

  useEffect(() => {
    // Prefetch all project pages after a short delay to not block initial render
    const timer = setTimeout(() => {
      prefetchProjects();
    }, 100);

    return () => clearTimeout(timer);
  }, [prefetchProjects]);

  return (
    <motion.main
      className="space-y-32"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <motion.section className="mb-24" variants={VARIANTS_SECTION}>
        <div className="flex flex-row gap-8 items-start relative mb-20">
          <div className="w-77 flex-shrink-0">
            <h1 className="text-xl font-medium mb-0.5">Howdy! I&apos;m Chris</h1>
            <p className="font-base text-secondary">Software Designer</p>
          </div>
          <div className="flex-1">
            <p className="text-secondary">
              Currently a member of the design staff at Harvey, building the AI platform for legal
              professionals. Previously, he&apos;s worked with teams at Flexport, Uber, and Arc. He
              studied Human-Computer Interaction at the University of Washington.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="mb-1 text-sm text-secondary">Location</h3>
            <p>37.8044° N, 122.2711° W</p>
            <p>Oakland, CA</p>
          </div>
          <div>
            <h3 className="mb-1 text-sm text-secondary">Currently</h3>
            <p>Member of the Design staff</p>
            <p>Harvey</p>
          </div>
          <div>
            <h3 className="mb-1 text-sm text-secondary">Connect</h3>
            <a
              href={`mailto:${EMAIL}`}
              className="text-primary border-b border-dotted border-muted hover:border-primary"
            >
              {EMAIL}
            </a>
            <br />
            <a
              href="https://www.instagram.com/thisiscsim/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary border-b border-dotted border-muted hover:border-primary"
            >
              @thisiscsim
            </a>
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section variants={VARIANTS_SECTION}>
        <div className="flex flex-col gap-20">
          {PROJECT_GROUPS.map((group, idx) => (
            <div key={idx} className="flex flex-row gap-8 items-start relative">
              <div className="w-77 flex-shrink-0 sticky top-10 z-10 self-start bg-transparent backdrop-blur-sm">
                <span className="block text-sm text-secondary">
                  {group.start} - {group.end}
                </span>
                <h2 className="block text-lg font-medium text-primary">{group.company}</h2>
              </div>
              <div className="flex-1 flex flex-col gap-10">
                <p className="mb-4 text-base text-secondary">{group.description}</p>
                <div className="space-y-12">
                  {group.projects.map((project, projectIdx) => (
                    <div key={projectIdx} className="relative rounded-2xl bg-secondary/40">
                      <Link
                        href={`/projects/${project.id}`}
                        className="block cursor-pointer"
                        prefetch={true}
                      >
                        <video
                          src={project.video}
                          autoPlay
                          loop
                          muted
                          className="aspect-video w-full rounded-lg"
                        />
                        <div className="mt-4">
                          <h2 className="font-base font-medium group relative inline-block text-primary transition-colors duration-200 hover:text-secondary">
                            {project.name}
                          </h2>
                          <p className="font-base text-secondary">{project.description}</p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </motion.main>
  );
}
