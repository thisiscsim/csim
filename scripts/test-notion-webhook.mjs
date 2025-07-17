#!/usr/bin/env node

import { config } from 'dotenv';
import { createHmac } from 'crypto';

// Load environment variables
config();

const webhookUrl = process.argv[2] || 'http://localhost:3000/api/webhook/notion';
const verificationToken = process.env.NOTION_VERIFICATION_TOKEN;

if (!verificationToken) {
  console.error('❌ NOTION_VERIFICATION_TOKEN not found in environment');
  process.exit(1);
}

console.log(`\n🧪 Testing Notion webhook at: ${webhookUrl}`);
console.log(`🔑 Using verification token: ${verificationToken.substring(0, 20)}...`);

// Simulate a Notion webhook payload
const payload = {
  type: 'page',
  action: 'updated',
  page: {
    id: 'test-page-id-123',
    properties: {
      Title: { title: [{ plain_text: 'Test Blog Post Update' }] },
      Status: { status: { name: 'Published' } },
    },
  },
  timestamp: new Date().toISOString(),
};

// Create Notion-style signature
const bodyString = JSON.stringify(payload);
const signature = `sha256=${createHmac('sha256', verificationToken).update(bodyString).digest('hex')}`;

console.log(`📝 Generated signature: ${signature.substring(0, 30)}...`);

fetch(webhookUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Notion-Signature': signature,
  },
  body: bodyString,
})
.then(async (response) => {
  const data = await response.json();

  if (response.ok) {
    console.log('\n✅ Notion webhook test successful!');
    console.log('📊 Response:', JSON.stringify(data, null, 2));
  } else {
    console.error('\n❌ Notion webhook test failed!');
    console.error(`📊 Status: ${response.status}`);
    console.error('📊 Response:', JSON.stringify(data, null, 2));
  }
})
.catch((error) => {
  console.error('\n❌ Failed to connect to webhook!');
  console.error('   Error:', error.message);
  console.log('\n💡 Make sure your dev server is running with "npm run dev"');
}); 