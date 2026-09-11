import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LenisProvider } from '@/components/LenisProvider';
import { BasicNavigation } from '@/components/basic-navigation';
import { ScrollToTop } from '@/components/ScrollToTop';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
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

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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
      <head>
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="https://csim.b-cdn.net" />
        <link rel="preconnect" href="https://csim.b-cdn.net" crossOrigin="anonymous" />
        {/* Prevent theme flash - apply stored theme before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = null;
                try {
                  theme =
                    window.localStorage && typeof window.localStorage.getItem === 'function'
                      ? window.localStorage.getItem('theme')
                      : null;
                } catch (error) {}
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} bg-base antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <LenisProvider>
            {/* Scroll to top on route change */}
            <ScrollToTop />
            {/* Basic Navigation */}
            <BasicNavigation />
            <div className="mx-auto max-w-[1440px]">
              <div className="flex min-h-dvh w-full relative">
                {/* Left side - Main content */}
                <div className="flex-1">
                  <div className="mx-auto max-w-[700px] px-4 pt-[100px]">
                    <div className="flex-1">{children}</div>
                  </div>
                </div>

                {/* Right side - Space for navigation */}
                {/* <div className="w-[440px] shrink-0"></div> */}
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
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
