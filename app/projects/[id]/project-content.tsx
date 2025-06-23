'use client';
import { useScrollToTop } from '@/hooks/useLenis';
import type { Project, ProjectGroup } from '@/app/data';
import { ProjectHeader } from '@/app/project-header';

interface ProjectContentProps {
  project: Project;
  projectGroup?: ProjectGroup;
}

export function ProjectContent({ project, projectGroup }: ProjectContentProps) {
  // Ensure page starts at top
  useScrollToTop();

  return (
    <div className="min-h-screen">
      {/* Project Header */}
      <ProjectHeader />

      {/* Preload the video */}
      <link rel="preload" as="video" href={project.video} />

      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-screen-lg mx-auto px-4 pt-8 pb-20">
          <div className="max-w-4xl mx-auto">
            {projectGroup && (
              <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
                {projectGroup.start} – {projectGroup.end}
              </div>
            )}
            <h1 className="text-4xl font-medium text-zinc-900 dark:text-zinc-100 mb-4">
              {project.name}
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">{project.description}</p>
          </div>
        </div>
      </div>

      {/* Video/Image */}
      <div className="max-w-screen-xl mx-auto px-4 mb-20">
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
          <video
            src={project.video}
            autoPlay
            loop
            muted
            preload="auto"
            className="w-full h-auto object-cover"
            style={{ display: 'block' }}
          />
        </div>
      </div>

      {/* Case Study Content */}
      {project.caseStudy ? (
        <div className="max-w-4xl mx-auto px-4 pb-32">
          <div className="space-y-20">
            {/* Background */}
            <section>
              <h2 className="text-2xl font-medium text-zinc-900 dark:text-zinc-100 mb-4">
                Background
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
                {project.caseStudy.background}
              </p>
            </section>

            {/* Solution */}
            <section>
              <h2 className="text-2xl font-medium text-zinc-900 dark:text-zinc-100 mb-4">
                Solution
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
                {project.caseStudy.solution}
              </p>
            </section>

            {/* Additional Images */}
            {project.caseStudy.images && project.caseStudy.images.length > 0 && (
              <section className="space-y-8">
                {project.caseStudy.images.map((image, index) => (
                  <div key={index} className="space-y-4">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-auto rounded-lg"
                      loading="lazy"
                    />
                    {image.caption && (
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center">
                        {image.caption}
                      </p>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* Impact */}
            {project.caseStudy.impact && Array.isArray(project.caseStudy.impact) && (
              <section>
                <h2 className="text-2xl font-medium text-zinc-900 dark:text-zinc-100 mb-8">
                  Impact
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {project.caseStudy.impact.map((item, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                        {item.stat}
                      </div>
                      <div className="text-sm text-zinc-500 dark:text-zinc-400">{item.label}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Credits */}
            {project.caseStudy.credits && (
              <section>
                <h2 className="text-2xl font-medium text-zinc-900 dark:text-zinc-100 mb-4">
                  Credits
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 mb-8">
                  {project.caseStudy.credits.text}
                </p>
                <div className="flex flex-wrap gap-8">
                  {project.caseStudy.credits.people &&
                    project.caseStudy.credits.people.map((person, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <img
                          src={person.image}
                          alt={person.name}
                          className="w-12 h-12 rounded-full"
                          loading="lazy"
                        />
                        <div>
                          <div className="font-medium text-zinc-900 dark:text-zinc-100">
                            {person.name}
                          </div>
                          <div className="text-sm text-zinc-500 dark:text-zinc-400">
                            {person.role}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </section>
            )}
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto px-4 pb-32">
          <div className="text-center text-zinc-500 dark:text-zinc-400">
            <p className="text-lg">Case study coming soon...</p>
          </div>
        </div>
      )}
    </div>
  );
}
