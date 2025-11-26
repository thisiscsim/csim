import PhotosClient from './photos-client';
import { fetchPhotos } from '@/lib/photos';

// Server component - fetches data at build/request time
export default async function PhotosPage() {
  // Fetch photos server-side - directly from Bunny CDN, no HTTP roundtrip
  const images = await fetchPhotos();

  return <PhotosClient initialImages={images} />;
}
