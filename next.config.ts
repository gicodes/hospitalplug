import type { NextConfig } from 'next';
import { externalsToExcludeFromBundle } from './external-modules';

const nextConfig: NextConfig = {
  webpack(config, { isServer }) {
    if (isServer) {
      config.externals = [
        ...(config.externals || []),
        ...externalsToExcludeFromBundle,
      ];
    }
    return config;
  },
  images: {
    domains: ['images.unsplash.com'],
  }
};

export default nextConfig;
