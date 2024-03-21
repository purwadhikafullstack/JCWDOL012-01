/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'excelso-coffee.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};
