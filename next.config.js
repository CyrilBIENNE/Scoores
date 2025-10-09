// @ts-check
const path = require('path')
const runtimeCaching = require('next-pwa/cache')

const withPWA = require('next-pwa')({
  dest: 'public',
  runtimeCaching,
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
})

module.exports = withPWA({
  reactStrictMode: true,
})

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
  // logging: { fetches: { fullUrl: true } },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/shared/styles')],
    additionalData: `@use 'variables' as *;`,
    silenceDeprecations: ['legacy-js-api'],
  },
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
