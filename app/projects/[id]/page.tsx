import { notFound } from 'next/navigation';
import { PROJECT_GROUPS, type Project } from '@/app/data';
import { ProjectContent } from './project-content';

// Flatten all projects from all groups
const allProjects: Project[] = PROJECT_GROUPS.flatMap((group) => group.projects);

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = allProjects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  // Find which group this project belongs to for date info
  const projectGroup = PROJECT_GROUPS.find((group) => group.projects.some((p) => p.id === id));

  return <ProjectContent project={project} projectGroup={projectGroup} />;
}

export async function generateStaticParams() {
  return allProjects.map((project) => ({
    id: project.id,
  }));
}
