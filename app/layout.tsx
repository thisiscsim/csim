import type { Metadata, Viewport } from 'next';
import { Geist } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { Header } from './header';
import { Footer } from './footer';
import { ThemeProvider } from 'next-themes';

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
});

const berkeleyMono = localFont({
  src: '../public/fonts/Berkeley Mono Variable.woff2',
  variable: '--font-berkeley-mono',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${berkeleyMono.variable} bg-white tracking-tight antialiased dark:bg-zinc-950`}
      >
        <ThemeProvider
          enableSystem={true}
          attribute="class"
          storageKey="theme"
          defaultTheme="system"
        >
          <div className="flex min-h-screen w-full flex-col font-[family-name:var(--font-berkeley-mono)]">
            <div className="relative mx-auto w-full max-w-screen-lg flex-1 px-4 pt-20">
              <div className="pointer-events-none fixed left-0 top-0 z-10 h-12 w-full bg-gray-100 to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)] dark:bg-zinc-950" />
              <Header />
              {children}
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
