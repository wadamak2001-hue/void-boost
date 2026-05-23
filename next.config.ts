import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
    images: {
        unoptimized: true,
          },
            // هذا السطر هو الحل للمشكلة
              experimental: {
                  serverActions: {
                        bodySizeLimit: '2mb',
                            },
                              },
                              };

                              export default nextConfig;
                              