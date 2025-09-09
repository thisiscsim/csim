'use client';
import { useEffect, useRef } from 'react';
import { PROJECT_GROUPS } from './data';
import Link from 'next/link';
import Image from 'next/image';

declare global {
  interface Window {
    companyRefs?: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  }
}

// Map project IDs/names to their corresponding images
function getProjectImage(projectId: string, projectName: string): string {
  const imageMap: { [key: string]: string } = {
    // Harvey projects
    'harvey-review-table': '/temp-cover/harvey-review-tables.png',
    'harvey-2': '/temp-cover/harvey-file-event-log.png',
    'harvey-3': '/temp-cover/placeholder_1.png', // No specific image yet
    'harvey-4': '/temp-cover/placeholder_1.png', // No specific image yet
    'harvey-5': '/temp-cover/placeholder_1.png', // Mobile 1.0
    'harvey-6': '/temp-cover/placeholder_1.png', // S-1 Workflow
    'harvey-7': '/temp-cover/placeholder_1.png', // Artifacts

    // Arc projects
    'arc-1': '/temp-cover/arc-deposit.png',
    'arc-2': '/temp-cover/arc-billpay.png',
    'arc-3': '/temp-cover/arc-settings.png',
    'arc-4': '/temp-cover/placeholder_1.png', // No specific image yet

    // Flexport projects
    'flexport-1': '/temp-cover/flexport-teamview.png',

    // Uber projects
    'uber-1': '/temp-cover/uber-driver-onboarding.png',
    'uber-2': '/temp-cover/placeholder_1.png', // For Uber onboarding, using same or placeholder

    // Independent projects - note: these have duplicate IDs 'uber-1' and 'uber-2' in data
    'independent-3': '/temp-cover/placeholder_1.png', // Peach
  };

  // Special handling for Independent projects with duplicate IDs
  if (projectName.includes('Moab')) {
    return '/temp-cover/moab.png';
  }
  if (projectName.includes('Amend')) {
    return '/temp-cover/amend.png';
  }
  if (projectName.includes('Peach')) {
    return '/temp-cover/placeholder_1.png';
  }

  return imageMap[projectId] || '/temp-cover/placeholder_1.png';
}

export default function HomePage() {
  const companyRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Make refs available globally for navigation
  useEffect(() => {
    window.companyRefs = companyRefs;
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Force light mode styles */}
      <style jsx global>{`
        .dotted-border {
          border-bottom: 2px dotted #d1d5db;
        }
      `}</style>

      {/* Project case studies grid */}
      <div className="w-full pb-32 px-4 md:px-6 lg:px-8">
        <div className="space-y-6 lg:space-y-8 max-w-[1400px] mx-auto">
          {PROJECT_GROUPS.map((group, groupIdx) => (
            <div
              key={groupIdx}
              id={`company-${groupIdx}`}
              ref={(el) => {
                companyRefs.current[`company-${groupIdx}`] = el;
              }}
              className="scroll-mt-20"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {group.projects.map((project, projectIdx) => {
                  // If there's only one project in the group, make it full width
                  const isSingleProject = group.projects.length === 1;

                  // Special case: Moab should always span full width
                  const isMoab = project.name.includes('Moab');

                  // For 'Independent' and 'Uber': all projects side-by-side (no full width)
                  const isSpecialGroup =
                    group.company === 'Independent' || group.company === 'Uber';

                  // For other groups: Pattern: 0 (full), 1-2 (half), 3 (full), 4-5 (half), etc.
                  const cyclePosition = projectIdx % 3;
                  const isFullWidth =
                    isSingleProject || isMoab || (!isSpecialGroup && cyclePosition === 0);

                  return (
                    <div
                      key={projectIdx}
                      className={`relative rounded-2xl bg-secondary/40 ${
                        isFullWidth ? 'lg:col-span-2' : ''
                      }`}
                    >
                      <Link
                        href={`/projects/${project.id}`}
                        className="block cursor-pointer h-full"
                        prefetch={true}
                      >
                        <div className="relative aspect-video w-full">
                          <Image
                            src={getProjectImage(project.id, project.name)}
                            alt={project.name}
                            fill
                            className="rounded-lg object-cover"
                          />
                        </div>
                        <div className="mt-4">
                          <h2 className="font-base font-medium group relative inline-block text-primary transition-colors duration-200 hover:text-secondary">
                            {project.name}
                          </h2>
                          <p className="font-base text-secondary">{project.description}</p>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
