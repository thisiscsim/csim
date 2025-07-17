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

  return <ProjectContent project={project} />;
}

export async function generateStaticParams() {
  return allProjects.map((project) => ({
    id: project.id,
  }));
}
