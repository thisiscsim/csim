import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface BunnyFile {
  ObjectName: string;
  Length: number;
  LastChanged: string;
  IsDirectory: boolean;
}

export async function GET() {
  const storageZone = process.env.BUNNY_STORAGE_ZONE;
  const apiKey = process.env.BUNNY_STORAGE_API_KEY;
  const region = process.env.BUNNY_STORAGE_REGION || 'de';
  const pullZoneUrl = process.env.BUNNY_PULL_ZONE_URL;

  if (!storageZone || !apiKey || !pullZoneUrl) {
    return NextResponse.json({ error: 'Bunny CDN configuration is missing' }, { status: 500 });
  }

  try {
    // Construct the storage API URL
    const storageHost = region === 'de' ? 'storage.bunnycdn.com' : `${region}.storage.bunnycdn.com`;
    const apiUrl = `https://${storageHost}/${storageZone}/Photos/`;

    // Fetch the list of files from Bunny Storage
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        AccessKey: apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`Bunny API error: ${response.statusText}`);
    }

    const files: BunnyFile[] = await response.json();

    // Filter for image files only and construct CDN URLs
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    const images = files
      .filter((file) => {
        if (file.IsDirectory) return false;
        const ext = file.ObjectName.toLowerCase();
        return imageExtensions.some((imgExt) => ext.endsWith(imgExt));
      })
      .map((file) => ({
        url: `https://${pullZoneUrl}/Photos/${encodeURIComponent(file.ObjectName)}`,
        name: file.ObjectName,
        size: file.Length,
        lastModified: file.LastChanged,
      }));

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error fetching photos from Bunny:', error);
    return NextResponse.json({ error: 'Failed to fetch photos' }, { status: 500 });
  }
}
