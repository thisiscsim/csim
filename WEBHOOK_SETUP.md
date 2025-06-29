# Notion Webhook Setup for Auto-Publishing

This guide will help you set up automatic blog post updates when you publish content in Notion.

## Overview

When you publish or update blog posts in Notion, the webhook system will:

1. Automatically regenerate your blog data
2. Revalidate Next.js cache
3. Update your live site without manual deployment

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Generate Webhook Secret

Run the setup script to generate a secure webhook secret:

```bash
npm run setup:webhook
```

This will generate a secure `NOTION_WEBHOOK_SECRET` for you. Copy it to your `.env` file.

### 3. Configure Vercel Environment Variables

In your Vercel project settings, add these environment variables:

- `NOTION_API_KEY` - Your Notion integration API key
- `NOTION_DATABASE_ID` - Your blog database ID
- `NOTION_WEBHOOK_SECRET` - The secret generated in step 2

Optional:

- `VERCEL_DEPLOY_HOOK_URL` - If you want to trigger full rebuilds (get from Vercel > Settings > Git > Deploy Hooks)

### 4. Set Up Notion Webhook

1. Go to https://www.notion.so/my-integrations
2. Select your integration (or create one if needed)
3. Navigate to the "Capabilities" tab
4. Enable "Webhooks" if not already enabled
5. Add a new webhook with:
   - **Endpoint URL**: `https://your-site.vercel.app/api/webhook/notion`
   - **Secret**: Your `NOTION_WEBHOOK_SECRET` from step 2
   - **Events**: Select:
     - `page` > `updated`
     - `page` > `created` (optional)

### 5. Test the Setup

1. Make a change to a blog post in Notion (e.g., change status to "Published")
2. Check your Vercel function logs to see the webhook activity
3. Your site should update within a few seconds

## How It Works

The webhook system uses two approaches:

### Incremental Static Regeneration (ISR)

- **Default behavior**: When you update a post, the webhook:
  1. Regenerates the `blog-data.json` file
  2. Revalidates Next.js cache for blog pages
  3. Updates the live site immediately

### Full Rebuild (Optional)

- If you include `fullRebuild: true` in the webhook payload or configure it, the system will trigger a complete Vercel rebuild
- Use this sparingly as it consumes build minutes

## Troubleshooting

### Posts not updating?

1. Check Vercel function logs for webhook activity
2. Verify all environment variables are set correctly
3. Ensure your Notion integration has access to the database
4. Check that posts have "Published" status in Notion

### Testing locally

```bash
# Start your dev server
npm run dev

# In another terminal, test the webhook
curl http://localhost:3000/api/webhook/notion
```

### Manual blog data generation

If needed, you can manually regenerate blog data:

```bash
npm run generate:blog
```

## Alternative Approaches

If webhooks don't suit your needs:

1. **Time-based revalidation**: The site already uses ISR with 1-hour cache
2. **Manual deployment**: Trigger deploys from Vercel dashboard
3. **GitHub Actions**: Set up a cron job to regenerate data periodically

## Security

- Always keep your `NOTION_WEBHOOK_SECRET` secure
- The webhook endpoint validates all requests using this secret
- Don't commit `.env` files to version control

## Need Help?

- Check Vercel function logs for detailed error messages
- Ensure your Notion integration has proper permissions
- Verify webhook configuration in Notion matches your site URL
