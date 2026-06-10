// Notion serves uploaded files through AWS S3 presigned URLs that expire after
// ~1 hour. Because the converted markdown is cached (unstable_cache + page ISR),
// those URLs routinely outlive their signatures and images break until every
// cache layer happens to refresh. To fix this permanently, we mirror each Notion
// image to Bunny storage once and rewrite the markdown to the stable CDN URL.

import { createHash } from 'crypto';

const STORAGE_FOLDER = 'Blog';

interface BunnyConfig {
  storageHost: string;
  zone: string;
  apiKey: string;
  pullZone: string;
}

function getBunnyConfig(): BunnyConfig | null {
  const zone = process.env.BUNNY_STORAGE_ZONE;
  const apiKey = process.env.BUNNY_STORAGE_API_KEY;
  const pullZone = process.env.BUNNY_PULL_ZONE_URL;
  const region = process.env.BUNNY_STORAGE_REGION || 'de';

  if (!zone || !apiKey || !pullZone) return null;

  const storageHost = region === 'de' ? 'storage.bunnycdn.com' : `${region}.storage.bunnycdn.com`;
  return { storageHost, zone, apiKey, pullZone };
}

// Matches Notion-hosted attachments (S3 presigned or file.notion.so), which all
// expire. External images (e.g. direct links pasted into Notion) are left alone.
function isExpiringNotionUrl(raw: string): boolean {
  try {
    const { hostname } = new URL(raw);
    return hostname.endsWith('.amazonaws.com') || hostname === 'file.notion.so';
  } catch {
    return false;
  }
}

// The storage name is derived from the URL host + path only; the signed query
// string rotates on every Notion API call, but the path is stable per file, so
// the same Notion image always maps to the same storage object.
function storageNameFor(raw: string): string {
  const url = new URL(raw);
  const hash = createHash('sha1')
    .update(`${url.hostname}${url.pathname}`)
    .digest('hex')
    .slice(0, 16);
  const base = decodeURIComponent(url.pathname.split('/').pop() || 'file');
  const safeName = base.replace(/[^a-zA-Z0-9._-]+/g, '-');
  return `${hash}-${safeName}`;
}

async function listExistingObjects(config: BunnyConfig): Promise<Set<string>> {
  try {
    const response = await fetch(
      `https://${config.storageHost}/${config.zone}/${STORAGE_FOLDER}/`,
      {
        headers: { AccessKey: config.apiKey },
        cache: 'no-store',
      }
    );

    if (!response.ok) return new Set();

    const files = (await response.json()) as { ObjectName: string; IsDirectory: boolean }[];
    return new Set(files.filter((file) => !file.IsDirectory).map((file) => file.ObjectName));
  } catch {
    return new Set();
  }
}

async function uploadToStorage(
  config: BunnyConfig,
  name: string,
  sourceUrl: string
): Promise<boolean> {
  const source = await fetch(sourceUrl, { cache: 'no-store' });
  if (!source.ok) return false;

  const body = await source.arrayBuffer();
  const response = await fetch(
    `https://${config.storageHost}/${config.zone}/${STORAGE_FOLDER}/${name}`,
    {
      method: 'PUT',
      headers: {
        AccessKey: config.apiKey,
        'Content-Type': 'application/octet-stream',
      },
      body,
    }
  );

  return response.ok;
}

/**
 * Rewrites every expiring Notion image URL in the markdown to a permanent
 * Bunny CDN URL, uploading the image to storage if it isn't mirrored yet.
 * On any failure the original signed URL is kept, so the post still renders
 * (with today's expiry behavior) and the upload is retried on the next
 * cache revalidation.
 */
export async function rehostNotionImages(markdown: string): Promise<string> {
  const config = getBunnyConfig();
  if (!config) {
    console.error('Bunny CDN configuration is missing; serving expiring Notion image URLs');
    return markdown;
  }

  const expiringUrls = new Set<string>();
  for (const match of markdown.matchAll(/!\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/g)) {
    if (isExpiringNotionUrl(match[1])) {
      expiringUrls.add(match[1]);
    }
  }

  if (expiringUrls.size === 0) return markdown;

  const existing = await listExistingObjects(config);
  const replacements = new Map<string, string>();

  await Promise.all(
    [...expiringUrls].map(async (sourceUrl) => {
      try {
        const name = storageNameFor(sourceUrl);
        if (existing.has(name) || (await uploadToStorage(config, name, sourceUrl))) {
          replacements.set(sourceUrl, `https://${config.pullZone}/${STORAGE_FOLDER}/${name}`);
        }
      } catch (error) {
        console.error(`Failed to rehost Notion image: ${sourceUrl}`, error);
      }
    })
  );

  let result = markdown;
  for (const [from, to] of replacements) {
    result = result.split(from).join(to);
  }
  return result;
}
