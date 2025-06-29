import { NextRequest, NextResponse } from 'next/server';

// Temporary in-memory storage for verification token
let lastVerificationToken: string | null = null;
let tokenTimestamp: Date | null = null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (body.verification_token) {
      lastVerificationToken = body.verification_token;
      tokenTimestamp = new Date();

      return NextResponse.json({
        success: true,
        message: 'Verification token stored',
      });
    }

    return NextResponse.json({ error: 'No verification token provided' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function GET() {
  if (!lastVerificationToken) {
    return NextResponse.json({
      message: 'No verification token received yet. Click "Verify" in Notion first.',
    });
  }

  const tokenAge = tokenTimestamp
    ? Math.floor((Date.now() - tokenTimestamp.getTime()) / 1000)
    : null;

  return NextResponse.json({
    verification_token: lastVerificationToken,
    received_at: tokenTimestamp,
    seconds_ago: tokenAge,
    message: 'Copy the verification_token above and paste it in Notion',
  });
}
