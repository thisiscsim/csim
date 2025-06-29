import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { createHmac, timingSafeEqual } from 'crypto';

// Store the verification token (in production, use a database or environment variable)
let verificationToken: string | null = null;

// Verify webhook authenticity using Notion's signature
function verifyNotionSignature(request: NextRequest, body: unknown): boolean {
  const signature = request.headers.get('x-notion-signature');

  if (!signature || !verificationToken) {
    return false;
  }

  // Calculate the expected signature
  const bodyString = JSON.stringify(body);
  const calculatedSignature = `sha256=${createHmac('sha256', verificationToken).update(bodyString).digest('hex')}`;

  // Use timing-safe comparison
  try {
    return timingSafeEqual(Buffer.from(calculatedSignature), Buffer.from(signature));
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse the webhook payload
    const body = await request.json().catch(() => ({}));

    // Log the entire body for debugging
    console.log('Full webhook payload:', JSON.stringify(body, null, 2));

    // Check if this is a verification request
    if (body.verification_token) {
      console.log('\n🔐 NOTION WEBHOOK VERIFICATION TOKEN RECEIVED:');
      console.log('=====================================');
      console.log(body.verification_token);
      console.log('=====================================');
      console.log('Copy the token above and paste it in Notion to verify your webhook.\n');

      // Store the verification token for future requests
      verificationToken = body.verification_token;

      // In production, store this in a database or secure storage
      console.log('⚠️  IMPORTANT: In production, store this token securely!');
      console.log('You can set NOTION_VERIFICATION_TOKEN=' + body.verification_token);

      // Return success response for verification
      return NextResponse.json({
        success: true,
        message: 'Verification token received',
        verification_token: body.verification_token,
      });
    }

    // For actual webhook events, verify the signature
    // First try to load verification token from environment if not in memory
    if (!verificationToken && process.env.NOTION_VERIFICATION_TOKEN) {
      verificationToken = process.env.NOTION_VERIFICATION_TOKEN;
    }

    // Verify the webhook signature
    if (!verifyNotionSignature(request, body)) {
      console.error('Webhook signature verification failed');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Notion webhook received and verified:', JSON.stringify(body, null, 2));

    // Cache invalidation will trigger fresh data fetch from Notion
    console.log('Webhook triggered - will invalidate cache to fetch fresh data');

    // Revalidate Next.js cache
    console.log('Revalidating cache...');

    // Revalidate specific tags
    revalidateTag('blog-posts');
    revalidateTag('blog-content');

    // Revalidate specific paths
    revalidatePath('/writing');
    revalidatePath('/writing/[slug]', 'page');
    revalidatePath('/', 'page'); // Also revalidate home page if it shows blog posts

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
        cacheRevalidated: true,
        fullRebuild: body.fullRebuild || false,
      },
    });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Test endpoint (works in all environments for webhook verification)
export async function GET() {
  return NextResponse.json({
    status: 'Webhook endpoint active',
    environment: process.env.NODE_ENV || 'development',
    message: 'This endpoint accepts POST requests for Notion webhooks',
    configuration: {
      hasVerificationToken: !!process.env.NOTION_VERIFICATION_TOKEN || !!verificationToken,
      hasDeployHook: !!process.env.VERCEL_DEPLOY_HOOK_URL,
      hasNotionCredentials: !!process.env.NOTION_API_KEY && !!process.env.NOTION_DATABASE_ID,
    },
  });
}
