# Nim - Installation Guide

## Prerequisites

- Node.js 20.x or later
- Git

## Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/ibelick/nim.git
   cd nim
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory and add your Notion API credentials:

   ```bash
   cp env.example .env.local
   ```

   Then edit `.env.local` and add your actual values:

   ```env
   NOTION_API_KEY=your_actual_notion_api_key
   NOTION_DATABASE_ID=your_actual_database_id
   ```

   **To get these values:**

   - **Notion API Key**: Go to [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations) and create a new integration
   - **Database ID**: In your Notion database URL, copy the ID between your workspace name and the `?v=` parameter

   **Alternative 1: Using 1Password (Recommended for personal use)**

   Save your `.env.local` contents as a secure note in 1Password, then on new machines:

   ```bash
   # Run the quick setup script
   ./scripts/quick-env-setup.sh

   # Paste your environment variables from 1Password
   # Press Ctrl+D when done
   ```

   **Alternative 2: Using dotenv-vault (Recommended for teams)**

   If you frequently switch between computers, use [dotenv-vault](https://www.dotenv.org/) to sync your environment variables:

   ```bash
   # Install dotenv-vault
   npm install --save-dev dotenv-vault

   # Login to dotenv-vault
   npx dotenv-vault login

   # Push your .env.local to the vault
   npx dotenv-vault push

   # On a new machine, pull your env vars
   npx dotenv-vault pull
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Update the template data**

   Update the template data in the `app/data.ts` file.

   ```ts
   export const EMAIL = 'your@email.com'

   export const SOCIAL_LINKS = [
     {
       label: 'Github',
       link: 'your-github-url',
     },
     // Add your social links
   ]

   ...
   ```

6. **Add your blog posts**

Create a new .mdx file for each blog post inside the app/blog folder. For example:
app/blog/your-article-slug/page.mdx.

Example blog post structure in .mdx:

```mdx
# Your Article Title

Introduction

Your content here...

## Code Examples

// Example code block here...
```

**Note:** You can use all MDX features, including React components, in your blog posts.

7. **Project Structure**

For a better understanding of the Next.js project structure, refer to the [Next.js](https://nextjs.org/docs/app/getting-started/project-structure) documentation.

8. **Additional Features**

Want to add more animated components?
Check out [Motion-Primitives](https://motion-primitives.com/) for additional animation components and templates. If you want something else DM on [X](https://x.com/Ibelick).

9.  **Deployment**

You can deploy your site to any hosting platform that supports Next.js. For the easiest deployment experience, consider using Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fibelick%2Fnim&env=NEXT_PUBLIC_SITE_URL&project-name=nim&repository-name=nim&redirect-url=https%3A%2F%2Ftwitter.com%2Fibelick&demo-title=Nim&demo-description=Nim%20is%20a%20free%20and%20open-source%20minimal%20personal%20website%20template%20built%20with%20Next.js%2015%2C%20React%2019%2C%20and%20Motion-Primitives.&demo-url=https%3A%2F%2Fnim.vercel.app&demo-image=https%3A%2F%2Fraw.githubusercontent.com%2Fibelick%2Fnim%2Frefs%2Fheads%2Fmain%2F.github%2Fassets%2Freadme.png&teamSlug=ibelick)

**Important: Environment Variables in Vercel**

After deploying to Vercel, you need to add your environment variables:

1. Go to your project settings in Vercel
2. Navigate to the "Environment Variables" section
3. Add the following variables:
   - `NOTION_API_KEY`: Your Notion integration API key
   - `NOTION_DATABASE_ID`: Your Notion database ID
4. Redeploy your project for the changes to take effect
