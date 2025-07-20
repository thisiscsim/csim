'use client';
import { motion } from 'motion/react';
import { type Project } from '@/app/data';

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const TRANSITION_SECTION = {
  type: 'spring',
  bounce: 0,
  duration: 0.3,
};

export function ProjectContent({ project }: { project: Project }) {
  return (
    <motion.div
      className="space-y-12"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
        <h1 className="text-4xl font-medium text-primary mb-2">{project.name}</h1>
        <p className="text-md text-secondary">{project.description}</p>
      </motion.section>

      <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
        <div className="bg-secondary rounded-lg overflow-hidden">
          <video src={project.video} autoPlay loop muted playsInline className="w-full h-auto" />
        </div>
      </motion.section>

      {project.caseStudy && (
        <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
          <div className="space-y-12">
            <div>
              <h2 className="text-xl font-medium text-text-primary mb-2">Challenge</h2>
              <p className="text-secondary leading-relaxed text-md">
                {project.caseStudy.background}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-medium text-text-primary mb-2">Solution</h2>
              <p className="text-secondary leading-relaxed text-md">{project.caseStudy.solution}</p>
            </div>
          </div>
        </motion.section>
      )}

      {project.caseStudy?.impact && (
        <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
          <h2 className="text-xl font-medium text-text-primary mb-2">Impact</h2>
          {project.caseStudy.impactDescription && (
            <p className="text-secondary leading-relaxed text-md mb-6">
              {project.caseStudy.impactDescription}
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.caseStudy.impact.map((impact, index) => (
              <div key={index}>
                <h2 className="text-3xl font-medium text-primary mb-2">{impact.stat}</h2>
                <div className="text-sm text-secondary">{impact.label}</div>
                {impact.description && (
                  <div className="text-sm text-text-muted mt-2">{impact.description}</div>
                )}
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {project.caseStudy?.images && (
        <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
          <div className="space-y-8">
            {project.caseStudy.images.map((image, index) => (
              <div key={index}>
                <div className="bg-tertiary rounded-lg p-6 mb-2">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                {image.caption && <p className="text-sm text-secondary">{image.caption}</p>}
              </div>
            ))}
          </div>
        </motion.section>
      )}
    </motion.div>
  );
}
