#!/usr/bin/env node

import { config } from 'dotenv';

// Load environment variables
config();

const currentDomain = process.argv[2];
const newDomain = process.argv[3];

if (!currentDomain || !newDomain) {
  console.log('\n📋 Webhook Domain Migration Helper\n');
  console.log('Usage: npm run update:webhook-domain <current-domain> <new-domain>');
  console.log('Example: npm run update:webhook-domain csim.vercel.app mydomain.com\n');
  process.exit(0);
}

console.log('\n🔄 Webhook Domain Migration Guide\n');
console.log(`Current webhook URL: https://${currentDomain}/api/webhook/notion`);
console.log(`New webhook URL: https://${newDomain}/api/webhook/notion\n`);

console.log('📝 Steps to update your webhook:\n');
console.log('1. Go to https://www.notion.so/my-integrations');
console.log('2. Select your integration');
console.log('3. Find your existing webhook');
console.log('4. Update the URL to the new domain');
console.log('5. Keep the same webhook secret (no need to change it)');
console.log('6. Save the changes\n');

console.log('✅ Important notes:');
console.log('   - Your old Vercel URL will continue to work');
console.log('   - No code changes are needed');
console.log('   - The webhook secret remains the same');
console.log('   - Test the new webhook after updating\n');

if (process.env.NOTION_WEBHOOK_SECRET) {
  console.log('🔑 Your current webhook secret:');
  console.log(`   ${process.env.NOTION_WEBHOOK_SECRET.substring(0, 20)}...`);
  console.log('   (Keep this the same in Notion)\n');
}

console.log('🧪 To test after updating:');
console.log(`   npm run test:webhook https://${newDomain}/api/webhook/notion\n`); 