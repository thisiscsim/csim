import { fetchProjectFolderMedia } from '@/lib/photos';
import { ALL_PROJECTS } from './data';
import HomePage from './home';

export default async function Page() {
  const mediaMap: Record<string, { url: string; isVideo: boolean }> = {};

  const results = await Promise.all(
    ALL_PROJECTS.filter((p) => p.folder).map(async (project) => {
      const items = await fetchProjectFolderMedia(project.folder!);
      return { id: project.id, items };
    })
  );

  for (const { id, items } of results) {
    if (items.length > 0) {
      mediaMap[id] = { url: items[0].url, isVideo: items[0].isVideo };
    }
  }

  return <HomePage initialMedia={mediaMap} />;
}
