'use client'
import { motion } from 'framer-motion'
import type { NotionBlogPost } from '@/lib/notion/blog'
import ReactMarkdown from 'react-markdown'
import { Suspense, lazy } from 'react'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
  duration: 0.3,
}

// Lazy load the markdown content
const MarkdownContent = lazy(() => import('./markdown-content'))

export function BlogPostClient({ post }: { post: NotionBlogPost }) {
  return (
    <motion.main
      className="space-y-24"
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
          <header className="mb-8">
            <h1 className="text-3xl font-semibold">{post.title}</h1>
            <div className="mt-2 flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <div className="flex gap-2">
                {post.categories.map((category) => (
                  <span
                    key={category}
                    className="rounded-full bg-zinc-100 px-2 py-1 text-xs dark:bg-zinc-800"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </header>
          <div className="prose prose-zinc dark:prose-invert w-full max-w-none">
            <Suspense fallback={<div className="animate-pulse h-96 bg-gray-200 dark:bg-gray-800 rounded-lg" />}>
              <MarkdownContent content={post.content || ''} />
            </Suspense>
          </div>
        </article>
      </motion.section>
    </motion.main>
  )
} 