import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  experimental: {
    // Optimize package imports
    optimizePackageImports: ['@heroui/react', 'motion'],
    // Disable scroll restoration to handle it manually with Lenis
    scrollRestoration: false,
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
