import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

// This secret should match the one you'll configure in Notion
const WEBHOOK_SECRET = process.env.NOTION_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  try {
    // Verify the webhook secret for security
    const authHeader = request.headers.get('authorization');

    if (!WEBHOOK_SECRET || authHeader !== `Bearer ${WEBHOOK_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse the webhook payload (optional - Notion sends data about what changed)
    const body = await request.json().catch(() => ({}));
    console.log('Received Notion webhook:', body);

    // Revalidate the blog data caches
    revalidateTag('blog-posts');
    revalidateTag('blog-content');

    // Trigger a rebuild of the static blog data
    if (process.env.VERCEL_DEPLOY_HOOK_URL) {
      // Call Vercel deploy hook to trigger a full rebuild
      const deployResponse = await fetch(process.env.VERCEL_DEPLOY_HOOK_URL, {
        method: 'POST',
      });

      if (!deployResponse.ok) {
        console.error('Failed to trigger Vercel rebuild');
      } else {
        console.log('Triggered Vercel rebuild successfully');
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Blog data revalidated',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Also support GET for testing
export async function GET() {
  // Only allow GET in development for testing
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  return NextResponse.json({
    message: 'Webhook endpoint is working',
    environment: process.env.NODE_ENV,
  });
}
