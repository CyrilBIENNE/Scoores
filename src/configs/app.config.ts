import { AppStructure } from 'templates/_layout/AppContext/App.type'

export const SITE_VERSION = '1.0.6'
export const APP_VERSION = '1.0.5'

export const APP_CONFIG: AppStructure = {
  version: '1.0.0',
  currentGame: undefined,
  isMute: false,
  helpType: undefined,
}

export const GAME_CONFIGS = {
  shootout: {
    name: 'shootout',
    slug: '/shootout/',
  },
}
