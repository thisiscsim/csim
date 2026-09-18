'use client';
import ReactMarkdown from 'react-markdown';
import { memo } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

const generateId = (children: any): string => {
  const text = typeof children === 'string' ? children : children?.toString() || '';
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
};

const HEADING_CLASS =
  '-my-[10px] text-[14px]/[22px] font-semibold fg-base transition-colors duration-300 first:mt-0 last:mb-0';

const H1Component = memo(function H1Component({ node: _node, children, ...props }: any) {
  const id = generateId(children);
  return (
    <h1 id={id} className={HEADING_CLASS} {...props}>
      {children}
    </h1>
  );
});

const H2Component = memo(function H2Component({ node: _node, children, ...props }: any) {
  const id = generateId(children);
  return (
    <h2 id={id} className={HEADING_CLASS} {...props}>
      {children}
    </h2>
  );
});

const H3Component = memo(function H3Component({ node: _node, children, ...props }: any) {
  const id = generateId(children);
  return (
    <h3 id={id} className={HEADING_CLASS} {...props}>
      {children}
    </h3>
  );
});

const H4Component = memo(function H4Component({ node: _node, children, ...props }: any) {
  const id = generateId(children);
  return (
    <h4 id={id} className={HEADING_CLASS} {...props}>
      {children}
    </h4>
  );
});

const H5Component = memo(function H5Component({ node: _node, children, ...props }: any) {
  const id = generateId(children);
  return (
    <h5 id={id} className={HEADING_CLASS} {...props}>
      {children}
    </h5>
  );
});

const H6Component = memo(function H6Component({ node: _node, children, ...props }: any) {
  const id = generateId(children);
  return (
    <h6 id={id} className={HEADING_CLASS} {...props}>
      {children}
    </h6>
  );
});

const PComponent = memo(function PComponent({ node: _node, ...props }: any) {
  return (
    <p
      className="text-[14px]/[22px] font-normal transition-colors duration-300 fg-base"
      {...props}
    />
  );
});

const UlComponent = memo(function UlComponent({ node: _node, ...props }: any) {
  return (
    <ul
      className="list-disc pl-[24px] text-[14px]/[22px] font-normal transition-colors duration-300 fg-base"
      {...props}
    />
  );
});

const OlComponent = memo(function OlComponent({ node: _node, ...props }: any) {
  return (
    <ol
      className="list-decimal pl-[24px] text-[14px]/[22px] font-normal transition-colors duration-300 fg-base"
      {...props}
    />
  );
});

const LiComponent = memo(function LiComponent({ node: _node, ...props }: any) {
  return <li className="transition-colors duration-300 fg-base" {...props} />;
});

const AComponent = memo(function AComponent({ node: _node, ...props }: any) {
  return (
    <a className="fg-base underline hover:opacity-70 transition-opacity duration-300" {...props} />
  );
});

const BlockquoteComponent = memo(function BlockquoteComponent({ node: _node, ...props }: any) {
  return (
    <blockquote
      className="border-l-4 pl-[16px] text-[14px]/[22px] italic transition-colors duration-300 border-base"
      {...props}
    />
  );
});

const PreComponent = memo(function PreComponent({ node: _node, ...props }: any) {
  return (
    <pre
      className="overflow-x-auto rounded bg-interactive p-[16px] transition-colors duration-300 fg-base"
      {...props}
    />
  );
});

const CodeComponent = memo(function CodeComponent({
  node: _node,
  className,
  children,
  ...props
}: any) {
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

const ImgComponent = memo(function ImgComponent({ node: _node, src, alt, ...props }: any) {
  // Check if alt text looks like a filename (contains file extension)
  const isFilename = alt && /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)$/i.test(alt);
  const shouldShowCaption = alt && !isFilename;

  return (
    <span className="block my-8">
      <img
        src={src}
        alt={alt || ''}
        className="w-full h-auto rounded-lg border-[0.5px] border-base"
        loading="lazy"
        {...props}
      />
      {shouldShowCaption && (
        <span className="mt-1 block text-center text-sm italic transition-colors duration-300 fg-muted">
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
  h5: H5Component,
  h6: H6Component,
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
  return (
    <div className="flex flex-col gap-[22px] text-[14px]/[22px]">
      <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
    </div>
  );
});

export default MarkdownContent;
