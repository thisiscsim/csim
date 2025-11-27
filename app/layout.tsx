import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { LenisProvider } from '@/components/LenisProvider';
import { BasicNavigation } from '@/components/basic-navigation';
import { Analytics } from '@vercel/analytics/react';
// import { getPublishedBlogPosts } from '@/lib/notion/blog';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://csim.vercel.app/'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Christopher Sim - Software Designer',
    template: '%s | Christopher Sim',
  },
  description:
    'Nim is a free and open-source personal website template built with Next.js 15, React 19 and Motion-Primitives.',
  icons: {
    icon: '/avatar.svg',
  },
};

const abcMarist = localFont({
  src: [
    {
      path: '../public/fonts/ABCMaristVariable-Trial.woff2',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: '../public/fonts/ABCMaristVariableItalic-Trial.woff2',
      weight: '100 900',
      style: 'italic',
    },
  ],
  variable: '--font-abc-marist',
  display: 'swap',
  preload: true,
  fallback: ['sans-serif'],
});

const jetbrainsMono = localFont({
  src: [
    {
      path: '../public/fonts/JetBrainsMono-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const blogPosts = await getPublishedBlogPosts();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${abcMarist.variable} ${jetbrainsMono.variable} bg-primary antialiased`}
        suppressHydrationWarning
      >
        <LenisProvider>
          {/* Basic Navigation */}
          <BasicNavigation />
          <div className="mx-auto max-w-[1440px]">
            <div className="flex min-h-screen w-full relative">
              {/* Left side - Main content */}
              <div className="flex-1">
                <div className="mx-auto max-w-[700px] px-4 pt-[80px]">
                  <div className="flex-1">{children}</div>
                </div>
              </div>

              {/* Right side - Space for navigation */}
              {/* <div className="w-[440px] flex-shrink-0"></div> */}
            </div>
          </div>

          {/* Fixed navigation with max-width constraint */}
          {/* <div
            className="fixed top-1/2 -translate-y-1/2 w-[440px] max-w-[440px] pr-16"
            style={{
              right: 'max(1rem, calc((100vw - 1440px) / 2))',
            }}
          >
            <PersistentNavigation blogPosts={blogPosts} />
          </div> */}
        </LenisProvider>
        <Analytics />
      </body>
    </html>
  );
}
