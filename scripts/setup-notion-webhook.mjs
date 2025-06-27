#!/usr/bin/env node

import { config } from 'dotenv';
import crypto from 'crypto';

// Load environment variables
config();

console.log('\n🔧 Notion Webhook Setup Guide\n');

// Generate a secure webhook secret if not present
if (!process.env.NOTION_WEBHOOK_SECRET) {
  const secret = crypto.randomBytes(32).toString('hex');
  console.log('📝 Generated webhook secret:');
  console.log(`   NOTION_WEBHOOK_SECRET=${secret}\n`);
  console.log('   Add this to your .env file\n');
} else {
  console.log('✅ Webhook secret already configured\n');
}

// Display webhook URL
const baseUrl = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://your-site.vercel.app';
const webhookUrl = `${baseUrl}/api/webhook/notion`;

console.log('🌐 Your webhook endpoint URL:');
console.log(`   ${webhookUrl}\n`);

console.log('📋 Setup Instructions:\n');
console.log('1. Setting up in Vercel:');
console.log('   - Go to your project settings in Vercel');
console.log('   - Add these environment variables:');
console.log('     • NOTION_WEBHOOK_SECRET (from above)');
console.log('     • NOTION_API_KEY (your Notion integration key)');
console.log('     • NOTION_DATABASE_ID (your blog database ID)');
console.log('   - Optional: Create a deploy hook in Git settings for full rebuilds\n');

console.log('2. Setting up in Notion:');
console.log('   - Go to https://www.notion.so/my-integrations');
console.log('   - Select your integration or create a new one');
console.log('   - Go to the "Capabilities" tab');
console.log('   - Enable "Webhooks" if not already enabled');
console.log('   - Add a new webhook with:');
console.log(`     • Endpoint URL: ${webhookUrl}`);
console.log('     • Secret: Use the NOTION_WEBHOOK_SECRET from above');
console.log('     • Events: Select "page" > "updated" (or customize as needed)\n');

console.log('3. Testing the webhook:');
console.log('   - In development, you can test with:');
console.log(`     curl ${webhookUrl.replace('https://your-site.vercel.app', 'http://localhost:3000')}`);
console.log('   - Make a change to a blog post in Notion');
console.log('   - Check your Vercel function logs to see the webhook activity\n');

console.log('📌 Alternative Approaches:\n');
console.log('   - For immediate updates: Use the webhook endpoint');
console.log('   - For less frequent updates: Use ISR with revalidate time');
console.log('   - For manual updates: Trigger a deploy from Vercel dashboard\n');

console.log('🔗 Useful Links:');
console.log('   - Notion Webhooks Docs: https://developers.notion.com/docs/using-webhooks');
console.log('   - Vercel Deploy Hooks: https://vercel.com/docs/concepts/git/deploy-hooks');
console.log('   - Next.js ISR: https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration\n'); 