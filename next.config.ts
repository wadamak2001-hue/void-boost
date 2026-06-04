import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Ensure no server-side features are enabled for pure static export
  typescript: {
    ignoreBuildErrors: true, // Safeguard for native export
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
