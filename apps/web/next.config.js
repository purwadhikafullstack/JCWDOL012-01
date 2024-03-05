/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'excelso-coffee.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
