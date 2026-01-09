import HomePhotoRoll from './home-photo-roll';
import { fetchProjectMedia, ProjectMedia } from '@/lib/photos';
import { PROJECTS } from './data';

// Normalize filename to match project IDs
function normalizeFilename(filename: string): string {
  return filename
    .replace(/\.[^/.]+$/, '')
    .toLowerCase()
    .replace(/[_\s]+/g, '-');
}

// Find matching media from Bunny for a project
function findProjectMedia(projectId: string, bunnyMedia: ProjectMedia[]): ProjectMedia | null {
  const exactMatch = bunnyMedia.find((m) => normalizeFilename(m.name) === projectId);
  if (exactMatch) return exactMatch;

  const partialMatch = bunnyMedia.find(
    (m) =>
      normalizeFilename(m.name).includes(projectId) || projectId.includes(normalizeFilename(m.name))
  );
  if (partialMatch) return partialMatch;

  return null;
}

export default async function HomePage() {
  // Fetch media server-side - URLs available immediately on first render
  const bunnyMedia = await fetchProjectMedia();

  // Pre-match media to projects for faster client rendering
  const mediaMap: Record<string, { url: string; isVideo: boolean }> = {};
  for (const project of PROJECTS) {
    const match = findProjectMedia(project.id, bunnyMedia);
    if (match) {
      mediaMap[project.id] = { url: match.url, isVideo: match.isVideo };
    }
  }

  // Get the first item for priority preloading - this one animates in with the page
  const firstProject = PROJECTS[0];
  const firstMedia = mediaMap[firstProject?.id];

  return (
    <>
      {/* Preload the first media item with highest priority - it animates in with the page */}
      {firstMedia && (
        <link
          rel="preload"
          as={firstMedia.isVideo ? 'fetch' : 'image'}
          href={firstMedia.url}
          crossOrigin="anonymous"
          fetchPriority="high"
        />
      )}
      <HomePhotoRoll initialMedia={mediaMap} />
    </>
  );
}
