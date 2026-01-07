import { NextResponse } from 'next/server';
import { fetchProjectMedia } from '@/lib/photos';

// Cache for 5 minutes, revalidate in background
export const revalidate = 300;

export async function GET() {
  try {
    const media = await fetchProjectMedia();

    if (media.length === 0) {
      return NextResponse.json(
        {
          error: 'No project media found or configuration missing',
        },
        { status: 500 }
      );
    }

    // Return with cache headers for browser caching
    return NextResponse.json(
      { media },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    console.error('Error in projects API route:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        error: 'Failed to fetch project media',
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
