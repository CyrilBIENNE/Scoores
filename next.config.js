// @ts-check
const path = require('path')
/*
const isApp = process.env.NEXT_PUBLIC_IS_APP === 'true'

const nextConfig = {
  reactStrictMode: true,
  // logging: { fetches: { fullUrl: true } },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/shared/styles')],
    additionalData: `@use 'variables' as *;`,
    silenceDeprecations: ['legacy-js-api'],
  },
  output: isApp ? 'export' : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
*/


const createPWA = require('next-pwa').default || require('next-pwa')

const isApp = process.env.NEXT_PUBLIC_IS_APP === 'true'
const isDev = process.env.NODE_ENV === 'development'

// -- cache configuré manuellement pour documents + assets --
const runtimeCaching = [
  {
    // pages HTML exportées
    urlPattern: ({ request }) => request.mode === 'navigate',
    handler: 'NetworkFirst',
    options: {
      cacheName: 'html-cache',
      networkTimeoutSeconds: 3,
      expiration: { maxEntries: 20, maxAgeSeconds: 7 * 24 * 60 * 60 },
      cacheableResponse: { statuses: [0, 200] },
    },
  },
  {
    // Assets (JS, CSS, images)
    urlPattern: /^https?.*\.(png|jpg|jpeg|svg|gif|webp|ico|woff2|css|js)$/,
    handler: 'CacheFirst',
    options: {
      cacheName: 'assets-cache',
      expiration: { maxEntries: 100, maxAgeSeconds: 30 * 24 * 60 * 60 },
      cacheableResponse: { statuses: [0, 200] },
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
    document: '/offline.html', // fallback offline
  },
})

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

  experimental: {
    outputFileTracingIncludes: {
      '/': ['./public/**/*'],
    },
  },
}

module.exports = withPWA(baseConfig)
