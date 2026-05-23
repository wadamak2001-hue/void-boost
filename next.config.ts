import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
    images: {
        unoptimized: true,
          },
            experimental: {
                // نقوم بإيقافها تماماً
                    serverActions: false, 
                      },
                      };

                      export default nextConfig;
                      