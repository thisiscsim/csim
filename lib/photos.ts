// Shared photo fetching logic that can be used both in API routes and server components

interface BunnyFile {
  ObjectName: string;
  Length: number;
  LastChanged: string;
  IsDirectory: boolean;
}

export interface PhotoImage {
  url: string;
  name: string;
  size: number;
  lastModified: string;
}

export async function fetchPhotos(): Promise<PhotoImage[]> {
  const storageZone = process.env.BUNNY_STORAGE_ZONE;
  const apiKey = process.env.BUNNY_STORAGE_API_KEY;
  const region = process.env.BUNNY_STORAGE_REGION || 'de';
  const pullZoneUrl = process.env.BUNNY_PULL_ZONE_URL;

  if (!storageZone || !apiKey || !pullZoneUrl) {
    console.error('Bunny CDN configuration is missing');
    return [];
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

    return images;
  } catch (error) {
    console.error('Error fetching photos from Bunny:', error);
    return [];
  }
}
