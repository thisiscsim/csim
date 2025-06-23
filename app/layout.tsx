import type { Metadata, Viewport } from 'next';
import { Geist } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { HeaderWrapper } from './header-wrapper';
import { Footer } from './footer';
import { ThemeProvider } from 'next-themes';
import { LenisProvider } from '@/components/LenisProvider';

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

const berkeleyMono = localFont({
  src: '../public/fonts/Berkeley Mono Variable.woff2',
  variable: '--font-berkeley-mono',
  display: 'swap',
  preload: true,
  fallback: ['monospace'],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geist.variable} ${berkeleyMono.variable} ${recklessNeue.variable} bg-white antialiased dark:bg-zinc-950`}
      >
        <ThemeProvider
          enableSystem={true}
          attribute="class"
          storageKey="theme"
          defaultTheme="system"
        >
          <LenisProvider>
            <div className="flex min-h-screen w-full flex-col font-[family-name:var(--font-reckless-neue)]">
              <div className="relative mx-auto w-full max-w-screen-lg flex-1 px-4 pt-20">
                <div className="pointer-events-none fixed left-0 top-0 z-10 h-12 w-full bg-gray-100 to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)] dark:bg-zinc-950" />
                <HeaderWrapper />
                <div className="flex-1">{children}</div>
              </div>
              <div className="mx-auto w-full max-w-screen-lg px-4">
                <Footer />
              </div>
            </div>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
