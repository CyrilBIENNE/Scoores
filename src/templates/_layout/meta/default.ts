const title = 'Scoores, outils pour les jeux de salle (billard, snooker, ...).'
const description = 'Scoores, outils pour les jeux de salle (billard, snooker, ...).'

export const defaultMetadata = {
  title,
  description,
  robots: {
    index: process.env.NEXT_PUBLIC_IS_SEO_PROD === 'true',
    follow: process.env.NEXT_PUBLIC_IS_SEO_PROD === 'true',
  },
  metadataBase: new URL(process.env.SCOORES_CANONICAL_URL ?? ''),
  openGraph: {
    title,
    description,
    url: process.env.SCOORES_CANONICAL_URL,
    siteName: 'Scoores',
    images: process.env.SCOORES_CANONICAL_URL + '/img/scoores-og.png',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    site: '@scoores',
    images: process.env.SCOORES_CANONICAL_URL + '/img/scoores-og.png',
  },
  icons: {
    other: [
      {
        rel: 'icon',
        url: '/favicon.ico',
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
  manifest: '/site.webmanifest',
}
