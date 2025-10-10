const title = 'Scoores - 404 - Page non trouvée'
const description = "Désolé, la page semble s'être perdue."

export const defaultMetadata404 = {
  title,
  description,
  robots: {
    index: false,
    follow: false,
  },
  metadataBase: new URL(process.env.SCOORES_CANONICAL_URL ?? ''),
  openGraph: {
    title,
    description,
    url: '',
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
    icon: '/favicon.ico',
    apple: '/favicons/apple-icon.png',
    other: [
      {
        rel: 'icon',
        url: '/favicon.ico',
        sizes: 'any',
      },
      {
        rel: 'icon',
        url: '/favicons/icon.svg',
        type: 'image/svg+xml',
      },
    ],
  },
  manifest: '/site.webmanifest',
}
