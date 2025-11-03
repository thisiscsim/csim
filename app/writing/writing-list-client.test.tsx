import { render } from '@testing-library/react';
import { act } from 'react';
import { WritingListClient } from './writing-list-client';
import type { NotionBlogPost } from '@/lib/notion/blog';
import React from 'react';

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    ...props
  }: React.PropsWithChildren<React.AnchorHTMLAttributes<HTMLAnchorElement>>) => (
    <a {...props}>{children}</a>
  ),
}));

const mockPosts: NotionBlogPost[] = [
  {
    id: '1',
    title: 'First Post',
    slug: 'first-post',
    date: '2024-01-15',
    categories: ['Tech'],
  },
  {
    id: '2',
    title: 'Second Post',
    slug: 'second-post',
    date: '2024-01-10',
    categories: ['Design'],
  },
  {
    id: '3',
    title: 'Third Post',
    slug: 'third-post',
    date: '2023-12-20',
    categories: ['Tech'],
  },
];

describe('WritingListClient Scroll Gradient', () => {
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
  });

  test('1. The `isScrolled` state is initially false when at the top of the page', () => {
    const { container } = render(<WritingListClient posts={mockPosts} />);

    // Find the top gradient overlay
    const gradients = container.querySelectorAll('[class*="fixed"]');
    const topGradient = Array.from(gradients).find((el) => el.className.includes('top-0'));

    expect(topGradient).toBeInTheDocument();
    expect(topGradient).toHaveClass('opacity-0');
  });

  test('2. The `isScrolled` state becomes true after scrolling down from the top', () => {
    const { container } = render(<WritingListClient posts={mockPosts} />);

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
    const { container } = render(<WritingListClient posts={mockPosts} />);

    const gradients = container.querySelectorAll('[class*="fixed"]');
    const bottomGradient = Array.from(gradients).find((el) => el.className.includes('bottom-0'));

    expect(bottomGradient).toBeInTheDocument();
    expect(bottomGradient).toHaveClass('opacity-100');
  });

  test('4. The `showBottomGradient` state becomes false when scrolled to the very bottom of the page', () => {
    const { container } = render(<WritingListClient posts={mockPosts} />);

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
    const { container } = render(<WritingListClient posts={mockPosts} />);

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

    const { unmount } = render(<WritingListClient posts={mockPosts} />);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));

    removeEventListenerSpy.mockRestore();
  });
});
