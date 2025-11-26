import { NextResponse } from 'next/server';
import { fetchPhotos } from '@/lib/photos';

// Cache for 5 minutes
export const revalidate = 300;

export async function GET() {
  try {
    const images = await fetchPhotos();

    if (images.length === 0) {
      return NextResponse.json(
        {
          error: 'No photos found or configuration missing',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { images },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    console.error('Error in photos API route:', error);
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
