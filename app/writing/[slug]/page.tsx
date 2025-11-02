import { getBlogPostBySlug, getPublishedBlogPosts } from '@/lib/notion/blog';
import { notFound } from 'next/navigation';
import BlogPost from '@/components/blog-post';
import { Suspense } from 'react';

// Revalidate every hour
export const revalidate = 3600;

// Generate static params for the most recent 10 posts (increased from 5)
export async function generateStaticParams() {
  const posts = await getPublishedBlogPosts();
  return posts.slice(0, 10).map((post) => ({
    slug: post.slug,
  }));
}

// Loading component for the blog post
function LoadingSkeleton() {
  return (
    <div className="min-h-[60vh] pb-24">
      <div className="space-y-6">
        {/* Title */}
        <div className="skeleton_wrapper w-3/4 h-10 mb-4"></div>
        {/* Date */}
        <div className="skeleton_wrapper w-1/4 h-4 mb-8"></div>
        {/* Content */}
        <div className="space-y-3">
          <div className="skeleton_wrapper w-full h-4"></div>
          <div className="skeleton_wrapper w-5/6 h-4"></div>
          <div className="skeleton_wrapper w-4/6 h-4"></div>
          <div className="skeleton_wrapper w-full h-4 mt-6"></div>
          <div className="skeleton_wrapper w-5/6 h-4"></div>
          <div className="skeleton_wrapper w-3/6 h-4"></div>
        </div>
      </div>
    </div>
  );
}

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function WritingPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = await getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="relative">
      <Suspense fallback={<LoadingSkeleton />}>
        <BlogPost post={post} content={post.content || ''} />
      </Suspense>
    </div>
  );
}
