'use client';
import { motion } from 'motion/react';
import { type Project } from '@/app/data';
import { ProjectHeader } from '@/app/project-header';

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
      className="space-y-16"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <ProjectHeader />

      <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
        <div className="text-sm text-text-tertiary mb-2">Project Case Study</div>
        <h1 className="text-4xl font-medium text-text-primary mb-4">{project.name}</h1>
        <p className="text-lg text-text-secondary">{project.description}</p>
      </motion.section>

      <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
        <div className="bg-secondary rounded-xl shadow-lg overflow-hidden border border-border-primary">
          <video src={project.video} autoPlay loop muted playsInline className="w-full h-auto" />
        </div>
      </motion.section>

      {project.caseStudy && (
        <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-medium text-text-primary mb-4">Challenge</h2>
              <p className="text-text-secondary leading-relaxed text-lg">
                {project.caseStudy.background}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-medium text-text-primary mb-4">Solution</h2>
              <p className="text-text-secondary leading-relaxed text-lg">
                {project.caseStudy.solution}
              </p>
            </div>
          </div>
        </motion.section>
      )}

      {project.caseStudy?.impact && (
        <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
          <h2 className="text-2xl font-medium text-text-primary mb-8">Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {project.caseStudy.impact.map((impact, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-text-primary mb-2">{impact.stat}</div>
                <div className="text-sm text-text-tertiary">{impact.label}</div>
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
          <h2 className="text-2xl font-medium text-text-primary mb-8">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.caseStudy.images.map((image, index) => (
              <div key={index} className="text-center">
                <div className="bg-tertiary rounded-lg p-6 mb-4">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                {image.caption && (
                  <p className="text-sm text-text-tertiary text-center">{image.caption}</p>
                )}
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {project.caseStudy?.credits && (
        <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
          <h2 className="text-2xl font-medium text-text-primary mb-4">Credits</h2>
          <p className="text-text-secondary mb-8">{project.caseStudy.credits.text}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.caseStudy.credits.people.map((person, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-tertiary rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium text-text-primary">{person.name}</div>
                  <div className="text-sm text-text-tertiary">{person.role}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
        <div className="border-t border-border-primary pt-8">
          <div className="text-center text-text-tertiary">End of case study</div>
        </div>
      </motion.section>
    </motion.div>
  );
}
