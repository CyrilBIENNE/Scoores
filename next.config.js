// @ts-check
const path = require('path')
const createPWA = require('next-pwa').default || require('next-pwa')
//const withNextIntl = require('next-intl/plugin')('./i18n.ts')
const isApp = process.env.NEXT_PUBLIC_IS_APP === 'true'
const isDev = process.env.NODE_ENV === 'development'

// -- cache configuré manuellement pour documents + assets --
const runtimeCaching = [
  {
    urlPattern: ({ request }) => request.mode === 'navigate',
    handler: 'NetworkFirst',
    options: {
      cacheName: 'html-cache',
      networkTimeoutSeconds: 3,
      expiration: { maxEntries: 50, maxAgeSeconds: 7 * 24 * 60 * 60 },
      cacheableResponse: { statuses: [0, 200] },
    },
  },
  {
    urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico|woff2|woff|ttf|css|js)$/,
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
  buildExcludes: [
    /app-build-manifest\.json$/,
    /build-manifest\.json$/,
    /react-loadable-manifest\.json$/,
    /prerender-manifest\.json$/,
    /middleware-manifest\.json$/
  ],
  fallbacks: {
    document: '/offline.html', // fallback offline
  },
  additionalManifestEntries: [
    { url: '/shootout/', revision: null },
    { url: '/offline.html', revision: null },
  ],
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
//module_exports = withNextIntl(withPWA(baseConfig))
