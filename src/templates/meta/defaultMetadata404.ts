const title = 'Scoores - 404 - Page non trouvée'
const description = 'Scoores - 404 - Page non trouvée'

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
    siteName: 'Scoores',
    images: '/img/logo_big.svg',
    locale: 'fr_FR',
    type: 'website',
  },
  manifest: '/favicons/site.webmanifest',
}
