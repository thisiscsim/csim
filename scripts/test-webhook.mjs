#!/usr/bin/env node

import { config } from 'dotenv';

// Load environment variables
config();

const webhookUrl = process.argv[2] || 'http://localhost:3000/api/webhook/notion';
const secret = process.env.NOTION_WEBHOOK_SECRET;

if (!secret) {
  console.error('❌ NOTION_WEBHOOK_SECRET not found in environment');
  console.log('   Run "npm run setup:webhook" to generate one');
  process.exit(1);
}

console.log(`\n🧪 Testing webhook at: ${webhookUrl}`);
console.log(`🔑 Using secret: ${secret.substring(0, 10)}...`);

// Simulate a Notion webhook payload
const payload = {
  type: 'page',
  action: 'updated',
  page: {
    id: 'test-page-id',
    properties: {
      Title: { title: [{ plain_text: 'Test Blog Post' }] },
      Status: { status: { name: 'Published' } },
    },
  },
  timestamp: new Date().toISOString(),
};

fetch(webhookUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${secret}`,
  },
  body: JSON.stringify(payload),
})
  .then(async (response) => {
    const data = await response.json();
    
    if (response.ok) {
      console.log('\n✅ Webhook test successful!');
      console.log('📊 Response:', JSON.stringify(data, null, 2));
    } else {
      console.error('\n❌ Webhook test failed!');
      console.error(`📊 Status: ${response.status}`);
      console.error('📊 Response:', JSON.stringify(data, null, 2));
    }
  })
  .catch((error) => {
    console.error('\n❌ Failed to connect to webhook!');
    console.error('   Error:', error.message);
    console.log('\n💡 Make sure your dev server is running with "npm run dev"');
  }); 