import { getBlogPostBySlug, getPublishedBlogPosts } from '@/lib/notion/blog';
import { notFound } from 'next/navigation';
import { BlogPostClient } from '@/components/blog-post';
import { Suspense } from 'react';

// Revalidate every hour
export const revalidate = 3600;

// Generate static params for the most recent 5 posts
export async function generateStaticParams() {
  const posts = await getPublishedBlogPosts();
  return posts.slice(0, 5).map((post) => ({
    slug: post.slug,
  }));
}

// Loading component for the blog post
function BlogPostLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 space-y-8">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-8"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  );
}

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function WritingPostPage({ params }: Props) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <Suspense fallback={<BlogPostLoading />}>
      <BlogPostClient post={post} />
    </Suspense>
  );
} 