/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/ivory-grace-website',
  assetPrefix: '/ivory-grace-website/',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
    // Untuk static export di GitHub Pages, gambar perlu di-unoptimize
    // jika loader default tidak bekerja dengan baik dengan basePath/assetPrefix.
    unoptimized: true,
  },
};

module.exports = nextConfig;
