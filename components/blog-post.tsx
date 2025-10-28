'use client';
import { useState, useEffect, memo } from 'react';
import { motion } from 'motion/react';
import type { NotionBlogPost } from '@/lib/notion/blog';
import MarkdownContent from './markdown-content';

const LoadingSkeleton = memo(function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="skeleton_wrapper w-full h-4"></div>
      <div className="skeleton_wrapper w-5/6 h-4"></div>
      <div className="skeleton_wrapper w-4/6 h-4"></div>
    </div>
  );
});

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const TRANSITION_SECTION = {
  type: 'spring',
  bounce: 0,
  duration: 0.2,
};

interface BlogPostProps {
  post: NotionBlogPost;
  content: string;
}

export default function BlogPost({ post, content }: BlogPostProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Reset scroll on post change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post.slug]);

  useEffect(() => {
    // Reset loading state when post changes
    setIsLoading(true);

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 50); // Reduced from 100ms for faster transition

    return () => clearTimeout(timer);
  }, [post.slug]);

  return (
    <div className="pb-24 mt-[90px]">
      <motion.div
        key={post.slug} // Force remount on post change
        className="space-y-8"
        variants={VARIANTS_CONTAINER}
        initial="hidden"
        animate="visible"
      >
        <motion.header variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-medium text-primary">{post.title}</h1>
              <div className="flex flex-col gap-1 text-sm text-zinc-500">
                <div className="text-xs text-zinc-400 font-mono">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
                {post.categories && post.categories.length > 0 && (
                  <div className="text-xs text-zinc-400 font-mono">
                    {post.categories.join(', ')}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.header>

        <motion.main variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
          <div className="relative">
            {isLoading ? (
              <LoadingSkeleton />
            ) : (
              <div className="prose prose-zinc w-full max-w-none prose-md">
                <MarkdownContent content={content} />
              </div>
            )}
          </div>
        </motion.main>
      </motion.div>
    </div>
  );
}
