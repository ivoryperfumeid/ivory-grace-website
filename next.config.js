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
    // Untuk static export di GitHub Pages, gambar mungkin perlu di-unoptimize
    // jika loader default tidak bekerja dengan baik dengan basePath/assetPrefix.
    // Namun, Next.js biasanya menangani ini secara otomatis untuk `next export`.
    // Jika gambar rusak, kita bisa uncomment ini:
    // unoptimized: true,
  },
};

module.exports = nextConfig;
