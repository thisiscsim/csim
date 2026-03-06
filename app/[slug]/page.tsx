import { notFound } from 'next/navigation';
import { fetchProjectMedia, ProjectMedia } from '@/lib/photos';
import { getProjectById, getCompanyForProject } from '../data';
import ProjectPhotoRoll from './project-photo-roll';

function normalizeFilename(filename: string): string {
  return filename
    .replace(/\.[^/.]+$/, '')
    .toLowerCase()
    .replace(/[_\s]+/g, '-');
}

function findProjectMedia(projectId: string, bunnyMedia: ProjectMedia[]): ProjectMedia | null {
  const exactMatch = bunnyMedia.find((m) => normalizeFilename(m.name) === projectId);
  if (exactMatch) return exactMatch;

  const partialMatch = bunnyMedia.find(
    (m) =>
      normalizeFilename(m.name).includes(projectId) || projectId.includes(normalizeFilename(m.name))
  );
  return partialMatch ?? null;
}

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

  const bunnyMedia = await fetchProjectMedia();

  const match = findProjectMedia(project.id, bunnyMedia);
  const media = match ? { url: match.url, isVideo: match.isVideo } : null;

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
        companyName={company.name}
        companyCategory={company.category}
        companyDescription={company.description}
        companyLink={company.link}
        media={media}
      />
    </>
  );
}
