const title = 'Shootout - 404 - Page non trouvée'
const description =
  'Shootout!'

export const defaultMetadata404 = {
  title,
  description,
  robots: {
    index: false,
    follow: false,
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
  manifest: '/favicons/site.webmanifest',
}
