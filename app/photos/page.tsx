import PhotosClient from './photos-client';
import { fetchPhotos, orderPhotosForRoll } from '@/lib/photos';

// Server component - fetches data at build/request time
export default async function PhotosPage() {
  // Fetch photos server-side - directly from Bunny CDN, no HTTP roundtrip
  const images = orderPhotosForRoll(await fetchPhotos());

  return (
    <>
      {images.slice(0, 3).map((image) => (
        <link key={image.url} rel="preload" as="image" href={image.url} fetchPriority="high" />
      ))}
      <PhotosClient initialImages={images} />
    </>
  );
}
