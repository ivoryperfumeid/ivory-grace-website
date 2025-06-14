
/** @type {import('next').NextConfig} */

// Menentukan apakah build ini untuk GitHub Pages
const isGithubPages = process.env.IS_GITHUB_PAGES === 'true';

const nextConfig = {
  // Membuat output kondisional: 'export' hanya untuk build GitHub Pages
  output: isGithubPages ? 'export' : undefined,
  basePath: isGithubPages ? '/ivory-grace-website' : undefined,
  assetPrefix: isGithubPages ? '/ivory-grace-website/' : undefined,
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
      { // Ditambahkan untuk thumbnail YouTube
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/vi/**',
      },
    ],
    // Hanya unoptimize gambar jika membangun untuk GitHub Pages
    // Untuk dev server (Firebase Studio), unoptimized akan false, sehingga optimasi gambar aktif
    unoptimized: isGithubPages ? true : false,
  },
  env: {
    NEXT_PUBLIC_IS_GITHUB_PAGES: process.env.IS_GITHUB_PAGES,
  }
};

module.exports = nextConfig;
