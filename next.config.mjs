/** @type {import('next').NextConfig} */
if (
  typeof globalThis.localStorage !== 'undefined' &&
  typeof globalThis.localStorage.getItem !== 'function'
) {
  const memoryStorage = new Map();

  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: {
      getItem(key) {
        return memoryStorage.has(key) ? memoryStorage.get(key) : null;
      },
      setItem(key, value) {
        memoryStorage.set(key, String(value));
      },
      removeItem(key) {
        memoryStorage.delete(key);
      },
      clear() {
        memoryStorage.clear();
      },
    },
  });
}

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'csim.b-cdn.net',
        pathname: '/Photos/**',
      },
      {
        protocol: 'https',
        hostname: 'csim.b-cdn.net',
        pathname: '/Projects/**',
      },
    ],
    // Optimize image loading
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  experimental: {
    // Optimize package imports
    optimizePackageImports: ['@heroui/breadcrumbs', 'motion', 'lucide-react'],
    // Disable scroll restoration to handle it manually with Lenis
    scrollRestoration: false,
  },
};

export default nextConfig;
