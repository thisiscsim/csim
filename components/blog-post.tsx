'use client';
import { useState, useEffect, memo } from 'react';
import { motion } from 'motion/react';
import type { NotionBlogPost } from '@/lib/notion/blog';
import MarkdownContent from './markdown-content';

const LoadingSkeleton = memo(function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="h-4 bg-gray-200 rounded w-4/6"></div>
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const TRANSITION_SECTION = {
  type: 'spring',
  bounce: 0,
  duration: 0.3,
};

interface BlogPostProps {
  post: NotionBlogPost;
  content: string;
}

export default function BlogPost({ post, content }: BlogPostProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="space-y-8 pt-24 pb-24"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.header variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-medium text-primary">{post.title}</h1>
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <div className="text-xs text-zinc-400">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              {post.categories && post.categories.length > 0 && (
                <div className="flex items-center gap-2">
                  <span>•</span>
                  <div className="text-xs text-zinc-400">{post.categories.join(', ')}</div>
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
  );
}
