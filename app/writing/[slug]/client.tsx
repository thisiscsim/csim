'use client';
import { motion } from 'framer-motion';
import type { NotionBlogPost } from '@/lib/notion/blog';
import { TextMorph } from '@/components/ui/text-morph';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import type { ReactMarkdownProps } from 'react-markdown/lib/complex-types';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

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

function CopyButton() {
  const [text, setText] = useState('Copy');
  const [url, setUrl] = useState('');

  // Set URL after mount to avoid hydration mismatch
  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (text === 'Copied') {
      const timer = setTimeout(() => {
        setText('Copy');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [text]);

  return (
    <button
      onClick={() => {
        setText('Copied');
        navigator.clipboard.writeText(url);
      }}
      className="font-base flex items-center gap-1 text-center text-sm text-zinc-500 transition-colors dark:text-zinc-400"
      type="button"
    >
      <TextMorph>{text}</TextMorph>
      <span>URL</span>
    </button>
  );
}

function FormattedDate({ date }: { date: string }) {
  const [formattedDate, setFormattedDate] = useState(date);

  // Format date on client-side to avoid hydration mismatch
  useEffect(() => {
    setFormattedDate(
      new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    );
  }, [date]);

  return <time dateTime={date}>{formattedDate}</time>;
}

export function BlogPostClient({ post }: { post: NotionBlogPost }) {
  // Use useEffect for client-side logging to avoid hydration mismatches
  useEffect(() => {
    console.log('BlogPostClient mounted');

    // This helps avoid hydration errors when there are dynamic calculations in components
    document.documentElement.classList.add('client-rendered');
  }, []);
  return (
    <>
      <div className="pointer-events-none fixed left-0 top-0 z-10 h-12 w-full bg-gray-100 to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)] dark:bg-zinc-950" />
      <ScrollProgress
        className="fixed top-0 z-20 h-0.5 bg-gray-300 dark:bg-zinc-600"
        springOptions={{
          bounce: 0,
        }}
      />

      <div className="absolute right-4 top-24">
        <CopyButton />
      </div>

      <motion.main
        className="mt-24 pb-20"
        variants={VARIANTS_CONTAINER}
        initial="hidden"
        animate="visible"
      >
        <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
          <article>
            <header className="mb-8">
              <h1 className="text-3xl font-bold">{post.title}</h1>
              <div className="mt-4 flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                <FormattedDate date={post.date} />
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
            <div>hello world</div>
            <div className="prose prose-gray dark:prose-invert max-w-none prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-h4:text-base prose-img:rounded-lg prose-img:shadow-md prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-hr:border-zinc-200 dark:prose-hr:border-zinc-800 prose-ul:list-disc prose-ol:list-decimal">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }: ReactMarkdownProps) => (
                    <h1 className="text-2xl font-bold mt-8 mb-4" {...props} />
                  ),
                  h2: ({ node, ...props }: ReactMarkdownProps) => (
                    <h2 className="text-xl font-bold mt-6 mb-3" {...props} />
                  ),
                  h3: ({ node, ...props }: ReactMarkdownProps) => (
                    <h3 className="text-lg font-bold mt-4 mb-2" {...props} />
                  ),
                  h4: ({ node, ...props }: ReactMarkdownProps) => (
                    <h4 className="text-base font-bold mt-3 mb-2" {...props} />
                  ),
                  p: ({ node, ...props }: ReactMarkdownProps) => <p className="my-4" {...props} />,
                  ul: ({ node, ...props }: ReactMarkdownProps) => (
                    <ul className="list-disc pl-6 my-4" {...props} />
                  ),
                  ol: ({ node, ...props }: ReactMarkdownProps) => (
                    <ol className="list-decimal pl-6 my-4" {...props} />
                  ),
                  li: ({ node, ...props }: ReactMarkdownProps) => (
                    <li className="my-1" {...props} />
                  ),
                  a: ({ node, ...props }: ReactMarkdownProps) => (
                    <a className="text-blue-600 dark:text-blue-400 hover:underline" {...props} />
                  ),
                  blockquote: ({ node, ...props }: ReactMarkdownProps) => (
                    <blockquote
                      className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 my-4 italic"
                      {...props}
                    />
                  ),
                  code: ({
                    node,
                    className,
                    children,
                    ...props
                  }: {
                    node?: any;
                    className?: string;
                    children?: React.ReactNode;
                  } & ReactMarkdownProps) => {
                    return !className ? (
                      <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5" {...props}>
                        {children}
                      </code>
                    ) : (
                      <code
                        className="block bg-gray-100 dark:bg-gray-800 rounded p-4 my-4 overflow-x-auto"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {post.content || ''}
              </ReactMarkdown>
              {/* If content is undefined or empty, provide a fallback */}
              {(!post.content || post.content.trim() === '') && (
                <p className="text-gray-500 italic">No content available</p>
              )}
            </div>
          </article>
        </motion.section>
      </motion.main>
    </>
  );
}
