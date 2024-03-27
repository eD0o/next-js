/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    deviceSizes: [600, 800, 1200, 2400, 3600],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.origamid.online',
        port: '',
        pathname: '/imagens/**',
      },
    ],
  },
};


export default nextConfig;
