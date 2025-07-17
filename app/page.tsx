'use client';
import { useEffect, useRef } from 'react';
import { PROJECT_GROUPS } from './data';
import Link from 'next/link';

declare global {
  interface Window {
    companyRefs?: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  }
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

      {/* Left side - Project case studies */}
      <div className="w-full pb-32">
        <div className="space-y-20">
          {PROJECT_GROUPS.map((group, groupIdx) => (
            <div
              key={groupIdx}
              id={`company-${groupIdx}`}
              ref={(el) => {
                companyRefs.current[`company-${groupIdx}`] = el;
              }}
              className="scroll-mt-20"
            >
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
          ))}
        </div>
      </div>
    </div>
  );
}
