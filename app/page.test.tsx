import { render } from '@testing-library/react';
import { act } from 'react';
import HomePage from './page';
import React from 'react';

// Mock the PROJECT_GROUPS data
jest.mock('./data', () => ({
  PROJECT_GROUPS: [
    {
      company: 'Test Company',
      start: '2020',
      end: '2024',
      projects: [
        {
          id: 'test-1',
          name: 'Test Project',
          aspectRatio: 'landscape',
        },
      ],
    },
  ],
}));

// Mock framer-motion to avoid animation issues in tests
jest.mock('motion/react', () => ({
  motion: {
    div: ({
      children,
      ...props
    }: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => (
      <div {...props}>{children}</div>
    ),
    h1: ({
      children,
      ...props
    }: React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>) => (
      <h1 {...props}>{children}</h1>
    ),
    h2: ({
      children,
      ...props
    }: React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>) => (
      <h2 {...props}>{children}</h2>
    ),
    p: ({
      children,
      ...props
    }: React.PropsWithChildren<React.HTMLAttributes<HTMLParagraphElement>>) => (
      <p {...props}>{children}</p>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

describe('HomePage Scroll Gradient', () => {
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
    const { container } = render(<HomePage />);

    // Find the top gradient overlay
    const topGradient = container.querySelector('[class*="fixed top-0"]');

    expect(topGradient).toBeInTheDocument();
    expect(topGradient).toHaveClass('opacity-0');
  });

  test('2. The `isScrolled` state becomes true after scrolling down from the top', () => {
    const { container } = render(<HomePage />);

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
    const topGradient = container.querySelector('[class*="fixed top-0"]');

    expect(topGradient).toHaveClass('opacity-100');
  });

  test('3. The `showBottomGradient` state is initially true if content extends beyond the viewport', () => {
    const { container } = render(<HomePage />);

    // Content extends beyond viewport (scrollHeight: 2000 > clientHeight: 800)
    const bottomGradient = container.querySelector('[class*="fixed bottom-0"]');

    expect(bottomGradient).toBeInTheDocument();
    expect(bottomGradient).toHaveClass('opacity-100');
  });

  test('4. The `showBottomGradient` state becomes false when scrolled to the very bottom of the page', () => {
    const { container } = render(<HomePage />);

    // Scroll to bottom (scrollTop + clientHeight = scrollHeight)
    act(() => {
      Object.defineProperty(window, 'scrollY', { writable: true, value: 1200 });
      Object.defineProperty(document.documentElement, 'scrollTop', {
        writable: true,
        value: 1200,
      });
      window.dispatchEvent(new Event('scroll'));
    });

    const bottomGradient = container.querySelector('[class*="fixed bottom-0"]');

    expect(bottomGradient).toHaveClass('opacity-0');
  });

  test('5. The scroll event listener correctly updates `isScrolled` and `showBottomGradient` states', () => {
    const { container } = render(<HomePage />);

    // Initially at top
    let topGradient = container.querySelector('[class*="fixed top-0"]');
    let bottomGradient = container.querySelector('[class*="fixed bottom-0"]');

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

    topGradient = container.querySelector('[class*="fixed top-0"]');
    bottomGradient = container.querySelector('[class*="fixed bottom-0"]');

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

    topGradient = container.querySelector('[class*="fixed top-0"]');
    bottomGradient = container.querySelector('[class*="fixed bottom-0"]');

    expect(topGradient).toHaveClass('opacity-100');
    expect(bottomGradient).toHaveClass('opacity-0');
  });

  test('Cleanup: scroll event listener is removed on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = render(<HomePage />);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));

    removeEventListenerSpy.mockRestore();
  });
});
