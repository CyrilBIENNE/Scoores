export const SITE_VERSION = '1.0.1'

export type GameConfigType = {
  name: string
  slug: string
  versions?: GameConfigVersion[]
}
export type GameConfigVersion = {
  name: string
  slug: string
}

export const GAME_CONFIGS = {
  shootout: {
    name: 'shootout',
    slug: 'shootout',
  },
  darts: {
    name: 'darts',
    slug: '/darts',
    versions: [
      {
        name: '301',
        slug: '301',
      },
      {
        name: '501',
        slug: '501',
      },
      {
        name: '301',
        slug: 'cricket',
      },
    ],
  },
}
