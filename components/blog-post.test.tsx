import { render } from '@testing-library/react';
import { act } from 'react';
import BlogPost from './blog-post';
import type { NotionBlogPost } from '@/lib/notion/blog';
import React from 'react';

// Mock framer-motion
jest.mock('motion/react', () => ({
  motion: {
    div: ({
      children,
      ...props
    }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => (
      <div {...props}>{children}</div>
    ),
    header: ({
      children,
      ...props
    }: React.PropsWithChildren<React.HTMLAttributes<HTMLElement>>) => (
      <header {...props}>{children}</header>
    ),
    main: ({ children, ...props }: React.PropsWithChildren<React.HTMLAttributes<HTMLElement>>) => (
      <main {...props}>{children}</main>
    ),
  },
}));

// Mock MarkdownContent component
jest.mock('./markdown-content', () => ({
  __esModule: true,
  default: ({ content }: { content: string }) => <div>{content}</div>,
}));

const mockPost: NotionBlogPost = {
  id: 'test-id',
  title: 'Test Blog Post',
  slug: 'test-blog-post',
  date: '2024-01-01',
  categories: ['Test'],
  content:
    '# Heading 1\n\nTest content\n\n## Heading 2\n\nMore content\n\n### Heading 3\n\nEven more content',
};

describe('BlogPost Scroll Gradient', () => {
  beforeEach(() => {
    // Reset scroll position before each test
    Object.defineProperty(window, 'scrollY', { writable: true, value: 0 });
    Object.defineProperty(document.documentElement, 'scrollTop', {
      writable: true,
      value: 0,
    });
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      writable: true,
      value: 2000,
    });
    Object.defineProperty(window, 'innerHeight', { writable: true, value: 800 });

    // Mock getElementById for heading navigation
    document.getElementById = jest.fn(() => null);
  });

  test('1. The `isScrolled` state is initially false when at the top of the page', () => {
    const { container } = render(<BlogPost post={mockPost} content={mockPost.content || ''} />);

    // Find the top gradient overlay
    const gradients = container.querySelectorAll('[class*="fixed"]');
    const topGradient = Array.from(gradients).find((el) => el.className.includes('top-0'));

    expect(topGradient).toBeInTheDocument();
    expect(topGradient).toHaveClass('opacity-0');
  });

  test('2. The `isScrolled` state becomes true after scrolling down from the top', () => {
    const { container } = render(<BlogPost post={mockPost} content={mockPost.content || ''} />);

    // Scroll down
    act(() => {
      Object.defineProperty(window, 'scrollY', { writable: true, value: 100 });
      Object.defineProperty(document.documentElement, 'scrollTop', {
        writable: true,
        value: 100,
      });
      window.dispatchEvent(new Event('scroll'));
    });

    // Find the top gradient overlay
    const gradients = container.querySelectorAll('[class*="fixed"]');
    const topGradient = Array.from(gradients).find((el) => el.className.includes('top-0'));

    expect(topGradient).toHaveClass('opacity-100');
  });

  test('3. The `showBottomGradient` state is initially true if content extends beyond the viewport', () => {
    const { container } = render(<BlogPost post={mockPost} content={mockPost.content || ''} />);

    const gradients = container.querySelectorAll('[class*="fixed"]');
    const bottomGradient = Array.from(gradients).find((el) => el.className.includes('bottom-0'));

    expect(bottomGradient).toBeInTheDocument();
    expect(bottomGradient).toHaveClass('opacity-100');
  });

  test('4. The `showBottomGradient` state becomes false when scrolled to the very bottom of the page', () => {
    const { container } = render(<BlogPost post={mockPost} content={mockPost.content || ''} />);

    // Scroll to bottom (scrollTop + clientHeight = scrollHeight)
    act(() => {
      Object.defineProperty(window, 'scrollY', { writable: true, value: 1200 });
      Object.defineProperty(document.documentElement, 'scrollTop', {
        writable: true,
        value: 1200,
      });
      window.dispatchEvent(new Event('scroll'));
    });

    const gradients = container.querySelectorAll('[class*="fixed"]');
    const bottomGradient = Array.from(gradients).find((el) => el.className.includes('bottom-0'));

    expect(bottomGradient).toHaveClass('opacity-0');
  });

  test('5. The scroll event listener correctly updates `isScrolled` and `showBottomGradient` states', () => {
    const { container } = render(<BlogPost post={mockPost} content={mockPost.content || ''} />);

    const getGradients = () => {
      const gradients = container.querySelectorAll('[class*="fixed"]');
      return {
        top: Array.from(gradients).find((el) => el.className.includes('top-0')),
        bottom: Array.from(gradients).find((el) => el.className.includes('bottom-0')),
      };
    };

    // Initially at top
    let { top: topGradient, bottom: bottomGradient } = getGradients();
    expect(topGradient).toHaveClass('opacity-0');
    expect(bottomGradient).toHaveClass('opacity-100');

    // Scroll to middle
    act(() => {
      Object.defineProperty(window, 'scrollY', { writable: true, value: 500 });
      Object.defineProperty(document.documentElement, 'scrollTop', {
        writable: true,
        value: 500,
      });
      window.dispatchEvent(new Event('scroll'));
    });

    ({ top: topGradient, bottom: bottomGradient } = getGradients());
    expect(topGradient).toHaveClass('opacity-100');
    expect(bottomGradient).toHaveClass('opacity-100');

    // Scroll to bottom
    act(() => {
      Object.defineProperty(window, 'scrollY', { writable: true, value: 1200 });
      Object.defineProperty(document.documentElement, 'scrollTop', {
        writable: true,
        value: 1200,
      });
      window.dispatchEvent(new Event('scroll'));
    });

    ({ top: topGradient, bottom: bottomGradient } = getGradients());
    expect(topGradient).toHaveClass('opacity-100');
    expect(bottomGradient).toHaveClass('opacity-0');
  });

  test('Cleanup: scroll event listener is removed on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = render(<BlogPost post={mockPost} content={mockPost.content || ''} />);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));

    removeEventListenerSpy.mockRestore();
  });
});
