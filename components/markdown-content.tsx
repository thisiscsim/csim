'use client'
import ReactMarkdown from 'react-markdown'
import { memo } from 'react'

const markdownComponents = {
  h1: memo(({ node, ...props }: any) => <h1 className="text-2xl font-bold mt-8 mb-4" {...props} />),
  h2: memo(({ node, ...props }: any) => <h2 className="text-xl font-bold mt-6 mb-3" {...props} />),
  h3: memo(({ node, ...props }: any) => <h3 className="text-lg font-bold mt-4 mb-2" {...props} />),
  h4: memo(({ node, ...props }: any) => <h4 className="text-base font-bold mt-3 mb-2" {...props} />),
  p: memo(({ node, ...props }: any) => <p className="my-4" {...props} />),
  ul: memo(({ node, ...props }: any) => <ul className="list-disc pl-6 my-4" {...props} />),
  ol: memo(({ node, ...props }: any) => <ol className="list-decimal pl-6 my-4" {...props} />),
  li: memo(({ node, ...props }: any) => <li className="my-1" {...props} />),
  a: memo(({ node, ...props }: any) => <a className="text-blue-600 dark:text-blue-400 hover:underline" {...props} />),
  blockquote: memo(({ node, ...props }: any) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 my-4 italic" {...props} />),
  pre: memo(({ node, ...props }: any) => (
    <pre className="bg-zinc-200 dark:bg-zinc-800 rounded p-4 my-4 overflow-x-auto text-zinc-900 dark:text-zinc-100" {...props} />
  )),
  code: memo(({ node, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '');
    return !className ? (
      <code className="bg-zinc-200 dark:bg-zinc-800 rounded px-1 py-0.5 text-zinc-900 dark:text-zinc-100" {...props}>
        {children}
      </code>
    ) : (
      <code className="text-zinc-900 dark:text-zinc-100" {...props}>
        {children}
      </code>
    );
  }),
}

// Memoize the entire component to prevent unnecessary re-renders
const MarkdownContent = memo(function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown components={markdownComponents}>
      {content}
    </ReactMarkdown>
  )
})

export default MarkdownContent 