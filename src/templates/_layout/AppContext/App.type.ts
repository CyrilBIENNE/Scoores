export interface AppStructure {
  version: string
  currentGame?: string
  isMute: boolean
  helpType?: string
}

export const appConfig: AppStructure = {
  version: '1.0.0',
  currentGame: undefined,
  isMute: false,
  helpType: undefined,
}
