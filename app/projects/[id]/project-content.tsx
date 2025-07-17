'use client';
import { motion } from 'motion/react';
import { PROJECT_GROUPS } from '@/app/data';
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

export function ProjectContent({ id }: { id: string }) {
  const project = PROJECT_GROUPS.flatMap((group) => group.projects).find((p) => p.id === id);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <motion.div
      className="space-y-16"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <ProjectHeader />

      <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
        <div className="text-sm text-zinc-500 mb-2">Project Case Study</div>
        <h1 className="text-4xl font-medium text-zinc-900 mb-4">{project.name}</h1>
        <p className="text-lg text-zinc-600">{project.description}</p>
      </motion.section>

      <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-zinc-200">
          <video src={project.video} autoPlay loop muted playsInline className="w-full h-auto" />
        </div>
      </motion.section>

      <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-medium text-zinc-900 mb-4">Challenge</h2>
            <p className="text-zinc-600 leading-relaxed text-lg">{project.challenge}</p>
          </div>
          <div>
            <h2 className="text-2xl font-medium text-zinc-900 mb-4">Solution</h2>
            <p className="text-zinc-600 leading-relaxed text-lg">{project.solution}</p>
          </div>
        </div>
      </motion.section>

      {project.features && (
        <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-zinc-50 rounded-lg p-6 mb-4">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-medium text-zinc-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-zinc-500 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {project.metrics && (
        <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
          <h2 className="text-2xl font-medium text-zinc-900 mb-8">Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {project.metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-zinc-900 mb-2">{metric.value}</div>
                <div className="text-sm text-zinc-500">{metric.label}</div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {project.technology && (
        <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
          <h2 className="text-2xl font-medium text-zinc-900 mb-4">Technology</h2>
          <p className="text-zinc-600 mb-8">{project.technology}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.techStack?.map((tech, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center">
                  <img src={tech.icon} alt={tech.name} className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-medium text-zinc-900">{tech.name}</div>
                  <div className="text-sm text-zinc-500">{tech.purpose}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
        <div className="border-t border-zinc-200 pt-8">
          <div className="text-center text-zinc-500">End of case study</div>
        </div>
      </motion.section>
    </motion.div>
  );
}
