'use client';
import ReactMarkdown from 'react-markdown';
import { memo } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

const generateId = (children: any): string => {
  const text = typeof children === 'string' ? children : children?.toString() || '';
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
};

const H1Component = memo(function H1Component({ _node, children, ...props }: any) {
  const id = generateId(children);
  return (
    <h1
      id={id}
      className="text-2xl font-medium mt-8 mb-4 fg-base transition-colors duration-300"
      {...props}
    >
      {children}
    </h1>
  );
});

const H2Component = memo(function H2Component({ _node, children, ...props }: any) {
  const id = generateId(children);
  return (
    <h2
      id={id}
      className="text-xl font-medium mt-6 mb-3 fg-base transition-colors duration-300"
      {...props}
    >
      {children}
    </h2>
  );
});

const H3Component = memo(function H3Component({ _node, children, ...props }: any) {
  const id = generateId(children);
  return (
    <h3
      id={id}
      className="text-lg font-medium mt-4 mb-2 fg-base transition-colors duration-300"
      {...props}
    >
      {children}
    </h3>
  );
});

const H4Component = memo(function H4Component({ _node, ...props }: any) {
  return (
    <h4
      className="text-base font-medium mt-3 mb-2 fg-base transition-colors duration-300"
      {...props}
    />
  );
});

const PComponent = memo(function PComponent({ _node, ...props }: any) {
  return <p className="my-4 fg-base transition-colors duration-300" {...props} />;
});

const UlComponent = memo(function UlComponent({ _node, ...props }: any) {
  return <ul className="list-disc pl-6 my-4 fg-base transition-colors duration-300" {...props} />;
});

const OlComponent = memo(function OlComponent({ _node, ...props }: any) {
  return (
    <ol className="list-decimal pl-6 my-4 fg-base transition-colors duration-300" {...props} />
  );
});

const LiComponent = memo(function LiComponent({ _node, ...props }: any) {
  return <li className="my-1 fg-base transition-colors duration-300" {...props} />;
});

const AComponent = memo(function AComponent({ _node, ...props }: any) {
  return (
    <a className="fg-base underline hover:opacity-70 transition-opacity duration-300" {...props} />
  );
});

const BlockquoteComponent = memo(function BlockquoteComponent({ _node, ...props }: any) {
  return (
    <blockquote
      className="border-l-4 border-base pl-4 my-4 italic transition-colors duration-300"
      {...props}
    />
  );
});

const PreComponent = memo(function PreComponent({ _node, ...props }: any) {
  return (
    <pre
      className="bg-interactive rounded p-4 my-4 overflow-x-auto fg-base transition-colors duration-300"
      {...props}
    />
  );
});

const CodeComponent = memo(function CodeComponent({ _node, className, children, ...props }: any) {
  return !className ? (
    <code
      className="bg-interactive rounded px-1 py-0.5 fg-base transition-colors duration-300"
      {...props}
    >
      {children}
    </code>
  ) : (
    <code className="fg-base transition-colors duration-300" {...props}>
      {children}
    </code>
  );
});

const ImgComponent = memo(function ImgComponent({ _node, src, alt, ...props }: any) {
  // Check if alt text looks like a filename (contains file extension)
  const isFilename = alt && /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)$/i.test(alt);
  const shouldShowCaption = alt && !isFilename;

  return (
    <span className="block my-8">
      <img
        src={src}
        alt={alt || ''}
        className="w-full h-auto rounded-lg"
        loading="lazy"
        {...props}
      />
      {shouldShowCaption && (
        <span className="block text-sm fg-muted text-center mt-1 italic transition-colors duration-300">
          {alt}
        </span>
      )}
    </span>
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
  img: ImgComponent,
};

// Memoize the entire component to prevent unnecessary re-renders
const MarkdownContent = memo(function MarkdownContent({ content }: { content: string }) {
  return <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>;
});

export default MarkdownContent;
