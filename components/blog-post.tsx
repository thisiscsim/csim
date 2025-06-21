'use client';
import { motion } from 'motion/react';
import type { NotionBlogPost } from '@/lib/notion/blog';
import { Suspense, lazy } from 'react';
import { Breadcrumbs, BreadcrumbItem } from '@heroui/breadcrumbs';

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

const TRANSITION_SECTION = {
  duration: 0.3,
};

// Lazy load the markdown content
const MarkdownContent = lazy(() => import('./markdown-content'));

// Loading skeleton for markdown content
function MarkdownSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-4/6"></div>
        </div>
      ))}
    </div>
  );
}

export function BlogPostClient({ post }: { post: NotionBlogPost }) {
  return (
    <motion.main
      className="space-y-8"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
        className="max-w-4xl mx-auto px-4"
      >
        <article className="w-full">
          {/* Breadcrumb */}
          <div className="mb-12">
            <Breadcrumbs
              size="sm"
              itemClasses={{
                item: 'text-zinc-500 dark:text-zinc-400 data-[current=true]:text-zinc-700 dark:data-[current=true]:text-zinc-200',
                separator: 'text-zinc-400 dark:text-zinc-500',
              }}
            >
              <BreadcrumbItem href="/writing">Writing</BreadcrumbItem>
              <BreadcrumbItem isCurrent>{post.title}</BreadcrumbItem>
            </Breadcrumbs>
          </div>

          {/* Header Section */}
          <header className="mb-12">
            {/* Title */}
            <h1 className="text-5xl font-bold mb-8 leading-tight">{post.title}</h1>

            {/* Metadata Section with top and bottom borders */}
            <div className="relative">
              {/* Stacked metadata */}
              <div className="space-y-3">
                {/* Date */}
                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                  <div className="text-xs uppercase text-zinc-400 dark:text-zinc-500 mb-1">
                    Published
                  </div>
                  <time dateTime={post.date} className="font-medium">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>

                {/* Categories */}
                {post.categories.length > 0 && (
                  <div className="text-sm">
                    <div className="text-xs uppercase text-zinc-400 dark:text-zinc-500 mb-1">
                      Categories
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {post.categories.map((category) => (
                        <span
                          key={category}
                          className="text-zinc-600 dark:text-zinc-300 font-medium"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-zinc dark:prose-invert w-full max-w-none prose-lg">
            <Suspense fallback={<MarkdownSkeleton />}>
              <MarkdownContent content={post.content || ''} />
              {(!post.content || post.content.trim() === '') && (
                <p className="text-gray-500 italic">No content available</p>
              )}
            </Suspense>
          </div>
        </article>
      </motion.section>
    </motion.main>
  );
}
