/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    newNextLinkBehavior: false,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['i.imgur.com', 'github.com', 'via.placeholder.com'],
  },
}

module.exports = nextConfig
