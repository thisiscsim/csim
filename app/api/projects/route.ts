import { NextResponse } from 'next/server';
import { fetchProjectMedia } from '@/lib/photos';

// Disable caching to always fetch fresh data
export const dynamic = 'force-dynamic';

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

    return NextResponse.json({ media });
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
