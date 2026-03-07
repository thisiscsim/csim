import { notFound } from 'next/navigation';
import { fetchProjectFolderMedia } from '@/lib/photos';
import { getProjectById, getCompanyForProject } from '../data';
import ProjectPhotoRoll from './project-photo-roll';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  const project = getProjectById(slug);
  if (!project) {
    notFound();
  }

  const company = getCompanyForProject(slug);
  if (!company) {
    notFound();
  }

  const mediaItems = project.folder ? await fetchProjectFolderMedia(project.folder) : [];

  return (
    <>
      <style>{`
        html, body {
          overscroll-behavior: none;
          overscroll-behavior-x: none;
          touch-action: pan-y pinch-zoom;
        }
      `}</style>
      <ProjectPhotoRoll
        project={project}
        mediaItems={mediaItems.map((m) => ({ url: m.url, isVideo: m.isVideo }))}
      />
    </>
  );
}
