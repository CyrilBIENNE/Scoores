export interface ShootoutStructure {
  config: ShootoutConfig
  currentGame?: ShootoutGame
  games: ShootoutGame[]
  isMute: boolean
}

export interface ShootoutConfig {
  version: string
  name: string
  S_TotalTime: number
  S_TotalTimeChangeLocal: number
  S_LocalTime1: number
  S_LocalTime2: number
  S_AlertTotalTime: number
  S_AlertLocalTime: number
}

export interface ShootoutGame {
  player1: ShootoutGamePlayer
  player2: ShootoutGamePlayer
  totalShots: number
  totalTime: number
  winner: ShootoutGamePlayer
  config: ShootoutConfig
}

export interface ShootoutGamePlayer {
  number: number
  name: string
  totalTime: number
  shots: number
  turns: number
  win?: boolean
}
