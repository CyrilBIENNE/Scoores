const title = 'Scoores'
const description = 'Scoores, une webapp qui fournit des outils pour noter les scores (billard, fléchettes, ...).'
export const viewport = {
  themeColor: '#333333',
}

export const defaultMetadata = {
  title,
  description,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title,
    description,
    url: '',
    siteName: 'Scoores',
    images: '/img/logo_big.svg',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    site: '@scoores',
    images: '/img/logo_big.svg',
  },
  icons: {
    other: [
      {
        rel: 'icon',
        url: '/favicons/favicon.ico',
        sizes: '32x32',
      },
      {
        rel: 'icon',
        url: '/favicons/icon.svg',
        type: 'image/svg+xml',
      },
      {
        rel: 'apple-touch-icon',
        url: '/favicons/apple-icon.png',
      },
    ],
  },
  manifest: '/favicons/site.webmanifest',
}
