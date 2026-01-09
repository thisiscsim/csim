import { getPublishedBlogPosts } from '@/lib/notion/blog';
import { WritingListClient } from './writing-list-client';

// Revalidate every hour
export const revalidate = 3600;

export default async function Writing() {
  const posts = await getPublishedBlogPosts();

  if (posts.length === 0) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <p className="fg-subtle transition-colors duration-300">No blog posts available yet.</p>
      </div>
    );
  }

  return <WritingListClient posts={posts} />;
}
