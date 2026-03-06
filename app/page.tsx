import { fetchProjectMedia, ProjectMedia } from '@/lib/photos';
import { ALL_PROJECTS } from './data';
import HomePage from './home';

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

export default async function Page() {
  const bunnyMedia = await fetchProjectMedia();

  const mediaMap: Record<string, { url: string; isVideo: boolean }> = {};
  for (const project of ALL_PROJECTS) {
    const match = findProjectMedia(project.id, bunnyMedia);
    if (match) {
      mediaMap[project.id] = { url: match.url, isVideo: match.isVideo };
    }
  }

  return <HomePage initialMedia={mediaMap} />;
}
