import { Client } from '@notionhq/client';
import fs from 'fs/promises';
import path from 'path';

async function generateBlogData() {
  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  });

  const databaseId = process.env.NOTION_DATABASE_ID;

  try {
    console.log('Fetching blog posts from Notion...');

    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Status',
        status: {
          equals: 'Published',
        },
      },
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
    });

    const posts = response.results.map((page) => {
      const properties = page.properties;
      const title = properties.Title.title?.[0]?.plain_text || '';
      const slug = properties.Slug.rich_text?.[0]?.plain_text || '';
      const date = properties.Date.date?.start || '';
      const categories = properties.Categories.multi_select?.map((cat) => cat.name) || [];
      const status =
        properties.Status.status?.name?.toLowerCase() === 'published' ? 'published' : 'draft';

      return {
        id: page.id,
        title,
        slug,
        date,
        categories,
        status,
      };
    });

    // Write to public directory for static access
    const outputPath = path.join(process.cwd(), 'public', 'blog-data.json');
    await fs.writeFile(
      outputPath,
      JSON.stringify({ posts, generatedAt: new Date().toISOString() }, null, 2)
    );

    console.log(`Generated blog data with ${posts.length} posts`);
    return posts;
  } catch (error) {
    console.error('Error generating blog data:', error);
    process.exit(1);
  }
}

generateBlogData();
