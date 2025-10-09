// @ts-check
const path = require('path')
const runtimeCaching = require('next-pwa/cache')

// compatibilité ESM/CommonJS
const createPWA = require('next-pwa').default || require('next-pwa')

const isApp = process.env.NEXT_PUBLIC_IS_APP === 'true'
const isDev = process.env.NODE_ENV === 'development'

const withPWA = createPWA({
  dest: 'public',             // met les fichiers dans /public (accessible depuis le SSR)
  register: true,             // injecte le script d'enregistrement du SW
  skipWaiting: true,
  runtimeCaching,
  disable: isDev,             // désactive uniquement en développement
  buildExcludes: [/middleware-manifest\.json$/],
})

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/shared/styles')],
    additionalData: `@use 'variables' as *;`,
    silenceDeprecations: ['legacy-js-api'],
  },
  output: isApp ? 'export' : 'standalone', // SSR quand NEXT_PUBLIC_IS_APP n’est pas défini
  trailingSlash: true,
  images: { unoptimized: true }
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