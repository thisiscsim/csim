import { notion, databaseId } from './client';
import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { NotionToMarkdown } from 'notion-to-md';
import fs from 'fs/promises';
import path from 'path';

export type NotionBlogPost = {
  id: string;
  title: string;
  slug: string;
  date: string;
  categories: string[];
  content?: string;
  status: 'draft' | 'published';
};

type NotionProperty = {
  type: string;
  title?: { plain_text: string }[];
  rich_text?: { plain_text: string }[];
  date?: { start: string };
  multi_select?: { name: string }[];
  status?: { name: string };
};

function normalizeStatus(status: string): 'draft' | 'published' {
  return status.toLowerCase() === 'published' ? 'published' : 'draft';
}

const n2m = new NotionToMarkdown({ notionClient: notion });

// Cache the markdown conversion with Next.js cache
const fetchPostContent = unstable_cache(
  async (pageId: string): Promise<string> => {
    const mdBlocks = await n2m.pageToMarkdown(pageId);
    return n2m.toMarkdownString(mdBlocks).parent;
  },
  ['blog-post-content'],
  {
    revalidate: 3600, // 1 hour
    tags: ['blog-content'],
  }
);

// Cache the database query with Next.js cache for persistence across requests
const fetchDatabase = unstable_cache(
  async () => {
    return notion.databases.query({
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
  },
  ['blog-database'],
  {
    revalidate: 900, // 15 minutes
    tags: ['blog-posts'],
  }
);

// Fast static data loader for production
async function getStaticBlogPosts(): Promise<NotionBlogPost[]> {
  try {
    const jsonPath = path.join(process.cwd(), 'public', 'blog-data.json');
    const data = await fs.readFile(jsonPath, 'utf-8');
    const { posts } = JSON.parse(data);
    return posts;
  } catch (error) {
    console.error('Failed to load static blog data:', error);
    // Fallback to live data
    return getPublishedBlogPostsFromNotion();
  }
}

async function getPublishedBlogPostsFromNotion(): Promise<NotionBlogPost[]> {
  const response = await fetchDatabase();

  return response.results.map((page) => {
    if (!('properties' in page)) {
      throw new Error('Invalid page response');
    }

    const properties = page.properties as Record<string, NotionProperty>;
    const title = properties.Title.title?.[0]?.plain_text || '';
    const slug = properties.Slug.rich_text?.[0]?.plain_text || '';
    const date = properties.Date.date?.start || '';
    const categories = properties.Categories.multi_select?.map((cat) => cat.name) || [];
    const status = normalizeStatus(properties.Status.status?.name || 'draft');

    return {
      id: page.id,
      title,
      slug,
      date,
      categories,
      status,
    };
  });
}

export const getPublishedBlogPosts = cache(async (): Promise<NotionBlogPost[]> => {
  // Use static data in production for fast loading
  if (process.env.NODE_ENV === 'production') {
    return getStaticBlogPosts();
  }
  // Use live data in development
  return getPublishedBlogPostsFromNotion();
});

export const getBlogPostBySlug = cache(async (slug: string): Promise<NotionBlogPost | null> => {
  // First try to get from static data for better performance
  if (process.env.NODE_ENV === 'production') {
    try {
      const posts = await getStaticBlogPosts();
      const post = posts.find((p) => p.slug === slug);
      if (post) {
        // For individual posts, we still need to fetch content from Notion
        const content = await fetchPostContent(post.id);
        return { ...post, content };
      }
    } catch (error) {
      console.error('Failed to get post from static data:', error);
    }
  }

  // Fallback to Notion API
  const response = await fetchDatabase();

  const page = response.results.find((page) => {
    if (!('properties' in page)) return false;
    const properties = page.properties as Record<string, NotionProperty>;
    const pageSlug = properties.Slug.rich_text?.[0]?.plain_text || '';
    return pageSlug === slug;
  });

  if (!page || !('properties' in page)) {
    return null;
  }

  const properties = page.properties as Record<string, NotionProperty>;
  const title = properties.Title.title?.[0]?.plain_text || '';
  const date = properties.Date.date?.start || '';
  const categories = properties.Categories.multi_select?.map((cat) => cat.name) || [];
  const status = normalizeStatus(properties.Status.status?.name || 'draft');

  // Fetch content with caching
  const content = await fetchPostContent(page.id);

  return {
    id: page.id,
    title,
    slug,
    date,
    categories,
    content,
    status,
  };
});
