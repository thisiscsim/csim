import PhotosClient from './photos-client';
import { fetchPhotos, orderPhotosForRoll, PHOTO_ROLL_EAGER_COUNT } from '@/lib/photos';

// Server component - fetches data at build/request time
export default async function PhotosPage() {
  // Fetch photos server-side - directly from Bunny CDN, no HTTP roundtrip
  const images = orderPhotosForRoll(await fetchPhotos());

  return (
    <>
      {/* Preload the slides shown during the intro; only the first is high priority
          so the neighbors don't starve it of bandwidth on cold loads. */}
      {images.slice(0, PHOTO_ROLL_EAGER_COUNT).map((image, i) => (
        <link
          key={image.url}
          rel="preload"
          as="image"
          href={image.url}
          fetchPriority={i === 0 ? 'high' : 'auto'}
        />
      ))}
      <PhotosClient initialImages={images} />
    </>
  );
}
