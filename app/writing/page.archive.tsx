import { getPublishedBlogPosts } from '@/lib/notion/blog';
import { WritingClient } from './client';

// Revalidate every hour
export const revalidate = 3600;

// Generate metadata for better SEO
export const metadata = {
  title: 'Writing',
  description: 'Infrequent thoughts on design, the future, current state of society, and life.',
};

export default async function Writing() {
  const posts = await getPublishedBlogPosts();
  return <WritingClient posts={posts} />;
}
