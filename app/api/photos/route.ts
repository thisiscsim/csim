import { NextResponse } from 'next/server';

// Cache for 5 minutes
export const revalidate = 300;

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

  console.log('Bunny Config:', {
    hasStorageZone: !!storageZone,
    hasApiKey: !!apiKey,
    region,
    hasPullZoneUrl: !!pullZoneUrl,
  });

  if (!storageZone || !apiKey || !pullZoneUrl) {
    return NextResponse.json(
      {
        error: 'Bunny CDN configuration is missing',
        details: {
          hasStorageZone: !!storageZone,
          hasApiKey: !!apiKey,
          hasPullZoneUrl: !!pullZoneUrl,
        },
      },
      { status: 500 }
    );
  }

  try {
    // Construct the storage API URL
    const storageHost = region === 'de' ? 'storage.bunnycdn.com' : `${region}.storage.bunnycdn.com`;
    const apiUrl = `https://${storageHost}/${storageZone}/Photos/`;

    // Fetch the list of files from Bunny Storage with caching
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        AccessKey: apiKey,
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`Bunny API error: ${response.statusText}`);
    }

    const files: BunnyFile[] = await response.json();

    console.log(`Found ${files.length} total files in Bunny storage`);

    // Filter for image files only and construct CDN URLs with optimization parameters
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    const images = files
      .filter((file) => {
        if (file.IsDirectory) return false;
        const ext = file.ObjectName.toLowerCase();
        return imageExtensions.some((imgExt) => ext.endsWith(imgExt));
      })
      .map((file) => {
        const baseUrl = `https://${pullZoneUrl}/Photos/${encodeURIComponent(file.ObjectName)}`;
        // Add Bunny CDN optimization parameters
        const optimizedUrl = `${baseUrl}?width=800&quality=85`;
        return {
          url: optimizedUrl,
          name: file.ObjectName,
          size: file.Length,
          lastModified: file.LastChanged,
        };
      });

    console.log(`Returning ${images.length} image files`);

    return NextResponse.json(
      { images },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching photos from Bunny:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        error: 'Failed to fetch photos',
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
