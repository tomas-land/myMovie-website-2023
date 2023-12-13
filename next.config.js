/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org','lh3.googleusercontent.com'],
  },
  experimental: {
    // Defaults to 50MB
    isrMemoryCacheSize: 0, // cache size in bytes   
  },
};
