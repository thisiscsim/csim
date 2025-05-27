import { notion, databaseId } from './client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { cache } from 'react';
import { NotionToMarkdown } from 'notion-to-md';

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

// Cache the markdown conversion
const fetchPostContent = cache(async (pageId: string): Promise<string> => {
  const mdBlocks = await n2m.pageToMarkdown(pageId);
  return n2m.toMarkdownString(mdBlocks).parent;
});

// Cache the database query
const fetchDatabase = cache(async () => {
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
});

export const getPublishedBlogPosts = cache(async (): Promise<NotionBlogPost[]> => {
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
});

export const getBlogPostBySlug = cache(async (slug: string): Promise<NotionBlogPost | null> => {
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

  // Fetch content in parallel with other operations
  const [content] = await Promise.all([
    fetchPostContent(page.id),
  ]);

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