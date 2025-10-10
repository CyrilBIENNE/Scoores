// @ts-check
const path = require('path')
//const runtimeCaching = require('next-pwa/cache')

// compatibilité ESM/CommonJS
const createPWA = require('next-pwa').default || require('next-pwa')

const isApp = process.env.NEXT_PUBLIC_IS_APP === 'true'
const isDev = process.env.NODE_ENV === 'development'

const runtimeCaching = [
  {
    urlPattern: /^https?.*\/$/, // pages
    handler: 'NetworkFirst',
    options: {
      cacheName: 'pages-cache',
      expiration: { maxEntries: 20, maxAgeSeconds: 7 * 24 * 60 * 60 },
    },
  },
  {
    urlPattern: /^https?.*\/api\/.*$/, // appels API
    handler: 'NetworkFirst',
    options: {
      cacheName: 'api-cache',
      networkTimeoutSeconds: 5,
      expiration: { maxEntries: 30, maxAgeSeconds: 24 * 60 * 60 },
    },
  },
  {
    urlPattern: /^https?.*\.(png|jpg|jpeg|svg|gif|webp|ico|woff2|css|js)$/,
    handler: 'CacheFirst',
    options: {
      cacheName: 'assets-cache',
      expiration: { maxEntries: 100, maxAgeSeconds: 30 * 24 * 60 * 60 },
    },
  },
]

const withPWA = createPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching,
  disable: isDev,
  buildExcludes: [/middleware-manifest\.json$/],
  fallbacks: {
    document: '/offline.html', // page de secours
  },
})

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/shared/styles')],
    additionalData: `@use 'variables' as *;`,
    silenceDeprecations: ['legacy-js-api'],
  },
  output: isApp ? 'export' : undefined,
  trailingSlash: true,
  images: { unoptimized: true },
}

module.exports = withPWA(baseConfig)
/*
const path = require('path')
const runtimeCaching = require('next-pwa/cache')

const isApp = process.env.NEXT_PUBLIC_IS_APP === 'true'
const isDev = process.env.NODE_ENV === 'development'

const createPWA = require('next-pwa').default || require('next-pwa')

const withPWA = createPWA({
  dest: 'public', // dossier où sera écrit le SW
  register: true,
  skipWaiting: true,
  runtimeCaching,
  disable: isDev, // désactive en dev, active en prod
  buildExcludes: [/middleware-manifest\.json$/], // patch Next15
})


const baseConfig = {
  reactStrictMode: true,
  // logging: { fetches: { fullUrl: true } },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/shared/styles')],
    additionalData: `@use 'variables' as *;`,
    silenceDeprecations: ['legacy-js-api'],
  },
  output: isApp ? 'export' : 'standalone',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = withPWA(baseConfig)
*/