const title = 'Shootout!'
const description =
  'Shootout.'

export const defaultMetadata = {
  title,
  description,
  robots: {
    index: process.env.NEXT_PUBLIC_IS_SEO_PROD === 'true',
    follow: process.env.NEXT_PUBLIC_IS_SEO_PROD === 'true',
  },
  openGraph: {
    title,
    description,
    url: '',
    siteName: 'Shootout',
    images: '/img/logo_zaf_2024.svg',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    site: '@shootout',
    images: '/img/logo_zaf_2024.svg',
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
