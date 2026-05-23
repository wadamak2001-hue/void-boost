import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  // إيقاف أي تجارب قد تسبب توقف البناء
  experimental: {
    serverActions: false,
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
 