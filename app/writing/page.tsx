import { getPublishedBlogPosts } from '@/lib/notion/blog';
import { WritingClient } from './client';

export default async function Writing() {
  const posts = await getPublishedBlogPosts();
  return <WritingClient posts={posts} />;
}
