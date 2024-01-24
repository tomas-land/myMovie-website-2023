/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '**',
      },
    ],
  },
  // images: {
  //   domains: ['image.tmdb.org','lh3.googleusercontent.com'],
  // },
};
