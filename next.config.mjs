/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  experimental: {
    // Optimize package imports
    optimizePackageImports: ['@heroui/breadcrumbs', 'motion'],
    // Disable scroll restoration to handle it manually with Lenis
    scrollRestoration: false,
  },
};

export default nextConfig;
