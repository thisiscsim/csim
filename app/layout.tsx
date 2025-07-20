import type { Metadata, Viewport } from 'next';
import { Geist } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { Footer } from './footer';
import { LenisProvider } from '@/components/LenisProvider';
import { PersistentNavigation } from '@/components/persistent-navigation';
import { getPublishedBlogPosts } from '@/lib/notion/blog';
import { ProjectProvider } from './providers/project-context';

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
    icon: '/logo.svg',
  },
};

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const recklessNeue = localFont({
  src: [
    {
      path: '../public/fonts/RecklessNeue-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/RecklessNeue-RegularItalic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/RecklessNeue-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/RecklessNeue-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
  ],
  variable: '--font-reckless-neue',
  display: 'swap',
  preload: true,
  fallback: ['sans-serif'],
});

const berkeleyMono = localFont({
  src: [
    {
      path: '../public/fonts/Berkeley Mono Variable.woff2',
      weight: '100 900',
      style: 'normal',
    },
  ],
  variable: '--font-berkeley-mono',
  display: 'swap',
  preload: true,
  fallback: ['ui-monospace', 'SFMono-Regular', 'monospace'],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const blogPosts = await getPublishedBlogPosts();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/RecklessNeue-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Berkeley%20Mono%20Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geist.variable} ${recklessNeue.variable} ${berkeleyMono.variable} bg-primary antialiased`}
      >
        <LenisProvider>
          <ProjectProvider>
            <div className="mx-auto max-w-[1440px]">
              <div className="flex min-h-screen w-full relative">
                {/* Left side - Main content */}
                <div className="flex-1">
                  <div className="mx-auto max-w-screen-lg px-4 pt-20">
                    <div className="flex-1">{children}</div>
                  </div>
                </div>

                {/* Right side - Space for navigation */}
                <div className="w-[440px] flex-shrink-0"></div>
              </div>
            </div>

            {/* Fixed navigation with max-width constraint */}
            <div
              className="fixed top-1/2 -translate-y-1/2 w-[440px] max-w-[440px] pr-16"
              style={{
                right: 'max(1rem, calc((100vw - 1440px) / 2))',
              }}
            >
              <PersistentNavigation blogPosts={blogPosts} />
              <Footer />
            </div>
          </ProjectProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
