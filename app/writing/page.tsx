import { getPublishedBlogPosts } from '@/lib/notion/blog';
import { redirect } from 'next/navigation';

// Revalidate every hour
export const revalidate = 3600;

export default async function Writing() {
  const posts = await getPublishedBlogPosts();

  // Redirect to the first blog post if available
  if (posts.length > 0) {
    redirect(`/writing/${posts[0].slug}`);
  }

  // If no posts, show a simple message
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">No blog posts available yet.</p>
    </div>
  );
}
