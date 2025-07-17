'use client';
import ReactMarkdown from 'react-markdown';
import { memo } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

const H1Component = memo(function H1Component({ _node, ...props }: any) {
  return <h1 className="text-2xl font-medium mt-8 mb-4" {...props} />;
});

const H2Component = memo(function H2Component({ _node, ...props }: any) {
  return <h2 className="text-xl font-medium mt-6 mb-3" {...props} />;
});

const H3Component = memo(function H3Component({ _node, ...props }: any) {
  return <h3 className="text-lg font-medium mt-4 mb-2" {...props} />;
});

const H4Component = memo(function H4Component({ _node, ...props }: any) {
  return <h4 className="text-base font-medium mt-3 mb-2" {...props} />;
});

const PComponent = memo(function PComponent({ _node, ...props }: any) {
  return <p className="my-4" {...props} />;
});

const UlComponent = memo(function UlComponent({ _node, ...props }: any) {
  return <ul className="list-disc pl-6 my-4" {...props} />;
});

const OlComponent = memo(function OlComponent({ _node, ...props }: any) {
  return <ol className="list-decimal pl-6 my-4" {...props} />;
});

const LiComponent = memo(function LiComponent({ _node, ...props }: any) {
  return <li className="my-1" {...props} />;
});

const AComponent = memo(function AComponent({ _node, ...props }: any) {
  return <a className="text-blue-600 hover:underline" {...props} />;
});

const BlockquoteComponent = memo(function BlockquoteComponent({ _node, ...props }: any) {
  return <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic" {...props} />;
});

const PreComponent = memo(function PreComponent({ _node, ...props }: any) {
  return <pre className="bg-zinc-200 rounded p-4 my-4 overflow-x-auto text-zinc-900" {...props} />;
});

const CodeComponent = memo(function CodeComponent({ _node, className, children, ...props }: any) {
  return !className ? (
    <code className="bg-zinc-200 rounded px-1 py-0.5 text-zinc-900" {...props}>
      {children}
    </code>
  ) : (
    <code className="text-zinc-900" {...props}>
      {children}
    </code>
  );
});

const markdownComponents = {
  h1: H1Component,
  h2: H2Component,
  h3: H3Component,
  h4: H4Component,
  p: PComponent,
  ul: UlComponent,
  ol: OlComponent,
  li: LiComponent,
  a: AComponent,
  blockquote: BlockquoteComponent,
  pre: PreComponent,
  code: CodeComponent,
};

// Memoize the entire component to prevent unnecessary re-renders
const MarkdownContent = memo(function MarkdownContent({ content }: { content: string }) {
  return <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>;
});

export default MarkdownContent;
