import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('\n=== NOTION WEBHOOK DIAGNOSTIC ===');

  // Log headers
  console.log('Headers:');
  request.headers.forEach((value, key) => {
    console.log(`  ${key}: ${value}`);
  });

  // Log body
  let body;
  try {
    const text = await request.text();
    console.log('\nRaw body:', text);

    try {
      body = JSON.parse(text);
      console.log('\nParsed body:', JSON.stringify(body, null, 2));
    } catch {
      console.log('Body is not valid JSON');
    }
  } catch (error) {
    console.log('Error reading body:', error);
  }

  console.log('=== END DIAGNOSTIC ===\n');

  // Return the body in response for easy viewing
  return NextResponse.json({
    message: 'Diagnostic complete - check logs',
    headers: Object.fromEntries(request.headers.entries()),
    body: body || 'Could not parse body',
  });
}
