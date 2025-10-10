import { Metadata, ResolvingMetadata } from 'next'
import { defaultMetadata } from './default'

export const getMetadata = async (
  fullSlug: string,
  parent?: ResolvingMetadata,
  metatitle?: string,
  metadescription?: string,
  robots?: any,
  metaImage?: any
): Promise<Metadata> => {
  //const metaLayout = (await parent) ?? defaultMetadata
  const metaLayout = defaultMetadata
  const canonical =
    fullSlug && '/' !== fullSlug ? process.env.SCOORES_CANONICAL_URL + fullSlug : process.env.SCOORES_CANONICAL_URL
  const title = metatitle ?? metaLayout.title ?? 'Scoores'
  const ogTitle = title
  const description =
    metadescription ?? metaLayout.description ?? 'Scoores, outils pour les jeux de salle (billard, snooker, ...).'
  const image = metaImage ? process.env.SCOORES_CANONICAL_URL + metaImage : metaLayout.openGraph?.images

  if (!robots)
    robots = {
      index: process.env.NEXT_PUBLIC_IS_SEO_PROD === 'true' ? true : false,
      follow: process.env.NEXT_PUBLIC_IS_SEO_PROD === 'true' ? true : false,
    }

  return {
    title,
    description,
    robots: { ...robots, 'max-image-preview': 'large' },
    alternates: { canonical },
    openGraph: {
      ...metaLayout.openGraph,
      title: ogTitle,
      description,
      url: process.env.SCOORES_CANONICAL_URL + fullSlug,
      images: image,
    },
    twitter: {
      ...metaLayout.twitter,
      title,
      description,
      images: image,
    },
  }
}
