/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    silenceDeprecations: ['import', 'legacy-js-api'],
  },
  // one static generation worker, so Google Sheets data is fetched once per build
  experimental: {
    cpus: 1,
  },
  async redirects() {
    return [
      { source: '/ru', destination: '/', permanent: true },
      { source: '/ru/:path+', destination: '/:path+', permanent: true },
      { source: '/ukr', destination: '/', permanent: true },
      { source: '/ukr/:path+', destination: '/:path+', permanent: true },
    ];
  },
  images: {
    qualities: [75, 100],
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'drive.google.com' },
      { protocol: 'https', hostname: 'cdn.jsdelivr.net' },
      // topic logos from Google Sheets
      { protocol: 'https', hostname: 'simpleicons.org' },
      { protocol: 'https', hostname: 'www.svgrepo.com' },
      { protocol: 'https', hostname: 'www.bioconductor.org' },
      { protocol: 'https', hostname: 'cdn.worldvectorlogo.com' },
      { protocol: 'https', hostname: 'typelevel.org' },
      { protocol: 'https', hostname: 'developer.apple.com' },
      { protocol: 'https', hostname: 'dbdb.io' },
      { protocol: 'https', hostname: 'echo.labstack.com' },
      { protocol: 'https', hostname: 'gofiber.io' },
      { protocol: 'https', hostname: 'www.vulkan.org' },
    ],
  },
};

module.exports = nextConfig;
