import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Oracle Cloud ARM (aarch64) 対応
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/webhook/:tenantId',
        destination: 'http://linebot:3005/webhook/:tenantId',
      },
    ];
  },
};

export default nextConfig;
