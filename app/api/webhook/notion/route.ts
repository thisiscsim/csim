import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Verify webhook authenticity
function verifyWebhook(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  const webhookSecret = process.env.NOTION_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('NOTION_WEBHOOK_SECRET not configured');
    return false;
  }

  return authHeader === `Bearer ${webhookSecret}`;
}

export async function POST(request: NextRequest) {
  try {
    // Parse the webhook payload
    const body = await request.json().catch(() => ({}));

    // Check if this is a verification request
    if (body.verification_token) {
      console.log('\n🔐 NOTION WEBHOOK VERIFICATION TOKEN:');
      console.log('=====================================');
      console.log(body.verification_token);
      console.log('=====================================');
      console.log('Copy the token above and paste it in Notion to verify your webhook.\n');

      // Store token in helper endpoint for easy retrieval
      try {
        const baseUrl = process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : 'http://localhost:3000';

        await fetch(`${baseUrl}/api/webhook/notion/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ verification_token: body.verification_token }),
        });
      } catch (error) {
        console.error('Failed to store verification token:', error);
      }

      // Return success response for verification
      return NextResponse.json({
        success: true,
        message: 'Verification token received',
        verification_token: body.verification_token,
      });
    }

    // For actual webhook events, verify the authorization
    if (!verifyWebhook(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Notion webhook received:', JSON.stringify(body, null, 2));

    // Regenerate the blog data JSON file
    try {
      console.log('Regenerating blog data...');
      await execAsync('node scripts/generate-blog-data.mjs');
      console.log('Blog data regenerated successfully');
    } catch (error) {
      console.error('Failed to regenerate blog data:', error);
      // Continue with revalidation even if regeneration fails
    }

    // Revalidate Next.js cache
    console.log('Revalidating cache...');

    // Revalidate specific tags
    revalidateTag('blog-posts');
    revalidateTag('blog-content');

    // Revalidate specific paths
    revalidatePath('/writing');
    revalidatePath('/writing/[slug]', 'page');

    console.log('Cache revalidated successfully');

    // Optionally trigger a full Vercel rebuild (use sparingly)
    if (body.fullRebuild && process.env.VERCEL_DEPLOY_HOOK_URL) {
      console.log('Triggering full Vercel rebuild...');

      try {
        const deployResponse = await fetch(process.env.VERCEL_DEPLOY_HOOK_URL, {
          method: 'POST',
        });

        if (deployResponse.ok) {
          console.log('Vercel rebuild triggered successfully');
        } else {
          console.error('Failed to trigger Vercel rebuild:', deployResponse.status);
        }
      } catch (error) {
        console.error('Error triggering Vercel rebuild:', error);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Blog content updated',
      timestamp: new Date().toISOString(),
      actions: {
        dataRegenerated: true,
        cacheRevalidated: true,
        fullRebuild: body.fullRebuild || false,
      },
    });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Test endpoint (development only)
export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({
    status: 'Webhook endpoint active',
    environment: process.env.NODE_ENV,
    configuration: {
      hasWebhookSecret: !!process.env.NOTION_WEBHOOK_SECRET,
      hasDeployHook: !!process.env.VERCEL_DEPLOY_HOOK_URL,
      hasNotionCredentials: !!process.env.NOTION_API_KEY && !!process.env.NOTION_DATABASE_ID,
    },
  });
}
