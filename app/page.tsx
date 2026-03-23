import { fetchProjectMedia } from '@/lib/photos';
import HomePage from './home';

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const shuffled = [...arr];
  let s = seed;
  for (let i = shuffled.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = (s >>> 0) % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default async function Page() {
  const media = await fetchProjectMedia();

  const items = media.map((m) => ({ url: m.url, isVideo: m.isVideo, name: m.name }));

  const harvey = items.filter((m) => m.name.toLowerCase().startsWith('harvey'));
  const rest = items.filter((m) => !m.name.toLowerCase().startsWith('harvey'));

  const shuffledHarvey = seededShuffle(harvey, 42);
  const pinnedIdx = shuffledHarvey.findIndex((m) => m.name.includes('harvey_s1_shell'));
  if (pinnedIdx > 0) {
    const [pinned] = shuffledHarvey.splice(pinnedIdx, 1);
    shuffledHarvey.unshift(pinned);
  }
  const sorted = [...shuffledHarvey, ...rest];

  return <HomePage media={sorted} />;
}
