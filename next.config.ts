import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // IMPORTANT: You MUST replace `<your-repo-name>` below with the name of your
  // GitHub repository.
  // For example, if your repository URL is https://github.com/my-user/my-cool-app,
  // then you should set basePath to '/my-cool-app'.
  basePath: '/bavensky/studio',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // Image optimization is not available for static exports.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
