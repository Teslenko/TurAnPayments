/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/TurAnPayments',
  assetPrefix: '/TurAnPayments/',
  images: {
    unoptimized: true
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client']
  }
}

module.exports = nextConfig
